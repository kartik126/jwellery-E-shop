import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./phone.css"
class Phone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null,
    };
  }

  mobile_verification = () => {
    fetch(
      "https://demo.webixun.com/KamalJwellersApi/public/api/mobile-verification",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: this.state.number,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if ((json.msg = "ok")) {
          console.log(json);
          this.props.navigate("/otp/" + this.state.number);
          // this.props.history.push("/otp/"+ this.state.number)
        } else {
        }
      });
  };
  render() {
    return (
      <div className="main-div">
        <div className="login-div"> <div className="login-page">
        <h2 style={{ textAlign: "center", margin: "20px 0px" }}>Login</h2>
        <div className="login-credentials">
          <p
            style={{
              fontSize: "20px",
              textAlign: "center",
              margin: "20px 0px",
            }}
          >
            Enter Mobile Number
          </p>
          <input
            placeholder="Enter mobile number"
            type="text"
            maxLength="10"
            onChange={(e) => this.setState({ number: e.target.value })}
            value={this.state.number}
          ></input>

          <button onClick={() => this.mobile_verification()}> Login</button>
        </div>
      </div></div>
       
      </div>
      
    );
  }
}

function Navigate(props) {
  const abcd = useNavigate();
  return <Phone {...props} navigate={abcd} />;
}

export default (props) => <Navigate {...useParams()} {...props} />;
