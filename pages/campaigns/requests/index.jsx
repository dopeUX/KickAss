import react,{useEffect} from "react";
import { Button, Table } from "semantic-ui-react";
import {Link} from '../../../routes';
import Layout from "../../../Components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../Components/RequestRow";

export default function Requests(props){
  const {Header, Row, HeaderCell, Body} = Table;
  // useEffect(()=>{
  //   console.log(props.requestCount);
  //   console.log(props.requests);
  // },[])
    return (
        <Layout>
          <h3>Requests</h3>
          <Link route={`/campaigns/${props.address}/requests/new`}>
           <a>
            <Button primary>Add Request</Button>
           </a>
          </Link>
          
          <Table>
            <Header>
              <Row>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Amount</HeaderCell>
                <HeaderCell>Recipient</HeaderCell>
                <HeaderCell>Approval</HeaderCell>
                <HeaderCell>Approve</HeaderCell>
                <HeaderCell>Finalize</HeaderCell>
              </Row>
            </Header>
             <Body>
               {
                 props.requests.map((request, index)=>{
                   return <RequestRow
                    key={index}
                    id={index}
                    request={request}
                    address={props.address}
                    approversCount = {props.approversCount}
                   />
                 })
               }
             </Body>
          </Table>
        </Layout>
    );
}

Requests.getInitialProps = async(props) => {
   const {address} = props.query;
   const campaign = Campaign(props.query.address);
   const requestCount = await campaign.methods.getRequestsCount().call();
   const approversCount = await campaign.methods.approversCount().call();
  //  console.log(requestCount)
   const req = await Promise.all(
       Array(parseInt(requestCount)).fill().map(async(element, index)=>{
          //  console.log(index)
           return campaign.methods.requests(index).call();
       })
     )
  //  for(let i=0; i<requestCount;i++){
  //    await requests.push(campaign.methods.requests(i).call); 
  //  }
    // console.log(req);
   return {address, requests:req, approversCount:approversCount};
}
