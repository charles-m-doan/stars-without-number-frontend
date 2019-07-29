import ComponentManager from "./Components/ComponentManager";

const blockTypes = [
	"unknownBlock",
	"homeBlock",
	"allSheetsBlock",
	"singleSheetBlock",
	"newSheetBlock"
];

const componentManager = new ComponentManager();
componentManager.renderContentBlock("homeBlock", "");
