import React from "react";
import axios from "axios";
import {
    Backdrop,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    Modal,
    TextField
} from "@material-ui/core";
import {DropzoneArea} from "material-ui-dropzone";
import ErrorDialog from "../errors/ErrorDialog";

const useStyles = makeStyles(() => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modalText: {
        width: "100%",
    },
}));

export const UploadModal = (props: any) => {
    const [fileObjects, setFileObjects] = React.useState([]);
    const handleImageChange = (files: any[]) => {
        // @ts-ignore
        setFileObjects(files);
    }
    const [textInput, setTextInput] = React.useState("");
    const handleTextInputChange = (event: any) => {
        setTextInput(event.target.value);
    }
    const [isUploading, setIsUploading] = React.useState(false);
    const [errorDialog, setErrorDialog] = React.useState(false);
    const handleSave = () => {
        if (textInput.length !== 0) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("data", fileObjects[0]);
            axios({
                method: "post",
                url: "https://api.klipboard.me/upload",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                const dataId = res.data.data.dataId;
                if (props.isPost) {
                    axios({
                        method: "post",
                        url: "https://api.klipboard.me/posts",
                        data: {
                            dataId: dataId,
                            text: textInput,
                        },
                    }).then((res) => {
                        if (res.status === 200) {
                            setIsUploading(false);
                            props.setStateModal(false);
                            setFileObjects([]);
                            setTextInput("");
                        }
                    }).catch(() => setErrorDialog(true));
                } else {
                    axios({
                        method: "post",
                        url: "https://api.klipboard.me/reply",
                        data: {
                            parentPostId: props.parent,
                            dataId: dataId,
                            text: textInput,
                        },
                    }).then((res) => {
                        if (res.status === 200) {
                            setIsUploading(false);
                            props.setStateModal(false);
                            setFileObjects([]);
                            setTextInput("");
                        }
                    }).catch(() => setErrorDialog(true));
                }
                window.location.reload();
            });
        }
    }
    const dialogActions = (
        <div>
            <Button
                variant={"contained"}
                color={"primary"}
                onClick={props.handleModal(false)}
            >
                Cancel
            </Button>
            <Button
                variant={"contained"}
                color={"primary"}
                disabled={fileObjects.length === 0}
                onClick={handleSave}
            >
                Submit
            </Button>
        </div>
    )
    const classes = useStyles();
    return (
        <div>
            <Modal
                open={props.stateModal}
                onClose={props.handleModal(false)}
                className={classes.modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Dialog
                    open={props.stateModal}
                    onClose={props.handleModal(false)}
                >
                    <DialogTitle>Add a new {props.isPost ? "post" : "reply"}</DialogTitle>
                    <DialogContent>
                        <DropzoneArea
                            filesLimit={1}
                            onChange={handleImageChange}
                            clearOnUnmount
                        />
                        <br/>
                        <TextField
                            required
                            id="text-required"
                            label="Caption"
                            className={classes.modalText}
                            value={textInput}
                            onChange={handleTextInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        {
                            isUploading ? <CircularProgress/> : dialogActions
                        }
                    </DialogActions>
                </Dialog>
            </Modal>
            <ErrorDialog isOpen={errorDialog}/>
        </div>
    )
}
