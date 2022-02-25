import React from 'react'
import "./styles.css";
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Home from './Home';
import Orders from './Orders';
import Products from './Products';
import ProductDetail from './ProductDetail';
import NewProduct from './Products/new';

function Admin() {
  return (
    <div>
        <nav>
            <ul className='admin-menu'>
                <li>
                    <Link to='/admin'>Home</Link>
                </li>
                <li>
                    <Link to='orders'>Orders</Link>
                </li>
                <li>
                    <Link to='products'>Products</Link>
                </li>
            </ul>
        </nav>

        <Box mt="10">
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={`/orders`} element={<Orders />} />
                <Route path={`/products`} element={<Products />} />
                <Route path={`/products/new`} element={<NewProduct />} />
                <Route path={`/products/:product_id`} element={<ProductDetail />} />
            </Routes>
        </Box>
    </div>
  )
}

export default Admin