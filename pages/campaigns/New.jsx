import react,{useState} from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../Components/Layout";
import web3 from "../../ethereum/web3";
import instance from "../../ethereum/factory";
import {Router} from "../../routes";

export default function New(){
    const [value ,setValue] = useState('');
    const [errMessage, setErr] = useState('');
    const [loading,setLoading] = useState(false);
  
    async function onSubmit(e){
      e.preventDefault();
      setLoading(true);
      setErr('');
      try{
      const accounts = await web3.eth.getAccounts();
      await instance.methods.createCampaign(value).send({
          from:accounts[0]
      });
      Router.pushRoute('/');
       }catch(err){
       setErr(err.message);
      }
      setLoading(false);
    }
    return <div>
        <Layout>
          <h1>Create a Campaign</h1>
          <Form onSubmit={onSubmit} error={!!errMessage}>
              <Form.Field>
                  <label>Minimum contribution</label>
                  <Input label="wei" labelPosition="right"
                  value={value}
                  onChange={(e)=>{
                    setValue(e.currentTarget.value);
                  }}
                  ></Input>
              </Form.Field>
              <Message error header="Oops!" content={errMessage}></Message>
              <Button primary loading={loading}>Create !</Button>
          </Form>
        </Layout>
    </div>
}