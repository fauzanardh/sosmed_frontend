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
import {useLocation} from "react-router-dom";

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
        marginTop: "10%",
        textAlign: "center"
    },
    root:{
        marginTop: "20px",
        marginLeft: "auto",
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: '75%',
    }
}));

export const UserList = (props: any) => {
    const pathname = useLocation().pathname.slice(1);
    React.useEffect(() => {
        document.title = `Klipboard | ${pathname}`;
    });
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
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="displayName" secondary="@username"/>
                        </ListItem>
                    </List>
                </Container>
            </Container>
        </div>
    )
}
export default UserList;
