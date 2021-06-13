import {
    Box,
    Container, makeStyles, Theme
} from '@material-ui/core';
import AccountProfile from '../components/profile/AccountProfile';
import EditProfileButton from '../components/profile/EditProfileButton';
import React from "react";
import {NavBar} from "../components/NavBar";
import {Post} from "../components/Post";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        height: "100vh",
        maxWidth: "100%",
        backgroundColor: 'rgb(251, 250, 245)',
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
    },
    post: {
        margin: theme.spacing(2),
    }
}));

const Profile = () => {
    React.useEffect(() => {
        document.title = "Klipboard.me | Profile - Username";
    });
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
                    <Post
                        name={"Chocomint"}
                        username={"chocomintx1"}
                        dataId={""}
                        className={classes.post}
                    />
                    <Post
                        name={"Chocomint2"}
                        username={"chocomintx2"}
                        dataId={""}
                        className={classes.post}
                    />
                </div>
                <div className={classes.posts}>
                    <Post
                        name={"Chocomint"}
                        username={"chocomintx1"}
                        dataId={""}
                        className={classes.post}
                    />
                    <Post
                        name={"Chocomint2"}
                        username={"chocomintx2"}
                        dataId={""}
                        className={classes.post}
                    />
                </div>
            </Container>
        </div>
    )
}

export default Profile;
