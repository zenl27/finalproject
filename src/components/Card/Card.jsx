import { IconButton, makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { calcTotalPrice } from '../helpers/CartFuction'
import { Link, useHistory } from 'react-router-dom';
import Card from '../CreditCard/Card';
import Card from './Card';
import { GoodsContext } from '../Context/GoodsContext';

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    paper: {
        marginTop: '100px',
        maxWidth: 1000,
        margin: '40px auto'
    }
});

const Card = ({ item }) => {
    const classes = useStyles()
    const { card, getCard, changeTourCount, deleteCard } = useContext(GoodsContext)
    const history = useHistory()

    useEffect(() => {
        getCard()
    }, [])
    return (
        <TableContainer component={Paper} className={classes.paper}>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Count</TableCell>
                        <TableCell align="right">SubPrice</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.tours ? (
                        <>
                            {cart.tours.map((elem) => (
                                <TableRow key={elem.item.id}>
                                    <TableCell><img style={{ width: "200px" }} src={elem.item.image} alt={elem.item.title} /></TableCell>
                                    <TableCell align="right">{elem.item.title}</TableCell>
                                    <TableCell align="right">{elem.item.price}</TableCell>
                                    <TableCell align="right">
                                        <input
                                            type="number"
                                            value={elem.count}
                                            onChange={(e) => changeTourCount(e.target.value, elem.item.id)}
                                        />
                                    </TableCell>
                                    <TableCell align="right">{elem.subPrice}</TableCell>
                                    <IconButton onClick={() => deleteCart(elem.item.id, history)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableRow>
                            ))}
                        </>
                    ) : (<h1>Loading...</h1>)}

                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}><Typography variant="h5">Total:</Typography></TableCell>
                        {
                            cart.tours ? (
                                <TableCell align="right"><Typography variant="h5">{calcTotalPrice(cart.tours)}</Typography></TableCell>
                            ) : (null)
                        }
                    </TableRow>
                    <TableRow >
                        <Link to='/card'>
                            <TableCell colSpan={3} align="right">
                                <Button variant="contained" color="primary">Buy Productions</Button>
                            </TableCell></Link>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Card;