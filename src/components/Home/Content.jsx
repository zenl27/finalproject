import { Grid } from '@material-ui/core';
import React from 'react';
import GoodsList from '../Goods/GoodsList';


const Content = () => {
    return (
        <Grid item md={9}>
            <GoodsList />
        </Grid>
    );
};

export default Content;