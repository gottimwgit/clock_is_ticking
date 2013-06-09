/* pre set available z-indexes allow to set cloud 'infront' of ceratin objects  less randomly */
var availableZIndexes = [29, 48, 98, 150];
var maxTopMargin = 300; //dont display clouds lower than houses
var maxCloudSpeed = 100;
var minCloudSpeed = 10;
var maxCloudImgIndex = 7;  //count of actual .pngs - that allows to easily add more clouds imgs 

var cloud_array = [];
var cloud_speed_array = []; //remember to shift() first elem on cloud removal

function addCloudToCanvas() {
	//create div 
	//add random img
	//set z-index
	//set top margin offset
	//set movement speed

	var classes = "show_elem frame cloud_div";
	var cloud_img_number = getRandomImageIndex();
	var rand_zindex = getRandomZIndex();
	var rand_top = getRandomTop();
	cloud_speed_array.push(getRandomSpeed());

	var tag = "<div " +
					"class='" +classes+ "' " +
					"style='z-index:" +rand_zindex+ ";"+
					"top:" + rand_top + "px;" +
					"' " +
				">" +
					"<img class='cloud_img' " +
						"src='imgs/clouds/cloud_night_" + cloud_img_number + ".png' " +
					" //>" +
					"<img class='cloud_img' " +
						"src='imgs/clouds/cloud_day_" + cloud_img_number + ".png' " +
					" //>" +
				"</div>";
	$('#canvas').append(tag);

	cloud_array.push($('.cloud_div').last());
}

function animateClouds() {

}

function getRandomTop() {
	return Math.floor(Math.random() * maxTopMargin);
}

function getRandomZIndex() {

	return availableZIndexes[Math.floor(Math.random() * (availableZIndexes.length))];
}

function getRandomImageIndex() {
	return Math.floor(Math.random() * (maxCloudImgIndex+1));
}

function getRandomSpeed() {
	return (Math.floor(Math.random() * (maxCloudSpeed - minCloudSpeed))) + minCloudSpeed;
}