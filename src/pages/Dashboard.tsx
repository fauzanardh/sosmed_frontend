import React from "react";
import {
    Container,
    Fab,
    makeStyles,
    Theme
} from "@material-ui/core";
import {NavBar} from "../components/NavBar";
import {Post} from "../components/post/Post";
import axios from "axios";
import {Add} from "@material-ui/icons";
import {UploadModal} from "../components/post/UploadModal";
import jwt_decode from "jwt-decode";

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
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fabIcon: {
        marginRight: theme.spacing(2),
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modalText: {
        width: "100%",
    },
}));

export const Dashboard = (props: any) => {
    const [posts, setPosts] = React.useState([]);
    const [myUUID, setMyUUID] = React.useState([]);
    React.useEffect(() => {
        if (localStorage.jwtToken) {
            document.title = "Klipboard.me | Dashboard";
            // @ts-ignore
            setMyUUID(jwt_decode(localStorage.jwtToken).uuid);
        } else {
            // @ts-ignore
            props.history.push('/');
        }
    });
    // Run only once
    React.useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8001/feed",
            headers: {
                "Authorization": `Bearer ${localStorage.jwtToken}`
            }
        }).then((res) => {
            setPosts(res.data.data.posts);
        });
    }, []);
    const [stateModal, setStateModal] = React.useState(false);
    const handleModal = (open: boolean) => () => {
        setStateModal(open)
    }
    const classes = useStyles();
    return (
        <div>
            <NavBar/>
            <Container component={"main"} className={classes.container}>
                {
                    posts.map((post: any, index) => (
                        <div className={classes.post} key={index}>
                            <Post
                                myUUID={myUUID}
                                postUUID={post.id}
                                author={post.author}
                                dataId={post.dataId}
                                text={post.text}
                                likedBy={post.likedBy}
                                replies={post.replies}
                            />
                        </div>
                    ))
                }
                <Fab variant={"extended"} color={"primary"} className={classes.fab} onClick={handleModal(true)}>
                    <Add className={classes.fabIcon}/>
                    Add Post
                </Fab>
                <UploadModal isPost={true} stateModal={stateModal} handleModal={handleModal}/>
            </Container>
        </div>
    )
}

export default Dashboard;
