<!--
// ����ص��¼�����
function EventError(strValue) {
	try {
		document.getElementById("ServicePersonnel").innerHTML = strValue;
		var t = setTimeout("doLoadqqOnline()", 300);
	} catch (e) {
		var t = setTimeout("doLoadqqOnline()", 300);
	}
}

// ״̬�ص��¼�����
function EventState(strValue) {
	try {
		document.getElementById("ServicePersonnel").innerHTML = strValue;
	} catch (e) {
		var t = setTimeout("doLoadqqOnline()", 300);
	}
}

// ��ɻص��¼�����
function EventDownloadEnd(strValue) {
	try {
		if (strValue==''||strValue==null) {
			var t = setTimeout("doLoadqqOnline()", 300);
		} else {
			document.getElementById("ServicePersonnel").innerHTML = strValue;
		}
	} catch (e) {
		var t = setTimeout("doLoadqqOnline()", 300);
	}
}

function doLoadqqOnline() {
	try {
		var A = new Ajax();
		// ָ�������¼�
		A.OnError 	= EventError;
		// ָ��״̬�¼�
		A.OnState 	= EventState;
		// ָ������¼�
		A.OnDownloadEnd = EventDownloadEnd;

		A.method 	= "GET";
		A.Sync		= true;
		A.Charset	= "gb2312";
		A.send();
	} catch (e) {
		var t = setTimeout("doLoadqqOnline()", 300);
	}
}


var lastScrollY=0;

function heartBeat()
{ 
	var diffY;
	var ioc = document.getElementById("full");
	if(ioc == null || ioc == undefined)
		return;
	
	var diffY = 0;
	if (document.documentElement && document.documentElement.scrollTop)
		diffY = document.documentElement.scrollTop;
	else if (document.body)
	    	diffY = document.body.scrollTop
	else
	    	{/*Netscape stuff*/}

	var percent = 0.1 * (diffY - lastScrollY); 
	if(percent>0){
		percent=Math.ceil(percent); 
	}
	else{
		percent=Math.floor(percent); 
	}
	ioc.style.top = ((isNaN(parseInt(ioc.style.top)) ? 0 :parseInt(ioc.style.top))  + percent).toString() + "px";
	lastScrollY = lastScrollY+percent; 
}
function mClk(){ //��
	event.srcElement.click();
}

document.write("<div id=\"ServicePersonnel\"><div id=\"toTop\"></div></div>"); 
try {
	doLoadqqOnline();
} catch (e) {
	var t = setTimeout("doLoadqqOnline()", 300);
}
window.setInterval("heartBeat()", 1);
//-->