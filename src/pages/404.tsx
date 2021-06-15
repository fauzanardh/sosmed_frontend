import {makeStyles, Typography} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
    center: {
        marginTop: "20%",
        display: "flex",
        position: "relative",
        justifyContent: "center",
    },
}));

export const P404 = () => {
    React.useEffect(() => {
        document.title = "Klipboard.me | Content Not Found";
    }, []);
    const classes = useStyles();
    return (
        <Typography variant={"h1"} className={classes.center}>
            Content Not Found
        </Typography>
    )
}

export default P404;
