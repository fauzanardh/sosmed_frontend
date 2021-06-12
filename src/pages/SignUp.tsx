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
import {Alert} from "@material-ui/lab";
import {LockOutlined} from "@material-ui/icons";
import axios from "axios";
import {api_error_code} from "../const/status";

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        border: "3px solid black",
        width: "25%",
        height: "auto",
        float: "right",
        marginRight: "100px",
        marginTop: "5%",
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
        marginTop: "20%",
        marginLeft: "100px",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const SignUp = (props: any) => {
    let registerSuccess = false;
    React.useEffect(() => {
        if (localStorage.jwtToken) {
            // @ts-ignore
            props.history.push('/dashboard');
        }
        if (registerSuccess) {
            // @ts-ignore
            props.history.push('/login');
        }
    });
    const classes = useStyles();
    const [inputValues, setInputValues] = React.useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",

    });
    const handleChange = (prop: any) => (event: any) => {
        setInputValues({...inputValues, [prop]: event.target.value})
    }
    const [statusState, setStatusState] = React.useState({
        data: null,
    });
    const handleClick = () => {
        if (inputValues.password === inputValues.confirmPassword) {
            axios({
                method: "post",
                url: "http://localhost:8001/user",
                data: {
                    "name": inputValues.name,
                    "username": inputValues.username,
                    "password": inputValues.password
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
        } else {
            setStatusState({
                //@ts-ignore
                data: {
                    errorCode: api_error_code.different_password
                }
            })
        }
    }
    const Status = (_props: any) => {
        if (_props.res === null) {
            return (
                <br/>
            )
        } else {
            if (_props.res.errorCode === api_error_code.no_error) {
                registerSuccess = true;
                return (
                    <Alert severity={"success"}>Registered successfully, redirecting...</Alert>
                )
            } else if (_props.res.errorCode === api_error_code.user_registered) {
                return (
                    <Alert severity={"error"}>User with username '{_props.res.data.username}' already registered!</Alert>
                )
            } else if (_props.res.errorCode === api_error_code.different_password) {
                return (
                    <Alert severity={"error"}>Password doesn't match!</Alert>
                )
            } else {
                return (
                    <Alert severity={"error"}>Something went wrong, please try again.</Alert>
                )
            }
        }
    }
    return (
        <Container component={"main"} className={classes.container}>
            <Typography component={"h1"} variant={"h3"} className={classes.header}>
                Register your account on Klipboard.me
            </Typography>
            <form className={classes.form} noValidate>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component={"h1"} variant={"h5"}>
                    SignUp
                </Typography>
                <Status res={statusState.data}/>
                <TextField
                    required
                    variant={"outlined"}
                    margin={"normal"}
                    fullWidth
                    id={"name"}
                    name={"name"}
                    label={"Name"}
                    value={inputValues.name}
                    autoFocus
                    onChange={handleChange("name")}
                />
                <TextField
                    required
                    variant={"outlined"}
                    margin={"normal"}
                    fullWidth
                    id={"username"}
                    name={"username"}
                    label={"Username"}
                    value={inputValues.username}
                    autoFocus
                    onChange={handleChange("username")}
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
                    value={inputValues.password}
                    onChange={handleChange("password")}
                />
                <TextField
                    required
                    variant={"outlined"}
                    margin={"normal"}
                    fullWidth
                    id={"confirmPassword"}
                    type={"password"}
                    name={"confirmPassword"}
                    label={"Confirm Password"}
                    value={inputValues.confirmPassword}
                    onChange={handleChange("confirmPassword")}
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

export default SignUp;
