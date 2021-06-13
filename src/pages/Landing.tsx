import React from "react";
import {Container, Button, makeStyles, Theme, Typography} from "@material-ui/core";

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
    center: {
        margin: 0,
        top: "50%",
        left: "50%",
        transform: 'translate(-50%, -50%)',
        position: "absolute",
        textAlign: "center",
    },
    btn: {
        margin: theme.spacing('auto', 4),
        fontSize: "large",
    },
}));


export const Landing = (props: any) => {
    React.useEffect(() => {
        if (localStorage.jwtToken) {
            // @ts-ignore
            props.history.push('/dashboard');
        }
        document.title = "Klipboard.me";
    });

    const classes = useStyles();
    return (
        <Container component={"main"} className={classes.container}>
            <div className={classes.center}>
                <Typography component={"h1"} variant={"h2"}>
                    Klipboard.me
                </Typography>
                <br/>
                <Button variant={"contained"} className={classes.btn} href={"/signup"} color={"primary"}>
                    SignUp
                </Button>
                <Button variant={"contained"} className={classes.btn} href={"/login"} color={"primary"}>
                    Login
                </Button>
            </div>
        </Container>
    )
}

export default Landing;
