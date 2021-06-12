import React from "react";
import {
    Container,
    Button,
    makeStyles,
    Theme,
    Typography,
    TextField,
    Avatar
} from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import {LockOutlined} from "@material-ui/icons"
import axios from "axios";

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        border: "3px solid black",
        width: "25%",
        height: "auto",
        float: "right",
        marginRight: "100px",
        marginTop: "10%",
        padding: "32px",
        borderRadius: "10px",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    container: {
        height: "100vh",
        maxWidth: "100%",
        backgroundColor: 'rgb(251, 250, 245)',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
    },
    header: {
        float: "left",
        marginTop: "25%",
        marginLeft: "100px",
    },
    center: {
        margin: 0,
        top: "50%",
        transform: 'translateY(-50%)',
        position: "absolute",
        textAlign: "center",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const Login = (props: any) => {
    React.useEffect(() => {
        if (localStorage.jwtToken) {
            // @ts-ignore
            props.history.push('/dashboard');
        }
    });

    const classes = useStyles();
    const [textInputUsername, setTextInputUsername] = React.useState('');
    const [textInputPassword, setTextInputPassword] = React.useState('');
    const [statusState, setStatusState] = React.useState({
        data: null,
    });
    const handleClick = () => {
        axios({
            method: "post",
            url: "http://localhost:8001/login",
            data: {
                "username": textInputUsername,
                "password": textInputPassword
            }
        }).then((res) => {
            setStatusState({
                data: res.data,
            });
        }).catch((err: any) => {
            if (err.response) {
                setStatusState({
                    data: err.response.data,
                });
            }
        });
    }
    const handleChangeUsername = (e: any) => {
        setTextInputUsername(e.target.value);
    }
    const handleChangePassword = (e: any) => {
        setTextInputPassword(e.target.value);
    }
    const Status = (props: any) => {
        if (props.res === null) {
            return (
                <br/>
            )
        } else {
            if (props.res.errorCode === 0) {
                const {accessToken} = props.res.data;
                localStorage.setItem('jwtToken', accessToken);
                return (
                    <Alert severity={"success"}>Login successfully, redirecting...</Alert>
                )
            } else {
                return (
                    <Alert severity={"error"}>Username or Password is wrong!</Alert>
                )
            }
        }
    }
    return (
        <Container component={"main"} className={classes.container}>
            <Typography component={"h1"} variant={"h3"} className={classes.header}>
                Welcome to Klipboard.me
            </Typography>
            <form className={classes.form} noValidate>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component={"h1"} variant={"h5"}>
                    Login
                </Typography>
                <Status res={statusState.data}/>
                <TextField
                    required
                    variant={"outlined"}
                    margin={"normal"}
                    fullWidth
                    id={"username"}
                    name={"username"}
                    label={"Username"}
                    autoComplete={"username"}
                    autoFocus
                    onChange={handleChangeUsername}
                />
                <TextField
                    required
                    variant={"outlined"}
                    margin={"normal"}
                    fullWidth
                    id={"password"}
                    type={"password"}
                    name={"password"}
                    label={"Password"}
                    autoComplete={"current-password"}
                    onChange={handleChangePassword}
                />
                <Button
                    fullWidth
                    variant={"contained"}
                    color={"primary"}
                    className={classes.submit}
                    onClick={handleClick}
                >
                    Login
                </Button>
            </form>
        </Container>
    )
}

export default Login;
