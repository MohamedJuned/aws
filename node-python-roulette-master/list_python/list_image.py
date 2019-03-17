import os
import traceback
import sys
import psycopg2	      #postgres library. command to install pip install psycopg2
import json
import subprocess

from azure.common.credentials import ServicePrincipalCredentials
from azure.mgmt.resource import ResourceManagementClient
from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.compute import ComputeManagementClient
from azure.mgmt.compute.models import DiskCreateOption
from haikunator import Haikunator

haikunator = Haikunator()
# subs = sys.argv[1]
subs ="9f112f74-5515-4c9a-916f-f3a4240ae2d0"
client_id = ''
secret = ''
tenant = ''
i=0
try:
 confs=json.load(open("config.json"))
 entry=confs["data"]
 for d in entry:
  database=d["database"]
  user=d["user"]
  password=d["password"]
  host=d["host"]
  port=d["port"]

 conn = psycopg2.connect(database=database, user=user, password=password, host=host, port=port)
 cur = conn.cursor()
 #Database table extraction and copy the content.
 cur.execute("SELECT subscription_id FROM subscriptions")
 rows = cur.fetchall()
 for j in rows:
  cur.execute("SELECT client,secret,tenant FROM subscriptions WHERE subscription_id='%s' " %j)
  rows = cur.fetchall()
  for row in rows:
     c = row[i]
     s = row[i+1]
     t = row[i+2]

  credentials = ServicePrincipalCredentials(
     client_id = c,
     secret = s,
     tenant = t
     )
  subscription_id=''.join(j)
  resource_client = ResourceManagementClient(credentials, subscription_id)
  compute_client = ComputeManagementClient(credentials, subscription_id)
  network_client = NetworkManagementClient(credentials, subscription_id)

    ###########
    # Prepare #
    ###########

  a=0
  arr=[]
  fin=[]
  item={}
  for item in compute_client.virtual_machines.list_all():
    arr.append(a)
    a=a+1
    name={"vm_name":item.name.encode('ascii')}
    loc={"location":item.location.encode('ascii')}
    proc = subprocess.Popen("az login --service-principal -u %s -p %s --tenant %s" %(c,s,t), stdout=subprocess.PIPE, shell=True)
    (out, err) = proc.communicate()
    vmname=item.name
    rs=item.id
    rs1=rs.split("/")
    rs2=tuple(rs1)
    rgr=rs2[4].encode('ascii')
    sid=rs2[2].encode('ascii')
    rgr1={"resource_group_name":rgr}
    sid1={"subscription_id":sid}
    proc = subprocess.Popen("az vm image list --subscription %s --output json" %(subs),stdout=subprocess.PIPE,stderr=subprocess.PIPE, shell=True)
    (out1, err1) = proc.communicate()
    os.system("az logout")
    print out1
except:
 print "error"
