import ComponentManager from "./Components/ComponentManager";

const blockTypes = [
	"unknownBlock",
	"homeBlock",
	"allSheetsBlock",
	"singleSheetBlock",
	"newSheetBlock"
];

console.log("Starting App!");
let componentManager = new ComponentManager();
componentManager.renderContentBlock("homeBlock", "");
// componentManager.renderContentBlock("allSheetsBlock", "");
// componentManager.renderContentBlock("singleSheetBlock", "1");
