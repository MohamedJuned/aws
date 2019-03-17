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
  cur.execute("SELECT client_id,secret,tenant FROM subscriptions WHERE subscription_id='%s' " %j)
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
    proc = subprocess.Popen(["az login --service-principal -u %s -p %s --tenant %s" %(c,s,t)], stdout=subprocess.PIPE, shell=True)
    (out, err) = proc.communicate()
    vmname=item.name
    rs=item.id
    rs1=rs.split("/")
    rs2=tuple(rs1)
    rgr=rs2[4].encode('ascii')
    sid=rs2[2].encode('ascii')
    rgr1={"resource_group_name":rgr}
    sid1={"subscription_id":sid}
    proc = subprocess.Popen(["az vm get-instance-view --name %s --resource-group %s --query instanceView.statuses[1] --output json" %(vmname,rgr)],stdout=subprocess.PIPE, shell=True)
    (out1, err1) = proc.communicate()
    os.system("az logout")
    status=json.loads(out1)
    stat=status["displayStatus"]
    stat1={"status":stat.encode('ascii')}
    typ=item.type
    tp=typ.split("/")
    tp1=tp[1]
    tp2={"type":tp1.encode('ascii')}
    cp=name.copy()
    cp.update(loc)
    cp.update(stat1)
    cp.update(rgr1)
    cp.update(sid1)
    cp.update(tp2)
    fin.append(str(cp))
  lst=tuple(fin)
  dic=zip(arr,lst)
  dat=dict(dic)
  conv=json.dumps(dat)
  con=conv.replace("'",'"')
  print con+";"
except:
 print "error"
