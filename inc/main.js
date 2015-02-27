$(document).ready(function(){
    var sigXX = 1; $("#rangeUserSigXX").val(sigXX); var sigYY = 0; $("#rangeUserSigYY").val(sigYY); var sigXY = 0; $("#rangeUserSigXY").val(sigXY);    
    var sigNorm = math.norm([sigXX, sigYY, sigXY], 2);
    var sigXXNorm=sigXX/sigNorm; var sigYYNorm=sigYY/sigNorm; var sigXYNorm=sigXY/sigNorm;  
    $(".rangeUser").change(function(){
	if     ($(this).attr("id") == "rangeUserSigXX") { sigXX=parseFloat($(this).val()); }
	else if($(this).attr("id") == "rangeUserSigYY") { sigYY=parseFloat($(this).val()); }
	else                                            { sigXY=parseFloat($(this).val()); }
	display_from_submit(sigXX, sigYY, sigXY);
    });
    
    $( "#userSubmit" ).click(function( event ) {
	event.preventDefault();
	var sigXX = math.number($("#displaySigXX").val()); $("#rangeUserSigXX").val(sigXX);
	var sigYY = math.number($("#displaySigYY").val()); $("#rangeUserSigYY").val(sigYY);
	var sigXY = math.number($("#displaySigXY").val()); $("#rangeUserSigXY").val(sigXY);
	display_from_submit(sigXX, sigYY, sigXY);
    });
});


function display_from_submit(sigXX, sigYY, sigXY) {
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

    if(sigXX<0) {
	$("#arrow-sigxx-right").attr('class', 'fa fa-long-arrow-right fa-rotate-180');
	$("#arrow-sigxx-left").attr('class', 'fa fa-long-arrow-left fa-rotate-180');
    } else {
	$("#arrow-sigxx-right").attr('class', 'fa fa-long-arrow-right ');
	$("#arrow-sigxx-left").attr('class',  'fa fa-long-arrow-left ');
    }
    $("#arrow-sigxx-right").css({'font-size':math.norm(sigXX)*100.0});
    $("#arrow-sigxx-left").css({'font-size':math.norm(sigXX)*100.0});

    if(sigYY<0) {
	$("#arrow-sigyy-up").attr('class', 'fa fa-long-arrow-up fa-rotate-180');
	$("#arrow-sigyy-down").attr('class', 'fa fa-long-arrow-down fa-rotate-180');
    } else {
	$("#arrow-sigyy-up").attr('class', 'fa fa-long-arrow-up');
	$("#arrow-sigyy-down").attr('class',  'fa fa-long-arrow-down');
    }

    $("#arrow-sigyy-up").css({'font-size':math.norm(sigYY)*100.0});
    $("#arrow-sigyy-down").css({'font-size':math.norm(sigYY)*100.0});

    
    if(sigXY<0) {
	$("#arrow-sigxy-right").attr('class', 'fa fa-long-arrow-right fa-rotate-180');
	$("#arrow-sigxy-left").attr('class', 'fa fa-long-arrow-left fa-rotate-180');
    } else {
	$("#arrow-sigxy-right").attr('class', 'fa fa-long-arrow-right ');
	$("#arrow-sigxy-left").attr('class',  'fa fa-long-arrow-left ');
    }
    $("#arrow-sigxy-right").css({'font-size':math.norm(sigXY)*100.0});
    $("#arrow-sigxy-left").css({'font-size':math.norm(sigXY)*100.0});


}
