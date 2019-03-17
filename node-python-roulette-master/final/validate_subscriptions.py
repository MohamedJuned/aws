import os
import sys
import json
import subprocess

client_id=sys.argv[1]
client_secret=sys.argv[2]
tenant=sys.argv[3]
subscription_id=sys.argv[4]

proc = subprocess.Popen(["az login --service-principal -u %s -p %s --tenant %s"%(client_id,client_secret,tenant)], stdout=subprocess.PIPE,stderr=subprocess.PIPE, shell=True)
(out, err) = proc.communicate()
try:
 data=json.loads(out)
 for i in data:
  name=i["name"]
  state=i["state"]
  subscription=i["id"]
  if subscription_id == subscription:
   print out
   os.system("az logout")
  else:
   print "invalid"
except:
 val=json.dumps(err)
 error={"error":val}
 print error
