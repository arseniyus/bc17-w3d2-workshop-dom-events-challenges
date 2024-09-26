// __tests__/app.test.js
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

describe("Lightbulb Control", () => {
	let dom;
	let document;
	let window;

	beforeAll(() => {
		const html = fs.readFileSync(
			path.resolve(__dirname, "../01-light-bulb-challenge/index.html"),
			"utf8",
		);
		dom = new JSDOM(html, { runScripts: "outside-only" });
		document = dom.window.document;
		window = dom.window;

		// Simulate loading the script
		const scriptContent = fs.readFileSync(
			path.resolve(__dirname, "../01-light-bulb-challenge/app.js"),
			"utf8",
		);
		const scriptElement = document.createElement("script");
		scriptElement.textContent = scriptContent;
		document.body.appendChild(scriptElement);

		// Execute the script in the JSDOM environment
		window.eval(scriptContent);
	});

	test('should turn on the lightbulb when "Turn On" button is clicked', () => {
		const bulb = document.getElementById("lightbulb");
		const turnOn = document.getElementById("turnBulbOn");

		turnOn.click();
		expect(bulb.src).toContain("light-bulb-on.png");
	});

	test('should turn off the lightbulb when "Turn Off" button is clicked', () => {
		const bulb = document.getElementById("lightbulb");
		const turnOff = document.getElementById("turnBulbOff");

		turnOff.click();
		expect(bulb.src).toContain("light-bulb-off.png");
	});
});
