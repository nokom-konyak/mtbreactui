import axios from "axios";
import React from "react";
import { TextField, Typography, Box } from "@mui/material";
export default class UpdateMovie extends React.Component {

    state = {
        file: null,
        base64URL: ""
    }

    constructor() {
        super();
        this.state = {
            email:sessionStorage.getItem("email"),
            movie:[],
            mId:"",
            MultiplexName: '',
            MoviePoster: '',
            Address:'',
            MovieName:'',
            DirectorName: '',
            DateTimeFrom: '',
            DateTimeTo:'',
            GoldAvl:'',
            SilverAvl:'',
            PremiumAvl:'',
            GoldPrice:'',
            SilverPrice:'',
            PremiumPrice: '',
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
    isValid=()=>{
        if(this.state.mId===""||this.state.MultiplexName===""||this.state.file===""||this.state.Address===""||
        this.state.MovieName===""||this.state.DirectorName===""||this.state.DateTimeFrom===""||
        this.state.DateTimeTo===""||this.state.GoldAvl===""||this.state.GoldAvl<0||
        this.state.SilverAvl===""||this.state.SilverAvl<0|| this.state.PremiumAvl===""||
        this.state.PremiumAvl<0||this.state.GoldPrice===""||this.state.GoldPrice<=0||
         this.state.SilverPrice===""||this.state.SilverPrice<=0||this.state.PremiumPrice===""||
         this.state.PremiumPrice<=0)
        {
            return false;
        }
        else{
            return true;
        }
    }
    getdata = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();
            // Convert the file to base64 text
            reader.readAsDataURL(file);
            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                //console.log("Called", reader);
                baseURL = reader.result;
                resolve(baseURL);
                this.setState({MoviePoster:baseURL});
            };
        });
    };

    handleFileInputChange = (e) => {
        let { file } = this.state;
        file = e.target.files[0];
        this.getBase64(file)
            .then(result => {
                file["base64"] = result;
                this.setState({
                    base64URL: result,
                    file
                });
            })
            .catch(err => {
                console.log(err);
            });
        this.setState({
            file: e.target.files[0]
        });
    };

    submit = (e) => {
        let em = sessionStorage.getItem("email");
        e.preventDefault();
        let mId=this.state.mId;

        const Movie = {
            multiplexName:this.state.MultiplexName,
            multiplexAddress:this.state.Address,
            movieName:this.state.MovieName,
            movieImage:this.state.MoviePoster,
            directorName:this.state.DirectorName,
            dateTimeFrom:this.state.DateTimeFrom,
            dateTimeTo:this.state.DateTimeTo,
            goldSeatAvl:this.state.GoldAvl,
            silverSeatAvl:this.state.SilverAvl,
            premiumSeatAvl:this.state.PremiumAvl,
            goldSeatPrice:this.state.GoldPrice,
            silverSeatPrice:this.state.SilverPrice,
            premiumSeatPrice:this.state.PremiumPrice,

        };
        axios.post("http://localhost:5204/api/admin/UpdateMovieRegister/"+mId+"/"+em,Movie).then(r => {
            if (r.data) {
                alert("Movie Record Updated Successfully!!!");
                return ;
            }
            else{
                alert("Please Enter the Movie Id from the movie shown!!!")
                return ;
            }
        });
    }

    render() {
        return (
            <>
            <div class="container-fluid">  
            <h1 style={{textAlign:"center"}}>Movie Update Page</h1>
                <div class="row">
                    {this.state.movie.map(i=>
                        <div class="card col-md-3"  >
                        <img src ={i.movieImage} alt="Card image"/>
                        <p class="card-text">Movie Id : {i.mId} </p>
                        <p class="card-text">Movie name: {i.movieName}</p>
                        <p class="card-text">Multiplex name: {i.multiplexName}</p>
                        <br/><br/>
                        </div>
                    )}
                </div>

                <form onSubmit={this.submit}>
                    <Box display={"flex"} flexDirection={"column"} maxWidth={500} alignItems="center" justifyContent="center" boxShadow={"5px 5px 10px red"} margin="auto">
                        <Typography > Update Movies</Typography>
                        <TextField id="standard-basic" label="Movie Id" variant="standard" name="mId" type={"text"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="Multiplex Name" variant="standard" name="MultiplexName" type={"text"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="Multiplex Address" variant="standard" name="Address" type={"text"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="Movie Name" variant="standard" name="MovieName" type={"text"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="Movie Poster" variant="standard" type={"file"} required name="file" accept=".png,.jpeg,.jpg,.gif" onChange={this.handleFileInputChange} />
                        <TextField id="standard-basic" label="Director Name" variant="standard" name="DirectorName" type={"text"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="" variant="standard" name="DateTimeFrom" type={"datetime-local"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="" variant="standard" name="DateTimeTo" type={"datetime-local"} required onInput={this.getdata} />  
                        <TextField id="standard-basic" label="Gold Seat Avl" variant="standard" name="GoldAvl" type={"number"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="Silver Seat Avl" variant="standard" name="SilverAvl" type={"number"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="Premium Seat Avl " variant="standard" name="PremiumAvl" type={"number"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="Gold Seat Price " variant="standard" name="GoldPrice" type={"number"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="Silver Seat Price " variant="standard" name="SilverPrice" type={"number"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="Premium Seat Price " variant="standard" name="PremiumPrice" type={"number"} required onInput={this.getdata} />
                        <button type="submit" disabled={!this.isValid()} onClick={this.submit}>Update Movie</button>
                    </Box>
                </form>
            </div>
            </>
        )
    }
}