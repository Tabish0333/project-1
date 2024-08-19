import React, { useState } from "react";
import { base_url, end_point } from "../api/api_url";
import axios from "axios";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const api_url = base_url + end_point.product;
  // console.log("api",api_url);
  let [inputState, setState] = useState({
    product_name: "",
    product_price: "",
    color: "",
    desc: "",
    errors: { product_name: "", product_price: "" },
  });
  const navigate = useNavigate();
  const changeHandler = (event) => {
    event.persist();
    //   console.log("change Event",event);
    let { value, name } = event.target;
    let err = { ...inputState.errors };

    switch (name) {
      case "product_name":
        err.product_name = value.length < 1 ? "Required Field" : null;
        break;
      case "product_price":
        err.product_price = value.length < 1 ? "Required Field" : null;
        break;

      default:
        console.log("Not applicabble");
    }
    setState({ ...inputState, [name]: value, errors: err });
  };
  // console.log("Validation arror", inputState.errors);

  let handleSubmit = (event) => {
    event.preventDefault();
    // console.log("submitted value", inputState)
    let { product_name, product_price } = inputState.errors;
    if (product_name === null && product_price === null) {
      console.log("sunmitted value", inputState);
      let userData = {
        product_name: inputState.product_name,
        product_price: inputState.product_price,
        product_color: inputState.color,
        description: inputState.desc,
      };
      console.log("user data", userData);
      axios
        .post(api_url, userData)
        .then((res) => {
          navigate("viewproduct");
          // alert("your data submitted successfully")
          console.log("Axios res", res);
        })
        .catch((err) => {
          alert("your data submitted successfully");
          console.log("Axios err", err);
        });
    } else {
      alert("data not submitted");
    }
  };

  return (
    <div className=" py-4">
      <div className="container text-light bg-dark py-1 " data-bs-theme="light">
        <div className="container text-light   my-4">
          <h2 className="text-center">Product Details</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="product_name">
            <Form.Label column sm="2">
              Product Name :
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="plaintext"
                name="product_name"
                placeholder="Product Name"
                onChange={changeHandler}
              />
            </Col>
          </Form.Group>
          {inputState.errors?.product_name &&
          inputState.errors?.product_name.length > 0 ? (
            <p className="text-danger">{inputState.errors.product_name}</p>
          ) : null}
          <Col></Col>

          <Row>
            <Form.Group as={Row} className="mb-3" controlId="product_price">
              <Form.Label column sm="2">
                Product price :-
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  name="product_price"
                  placeholder="Product price"
                  onChange={changeHandler}
                />
              </Col>
            </Form.Group>
            {inputState.errors?.product_price &&
            inputState.errors?.product_price.length > 0 ? (
              <p className="text-danger">{inputState.errors.product_price}</p>
            ) : null}
            <Form.Group as={Row} className="mb-3" controlId="color">
              <Form.Label column sm="2">
                Product Color :-
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  aria-label="Default select example"
                  name="color"
                  onChange={changeHandler}
                >
                  <option>Open to select color</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="green">Green</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="desc"
                  onChange={changeHandler}
                />
              </Col>
            </Form.Group>
          </Row>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
