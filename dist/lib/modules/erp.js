
$(document).ready(function(){
	$(document).on( 'click' , 'A#casa-pay' , function() {
		var $ths = $(this);
		console.log('LNK-CLICK-DSBL');
		setTimeout( function() {
			$ths.attr("disabled", true).addClass("ui-state-disabled");
		}, 250);
	});
});
$(document).on("commMaxClose", function(e) {
	ERP_off();
});


/***********************************************************************
 *                                                                     *
 *   ERP SOCKET                                                        *
 *                                                                     *
 ***********************************************************************/
function ERP_on(){
	APP_state.erp = true;
	$("#is-light-erp").attr( 'data-state' , 'on' ).attr( 'data-original-title' , 'Pokladnica&nbsp;ORP je&nbsp;pripojená.' );
}
function ERP_off(){
	APP_state.erp = false;
	$("#is-light-erp").attr( 'data-state' , 'off' ).attr( 'data-original-title' , 'Pokladnica&nbsp;ORP NIE&nbsp;JE&nbsp;pripojená.' );
}
