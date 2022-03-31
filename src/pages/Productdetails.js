import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./productdetail.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { AsyncStorage } from "AsyncStorage";
import Header from "../components/Header";
const options = {
  showThumbs: true,
  showStatus: false,
  infiniteLoop: true,
  onSwipeMove: true,
};

export class Productdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      description: "",
      disc: "",
      price: "",
      discounted_price: "",
      picture: [],
      id: "",
      token: "",
      count: "",
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("@auth_login", (result) => {
      if (JSON.parse(result) != null) {
        global.token = JSON.parse(result).token;
        global.user = JSON.parse(result).user_id;
        console.log("token is", global.token);
      }
    });
    fetch(
      "https://demo.webixun.com/KamalJwellersApi/public/api/get-product-details-web",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: global.token,
        },
        body: JSON.stringify({
          product_link: this.props.link,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.status) {
          // console.log(json);
          // this.setState({data:json.data})
          json.data.map((value) => {
            this.setState({
              name: value.name,
              picture: value.picture,
              description: value.discription,
              price: value.price,
              disc: value.discount,
              id: value.id,
              quantity: value.quantity,
            });
            let discount_price = (this.state.price * this.state.disc) / 100;
            this.setState({
              discounted_price: this.state.price - discount_price,
            });
          });
        } else {
        }
      });
    this.fetchdata();
  }
fetchCartData =()=>{
  fetch("https://demo.webixun.com/KamalJwellersApi/public/api/my-cart", {
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
        this.setState({count:json.data.length})
        // this.setState({ data: json.data });
        console.log(json.data);
      } else {
      }
    });
}
  
  AddToCart = () => {
    fetch("https://demo.webixun.com/KamalJwellersApi/public/api/add-to-cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: global.token,
      },
      body: JSON.stringify({
        type: "yes",
        product_id: this.state.id,
        product_quantity: this.state.quantity,
        size: 1,
        size_option_id: 1,
        weight_option_id: 1,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if ((json.status)) {
        this.fetchCartData()
        } else {
        }
      });
  };

  fetchdata = () => {
    fetch("https://demo.webixun.com/KamalJwellersApi/public/api/my-cart", {
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
          // alert(json.data.length)
          this.setState({ count: json.data.length });

          console.log(json.data);
        }
      });
  };

  render() {
    let data = this.state.picture.map((val) => {
      return <img src={" https://kamaljewellers.in/CDN/" + val.src} />;
    });
    return (
      <>
        <div className="header-main">
          <div className="left-div">
            <h3>Product Details</h3>
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
        <div className="details-main">
          <Container>
            <Row>
              <Col xs={4}>
                <Carousel {...options}>{data}</Carousel>
              </Col>
              <Col xs={2}></Col>
              <Col xs={6}>
                {/* <img src="/images/bridal.jpg" width={"200px"}/> */}
                <div className="more-details">
                  <h3>{this.state.name}</h3>
                  <p>{this.state.description}</p>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <h5 style={{ textDecoration: "line-through" }}>
                      ₹{this.state.price}
                    </h5>
                    <h5 style={{ color: "red" }}>({this.state.disc}%)</h5>
                    <h4 style={{ marginLeft: "20px" }}>
                      ₹ {this.state.discounted_price}
                    </h4>
                  </div>
                  <button
                    className="add-btn"
                    onClick={() => this.AddToCart()}
                  >
                    Add to Cart
                  </button>
                  <button className="add-btn">Buy</button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default (props) => <Productdetails {...useParams()} {...props} />;
