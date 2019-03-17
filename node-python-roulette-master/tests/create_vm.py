import adal
import requests
import psycopg2
import json
import sys

subscription=sys.argv[1]  #dynamic dropdown
location=sys.argv[2]      #dynamic dropdown
vmSize=sys.argv[3]        #static
sku=sys.argv[4]           #static
publisher=sys.argv[5]     #static
offer=sys.argv[6]         #static
storage=sys.argv[7]       #static
usr=sys.argv[8]           #textbox
vmname=sys.argv[9]        #textbox
pas=sys.argv[10]          #textbox
resgrp=sys.argv[11]       #dynamic dropdown
net=sys.argv[12]          #dynamic dropdown
storagename=sys.argv[13]  #textbox

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

data='{"location": "%s","properties": {"hardwareProfile": {"vmSize": "%s"},"storageProfile": {"imageReference": {"sku": "%s","publisher": "%s","version": "latest","offer": "%s"},"osDisk": {"caching": "ReadWrite","managedDisk": {"storageAccountType": "%s"},"name": "%s","createOption": "FromImage"}},"osProfile": {"adminUsername": "%s","computerName": "%s","adminPassword": "%s"},"networkProfile": {"networkInterfaces": [{"id": "/subscriptions/%s/resourceGroups/%s/providers/Microsoft.Network/networkInterfaces/%s","properties": {"primary": true}}]}},"name": "%s"}'%(location,vmSize,sku,publisher,offer,storage,storagename,usr,vmname,pas,subscription,resgrp,net,vmname)

endpoint = 'https://management.azure.com/subscriptions/'+subscription+'/resourceGroups/'+resgrp+'/providers/Microsoft.Compute/virtualMachines/'+vmname+'?api-version=2018-06-01'

headers = {"Authorization": 'Bearer ' + access_token,"Content-Type":"application/json"}
son = requests.put(endpoint,headers=headers,data=data).json()
print son


































