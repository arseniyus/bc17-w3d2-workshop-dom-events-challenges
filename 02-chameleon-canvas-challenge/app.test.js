const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

describe("Color Picker Functionality", () => {
	let dom;
	let document;
	let window;

	beforeAll(() => {
		const html = fs.readFileSync(
			path.resolve(__dirname, "../02-chameleon-canvas-challenge/index.html"),
			"utf8",
		);
		dom = new JSDOM(html, { runScripts: "outside-only" });
		document = dom.window.document;
		window = dom.window;

		// Simulate loading the script
		const scriptContent = fs.readFileSync(
			path.resolve(__dirname, "../02-chameleon-canvas-challenge/app.js"),
			"utf8",
		);
		const scriptElement = document.createElement("script");
		scriptElement.textContent = scriptContent;
		document.body.appendChild(scriptElement);

		// Execute the script in the JSDOM environment
		window.eval(scriptContent);
	});

	test("should change the canvas background color when a color is selected", () => {
		const picker = document.getElementById("colorPicker");
		const canvas = document.getElementById("canvas");

		const colors = [
			{ hex: "#ff0000", rgb: "rgb(255, 0, 0)" }, // Red
			{ hex: "#00ff00", rgb: "rgb(0, 255, 0)" }, // Green
			{ hex: "#0000ff", rgb: "rgb(0, 0, 255)" }, // Blue
			{ hex: "#ffff00", rgb: "rgb(255, 255, 0)" }, // Yellow
			{ hex: "#ff00ff", rgb: "rgb(255, 0, 255)" }, // Magenta
			{ hex: "#00ffff", rgb: "rgb(0, 255, 255)" }, // Cyan
		];

		for (const color of colors) {
			// Simulate selecting a color
			picker.value = color.hex;
			const event = new window.Event("input", { bubbles: true });
			picker.dispatchEvent(event);

			expect(canvas.style.backgroundColor).toBe(color.rgb);
		}
	});

	test("should have an input event listener on the color picker", () => {
		const picker = document.getElementById("colorPicker");
		const canvas = document.getElementById("canvas");

		// Simulate selecting a color to check if the event listener is working
		picker.value = "#ff0000"; // Red color
		const event = new window.Event("input", { bubbles: true });
		picker.dispatchEvent(event);

		expect(canvas.style.backgroundColor).toBe("rgb(255, 0, 0)");
	});
});
