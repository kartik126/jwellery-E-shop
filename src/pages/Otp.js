import { AsyncStorage } from "AsyncStorage";
import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./otp.css";
class Otp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: null,
    };
  }

  Otp_verification = () => {
    fetch(
      "https://demo.webixun.com/KamalJwellersApi/public/api/otp-verification",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: this.props.number,
          otp: this.state.number,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.warn(json);
        if (json.msg == "ok") {
          if (json.user_type == "register") {
            // global.token="Bearer "+json.token

            const data = { token: "Bearer " + json.token };
            AsyncStorage.setItem("@auth_login", JSON.stringify(data));
            this.props.navigate("/Createprofile");
          } else {
            const data = { token: "Bearer " + json.token };
            AsyncStorage.setItem("@auth_login", JSON.stringify(data));
            this.props.navigate("/shop");
          }
        } else {
        }
      });
  };
  render() {
    return (
      <div className="main-div">
        <div className="otp-page">
          <h1 style={{ textAlign: "center", margin: "20px 0px" }}>
            Verification
          </h1>
          <div className="otp-credentials">
            <p
              style={{
                fontSize: "20px",
                textAlign: "center",
                margin: "20px 0px",
              }}
            >
              Enter OTP
            </p>
            <input
              placeholder="Enter OTP "
              type="text"
              maxLength="4"
              onChange={(e) => this.setState({ number: e.target.value })}
              value={this.state.number}
            ></input>

            <button onClick={() => this.Otp_verification()}> Verify</button>
          </div>
        </div>
      </div>
    );
  }
}

function Navigate(props) {
  const abcd = useNavigate();
  return <Otp {...props} navigate={abcd} />;
}

export default (props) => <Navigate {...useParams()} {...props} />;
