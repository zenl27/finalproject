import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Swipe from '../SwipeShit/Swipe'
import sonycom from '../Vid/sonycom.mp4'
import { makeStyles } from '@material-ui/styles';
import GoodsCard from '../Goods/GoodsCard';
import GoodsList from '../Goods/GoodsList'
import Footer from './Footer';
import { Grid } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({

    fullScreen: {
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
    },

    fullScreenVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        marginTop: '-220px',
    },
    fullScreenContent: {
        padding: '50px, 15px',
        backgroundColor: 'rgba(52, 52, 52, 0.4)',

        width: '1450px',
        height: '547px',


        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flex: "1, 1, auto",
        justifyContent: 'center',
        alignItems: 'center ',
        flexDirection: 'column',
        textTransform: 'uppercase',
        marginTop: "-55px",
        marginLeft: '-270px'

    },
    BodyfullScreenTitle: {
        fontSize: '50px',
        letterSpacing: '17px',
        fontWeight: 700,
        margin: '0px, 0ps, 20px, 0px',
        color: 'white'
    },
    fullScreenText: {
        fontSize: '18px',
        letterSpacing: '15px',
        color: 'white'
    },
    content: {
        backgroundColor: 'brown',
        margin: 0
    },



    aboutContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    rightContent: {
    },
    textAbout: {
        color: 'white',
        fontSize: '20px',
        fontWeight: 700
    },
    titleAbout: {
        color: 'black',
        fontSize: '23px',
        marginBottom: '25px',
        width: '400px',
        paddingBottom: '30px',
        fontWeight: 700
    },
    leftContent: {
        // marginTop: '-110px',
        width: '70vw',
        // marginRight: '100px',
        color: 'black',
        fontSize: '20px',
        textAlign: 'center',
        paddingBottom: '30px',
        lineHeight: 1.5,
        marginTop: '50px'

    },
    topContent: {
        // paddingBottom: '80px',
        display: 'flex',
        width: '80px',
        height: '80px',
        backgroundSize: '60px 60px',
        backgroundImage: 'url(https://cdn.freebiesupply.com/images/large/2x/sony-logo-black-and-white.png)',
        // justifyContent: 'center',
        // left: 0,
        // right: 0,
        // position: 'absolute',
    }


}))




export default function Body() {
    const classes = useStyles()

    return (
        <Grid>
            <Container maxWidth='md' >
                <div className={classes.fullScreen}>
                    <div className={classes.fullScreenContent}>
                        <div className={classes.BodyfullScreenTitle} >make believe</div>
                        <div className={classes.fullScreenText}>SONY</div>
                    </div>
                </div>

                <video className={classes.fullScreenVideo} autoPlay loop muted
                //     style={{
                //         width: '100vw',
                //         height: 800,
                //         marginTop: '-220px',

                //         marginLeft: '-109px'

                //     }}
                >
                    <source src={sonycom} type="video/mp4" />
                </video>

                <div className={classes.aboutContent}>
                    <div className={classes.topContent}></div>
                    <div className={classes.leftContent}>

                        Welcome to official site reseller of Sony Company
                    </div>

                    { }
                    <div className={classes.rightContent}>
                        <Swipe maxWidth="md" className={classes.content} />

                    </div>
                </div>

                <Container maxWidth="md" style={{
                    paddingTop: '30px'
                }}>
                    <h2 style={{
                        color: 'black',

                    }}>
                        Our Productions
                    </h2>
                    <div className={classes.contentOfBody}>
                        <GoodsList />


                    </div>
                </Container>
                <Footer />

            </Container >

        </Grid>





    );
}
