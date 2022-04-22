function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
	start: document.querySelector("button[data-start]"),
	stop: document.querySelector("button[data-stop]"),
	body: document.querySelector("body"),
};

let intervalId = null;

function onStartClick(e) {
	intervalId = setInterval(changeBgColor, 1000);
	refs.start.setAttribute("disabled", "disabled");
}

function onStopClick() {
	if (intervalId) {
		clearInterval(intervalId);
		refs.start.removeAttribute("disabled");
	}
}

function changeBgColor() {
	refs.body.style.backgroundColor = getRandomHexColor();
}

refs.start.addEventListener("click", onStartClick);
refs.stop.addEventListener("click", onStopClick);
console.log(refs);
