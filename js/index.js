function byId(id){
	return typeof(id)==="string"?document.getElementById(id):id;
}

var index = 0,
    timer = null,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    prev = byId("prev"),
    next = byId("next"),
    menu=byId("menu-content"),
    subMenu=byId("sub-menu"),
    menuItems=menu.getElementsByClassName("menu-item"),
    innerBox = subMenu.getElementsByClassName("inner-box"),
    len = pics.length;

function slideImg(){
	var main = byId("main");
	//If mouse is on the pic, the counter stops, otherwise continue
	main.onmouseover = function(){
		//mouse over clear timer
		if(timer) clearInterval(timer);

	}
	main.onmouseout = function(){
		timer = setInterval(function(){
			index++;
			if (index>=len){
				index=0;
			}
			//change picture
			changeImg()
		}, 3000);

	}
	//automatically set mouse leaving, so the banner can roll without mouse actually move on it first
	main.onmouseout();
	//click the dots to change pics
	for(var d=0;d<len;d++){
		//给所有的Span添加一个ID的属性，值为d,作为当前的索引
		dots[d].id = d;
		dots[d].onclick = function(){
			//change index to span 索引
			index = this.id;
			
			//调用changeImg,实现切换图片
			changeImg()

		}
	}
	//click next button 
	next.onclick =function(){
		index++;
		if(index>=len) index=0;
		changeImg()
	}
	//prev click
	prev.onclick =function(){
		index--;
		if(index<len) index=len-1;
		changeImg();
	}
	//menu
	//遍历主菜单，且绑定事件
	for(var m=0;m<menuItems.length;m++){
		//给每一个menu-item自定义data-index属性，作为索引
		menuItems[m].setAttribute("data-index",m);
		menuItems[m].onmouseover=function(){
			subMenu.className = "sub-menu";
			var idx=this.getAttribute("data-index");
			//遍历所有的子菜单，将每一个都隐藏
			for(var j=0;j<innerBox.length;j++ ){
				innerBox[j].style.display="none";
				menuItems[j].style.background = "none";
			}
			innerBox[idx].style.display='block';
			menuItems[idx].style.background='rgba(0,0,0,0.1)';
		}
	}
		menu.onmouseout = function(){
			subMenu.className = "sub-menu hide";
		}
		subMenu.onmouseover = function(){
			this.className = "sub-menu";
		}
		subMenu.onmouseout = function(){
			this.className = "sub-menu hide";
		}
}
//change picture
function changeImg(){
	//遍历banner下多有的div及dots下所有的span,将div隐藏，将span清除类
	for(var i=0;i<len;i++){
		pics[i].style.display="none";
		dots[i].className="";
	}
	//根据Index索引找到当前div和span,将其显示并设为当前
	pics[index].style.display='block';
	dots[index].className="active";
}


slideImg()

