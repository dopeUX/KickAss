const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const provider = new HDWalletProvider(
    'actress general ankle broom elegant whip broken narrow pumpkin dose plunge note',
    'https://rinkeby.infura.io/v3/2ebf91b29af74714a3ac9d271adcf3b6'
  );

const web3 = new Web3(provider);

const deploy = async() =>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from',accounts[0]);
  
  const result =  await new web3.eth.Contract(compiledFactory.abi)
    .deploy({data:'0x'+ compiledFactory.evm.bytecode.object})
    .send({gas:'5000000', from:accounts[0]});
     
   // console.log(interface) 
    console.log('contract deployed to', result.options.address);
   
  }
  deploy();
