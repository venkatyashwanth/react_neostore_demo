import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { editProduct, getProductById } from '../service/Product';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [info, setInfo] = useState({}); //From database 
    const [data, setData] = useState({})

    useEffect(() => {
        getProductById(id)
            .then(res => {
                setInfo(res.data);
            })
            .catch(err => console.log(err))
    }, [])


    const handleData = (e)=>{
        let {name,value} = e.target;
        setData({...data,[name]:value});
    }

    const handleSubmision = (e) => {
        e.preventDefault();
        editProduct(id,data)
        .then(res => {
            alert("Product Details Updated");
            navigate(`/product-details/${id}`)
        })
        .catch(err => console.log(err))
    }


    return (
        <div className='container mt-3 mb-3'>
            <h3>Edit Product Details: </h3>
            <form className='w-50 m-auto' onSubmit={handleSubmision}>
                <div className='mb-3'>
                    <label htmlFor="editInput1">Product Name: </label>
                    <input type="text" className='form-control' id="editInput1" name="name" defaultValue={info.name} onChange={handleData}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="editInput2">Category: </label>
                    <input type="text" className='form-control' id="editInput2" name="category" defaultValue={info.category} onChange={handleData}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="editInput3">Price: </label>
                    <input type="number" className='form-control' id="editInput3" name="price" defaultValue={info.price} onChange={handleData}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="editInput4">Product Description: </label>
                    <input type="text" className='form-control' id="editInput4" name="description" defaultValue={info.description} onChange={handleData}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="editInput5">Product Manufacturer: </label>
                    <input type="text" className='form-control' id="editInput5" name="manufacturer" defaultValue={info.manufacturer} onChange={handleData}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="editInput6">Items Available: </label>
                    <input type="number" className='form-control' id="editInput6" name="availableItems" defaultValue={info.availableItems} onChange={handleData}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="editInput7">Image URL: </label>
                    <input type="text" className='form-control' id="editInput7" name="imageURL" defaultValue={info.imageURL} onChange={handleData}/>
                </div>
                <input type="submit" value="Update" className='btn btn-success'/>
            </form>
        </div>
    )
}

export default Edit