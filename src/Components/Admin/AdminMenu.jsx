import {BrowserRouter as Router , Link  , Route , Routes} from "react-router-dom";
import '../../index.css';
import ChangePassword from "../Authenticate/ChangePassword";
import GiveRating from "../Authenticate/GiveAppRating";
import AdminOrder from "./order-admin";
import AddMoviesMultiplex from "./RegisterMovie";
import DisplayMovie from "./show-admin-movie";
import UpdateMovie from "./update-movie";
export default function AdminMenu()
{
    return(
        <Router>
            <nav>
                <ol className="horizontal">
                    <li><Link to="addmovie">Register Movie Multiplex</Link></li>
                    <li><Link to="DisplayMovie">Show Movie Multiplex</Link></li>
                    <li><Link to="AdminOrder">View Order Received</Link> </li>
                    <li><Link to="UpdateMovie">Update Movie</Link></li>
                    <li><Link to="ChangePassword">Change Password</Link></li>
                    <li><Link to="GiveRating">Give App Rating</Link> </li>
                </ol>
                <Routes>
                    <Route exact path="/addmovie" element={<AddMoviesMultiplex/>}></Route>
                    <Route exact path="/DisplayMovie" element={<DisplayMovie/>}></Route>
                    <Route exact path="/ChangePassword" element={<ChangePassword/>}></Route>
                    <Route exact path="/GiveRating" element={<GiveRating/>}></Route>
                    <Route exact path="/UpdateMovie" element={<UpdateMovie/>}></Route>
                    <Route exact path="/AdminOrder" element={<AdminOrder/>}></Route>
                </Routes>
            </nav>
        </Router>
    )
}