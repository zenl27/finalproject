import React from 'react';
import { Link } from '@material-ui/core';
import { API } from '../Helpers/Constans';
import GoodsList from '../Goods/GoodsList';
import Adding from './Adding';



const Permiss = () => {
    return (
        <div>
            <Link to={`${API}/admin`}>
                <Adding />

            </Link>
        </div>
    );
};

export default Permiss;