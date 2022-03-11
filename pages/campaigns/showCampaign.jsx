import react from "react";
import { useEffect } from "react/cjs/react.production.min";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from '../../Components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from "../../ethereum/web3";
import ContributeForm from "../../Components/ContributeForm";
import {Link} from '../../routes';

export default function showCampaign(props){
   const {minContribution, balance, requestsCount, approversCount, manager} = props;
   const items = [
       {
           header:manager,
           meta:'Address of manager',
           description:'This is the address of manager and can create requests to withdraw money needed to run campaigns',
           style:{overflowWrap:'break-word'}
       },
       {
           header:minContribution,
           meta:'Minimum Contribution (wei)',
           description:'You must contribute at least this much specified wei to become a part of this campaign',
       },
       {
           header:requestsCount,
           meta:'Number of request',
           description:'A request tries to withdraw money from the contract. The request must be approved by approvers',
       },
       {
           header:approversCount,
           meta:'Number of approvers',
           description:'Number of people who have already donated to this campaign',
       },
       {
           header:web3.utils.fromWei(balance, 'ether'),
           meta:'Campaign balance (ether)',
           description:'The balance is the amount of money this campaign needs to spend',
       }
   ]
    return(
        <Layout>
           <h1>Campaign Details</h1>
           <Grid>
            <Grid.Row>
            <Grid.Column width={10}>
                <Card.Group items={items}/>
            </Grid.Column>    
            <Grid.Column width={6}>
               <ContributeForm address={props.address}/>
            </Grid.Column> 
            </Grid.Row> 
            <Grid.Row>
              <Grid.Column>
                <Link route={`/campaigns/${props.address}/requests`}>
                  <a>
                    <Button primary>View requests</Button>
                  </a>
                 </Link>
              </Grid.Column>
            </Grid.Row>     
           </Grid>  
          
          
        </Layout>
    )
}

showCampaign.getInitialProps = async(props)=>{
   const campaign = await Campaign(props.query.address);
   const summary = await campaign.methods.getSummary().call();
//    console.log(summary);
   return {
       address:props.query.address,
       minContribution:summary[0],
       balance:summary[1],
       requestsCount:summary[2],
       approversCount:summary[3],
       manager:summary[4]   
   };
}