import {
    Container, makeStyles, Theme
} from '@material-ui/core';
import React from "react";
import AccountProfile from '../components/profile/AccountProfile';
import EditProfileButton from '../components/profile/EditProfileButton';
import {NavBar} from "../components/NavBar";
import {Post} from "../components/post/Post";
import axios from "axios";

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
    posts: {
        margin: theme.spacing(4),
        display: "flex",
        position: "relative",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    post: {
        margin: theme.spacing(2),
    }
}));

const Profile = () => {
    React.useEffect(() => {
        document.title = "Klipboard.me | Profile - Username";
        if (posts.length === 0) {
            axios({
                method: "get",
                url: "http://localhost:8001/posts",
                headers: {
                    "Authorization": `Bearer ${localStorage.jwtToken}`
                }
            }).then((res) => {
                setPosts(res.data.data.posts);
            });
        }
    });
    const [posts, setPosts] = React.useState([]);
    const classes = useStyles();
    return (
        <div>
            <NavBar/>
            <Container maxWidth="md" className={classes.container}>
                <div>
                    <AccountProfile/>
                    <EditProfileButton/>
                </div>
                <div className={classes.posts}>
                    {
                        posts.map((post: any) => (
                            <div className={classes.post}>
                                <Post
                                    author={post.author}
                                    dataId={post.dataId}
                                    text={post.text}
                                    likedBy={post.likedBy}
                                    replies={post.replies}
                                />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default Profile;
