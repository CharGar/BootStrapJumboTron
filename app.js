var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require( 'path' );
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use( express.static( 'public' ) );

mongoose.connect( 'localhost:/27017/cashMoneyRecords' );

var albumSchema = mongoose.Schema({
  album: String,
  artist: String,
  releaseYear: Number,
  imgUrl: String
});

var album = mongoose.model( 'album', albumSchema );

app.listen(5555, function(){
  console.log('server up on 5555');
});
app.get('/', function (req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('public/index.html'));

});

app.get('/getMoney',function(req,res){
  console.log( 'hit get money route' );
  album.find().then(function( data ) {
    res.send( data );
  });
});


app.post('/addAlbum', function(req, res) {
  console.log( 'hit server with: ', req.body);
  var newAlbum = album( req.body );
  newAlbum.save().then( function(){
    res.sendStatus( 200 );
  });
});

app.put('/updateAlbum', function( req, res ){
  console.log('in updateAlbum:', req.body);
  album.update(
   {_id: req.body._id},
   {$set:
     {
       artist: req.body.artist,
       album: req.body.album,
       imgUrl: req.body.imgUrl,
       releaseYear: req.body.releaseYear
     }
   }
)
  res.sendStatus( 201 );
});

app.delete('/deleteAlbum/:id', function( req, res ){
  console.log('id-->', req.params.id);
  album.remove({ _id: req.params.id }, function(err) {
    if ( err ) {
      res.send( 400 );
    } //end Error
    else {
      res.send( 200 )
    }

  });
});
