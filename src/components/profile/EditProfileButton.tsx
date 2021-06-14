import React from 'react';
import {
  Button,
  Card,
  CardActions,
  Modal
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import EditProfile from "./EditProfile";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


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
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card {...props}>
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
        onClick={handleOpen}
      >
        Edit Profile
      </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <EditProfile />
          </Fade>
        </Modal>
    </CardActions>
  </Card>
);
} 
  
export default EditProfileButton;