import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia,Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { isAdmin } from '../service/Auth';

import { getProducts,getProductById,deleteProduct,searchProducts } from '../service/Product';
import { useDispatch } from 'react-redux/es/exports';
import { countProducts } from '../redux/Actions/ProductActions';
import { useState } from 'react';





const PageProducts = ({products}) => {
    const dispatch = useDispatch();
    const [proData, setProData] = useState([]);
    const addcart = (id) => {
        if (localStorage.getItem('myproid') != undefined) {
            let array = JSON.parse(localStorage.getItem('myproid'));

            array.push(id)
            localStorage.setItem("myproid", JSON.stringify(array));
            dispatch(countProducts(array.length))
        }
        else {
            let array = [];
            array.push(id);
            localStorage.setItem('myproid', JSON.stringify(array));
            dispatch(countProducts(array.length))
        }

        getProductById(id)
            .then(res => {
                if (res) {
                    if (localStorage.getItem('mycart') != undefined) {
                        let ar = JSON.parse(localStorage.getItem('mycart'));
                        if (ar.some(product =>
                            product._id === id
                        )) {
                            // alert("checked in")
                        } else {
                            ar.push(res.data);
                            localStorage.setItem("mycart", JSON.stringify(ar));
                        }

                    }
                    else {
                        let ar = [];
                        ar.push(res.data)
                        localStorage.setItem('mycart', JSON.stringify(ar));
                    }
                }
            })
    }

    const delPro = (id) =>{
        if(window.confirm("Delete?")){
            deleteProduct(id)
            .then(res => {
                if(res.data){
                    alert("Product Deleted");
                    let data = proData.filter(pro => pro._id != id);
                    setProData(data);
                }
            })
        }
    }

    const navigate = useNavigate();
    return (
        <>
            {products?.map(pro =>
                <Grid item xs={3} key={pro._id} >
                    <Card sx={{ maxWidth: 345 }} >
                        <CardMedia
                            component="img"
                            alt={pro.name}
                            image={pro.imageURL}
                            height="250"
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h6' sx={{ fontWeight: "bold", textAlign: "center" }}>
                                {pro.name}
                            </Typography>
                            <Typography variant="h6" color='text.secondary' sx={{ textAlign: "center" }}>
                                ₹{pro.price}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="contained" size="small" onClick={() => navigate(`/product-details/${pro._id}`)}>Info</Button>
                            <Button variant="contained" size="small" onClick={() => addcart(pro._id)}>Add To Cart</Button>
                            {isAdmin() ? <Button variant="contained" size="small" onClick={() => delPro(pro._id)}>Delete</Button> : ''}
                        </CardActions>
                    </Card>
                </Grid>
            )}
        </>
    )
}

export default PageProducts