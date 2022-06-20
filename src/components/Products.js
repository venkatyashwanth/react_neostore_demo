import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getProducts,getProductById,deleteProduct,searchProducts } from '../service/Product';
import { useDispatch } from 'react-redux/es/exports';
import { countProducts } from '../redux/Actions/ProductActions';
import { isAdmin } from '../service/Auth';
import Pagination from './Pagination';
import PageProducts from './PageProducts';

function Products(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [proData, setProData] = useState([]);

    useEffect(()=>{
        searchProducts(location.search)
        .then(res => {
            if(res.data.err == 0){
                setProData(res.data.prodata)
            }
        })
    },[location.search])

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


    const [currentPage,setCurrentPage] = useState(1);
    const [productsPerPage] = useState(4);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = proData.slice(indexOfFirstProduct,indexOfLastProduct)

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <Container>
            <h4>Results</h4>
            <Box sx={{ flexGrow: 1, margin: "20px 0px" }}>
                <Grid container spacing={3}>
                    <PageProducts products={currentProducts}/>
                </Grid>
            </Box>

            <Pagination
                productsPerPage={productsPerPage}
                totalProducts={proData.length}
                paginate={paginate}
            >
            </Pagination>
        </Container >
    )
}

export default Products