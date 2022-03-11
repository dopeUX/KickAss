import react,{useState} from "react";
import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import {Router} from '../routes';

export default function RequestRow(props){
    const {Row, Cell} = Table;
    const {description,value, recipient, approvalCount, complete} = props.request;
    const [appproveLoad,setApproveLoad] = useState(false);
    const [finalizeLoad, setFinalizeLoad] = useState(false);
    const readyToFinalize = approvalCount>props.approversCount/2;
    const onApprove = async() => {
       setApproveLoad(true); 
       try{
       const campaign = Campaign(props.address);
       const accounts = await web3.eth.getAccounts()
       await campaign.methods.approveRequest(props.id).send({
           from:accounts[0]
       });
      }catch(err){
          console.log(err.message);
      }
       setApproveLoad(false);
       Router.replaceRoute(`/campaigns/${props.address}/requests`)
     //  Router.replaceRoute(`campaigns/${props.address}/requests`);
    }
    const onFinalize = async() =>{
        setFinalizeLoad(true)
        try{
        const campaign = Campaign(props.address);
        const accounts = await web3.eth.getAccounts()
        await campaign.methods.finalizeRequest(props.id).send({
            from:accounts[0]
        })
       }catch(err){
         console.log(err.message);
       }
       setFinalizeLoad(false);
       Router.replaceRoute(`/campaigns/${props.address}/requests`)
    }
    
    return (
        <Row disabled={complete} positive={readyToFinalize && !complete}>
            <Cell>{props.id+1}</Cell>
            <Cell>{description}</Cell>
            <Cell>{web3.utils.fromWei(value,'ether')}</Cell>
            <Cell>{recipient}</Cell>
            <Cell>{approvalCount}/{props.approversCount}</Cell>
            <Cell>
              { complete?null:(
                <Button loading={appproveLoad} color="green" basic onClick={onApprove}>Approve</Button>    
              )}
              </Cell>
            <Cell>
              { complete?null:(  
              <Button loading={finalizeLoad} color="teal" basic onClick={onFinalize}>Finalize</Button>    
              )}
            </Cell>
        </Row>
    );
}