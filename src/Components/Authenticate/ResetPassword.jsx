import React from "react";
import { Button, FormControl,Input,InputLabel} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import  VisibilityTwoToneIcon  from "@mui/icons-material/VisibilityTwoTone";
import  VisibilityOffTwoToneIcon  from "@mui/icons-material/VisibilityOffTwoTone";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import ReactDOM from "react-dom/client";
import '../../index.css'
import axios from "axios";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";

export default class ResetPassword extends React.Component
{
    constructor()
    {
        super();
        this.state={
            ans:"",
            pwd:"",
            cpwd:"",
            email:sessionStorage.getItem("email"),
            question:sessionStorage.getItem("question")
        };
    }
    showPassword = () =>{
        this.setState(prevState => ({
            hidePassword:!prevState.hidePassword
        }));
    }

    isValid=()=>{
        if(this.state.ans===""||this.state.pwd===""||this.state.cpwd==="")
        return false;
        else
        return true;
    }
    getData=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    ResetPassword=(e)=>{
        e.preventDefault();
        const root=ReactDOM.createRoot(document.getElementById("root"));
        let em=this.state.email;
        let ans=this.state.ans;
        let pwd=this.state.pwd;
        let cpwd=this.state.cpwd;
        if(pwd!=cpwd)
        {
            alert("Password and Confirm Password Does Not Match!!!\nPlease ReEnter The Password");
            return;
        }
        axios.put("http://localhost:5204/api/Authenticate/forgotPwd/"+em+"/"+ans+"/"+pwd).then(r=>{
            if(r.data)
            {
                alert("Password Reset Successfull!!!")
                root.render(
                    <Login/>
                );
            }
            else{
                alert("Wrong Security Answer!!! Or Entering Your Same Old Password");
                return;
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
                        <Input className="inputs" disableUnderline={true} value="Email Id" />
                        <Input className="inputs" disableUnderline={true} value={this.state.email} />
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <Input className="inputs" disableUnderline={true} value="Security Question" />
                        <Input className="inputs" disableUnderline={true} value={this.state.question} />
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="ans" className="labels">Enter Your Security Answer</InputLabel>
                        <Input className="inputs" name="ans" type="text" autoComplete="ans" disableUnderline={true} onInput={this.getData}/>
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="pwd" className="labels">Enter New Password</InputLabel>
                        <Input className="inputs" name="pwd"  autoComplete="pwd" disableUnderline={true} onInput={this.getData}
                        type={this.state.hidePassword?"password":"input"}
                        endAdornment={
                            this.state.hidePassword?(
                                <InputAdornment>
                                    <VisibilityOffTwoToneIcon fontSize="default" onClick={this.showPassword}/>
                                </InputAdornment>
                            ):(
                                <InputAdornment position="end">
                                    <VisibilityTwoToneIcon fontSize="default" onClick={this.showPassword}/>
                                </InputAdornment>
                            )
                        }/>
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="cpwd" className="labels">ReEnter New Password</InputLabel>
                        <Input className="inputs" name="cpwd" autoComplete="cpwd" disableUnderline={true} onInput={this.getData}
                        type={this.state.hidePassword?"password":"input"}
                        endAdornment={
                            this.state.hidePassword?(
                                <InputAdornment>
                                    <VisibilityOffTwoToneIcon fontSize="default" onClick={this.showPassword}/>
                                </InputAdornment>
                            ):(
                                <InputAdornment position="end">
                                    <VisibilityTwoToneIcon fontSize="default" onClick={this.showPassword}/>
                                </InputAdornment>
                            )
                        }/>
                    </FormControl>

                    <Button disabled={!this.isValid()}
                    disableRipple
                    fullWidth
                    variant="text"
                    type="submit"
                    onClick={this.ResetPassword} className="btn">Reset Password</Button>
                </form>
               </Paper>
            </div>
            </>
        )
    }
}