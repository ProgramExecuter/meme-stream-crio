const express        = require('express');
const mongoose       = require('mongoose');
const cors           = require('cors');
const bodyParser     = require('body-parser');
const dotenv         = require('dotenv');
const Meme           = require('./models/meme');
const app            = express();


// For hiding URL of Database
dotenv.config();


// BodyParser is used to read {req.body} content 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// CORS is used to allow HTTP requests to be sent from all devices
app.use(cors());


/// MongoDB Setup
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB Connected')
    })
    .catch(err => console.log(err));

///
///
//Fetches latest 100 memes
app.get('/memes', (req, res) => {
    // limit(100)           --> for only 100 memes
    // sort({$natural:-1})  --> for memes to show by newly ones to old ones
    Meme.find({}).limit(100).sort({$natural:-1}).exec((err, memes) => {
        if(err) {
            res.json({
                status: "Server Error",
                statusCode: 500
            });
        } else {
            res.send(JSON.parse(JSON.stringify(memes)));
        }
    });
});


///
///
//Adds a new meme
app.post('/memes', (req, res) => {
    const newMeme = new Meme({
        name: req.body.name,
        url: req.body.url,
        caption: req.body.caption,
    });

    //Adding the newly created meme into MongoDB database
    Meme.findOne({name:newMeme.name, url:newMeme.url, caption:newMeme.caption}, (err, alreadyMeme) => {
        if(err) {
            res.send(err);
        } else {
            if(
                alreadyMeme && 
                alreadyMeme.name === newMeme.name &&
                alreadyMeme.url === newMeme.url &&
                alreadyMeme.caption === newMeme.caption
                )
            {
                res.json({
                    status: "Duplicate POST requests",
                    statusCode: 409
                });
            }
            else
            {
                Meme.create(newMeme, (err, newlyCreatedMeme) => {
                    if(err) {
                        res.send(err);
                    } else {
                        res.json({
                            status: "Created",
                            statusCode: 201,
                            data: newlyCreatedMeme
                        });
                    }
                });
            }
        }
    });
});


///
///
//Shows a particular meme
app.get('/memes/:meme_id', (req, res) => {
    Meme.findById(req.params.meme_id, (err, foundMeme) => {
        if(err) {
            res.json({
                status: "Not Found",
                statusCode: 404
            });
        } else {
            res.json({
                status: "OK",
                statusCode: 200,
                data: foundMeme
            });
        }
    });
});


///
///
// Changes the content of a meme {url , caption}
app.patch('/memes/:meme_id', (req, res) => {
    Meme.updateOne({_id:req.params.meme_id}, {$set: {url: req.body.url, caption:req.body.caption}}, (err, selectedMeme) => {
        if(err) {
            res.send({
                status: "Not Modified",
                status: 304
            });
        } else {
            res.json({
                status: "Updated",
                statusCode: 200,
            });
        }
    });
});


///
///
//PORT setup
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server Running on PORT ${port}`);
});