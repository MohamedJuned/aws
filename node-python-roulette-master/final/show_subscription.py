import os
import sys
import subprocess
import json
import psycopg2


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
cur.execute("SELECT client,secret,tenant,subscription_id FROM subscriptions")
rows=cur.fetchall()

for i in rows:
 cid=i[0]
 sec=i[1]
 ten=i[2]
 sub=i[3]
 #os.system("az login --service-principal -u %s -p %s --tenant %s" %(cid,sec,ten))
 proc=subprocess.Popen("az login --service-principal -u %s -p %s --tenant %s" %(cid,sec,ten), stdout=subprocess.PIPE, shell=True)
 (out, err) = proc.communicate()
 print (out+';')

os.system("az logout")
