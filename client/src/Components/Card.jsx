import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useCart } from '../Components/ContextReducer';

const Card = (props) => {
    const statedata = useCart()
    const dispatch = useDispatch();
    const priceRef = useRef();

    const data = props.fooddata;
    const { _id, foodname, imgsrc, options } = data;
    const priceopt = Object.keys(options[0]);
    // const price = Object.values(options[0]);

    const [qty, setqty] = useState(1)
    const [size, setSize] = useState("")

    const finalprice = qty * parseInt(options[0].size);
    // const filtrerdata = () => {
    //     options[0].filter(val)
    // }
    // console.log(options[0][size], price)
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])


    const AddItems = async () => {
        let food = [];
        for (const item of statedata) {
            if (item.id === data._id) {
                food = item;
                console.log(food);
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", _id, qty: qty, size: size })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id:_id, foodname, imgsrc, price: finalprice, qty: qty, size: size })
                await console.log(statedata)
                return
            }
            return
        }
        await dispatch({ type: "ADD", _id, foodname, imgsrc, price: finalprice, qty: qty, size: size })
    }
    return (
        <>
            <div className="card my-2 " style={{ "width": "20rem", "maxHeight": "30rem" }}>
                <img src={imgsrc} className="card-img-top" alt="..." style={{ "height": "13rem", objectFit: "fill" }} />
                <div className="card-body">
                    <p className="card-text">
                        {foodname}
                    </p>
                    <div className="container w-100 ">
                        <select className='m-2 bg-success  text-white rounded' onChange={(e) => setqty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 bg-success text-white rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceopt.map((data) => {
                                return (
                                    <option key={data} value={data}>{data}</option>
                                )
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            {finalprice}/_
                        </div>
                        <hr />
                        <div className="btn bg-success text-white mx-2 fw-semibold" onClick={AddItems}>Add To Cart</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
