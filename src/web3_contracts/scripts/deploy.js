const path = require("path");
const fs = require("fs");
const { artifacts } = require("hardhat");
const { ethers } = require('hardhat');

async function main() {
  const Fein = await ethers.getContractFactory("Fein");
  const fein = await Fein.deploy();

  await fein.deployed();
  console.log("SimpleStorage deployed to:", fein.address);
  saveFrontendFiles(fein, "Fein");
}

function saveFrontendFiles(contract, name) {
  // const fs = require("fs");
  const contractsDir = __dirname + "../../../contract_data";

  if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir, { recursive: true });
  }

  fs.writeFileSync(
      contractsDir + `/${name}-address.json`,
      JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
      contractsDir + `/${name}.json`,
      JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });