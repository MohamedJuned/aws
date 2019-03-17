import os
import sys
import subprocess
import json

# ub_id= 'd512d1c4-e52d-4c9e-bda6-b34bf9f30fd4,d512d1c4-e52d-4c9e-bda6-b34bf9f30fd4,d512d1c4-e52d-4c9e-bda6-b34bf9f30fd4'
# sub_id=ub_id.split(',')
# sub_id=sys.argv[1].split(',')
sub_id=['9f112f74-5515-4c9a-916f-f3a4240ae2d0','d512d1c4-e52d-4c9e-bda6-b34bf9f30fd4']
# sub_id="d512d1c4-e52d-4c9e-bda6-b34bf9f30fd4"
for i in sub_id:
    #os.system('az account show --subscription '+i+'') 

    proc=subprocess.Popen("az account show --subscription %s" % i, stdout=subprocess.PIPE, shell=True)
    (out, err) = proc.communicate()
    data=out.decode('utf8').replace("'",'"')
    val=json.loads(data)
    s = json.dumps(val, indent=4, sort_keys=True)
    print (s+';')
# os.system('az account list ')
 