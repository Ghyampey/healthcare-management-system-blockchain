// const fs = require('fs');
// const {Web3} = require('web3');



// const abi = JSON.parse(fs.readFileSync("/Desktop/Blockchain-based-healthcare-data-system-with-disease-prediction-main/backend/contracts/Cruds.abi"));
// const bytecode = fs.readFileSync("/Desktop/Blockchain-based-healthcare-data-system-with-disease-prediction-main/backend/contracts/Cruds.bin").toString();

// const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:8545"));

// async function deploy() {
//     // const w3 = new Web3(window.ethereum);
//     let contract = new web3.eth.Contract(abi);
//     contract = contract.deploy({data: bytecode});

//     const deployContract = await contract.send({
//         from: "0xf8328Eb18d6dCD7497655663C06f4f83ABA89CA8",
//         gas: "6721975",
//     })
//     console.log(deployContract.options.address);
// }

// deploy();
const fs = require('fs');
const solc = require('solc');
const path = require('path');
const { Web3 } = require('web3');

// Connect to local Ganache
const web3 = new Web3("http://127.0.0.1:8545");

async function compileAndDeploy() {
    const contractPath = path.resolve(__dirname, 'contracts', 'Cruds.sol');
    const sourceCode = fs.readFileSync(contractPath, 'utf8');

    console.log("🛠️  Compiling with solc version:", solc.version());

    const input = {
        language: 'Solidity',
        sources: {
            'Cruds.sol': {
                content: sourceCode
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    if (output.errors) {
        let hasError = false;
        output.errors.forEach(err => {
            console.error(err.formattedMessage);
            if (err.severity === 'error') hasError = true;
        });
        if (hasError) {
            throw new Error('❌ Compilation failed.');
        }
    }

    const contractName = 'Cruds';
    const compiledContract = output.contracts['Cruds.sol'][contractName];
    const abi = compiledContract.abi;
    const bytecode = compiledContract.evm.bytecode.object;

    if (!bytecode || bytecode.length < 10) {
        throw new Error("❌ Invalid bytecode: Compilation likely failed silently.");
    }

    console.log("📦 ABI length:", abi.length);
    console.log("🧱 Bytecode length:", bytecode.length);

    const accounts = await web3.eth.getAccounts();
    const deployer = accounts[0];
    console.log("🚀 Deploying from account:", deployer);

    const contract = new web3.eth.Contract(abi);

    const deployedContract = await contract.deploy({ data: '0x' + bytecode }).send({
        from: deployer,
        gas: 6000000, // Safer gas below block limit
    });

    console.log("✅ Contract deployed at:", deployedContract.options.address);

    // Save ABI and Address
    fs.writeFileSync('CrudsABI.json', JSON.stringify(abi, null, 2));
    fs.writeFileSync('deployedAddress.txt', deployedContract.options.address);
}

compileAndDeploy().catch(err => {
    console.error("❌ Deployment failed with error:\n", err.message);
});
