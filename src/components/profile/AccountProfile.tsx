import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const user = {
  avatar: '/path/to/image.png',
  city: 'Jakarta',
  country: 'Indonesia',
  jobTitle: 'Student',
  name: 'Mileno Valdo',
  timezone: 'GMT+7'
};

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black
    },
    body: {
      fontSize: 20
    }
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.common.white
      }
    }
  })
)(TableRow);

function createData(posts: number, followers: number, following: number) {
  return { posts, followers, following };
}

const rows = [createData(4, 159, 69)];

const useStyles = makeStyles({
  table: {
    minWidth: 500
  }
});

export const AccountProfile = (props: any) => {
  const classes = useStyles();
  return (
    <Card {...props}>
    <CardContent>
        <Box justifyContent="center">
          {/* Uncomment the avatar tag to add avatar */}
          {/* <Avatar
            src={user.avatar}
            sx={{
              height: 100,
              width: 100
            }}
          /> */}
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
            >
              {user.name}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {`${user.city} ${user.country}`}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {`${moment().format('hh:mm A')} ${user.timezone}`}
            </Typography>
        </Box>
    </CardContent>
    <CardContent>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Posts</StyledTableCell>
            <StyledTableCell align="center">Followers</StyledTableCell>
            <StyledTableCell align="center">Following</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.posts}>
              <StyledTableCell align="center">
                {row.posts}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.followers}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.following}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </CardContent>
    <Divider />
  </Card>
);
} 

export default AccountProfile;