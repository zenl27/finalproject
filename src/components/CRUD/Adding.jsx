import React, { useState, useContext } from 'react';
import { IconButton, Paper, TextField, makeStyles, Button } from '@material-ui/core';
import { GoodsContext } from '../Context/GoodsContext'
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        margin: '40px auto',
        maxWidth: 1000,
        height: 'auto',
        marginTop: '100px'
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '40ch',
        }
    }
}))

const Adding = () => {
    const classes = useStyles()
    const history = useHistory()
    const [values, setValues] = useState({
        title: '',
        image: '',
        type: '',
        price: '',
        description: ''
    })

    const { addGoods } = useContext(GoodsContext)
    const handleInp = (e) => {
        let obj = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }

    const handleSave = () => {
        if (!values.image) values.image = "https://www.sony.com/image/sonyview1?fmt=png&wid=1200"
        addTour(values)
        history.push('/list')
    }



    return (
        <Paper elevation={3} className={classes.paper} >
            <h1 style={{ textAlign: 'center' }}>Добавить товар</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around', color: 'black' }}>
                <div>
                    <img style={{ height: '300px', width: '400px' }} src={values.image ? values.image : "https://www.sony.com/image/sonyview1?fmt=png&wid=1200"} alt="sony pic" />
                </div>
                <div
                    style={{
                        width: "450px",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    <form className={classes.root} noValidate autoComplete='off'>
                        <TextField name='title' onChange={handleInp} value={values.title} variant='outlined' label="Title" />
                        <TextField name='image' onChange={handleInp} value={values.image} variant='outlined' label="Image" />
                        <TextField name='type' onChange={handleInp} value={values.type} variant='outlined' label="Type" />
                        <TextField name='price' onChange={handleInp} value={values.price} variant='outlined' label="Price" />
                        <TextField name='description' onChange={handleInp} value={values.description} variant='outlined' label="Description" />
                    </form>
                    <IconButton onClick={handleSave}>
                        <Button variant="contained" color="secondary">Add</Button>
                    </IconButton>
                </div>
            </div>
        </Paper>
    );
};

export default Adding;