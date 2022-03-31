import React, { Component } from "react";
import "./header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { AsyncStorage } from "AsyncStorage";
export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onHover: "false",
      item: [],
      count: "",
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("@auth_login", (err, result) => {
      if (JSON.parse(result) != null) {
        global.token = JSON.parse(result).token;
        global.user = JSON.parse(result).user_id;
      }
    });
    this.fetchdata();
  }
  fetchdata = () => {
    fetch(
      "https://demo.webixun.com/KamalJwellersApi/public/api/my-cart",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:global.token
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if(json.status){
          // alert(json.data.length)
          this.setState({ count: json.data.length });
          
          console.log(json.data);
        }
      });
  };
  render() {
    return (
      <div className="header-main">
        <div className="left-div">
          <h3>{this.props.name}</h3>
        </div>
        <div className="right-div">
          <Link to="/Mycart">
            <div className="counter">{this.state.count}</div>
            <ShoppingCartIcon />
          </Link>
          <Link to="/account">
            <AccountCircleIcon />
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
