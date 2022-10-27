import React from "react";
import ChangePassword from "../Authenticate/ChangePassword";
import {BrowserRouter as Router , Link  , Route , Routes} from "react-router-dom";
import CustomerList from "./CustomerList";
import AdminList from "./AdminList";
import MultiplexList from "./MultiplexList";
import DisplayAppRating from "./ShowAppRating";
import AllOrder from "./AllOrders";

export default class OwnerMenu extends React.Component
{
    render()
    {
        return(
            <>
            <Router>
            <nav>
                <ol className="horizontal">
                    <li><Link to="CustomerList">Customer List</Link></li>
                    <li><Link to="AdminList">Admin List</Link></li>
                    <li><Link to="MultiplexList">Multiplex List</Link> </li>
                    <li><Link to="AllOrder">All Orders</Link></li>
                    <li><Link to="DisplayAppRating">Display App Rating</Link></li>
                    <li><Link to="ChangePassword">Change Password</Link> </li>
                </ol>
                <Routes>
                    <Route exact path="/CustomerList" element={<CustomerList/>}></Route>
                    <Route exact path="/ChangePassword" element={<ChangePassword/>}></Route>
                    <Route exact path="/AdminList" element={<AdminList/>}></Route>
                    <Route exact path="/MultiplexList" element={<MultiplexList/>}></Route>
                    <Route exact path="DisplayAppRating" element={<DisplayAppRating/>}></Route>
                    <Route exact path="AllOrder" element={<AllOrder/>}></Route>
                </Routes>
            </nav>
            </Router>
            </>

        )
    }
}