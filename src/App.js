import React, { Component } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Productdetails from "./pages/Productdetails";
import Shop from "./pages/Shop";
import Otp from "./pages/Otp";
import Phone from "./pages/Phone";
import Createprofile from "./pages/Createprofile";
import Account from "./pages/Account";
import Mycart from "./pages/Mycart";
import Home from "./pages/Home";
export class App extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route path="/" exact element={<Phone/>} />
          <Route path="/otp/:number" element={<Otp />} />
          <Route path="/home" element={<Home/>} />
          <Route exact path="/shop" element={<Shop />} />
          <Route path="/Createprofile" element={<Createprofile />} />
          <Route
            exact
            path="/productdetails/:link"
            element={<Productdetails/>}
          />
          <Route path="/account" element={<Account />} />
          <Route path="/Mycart" element={<Mycart />} />
        </Routes>
      </>
    );
  }
}

export default (props) => <App {...useParams()} {...props} />;
