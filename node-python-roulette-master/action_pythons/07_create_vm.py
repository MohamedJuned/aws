import os
import sys
import json
import adal
import requests
import psycopg2

from azure.common.credentials import ServicePrincipalCredentials
from azure.mgmt.resource import ResourceManagementClient

from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.compute import ComputeManagementClient
from haikunator import Haikunator

haikunator = Haikunator()

# Azure Datacenter
subscription = sys.argv[1]
resgrp = sys.argv[2]
location = sys.argv[3]
nic = sys.argv[4]
vm_size=sys.argv[5]
offer = sys.argv[6]
publisher = sys.argv[7] 
sku = sys.argv[8]
vmname = sys.argv[9]

USERNAME = 'azureuser'
PASSWORD = 'Pa$$w0rd123'
location=location.lower()
location=location.replace(" ","")
nic_id = '/subscriptions/'+subscription+'/resourceGroups/'+resgrp+'/providers/Microsoft.Network/networkInterfaces/'+nic

VM_REFERENCE = {'linux': {
        'publisher': publisher,
        'offer': offer,
        'sku': sku,
        'version': 'latest'
    }
 }

'''
VM_REFERENCE = {
    'linux': {
        'publisher': 'Canonical',
        'offer': 'UbuntuServer',
        'sku': '16.04.0-LTS',
        'version': 'latest'
    }
}
'''
def get_credentials():
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
  cur.execute("SELECT client,secret,tenant FROM subscriptions WHERE subscription_id='%s' " %subscription)
  rows = cur.fetchall()

  for row in rows:
    c = row[i]
    s = row[i+1]
    t = row[i+2]

  credentials = ServicePrincipalCredentials(
    client_id = c,
    secret = s,
    tenant = t
  )

  subscription_id=''.join(subscription)
  return credentials, subscription_id


def run_example():
    credentials, subscription_id = get_credentials()
    resource_client = ResourceManagementClient(credentials, subscription_id)
    compute_client = ComputeManagementClient(credentials, subscription_id) 
    network_client = NetworkManagementClient(credentials, subscription_id)


    # Create Linux VM
    #print('\nCreating Linux Virtual Machine')
    vm_parameters = create_vm_parameters(nic_id, VM_REFERENCE['linux'])
    async_vm_creation = compute_client.virtual_machines.create_or_update(
        resgrp, vmname, vm_parameters)
    async_vm_creation.wait()
    print("VM %s Created " %(vmname))


def create_vm_parameters(nic_id, vm_reference):
    """Create the VM parameters structure.
    """
    return {
        'location': location,
        'os_profile': {
            'computer_name': vmname,
            'admin_username': USERNAME,
            'admin_password': PASSWORD
        },
        'hardware_profile': {
            'vm_size': 'Standard_DS1_v2'
        },
        'storage_profile': {
            'image_reference': {
                'publisher': vm_reference['publisher'],
                'offer': vm_reference['offer'],
                'sku': vm_reference['sku'],
                'version': vm_reference['version']
            },
        },
        'network_profile': {
            'network_interfaces': [{
                'id': nic_id,
            }]
        },
    }


if __name__ == "__main__":
    run_example()
