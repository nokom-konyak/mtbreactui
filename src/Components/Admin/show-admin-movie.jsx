import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom/client';
import '../../App.css';
import AdminMenu from "./AdminMenu";
export default class DisplayMovie extends React.Component {
    constructor() {
        super();
        this.state = {
            email:sessionStorage.getItem("email"),
            movie:[]
        }
    }
    componentDidMount()
    {
        axios.get("http://localhost:5204/api/admin/ShowMovieByAdminEmail/"+this.state.email).then(r => {
            if (r.data) {
                this.setState({movie:r.data});
            }
        });
    }
    DeleteMovie=(i)=>{
        const root = ReactDOM.createRoot(document.getElementById('root'));
        axios.delete("http://localhost:5204/api/admin/DeleteMovieRegister/"+i.mId+"/"+this.state.email).then(r=>{
            if(r.data)
            {
                alert("Movie Deleted Successfully!!!!");
                root.render(
                    <AdminMenu/>
                )
            }
            else 
            {
                alert("Movie Deletion Failed\nFK Constraint Conflict!!!")
            }
        })
    }

    render() {
        return (
            <>
            <div class="container-fluid">
                <div class="row">
                    {this.state.movie.map(i=>
                        <div class="card col-md-3"  >
                        <img src ={i.movieImage} alt="Card image"/>
                        <p class="card-text">Movie Id : {i.mId} </p>
                        <p class="card-text">Movie name: {i.movieName}</p>
                        <p class="card-text">Multiplex name: {i.multiplexName}</p>
                        <br/><br/>
                        <button onClick={this.DeleteMovie.bind(this,i)} >Delete Movie</button>
                        </div>
                    )}
                </div>
            </div>
            </>
        )
    }
}