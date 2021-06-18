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
import {useParams} from "react-router-dom";
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
    // @ts-ignore
    const {search} = useParams();
    const [searchResults, setSearchResults] = React.useState([]);
    React.useEffect(() => {
        document.title = `Klipboard | Search - ${decodeURI(search)}`;
        axios({
            method: "get",
            url: `https://api.klipboard.me/search?keyword=${search}`,
        }).then((res) => {
            setSearchResults(res.data.data.users);
        }).catch(() => setErrorDialog(true));
    }, [search]);
    const [errorDialog, setErrorDialog] = React.useState(false);
    const handleClickUser = (username: any) => () => {
        document.location.href = `/users/${username}`;
    }
    const classes = useStyles();
    return(
        <div>
            <NavBar/>
            <Container component={"main"} className={classes.container}>
                <Typography component={"h1"} variant={"h3"} className={classes.header}>
                    Search Results
                </Typography>
                <Container className={classes.root}>
                    <List component="nav">
                        {
                            searchResults.map((user: any) => (
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
