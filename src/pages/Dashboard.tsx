import React from "react";
import {Container, makeStyles, Theme} from "@material-ui/core";
import {NavBar} from "../components/NavBar";
import {Post} from "../components/Post"

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
    post: {
        margin: theme.spacing(4),
        display: "flex",
        position: "relative",
        justifyContent: "center",
    },
}));

export const Dashboard = () => {
    const classes = useStyles();
    React.useEffect(() => {
        document.title = "Klipboard.me | Dashboard";
    });
    return (
        <div>
            <NavBar/>
            <Container component={"main"} className={classes.container}>
                <div className={classes.post}>
                    <Post
                        name={"Chocomint"}
                        username={"chocomintx1"}
                        dataId={""}
                    />
                </div>
                <div className={classes.post}>
                    <Post
                        name={"Chocomint2"}
                        username={"chocomintx2"}
                        dataId={""}
                    />
                </div>
            </Container>
        </div>
    )
}

export default Dashboard;
