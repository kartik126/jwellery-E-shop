import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./shop.css";
import { AsyncStorage } from "AsyncStorage";
class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
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
    // alert(global.token)
  }

  fetchdata = () => {
    fetch(
      "https://demo.webixun.com/KamalJwellersApi/public/api/get-jwellery-category-web",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization:global.token
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ item: json });
        console.log(json.data);
      });
  };

  render() {
    let data = this.state.item.map((values) => {
      return values.product.map((val) => {
        return (
          <Link to={"/productdetails/" + val.product_link}>
            <div className="product-card">
              <div style={{ overflow: "hidden" }}>
                <img src={"/images/bridal.jpg" + val.product_picture} />
              </div>
              <div className="details">
                <h5>{val.name}</h5>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h4>₹{val.price}</h4>
                  <p>(%{val.discount} off)</p>
                </div>
              </div>
            </div>
          </Link>
        );
      });
    });

    return (
      <>
        <Header name="Products"/>
        <Container>
          <Row>
            <Col xs={3}>
              <div className="side-category" style={{ position: "fixed" }}>
                <ul>
                  <h5>Categories</h5>
                  {this.state.item.map((key) => {
                    return (
                      <Link to="">
                       <li>
                        {key.name} ({key.product.length})
                      </li>
                      </Link>
                     
                    );
                  })}
                </ul>
              </div>
            </Col>
            <Col className="product-data" xs={9}>
              {data}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Shop;
