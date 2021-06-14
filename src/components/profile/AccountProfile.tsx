import moment from 'moment';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Typography
} from '@material-ui/core';
import {withStyles, Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AndroidTwoTone } from '@material-ui/icons';

const user = {
    avatar: '/path/to/image.png',
    city: null,
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

function createData(followers: number, following: number) {
    return {followers, following};
}

const rows = [createData(159, 69)];

const useStyles = makeStyles((theme: Theme) => ({
    table: {
        minWidth: 500
    },
    avatar: {
        width: "100px",
        height: "100px",
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
}));

export const AccountProfile = (props: any) => {
    const classes = useStyles();

    const location = ()=>{
      if (user.city == null) {
        return `${user.country}`;
      }else if(user.country == null){
        return `${user.city}`
      }else if(user.city == null && user.country == null){
        return "";
      }else{
        return `${user.city}, ${user.country}`
      }
    }

    return (
        <Card {...props}>
            <CardContent>
                <Box justifyContent="center">
                    <Avatar
                        // src={user.avatar}
                        aria-label="photo"
                        className={classes.avatar}
                    >
                        MV
                    </Avatar>
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
                        {`${location()}`}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        {`I like to hit summa dat poontang`}
                    </Typography>
                </Box>
            </CardContent>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Followers</StyledTableCell>
                                <StyledTableCell align="center">Following</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.followers}>
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
            <Divider/>
        </Card>
    );
}

export default AccountProfile;
