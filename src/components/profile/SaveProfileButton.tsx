import {
    Button,
    Card,
    CardActions
  } from '@material-ui/core';
  
  export const SaveProfileButton = (props: any) => {
    return (
      <Card {...props}>
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Save Changes
        </Button>
      </CardActions>
    </Card>
  );
  } 
    
  export default SaveProfileButton;