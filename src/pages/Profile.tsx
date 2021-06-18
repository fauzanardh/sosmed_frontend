import {
    Container, Fab, makeStyles, Theme
} from '@material-ui/core';
import React from "react";
import AccountProfile from '../components/profile/AccountProfile';
import EditProfileButton from '../components/profile/EditProfileButton';
import {NavBar} from "../components/NavBar";
import {Post} from "../components/post/Post";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Add} from "@material-ui/icons";
import {UploadModal} from "../components/post/UploadModal";
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
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fabIcon: {
        marginRight: theme.spacing(2),
    },
}));

const Profile = (props: any) => {
    const [myUUID, setMyUUID] = React.useState([]);
    React.useEffect(() => {
        if (localStorage.jwtToken) {
            const decodedToken: any = jwt_decode(localStorage.jwtToken);
            setMyUUID(decodedToken.uuid);
            document.title = `Klipboard.me | Profile - ${decodedToken.username}`;
        } else {
            // @ts-ignore
            props.history.push('/');
        }
    }, [props.history]);
    const [posts, setPosts] = React.useState([]);
    const [userData, setUserData] = React.useState({
        id: "",
        name: "",
        username: "",
        email: "",
        bio: "",
        profilePictureDataId: "",
        followers: [],
        following: [],
    });

    const [errorDialog, setErrorDialog] = React.useState(false);
    React.useEffect(() => {
        axios({
            method: "get",
            url: "https://api.klipboard.me/posts",
            headers: {
                "Authorization": `Bearer ${localStorage.jwtToken}`
            }
        }).then((res) => {
            setPosts(res.data.data.posts);
        }).catch(() => setErrorDialog(true));
        axios({
            method: "get",
            url: "https://api.klipboard.me/user/me",
            headers: {
                "Authorization": `Bearer ${localStorage.jwtToken}`
            }
        }).then((res) => {
            setUserData(res.data.data);
        }).catch(() => setErrorDialog(true));
    }, []);
    const [stateModal, setStateModal] = React.useState(false);
    const handleModal = (open: boolean) => () => {
        setStateModal(open)
    }
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
                    <EditProfileButton
                        name={userData.name}
                        email={userData.email}
                        bio={userData.bio}
                    />
                </div>
                <div className={classes.posts}>
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
                </div>
                <Fab variant={"extended"} color={"primary"} className={classes.fab} onClick={handleModal(true)}>
                    <Add className={classes.fabIcon}/>
                    Add Post
                </Fab>
                <UploadModal
                    isPost={true}
                    stateModal={stateModal}
                    handleModal={handleModal}
                    setStateModal={setStateModal}
                />
                <ErrorDialog isOpen={errorDialog}/>
            </Container>
        </div>
    )
}

export default Profile;
