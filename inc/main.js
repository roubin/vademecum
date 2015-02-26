$(document).ready(function(){
    var sigXX = 1; $("#rangeUserSigXX").val(sigXX);
    var sigYY = 0; $("#rangeUserSigYY").val(sigYY);
    var sigXY = 0; $("#rangeUserSigXY").val(sigXY);    
    var sigNorm = math.norm([sigXX, sigYY, sigXY], 2);
    var sigXXNorm=sigXX/sigNorm;
    var sigYYNorm=sigYY/sigNorm;
    var sigXYNorm=sigXY/sigNorm;

    
    var debugVar = math.norm([sigXXNorm, sigYYNorm, sigXYNorm], 2);
    $(".rangeUser").change(function(){
	if($(this).attr("id") == "rangeUserSigXX") {
	    sigXX=parseFloat($(this).val());
	} else if($(this).attr("id") == "rangeUserSigYY") {
	    sigYY=parseFloat($(this).val());
	} else {
	    sigXY=parseFloat($(this).val());
	}
	var sigNorm = math.norm([sigXX, sigYY, sigXY], 2);
	var sigXXNorm=sigXX/sigNorm;
	var sigYYNorm=sigYY/sigNorm;
	var sigXYNorm=sigXY/sigNorm;
	
	var dist=1000.0; imin=0;
	for (i = 0; i < math.size(sigmaXX); i++)
	{
	    var dbXX=math.number(sigmaXX[i]);
	    var dbYY=math.number(sigmaYY[i]);
	    var dbXY=math.number(sigmaXY[i]);
	    var dbNorm = math.norm([dbXX, dbYY, dbXY], 2);
	    var dbXXNorm=dbXX/dbNorm;
	    var dbYYNorm=dbYY/dbNorm;
	    var dbXYNorm=dbXY/dbNorm;
	    var distTmp=math.norm([ dbXXNorm-sigXXNorm, dbYYNorm-sigYYNorm, dbXYNorm-sigXYNorm], 2);
	    if(dist>distTmp) {
		dist=distTmp; imin=i;		
	    }
	}
	$("#debugResult").append('----> #'+ imin +' (' + dist + ') <----<br/>');
	$("#debugResult").append(sigmaXX[imin] + ' for ' + sigXXNorm + '<br/>');
	$("#debugResult").append(sigmaYY[imin] + ' for ' + sigYYNorm + '<br/>');
	$("#debugResult").append(sigmaXY[imin] + ' for ' + sigXYNorm + '<br/>');

	$("#rangeUserSigXX").val(sigmaXX[imin]);
	$("#rangeUserSigYY").val(sigmaYY[imin]);
	$("#rangeUserSigXY").val(sigmaXY[imin]);    

	$("#displaySigXX").text(sigmaXX[imin]);
	$("#displaySigYY").text(sigmaYY[imin]);
	$("#displaySigXY").text(sigmaXY[imin]);

	$("#imgMicroCell").attr('src', './img/'+imin+'.png');

    });    
});


