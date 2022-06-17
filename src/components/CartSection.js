import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux/es/exports';
import { countProducts } from '../redux/Actions/ProductActions';
import { getProductById } from '../service/Product';

export const CartSection = () => {
    const [data, setData] = useState([]);
    const [uniqueIds,setUniqueIds] = useState([])

    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('mycart') != undefined) {
            let proitems = JSON.parse(localStorage.getItem('mycart'));
            setData(proitems)
        }

        if (localStorage.getItem('myproid') != undefined) {
            let array = JSON.parse(localStorage.getItem('myproid'));
            dispatch(countProducts(array.length))
        }
    }, [])

    useEffect(() => {
        let ids = JSON.parse(localStorage.getItem('myproid'));
        const countUnique = ids => {
            const counts = {};
            for (var i = 0; i < ids.length; i++) {
                counts[ids[i]] = 1 + (counts[ids[i]] || 0);
            };
            return counts;
        };
        setUniqueIds(countUnique(ids))
    }, [data])

    

    const AddMore = (id) => {
        if (localStorage.getItem('myproid') != undefined) {
            let array = JSON.parse(localStorage.getItem('myproid'));
            array.push(id)
            localStorage.setItem("myproid", JSON.stringify(array));
            dispatch(countProducts(array.length))
            window.location.reload();
        }
        else {
            let array = [];
            array.push(id);
            localStorage.setItem('myproid', JSON.stringify(array));
            dispatch(countProducts(array.length));
            window.location.reload();
        }
    }

    return (
        <div className='container'>
            <table className='table table-striped mt-3'>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>col3</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element) =>
                        <tr key={element._id}>
                            <td>
                                {element.name}
                            </td>
                            <td>
                                {element.price}
                            </td>
                            <td>
                                {uniqueIds[`${element._id}`]}
                            </td>
                            <td>
                                <button onClick={() => AddMore(element._id)}>Quanttiy</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
