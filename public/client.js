
$(document).ready(function( ) {
  console.log( 'jq' );
  getMoney();

  $( '#submit').on( 'click', addAlbum );
  $('.albumContainer').on('click','.removeButton', deleteAlbum);
  $('.albumContainer').on('click','.updateButton', updateAlbum);
  $('.albumContainer').on('click','#updateDone', updateDone);
});

function addAlbum() {
  var objectToSend = {
    artist: $('#artistIn').val(),
    imgUrl: $('#imgIn').val(),
    album: $('#albumIn').val(),
    releaseYear: $('#yearIn').val()
  };

  $.ajax({
    type: 'POST',
    url: '/addAlbum',
    data: objectToSend,
    success: function ( res ) {
      console.log( 'back from server', res );
      getMoney();
    }
  });
}

function getMoney() {
  $.ajax({
    type: 'GET',
    url: '/getMoney',
    success: function( res ){
      console.log( 'getting money', res );
      $('.albumContainer').empty();
      for (var i = 0; i < res.length; i++) {
        $('.albumContainer').append('<div class="col-sm-3 card" data-id="' + res[i]._id + '"><img class="albumCover thisImgURL' + res[i]._id + ' " src="' + res[i].imgUrl + '" width=100%><h3><span class="label thisArtist' + res[i]._id + ' ">' + res[i].artist + '</span></h3><p class="thisAlbum' + res[i]._id + ' ">' +
        res[i].album + '</p><p class="thisReleaseYear' + res[i]._id + ' ">' + res[i].releaseYear + '</p><button class="updateButton btn btn-danger" data-id="' +
         res[i]._id + '">Update</button><button class="removeButton btn btn-danger" data-id="' + res[i]._id + '">Remove</button></div>' );
      }


    }
  });//ending ajax
}

function deleteAlbum(){
  var id = $(this).data('id');

  $.ajax({
    type: 'DELETE',
    url: '/deleteAlbum/'+ id,
    success: function ( res ) {
      console.log( 'back from server', res )
      getMoney();
    }
});
}

function updateAlbum (){
  var id = $(this).data('id');
  var currentAlbumInfo = {
    artist: $('.thisArtist' + id).text(),
    imgUrl: $('.thisImgURL' + id).prop('src'),
    album: $('.thisAlbum' + id).text(),
    releaseYear: $('.thisReleaseYear' + id).text()
  }
  var parent = $(this).parent();
  parent.empty();
  parent.append('<input id="updateArtist" type="text" value="' + currentAlbumInfo.artist + '">' +
    '<input id="updateImgUrl" type="text" value="' + currentAlbumInfo.imgUrl + '">' +
    '<input id="updateAlbum" type="text" value="' + currentAlbumInfo.album + '">' +
    '<input id="updateReleaseYear" type="text" value="' + currentAlbumInfo.releaseYear + '">' +
    '<button id="updateDone" type="button" class="btn btn-success">Done</button>');

  // var albumToUpdate = {
  //   _id: id,
  //   artist: $('.thisArtist' + id).text(),
  //   imgUrl: $('.thisImgURL' + id).text(),
  //   album: $('.thisAblum' + id).text(),
  //   releaseYear:
  //
  // }

}

function updateDone () {
  var albumToUpdate = {
    _id: $(this).data('id'),
    artist: $('#updateArtist').val(),
    imgUrl: $('#updateImgUrl').val(),
    album: $('#updateAlbum').val(),
    releaseYear: $('#updateReleaseYear').val()
  }
console.log('albumToUpdate:', albumToUpdate);
  $.ajax({
    type: 'PUT',
    url: '/updateAlbum',
    data: albumToUpdate,
    success: function ( res ) {
      console.log( 'back from /updateAlbum with:', res );
      getMoney();
    }
  })
}
