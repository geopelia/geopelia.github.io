jQuery(document).ready(function() {
  JSONP( 'https://api.github.com/users/geopelia/gists?callback=?', function( response ) {
		var data = response.data;
    data.forEach(function(element, index, array) {
		    var desc = element.description;
        var title = '';
        var p = element.files;
        for (var key in p) {
          if (p.hasOwnProperty(key)) {
            title = '<a alt="Link in Github" href="' + element.url + '"><strong>' + key + ':</strong></a> ';
            break;
          }
        }
        $('ul#gist').append('<li>' + title + desc + '</li>');
    });
	});

  JSONP( 'https://api.github.com/users/geopelia/repos?callback=?', function( response ) {
    var data = response.data;
    data.forEach(function(element, index, array) {
        var desc = element.description;
        var title = '<a alt="Link in Github" href="' + element.url + '"><strong>' + element.name + ':</strong></a> ';
        $('ul#repos').append('<li>' + title + desc + '</li>');
    });
  });

	function JSONP( url, callback ) {
		var id = ( 'jsonp' + Math.random() * new Date() ).replace('.', '');
		var script = document.createElement('script');
		script.src = url.replace( 'callback=?', 'callback=' + id );
		document.body.appendChild( script );
		window[ id ] = function( data ) {
			if (callback) {
				callback( data );
			}
		};
	}
});
