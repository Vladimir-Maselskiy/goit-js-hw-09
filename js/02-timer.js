import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const flatpickr = require("flatpickr");

console.log(Notiflix);

const refs = {
	datePiker: document.querySelector("input#datetime-picker"),
	buttonStart: document.querySelector("button[data-start]"),
	days: document.querySelector("span[data-days]"),
	hours: document.querySelector("span[data-hours]"),
	minutes: document.querySelector("span[data-minutes]"),
	seconds: document.querySelector("span[data-seconds]"),
};

refs.buttonStart.setAttribute("disabled", "disabled");

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		checkInputDate();
	},
};
let calendar = flatpickr.default(refs.datePiker, options);

function startDateCounter() {
	setInterval(countTime, 1000);
	refs.buttonStart.setAttribute("disabled", "disabled");
	refs.datePiker.setAttribute("disabled", "disabled");
}

function countTime() {
	const userDate = calendar.selectedDates[0].getTime();
	const currentDate = Date.now();
	const timeDif = userDate - currentDate;
	const { days, hours, minutes, seconds } = convertMs(timeDif);
	refs.days.textContent = days;
	refs.hours.textContent = hours;
	refs.minutes.textContent = minutes;
	refs.seconds.textContent = seconds;
}

function checkInputDate() {
	if (!refs.buttonStart.hasAttribute("disabled")) {
		refs.buttonStart.setAttribute("disabled", "disabled");
	}
	const currentDate = Date.now();
	const userDate = calendar.selectedDates[0].getTime();
	if (userDate > currentDate) {
		refs.buttonStart.removeAttribute("disabled");
		refs.buttonStart.addEventListener("click", startDateCounter);
		return;
	}

	Notiflix.Notify.failure("Please choose s date in the future");
}

function convertMs(ms) {
	// Number of milliseconds per unit of time
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	// Remaining days
	const days = Math.floor(ms / day);
	// Remaining hours
	const hours = Math.floor((ms % day) / hour);
	// Remaining minutes
	const minutes = Math.floor(((ms % day) % hour) / minute);
	// Remaining seconds
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);
	const dataObject = { days, hours, minutes, seconds };
	return dataObject;
}
