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
import React from "react";

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

const useStyles = makeStyles((theme: Theme) => ({
    table: {
        minWidth: 500
    },
    avatar: {
        width: "100px",
        height: "100px",
        fontSize: 64,
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
}));

export const AccountProfile = (props: any) => {
    const classes = useStyles();
    return (
        <Card {...props}>
            <CardContent>
                <Box justifyContent="center">
                    <Avatar
                        alt={props.name}
                        src={`https://cdn.klipboard.me/${props.profilePictureDataId}`}
                        aria-label={"photo"}
                        className={classes.avatar}
                    />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h3"
                    >
                        {props.name}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        {props.bio}
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
                            <StyledTableRow>
                                <StyledTableCell align="center">
                                    {props.followers.length}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {props.following.length}
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            <Divider/>
        </Card>
    );
}

export default AccountProfile;
