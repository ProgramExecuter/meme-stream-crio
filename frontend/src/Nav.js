import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './Nav.css';

const useStyles = makeStyles((theme) => ({
    main: {
        marginBottom: "2rem"
    },
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    }
}));

const Nav = () => {
    const classes = useStyles();
    return (
        <nav>
            <AppBar position="static" className={classes.main}>
                <Toolbar className={classes.box}>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.link}>HOME</Link>
                    </Typography>
                    <Button color="inherit">
                        <Link to="/memes" className={classes.link}>SHOW MEMES</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default Nav;