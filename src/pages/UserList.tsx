import React from "react";
import {
    Container,
    makeStyles,
    Theme,
    Typography,
    Avatar,
} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {NavBar} from "../components/NavBar";
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import ErrorDialog from "../components/errors/ErrorDialog";

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    container: {
        height: "100vh",
        maxWidth: "50%",
        backgroundColor: theme.palette.background.default,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
    },
    header: {
        marginTop: "30px",
        textAlign: "center"
    },
    root:{
        marginTop: "10px",
        marginLeft: "auto",
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: '73%',
    }
}));

export const UserList = () => {
    const pathname = useLocation().pathname.split("/")[3];
    // @ts-ignore
    const {username} = useParams();
    React.useEffect(() => {
        document.title = `Klipboard | ${username} - ${pathname}`;
    }, [username, pathname]);

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
    const [errorDialog, setErrorDialog] = React.useState(false);
    React.useEffect(() => {
        axios({
            method: "get",
            url: `https://api.klipboard.me/user/username/${username}`,
        }).then((res) => {
            setUserData(res.data.data);
        }).catch(() => setErrorDialog(true));
    }, [username]);
    const handleClickUser = (username: any) => () => {
        document.location.href = `/users/${username}`;
    }
    const classes = useStyles();
    return(
        <div>
            <NavBar/>
            <Container component={"main"} className={classes.container}>
                <Typography component={"h1"} variant={"h3"} className={classes.header}>
                    {pathname === "followings" ? "Followings" : "Followers" }
                </Typography>
                <Container className={classes.root}>
                    <List component="nav">
                        {
                            pathname === "followings" && userData.following.map((user: any) => (
                                <ListItem button onClick={handleClickUser(user.username)}>
                                    <ListItemIcon>
                                        <Avatar />
                                    </ListItemIcon>
                                    <ListItemText primary={user.name} secondary={`@${user.username}`}/>
                                </ListItem>
                            ))
                        }
                        {
                            pathname === "followers" && userData.followers.map((user: any) => (
                                <ListItem button onClick={handleClickUser(user.username)}>
                                    <ListItemIcon>
                                        <Avatar />
                                    </ListItemIcon>
                                    <ListItemText primary={user.name} secondary={`@${user.username}`}/>
                                </ListItem>
                            ))
                        }
                    </List>
                </Container>
                <ErrorDialog isOpen={errorDialog}/>
            </Container>
        </div>
    )
}
export default UserList;
