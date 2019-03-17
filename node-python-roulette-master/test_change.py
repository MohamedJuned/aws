import os
import sys
import subprocess
import json

# ub_id= 'd512d1c4-e52d-4c9e-bda6-b34bf9f30fd4,d512d1c4-e52d-4c9e-bda6-b34bf9f30fd4,d512d1c4-e52d-4c9e-bda6-b34bf9f30fd4'
# sub_id=['d512d1c4-e52d-4c9e-bda6-b34bf9f30fd4']

sub_id=sys.argv[1].split(',')
#client_id=sys.argv[2].split(',')
#tenant_id=sys.argv[3].split(',')
#secret=sys.argv[4].split(',')
for i in sub_id:
 #os.system('az account show --subscription '+i+'')
 proc=subprocess.Popen("az account show --subscription %s" % i, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
 (out, err) = proc.communicate()
 if(out <> ''):
   data=out.decode('utf8').replace("'",'"')
   val=json.loads(data)
   s = json.dumps(val, indent=4, sort_keys=True)
   print (s+';')
 else:
   print("Not Found")
