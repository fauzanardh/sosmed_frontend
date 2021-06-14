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
                        <Badge badgeContent={sorted.length} color={"secondary"}>
                            <Comment/>
                        </Badge>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Button color={"primary"} className={classes.uploadButton} onClick={handleModal(true)}>New Comment</Button>
                    {
                        sorted.map((reply: any, index) => (
                            <div key={index}>
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
                            </div>
                        ))
                    }
                </Collapse>
            </Card>
            <UploadModal parent={props.parent} isPost={false} stateModal={stateModal} handleModal={handleModal}/>
        </div>
    );
}
