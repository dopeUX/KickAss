import react,{useRef} from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";

export default function Layout(props){
    const ref = useRef(null);
    return (
        <Container>
            {/* <Head>
            <link href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" rel="stylesheet" />
            </Head> */}
            <Header/>
             {props.children}
            <h1>2022 © KickAss. All Rights Reserved</h1>
        </Container>
    )
}