import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../service/Product';





export const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        getProductById(id)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => console.log(err))
    }, [id])
    
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-around", margin: "40px 40px" }}>
                <div>
                    <ul style={{ listStyleType: "none", fontSize: "24px",fontWeight:"bolder", maxWidth:"600px"}}>
                        <li >
                            Product Name: <span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.name}</span>
                        </li>
                        <li>
                            Price:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>₹{product.price}</span> 
                        </li>
                        <li>
                            Category:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.category}</span> 
                        </li>
                        <li>
                            Description:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.description}</span> 
                        </li>
                        <li>
                            Manufacturer:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.manufacturer}</span> 
                        </li>
                        <li>
                            Available Items:<span style={{fontSize: "20px", fontWeight:"light", color: "gray"}}>{product.availableItems}</span> 
                        </li>
                    </ul>



                </div>
                <Grid item xs={3}>
                    <Card sx={{ maxWidth: "500px" }} >
                        <CardMedia
                            component="img"
                            alt={product.name}
                            image={product.imageURL}
                            height="250"
                        />
                        {/* <CardContent>
                            <Typography gutterBottom variant='h5' sx={{ fontWeight: "bold", textAlign: "center" }}>
                                {product.name}
                            </Typography>
                            <Typography variant="h6" color='text.secondary' sx={{ textAlign: "center" }}>
                                ₹{product.price}
                            </Typography>
                        </CardContent> */}
                    </Card>
                </Grid>

            </div>
        </>

    )
}
