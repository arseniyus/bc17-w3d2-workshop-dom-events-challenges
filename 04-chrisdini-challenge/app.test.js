// __tests__/chrisdini.test.js
const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

describe("Chrisdini Challenge", () => {
	let dom;
	let document;
	let window;

	beforeAll(() => {
		const html = fs.readFileSync(
			path.resolve(__dirname, "../04-chrisdini-challenge/index.html"),
			"utf8",
		);
		dom = new JSDOM(html, { runScripts: "outside-only" });
		document = dom.window.document;
		window = dom.window;

		// Simulate loading the script
		const scriptContent = fs.readFileSync(
			path.resolve(__dirname, "../04-chrisdini-challenge/app.js"),
			"utf8",
		);
		const scriptElement = document.createElement("script");
		scriptElement.textContent = scriptContent;
		document.body.appendChild(scriptElement);

		// Execute the script in the JSDOM environment
		window.eval(scriptContent);
	});

	const testOpacityChange = (enterEvent, leaveEvent) => {
		const chrisImage = document.getElementById("chrisImage");

		// Simulate enter event
		const enterEventInstance = new window.Event(enterEvent, { bubbles: true });
		chrisImage.dispatchEvent(enterEventInstance);
		expect(chrisImage.style.opacity).toBe("0");

		// Simulate leave event
		const leaveEventInstance = new window.Event(leaveEvent, { bubbles: true });
		chrisImage.dispatchEvent(leaveEventInstance);
		expect(chrisImage.style.opacity).toBe("1");
	};

	test("Using mouse events", () => {
		try {
			testOpacityChange("mouseover", "mouseout");
		} catch (e) {
			testOpacityChange("mouseenter", "mouseleave");
		}
	});
});
