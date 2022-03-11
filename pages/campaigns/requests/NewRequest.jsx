import react,{useState} from "react";
import {Form, Button, Message, Input} from 'semantic-ui-react';
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import {Link, Router} from '../../../routes'
import Layout from "../../../Components/Layout";

export default function NewRequest(props){
    const [value, setValue] = useState();
    const [desc, setDesc] = useState('');
    const [recipient, setRecipient] = useState();
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState('');

      const onSubmit = async(event) =>{
        event.preventDefault();
        const campaign = Campaign(props.address);
        setLoading(true);
        setErrMessage('');
        try{  
          const accounts = await web3.eth.getAccounts();
          await campaign.methods.createRequest(
                desc,
                web3.utils.toWei(value, 'ether'),
               '0x008E6c04c43C249C19de944631d52BB683b8d77E'
          ).send({from:accounts[0]}) ;
          Router.pushRoute(`/campaigns/${props.address}/requests`)
        }catch(err){
           setErrMessage(err.message);
        }
        setValue('');
        setLoading(false);
    }
    return (
        <Layout>
          <Link route={`/campaigns/${props.address}/requests`}>
            <a>Back</a>
          </Link>  
          <h3>New Request</h3>
          <Form onSubmit={onSubmit} error={!!errMessage}>
              <Form.Field>
                  <label>Description</label>
                  <Input value={desc} onChange={(e)=>{setDesc(e.currentTarget.value)}}/>
              </Form.Field>
              <Form.Field>
                  <label>Value in ether</label>
                  <Input value={value} onChange={(e)=>{setValue(e.currentTarget.value)}}/>
              </Form.Field>
              <Form.Field>
                  <label>Recipient</label>
                  <Input value={recipient} onChange={(e)=>{setRecipient(e.currentTarget.value)}}/>
              </Form.Field>
              <Message error header="Oops!" content={errMessage}></Message>
              <Button primary loading={loading}>Create!</Button>
          </Form>
        </Layout>
    );
}

NewRequest.getInitialProps = async(props)=>{
  const {address} = props.query;
  return {address};
}