import react from "react";
import { Menu } from "semantic-ui-react";
import {Link} from '../routes';

export default function Header(){
     return(
        <Menu style={{marginTop:'10px'}}>
           <Link route="/">
               <a className="item">KickAss</a>
               </Link>
            {/* <Menu.Item>Crowd Coin</Menu.Item> */}
            <Menu.Menu position="right">
               <Link route="/">
               <a className="item">KickAss</a>
               </Link>
               <Link route="/campaigns/new">
                 <a className="item">+</a>
               </Link>
            </Menu.Menu>
        </Menu>
    )
}
