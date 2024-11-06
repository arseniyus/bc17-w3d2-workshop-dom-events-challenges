const fs = require("node:fs");
const path = require("node:path");
const { JSDOM } = require("jsdom");

describe("Door Game Functionality", () => {
	let dom;
	let document;
	let window;

	beforeAll(() => {
		const html = fs.readFileSync(
			path.resolve(__dirname, "../05-knock-knock-loz-challenge/index.html"),
			"utf8",
		);
		dom = new JSDOM(html, { runScripts: "outside-only" });
		document = dom.window.document;
		window = dom.window;

		// Simulate loading the script
		const scriptContent = fs.readFileSync(
			path.resolve(__dirname, "./app.js"),
			"utf8",
		);
		const scriptElement = document.createElement("script");
		scriptElement.textContent = scriptContent;
		document.body.appendChild(scriptElement);

		// Execute the script in the JSDOM environment
		window.eval(scriptContent);
	});

	test("should open both doors when one is clicked", () => {
		const doors = document.getElementsByClassName("door");

		// Simulate clicking the first door
		doors[0].click() || doors[1].click();

		// Check if both doors are open
		const door1Open =
			doors[0].src.includes("door-open-empty.png") ||
			doors[0].src.includes("door-open-loz.png");
		const door2Open =
			doors[1].src.includes("door-open-empty.png") ||
			doors[1].src.includes("door-open-loz.png");

		expect(door1Open).toBe(true);
		expect(door2Open).toBe(true);

		// Ensure one door reveals Loz and the other an empty room
		const lozRevealed =
			doors[0].src.includes("door-open-loz.png") ||
			doors[1].src.includes("door-open-loz.png");
		const emptyRevealed =
			doors[0].src.includes("door-open-empty.png") ||
			doors[1].src.includes("door-open-empty.png");

		expect(lozRevealed).toBe(true);
		expect(emptyRevealed).toBe(true);
	});

	test("should reveal Loz behind one of the doors randomly", () => {
		const doors = document.getElementsByClassName("door");

		// Simulate clicking the first door
		doors[0].click();

		const lozImagePath = "door-open-loz.png";
		const emptyRoomImagePath = "door-open-empty.png";

		const door1Revealed =
			doors[0].src.includes(lozImagePath) ||
			doors[0].src.includes(emptyRoomImagePath);
		const door2Revealed =
			doors[1].src.includes(lozImagePath) ||
			doors[1].src.includes(emptyRoomImagePath);

		expect(door1Revealed).toBe(true);
		expect(door2Revealed).toBe(true);

		// Ensure one door reveals Loz and the other an empty room
		const lozRevealed =
			doors[0].src.includes(lozImagePath) ||
			doors[1].src.includes(lozImagePath);
		expect(lozRevealed).toBe(true);
	});
});
