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
 try:
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

    ###########
    # Prepare #
    ###########


    # List Resource Groups
  print('List Virtual Networks')
  for item in network_client.virtual_networks.list_all():
   print("\t Virtual Network Name: {}".format(item.name))
   print("\t Virtual Network Location: {}".format(item.location))
 except:
  print "wrong id"




