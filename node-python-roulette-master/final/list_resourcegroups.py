
import os
import traceback
import sys
import psycopg2	      #postgres library. command to install pip install psycopg2
import json


from azure.common.credentials import ServicePrincipalCredentials
from azure.mgmt.resource import ResourceManagementClient
from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.compute import ComputeManagementClient
#from azure.mgmt.compute.models import DiskCreateOption
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
    ################
    # getting data #
    ################
  a=0
  arr=[]
  fin=[]
  for item in resource_client.resource_groups.list():
    arr.append(a)
    a=a+1
    name={"name":item.name.encode('ascii')}
    loc={"location":item.location.encode('ascii')}
    id=item.id
    val1=id.split("/")
    val2=tuple(val1)
    val3={"subscription_id":val2[2].encode('ascii')}
    cp=name.copy()
    cp.update(loc)
    cp.update(val3)
    fin.append(str(cp))
  lst=tuple(fin)
  dic=zip(arr,lst)
  dat=dict(dic)
  conv=json.dumps(dat)
  # con=conv.replace("'","\"")
  print conv+";"
except:
 print "error"
