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
			);

		const itemNewSheet = Html()
			.create("li")
			.addClass("nav-list__item")
			.addChild(
				Html()
					.create("a")
					.addAttribute("href", "newSheetBlock")
					.text("New Sheet")
			);

		const itemSeeAll = Html()
			.create("li")
			.addClass("nav-list__item")
			.addChild(
				Html()
					.create("a")
					.addAttribute("href", "allSheetsBlock")
					.text("See All")
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
		console.log(
			"Rendering content block: " + blockType + " using data: " + requestedData
		);
		// Branch Based on Block Type
		if (blockType == "homeBlock") {
			this.renderContentBlockHome();
		} else if (blockType == "allSheetsBlock") {
			// this.renderContentBlockAllSheets();
		} else if (blockType == "singleSheetBlock") {
			// this.renderContentBlockSingleSheet();
		} else if (blockType == "newSheetBlock") {
			// this.renderContentBlockNewSheet(requestedData);
		} else {
			// this.renderContentBlockHome();
		}
	}

	// =========================================================================================

	// HOME BLOCK

	renderContentBlockHome(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "artists";
		const resourceURL = rootDataURL + "/" + requestedData;

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

		mainContent.addChild(mainContentTitle);
		return mainContent;
	}

	// =========================================================================================
	// =========================================================================================
}
