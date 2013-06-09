var incrementHour = function () {
	curHour++;
	curHour %= 24;
}

var decrementHour = function () {
	curHour--;
	if (curHour < 0) {
		curHour = 23;
	}
}

var incrementMin = function () {
	curMin++;
	if (curMin >= 60) {
		incrementHour();
	}
	curMin %= 60;
}

var decrementMin = function () {
	curMin--;
	if (curMin < 0) {
		curMin = 59;
		decrementHour();
	}
}
