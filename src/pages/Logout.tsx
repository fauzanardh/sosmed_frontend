import React from "react";
import {Typography} from "@material-ui/core";

export const Logout = (props: any) => {
    if (localStorage.jwtToken) {
        localStorage.removeItem("jwtToken");
        document.title = "Klipboard | Logging out..."
        props.history.push("/");
    }
    return (
        <Typography variant={"h4"}>Logging out...</Typography>
    )
}

export default Logout;
