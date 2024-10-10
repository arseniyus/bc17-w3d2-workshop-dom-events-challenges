// __tests__/starSlider.test.js
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

describe("Star Slider Functionality", () => {
	let dom;
	let document;
	let window;

	beforeAll(() => {
		const html = fs.readFileSync(
			path.resolve(__dirname, "../03-star-slider-challenge/index.html"),
			"utf8",
		);
		dom = new JSDOM(html, { runScripts: "outside-only" });
		document = dom.window.document;
		window = dom.window;

		// Simulate loading the script
		const scriptContent = fs.readFileSync(
			path.resolve(__dirname, "../03-star-slider-challenge/app.js"),
			"utf8",
		);
		const scriptElement = document.createElement("script");
		scriptElement.textContent = scriptContent;
		document.body.appendChild(scriptElement);

		// Execute the script in the JSDOM environment
		window.eval(scriptContent);
	});

	test("should create the correct number of star icons based on the slider value", () => {
		const slider = document.getElementById("starSlider");
		const container = document.getElementById("stars");

		const values = [1, 2, 3, 4, 5];

		for (const value of values) {
			// Simulate changing the slider value
			slider.value = value;
			const event = new window.Event("input", { bubbles: true });
			slider.dispatchEvent(event);

			// Check the number of star icons
			const stars = container.querySelectorAll(".star-icon");
			expect(stars.length).toBe(value);
		}
	});

	test("should have an input event listener on the slider", () => {
		const slider = document.getElementById("starSlider");
		const container = document.getElementById("stars");

		// Simulate changing the slider value to check if the event listener is working
		slider.value = 3;
		const event = new window.Event("input", { bubbles: true });
		slider.dispatchEvent(event);

		// Check the number of star icons
		const stars = container.querySelectorAll(".star-icon");
		expect(stars.length).toBe(3);
	});
});
