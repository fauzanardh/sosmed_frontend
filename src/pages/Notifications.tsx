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
    root:{
        marginTop: "20px",
        marginLeft: "auto",
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: '73%',
    },
    listitem:{
        padding: "5px 0"
    }
}));

export const Notifications = (props: any) => {
    const classes = useStyles();
    return(
        <div>
            <NavBar />
            <Container component={"main"} className={classes.container}>
                <Typography component={"h1"} variant={"h3"} className={classes.header}>
                    Notifications
                </Typography>
                <Container className={classes.root}>
                    <List component="nav">
                        <ListItem button>
                        <ListItemIcon className={classes.listitem}>
                            <Avatar />
                        </ListItemIcon>
                        <ListItemText primary="displayName liked your post" />
                        </ListItem>
                        <ListItem button>
                        <ListItemIcon className={classes.listitem}>
                            <Avatar />
                        </ListItemIcon>
                        <ListItemText primary="displayName replied to your post" />
                        </ListItem>
                    </List>
                </Container>
            </Container>
        </div>
    )
}
export default Notifications;
