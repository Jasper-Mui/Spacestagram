import { useEffect, useState } from 'react';
import {Grid, CircularProgress, Snackbar } from '@material-ui/core';
import axios from '../../helper/axios'
import SpaceCard from './SpaceCard/SpaceCard'
import Alert from  '@material-ui/lab/Alert';

export default function Home() {
    const [spaceData, setSpaceData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarData, setSnackbarData] = useState({open: false, message: '', severity: ''});

    useEffect(() => {
        setIsLoading(true)
        axios.get('/planetary/apod?api_key=' + process.env.REACT_APP_NASA_API_KEY + '&count=10')
            .then(function (res) {
                setIsLoading(false)

                const sData = res.data.map(d => { 
                    return {...d, like: false}
                })
                setSpaceData(sData)
            }).catch(err => {
                setIsLoading(false)
                setSnackbarData({open: true, message: 'Could not fetch data from NASA API', severity: 'error'})
                console.log("err", err)
            })
    }, []);

    const onClickLike = i => {
        const newSpaceData = spaceData.map((s, index) => {
            if (i === index) {
                return {...s, like: !s.like}
            }

            return s
        })

        setSpaceData(newSpaceData)
    }

    const snackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarData({open: false, message: '', severity: ''})
    }

    return (
        <Grid container justifyContent='center'>
            {isLoading && <CircularProgress size={100}/>}

            <Snackbar
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom'}}
                open={snackbarData.open}
                onClose={snackbarClose}
                autoHideDuration={4000}
            >
                <Alert onClose={snackbarClose} severity={snackbarData.severity}>
                    {snackbarData.message}
                </Alert>
            </Snackbar>

            {spaceData.map((s, index) => 
                <SpaceCard 
                    key={index}
                    {...s} 
                    index={index} 
                    onLike={onClickLike} 
                    setSnackbarData={setSnackbarData}
                />
            )}
        </Grid>
    )
}