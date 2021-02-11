import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import './Home.css'

// function submitForm (e) {
//     e.preventDefault();
//     // this.props.history.push('/memes');
//     console.log("Done");
// }

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginLeft: "1rem"
  },
}));

function Home() {
    const classes = useStyles();
    return (
        <div>
            <form action="/memes" method="POST">
              <div className="box">
                <TextField className="ele" label="Author Name" type="search" variant="outlined" name="name" />
                <TextField className="ele" label="Meme URL" type="search" variant="outlined" name="url" />
              </div>
              <TextField
                id="outlined-multiline-static"
                name="caption"
                className="text"
                label="Caption"
                multiline
                rows={4}
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
              >Upload</Button>
            </form>
        </div>
    );
};

export default Home;
