//==javascript==//
//=Newstab
function nTab(thisObj,Num)
{
	if(thisObj.className == "active")return;
	var tabObj = thisObj.parentNode.id;
	var cList = document.getElementById(tabObj).getElementsByTagName("li");
	for(i=0; i <cList.length; i++)
	{
		if (i == Num)
		{
			thisObj.className = "active";
			document.getElementById('tab_info').innerHTML=thisObj.innerHTML;
			document.getElementById('Tab_More').innerHTML=thisObj.innerHTML;
			document.getElementById(tabObj+"_Content"+i).style.display = "block";
		}
		else
		{
			cList[i].className = "normal"; 
			document.getElementById(tabObj+"_Content"+i).style.display = "none";
		}
	};
};

//=jQuery=//
$(function() {
	
	//=Dialog
	$('.DialogBtn').click(function(){
		$.dialog({
			drag:false,
			fixed:true,
			lock: true,
			width:'300px',
			padding:'30px 10px',
			opacity:.5,
			effect:'i-right-slide',
			title:'友情提示',
			content:'<span style="color:#ff3300">此功能即将开通，敬请期待！</span><p style="font-size:12px;color:#666;"><span id="my-time" style="color:red;">3</span> 秒后自动关闭！</p>',
			show: function(){
				var index = 3,
				$time = $('#my-time').html(index),
				that = this;
				var interval = setInterval(function(){
				if(--index<1){
					clearInterval(interval);
					that.hide();
				}
					$time.html( index );
				},1000);
			}
		});
	});
	

	//=search
	jQuery.focusblur = function(focusid) {
		var focusblurid = $(focusid);
		var defval = focusblurid.val();
		focusblurid.focus(function(){
			var thisval = $(this).val();
			if(thisval==defval){
				$(this).val("");
			}
		});
		focusblurid.blur(function(){
			var thisval = $(this).val();
			if(thisval==""){
				$(this).val(defval);
			}
		});
	};
	$.focusblur("#q");
	$.focusblur("#bh input.input-text");
	var sDefVal=$("#q").val();
	$(".header .button").click(function(){
		var sThisval=$("#q").val();
		if(sThisval==sDefVal){
			alert("请输入您要搜索的关键字！");
			$("#q").focus();
			return false;
		}
	});
	
	//menu
	$('.menuer li').hover(function(){
		$(this).addClass("active");
		$(this).find(".subnav").stop(true,true).slideDown(200).show();
	},function(){
		$(this).removeClass("active");
		$(this).find(".subnav").stop(true,true).slideUp(50);
	});
	
	//phover
	$('.phover a').each(function(){
		$(this).hover(function(){
			$(this).find("em").stop(true,true).animate({top:0},300);
			$(this).find("table").stop(true,true).animate({top:0},300);
		},function(){
			$(this).find("em").stop(true,true).animate({
				top:$(this).height()
			} , {
				duration:300,
				complete:function(){
					$(this).css('top', -$(this).parent('a').height())
				}
			});
			$(this).find("table").stop(true,true).animate({
				top:$(this).height()
			} , {
				duration:300,
				complete:function(){
					$(this).css('top', -$(this).parent('a').height())
				}
			});
		});
	});
	
	//relation
	var isListLi=$('.relation ul:eq(0) li').length;
	if( isListLi == 0){
		$('.relation ul:eq(1)').show();
	}
	
	//scrollTab
	var tab_index = 0;  
	$(".tab_title ul li").hover(function(){
		tab_index = $(".tab_title ul li").index(this);
		$(this).addClass("selected").siblings().removeClass("selected");
		$(".tab_content .tab_div").eq(tab_index).show().siblings().hide();
	});
	var tab_i = 9;  //定义每个面板显示8个菜单
	var tab_len = $(".u .scrol li").length;  //获得LI元素的个数
	var tab_page = 1;
	var tab_maxpage = Math.ceil(tab_len/tab_i);
	var tab_scrollWidth = $(".u").width();
	var tab_tipBox = "<div id='tab_tip'>已经到最后一个面板了</div>";
	$("#tab_more").append(tab_tipBox);
	$(".tab_right").click(function(e){
		if(!$(".u .scrol").is(":animated")){
			if(tab_page == tab_maxpage ){
				$(".u .scrol").stop();
				$("#tab_tip").css({
				"top": (e.pageY + 20) +"px",
				"left": (e.pageX + 20) +"px",
				"opacity": "0.9"
			}).stop(true,false).fadeIn(800).fadeOut(800);
			}else{
				$(".u .scrol").animate({left : "-=" + tab_scrollWidth +"px"},1000);
				tab_page++;
			}
		}
	});
	$(".tab_left").click(function(){
		if(!$(".u .scrol").is(":animated")){
			if(tab_page == 1){
				$(".u .scrol").stop();
			}else{
				$(".u .scrol").animate({left : "+=" + tab_scrollWidth +"px"},1000);
				tab_page--;
			}
		}
	});
	
	//zhuanti
	$('.list_zt_pic a').hover(function(){
		$(this).find('table').stop(true,true).animate({top:"0"},200);
	},function(){
		$(this).find('table').stop(true,true).animate({top:-$(this).height()},400);
	});
	
	//table_style
	$('table.table_style tr:first').addClass('first')
	$('table.table_style tr:odd').addClass('odd');
	$('table.table_style tr:even').addClass('even');
	$('table.table_style tr').not($('table.table_style tr:first')).hover(function(){
		$(this).addClass('trhover');
	},function(){
		$(this).removeClass('trhover');
	});

	//ctable
	$('table.ctable tr:first').addClass('first')
	$('table.ctable tr:odd').addClass('odd');
	$('table.ctable tr:even').addClass('even');
	$('table.ctable tr').not($('table.ctable tr.cnot')).hover(function(){
		$(this).toggleClass('trhover');
	});
	
});//jQueryEnd