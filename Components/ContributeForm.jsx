import react,{useState} from "react";
import {Form, Input, Message, Button} from 'semantic-ui-react';
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import {Router} from '../routes';

export default function ContributeForm(props){
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    
    async function onSubmit(e){
      e.preventDefault();
      const campaign = Campaign(props.address);
      setErrMessage('');
      setLoading(true);
      try{
       const accounts = await web3.eth.getAccounts();
       await campaign.methods.contribute().send({
           from:accounts[0],
           value: web3.utils.toWei(value, 'ether')
       });
        Router.replaceRoute(`/campaigns/${props.address}`)  
      }catch(err){
        setErrMessage(err.message);
      }

      setLoading(false);
      setValue('');
    }
    return (
        <Form onSubmit={onSubmit} error={!!errMessage}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input label="ether" labelPosition="right"
                value={value}
                onChange={(e)=>{
                   setValue(e.currentTarget.value);
                }}
                ></Input>
            </Form.Field>
            <Message error header="Oops!" content={errMessage}/>
            <Button primary loading={loading}>Contribute</Button>
        </Form>
    );
}