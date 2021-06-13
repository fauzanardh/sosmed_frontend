import React from 'react';
import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Typography} from '@material-ui/core';
import {Comment, Favorite} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 500,
        margin: theme.spacing(0, 2),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

export const Post = (props: any) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="photo" className={classes.avatar}>
                        DN
                    </Avatar>
                }
                title={props.name}
                subheader={`@${props.username}`}
            />
            <CardMedia
                className={classes.media}
                image="https://material-ui.com/static/images/cards/paella.jpg"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
                <IconButton aria-label="add a comment">
                    <Comment />
                </IconButton>
            </CardActions>
        </Card>
    );
}
