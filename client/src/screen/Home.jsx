import Card from '../Components/Card'
import React, { useEffect, useState } from 'react'


const Home = () => {
    const [search, setsearch] = useState([]);
    const [foodItm, setFoodItems] = useState([]);
    const [foodCtg, setFoodCatg] = useState([]);

    const fetchdata = async () => {
        const fooddata = await fetch("http://localhost:5000/foodItem", {
            method: "GET",
        });
        const jsondata = await fooddata.json();
        const { foodItems, foodcatagory } = jsondata;
        // console.log(foodItems, foodcatagory );
        setFoodItems(foodItems);
        setFoodCatg(foodcatagory)
        // console.log(foodItm, foodCtg ); 
    }

    useEffect(() => {
        fetchdata();
    }, [])


    return (
        <>
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" style={{ 'maxHeight': "500px", "objectFit": "fill" }}>
                <div className="carousel-inner">
                    <div className='carousel-caption' style={{ "zIndex": "999" }}>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name='search' value={search} onChange={(e) => setsearch(e.target.value)} />
                            <button className="btn btn-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900×500/?burger" className="d-block w-100" style={{ 'maxHeight': "500px", "objectFit": "cover" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×500/?pizza" className="d-block w-100" style={{ 'maxHeight': "500px", "objectFit": "cover" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×500/?biriyani" className="d-block w-100" style={{ 'maxHeight': "500px", "objectFit": "cover" }} alt="..." />
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-3">
                {foodCtg !== [] ?
                    foodCtg.map((data) => {
                        const { _id, cata } = data;
                        return (
                            <div className='row mt-3' key={_id}>
                                <h1>{cata}</h1>
                                <hr />
                                {foodItm !== [] ? foodItm.filter((val, i) => (val.foodCatg === cata)).map((val) => {

                                    return (
                                        <div className='col-12 col-md-6 col-lg-4 col-xl-3' key={val._id}>
                                            <Card fooddata={val} />
                                        </div>
                                    )
                                }) : <div>sorry food Items empty</div>
                                }
                            </div>
                        )
                    }) : <div>the array is empty</div>}

            </div>
        </>
    )
}

export default Home
