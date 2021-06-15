import React from 'react';
import {
    Button,
    Card,
    CardActions,
} from '@material-ui/core';
import {UploadModal} from "./UploadModal";

export const EditProfileButton = (props: any) => {
    const [stateModal, setStateModal] = React.useState(false);
    const handleModal = (open: boolean) => () => {
        setStateModal(open)
    }
    return (
        <Card {...props}>
            <CardActions>
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    onClick={handleModal(true)}
                >
                    Edit Profile
                </Button>
                <UploadModal
                    stateModal={stateModal}
                    handleModal={handleModal}
                    name={props.name}
                    email={props.email}
                    bio={props.bio}
                />
            </CardActions>
        </Card>
    );
}

export default EditProfileButton;
