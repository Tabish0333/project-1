import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { base_url, end_point } from "../api/api_url";
import axios from "axios";
import {Button} from "react-bootstrap";



const ProductDetails = () => {
  let { userid } = useParams();
  // console.log(userid);
  const api_url = base_url + end_point.product + "/" + userid;
  console.log(api_url);

  let [getDetails, setgetDetails] = useState();

  let fetchData = () => {
    axios
      .get(api_url)
      .then((res) => {
        setgetDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, [setgetDetails]);
  return (
    <div className="py-4">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <td>Product Name</td>
            <td>Product Color</td>
            <td>Product price</td>
            <td>Description</td>
            <td>Buy</td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{getDetails?.product_name}</td>
            <td> {getDetails?.product_color}</td>
            <td>₹{getDetails?.product_price}</td>
            <td>{getDetails?.description}</td>
            <td>
             <Button className="btn btn-primary">Buy Now</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
