# deploy.py
from genlayer import *

from fein import Fein  # Assuming your contract is in 'fein.py'

def main():
    # Connect to GenVM node (this will automatically use your local credentials/config)
    gl.connect()

    # Deploy the contract
    contract = gl.deploy(Fein)

    # Print deployed contract address
    print(f"Contract deployed at address: {contract.address}")

if __name__ == "__main__":
    main()
