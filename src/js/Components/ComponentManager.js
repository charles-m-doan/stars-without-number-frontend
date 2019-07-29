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
			this.renderContentBlockHome();
		}
	}

	// =========================================================================================

	// HOME BLOCK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	renderContentBlockHome() {
		const rootDataURL = Api().getRootURL() + "home";
		// console.log("Block URL: " + rootDataURL);

		const main = Html().select(".main");
		const content = this.generateContentHome();
		main.replace(content);
	}

	generateContentHome() {
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
		mainContent.addChild(
			Html()
				.create("h2")
				.text("(a work in progress)")
		);
		mainContent.addChild(coverFigure);
		return mainContent;
	}

	// SINGLE SHEET BLOCK +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	renderContentBlockSingleSheet(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "characters";
		const resourceURL = rootDataURL + "/" + requestedData;
		// console.log("Block URL: " + resourceURL);

		const main = Html().select(".main");

		Api().getRequest(resourceURL, character => {
			const content = this.generateContentSingleSheet(character);
			main.replace(content);
		});
	}

	generateContentSingleSheet(character) {
		const contentEditable = false;
		const tbd = "-";

		const mainContent = Html()
			.create("div")
			.addClass("main-content");
		const mainContentTitle = Html()
			.create("h2")
			.addClass("main-content__title")
			.text("Stars Without Number Character Sheet");
		mainContent.addChild(mainContentTitle);

		const sheet = Html()
			.create("article")
			.addClass("sheet");
		mainContent.addChild(sheet);

		const sheetHeader = Html()
			.create("header")
			.addClass("sheet__section")
			.addClass("sheet__header");
		sheet.addChild(sheetHeader);

		const sheetHeaderName = Html()
			.create("h2")
			.addClass("sheet__header__name")
			.text(character.name);
		sheetHeader.addChild(sheetHeaderName);

		const sheetHeaderClass = Html()
			.create("h2")
			.addClass("sheet__header__class")
			.text(character.career.typeName);
		sheetHeader.addChild(sheetHeaderClass);

		// CREATE COLUMNS ------------------------------
		const leftColumn = Html()
			.create("div")
			.addClass("sheet__column");
		sheet.addChild(leftColumn);

		const middleColumn = Html()
			.create("div")
			.addClass("sheet__column");
		sheet.addChild(middleColumn);

		const rightColumn = Html()
			.create("div")
			.addClass("sheet__column");
		sheet.addChild(rightColumn);
		// ---------------------------------------------

		// BIO SECTION
		const bioSection = Html()
			.create("section")
			.addClass("sheet__section")
			.addClass("sheet__biography");
		leftColumn.addChild(bioSection);
		const bioFields = [
			"Background",
			"Homeworld",
			"Faction",
			"Species",
			"Employer"
		];
		for (let i = 0; i < bioFields.length; i++) {
			const gridCellLabel = Html()
				.create("h3")
				.addClass("grid-cell")
				.addClass("grid-cell__label")
				.text(bioFields[i]);
			const gridCellValue = Html()
				.create("h3")
				.addClass("grid-cell")
				.addClass("grid-cell__value")
				.text(tbd)
				.addAttribute("contenteditable", contentEditable);
			bioSection.addChild(gridCellLabel).addChild(gridCellValue);
		}

		// FOCI SECTION
		const fociSection = Html()
			.create("section")
			.addClass("sheet__section")
			.addClass("sheet__foci");
		leftColumn.addChild(fociSection);
		const fociLabel = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("FOCI");
		const fociLvlLabel = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Lvl");
		fociSection.addChild(fociLabel).addChild(fociLvlLabel);

		for (let i = 0; i < 2 * 10; i++) {
			const gridCellValue = Html()
				.create("h3")
				.addClass("grid-cell")
				.addClass("grid-cell__value")
				.text(tbd)
				.addAttribute("contenteditable", contentEditable);
			fociSection.addChild(gridCellValue);
		}

		//ATTRIBUTES SECTION
		const attributesSection = Html()
			.create("section")
			.addClass("sheet__section")
			.addClass("sheet__attributes");
		middleColumn.addChild(attributesSection);
		const attributesHeader = Html()
			.create("h3")
			.addClass("grid-header")
			.text("Attributes");
		attributesSection.addChild(attributesHeader);

		character.attributes.forEach(attribute => {
			const attributeLabel = Html()
				.create("h3")
				.addClass("grid-cell")
				.addClass("grid-cell__label")
				.addClass("attribute-label")
				.text(attribute.typeName.substring(0, 3));
			attributesSection.addChild(attributeLabel);

			const attributeValue = Html()
				.create("h3")
				.addClass("grid-cell")
				.addClass("grid-cell__value")
				.text(attribute.value)
				.addAttribute("contenteditable", contentEditable);
			attributesSection.addChild(attributeValue);

			const attributeModifier = Html()
				.create("h3")
				.addClass("grid-cell")
				.addClass("grid-cell__value")
				.text(
					attribute.modifier > 0 ? "+" + attribute.modifier : attribute.modifier
				);
			attributesSection.addChild(attributeModifier);
		});

		// SAVING THROWS SECTION
		const savesSection = Html()
			.create("section")
			.addClass("sheet__section")
			.addClass("sheet__saves");
		middleColumn.addChild(savesSection);
		const savesHeader = Html()
			.create("h3")
			.addClass("grid-header")
			.text("Saving Throws");
		savesSection.addChild(savesHeader);

		const physicalLabel = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Physical");
		savesSection.addChild(physicalLabel);
		const evasionLabel = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Evasion");
		savesSection.addChild(evasionLabel);
		const mentalLabel = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Mental");
		savesSection.addChild(mentalLabel);

		const physicalValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.text(tbd)
			.addAttribute("contenteditable", contentEditable);
		savesSection.addChild(physicalValue);
		const evasionValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.text(tbd)
			.addAttribute("contenteditable", contentEditable);
		savesSection.addChild(evasionValue);
		const mentalValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.text(tbd)
			.addAttribute("contenteditable", contentEditable);
		savesSection.addChild(mentalValue);

		// SKILLS SECTION
		const skillsSection = Html()
			.create("section")
			.addClass("sheet__section")
			.addClass("sheet__skills");
		middleColumn.addChild(skillsSection);
		const skillsHeader = Html()
			.create("h3")
			.addClass("grid-header")
			.text("Skills");
		skillsSection.addChild(skillsHeader);

		const skillTypes = [
			"Administer",
			"Connect",
			"Exert",
			"Fix",
			"Heal",
			"Know",
			"Lead",
			"Notice",
			"Perform",
			"Pilot",
			"Program",
			"Punch",
			"Shoot",
			"Sneak",
			"Stab",
			"Survive",
			"Talk",
			"Trade",
			"Work",
			"Biopsionics",
			"Metapsionics",
			"Precognition",
			"Telekinesis",
			"Telepathy",
			"Teleportation"
		];

		skillTypes.forEach(skill => {
			const skillLabel = Html()
				.create("h4")
				.addClass("grid-cell")
				.addClass("grid-cell__label")
				.text(skill);
			skillsSection.addChild(skillLabel);
			const skillValue = Html()
				.create("h3")
				.addClass("grid-cell")
				.addClass("grid-cell__value")
				.text(tbd)
				.addAttribute("contenteditable", contentEditable);
			skillsSection.addChild(skillValue);
		});

		// PROGRESSION SECTION
		const progressionSection = Html()
			.create("section")
			.addClass("sheet__section")
			.addClass("sheet__progression");
		rightColumn.addChild(progressionSection);
		const progressionHeader = Html()
			.create("h3")
			.addClass("grid-header")
			.text("Progression");
		progressionSection.addChild(progressionHeader);

		const charLvlLabel = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Lvl");
		const charLvlValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.text(character.level)
			.addAttribute("contenteditable", contentEditable);
		progressionSection.addChild(charLvlLabel).addChild(charLvlValue);

		const xpLabel = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Experience");
		const xpValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.text(character.experience)
			.addAttribute("contenteditable", contentEditable);
		progressionSection.addChild(xpLabel).addChild(xpValue);

		const hdLabel = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("HD");
		const hdValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.text(tbd)
			.addAttribute("contenteditable", contentEditable);
		progressionSection.addChild(hdLabel).addChild(hdValue);

		const skillPtsLabel = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Skill Pts/Lvl");
		const skillPtsValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.text(tbd)
			.addAttribute("contenteditable", contentEditable);
		progressionSection.addChild(skillPtsLabel).addChild(skillPtsValue);

		// STATUS SECTION
		const statusSection = Html()
			.create("section")
			.addClass("sheet__section")
			.addClass("sheet__status");
		rightColumn.addChild(statusSection);

		const hpHeader = Html()
			.create("h3")
			.addClass("grid-header")
			.text("Hit Points");
		statusSection.addChild(hpHeader);
		const currentHPLabel = Html()
			.create("h4")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Current");
		const currentHPValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.text(tbd)
			.addAttribute("contenteditable", contentEditable);
		statusSection.addChild(currentHPLabel).addChild(currentHPValue);
		const maxHPLabel = Html()
			.create("h4")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Max");
		const maxHPValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.text(tbd)
			.addAttribute("contenteditable", contentEditable);
		statusSection.addChild(maxHPLabel).addChild(maxHPValue);

		const conditionsHeader = Html()
			.create("h3")
			.addClass("grid-header")
			.text("Conditions");
		statusSection.addChild(conditionsHeader);
		const conditionsValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__span-value")
			.text(tbd)
			.addAttribute("contenteditable", contentEditable);
		statusSection.addChild(conditionsValue);

		const sysStrainLabel = Html()
			.create("h4")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Sys Strain");
		const sysStrainValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.text(tbd)
			.addAttribute("contenteditable", contentEditable);
		statusSection.addChild(sysStrainLabel).addChild(sysStrainValue);
		const permLabel = Html()
			.create("h4")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Permanent");
		const permValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.text(tbd)
			.addAttribute("contenteditable", contentEditable);
		statusSection.addChild(permLabel).addChild(permValue);

		return mainContent;
	}

	// ALL SHEETS BLOCK ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	renderContentBlockAllSheets(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "characters";
		const resourceURL = rootDataURL + "/" + requestedData;
		// console.log("Block URL: " + rootDataURL);

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

		return cardGallery;
	}

	// NEW SHEET BLOCK +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	renderContentBlockNewSheet(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "characters/new";
		const resourceURL = rootDataURL + "/" + requestedData;
		// console.log("Block URL: " + rootDataURL);

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

		// CREATE SHEET ------------------------------
		const sheet = Html()
			.create("article")
			.addClass("sheet");
		mainContent.addChild(sheet);

		// CREATE COLUMNS ------------------------------
		const leftColumn = Html()
			.create("div")
			.addClass("sheet__column");
		sheet.addChild(leftColumn);

		const middleColumn = Html()
			.create("div")
			.addClass("sheet__column");
		sheet.addChild(middleColumn);

		const rightColumn = Html()
			.create("div")
			.addClass("sheet__column");
		sheet.addChild(rightColumn);
		// ---------------------------------------------

		// INPUT SECTION
		const inputSection = Html()
			.create("section")
			.addClass("sheet__section")
			.addClass("sheet__biography");
		middleColumn.addChild(inputSection);

		const inputValueElements = [];

		const nameCellLabel = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Name");
		const nameCellValue = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.text("")
			.addAttribute("contenteditable", true);
		inputSection.addChild(nameCellLabel).addChild(nameCellValue);
		inputValueElements.push(nameCellValue);

		const classCellLabel = Html()
			.create("h3")
			.addClass("grid-cell")
			.addClass("grid-cell__label")
			.text("Class");
		const classCellValue = Html()
			.create("select")
			.addClass("grid-cell")
			.addClass("grid-cell__value")
			.addChild(
				Html()
					.create("option")
					.addAttribute("value", "0")
					.text("Warrior")
			)
			.addChild(
				Html()
					.create("option")
					.addAttribute("value", "1")
					.text("Expert")
			)
			.addChild(
				Html()
					.create("option")
					.addAttribute("value", "2")
					.text("Psychic")
			)
			.addChild(
				Html()
					.create("option")
					.addAttribute("value", "3")
					.text("Warrior-Expert")
			)
			.addChild(
				Html()
					.create("option")
					.addAttribute("value", "4")
					.text("Psychic-Expert")
			)
			.addChild(
				Html()
					.create("option")
					.addAttribute("value", "5")
					.text("Psychic-Warrior")
			);

		inputSection.addChild(classCellLabel).addChild(classCellValue);
		inputValueElements.push(classCellValue);

		const rollButton = Html()
			.create("h3")
			.addClass("grid-header")
			.addClass("input__button")
			.text("Roll Stats")
			.click(event => {
				this.renderContentBlockNewSheet();
			});
		inputSection.addChild(rollButton);

		const attributeFieldLabels = [
			"Strength",
			"Dexterity",
			"Constitution",
			"Intelligence",
			"Wisdom",
			"Charisma"
		];
		for (let i = 0; i < attributeFieldLabels.length; i++) {
			const gridCellLabel = Html()
				.create("h3")
				.addClass("grid-cell")
				.addClass("grid-cell__label")
				.text(attributeFieldLabels[i]);
			const gridCellValue = Html()
				.create("h3")
				.addClass("grid-cell")
				.addClass("grid-cell__value")
				.text(this.rollRandomStatValue());
			inputValueElements.push(gridCellValue);
			inputSection.addChild(gridCellLabel).addChild(gridCellValue);
		}

		const inputButton = Html()
			.create("h3")
			.addClass("grid-header")
			.addClass("input__button")
			.text("Create Character")
			.click(event => {
				this.postCreateCharacter(inputValueElements);
			});
		inputSection.addChild(inputButton);
		return mainContent;
	}

	postCreateCharacter(inputValueElements) {
		const characterName = inputValueElements[0].text();
		if (characterName === "") {
			console.log("Must specify a name!");
			this.renderContentBlockNewSheet();
			return;
		}
		const careerTypeValue = inputValueElements[1].render().value;

		console.log(inputValueElements[2].text());

		Api().postRequest(
			"http://localhost:8080/api/characters",
			{
				name: characterName,
				careerType: careerTypeValue,
				strength: inputValueElements[2].text(),
				dexterity: inputValueElements[3].text(),
				constitution: inputValueElements[4].text(),
				intelligence: inputValueElements[5].text(),
				wisdom: inputValueElements[6].text(),
				charisma: inputValueElements[7].text()
			},
			() => {
				this.renderContentBlockAllSheets();
			}
		);
	}

	// =========================================================================================
	// =========================================================================================

	rollRandomStatValue() {
		const die1 = 1 + Math.floor(Math.random() * 6);
		const die2 = 1 + Math.floor(Math.random() * 6);
		const die3 = 1 + Math.floor(Math.random() * 6);
		const sum = die1 + die2 + die3;
		return sum;
	}
}
