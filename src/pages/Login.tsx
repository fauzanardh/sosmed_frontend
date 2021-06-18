import React from "react";
import {
    Container,
    Button,
    makeStyles,
    Theme,
    Typography,
    TextField,
    Avatar,
    InputAdornment,
    IconButton,
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {LockOutlined, Visibility, VisibilityOff} from "@material-ui/icons";
import axios from "axios";
import {api_error_code} from "../const/status";

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        borderWidth: "3px",
        borderRadius: theme.shape.borderRadius,
        borderColor: theme.palette.getContrastText(theme.palette.background.default),
        borderStyle: "solid",
        width: "25%",
        height: "auto",
        float: "right",
        marginRight: "100px",
        marginTop: "10%",
        padding: "32px",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    container: {
        height: "100vh",
        maxWidth: "100%",
        backgroundColor: theme.palette.background.default,
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

export const Login = (props: any) => {
    React.useEffect(() => {
        if (localStorage.jwtToken) {
            // @ts-ignore
            props.history.push('/dashboard');
        }
        document.title = "Klipboard.me | Login";
    });

    const classes = useStyles();
    const [inputValues, setInputValues] = React.useState({
        username: "",
        password: "",
        showPassword: false,
    });
    const handleChange = (prop: any) => (event: any) => {
        setInputValues({...inputValues, [prop]: event.target.value})
    }
    const handleClickShowPassword = () => {
        setInputValues({...inputValues, showPassword: !inputValues.showPassword})
    }
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    }
    const handleClick = () => {
        axios({
            method: "post",
            url: "https://api.klipboard.me/login",
            data: {
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
    }
    const [statusState, setStatusState] = React.useState({
        data: null,
    });
    const Status = (props: any) => {
        if (props.res === null) {
            return (
                <br/>
            )
        } else {
            if (props.res.errorCode === api_error_code.no_error) {
                const {accessToken} = props.res.data;
                localStorage.setItem('jwtToken', accessToken);
                return (
                    <Alert severity={"success"}>LoggedIn successfully, redirecting...</Alert>
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
                    value={inputValues.username}
                    autoComplete={"username"}
                    autoFocus
                    onChange={handleChange("username")}
                />
                <TextField
                    required
                    variant={"outlined"}
                    margin={"normal"}
                    fullWidth
                    id={"password"}
                    type={inputValues.showPassword ? "text" : "password"}
                    name={"password"}
                    label={"Password"}
                    value={inputValues.password}
                    autoComplete={"current-password"}
                    onChange={handleChange("password")}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position={"end"}>
                                <IconButton
                                    aria-label={"toggle password visibility"}
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {inputValues.showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
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
