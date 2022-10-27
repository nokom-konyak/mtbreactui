import { TextField, Typography, Box } from "@mui/material";
import axios from "axios";
import React from "react";

import '../../App.css';
export default class AddMoviesMultiplex extends React.Component {
    state = {
        file: null,
        base64URL: ""
    }
    constructor() {
        super();
        this.state = {
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

    isValid=()=>{
        if(this.state.MultiplexName===""||this.state.file===""||this.state.Address===""||
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

        const AddMovie = {
            adminEmailId:em,
            register:null,
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
            cart:[]

        };
        axios.post("http://localhost:5204/api/admin/RegisterMovie/",AddMovie).then(r => {
            if (r.data) {
                alert("New Product Added Successfully!!!");
                return ;
            }
        });
    }

    render() {
        return (
                <>
                <form onSubmit={this.submit}>
                    <Box display={"flex"} flexDirection={"column"} maxWidth={500} alignItems="center" justifyContent="center" boxShadow={"5px 5px 10px red"} margin="auto">
                        <Typography > Add Movies</Typography>
                        <TextField id="standard-basic" label="MultiplexName" variant="standard" name="MultiplexName" type={"text"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="MultiplexAddress" variant="standard" name="Address" type={"text"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="MovieName" variant="standard" name="MovieName" type={"text"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="MoviePoster" variant="standard" type={"file"} required name="file" accept=".png,.jpeg,.jpg,.gif" onChange={this.handleFileInputChange} />
                        <TextField id="standard-basic" label="DirectorName" variant="standard" name="DirectorName" type={"text"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="" variant="standard" name="DateTimeFrom" type={"datetime-local"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="" variant="standard" name="DateTimeTo" type={"datetime-local"} required onInput={this.getdata} />  
                        <TextField id="standard-basic" label="GoldSeatAvl" variant="standard" name="GoldAvl" type={"number"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="SilverSeatAvl" variant="standard" name="SilverAvl" type={"number"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="PremiumSeatAvl " variant="standard" name="PremiumAvl" type={"number"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="GoldSeatPrice " variant="standard" name="GoldPrice" type={"number"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="SilverSeatPrice " variant="standard" name="SilverPrice" type={"number"} required onInput={this.getdata} />
                        <TextField id="standard-basic" label="PremiumSeatPrice " variant="standard" name="PremiumPrice" type={"number"} required onInput={this.getdata} />
                        <button type="submit" disabled={!this.isValid()} onClick={this.submit}>Add Movie</button>
                    </Box>
                </form>
            </>
        )
    }
}