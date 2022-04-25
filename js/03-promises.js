import Notiflix from "notiflix";

function createPromise(position, delay) {
	const shouldResolve = Math.random() > 0.3;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldResolve) {
				resolve({ position, delay });
			} else {
				reject({ position, delay });
			}
		}, delay);
	});
}

function createPromises(amoumt, delay, step) {
	const localStep = step;
	step += delay;
	let finallyTime = null;
	for (let i = 1; i <= amoumt; i += 1) {
		const promises = [];
		if (i === 1) {
			promises[i - 1] = createPromise(i, delay);
		} else {
			promises[i - 1] = createPromise(i, step);
			finallyTime = step;
			step += localStep;
		}
		promises[i - 1].then(onSuccess, onFailure);
	}

	new Promise((res) => {
		setInterval(() => {
			res();
		}, finallyTime);
	}).then(finallySets);
}

function onSuccess({ position, delay }) {
	Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
	console.log(result);
}

function onFailure({ position, delay }) {
	Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function finallySets() {
	refs.submitButton.removeAttribute("disabled");
}

const refs = {
	delay: document.querySelector("input[name=delay]"),
	step: document.querySelector("input[name=step]"),
	amoumt: document.querySelector("input[name=amount]"),
	submitButton: document.querySelector("button[type=submit]"),
	form: document.querySelector(".form"),
};

refs.submitButton.addEventListener("click", onClick);

function onClick(e) {
	e.preventDefault();

	if (!checkDataOnValid()) {
		return;
	}

	refs.submitButton.setAttribute("disabled", "disabled");
	createPromises(
		Number(refs.amoumt.value),
		Number(refs.delay.value),
		Number(refs.step.value)
	);
}

function checkDataOnValid() {
	if (!(refs.delay.value && refs.step.value && refs.amoumt.value)) {
		console.log("enter valid data");
		return;
	}

	if (refs.delay.value > 0 && refs.step.value > 0 && refs.amoumt.value && 0) {
		console.log("enter valid data");
		return;
	}

	return true;
}
