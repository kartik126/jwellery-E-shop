import React, { Component } from "react";
import Header from "../components/Header";
import "./account.css";
export class Account extends Component {
  constructor(){
    super()
    this.state={
      name:"",
      contact:"",
    }
  }
  componentDidMount(){
    this.fetchAccountdata()
  }
  fetchAccountdata=()=>{
    fetch("https://demo.webixun.com/KamalJwellersApi/public/api/get-user-profile", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: global.token,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.status) {
        this.setState( {name:json.data[0].f_name, contact:json.data[0].contact})
        console.log(json.data);
      } else {
      }
    });
  }
  render() {
    return (
      <div>
        <div>
          <Header name="My Account" />
        </div>

        <div className="account-details">
          <div className="head">
          <h2>{this.state.name}</h2>
          <p>Contact: (+91) {this.state.contact}</p>
        
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
