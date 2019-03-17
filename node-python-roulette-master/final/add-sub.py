import os
import sys
import subprocess
import json
import psycopg2
# val=['d512d1c4-e52d-4c9e-bda6-b34bf9f30fd4','90f6efe7-f69f-4974-bf36-71659aff1df4','dfjsodjosjo','ishishcis']
sid=sys.argv[1]
tenant=sys.argv[2]
client=sys.argv[3]
secret=sys.argv[4]
# print sid
# print tenant
# print client
# print secret

'''lis=val.split()
lis=str(lis)
lis=lis.replace("[","").replace("]","")
lis=lis.split(',')

sid=str(lis[0]).replace('\'',' ').replace('"',' ')
tenant=str(lis[1]).replace('\'',' ').replace('"',' ')
client=str(lis[2]).replace('\'',' ').replace('"',' ')
secret=str(lis[3]).replace('\'',' ').replace('"',' ')
print sid,tenant'''
i=0

confs=json.load(open("config.json"))
entry=confs["data"]
for d in entry:
 database=d["database"]
 user=d["user"]
 password=d["password"]
 host=d["host"]
 port=d["port"]

proc=subprocess.Popen("az login --service-principal -u %s -p %s --tenant %s" %(client,secret,tenant), stdout=subprocess.PIPE,stderr=subprocess.PIPE, shell=True)
(out, err) = proc.communicate()
if err != '':
 print err
else:
#  print "---------------------------------"
 print "success"
#  print "---------------------------------"
 os.system("az logout")
 try:
  conn = psycopg2.connect(database=database, user=user, password=password, host=host, port=port)
  cur = conn.cursor()
  #Database table extraction and copy the content.
  cur.execute("INSERT INTO subscriptions (subscription_id,tenant,client,secret) VALUES('%s','%s','%s','%s')"%(sid,tenant,client,secret))
  conn.commit()
 except psycopg2.Error as e:
       #  print "------------"
       #  print "insert error"
        print e.pgerror