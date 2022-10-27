import React from "react";
import { FormLabel,FormControl,Input,InputLabel, Button, Select, MenuItem} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import InputAdornment from "@mui/material/InputAdornment";
import '../../index.css';
import axios from "axios";
import ReactDOM from "react-dom/client";
import Login from './Login';
import ForgotPassword from "./ForgotPassword";
export default class Register extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            email : '',
            password : '',
            passwordConfirm : '',
            city:'',
            userType : '',
            phone : '',
            que : ' ',
            ans : ' ',
            error : null,
            errorOpen : false
        };
    }

    errorClose = (e) =>{
        this.setState({
            errorOpen : false
        });
    }

    getData = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    passwordMatch = () =>{
        return this.state.password === this.state.passwordConfirm
    }

    showPassword = () =>{
        this.setState(prevState => ({
            hidePassword:!prevState.hidePassword
        }));
    }

    isValid = () =>{
        if((this.state.name === "") ||(this.state.email === "") || (this.state.password === "") || 
        (this.state.passwordConfirm === "") || (this.state.userType === "") || 
        (this.state.Gender === "")||(this.state.address === "")||(this.state.phone === "")||(this.state.Que === "")||(this.state.Ans === ""))
            return false;
        else
            return true;
    }

    submitRegistration = (e) =>{
        e.preventDefault();
        if(!this.passwordMatch()){
            this.setState({
                errorOpen : true,
                error : "Passwords Don't Match"
            });
        }
        else{
            this.newCredentials();
        }
    }

    newCredentials = () => {
        let name = this.state.name;
        let email = this.state.email;
        let pwd = this.state.password;
        let city = this.state.city;
        let utype = this.state.userType;
        let phone = this.state.phone;
        let que = this.state.que;
        let ans =this.state.ans;
        const root = ReactDOM.createRoot(document.getElementById("root"));
        const register = {
            UserName : name,
            EmailId : email,
            Password : pwd,
            City:city,
            MobileNo  : phone,
            UserType : utype,
            Question:que,
            Answer:ans,
            AppRating:0,
            Order : [],
            MovieRegister:[]
        }
        console.log(register);

        axios.post("http://localhost:5204/api/Authenticate/NewRegister",register).then(r => {
            if(r){
                alert("New User Registered Successfully!!!");
                root.render(<Login />);
            }
            
        }) 
    };

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

    render(){
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
                <CssBaseline />
                <Paper className="paper">
                    <Avatar>
                        <PeopleAltIcon></PeopleAltIcon>
                    </Avatar>
                <form onSubmit={this.submitRegistration} >
                <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="name" className="labels">Name</InputLabel>
                        <Input name="name" type="text"  disableUnderline={true} onChange={this.getData} className="inputs" />
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="email" className="labels">Email</InputLabel>
                        <Input name="email" type="email" autoComplete="email" disableUnderline={true} onChange={this.getData} className="inputs" />
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="password" className="labels">Password</InputLabel>
                        <Input name="password" autoComplete="password" disableUnderline={true} onChange={this.getData}  className="inputs" 
                        type={this.state.hidePassword?"password":"input"}
                        endAdornment={
                            this.state.hidePassword?(
                                <InputAdornment>
                                    <VisibilityOffTwoToneIcon fontSize="default" onClick={this.showPassword} />
                                </InputAdornment>
                            ):(
                                <InputAdornment>
                                    <VisibilityTwoToneIcon fontSize="default" onClick={this.showPassword} />
                                </InputAdornment>
                            )
                        }
                        />
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="passwordConfirm" className="labels">Password Confirm</InputLabel>
                        <Input name="passwordConfirm" autoComplete="password" disableUnderline={true} onChange={this.getData}  className="inputs" 
                        type={this.state.hidePassword?"password":"input"}
                        endAdornment={
                            this.state.hidePassword?(
                                <InputAdornment>
                                    <VisibilityOffTwoToneIcon fontSize="default" onClick={this.showPassword} />
                                </InputAdornment>
                            ):(
                                <InputAdornment>
                                    <VisibilityTwoToneIcon fontSize="default" onClick={this.showPassword} />
                                </InputAdornment>
                            )
                        }
                        />
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="city" className="labels">city</InputLabel>
                        <Input name="city" type="text"  disableUnderline={true} onChange={this.getData} className="inputs" />
                    </FormControl>
                    
                    
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="phone" className="labels">Phone</InputLabel>
                        <Input name="phone" type="number" disableUnderline={true} onChange={this.getData} className="inputs" />
                    </FormControl>
                
                    <FormControl fullWidth required margin="normal">
                        <FormLabel htmlFor="userType" className="labels">userType</FormLabel>
                        <Select name="userType" onChange={this.getData} className="inputs" >
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Customer">Customer</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="question" className="labels">Question</InputLabel>
                        <Select name="que" onChange={this.getData} className="inputs" >
                            <MenuItem value="What is your favourite color?">what is Your Favourite Color?</MenuItem>
                            <MenuItem value="What is your first school name?">What is Your first school name?</MenuItem>
                            <MenuItem value="Who is your best Friend?">Who is your best Friend?</MenuItem>
                            <MenuItem value="what is your nick name?">What is your nick name?</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="Answer" className="labels">Answer</InputLabel>
                        <Input name="ans" type="text"  disableUnderline={true} onChange={this.getData} className="inputs" />
                    </FormControl>
                    
                    <Button disabled={!this.isValid()}
                    disableRipple
                    fullWidth
                    variant="text"
                    type="submit"
                    onClick={this.submitRegistration}>Register</Button>
                </form>
                {this.state.error ? (
                    <Snackbar variant="error" key={this.state.error}
                    anchorOrigin = {
                        {
                            vertical:"bottom",
                            horizontal:"center"
                        }
                    }
                    open={this.state.errorOpen}
                    onClose={this.errorClose}
                    autoHideDuration={3000}>
                        <SnackbarContent
                        message={
                            <duv>
                                <span style={{marginRight : "8px"}}>
                                    <ErrorIcon fontSize="large" color="red" />
                                </span>
                                <span>{this.state.error}</span>
                            </duv>
                        }
                        action = {[
                            <IconButton key="close" aria-label="close" onClick={this.errorClose}>
                                <CloseIcon color="red" />
                            </IconButton>
                        ]}
                        />
                    </Snackbar>
                ):null}
                </Paper>
            </div>
            </>
        );
    }

}

