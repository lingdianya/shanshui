<!--
// author:奔腾的心
//     qq:7180001 
//        2007-01-07

function Ajax(args)
{
	// 是否为IE
	this.IsIE		= false;
	// 信息显示对像ID
	this.MsgID		= "MsgBox_";
	this.MsgIDOpacity	= 100;
	// 错误字符串
	this.ErrorStr 		= null;
	// 错误事件驱动,当发生错误时触发
	this.OnError 		= null;
	// 状态事件驱动,当状态改变时触发
	this.OnState 		= null;
	// 完成事件驱动,当类操作完成时触发
	this.OnDownloadEnd 	= null;

	// 错误显示容器
	this.OnErrorOBJ		= null;
	// 状态显示容器
	this.OnStateOBJ 	= null;
	// 完成显示容器
	this.OnDownloadEndOBJ 	= null;

	// XMLHTTP 发送数据类型 GET 或 POST
	this.method		= "GET";
	// 将要获取的URL地址
	this.URL		= null;
	// 指定同步或异步读取方式(true 为异步,false 为同步)
	this.Sync		= true;
	// 当method 为 POST 时 所要发送的数据
	this.PostData		= null
	// 页面编码
	this.Charset		= "utf-8";
	// 返回读取完成后的数据
	this.RetData 		= null;

	// 创建XMLHTTP对像
	this.HttpObj 		= this.createXMLHttpRequest();
	if(this.HttpObj == null)
	{
		// 对像创建失败时中止运行
		return;
	}

	if(navigator.userAgent.indexOf('MSIE')!==-1)
	{
		this.IsIE = true;
	}

	// 获取参数
	if(args)
	{
		var iargs = eval(args);
		// 获取事件与事件容器
		if(iargs.Events)
		{
			
			// 获取OnError事件
			if(iargs.Events[0].OnError)
			{
				this.OnError		= iargs.Events[0].OnError;
			}
			// 获取OnState事件
			if(iargs.Events[0].OnState)
			{
				this.OnState		= iargs.Events[0].OnState;
			}
			// 获取OnDownloadEnd事件
			if(iargs.Events[0].OnDownloadEnd)
			{
				this.OnDownloadEnd	= iargs.Events[0].OnDownloadEnd;
			}
		}

		// 获取容器
		if(iargs.Vessels)
		{
			
			// 获取Error容器
			if(document.getElementById(iargs.Vessels[0].OnErrorOBJ))
			{
				this.OnErrorOBJ 	= document.getElementById(iargs.Vessels[0].OnErrorOBJ);
			}
			// 获取State容器
			if(document.getElementById(iargs.Vessels[0].OnStateOBJ))
			{
				this.OnStateOBJ 	= document.getElementById(iargs.Vessels[0].OnStateOBJ);
			}
			// 获取DownloadEnd容器
			if(document.getElementById(iargs.Vessels[0].OnDownloadEndOBJ))
			{
				this.OnDownloadEndOBJ	= document.getElementById(iargs.Vessels[0].OnDownloadEndOBJ);
			}
		}


		// 获取请求参数
		if(iargs.Sender)
		{
			if(iargs.Sender[0].Method)
			{
				this.method	= iargs.Sender[0].Method;
			}

			if(iargs.Sender[0].URL)
			{
				this.URL	= iargs.Sender[0].URL;
			}

			if(iargs.Sender[0].Sync)
			{
				this.Sync	= iargs.Sender[0].Sync;
			}

			if(iargs.Sender[0].PostData)
			{
				this.PostData	= iargs.Sender[0].PostData;
			}

			if(iargs.Sender[0].Charset)
			{
				this.Charset	= iargs.Sender[0].Charset;
			}

			if(this.URL!=="")
			{
				this.send();
			}
		}

	}

	var Obj = this;
	// 调用事件检测
	this.HttpObj.onreadystatechange = function()
	{
		Ajax.handleStateChange(Obj);
	}
}

// 信息显示
Ajax.prototype.MsgBox = function(strMsg)
{
	var Msg = "<table id=\""+ this.MsgID +"\" style=\"width: 100%;height: 100%;background-color: #ffffff;border: 0px solid #a9a9a9;color: #c0c0c0;font-size:12px;text-align: center;filter:alpha(opacity=100);\">";
	    Msg+= "<tr><td align=\"center\">"+ strMsg + "</td></tr>";
	    Msg+= "</table>";

	return Msg;
}

// UTF 转入 GB (by:Rimifon)
Ajax.prototype.UTFTOGB = function(strBody)
{
	try
	{
		if (strBody==''||strBody==null) { return(''); }
		var Rec=new ActiveXObject("ADODB.RecordSet");
		Rec.Fields.Append("DDD",201,1);
		Rec.Open();
		Rec.AddNew();
		Rec(0).AppendChunk(strBody);
		Rec.Update();
		var HTML=Rec(0).Value;
		Rec.Close();
		delete Rec;
		return(HTML);
	}
	catch (e)
	{
		return('');
	}
}

// 创建XMLHTTP对像
Ajax.prototype.createXMLHttpRequest = function()
{
	if (window.XMLHttpRequest) 
	{ 
		//Mozilla 浏览器
		return new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
        	var msxmls = new Array('Msxml2.XMLHTTP.5.0','Msxml2.XMLHTTP.4.0','Msxml2.XMLHTTP.3.0','Msxml2.XMLHTTP','Microsoft.XMLHTTP');
        	for (var i = 0; i < msxmls.length; i++)
        	{
                	try 
                	{
                        	return new ActiveXObject(msxmls[i]);
                	}catch (e){}

		}
	}
    	return null;
}

// 发送HTTP请求
Ajax.prototype.send = function()
{

	this.MsgID = this.MsgID + ((new Date()).getTime()).toString();

	if(this.HttpObj == null)
	{
		// 对像创建失败时中止运行
		this.ErrorStr = "你的浏览器不支持XMLHttpRequest对象．"
		// 响应到错误事件
		if(this.OnError)
		{
			this.OnError(this.ErrorStr);
		}
		// 响应到错误容器
		if(this.OnErrorOBJ)
		{
			this.OnErrorOBJ.innerHTML = this.MsgBox(this.ErrorStr);
		}
		return;
	}

	if (this.HttpObj !== null)
	{
		if(this.URL.indexOf("?") != -1)
		{
			this.URL = this.URL + "&t=" + new Date().getTime();
		}
		else
		{
			this.URL = this.URL + "?t=" + new Date().getTime();
		}

		this.HttpObj.open(this.method, this.URL, this.Sync);
		if(this.HttpObj.overrideMimeType)
		{
			this.HttpObj.overrideMimeType("text/html;charset=" + this.Charset + ";");
		}
		if(this.method.toLocaleUpperCase() == "GET")
		{
			this.HttpObj.send(null);
		}
		else if(this.method.toLocaleUpperCase() == "POST")
		{
			this.HttpObj.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			this.HttpObj.send(this.PostData);
		}
		else
		{
			this.ErrorStr = "错误的[method]命令．"
			// 响应到错误事件
			if(this.OnError)
			{
				this.OnError(this.ErrorStr);
			}
			// 响应到错误容器
			if(this.OnErrorOBJ)
			{
				this.OnErrorOBJ.style.display = "block";
				this.OnErrorOBJ.innerHTML = this.MsgBox(this.ErrorStr);
			}
			return;
		}

		var StateStr = this.GetState(this.HttpObj.readyState);

		// 响应到状态事件
		if(this.OnState)
		{
			this.OnState(StateStr);
		}
		// 响应到状态容器
		if(this.OnStateOBJ)
		{
			this.OnStateOBJ.style.display = "block";
			this.OnStateOBJ.innerHTML = this.MsgBox(StateStr);
		}

		if (this.HttpObj.readyState == 4)
		{
			// 判断对象状态
					if (this.HttpObj.status == 200) 
					{ 
				if(this.IsIE==true)
				{
					this.RetData = this.UTFTOGB(this.HttpObj.responseBody);
				}
				else
				{
					this.RetData = this.HttpObj.responseText;
				}
				// 响应到DownloadEnd事件
				if(this.OnDownloadEnd)
				{
					this.OnDownloadEnd(this.RetData);
				}
				// 响应到DownloadEnd容器
				if(this.OnDownloadEndOBJ)
				{

					this.OnErrorOBJ.style.display = "none";
					this.OnStateOBJ.style.display = "none";
					this.OnDownloadEndOBJ.style.display = "block";
					this.OnDownloadEndOBJ.innerHTML = Obj.RetData;
				}
							return;
					} 
			else 
			{ 
				this.ErrorStr = "您所请求的页面有异常．"
				// 响应到错误事件
				if(this.OnError)
				{
					this.OnError(this.ErrorStr);
				}
				// 响应到错误容器
				if(this.OnErrorOBJ)
				{
					this.OnErrorOBJ.style.display = "block";
					this.OnErrorOBJ.innerHTML = Obj.MsgBox(Obj.ErrorStr);
				}
				return;
			}
		}

	}

}

// 取得状态
Ajax.prototype.GetState = function(State)
{
	var StateValue = null;
	switch (State)
	{
   		case 0:
		StateValue = "未初始化...";
		break;

   		case 1:
		StateValue = "开始读取数据...";
		break;

   		case 2:
		StateValue = "已开始读取数据...";
		break;

   		case 3:
		StateValue = "读取数据中...";
		break;

   		case 4:
		StateValue = "读取完成...";
		break;

   		default: 
		StateValue = "未初始化...";
		break;
	}
	return (StateValue);
}

// 事件检测
Ajax.handleStateChange = function(Obj)
{
	var StateStr = Obj.GetState(Obj.HttpObj.readyState);
	// 响应到状态事件
	if(Obj.OnState)
	{
		Obj.OnState(StateStr);
	}
	// 响应到状态容器
	if(Obj.OnStateOBJ)
	{
		Obj.OnStateOBJ.style.display = "block";
		Obj.OnStateOBJ.innerHTML = Obj.MsgBox(StateStr);
	}

	if (Obj.HttpObj.readyState == 4)
	{
		// 判断对象状态
            	if (Obj.HttpObj.status == 200) 
                { 
			if(Obj.IsIE==true)
			{
				Obj.RetData = Obj.UTFTOGB(Obj.HttpObj.responseBody);
			}
			else
			{
				Obj.RetData = Obj.HttpObj.responseText;
			}
			// 响应到DownloadEnd事件
			if(Obj.OnDownloadEnd)
			{
				Obj.OnDownloadEnd(Obj.RetData);
			}
			// 响应到DownloadEnd容器
			if(Obj.OnDownloadEndOBJ)
			{

				Obj.OnErrorOBJ.style.display = "none";
				Obj.OnStateOBJ.style.display = "none";
				Obj.OnDownloadEndOBJ.style.display = "block";
				Obj.OnDownloadEndOBJ.innerHTML = Obj.RetData;
			}
                        return;
                } 
		else 
		{ 
			Obj.ErrorStr = "您所请求的页面有异常．"
			// 响应到错误事件
			if(Obj.OnError)
			{
				Obj.OnError(Obj.ErrorStr);
			}
			// 响应到错误容器
			if(Obj.OnErrorOBJ)
			{
				Obj.OnErrorOBJ.style.display = "block";
				Obj.OnErrorOBJ.innerHTML = Obj.MsgBox(Obj.ErrorStr);
			}
			return;
		}
	}
}
//-->