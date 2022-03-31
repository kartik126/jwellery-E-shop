import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
class Createprofile extends Component {
  constructor(props){
    super(props);
    this.state={
      name:""
    }
  }

  create_profile=()=>{
    fetch(
      "https://demo.webixun.com/KamalJwellersApi/public/api/update-profile",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:global.token
        },
        body: JSON.stringify({
          f_name: this.state.name,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.warn(json);
        if(json.status)
        {
          this.props.navigate("/home")
        }
        else{

        }
        
      });
  }
  render() {
    return (
      <div className="profile-div">
        <div className="profile">
          <h1 style={{ textAlign: "center", margin: "20px 0px" }}>
            Create Profile
          </h1>
          <h3>Full Name :</h3>
          <input placeholder="Enter your full name" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} type="text"></input>
          <h3> Phone Number :</h3>

          <input placeholder="Enter your number" type="text" maxLength="10"></input>
          <button onClick={this.create_profile} >Create Profile</button>
        </div>
      </div>
    );
  }
}

function Navigate(props) {
  const abcd = useNavigate();
  return <Createprofile {...props} navigate={abcd} />;
}

export default (props) => <Navigate {...useParams()} {...props} />;

