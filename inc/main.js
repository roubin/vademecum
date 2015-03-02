$(document).ready(function(){
    var sigXX = 1;
    var sigYY = 0;
    var sigXY = 0;
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

    var arrowSize=50;
    
    if(sigXX<0) {
	$("#arrow-sigxx-right").attr('class', 'fa fa-long-arrow-right fa-rotate-180');
	$("#arrow-sigxx-left").attr('class', 'fa fa-long-arrow-left fa-rotate-180');
    } else {
	$("#arrow-sigxx-right").attr('class', 'fa fa-long-arrow-right ');
	$("#arrow-sigxx-left").attr('class',  'fa fa-long-arrow-left ');
    }
    $("#arrow-sigxx-right").css({'font-size':math.norm(sigXX)*arrowSize});
    $("#arrow-sigxx-left").css({'font-size':math.norm(sigXX)*arrowSize});

    if(sigYY<0) {
	$("#arrow-sigyy-up").attr('class', 'fa fa-long-arrow-up fa-rotate-180');
	$("#arrow-sigyy-down").attr('class', 'fa fa-long-arrow-down fa-rotate-180');
    } else {
	$("#arrow-sigyy-up").attr('class', 'fa fa-long-arrow-up');
	$("#arrow-sigyy-down").attr('class',  'fa fa-long-arrow-down');
    }

    $("#arrow-sigyy-up").css({'font-size':math.norm(sigYY)*arrowSize});
    $("#arrow-sigyy-down").css({'font-size':math.norm(sigYY)*arrowSize});

    
    if(sigXY<0) {
	$("#arrow-sigxy-right").attr('class', 'fa fa-long-arrow-right fa-rotate-180');
	$("#arrow-sigxy-left").attr('class', 'fa fa-long-arrow-left fa-rotate-180');
	$("#arrow-sigxy-up").attr('class', 'fa fa-long-arrow-up fa-rotate-180');
	$("#arrow-sigxy-down").attr('class', 'fa fa-long-arrow-down fa-rotate-180');
    } else {
	$("#arrow-sigxy-right").attr('class', 'fa fa-long-arrow-right ');
	$("#arrow-sigxy-left").attr('class',  'fa fa-long-arrow-left ');
	$("#arrow-sigxy-up").attr('class', 'fa fa-long-arrow-up ');
	$("#arrow-sigxy-down").attr('class',  'fa fa-long-arrow-down ');
    }
    $("#arrow-sigxy-right").css({'font-size':math.norm(sigXY)*arrowSize});
    $("#arrow-sigxy-left").css({'font-size':math.norm(sigXY)*arrowSize});
    $("#arrow-sigxy-up").css({'font-size':math.norm(sigXY)*arrowSize});
    $("#arrow-sigxy-down").css({'font-size':math.norm(sigXY)*arrowSize});


}
