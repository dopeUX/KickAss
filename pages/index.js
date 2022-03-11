import React,{useRef} from "react";
import factory from '../ethereum/factory.js';
import {Button, Card} from 'semantic-ui-react';
import Layout from "../Components/Layout.jsx";
import {Link} from '../routes';
import 'semantic-ui-css/semantic.min.css';


export default function CampaignIndex(props){
    const ref = React.useRef(null);
   // const [campaigns, setCampaigns] = useState([]);
    return(
        <div ref={ref} >
         <Layout>
        
          <Link route="/campaigns/new">
           <a>
           <Button  floated="right" content="Create Campaign" icon="add circle" primary={true}/>
           </a>
          </Link>
          <Card.Group items={props.campaigns.map(address=>{
            return {
                header:address,
                description:(
                <Link route={`/campaigns/${address}`}>
                <a>View campaign</a>
                </Link>),
                fluid:true
            }
        })}/>
         
         </Layout>  
        </div>
    )
}

CampaignIndex.getInitialProps = async() =>{
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {campaigns}
}