import React, { useContext, useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid, Paper, makeStyles, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoodsContext } from '../Context/GoodsContext';

import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        marginRight: '20px',
        marginBottom: '20px',
        minWidth: '170px',  //TODO0 NEW (from 19.05.2021)
        maxWidth: '350px',  //TODO0 NEW (from 19.05.2021)

        margin: 'auto'
    }
}))

const Side = () => {
    const history = useHistory()
    const classes = useStyles()
    const { getGoods } = useContext(GoodsContext)
    const [type, setType] = useState(getType())
    const [price, setPrice] = useState(getPrice())

    function getPrice() {
        const search = new URLSearchParams(history.location.search)
        return search.get('price_lte')
    }

    function getType() {
        const search = new URLSearchParams(history.location.search)
        return search.get('type')
    }

    const handleChangePrice = (event, value) => {
        const search = new URLSearchParams(history.location.search)
        search.set('price_lte', value)
        history.push(`${history.location.pathname}?${search.toString()}`)
        getGoods(history)
        setPrice(value)
    }

    const handleChangeType = (event) => {
        // if (event.target.value === 'all') {
        //     history.push(`${history.location.pathname.replace('type')}`)
        //     getGoods(history)
        //     setType(event.target.value)
        //     return
        // }
        const search = new URLSearchParams(history.location.search)
        search.set('type', event.target.value)
        history.push(`${history.location.pathname}?${search.toString()}`)
        getGoods(history)
        setType(event.target.value)
    }
    const handleDrop = () => {
        history.push(`${history.location.pathname.replace('type')}`)
        // history.push(`${history.location.pathname.replace('price_lte')}`)
        getGoods(history)
        setType(getType())
        // setPrice(getPrice())
    }
    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '50px'

        }}>

            <Grid item md={3} >
                <Paper elevation={2} className={classes.paper}
                >
                    <FormControl component="fieldset"
                    >
                        <FormLabel component="legend">Productions</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={type} onChange={handleChangeType}>
                            <FormControlLabel value="Camera" control={<Radio />} label="Cameras" />
                            <FormControlLabel value="Phones" control={<Radio />} label="Phones" />
                            <FormControlLabel value="ТV" control={<Radio />} label="ТV" />
                        </RadioGroup>
                    </FormControl>

                    <Grid >

                        <Button variant="contained" color="secondary" onClick={handleDrop} >Close</Button>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
};

export default Side;