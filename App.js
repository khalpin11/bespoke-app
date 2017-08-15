Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
        var bespoke_url = "https://rally1.rallydev.com/apps/bespoke/api/v1/board/current";
        var xmlhttp = new XMLHttpRequest();
        var response;
        
        xmlhttp.onreadystatechange = function() {
			if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
				response = xmlhttp.responseXML;
			}
		};
		
		//TODO - Figure out the supported way to delete Bespoke for the Team Board
		xmlhttp.open( "DELETE", bespoke_url, false );
		xmlhttp.send();
		
		console.log( response );
    }
});
