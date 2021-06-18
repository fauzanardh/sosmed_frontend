import React from "react"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";

export const ErrorDialog = (props: any) => {
    const handleClick = () => {
        window.location.reload();
    }
    return (
        <div>
            <Dialog
                open={props.isOpen}
                onClose={handleClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Server Error"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Something went wrong when doing the last action.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClick} color="primary">
                        Refresh page
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ErrorDialog;
