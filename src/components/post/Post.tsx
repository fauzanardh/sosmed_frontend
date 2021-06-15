import React from 'react';
import {
    Avatar,
    Badge,
    Button,
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
import _ from "lodash";
import {UploadModal} from "./UploadModal";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 600,
        margin: theme.spacing(1, 2),
    },
    border: {
        borderWidth: "2px",
        borderColor: theme.palette.getContrastText(theme.palette.background.default),
        borderRadius: theme.shape.borderRadius,
        borderStyle: "solid none",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    replyRoot: {
        display: "flex",
    },
    uploadButton: {
        width: "100%",
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
    replyCard: {},
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modalText: {
        width: "100%",
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
    const [stateModal, setStateModal] = React.useState(false);
    const handleModal = (open: boolean) => () => {
        setStateModal(open)
    }
    const isLiked = () => {
        const index = props.likedBy.map((user: any) => user.id).indexOf(props.myUUID);
        return index !== -1;
    }
    const handleLikePostClick = () => {
        let data;
        if (isLiked()) {
            data = {likeStatus: false};
        } else {
            data = {likeStatus: true};
        }
        axios({
            method: "post",
            url: `http://localhost:8001/posts/postId/${props.postUUID}/like`,
            data: data,
        }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                window.location.reload();
            }
        });
    }
    const handleClickAvatar = (username: any) => () => {
        document.location.href = `/users/${username}`;
    }
    const handleClickHeader = (postId: any) => () => {
        document.location.href = `/posts/${postId}`;
    }
    const sorted = _.orderBy(props.replies, [o => Date.parse(o.createdAt)], ["desc"]);
    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar
                            alt={props.author.name}
                            src={`https://cdn.klipboard.me/${props.author.profilePictureDataId}`}
                            aria-label={"photo"}
                            className={classes.avatar}
                            onClick={handleClickAvatar(props.author.name)}
                        />
                    }
                    title={props.author.name}
                    subheader={`@${props.author.username}`}
                    className={classes.border}
                    onClick={handleClickHeader(props.postUUID)}
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
                    <IconButton aria-label={"add to favorites"} onClick={handleLikePostClick}>
                        <Badge badgeContent={props.likedBy.length} color={"secondary"}>
                            {
                                isLiked() ? <Favorite color={"secondary"}/> : <Favorite/>
                            }
                        </Badge>
                    </IconButton>
                    <IconButton
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label={"add a comment"}
                    >
                        <Badge badgeContent={sorted.length} color={"secondary"}>
                            <Comment/>
                        </Badge>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Button color={"primary"} className={classes.uploadButton} onClick={handleModal(true)}>New
                        Comment</Button>
                    {
                        sorted.map((reply: any, index) => (
                            <div key={index}>
                                <Card className={classes.border}>
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                alt={reply.author.name}
                                                src={`https://cdn.klipboard.me/${reply.author.profilePictureDataId}`}
                                                aria-label={"photo"}
                                                className={classes.avatar}
                                                onClick={handleClickAvatar(reply.author.username)}
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
                                </Card>
                            </div>
                        ))
                    }
                </Collapse>
            </Card>
            <UploadModal parent={props.postUUID} isPost={false} stateModal={stateModal} handleModal={handleModal}/>
        </div>
    );
}
