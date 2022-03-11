import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json';
const address =  process.env.ADDRESS;

const instance = new web3.eth.Contract(
     campaignFactory.abi,
     '0xb4A6F688B89a6f3161cC615Dbee6b05a73Aa8948'
);
// console.log(instance.methods.getDeployedCampaigns())

export default instance;
