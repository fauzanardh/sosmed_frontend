import React from "react";
import {
    Container,
    makeStyles,
    Theme
} from "@material-ui/core";
import {NavBar} from "../components/NavBar";
import {Post} from "../components/post/Post";
import axios from "axios";
import {useParams} from "react-router-dom";
import ErrorDialog from "../components/errors/ErrorDialog";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        height: "100vh",
        maxWidth: "100%",
        backgroundColor: theme.palette.background.default,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
    },
    post: {
        margin: theme.spacing(4),
        display: "flex",
        position: "relative",
        justifyContent: "center",
    },
}));

export const Posts = () => {
    // @ts-ignore
    const {postId} = useParams();
    const [author, setAuthor] = React.useState({
        id: "",
        name: "",
        username: "",
        email: "",
        bio: "",
        profilePictureDataId: "",
        followers: [],
        following: [],
        posts: [],
    });
    const [post, setPost] = React.useState({
        postId: "",
        dataId: "",
        authorId: "",
        text: "",
        likedBy: [],
        replies: [],
    });
    React.useEffect(() => {
        document.title = "Klipboard.me | Posts";
    }, []);
    const [errorDialog, setErrorDialog] = React.useState(false);
    React.useEffect(() => {
        axios({
            method: "get",
            url: `https://api.klipboard.me/posts/postId/${postId}`,
        }).then((res) => {
            setPost(res.data.data);
            axios({
                method: "get",
                url: `https://api.klipboard.me/user/uuid/${res.data.data.authorId}`,
            }).then((_res) => {
                setAuthor(_res.data.data);
            }).catch(() => setErrorDialog(true));
        }).catch(() => setErrorDialog(true));
    }, [postId]);
    const classes = useStyles();
    return (
        <div>
            <NavBar/>
            <Container component={"main"} className={classes.container}>
                <div className={classes.post}>
                    <Post
                        myUUID={""}
                        postUUID={postId}
                        author={author}
                        dataId={post.dataId}
                        text={post.text}
                        likedBy={post.likedBy}
                        replies={post.replies}
                    />
                </div>
                <ErrorDialog isOpen={errorDialog}/>
            </Container>
        </div>
    )
}

export default Posts;
