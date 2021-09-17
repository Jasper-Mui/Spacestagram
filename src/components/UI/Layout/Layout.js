import React from 'react'
import {AppBar, Toolbar, Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    nav: {
        marginBottom: theme.spacing(4)
    },
    background: {
        background: '#dedede',
        height: '100%',
        minHeight: '100vh'
    }
}));

export default function Layout(props) {
    const classes = useStyles();

    return (
        <Grid className={classes.background}>
            <AppBar className={classes.nav} position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit">
                        Spacestagram
                    </Typography>
                </Toolbar>
            </AppBar>
            {props.children}
        </Grid>
    )
}