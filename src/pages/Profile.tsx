import { Helmet } from 'react-helmet';
import {
  Box,
  Container
} from '@material-ui/core';
import AccountProfile from '../components/profile/AccountProfile';
import EditProfileButton from '../components/profile/EditProfileButton';

const Profile = () => (
  <>
    <Helmet>
      <title>Profile | Username</title>
    </Helmet>
    <Box>
      <Container maxWidth="md">
        <AccountProfile />
        <EditProfileButton />
      </Container>
    </Box>
  </>
);

export default Profile;