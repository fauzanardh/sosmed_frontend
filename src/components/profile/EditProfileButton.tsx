import {
  Button,
  Card,
  CardActions
} from '@material-ui/core';

export const EditProfileButton = (props: any) => {
  return (
    <Card {...props}>
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Edit Profile
      </Button>
    </CardActions>
  </Card>
);
} 
  
export default EditProfileButton;