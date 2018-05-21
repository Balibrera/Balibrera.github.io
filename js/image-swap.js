var vBanners = new Array();
vBanners[0] = 'pages-header-1.jpg';
vBanners[1] = 'pages-header-2.jpg';
/* RETURNS BANNER TO BE SHOWN IN WEBPAGE */
function showBanner(vList){
	var currentIndx = 0;
	var records_num = vList.length;
	currentIndx = (Math.round(Math.random()*records_num))-1;
	if(currentIndx>=0){
	return vList[currentIndx];
	}else{
	currentIndx = currentIndx+1;
	return vList[currentIndx];
	}
}
