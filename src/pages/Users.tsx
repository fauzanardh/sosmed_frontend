import {
    Container, makeStyles, Theme
} from '@material-ui/core';
import {useParams} from "react-router-dom";
import React from "react";
import AccountProfile from '../components/profile/AccountProfile';
import {NavBar} from "../components/NavBar";
import {Post} from "../components/post/Post";
import axios from "axios";
import Follow from "../components/profile/Follow";
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
    posts: {
        margin: theme.spacing(4),
        display: "flex",
        position: "relative",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    post: {
        margin: theme.spacing(2),
    },
}));

const Profile = () => {
    // @ts-ignore
    const {username} = useParams();
    const [myUUID, setMyUUID] = React.useState("");
    const [errorDialog, setErrorDialog] = React.useState(false);
    React.useEffect(() => {
        document.title = `Klipboard.me | User - ${username}`;
        if (localStorage.jwtToken) {
            axios({
                method: "get",
                url: "http://localhost:8001/user/me",
                headers: {
                    "Authorization": `Bearer ${localStorage.jwtToken}`
                }
            }).then((res) => {
                setMyUUID(res.data.data.id);
            }).catch(() => setErrorDialog(true));
        }
    }, [username, setMyUUID]);
    const [userData, setUserData] = React.useState({
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
    React.useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:8001/user/username/${username}`,
        }).then((res) => {
            setUserData(res.data.data);
        }).catch(() => setErrorDialog(true));
    }, [username]);
    const classes = useStyles();
    return (
        <div>
            <NavBar/>
            <Container maxWidth="md" className={classes.container}>
                <div>
                    <AccountProfile
                        name={userData.name}
                        username={userData.username}
                        profilePictureDataId={userData.profilePictureDataId}
                        bio={userData.bio}
                        followers={userData.followers}
                        following={userData.following}
                    />
                    {
                        myUUID && myUUID !== userData.id && <Follow followers={userData.followers} uuid={userData.id} myUUID={myUUID}/>
                    }
                </div>
                <div className={classes.posts}>
                    {
                        userData.posts.map((post: any, index) => (
                            <div className={classes.post} key={index}>
                                <Post
                                    myUUID={userData.id}
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
                </div>
                <ErrorDialog isOpen={errorDialog}/>
            </Container>
        </div>
    )
}

export default Profile;
