var app = null;

Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    
    items: [
		{
			xtype: "rallybutton",
			id: "reset-team-board-quick-filters-button",
			text: "Reset Team Board Quick Filters",
			handler: function() { app.resetTeamBoardQuickFilters(); },
			margin: "5px"
		},
		{
			xtype: "label",
			id: "reset-team-board-quick-filters-label",
			text: "",
			margin: "5px"
			
		}
    ],
    
    launch: function() {
		app = this;
    },
    
    resetTeamBoardQuickFilters: function() {
		app.down("#reset-team-board-quick-filters-button").setDisabled( true );
		app.down("#reset-team-board-quick-filters-label").setText( "Processing..." );
        var xmlhttp = new XMLHttpRequest();
        var callback = app.createNewBespoke;
        
        xmlhttp.onreadystatechange = function() {
			if ( this.readyState == 4 && this.status == 200 ) {
				callback( JSON.parse( this.responseText ) );
			}
		};
		
		// Retrieve the current Bespoke for the Team Board
		var bespoke_url = "https://rally1.rallydev.com/apps/bespoke/api/v1/board/current";
		xmlhttp.open( "GET", bespoke_url, true );
		xmlhttp.send();
	},
	
	createNewBespoke: function( baseBespoke ) {
		var bespokeId = baseBespoke.Id;
		
		// Update the Bespoke for a send
		baseBespoke.Filters.QuickFilters = [];
		delete baseBespoke.CreatedAt;
		delete baseBespoke.UpdatedAt;
		delete baseBespoke.IsView;
		
		var xmlhttp = new XMLHttpRequest();
		var createNewBespokeCallback = app.patchBespokeResponse;
		
		xmlhttp.onreadystatechange = function() {
			if ( this.readyState == 4 && this.status == 200 ) {
				createNewBespokeCallback( JSON.parse( this.responseText ) );
			}
		};
		
		// Update Bespoke
		var bespoke_url = "https://rally1.rallydev.com/apps/bespoke/api/v1/board/" + bespokeId;
		xmlhttp.open( "PATCH", bespoke_url, true );
		xmlhttp.setRequestHeader( "content-type", "application/json" );
		xmlhttp.send( JSON.stringify( baseBespoke ) );
    },
    
    patchBespokeResponse: function( bespokePatchResponse ) {
		app.down("#reset-team-board-quick-filters-button").setDisabled( false );
		app.down('#reset-team-board-quick-filters-label').setText( "Done!" );
	}
});
