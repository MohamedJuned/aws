import adal
import requests
import psycopg2
import json
import os
import sys

try:
 subid=sys.argv[1]

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
 cur.execute("SELECT tenant,client,secret FROM subscriptions WHERE subscription_id='%s'"%subid)
 rows = cur.fetchall()
 for row in rows:
  tid=row[0]
  cid=row[1]
  skey=row[2]
  #print tid,cid,skey,sid
  authentication_endpoint = 'https://login.microsoftonline.com/'
  resource  = 'https://management.core.windows.net/'
  # get an Azure access token using the adal library
  context = adal.AuthenticationContext(authentication_endpoint + tid)
  token_response = context.acquire_token_with_client_credentials(resource, cid, skey)

  access_token = token_response.get('accessToken')

  endpoint = 'https://management.azure.com/subscriptions/%s/locations?api-version=2016-06-01'%(subid)

  headers = {"Authorization": 'Bearer ' + access_token}
  result = requests.get(endpoint,headers=headers).json()
  entry=result["value"]
  arr=[]
  for all in entry:
   name=all["displayName"]
   arr.append(name.encode("utf-8"))
   #arr.append(name)
  print arr
except:
 print "invalid"
