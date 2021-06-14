import React from 'react';
import {
    Avatar,
    Badge,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    IconButton,
    makeStyles,
    Typography
} from '@material-ui/core';
import {Comment, Favorite} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 600,
        margin: theme.spacing(1, 2),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    replies: {
        borderWidth: "2px",
        borderColor: theme.palette.getContrastText(theme.palette.background.default),
        borderStyle: "solid none",
    },
    replyRoot: {
        display: "flex",
    },
    replyAvatar: {
        flex: "0 0 auto",
        marginRight: "16px",
    },
    replyAvatarContent: {
        flex: "1 1 auto",
    },
    replyContent: {
        margin: theme.spacing(2),
    },
    replyCard: {

    },
    avatar: {
        display: "flex",
        backgroundColor: theme.palette.secondary.main,
    },
}));

export const Post = (props: any) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar
                        alt={props.author.name}
                        src={`https://cdn.klipboard.me/${props.author.profilePictureDataId}`}
                        aria-label={"photo"}
                        className={classes.avatar}
                    />
                }
                title={props.author.name}
                subheader={`@${props.author.username}`}
            />
            <CardMedia
                className={classes.media}
                image={`https://cdn.klipboard.me/${props.dataId}`}
            />
            <CardContent>
                <Typography variant={"body2"} color={"textSecondary"} component={"p"}>
                    {props.text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label={"add to favorites"}>
                    <Badge badgeContent={props.likedBy.length} color={"secondary"}>
                        <Favorite/>
                    </Badge>
                </IconButton>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label={"add a comment"}
                >
                    <Badge badgeContent={props.replies.length} color={"secondary"}>
                        <Comment/>
                    </Badge>
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {
                    props.replies.map((reply: any) => (
                        <Card className={classes.replies}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt={reply.author.name}
                                        src={`https://cdn.klipboard.me/${reply.author.profilePictureDataId}`}
                                        aria-label={"photo"}
                                        className={classes.avatar}
                                    />
                                }
                                title={reply.author.name}
                                subheader={`@${reply.author.username}`}
                            />
                            <CardMedia
                                className={classes.media}
                                image={`https://cdn.klipboard.me/${reply.dataId}`}
                            />
                            <CardContent>
                                <Typography variant={"body2"} color={"textSecondary"} component={"p"}>
                                    {reply.text}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label={"add to favorites"}>
                                    <Badge badgeContent={reply.likedBy.length} color={"secondary"}>
                                        <Favorite/>
                                    </Badge>
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))
                }
            </Collapse>
        </Card>
    );
}
