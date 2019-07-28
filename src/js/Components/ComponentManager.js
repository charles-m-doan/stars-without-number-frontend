import cover from "../../images/cover.jpg";
import Html from "../Utils/HTMLWrapper";
import Api from "../Utils/Api";

export default class ComponentManager {
	constructor() {
		this.skeletonHasBeenRendered = false;
		this.blockTypes = [
			"homeBlock",
			"allSheetsBlock",
			"singleSheetBlock",
			"newSheetBlock"
		];
	}

	getAppContext() {
		return Html().select("#app");
	}

	renderPageSkeleton() {
		if (this.skeletonHasBeenRendered == false) {
			this.renderWrapper();
			this.renderHeader();
			this.renderEmptyMain();
			this.renderFooter();
			this.skeletonHasBeenRendered = true;
		} else {
			// console.log("Page Skeleton has already been rendered!");
		}
	}

	renderWrapper() {
		const app = Html().select("#app");
		const wrapper = Html()
			.create("div")
			.addClass("wrapper");
		app.addChild(wrapper);
	}

	renderHeader() {
		const wrapper = Html().select(".wrapper");

		const header = Html()
			.create("header")
			.addClass("header");
		wrapper.addChild(header);

		const logo = Html()
			.create("div")
			.addClass("logo");

		header.addChild(logo);

		const logoTitle = Html()
			.create("h1")
			.addClass("logo__title")
			.text("Stars Without Number");
		const logoSubtitle = Html()
			.create("h3")
			.addClass("logo__subtitle")
			.text("Character Generator");

		logo.addChild(logoTitle);
		logo.addChild(logoSubtitle);

		const nav = Html()
			.create("nav")
			.addClass("header__nav");

		header.addChild(nav);

		const navList = Html()
			.create("ul")
			.addClass("nav-list");

		nav.addChild(navList);

		const itemHome = Html()
			.create("li")
			.addClass("nav-list__item")
			.addChild(
				Html()
					.create("a")
					.addAttribute("href", "homeBlock")
					.text("Home")
					.click(event => {
						event.preventDefault();
						this.renderContentBlock("homeBlock", "");
					})
			);

		const itemNewSheet = Html()
			.create("li")
			.addClass("nav-list__item")
			.addChild(
				Html()
					.create("a")
					.addAttribute("href", "newSheetBlock")
					.text("New Sheet")
					.click(event => {
						event.preventDefault();
						this.renderContentBlock("newSheetBlock", "");
					})
			);

		const itemSeeAll = Html()
			.create("li")
			.addClass("nav-list__item")
			.addChild(
				Html()
					.create("a")
					.addAttribute("href", "allSheetsBlock")
					.text("See All")
					.click(event => {
						event.preventDefault();
						this.renderContentBlock("allSheetsBlock", "");
					})
			);

		navList.addChild(itemHome);
		navList.addChild(itemNewSheet);
		navList.addChild(itemSeeAll);
	}

	renderEmptyMain() {
		const wrapper = Html().select(".wrapper");
		const main = Html()
			.create("main")
			.addClass("main");
		wrapper.addChild(main);
	}

	renderFooter() {
		const wrapper = Html().select(".wrapper");
		const footer = Html()
			.create("footer")
			.addClass("footer");
		const footerContents = Html()
			.create("h1")
			.html("&copy; 2019 Nick Hergatt and Charles Doan");

		footer.addChild(footerContents);
		wrapper.addChild(footer);
	}

	// CONTENT BLOCKS ==========================================================================

	renderContentBlock(blockType, requestedData) {
		if (this.skeletonHasBeenRendered == false) {
			this.renderPageSkeleton();
		}
		if (blockType === undefined) {
			blockType = "homeBlock";
		}
		// console.log(
		// 	"Rendering content block: " + blockType + " using data: " + requestedData
		// );

		// Branch Based on Block Type
		if (blockType == "homeBlock") {
			this.renderContentBlockHome();
		} else if (blockType == "allSheetsBlock") {
			this.renderContentBlockAllSheets();
		} else if (blockType == "newSheetBlock") {
			this.renderContentBlockNewSheet();
		} else if (blockType == "singleSheetBlock") {
			this.renderContentBlockSingleSheet(requestedData);
		} else {
			// this.renderContentBlockHome();
		}
	}

	// =========================================================================================

	// SINGLE SHEET BLOCK +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	renderContentBlockSingleSheet(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "characters";
		const resourceURL = rootDataURL + "/" + requestedData;
		console.log("Block URL: " + resourceURL);

		const main = Html().select(".main");
		const content = this.generateContentSingleSheet(resourceURL);
		main.replace(content);
	}

	generateContentSingleSheet(resourceURL) {
		const mainContent = Html()
			.create("div")
			.addClass("main-content");
		const mainContentTitle = Html()
			.create("h2")
			.addClass("main-content__title")
			.text("Viewing Character Sheet");

		const rawJSONParagraph = this.generateRawCharacterDataParagraph(
			resourceURL
		);

		mainContent.addChild(mainContentTitle);
		mainContent.addChild(rawJSONParagraph);
		return mainContent;
	}

	generateRawCharacterDataParagraph(resourceURL) {
		const rawJSONParagraph = Html().create("p");

		Api().getRequest(resourceURL, character => {
			rawJSONParagraph.html(JSON.stringify(character));
		});
		return rawJSONParagraph;
	}

	// HOME BLOCK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	renderContentBlockHome(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "home";
		const resourceURL = rootDataURL + "/" + requestedData;
		console.log("Block URL: " + rootDataURL);

		const main = Html().select(".main");
		const content = this.generateContentHome(resourceURL);
		main.replace(content);
	}

	generateContentHome(resourceURL) {
		const mainContent = Html()
			.create("div")
			.addClass("main-content");
		const mainContentTitle = Html()
			.create("h2")
			.addClass("main-content__title")
			.text("Welcome to Our Character Generator!");

		const coverFigure = Html()
			.create("figure")
			.addClass("cover-image")
			.addChild(
				Html()
					.create("img")
					.addAttribute("src", cover)
			);

		mainContent.addChild(mainContentTitle);
		mainContent.addChild(coverFigure);
		return mainContent;
	}

	// ALL SHEETS BLOCK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	renderContentBlockAllSheets(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "characters";
		const resourceURL = rootDataURL + "/" + requestedData;
		console.log("Block URL: " + rootDataURL);

		const main = Html().select(".main");
		const content = this.generateContentAllSheets(resourceURL);
		main.replace(content);
	}

	generateContentAllSheets(resourceURL) {
		const mainContent = Html()
			.create("div")
			.addClass("main-content");
		const mainContentTitle = Html()
			.create("h2")
			.addClass("main-content__title")
			.text("All Character Sheets");

		const characterCardGallery = this.generateCharacterCardGallery(resourceURL);

		mainContent.addChild(mainContentTitle);
		mainContent.addChild(characterCardGallery);
		return mainContent;
	}

	generateCharacterCardGallery(resourceURL) {
		const cardGallery = Html()
			.create("section")
			.addClass("character-card-gallery");

		Api().getRequest(resourceURL, characterCollection => {
			characterCollection.forEach(character => {
				const characterCard = Html()
					.create("article")
					.addClass("character-card")
					.click(event => {
						event.preventDefault();
						this.renderContentBlock("singleSheetBlock", character.id);
					});

				const characterName = Html()
					.create("h2")
					.addClass("character__name")
					.text(character.name);
				characterCard.addChild(characterName);

				const description = Html()
					.create("div")
					.addClass("character__description");
				characterCard.addChild(description);

				const levelLabel = Html()
					.create("h4")
					.addClass("character__description__level-label")
					.text("Level");
				description.addChild(levelLabel);

				const levelValue = Html()
					.create("h4")
					.addClass("character__description__level")
					.text(character.level);
				description.addChild(levelValue);

				const characterClass = Html()
					.create("h3")
					.addClass("character__description__class")
					.text(character.career.typeName);
				description.addChild(characterClass);

				cardGallery.addChild(characterCard);
			});
		});

		// for (let i = 0; i < 20; i++) {
		// 	const characterCard = Html()
		// 		.create("article")
		// 		.addClass("character-card");

		// 	const characterName = Html()
		// 		.create("h2")
		// 		.addClass("character__name")
		// 		.text("Character " + (i + 1));
		// 	characterCard.addChild(characterName);

		// 	const description = Html()
		// 		.create("div")
		// 		.addClass("character__description");
		// 	characterCard.addChild(description);

		// 	const levelLabel = Html()
		// 		.create("h4")
		// 		.text("Level");
		// 	description.addChild(levelLabel);

		// 	const levelValue = Html()
		// 		.create("h4")
		// 		.addClass("character__description__level")
		// 		.text(1 + Math.floor(Math.random() * 20));
		// 	description.addChild(levelValue);

		// 	const characterClass = Html()
		// 		.create("h3")
		// 		.addClass("character__description__class")
		// 		.text("Class " + i);
		// 	description.addChild(characterClass);

		// 	cardGallery.addChild(characterCard);
		// }

		return cardGallery;
	}

	// NEW SHEET BLOCK +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	renderContentBlockNewSheet(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "characters/new";
		const resourceURL = rootDataURL + "/" + requestedData;
		console.log("Block URL: " + rootDataURL);

		const main = Html().select(".main");
		const content = this.generateContentNewSheet(resourceURL);
		main.replace(content);
	}

	generateContentNewSheet(resourceURL) {
		const mainContent = Html()
			.create("div")
			.addClass("main-content");
		const mainContentTitle = Html()
			.create("h2")
			.addClass("main-content__title")
			.text("New Character Sheet");

		mainContent.addChild(mainContentTitle);
		return mainContent;
	}

	// =========================================================================================
	// =========================================================================================
}
