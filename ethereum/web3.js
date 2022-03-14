import Web3 from "web3";

let web3;
console.log('hey');
if(typeof window!=='undefined' && typeof window.web3!=='undefined'){
    // we are in browser 
    if (window.ethereum) {
       web3 = new Web3(window.ethereum);
       window.ethereum.request({ method: 'eth_requestAccounts' });
      }
      console.log('in browser')
 //  web3 = new Web3(window.web3.currentProvider);
}
else{
     console.log('on server');
     console.log('server started');
     const provider = new Web3.providers.HttpProvider(
     process.env.INFURA_API
   );
   web3 = new Web3(provider);
}

// const web3 = new Web3(window.web3.currentProvider);

export default web3;
