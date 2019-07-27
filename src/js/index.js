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
componentManager.renderPageSkeleton();
// componentManager.renderContentBlock("homeBlock", "");
