$(document).ready(function(){
    var sigXX = 1;
    var sigYY = 0.2;
    var sigXY = 0.3;
    display_from_submit(sigXX, sigYY, sigXY);
    
    $(".rangeUser").change(function(){
	if     ($(this).attr("id") == "rangeUserSigXX") { sigXX=parseFloat($(this).val()); }
	else if($(this).attr("id") == "rangeUserSigYY") { sigYY=parseFloat($(this).val()); }
	else                                            { sigXY=parseFloat($(this).val()); }
	display_from_submit(sigXX, sigYY, sigXY);
    });
    
    $( "#userSubmit" ).click(function( event ) {
	event.preventDefault();
	var sigXX = math.number($("#displaySigXX").val());
	var sigYY = math.number($("#displaySigYY").val());
	var sigXY = math.number($("#displaySigXY").val());
	display_from_submit(sigXX, sigYY, sigXY);
    });

    $("#movieSigXX").click(function( event ) {
	event.preventDefault();	
	var sigXX = math.number(-1);
	var sigYY = math.number($("#displaySigYY").val());
	var sigXY = math.number($("#displaySigXY").val());
	display_movie(sigXX, sigYY, sigXY, 0);
    });

    $("#movieSigYY").click(function( event ) {
	event.preventDefault();	
	var sigYY = math.number(-1);
	var sigXX = math.number($("#displaySigXX").val());
	var sigXY = math.number($("#displaySigXY").val());
	display_movie(sigXX, sigYY, sigXY, 1);
    });

    $("#movieSigXY").click(function( event ) {
	event.preventDefault();	
	var sigXY = math.number(-1);
	var sigYY = math.number($("#displaySigYY").val());
	var sigXX = math.number($("#displaySigXX").val());
	display_movie(sigXX, sigYY, sigXY, 2);
    });
        
});


function display_from_submit(sigXX, sigYY, sigXY) {
    $("#rangeUserSigXX").val(sigXX);
    $("#rangeUserSigXY").val(sigXY);
    $("#rangeUserSigYY").val(sigYY);
    $("#displaySigXX").val(sigXX);
    $("#displaySigXY").val(sigXY);
    $("#displaySigYY").val(sigYY);

    var sigNorm = math.norm([sigXX, sigYY, sigXY], 2);
    var sign = math.sign(sigXY); if(math.abs(sign)<0.00001) { sign=1.0; }
    var sigXXNorm=sign*sigXX/sigNorm; var sigYYNorm=sign*sigYY/sigNorm; var sigXYNorm=sign*sigXY/sigNorm;
    var dist=1000.0; imin=0;
    for (i = 0; i < math.size(sigmaXX); i++)
    {
	var dbXX=math.number(sigmaXX[i]); var dbYY=math.number(sigmaYY[i]); var dbXY=math.number(sigmaXY[i]);
	var dbNorm = math.norm([dbXX, dbYY, dbXY], 2);
	var dbXXNorm=dbXX/dbNorm; var dbYYNorm=dbYY/dbNorm; var dbXYNorm=dbXY/dbNorm;
	var distTmp=math.norm([ dbXXNorm-sigXXNorm, dbYYNorm-sigYYNorm, dbXYNorm-sigXYNorm], 2);
	if(dist>distTmp) { dist=distTmp; imin=i; imin_str = i+1; }
    }
    //$("#debugResult").append('----> #'+ imin +' (' + dist + ') <----<br/>');
    //$("#debugResult").append(sigmaXX[imin] + ' for ' + sigXXNorm + '<br/>');
    //$("#debugResult").append(sigmaYY[imin] + ' for ' + sigYYNorm + '<br/>');
    //$("#debugResult").append(sigmaXY[imin] + ' for ' + sigXYNorm + '<br/>');
    //$("#rangeUserSigXX").val(sigmaXX[imin]);
    //$("#rangeUserSigYY").val(sigmaYY[imin]);
    //$("#rangeUserSigXY").val(sigmaXY[imin]);    
    //$("#displaySigXX").val(sigmaXX[imin].toFixed(3));
    //$("#displaySigYY").val(sigmaYY[imin].toFixed(3));
    //$("#displaySigXY").val(sigmaXY[imin].toFixed(3));
    $("#displaySigXX").val(sigXX.toFixed(3));
    $("#displaySigYY").val(sigYY.toFixed(3));
    $("#displaySigXY").val(sigXY.toFixed(3));
    $("#imgMicroCell").attr('src', './img/'+imin_str+'.png');

    var arrowSize=200;
    
    if(sigXX<0) {
	$("#arrow-sigxx-right").attr('src', './inc/arrow-left.png');
	$("#arrow-sigxx-left").attr('src', './inc/arrow-right.png');
    } else {
	$("#arrow-sigxx-right").attr('src', './inc/arrow-right.png');
	$("#arrow-sigxx-left").attr('src', './inc/arrow-left.png');
    }
    $("#arrow-sigxx-right").attr('width', math.norm(sigXX)*arrowSize);
    $("#arrow-sigxx-right").parent().css({'text-align':'left'});    
    $("#arrow-sigxx-left").attr('width', math.norm(sigXX)*arrowSize);
    $("#arrow-sigxx-left").parent().css({'text-align':'right'});    

    
    if(sigYY<0) {
	$("#arrow-sigyy-up").attr('src', './inc/arrow-down.png');
	$("#arrow-sigyy-down").attr('src', './inc/arrow-up.png');	
    } else {
	$("#arrow-sigyy-up").attr('src', './inc/arrow-up.png');
	$("#arrow-sigyy-down").attr('src', './inc/arrow-down.png');
    }
    $("#arrow-sigyy-up").attr('height', math.norm(sigYY)*arrowSize);
    $("#arrow-sigyy-up").parent().css({'vertical-align':'bottom'});    
    $("#arrow-sigyy-down").attr('height', math.norm(sigYY)*arrowSize);
    $("#arrow-sigyy-down").parent().css({'vertical-align':'top'});    

    
    if(sigXY<0) {
	$("#arrow-sigxy-right").attr('src', './inc/arrow-left.png');
	$("#arrow-sigxy-left").attr('src', './inc/arrow-right.png');
	$("#arrow-sigxy-up").attr('src', './inc/arrow-down.png');
	$("#arrow-sigxy-down").attr('src', './inc/arrow-up.png');	
    } else {
	$("#arrow-sigxy-right").attr('src', './inc/arrow-right.png');
	$("#arrow-sigxy-left").attr('src', './inc/arrow-left.png');
	$("#arrow-sigxy-up").attr('src', './inc/arrow-up.png');
	$("#arrow-sigxy-down").attr('src', './inc/arrow-down.png');
    }
    $("#arrow-sigxy-right").attr('width', math.norm(sigXY)*arrowSize);
    $("#arrow-sigxy-right").parent().css({'height':String(0.4*math.norm(sigXY)*arrowSize)+'px'});
    $("#arrow-sigxy-left").attr('width', math.norm(sigXY)*arrowSize);
    $("#arrow-sigxy-left").parent().css({'height':String(0.4*math.norm(sigXY)*arrowSize)+'px'});
    $("#arrow-sigxy-up").attr('height', math.norm(sigXY)*arrowSize);
    $("#arrow-sigxy-up").parent().css({'width':String(0.4*math.norm(sigXY)*arrowSize)+'px'});
    $("#arrow-sigxy-down").attr('height', math.norm(sigXY)*arrowSize);
    $("#arrow-sigxy-down").parent().css({'width':String(0.4*math.norm(sigXY)*arrowSize)+'px'});

}


function display_movie(sigXX, sigYY, sigXY, comp) {
    var imax=math.number(50); var i=math.number(0);
    var timerMovie = setInterval(function () {
	display_from_submit(sigXX, sigYY, sigXY);
	switch(comp) {
	case 0:  sigXX = sigXX+math.number(2.0/imax); break;
	case 1:  sigYY = sigYY+math.number(2.0/imax); break;
	case 2:  sigXY = sigXY+math.number(2.0/imax); break;	   
	default: sigXX = sigXX+math.number(2.0/imax); } 
	i=i+1;
	if(i>imax) { clearInterval(timerMovie); }
	$(".pauseMovie").click(function() {
	    clearInterval(timerMovie);
	});
    }, 1000);
};
