import os
import traceback
import sys
import psycopg2	      #postgres library. command to install pip install psycopg2
import json

from azure.common.credentials import ServicePrincipalCredentials
from azure.mgmt.resource import ResourceManagementClient
from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.compute import ComputeManagementClient
from azure.mgmt.compute.models import DiskCreateOption
from azure.mgmt.storage import StorageManagementClient
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
  #print rows
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
  storage_client = StorageManagementClient(credentials, subscription_id)
    ###########
    # Prepare #
    ###########

    # List VMs in subscription
  a=0
  arr=[]
  fin=[]
  item={}
  for item in storage_client.storage_accounts.list():
    arr.append(a)
    a=a+1
    name={"name":item.name.encode('ascii')}
    loc={"location":item.location.encode('ascii')}
    type=item.type
    type1=type.split("/")
    type2=tuple(type1)
    kind=item.kind
    kind1=kind.split(".")
    kind2=tuple(kind1)
    rs=item.id
    rs1=rs.split("/")
    rs2=tuple(rs1)
    typ={"type":type2[1].encode('ascii')}
    knd={"kind":kind2[0].encode('ascii')}
    rsid={"subscription_id":rs2[2].encode('ascii')}
    rgn={"resource_group_name":rs2[4].encode('ascii')}
    cp=name.copy()
    cp.update(loc)
    cp.update(typ)
    cp.update(knd)
    cp.update(rsid)
    cp.update(rgn)
    fin.append(str(cp))
  lst=tuple(fin)
  dic=zip(arr,lst)
  dat=dict(dic)
  conv=json.dumps(dat)
  con=conv.replace("'","\"")
  print con+";"
except:
 print "error"
