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
const ListItemLink = (props: any) => {
    return <ListItem button component="a" {...props} />;
  }

export const LikedBy = (props: any) => {
    const classes = useStyles();
    return(
        <Container component={"main"} className={classes.container}>
            <Typography component={"h1"} variant={"h3"} className={classes.header}>
                Liked by
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
    )
}
export default LikedBy;