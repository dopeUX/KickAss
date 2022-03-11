import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json';
const address =  process.env.BASE_URL;

const instance = new web3.eth.Contract(
     campaignFactory.abi,
     address
);
// console.log(instance.methods.getDeployedCampaigns())

export default instance;