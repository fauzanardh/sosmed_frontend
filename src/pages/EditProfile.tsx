import { Container, Avatar, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SaveProfileButton from '../components/profile/SaveProfileButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
        margin: 'auto',
        alignContent: 'center'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    avatar: {
        width: "100px",
        height: "100px",
        margin: theme.spacing(5),
        backgroundColor: theme.palette.secondary.main,
    },
  }),
);

export const EditProfile = (props: any) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container maxWidth="sm" className={classes.container}>
                <Grid item xs={12} sm={true} align-items-xs-center>
                <Paper elevation={0} className={classes.paper}>
                    <Avatar
                        // src={user.avatar}
                        aria-label="photo"
                        className={classes.avatar}
                    >
                        MV
                    </Avatar> 
                    <Button variant="outlined">Upload Image</Button>
                </Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper elevation={0} className={classes.paper}>
                <form noValidate autoComplete="off">
                    {/* placeholder = "currentname" */}
                    <TextField fullWidth id="full-name" label="Name" placeholder="Mileno Valdo"/>
                </form>
                </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.paper}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="city-select">City</InputLabel>
                            <Select
                            labelId="city-label"
                            id="city"
                            // value={city}
                            // onChange={handleChange}
                            >
                            <MenuItem>Jakarta</MenuItem>
                            <MenuItem>Surabaya</MenuItem>
                            <MenuItem>Kuala Lumpur</MenuItem>
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.paper}>
                    <FormControl className={classes.formControl}>
                            <InputLabel id="country-select">Country</InputLabel>
                            <Select
                            labelId="country-label"
                            id="country"
                            // value={age}
                            // onChange={handleChange}
                            >
                            <MenuItem>Indonesia</MenuItem>
                            <MenuItem>Malaysia</MenuItem>
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.paper}>
                        {/* placeholder = current Bio */}
                        <TextField fullWidth multiline id="user-bio" label="Bio" placeholder="I like to hit summa dat poontang"/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <SaveProfileButton />
                </Grid>
            </Container>
        </div>
            )
}

export default EditProfile;