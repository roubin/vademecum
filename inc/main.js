$(document).ready(function(){
    var sigXX = 1; $("#rangeUserSigXX").val(sigXX);
    var sigYY = 0; $("#rangeUserSigYY").val(sigYY);
    var sigXY = 0; $("#rangeUserSigXY").val(sigXY);    
    var sigNorm = math.norm([sigXX, sigYY, sigXY], 2);
    var sigXXNorm=sigXX/sigNorm;
    var sigYYNorm=sigYY/sigNorm;
    var sigXYNorm=sigXY/sigNorm;  
    $(".rangeUser").change(function(){
	if($(this).attr("id") == "rangeUserSigXX") {
	    sigXX=parseFloat($(this).val());
	} else if($(this).attr("id") == "rangeUserSigYY") {
	    sigYY=parseFloat($(this).val());
	} else {
	    sigXY=parseFloat($(this).val());
	}
	var sigNorm = math.norm([sigXX, sigYY, sigXY], 2);
	var sign = math.sign(sigXY); if(math.abs(sign)<0.00001) { sign=1.0; }
	var sigXXNorm=sign*sigXX/sigNorm;
	var sigYYNorm=sign*sigYY/sigNorm;
	var sigXYNorm=sign*sigXY/sigNorm;	
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
		imin_str = i+1;
	    }
	}
	$("#debugResult").append('----> #'+ imin +' (' + dist + ') <----<br/>');
	$("#debugResult").append(sigmaXX[imin] + ' for ' + sigXXNorm + '<br/>');
	$("#debugResult").append(sigmaYY[imin] + ' for ' + sigYYNorm + '<br/>');
	$("#debugResult").append(sigmaXY[imin] + ' for ' + sigXYNorm + '<br/>');
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
    });


    
    $( "#userSubmit" ).click(function( event ) {
	event.preventDefault();
	var sigXX = math.number($("#displaySigXX").val()); $("#rangeUserSigXX").val(sigXX);
	var sigYY = math.number($("#displaySigYY").val()); $("#rangeUserSigYY").val(sigYY);
	var sigXY = math.number($("#displaySigXY").val()); $("#rangeUserSigXY").val(sigXY);
	var sigNorm = math.norm([sigXX, sigYY, sigXY], 2);
	var sign = math.sign(sigXY); if(math.abs(sign)<0.00001) { sign=1.0; }
	var sigXXNorm=sign*sigXX/sigNorm;
	var sigYYNorm=sign*sigYY/sigNorm;
	var sigXYNorm=sign*sigXY/sigNorm;
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
		imin_str = i+1;
	    }
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
    });
});


