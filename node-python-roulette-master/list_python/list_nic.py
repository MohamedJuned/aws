import adal
import requests
import psycopg2
import json
import sys

subscription=sys.argv[1] #dynamic dropdown
resgrp=sys.argv[2]       #dynamic dropdown
#vnet_name=sys.argv[3]    #dynamic dropdown

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
all=[]
arr1=[]
ab=0

conn = psycopg2.connect(database=database, user=user, password=password, host=host, port=port)
cur = conn.cursor()
#Database table extraction and copy the content.
cur.execute("SELECT tenant,client,secret FROM subscriptions WHERE subscription_id='%s'"%(subscription))
rows = cur.fetchall()
tenant=rows[0][0]
client=rows[0][1]
secret=rows[0][2]

authentication_endpoint = 'https://login.microsoftonline.com/'
resource  = 'https://management.core.windows.net/'
tenant_id=tenant
application_id=client
application_secret=secret
# get an Azure access token using the adal library
context = adal.AuthenticationContext(authentication_endpoint + tenant_id)
token_response = context.acquire_token_with_client_credentials(resource, application_id, application_secret)

access_token = token_response.get('accessToken')

endpoint = 'https://management.azure.com/subscriptions/'+subscription+'/resourceGroups/'+resgrp+'/providers/Microsoft.Network/networkInterfaces?api-version=2018-08-01'

headers = {"Authorization": 'Bearer ' + access_token,"Content-Type":"application/json"}
son = requests.get(endpoint,headers=headers).json()
entry=son["value"]
arr=[]
for data in entry:
  dat=data["name"]
  arr.append(dat.encode("utf-8"))
  s=json.dumps(arr)
print s
