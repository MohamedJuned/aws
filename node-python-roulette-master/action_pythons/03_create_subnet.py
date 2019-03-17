import adal
import requests
import psycopg2
import json
import sys

subscription=sys.argv[1] #dynamic dropdown
resgrp=sys.argv[2]       #dynamic dropdown
vnet_name=sys.argv[3]    #dynamic dropdown
subnet_name=sys.argv[4]  #textbox
addr=sys.argv[5]         #textbox

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

data='{"properties": {"addressPrefix": "%s"}}'%(addr)

endpoint = 'https://management.azure.com/subscriptions/'+subscription+'/resourceGroups/'+resgrp+'/providers/Microsoft.Network/virtualNetworks/'+vnet_name+'/subnets/'+subnet_name+'?api-version=2018-08-01'

headers = {"Authorization": 'Bearer ' + access_token,"Content-Type":"application/json"}
son = requests.put(endpoint,headers=headers,data=data).json()
print son
