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
    const [textInput, setTextInput] = React.useState({
        name: "",
        email: "",
        bio: "",
        newPassword: "",
        currentPassword: "",
    });
    const handleTextInputChange = (prop: string) => (event: any) => {
        setTextInput({...textInput, [prop]: event.target.value});
    }
    const [ppId, setPPId] = React.useState("");
    const [isUploading, setIsUploading] = React.useState(false);
    const handleSave = () => {
        if (fileObjects.length === 1) {
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
                setPPId(res.data.data.dataId);
            });
        }
        const data = {};
        if (textInput.name) {
            // @ts-ignore
            data.name = textInput.name;
        }
        if (textInput.email) {
            // @ts-ignore
            data.email = textInput.email;
        }
        if (textInput.bio) {
            // @ts-ignore
            data.bio = textInput.bio;
        }
        if (textInput.currentPassword) {
            // @ts-ignore
            data.currentPassword = textInput.currentPassword;
        }
        if (textInput.newPassword) {
            // @ts-ignore
            data.newPassword = textInput.newPassword;
        }
        if (ppId) {
            // @ts-ignore
            data.profilePictureDataId = ppId;
        }
        axios({
            method: "patch",
            url: "https://api.klipboard.me/user",
            data: data,
        }).then((res) => {
            if (res.status === 200) {
                setIsUploading(false);
                window.location.reload();
                props.setStateModal(false);
                setFileObjects([]);
                setTextInput({
                    name: "",
                    email: "",
                    bio: "",
                    newPassword: "",
                    currentPassword: "",
                });
            }
        });
    }
    const dialogActions = (
        <DialogActions>
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
                onClick={handleSave}
            >
                Submit
            </Button>
        </DialogActions>
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
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogContent>
                        <DropzoneArea
                            filesLimit={1}
                            onChange={handleImageChange}
                            clearOnUnmount
                        />
                        <br/>
                        <TextField
                            id="input-name"
                            label="Name"
                            className={classes.modalText}
                            value={textInput.name}
                            onChange={handleTextInputChange("name")}
                        />
                        <TextField
                            id="input-email"
                            label="Email"
                            className={classes.modalText}
                            value={textInput.email}
                            onChange={handleTextInputChange("email")}
                        />
                        <TextField
                            id="input-bio"
                            label="Bio"
                            className={classes.modalText}
                            value={textInput.bio}
                            onChange={handleTextInputChange("bio")}
                        />
                        <TextField
                            id="input-bio"
                            type={"password"}
                            label="New Password"
                            className={classes.modalText}
                            value={textInput.newPassword}
                            onChange={handleTextInputChange("newPassword")}
                        />
                        <TextField
                            required
                            id="input-bio"
                            type={"password"}
                            label="Current Password"
                            className={classes.modalText}
                            value={textInput.currentPassword}
                            onChange={handleTextInputChange("currentPassword")}
                        />
                    </DialogContent>
                    {
                        isUploading ? <CircularProgress/> : dialogActions
                    }
                </Dialog>
            </Modal>
        </div>
    )
}
