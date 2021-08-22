import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TelegramIcon from '@material-ui/icons/Telegram';
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
            <div className={classes.tabl2}>
                <WhatsAppIcon
                /> <br /> WhatsApp

            </div>
            <div className={classes.tabl3}>
                {/* <Link to='https://web.telegram.org/'> */}
                <TelegramIcon />
                <br /> Telegram
                {/* </Link> */}
            </div>

        </div>
        // </React.Fragment >
    );
};

export default Footer;