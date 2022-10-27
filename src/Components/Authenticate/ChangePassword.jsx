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
import axios from "axios";
import Login from "./Login";
export default class ChangePassword extends React.Component
{
     constructor()
     {
        super();
        this.state={
            email:sessionStorage.getItem("email"),
            oldpwd:"",
            newpwd:"",
            confirmnewpwd:""
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
        if(this.state.oldpwd===""||this.state.newpwd==="" || this.state.confirmnewpwd==="")
            return false;
        else
            return true;
     }
     ChangePassword=(e)=>{
        e.preventDefault();
        const root=ReactDOM.createRoot(document.getElementById("root"));
        let em=this.state.email;
        let oldpwd=this.state.oldpwd;
        let newpwd=this.state.newpwd;
        let confirmnewpwd=this.state.confirmnewpwd;

        if(newpwd!=confirmnewpwd)
        {
            alert("New Password Confirmation Failed!!!!");
            return ;
        }

        axios.put("http://localhost:5204/api/Authenticate/UpdatePwd/"+em+"/"+oldpwd+"/"+newpwd).then(r=>{
            if(r.data)
            {
                alert("Password Changed Successfully!!!");
                root.render(
                    <Login/>
                )
            }
            else
            {
                alert("Please Enter Correct Old Password");
                return ;
            }
        });
    }
    
     render()
     {
        return(
            <div className="form">
                <CssBaseline/>
                <Paper className="paper">
                    <Avatar>
                        <LoginIcon></LoginIcon>
                    </Avatar>
          
                <form onSubmit={this.submitRegistration}>
                    <FormControl required fullWidth margin="normal">
                        <Input value="Email Id : "/>
                        <Input value={this.state.email} />
                    </FormControl>
                    <FormControl required fullWidth margin="normal" >
                        <InputLabel htmlFor="password" className="labels">Enter Old Password</InputLabel>
                        <Input className="inputs" name="oldpwd"  autoComplete="password" disableUnderline={true} onChange={this.getData}
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
                    <FormControl required fullWidth margin="normal" >
                        <InputLabel htmlFor="password" className="labels">Enter New Password</InputLabel>
                        <Input className="inputs" name="newpwd"  autoComplete="password" disableUnderline={true} onChange={this.getData}
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
                    <FormControl required fullWidth margin="normal" >
                        <InputLabel htmlFor="password" className="labels">ReEnter new Password</InputLabel>
                        <Input className="inputs" name="confirmnewpwd"  autoComplete="password" disableUnderline={true} onChange={this.getData}
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
                    onClick={this.ChangePassword} className="btn">Login</Button>
                </form>
               </Paper>
               </div>
        );
    }
}
     

     
    
