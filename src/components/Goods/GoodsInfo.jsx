import { IconButton, Typography, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GoodsContext } from '../Context/GoodsContext';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        margin: '40px auto',
        maxWidth: 1000,
        height: 'auto',
        marginTop: '100px'
    }
}))

const GoodsInfo = () => {
    const { id } = useParams()
    const { info, getInfo } = useContext(GoodsContext)
    const classes = useStyles()

    useEffect(() => {
        getInfo(id)
    }, [id])
    return (
        <Paper elevation={3} className={classes.paper}>
            <Typography variant='h2' style={{ textAlign: 'center' }}>Productions</Typography>
            {
                info ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <img style={{ width: '500px' }} src={info.image} alt="" />
                        </div>
                        <div style={{
                            width: '450px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <Typography variant='h3' gutterBottom>{info.title}</Typography>
                            <Typography variant='subtitle1' gutterBottom>{info.type}</Typography>
                            <Typography variant='body1' gutterBottom>{info.description}</Typography>
                            <Typography variant='h4' gutterBottom>{info.price}$</Typography>


                        </div>
                    </div>

                ) : (<h1>Loading...</h1>)
            }
            <Link to='/list'>
                <IconButton>
                    Назад
                </IconButton>

            </Link>
        </Paper>
    );
};

export default GoodsInfo;