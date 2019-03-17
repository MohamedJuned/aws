"""Create and manage virtual machines.

This script expects that the following environment vars are set:

AZURE_TENANT_ID: your Azure Active Directory tenant id or domain
AZURE_CLIENT_ID: your Azure Active Directory Application Client ID
AZURE_CLIENT_SECRET: your Azure Active Directory Application Secret
AZURE_SUBSCRIPTION_ID: your Azure Subscription Id
"""
import os
import traceback
import sys

from azure.common.credentials import ServicePrincipalCredentials
from azure.mgmt.resource import ResourceManagementClient
from azure.mgmt.network import NetworkManagementClient
from azure.mgmt.compute import ComputeManagementClient
from azure.mgmt.compute.models import DiskCreateOption



from haikunator import Haikunator


haikunator = Haikunator()

GROUP_NAME = 'sqlchow-asa-rg'
VM_NAME = 'scxazit200'

def get_credentials():
    subscription_id = "1fc06365-ce9a-43a8-9870-e71470e5b213"
    credentials = ServicePrincipalCredentials(
       client_id="1a73b5f0-a4d0-471e-a82f-4ae042800e2b",
       secret="jkx5+Hx+JIwNWj89HUfF1diiKze2uFtIiVGfhxpdL2s=",
       tenant="2ae4329d-4b30-4373-9d9c-67813f569ae7"

    )
    return credentials, subscription_id

def run_example():
    """Virtual Machine management example."""
    #
    # Create all clients with an Application (service principal) token provider
    #
    credentials, subscription_id = get_credentials()
    resource_client = ResourceManagementClient(credentials, subscription_id)
    compute_client = ComputeManagementClient(credentials, subscription_id)
    network_client = NetworkManagementClient(credentials, subscription_id)

    ###########
    # Prepare #
    ###########
	
    virtual_machines = compute_client.virtual_machines.get(GROUP_NAME,VM_NAME)

    # List VMs in subscription
    print('\nList VMs in subscription')
    for vm in compute_client.virtual_machines.list_all():
        print("\tVM: {}".format(vm.name))

if __name__ == "__main__":
    run_example()

