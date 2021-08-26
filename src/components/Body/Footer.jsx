import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    // mainContainer: {
    //     backgroundColor: 'black'
    // },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        width: '100vw',
        alignItems: 'center',
        // margin: 'auto',
        marginLeft: '-264px',
        height: '100px'
    },
    tabl1: {
        // display: 'flex',
        // alignItems: 'column-reverse',
        color: "white",
        maxWidth: '500px'
    },
    tabl2: {
        color: "white"
    },
    tabl3: {
        color: 'white'
    }
}))

const Footer = () => {
    const classes = useStyles()
    return (
        // <React.Fragment className={classes.mainContainer}>
        <div className={classes.container}>
            <div className={classes.tabl1}>
                <InstagramIcon style={{

                }} />
                <br /> Instagram
            </div>
        </div>
        // </React.Fragment >
    );
};

export default Footer;