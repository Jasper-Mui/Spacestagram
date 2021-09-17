import React from 'react'
import { Grid, Typography, makeStyles, Card, CardMedia } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles(theme => ({
    media: {
        height: 0,
        paddingTop: '50%',
        marginBottom: theme.spacing(1)
    },
    card: {
        width: '50%',
        margin: 'auto',
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        borderRadius: theme.spacing(3)
    },
    title: {
        fontWeight: 'bold'
    },
    heart: {
        color: '#ff0000'
    }
}));

export default function SpaceCard(props) {
    const classes = useStyles();

    const onClickShare = () => {
        navigator.clipboard.writeText(props.url)
        props.setSnackbarData({open: true, message: 'Copied image URL', severity: 'success'})
    }

    return (
        <Grid item xs={12}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={props.url}
                    title={props.title}
                />
                <Typography className={classes.title}>
                    {props.title}
                </Typography>
                <Typography>
                    Date: {props.date}
                </Typography>

                { props.like 
                    ? <FavoriteIcon className={classes.heart} onClick={() => props.onLike(props.index)}/> 
                    : <FavoriteBorderIcon className={classes.heart} onClick={() => props.onLike(props.index)}/> 
                }

                <ShareIcon onClick={() => onClickShare()}/>
            </Card>
        </Grid>
    )
}