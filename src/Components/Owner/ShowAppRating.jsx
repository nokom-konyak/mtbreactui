import React from "react";
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import '../../index.css'
import axios from "axios";
export default class DisplayAppRating extends React.Component
{
     constructor()
     {
        super();
        this.state={
            email:sessionStorage.getItem("email"),
            apprating:[] 
        };
     }

     componentDidMount()
    {
        axios.get("http://localhost:5204/api/Owner/DisplayAppRating").then(r=>{
            this.setState({apprating:r.data});
        })
    }
    
     render()
     {
        return(
            <div class="container-fluid">
            <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: 500}} >
            <Table stickyHeader aria-label="sticky table" >
              <TableHead>
                 <TableCell align="center"><b>Name</b></TableCell>
                 <TableCell align="center"><b>Email Id</b></TableCell>
                 <TableCell align="center"><b>User Type</b></TableCell>       
                 <TableCell align="center"><b>Mobile Number</b></TableCell>
                 <TableCell align="center"><b>City</b></TableCell>
                 <TableCell align="center"><b>App Rating</b></TableCell>
              </TableHead>
              <TableBody>
                {this.state.apprating.map(x=>
                    <TableRow>
                    <TableCell align="center">{x.userName}</TableCell>
                    <TableCell align="center">{x.emailId}</TableCell>
                    <TableCell align="center">{x.userType}</TableCell>
                    <TableCell align="center">{x.mobileNo}</TableCell>
                    <TableCell align="center">{x.city}</TableCell>
                    <TableCell align="center">{x.appRating}</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper> 
        </div>       
        );
    }
}
     

     
    
