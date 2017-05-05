
$(document).ready(function( ) {
  console.log( 'jq' );
  getMoney();

  $( '#submit').on( 'click', addAlbum );
  $('.albumContainer').on('click','.removeButton', deleteAlbum);
  $('.albumContainer').on('click', '.flipper', flipCard);
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
        // $('.albumContainer').append('<div class="col-sm-3 card"><img class="albumCover" src="' + res[i].imgUrl + '" width=100%><h3><span class="label">' + res[i].artist + '</span></h3><p>' + res[i].album + '</p><p>(' + res[i].releaseYear + ')</p><button class="removeButton btn btn-danger" data-id="' + res[i]._id + '">Remove</button></div>' );
        $('.albumContainer').append(
          '<div class="col-sm-3 card flip-container" >' +
            '<div class="flipper">' +
                '<div class="front">' +
                  '<img class="albumCover" src="' + res[i].imgUrl + '" width=100%>' +
                '</div>' +
                '<div class="back">' +
                  '<h3><span class="label">' + res[i].artist + '</span></h3>' +
                  '<p>' + res[i].album + '</p>' +
                  '<p>(' + res[i].releaseYear + ')</p>' +
                  '<button class="removeButton btn btn-danger" data-id="' + res[i]._id + '">Remove</button>' +
                '</div>' +
            '</div>' +
        '</div>');

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
      console.log( 'back from server', res );
      getMoney();
    }
});
}

function flipCard () {
  $(this).toggleClass('flipped');
}
