import React, { useEffect, useState } from "react";
import { base_url, end_point } from "../api/api_url";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";


const ViewProduct = () => {
  const api_url = base_url + end_point.product;
  // let [userData, setProducts] = useState();

  
  let [renderValue, setRendervalue] = useState();
  let [orderValue, setOrdervalue] = useState();
   let [searchValue,setSearchvalue]=useState('')
  let getApi = () => {
    axios
      .get(api_url)
      .then((res) => {
        setRendervalue(res.data);
        setOrdervalue(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getApi();
  }, []);
  // console.log(renderValue);

  let clickToassending = () => {
    let orderWise = [...renderValue].sort((a, b) => {
      return a.product_price - b.product_price;
    });
    setOrdervalue(orderWise);
  };
  let clickTodescending = () => {
    let orderWise = [...renderValue].sort((a, b) => {
      return b.product_price - a.product_price;
    });
    setOrdervalue(orderWise);
  };


  let changeHandeler = (e)=>{
  setSearchvalue(e.target.value.toLowerCase())
  }
  console.log(searchValue);
  
  let submitHandeler=(e)=>{
  e.preventDefault()
    let filterValue = [...renderValue].filter((val)=>{
      return  val.product_name.toLowerCase().includes(searchValue)
    })
    setOrdervalue(filterValue)

  }
console.log(orderValue);
  let deleteData = (deleteid) => {
    console.log(deleteid);

    axios
      .delete(`http://localhost:1000/product/${deleteid}`)

      .then((res) => {
        // navigate("deleteData");
        console.log(res);
        alert("Data deleted")
        // fetchData();
      })
      .catch((err) => {
        console.log(err);
        alert("data not deleted");
      });
  };

  return (
    <>
    <div className="d-flex justify-content-end m-3">
    <Form inline onSubmit={submitHandeler}>
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Search"
            className=" mr-sm-2"
            value={searchValue}
            onChange={changeHandeler}
          />
        </Col>
        <Col xs="auto" className="me-2">
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
    <Button variant="primary" className="me-2" onClick={clickToassending}>
      ↑
    </Button>
    <Button variant="secondary" onClick={clickTodescending}>
      ↓
    </Button>
  </div>
    <div className="py-4">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <td>Product Name</td>
            <td>Product Price</td>
            <td>View</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
        {orderValue?.map((value) => (
          <tbody>
            <tr>
              <td>{value.product_name}</td>
              <td>₹{value.product_price}</td>
              <td>
                <Link to={`viewProduct/${value.id}`}>
                  <button className="btn btn-primary">View</button>
                </Link>
              </td>
              <td>
                <Link to={`editproducts/${value.id}`}>
                  <button className="btn btn-primary">Edit</button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteData(value.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
    </>
  );
};
export default ViewProduct;




