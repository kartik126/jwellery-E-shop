import React, { Component } from "react";
import "./mycart.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { AsyncStorage } from "AsyncStorage";
import Header from "../components/Header";
export class Mycart extends Component {
  constructor() {
    super();
    this.state = {
      data: [],

      onClose: true,
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
  removeFromCart=(id)=>{
    console.warn(id)
    fetch("https://demo.webixun.com/KamalJwellersApi/public/api/add-to-cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: global.token,
      },
      body: JSON.stringify({
        type: "no",
        product_id: id,
        product_quantity: 1,
        size: 1,
        size_option_id: 1,
        weight_option_id: 1,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.warn(json)
        if ((json.status)) {
        this.fetchdata()
        } else {
        }
      });
  }
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
          this.setState({ data: json.data });
          console.log(json.data);
        } else {
        }
      });
  };

  render() {
    let data = this.state.data.map((value) => {
      return (
        <Row >
          <Col xs={1}></Col>
          <Col xs={7} className="item-details">
            {/* {data} */}
            <>
              <div className="img-div">
                <img
                  src={"https://kamaljewellers.in/CDN/" + value.document.src}
                  // src="images/bridal.jpg"
                  width={"180px"}
                />
              </div>
              <div className="details">
                <h3>{value.name} </h3>
                <select name="qty" id="qty">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <button className="purchase-btn">Proceed to Buy</button>
              </div>
              <div className="price">
                <DeleteOutlineOutlinedIcon
                  onClick={() => this.removeFromCart(value.id)}
                />
                <h5>
                  Subtotal:
                  <br />
                  Rs. {value.price}
                </h5>
              </div>
            </>
          </Col>
        </Row>
      );
    });
    return (
      <>
        <Header name={"My Bag"} />
        <div className="mycart-main">
          <div className="main">
            <Container>{data}</Container>
          </div>
        </div>
      </>
    );
  }
}

export default Mycart;
