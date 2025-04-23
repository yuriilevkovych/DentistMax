/***********************************************************************
 *                                                                     *
 *   commMax SOCKET                                                    *
 *                                                                     *
 ***********************************************************************/
var commMax_ws_server = APPWS_URL;
var commMax_socket_ws = null;
var commMax_output;

function commMax_init_ws() {
	commMax_output = document.getElementById('ePZP_output');
	$(document).trigger('commMaxInit');
	_commMax_init_ws();
}
function _commMax_init_ws() {
//	ePZP_card_out( false );
	commMax_socket_ws = new WebSocket( commMax_ws_server );
	commMax_socket_ws.onopen = function( evt )    { commMax_Open( evt ); }
	commMax_socket_ws.onclose = function( evt )   { commMax_Close( evt ); }
	commMax_socket_ws.onmessage = function( evt ) { commMax_Message( evt ); }
	commMax_socket_ws.onerror = function( evt )   { commMax_Error( evt ); }
}
function commMax_Open( evt ) {
	APP_state.run = true;
	$(document).trigger('commMaxOpen');
	$("#is-light-app").attr( 'data-state' , 'on' ).attr( 'data-original-title' , locale['cmx_run'] );
	commMax_write( 'CONNECTED' );
}
function commMax_Close( evt ) {
	console.log('commMAX','close',APP_state);
	APP_state.run = false;
	$(document).trigger('commMaxClose');
	$("#is-light-app").attr( 'data-state' , 'off' ).attr( 'data-original-title' , locale['cmx_off'] );
//	commMax_write( 'DISCONNECTED' );
//	setTimeout( '_commMax_init_ws()', 500 );
}
function commMax_Message( evt ) {
	commMax_write( '<span style="color: blue;">FROM COMMMAX: ' + evt.data + '</span>' );
	eval( evt.data );
}
function commMax_Error( evt ) {
	console.log('commMAX','error',evt);
//	$(document).trigger('commMaxError');
	commMax_write( '<span style="color: red;">ERROR:</span> ' + evt.data );
}

function commMax_Send( message ) {
	commMax_socket_ws.send( '{\"data\":\"' + message + '\"}');
}
function commMax_write( message ) {
	/*
		var pre = document.createElement("p");
		pre.style.wordWrap = "break-word";
		pre.innerHTML = message;
		ePZP_output.appendChild(pre);
	*/
//	ePZP_card.innerHTML = message;
}
if ( APP_state.run && checkVersion( 5 , 10 , 10 , 2 ) ) window.addEventListener("load", commMax_init_ws, false);
//else window.addEventListener("load", commMax_Close, false);
