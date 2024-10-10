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

	test("Using mouseover and mouseout", () => {
		const chrisImage = document.getElementById("chrisImage");

		// Simulate mouseover event
		const mouseOverEvent = new window.Event("mouseover", { bubbles: true });
		chrisImage.dispatchEvent(mouseOverEvent);
		expect(chrisImage.style.opacity).toBe("0");

		// Simulate mouseout event
		const mouseOutEvent = new window.Event("mouseout", { bubbles: true });
		chrisImage.dispatchEvent(mouseOutEvent);
		expect(chrisImage.style.opacity).toBe("1");
	});

	test("Should make Chris disappear on mouseenter and reappear on mouseleave", () => {
		const chrisImage = document.getElementById("chrisImage");

		// Simulate mouseenter event
		const mouseEnterEvent = new window.Event("mouseenter", { bubbles: true });
		chrisImage.dispatchEvent(mouseEnterEvent);
		expect(chrisImage.style.opacity).toBe("0");

		// Simulate mouseleave event
		const mouseLeaveEvent = new window.Event("mouseleave", { bubbles: true });
		chrisImage.dispatchEvent(mouseLeaveEvent);
		expect(chrisImage.style.opacity).toBe("1");
	});
});
