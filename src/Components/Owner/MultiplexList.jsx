import React from "react";
import {Table,TableContainer,TableHead,TableCell,TableBody,TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import '../../index.css'
import axios from "axios";
import ReactDOM from 'react-dom/client';
export default class MultiplexList extends React.Component
{
     constructor()
     {
        super();
        this.state={
            email:sessionStorage.getItem("email"),
            multiplexList:[] 
        };
     }

     componentDidMount()
    {
        axios.get("http://localhost:5204/api/Owner/ShowAdminWithMultiplex").then(r=>{
            this.setState({multiplexList:r.data});
        })
    }
    
     render()
     {
        return(
            <div class="container-fluid">
            <Paper sx={{ width: '100%',height:'100%' }}>
          <TableContainer sx={{ maxHeight: 500}} >
            <Table stickyHeader aria-label="sticky table" >
              <TableHead >
                 <TableCell align="center"><b>Admin Email Id</b></TableCell>       
                 <TableCell align="center"><b>Multiplex Name</b></TableCell>
                 <TableCell align="center"><b>City</b></TableCell>
              </TableHead>
              <TableBody>
                {this.state.multiplexList.map(x=>
                    <TableRow>
                    <TableCell align="center">{x.adminEmailId}</TableCell>
                    <TableCell align="center">{x.multiplexName}</TableCell>
                    <TableCell align="center">{x.multiplexAddress}</TableCell>
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
     

     
    
