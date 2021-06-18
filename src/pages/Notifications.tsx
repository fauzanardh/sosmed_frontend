import React from "react";
import {
    Container,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {NavBar} from "../components/NavBar";
import axios from "axios";
import {Comment, LibraryBooks, PersonAdd} from "@material-ui/icons";
import ErrorDialog from "../components/errors/ErrorDialog";

const useStyles = makeStyles((theme: Theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    container: {
        height: "100vh",
        maxWidth: "50%",
        backgroundColor: 'rgb(251, 250, 245)',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
    },
    header: {
        marginTop: "30px",
        textAlign: "center"
    },
    root: {
        marginTop: "20px",
        marginLeft: "auto",
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: '73%',
    },
    listItem: {
        padding: "5px 0"
    }
}));

export const Notifications = (props: any) => {
    const [notifications, setNotifications] = React.useState([]);
    React.useEffect(() => {
        if (localStorage.jwtToken) {
            document.title = "Klipboard.me | Notifications";
        } else {
            // @ts-ignore
            props.history.push('/');
        }
    }, [props.history]);
    const [errorDialog, setErrorDialog] = React.useState(false);
    React.useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8001/notification",
            headers: {
                "Authorization": `Bearer ${localStorage.jwtToken}`
            }
        }).then((res) => {
            if (res.status === 200) {
                setNotifications(res.data.data);
            }
        }).catch(() => setErrorDialog(true));
    }, []);
    const handleButtonOnclick = (uri: string, notificationUUID: string) => () => {
        axios({
            method: "post",
            url: `http://localhost:8001/notification/${notificationUUID}`,
            headers: {
                "Authorization": `Bearer ${localStorage.jwtToken}`
            }
        }).then((res) => {
            if (res.status === 200) {
                props.history.push(uri);
            }
        }).catch(() => setErrorDialog(true));
    }
    const getIcon = (notificationType: number) => {
        switch (notificationType) {
            case 0:
                // post liked
                return (<LibraryBooks color={"secondary"}/>)
            case 1:
                // new reply
                return (<Comment/>)
            case 2:
                // reply liked
                return (<Comment color={"secondary"}/>)
            case 3:
                // new follower
                return (<PersonAdd/>)
        }
    }
    const classes = useStyles();
    return (
        <div>
            <NavBar/>
            <Container component={"main"} className={classes.container}>
                <Typography component={"h1"} variant={"h3"} className={classes.header}>
                    Notifications
                </Typography>
                <Container className={classes.root}>
                    <List component="nav">
                        {
                            notifications.map((notification: any, index) => (
                                <ListItem
                                    button
                                    onClick={handleButtonOnclick(notification.uri, notification.uuid)}
                                    key={index}
                                >
                                    <ListItemText primary={notification.message}/>
                                    {getIcon(notification.type)}
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
export default Notifications;
