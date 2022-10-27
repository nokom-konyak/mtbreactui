import React from "react";
import { Button, FormControl,Input,InputLabel} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import  VisibilityTwoToneIcon  from "@mui/icons-material/VisibilityTwoTone";
import  VisibilityOffTwoToneIcon  from "@mui/icons-material/VisibilityOffTwoTone";
import InputAdornment from "@mui/material/InputAdornment";
import LoginIcon from '@mui/icons-material/Login';
import ReactDOM from "react-dom/client";
import '../../index.css'
import Home from "./Home";
import axios from "axios";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import OwnerMenu from "../Owner/OwnerMenu";
import AdminMenu from "../Admin/AdminMenu";
import CustomerMenu from "../Customer/CustomerMenu";
export default class Login extends React.Component
{
     constructor()
     {
        super();
        this.state={
            email:"",
            password:"", 
        };
     }

     showPassword = () =>{
        this.setState(prevState => ({
            hidePassword:!prevState.hidePassword
        }));
    }
     
     getData=(e)=>{
        this.setState({[e.target.name]:e.target.value});
     }

     isValid=()=>{
        if((this.state.email==="")||(this.state.password===""))
            return false;
        else
            return true;
     }
     Login=(e)=>{
        e.preventDefault();
        const root=ReactDOM.createRoot(document.getElementById("root"));
        let em=this.state.email;
        let pwd=this.state.password;
        axios.get("http://localhost:5204/api/Authenticate/Login/"+em+"/"+pwd).then(r=>{
            alert(r.data);
            if(r.data=="Owner")
            {
                sessionStorage.setItem("email",em);
                root.render(
                    <OwnerMenu/>
                );
            }
            else if(r.data=="Customer")
            {
                sessionStorage.setItem("email",em)
                root.render(
                    <CustomerMenu/>
                );
            }
            else if(r.data=="Admin")
            {
                sessionStorage.setItem("email",em);
                root.render(
                    <AdminMenu/>
                );
            }
            else{
                alert("Incorrect Creditials!!!!")
                root.render(<Home/>)
            }
        });
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
                    <nav>
                        <ol className="horizontal">
                            <li><button variant="contained" onClick={this.login}>Login</button> </li>
                            <li><button variant="contained" onClick={this.register}>Register</button> </li>
                            <li><button variant="contained" onClick={this.forgotpassword}>Forgot Password</button> </li>
                        </ol>
                    </nav>
            <div className="form">
                <CssBaseline/>
                <Paper className="paper">
                    <Avatar>
                        <LoginIcon></LoginIcon>
                    </Avatar>
          
                <form onSubmit={this.submitRegistration}>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="email" className="labels">Enter email Id</InputLabel>
                        <Input className="inputs" name="email" type="text" autoComplete="email" disableUnderline={true} onChange={this.getData}/>
                    </FormControl>
                    <FormControl required fullWidth margin="normal" >
                        <InputLabel htmlFor="password" className="labels">Password</InputLabel>
                        <Input className="inputs" name="password"  autoComplete="password" disableUnderline={true} onChange={this.getData}
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
                        }
                        />
                    </FormControl>

                    <Button disabled={!this.isValid()}
                    disableRipple
                    fullWidth
                    variant="text"
                    type="submit"
                    onClick={this.Login} className="btn">Login</Button>
                </form>
               </Paper>
               </div>
               </>
        );
    }
}
     

     
    
