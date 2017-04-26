$(function(){
	$("#projector").animate({
			"bottom":"0px"
		},300);
	setTimeout(function(){
		$("#projector-bg").animate({
			"width":"100%",
			"height":"100%"
		},300,function(){
			$("#container").animate({
				"opacity":"1"
			},300);
		});
	},1500);
	
	function totleNum(){
		var numBer=0;
		$("#main div.mainCon div.msgOuter div.msgInner").each(function(){
			if(!($(this).hasClass("active"))){
				numBer++;
			}
			$("#footNumber span.number").html(numBer);
		});
	}
	
	
	$("#topBtn li.addItem").click(function(){
		if($(this).hasClass("close")){
			return false;
		}else if($(this).hasClass("fit")){
			$(this).removeClass("fit").addClass("add");
			$("#topBtn li.takePhoto").addClass("close");
			$("#main div.mainCon div.msgOuter div.msgInner:last-child").removeClass("active");
			totleNum();
		}else{
			$("#topBtn li.takePhoto").removeClass("close");
			$("#main div.leftBtn,#main div.rightBtn").css("opacity","1");
			var frag='<div class="msgInner"><div class="msg lf"><ul><li><label for="">姓&nbsp;&nbsp;&nbsp;&nbsp;名</label><input type="text" /></li><li><label for="">性&nbsp;&nbsp;&nbsp;&nbsp;别</label><select name="" class="gender"><option value="male">男</option><option value="female">女</option></select></li><li><label for="">出生年月</label><input type="date" /></li><li><label for="">身份证号</label><input type="text" /></li><li><label for="">地&nbsp;&nbsp;&nbsp;&nbsp;址</label><input type="text" /></li></ul><div class="saomiao clear"><span class="lf">卡号:</span><input class="lf" type="text" name="" id="" value="" /><button class="lf"></button></div></div><div class="photo lf"><div class="phototop textcenter"><img src="07-TEXT.svg" alt="" /></div><div class="photoImg"><img src="" alt="" /></div></div></div>'
			$("#main div.mainCon div.msgOuter").append(frag);
			$(this).removeClass("add").addClass("fit");
			$("#main div.mainCon div.msgOuter div.msgInner:last-child").addClass("active");
			$("#main div.mainCon div.msgOuter").animate({
				"left":-(($("#main div.mainCon div.msgOuter div.msgInner").length-1)*744)+"px"
			},300,function(){
				$("#main div.rightBtn").addClass("stop");
				$("#main div.leftBtn").removeClass("stop");
			});
		}
	});
	
	$("#main div.leftBtn").click(function(){
		var lefta=parseInt($("#main div.mainCon div.msgOuter").css("left"));
		if(!($(this).hasClass("active"))){
			if(!((lefta)>=0)){
				$(this).addClass("active");
				if(lefta+744>=0){
					$("#main div.leftBtn").addClass("stop");
				}
				$("#main div.rightBtn").removeClass("stop");
				$("#main div.mainCon div.msgOuter").animate({
					"left":lefta+744+"px"
				},300,function(){
					$(this).removeClass("active");
				}.bind(this));
			}
			if($("#topBtn li.addItem").hasClass("fit")){
				$("#topBtn li.addItem").addClass("close");
				$("#topBtn li.takePhoto").addClass("close");
			}else{
				$("#topBtn li.addItem").removeClass("close");
				$("#topBtn li.takePhoto").addClass("close");
			}
		}
		
		
	});
	
	$("#main div.rightBtn").click(function(){
		var righta=parseInt($("#main div.mainCon div.msgOuter").css("left"));
		var rightfu=-righta;
		var lengthdiv=($("#main div.mainCon div.msgOuter div.msgInner").length-1)*744;
		if(!($(this).hasClass("active"))){
			if(rightfu<lengthdiv){
				$(this).addClass("active");
				if((rightfu+744)==lengthdiv){
					$("#main div.rightBtn").addClass("stop");
					$("#topBtn li.addItem").removeClass("close");
					if($("#topBtn li.addItem").hasClass("fit")){
						$("#topBtn li.takePhoto").removeClass("close");
					}else{
						$("#topBtn li.takePhoto").addClass("close");
					}
				}
				$("#main div.leftBtn").removeClass("stop");
				$("#main div.mainCon div.msgOuter").animate({
					"left":righta-744+"px"
				},300,function(){
					$(this).removeClass("active");
				}.bind(this));
			}
		}
		
		
	});
	
	
	$("#topBtn li.delete").click(function(){
		if(!($(this).hasClass("active"))){
			var lengthdiv=$("#main div.mainCon div.msgOuter div.msgInner").length;
			if(lengthdiv>1){
				var left=parseInt($("#main div.mainCon div.msgOuter").css("left"));
				var idx=-Math.ceil(left/744);
				if(idx>0){
					if(idx+1==lengthdiv){
						$("#topBtn li.addItem").removeClass("fit").addClass("add").removeClass("close");
						$("#topBtn li.takePhoto").addClass("close");
					}
					$(this).addClass("active");
					$("#main div.mainCon div.msgOuter").animate({
						"left":left+744+"px"
					},300,function(){
						$("#topBtn li.delete").removeClass("active");
					});
				}
				$($("#main div.mainCon div.msgOuter div.msgInner")[idx]).animate({
					"width":0,
				},300,function(){
					$($("#main div.mainCon div.msgOuter div.msgInner")[idx]).remove();
					totleNum();
					if($("#main div.mainCon div.msgOuter div.msgInner").length==1){
						if($("#main div.mainCon div.msgOuter div.msgInner").hasClass("active")){
							$("#topBtn li.addItem").removeClass("add").addClass("fit").removeClass("close");
							$("#topBtn li.takePhoto").removeClass("close");
						}
						
						$("#main div.leftBtn,#main div.rightBtn").css("opacity","0");
					}else if(left+744==0){
						$("#main div.leftBtn").addClass("stop");
					}
				}.bind(this));
			}else{
				$("#main div.mainCon div.msgOuter div.msgInner input,#main div.mainCon div.msgOuter div.msgInner select").val("");
				$("#main div.mainCon div.msgOuter div.msgInner").addClass("active");
				$("#topBtn li.addItem").addClass("fit").removeClass("add").removeClass("close");
				$("#topBtn li.takePhoto").removeClass("close");
				totleNum();
			}
		}

		
	});
	
});
