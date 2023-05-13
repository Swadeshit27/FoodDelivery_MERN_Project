import React, { useEffect, useState } from 'react'

const Myorder = () => {
    const [Ordedetails, setOrdedetails] = useState([])
    // console.log(localStorage.getItem("userEmail"))
    const fetchorderdata = async () => {
        const fetchData = await fetch("http://localhost:5000/myorderData", {
            method: "POST",
            body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
            headers: { "Content-Type": "application/json" }
        })
        const jsonData = await fetchData.json();
        setOrdedetails(jsonData.TotalData.orderData)
        // console.log(jsonData.TotalData.orderData);
    }
    useEffect(() => {
        fetchorderdata();
    }, [])

    return (
        <>
            <h1>My order History</h1>
            <div className="container">
                {/* {console.log("the data is")}
                {console.log(Ordedetails)} */}
                {
                    Ordedetails !== null ? Ordedetails.reverse().map((data, i) => {
                        return (
                            data.map((val) => {
                                return <div key={Math.random()}>
                                    {val.OrderDate ? <div className='mt-5 '>{val.OrderDate}<hr /> </div> :
                                        <div className='bg-success text-white text-center mt-5 '>
                                            <p className='fs-5'>{val.foodname}</p>
                                            <img src={val.imgsrc} alt="foodimg"  height={100} width={100}/>
                                            <p className='fs-5'>{val.price}</p>
                                            <p className='fs-5'>{val.qty}</p>
                                            <p className='fs-5'>{val.size}</p>
                                        </div>
                                    }
                                </div>
                            })
                        )

                    }) : <h2>Sorry we cannot find your order</h2>
                }
            </div>
        </>
    )
}

export default Myorder
