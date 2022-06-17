import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../service/Product';
import { useDispatch } from 'react-redux/es/exports';
import { countProducts } from '../redux/Actions/ProductActions';
import { getProductById } from '../service/Product';


function Products() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [proData, setProData] = useState([]);
    useEffect(() => {
        getProducts()
            .then(res => {
                if (res.data.err === 0) {
                    setProData(res.data.prodata)
                }
            })
    }, [])

    useEffect(() => {
        if (localStorage.getItem('myproid') != undefined) {
            let array = JSON.parse(localStorage.getItem('myproid'));
            dispatch(countProducts(array.length))
        }
        else {
            dispatch(countProducts(0))
        }
    }, [])

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
                            alert("checked in")
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

    return (
        <Container>
            <h2>Products</h2>
            <Box sx={{ flexGrow: 1, margin: "20px 0px" }}>
                <Grid container spacing={3}>
                    {proData?.map(pro =>
                        <Grid item xs={3} key={pro._id} >
                            <Card sx={{ maxWidth: 345 }} >
                                <CardMedia
                                    component="img"
                                    alt={pro.name}
                                    image={pro.imageURL}
                                    height="250"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant='h5' sx={{ fontWeight: "bold", textAlign: "center" }}>
                                        {pro.name}
                                    </Typography>
                                    <Typography variant="h6" color='text.secondary' sx={{ textAlign: "center" }}>
                                        ₹{pro.price}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                                    <Button variant="contained" size="small" onClick={() => navigate(`/product-details/${pro._id}`)}>Info</Button>
                                    <Button variant="contained" size="small" onClick={() => addcart(pro._id)}>Add To Cart</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Container >
    )
}

export default Products