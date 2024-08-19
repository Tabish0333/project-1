import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'



const EditProducts = () => {
    
    const {userid} = useParams();
    const[state, setState] = useState({
        product_name:"",
        product_price:"",
        product_color:"",
        description:""
    })

    const navigate = useNavigate();
    let [colors, setColors] = useState(["Red","Blue","Black","white","Green"])
    
    useEffect(()=>{
        axios.get(`http://localhost:1000/product/${userid}`)
        .then((res)=>{
            console.log("data edited",res.data);
            setState(res.data);
            let colors_new=colors.filter(x=>x!==res.data.product_color)
            // console.log(colors_new);
            setColors(colors_new);
        })
        .catch((err)=>{
            console.log(err);
        });
    },[setState])
    

    const handleChange = (event)=>{
      event.persist();
      let{name,value}=event.target;
      setState({...state,[name]:value})
    }
    
    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log("Submitted values", state);
        axios
        .put(`http://localhost:1000/product/${userid}`,state)
        .then((res)=>{
            alert("Data updated successfully");
            console.log("updte response",res.data);
            navigate('/viewproduct/editproducts')
        })
        .catch((err)=>{
            alert("Error to update");
            console.log("update err",err);
        })
    };
    // const onHandleUpdate = ()=>{     
    //     navigate('/viewProduct')
    // }
    // onClick={ ()=>{onHandleUpdate()}}

  return (
    <div>
        <Container>
            <form onSubmit={handleSubmit}>
                 <Form.Control
                type="plaintext"
                name="product_name"
                value={state.product_name}
                onChange={(event)=>
                    setState((prev)=>({...prev,product_name:event.target.value}))
                 }
              />
                <br />
                <br />
            
                 <Form.Control
                  type="number"
                  name="product_price"
                  value={state.product_price}
                  onChange={handleChange}
                />
                <br />
                <br />
                            <Form.Select
                  aria-label="Default select example"
                  name="product_color"
                  value={state.product_color}
                  onChange={handleChange}
                >
                  <option>Open to select color</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="green">Green</option>
                </Form.Select>
                <br />
                <br />
              
                 <Form.Control
                  type="textarea"
                  rows={3}
                  name="description"
                  controlId="exampleForm.ControlTextarea1"
                  onChange={handleChange}
                />
                <br />
                <br />
                <Button variant="primary" type="submit" >
              Submit
            </Button>

            </form>
        </Container>
    </div>
  )
}

export default EditProducts