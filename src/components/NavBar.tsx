import React from "react";
import {
    makeStyles,
    Theme,
    Typography,
    fade,
    Menu,
    MenuItem,
    IconButton,
    Badge,
    AppBar, Toolbar, InputBase, Link
} from "@material-ui/core";
import {AccountCircle, Notifications, Search} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        height: "100%",
        maxWidth: "100%",
        backgroundColor: 'rgb(251, 250, 245)',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto"
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
}));

export const NavBar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const [searchValue, setSearchValue] = React.useState("");
    const handleSearchChange = (event: any) => {
        if (event.target.value.length >= 4) {
            console.log(event.target.value);
        }
        setSearchValue(event.target.value);
    }

    const menuId = "navbar-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link href={"/profile"}>
                <MenuItem onClick={handleMenuClose}>
                    Profile
                </MenuItem>
            </Link>
            <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
        </Menu>
    );
    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Link href={"/"} color={"inherit"}>
                        <Typography className={classes.title} variant={"h6"} noWrap>
                            Klipboard
                        </Typography>
                    </Link>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search/>
                        </div>
                        <InputBase
                            placeholder={"Search…"}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label={"show 17 new notifications"} color={"inherit"}>
                            <Badge badgeContent={17} color={"secondary"}>
                                <Notifications/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge={"end"}
                            aria-label={"account of current user"}
                            aria-controls={menuId}
                            aria-haspopup={"true"}
                            onClick={handleProfileMenuOpen}
                            color={"inherit"}
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    )
}
