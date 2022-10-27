import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import { Button, FormControl,Input,InputLabel} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import LoginIcon from '@mui/icons-material/Login';
import ReactDOM from "react-dom/client";
import '../../index.css'
import CustomerMenu from "../Customer/CustomerMenu";
import ShowMovieByTime from "./ShowMovieByTime";
export default class MovieByTime extends React.Component
{
     constructor()
     {
        super();
        this.state={
            startT:"",
            endT:""
        };
     }
     
     getData=(e)=>{
        this.setState({[e.target.name]:e.target.value});
     }

     isValid=()=>{
        if((this.state.startT==="")||(this.state.endT===""))
            return false;
        else
            return true;
     }
     SearchMovie=(e)=>{
        e.preventDefault();
        const root=ReactDOM.createRoot(document.getElementById("root"));
        let st=this.state.startT;
        let et=this.state.endT;
        sessionStorage.setItem("startT",st);
        sessionStorage.setItem("endT",et);
        root.render(<ShowMovieByTime/>);
        
    }
    custmenu=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<CustomerMenu/>)
    }
    
     render()
     {
        return(
            <>
            <div class="container-fluid">
            <Router>
                <nav>
                    <ol className="horizontal">
                        <li><button onClick={this.custmenu}>Customer Menu</button> </li>
                    </ol> 
                </nav>
            </Router> 
            <div className="form">
                <CssBaseline/>
                <Paper className="paper">
                    <Avatar>
                        <LoginIcon></LoginIcon>
                    </Avatar>
          
                <form onSubmit={this.submitRegistration}>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="email" className="labels">Enter Movie Start Time: </InputLabel>
                        <Input className="inputs" name="startT" type="datetime-local" autoComplete="startT" disableUnderline={true} onChange={this.getData}/>
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="email" className="labels">Enter Movie End Time: </InputLabel>
                        <Input className="inputs" name="endT" type="datetime-local" autoComplete="endT" disableUnderline={true} onChange={this.getData}/>
                    </FormControl>
                    

                    <Button disabled={!this.isValid()}
                    disableRipple
                    fullWidth
                    variant="text"
                    type="submit"
                    onClick={this.SearchMovie} className="btn">Search Movie</Button>
                </form>
               </Paper>
               </div>
               </div>
               </>
        );
    }
}
     

     
    
