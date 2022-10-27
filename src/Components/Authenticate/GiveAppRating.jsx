import React from "react";
import { Button, FormControl,Input,Select,MenuItem,FormLabel} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import ReactDOM from "react-dom/client";
import '../../index.css'
import axios from "axios";
import CustomerMenu from "../Customer/CustomerMenu";
export default class GiveRating extends React.Component
{
     constructor()
     {
        super();
        this.state={
            email:sessionStorage.getItem("email"),
            rating:""
        };
     }
     
     getData=(e)=>{
        this.setState({[e.target.name]:e.target.value});
     }

     isValid=()=>{
        if(this.state.rating==="")
            return false;
        else
            return true;
     }
     GiveRating=(e)=>{
        e.preventDefault();
        const root=ReactDOM.createRoot(document.getElementById("root"));
        let em=this.state.email;
        let rating=this.state.rating;

        axios.put("http://localhost:5204/api/Authenticate/appRating/"+em+"/"+rating).then(r=>{
            if(r)
            {
                alert("Thank You For Your Time!!!");
                root.render(<CustomerMenu/>)
            }
        });
    }
    
     render()
     {
        return(
            <div className="form">
                <CssBaseline/>
                <Paper className="paper">
                <form onSubmit={this.submitRegistration}>
                    <FormControl required fullWidth margin="normal">
                        <Input value="Email Id : "/>
                        <Input value={this.state.email} />
                    </FormControl>
                    <FormControl fullWidth required margin="normal">
                        <FormLabel htmlFor="rating" className="labels">Enter Rating</FormLabel>
                        <Select name="rating" onChange={this.getData} className="inputs" >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>

                    <Button disabled={!this.isValid()}
                    disableRipple
                    fullWidth
                    variant="text"
                    type="submit"
                    onClick={this.GiveRating} className="btn">Give Rating</Button>
                </form>
               </Paper>
               </div>
        )
    }
}
     

     
    
