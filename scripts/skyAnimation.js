var noOfHours = 24;
var moveAngle = 5;
var moveSpeed = 200, starMoveSpeed = 2000;
var coorIdx = 0, nextCoorIdx = 0;

var starsCoorX = [35, 40, 45, 50, 55, 60, 65, 70, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 15, 20, 25, 30];
var starsCoorY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var sunCoorX = [0, 0, 0, 57, 57, 57, 85, 130, 185, 256, 346, 448, 535, 599, 662, 727, 779, 830, 872, 914, 952, 984, 984, 984];
var sunCoorY = [0, 0, 0, 442, 442, 442, 370, 305, 229, 160, 102, 65, 51, 60, 72, 97, 125, 158, 197, 241, 286, 341, 341, 341];
var moonCoorX = [525, 618, 713, 797, 871, 932, 999, 999, 999, 0, 0, 0, 0, 0, 0, 0, 39, 39, 39, 92, 158, 238, 328, 434];
var moonCoorY = [36, 49, 83, 130, 198, 271, 403, 403, 403, 0, 0, 0, 0, 0, 0, 0, 420, 420, 420, 309, 219, 143, 85, 49];

var sunFadeAmount = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
var moonFadeAmount = [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1];
var nightSkyFadeAmount = [1, 1, 1, 0.8, 0.6, 0.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0.4, 0.6, 0.8, 1, 1];
var starsFadeAmount = [1, 1, 1, 0.8, 0.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 0.4, 0.6, 0.8, 1, 1];
var dawnFadeAmount = [0, 0, 0, 0, 0, 0.4, 0.7, 1, 0.7, 0.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var duskFadeAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.4, 0.8, 0.4, 0, 0, 0];
var backgroundFadeAmount = [0, 0, 0, 0.1, 0.3, 0.5, 0.7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.7, 0.5, 0.2, 0, 0];
var midgroundFadeAmount = [0, 0, 0, 0, 0.1, 0.3, 0.5, 0.7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.7, 0.5, 0.3, 0, 0, 0];
var foregroundFadeAmount = [0, 0, 0, 0, 0, 0.1, 0.3, 0.5, 0.7, 1, 1, 1, 1, 1, 1, 1, 1, 0.7, 0.5, 0.3, 0, 0, 0, 0];

var bezier_params = 0;
var moveSkyObjects = function () {
	//get coordinates for sky objects out of current hour
	if (curHour == 0) {
		coorIdx = 23;
		nextCoorIdx = curHour;
	} else {
		coorIdx = curHour - 1;
		nextCoorIdx = curHour;
	}

	bezier_params = {
		start: { x: sunCoorX[coorIdx], y: sunCoorY[coorIdx], angle: -moveAngle, length: 0.5 },
		end: { x: sunCoorX[nextCoorIdx], y: sunCoorY[nextCoorIdx], angle: moveAngle, length: 0.5 }
	};
	$("#sun").animate({ path: new $.path.bezier(bezier_params) }, { duration: moveSpeed, queue: false });

	bezier_params = {
		start: { x: moonCoorX[coorIdx], y: moonCoorY[coorIdx], angle: -moveAngle, length: 0.5 },
		end: { x: moonCoorX[nextCoorIdx], y: moonCoorY[nextCoorIdx], angle: moveAngle, length: 0.5 }
	};
	$("#moon").animate({ path: new $.path.bezier(bezier_params) }, { duration: moveSpeed, queue: false });

	bezier_params = {
		start: { x: starsCoorX[coorIdx], y: starsCoorY[coorIdx], angle: 0, length: 1 },
		end: { x: starsCoorX[nextCoorIdx], y: starsCoorY[nextCoorIdx], angle: 0, length: 1 }
	};
	$("#stars").animate({ left: starsCoorX[coorIdx] }, { duration: moveSpeed, queue: false });

	//handle lightening up and darkening sky
	$("#sun").fadeTo({ duration: 'slow', queue: false }, sunFadeAmount[curHour]);
	$("#moon").fadeTo({ duration: 'slow', queue: false }, moonFadeAmount[curHour]);
	$("#stars").fadeTo({ duration: 'slow', queue: false }, starsFadeAmount[curHour]);
	$(".sky_night").fadeTo({ duration: 'slow', queue: false }, nightSkyFadeAmount[curHour]);
	$(".sky_dawn").fadeTo({ duration: 'slow', queue: false }, dawnFadeAmount[curHour]);
	$(".sky_dusk").fadeTo({ duration: 'slow', queue: false }, duskFadeAmount[curHour]);
	$(".foreground_day").fadeTo({ duration: 'slow', queue: false }, foregroundFadeAmount[curHour]);
	$(".midground_day").fadeTo({ duration: 'slow', queue: false }, midgroundFadeAmount[curHour]);
	$(".background_day").fadeTo({ duration: 'slow', queue: false }, backgroundFadeAmount[curHour]);
	$(".blades_day").fadeTo({ duration: 'slow', queue: false }, foregroundFadeAmount[curHour]);
}
