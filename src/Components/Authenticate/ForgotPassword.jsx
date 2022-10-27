import React from "react";
import { Button, FormControl,Input,InputLabel} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import ReactDOM from "react-dom/client";
import '../../index.css'
import Home from "./Home";
import axios from "axios";
import ResetPassword from "./ResetPassword";
import Login from "./Login";
import Register from "./Register";

export default class ForgotPassword extends React.Component
{
    constructor()
    {
        super();
        this.state={
            email:""
        };
    }
    isValid=()=>{
        if(this.state.email=="")
        return false;
        else
        return true;
    }
    getData=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    ForgotPassword=(e)=>{
        e.preventDefault();
        const root=ReactDOM.createRoot(document.getElementById("root"));
        let em=this.state.email;
        axios.get("http://localhost:5204/api/Authenticate/SecurityQuestion/"+em).then(r=>{
            if(r.data!="")
            {
                sessionStorage.setItem("question",r.data);
                sessionStorage.setItem("email",em);
                root.render(
                    <ResetPassword/>
                );
            }
            else{
                alert("No Record Found for Email Id : "+em);
                root.render(<ForgotPassword/>)
            }
        })
    }

    login=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<Login/>)
    }
    register=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<Register/>)
    }
    forgotpassword=()=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<ForgotPassword/>)
    }
    render()
    {
        return(
            <>
            <div className="container-fluid">
                    <nav>
                        <ol className="horizontal">
                            <li><button variant="contained" onClick={this.login}>Login</button> </li>
                            <li><button variant="contained" onClick={this.register}>Register</button> </li>
                            <li><button variant="contained" onClick={this.forgotpassword}>Forgot Password</button> </li>
                        </ol>
                    </nav>
                <CssBaseline/>
                <Paper className="paper">
                <form onSubmit={this.submitRegistration}>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="email" className="labels">Enter email Id</InputLabel>
                        <Input className="inputs" name="email" type="text" autoComplete="email" disableUnderline={true} onChange={this.getData}/>
                    </FormControl>
                    <Button disabled={!this.isValid()}
                    disableRipple
                    fullWidth
                    variant="text"
                    type="submit"
                    onClick={this.ForgotPassword} className="btn">Continue to Reset Password</Button>
                </form>
               </Paper>
            </div>
            </>
        )
    }
}