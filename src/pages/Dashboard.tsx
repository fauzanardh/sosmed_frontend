import React from "react";
import {Container, makeStyles, Theme} from "@material-ui/core";
import {NavBar} from "../components/NavBar";
import {Post} from "../components/Post"
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
    post: {
        margin: theme.spacing(4),
        display: "flex",
        position: "relative",
        justifyContent: "center",
    },
}));

export const Dashboard = (props: any) => {
    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        if (localStorage.jwtToken) {
            document.title = "Klipboard.me | Dashboard";
        } else {
            // @ts-ignore
            props.history.push('/');
        }
        if (posts.length === 0) {
            axios({
                method: "get",
                url: "http://localhost:8001/feed",
                headers: {
                    "Authorization": `Bearer ${localStorage.jwtToken}`
                }
            }).then((res) => {
                setPosts(res.data.data.posts);
            });
        }
    });
    const classes = useStyles();
    return (
        <div>
            <NavBar/>
            <Container component={"main"} className={classes.container}>
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
            </Container>
        </div>
    )
}

export default Dashboard;
