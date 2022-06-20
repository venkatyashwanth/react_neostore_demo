import React, { useEffect } from 'react'
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Badge, styled, alpha, InputBase } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { doLogout, isAdmin, isLoggedIn } from '../service/Auth';
import { useState } from 'react';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export const MyAppBar = (props) => {
    const [filter, setFilter] = useState("");
    const productCount = useSelector((state) => state.addItem.proInCart)
    const navigate = useNavigate();

    useEffect(() => {
        let searchParams = new URLSearchParams();
        if (filter) {
            searchParams.set("name", filter);
        }
        if (isLoggedIn()) {
            navigate({
                pathname: "/products",
                search: searchParams.toString()
            })
        }

    }, [filter])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        sx={{ mr: 2 }}
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        Neostore App
                    </Typography>
                    {isLoggedIn() && <div>
                        <Search className='mx-4'>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                value={filter}
                                onChange={(event) => setFilter(event.target.value)}
                            />
                        </Search>
                    </div>}
                    {!isLoggedIn() && (
                        <>
                            <Button color="inherit" onClick={() => navigate("/")}>Login</Button>
                            <Button color="inherit" onClick={() => navigate("/signup")}>SignUp</Button>
                        </>
                    )}

                    {isLoggedIn() && (
                        <>
                            <Badge badgeContent={productCount} color="secondary" sx={{ cursor: "pointer" }} onClick={() => { navigate("/cartsection") }}>
                                <ShoppingCartIcon />
                            </Badge>

                            <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
                        </>
                    )}

                    {isLoggedIn() && isAdmin() && (
                        <>
                            <Button color="inherit" onClick={() => navigate("/additems")}>Add Product</Button>
                        </>
                    )}

                    {isLoggedIn() && (
                        <>
                            <Button color="inherit" onClick={doLogout}>Logout</Button>
                        </>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    )
}
