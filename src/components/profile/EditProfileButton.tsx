import React from 'react';
import {
    Button,
    Card,
    CardActions,
} from '@material-ui/core';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {UploadModal} from "./UploadModal";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

export const EditProfileButton = (props: any) => {
    const classes = useStyles();
    const [stateModal, setStateModal] = React.useState(false);
    const handleModal = (open: boolean) => () => {
        setStateModal(open)
        console.log(stateModal);
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
