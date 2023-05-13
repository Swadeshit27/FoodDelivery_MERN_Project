import React from 'react'
import { useCart, useDispatch } from "../Components/ContextReducer"
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatch();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const handleCheckOut = async () => {
    console.log(data,localStorage.getItem("userEmail"),new Date())
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderData: data,
        email: userEmail,
        orderDate: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <>
      <div className='container m-auto table-responsive table-responsive-md table-responsive-sm'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quentity</th>
              <th scope='col'>option</th>
              <th scope='col'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.foodname}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><DeleteTwoToneIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div className="btn bg-success text-white mx-2 fw-semibold" onClick={handleCheckOut}>Order Now</div>
      </div>
    </>
  )
}

export default Cart
