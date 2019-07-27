import Html from "../Html/Html";
import logoAvatar from "../../images/memeMan.png";
import UnknownBlock from "../Components/ContentBlocks/UnknownBlock";
import HomeBlock from "../Components/ContentBlocks/HomeBlock";
import AllArtistsBlock from "../Components/ContentBlocks/AllArtistsBlock";
import AllAlbumsBlock from "../Components/ContentBlocks/AllAlbumsBlock";
import SingleArtistBlock from "../Components/ContentBlocks/SingleArtistBlock";
import SingleAlbumBlock from "../Components/ContentBlocks/SingleAlbumBlock";

import Api from "../Api/Api";

export default class ComponentManager {
	constructor() {
		this.skeletonHasBeenRendered = false;
		this.blockTypes = [
			"unknownBlock",
			"homeBlock",
			"allArtistsBlock",
			"allAlbumsBlock",
			"singleArtistBlock",
			"singleAlbumBlock"
		];
	}

	getAppContext() {
		return Html().select("#app");
	}

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
		} else if (blockType == "allArtistsBlock") {
			this.renderContentBlockAllArtists();
		} else if (blockType == "allAlbumsBlock") {
			this.renderContentBlockAllAlbums();
		} else if (blockType == "singleArtistBlock") {
			this.renderContentBlockSingleArtist(requestedData);
		} else if (blockType == "singleAlbumBlock") {
			this.renderContentBlockSingleAlbum(requestedData);
		} else {
			const unknownBlock = new UnknownBlock();
			unknownBlock.renderContent();
		}
	}

	renderPageSkeleton() {
		if (this.skeletonHasBeenRendered == false) {
			this.renderWrapper();
			this.renderSidebar();
			this.renderEmptyContentPane();
			this.renderMain();
			this.renderFooter();
			this.skeletonHasBeenRendered = true;
		} else {
			// console.log("Page Skeleton has already been rendered!");
		}
	}

	// CONTENT BLOCKS ==========================================================================
	// =========================================================================================

	// SINGLE ARTIST BLOCK

	renderContentBlockSingleArtist(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "artists";
		const resourceURL = rootDataURL + "/" + requestedData;

		const main = Html().select(".main");
		const content = this.generateContentSingleArtist(resourceURL);
		main.replace(content);
	}

	generateContentSingleArtist(resourceURL) {
		// const pageTitle = Html()
		// 	.create("h1")
		// 	.text("Single Artist");
		// const pageSubTitle = Html()
		// 	.create("h2")
		// 	.text(resourceURL);

		const avatarSection = this.generateArtistAvatar(resourceURL);
		const artistNav = this.generateArtistNav();
		const albumGallery = this.generateArtistAlbumGallery(resourceURL);

		const content = Html()
			.create("div")
			.addClass("container")
			// .addChild(pageTitle)
			// .addChild(pageSubTitle)
			.addChild(avatarSection)
			.addChild(artistNav)
			.addChild(albumGallery);
		return content;
	}

	generateArtistAvatar(resourceURL) {
		const avatarSection = Html()
			.create("section")
			.addClass("avatar");
		Api().getRequest(resourceURL, artist => {
			const avatarFig = Html()
				.create("figure")
				.addClass("avatar__figure");
			const artistImg = Html()
				.create("img")
				.addClass("avatar-figure__img-artist")
				.addAttribute("src", artist.imgUrl);
			const artistNameHeading = Html()
				.create("h1")
				.addClass("avatar__title")
				.text(artist.name);

			avatarFig.addChild(artistImg);
			avatarSection.addChild(avatarFig);
			avatarSection.addChild(artistNameHeading);
		});
		return avatarSection;
	}

	generateArtistNav() {
		const artistNav = Html()
			.create("nav")
			.addClass("artist-view__nav");
		const artistUl = Html()
			.create("ul")
			.addClass("artist-view__nav__list");
		let liElements;

		const navItems = ["play", "about", "related"];

		liElements = navItems.map(navItem => {
			const liElement = Html()
				.create("li")
				.addClass("nav-list__item");
			liElement.addChild(
				Html()
					.create("a")
					.addClass("nav-list__anchor")
					.text(navItem)
			);
			artistUl.addChild(liElement);
		});

		artistNav.addChild(artistUl);

		return artistNav;
	}

	generateArtistAlbumGallery(resourceURL) {
		const cardGallery = Html()
			.create("section")
			.addClass("card-gallery");

		Api().getRequest(resourceURL, artist => {
			artist.albums.forEach(album => {
				const albumCard = Html()
					.create("article")
					.addClass("card")
					.click(event => {
						event.preventDefault();
						this.renderContentBlock("singleAlbumBlock", album.id);
					});
				const albumTitle = Html()
					.create("h3")
					.addClass("card__title")
					.text(album.title);
				const albumFig = Html()
					.create("figure")
					.addClass("card__title");
				const albumImg = Html()
					.create("img")
					.addAttribute("src", album.imgUrl);
				albumFig.addChild(albumImg);
				albumCard.addChild(albumTitle);
				albumCard.addChild(albumFig);
				// albumCard.addChild(publishDate)
				cardGallery.addChild(albumCard);
			});
		});
		return cardGallery;
	}

	// SINGLE ALBUM BLOCK

	renderContentBlockSingleAlbum(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "albums";
		const resourceURL = rootDataURL + "/" + requestedData;

		const main = Html().select(".main");
		const content = this.generateContentSingleAlbum(resourceURL);
		main.replace(content);
	}

	generateContentSingleAlbum(resourceURL) {
		// const pageTitle = Html()
		// 	.create("h1")
		// 	.text("Single Album");
		// const pageSubTitle = Html()
		// 	.create("h2")
		// 	.text(resourceURL);
		const avatarSection = this.generateAlbumAvatar(resourceURL);
		const songSection = this.generateSongs(resourceURL);
		const content = Html()
			.create("div")
			.addClass("container")
			// .addChild(pageTitle)
			// .addChild(pageSubTitle)
			.addChild(avatarSection)
			.addChild(songSection);
		return content;
	}

	generateAlbumAvatar(resourceURL) {
		const avatarSection = Html()
			.create("section")
			.addClass("avatar");
		const avatarFig = Html()
			.create("figure")
			.addClass("avatar__figure");
		const albumTitle = Html()
			.create("h1")
			.addClass("avatar__title");

		Api().getRequest(resourceURL, album => {
			const albumCover = Html()
				.create("img")
				.addClass("artist-figure__img")
				.addAttribute("src", album.imgUrl);
			const albumTitle = Html()
				.create("h1")
				.addClass("avatar__title")
				.text(album.title);
			avatarFig.addChild(albumCover);
			avatarSection.addChild(avatarFig);
			avatarSection.addChild(albumTitle);
		});
		return avatarSection;
	}

	generateSongs(resourceURL) {
		const songSection = Html().create("section");
		Api().getRequest(resourceURL, album => {
			album.songs.forEach(song => {
				const songBox = Html()
					.create("div")
					.addClass("song-box");
				const playCircle = Html()
					.create("a")
					.addAttribute("href", song.linkUrl)
					.addAttribute("target", "_blank")
					.addClass("play-circle");
				const playButton = Html()
					.create("button")
					.addClass("play-button");
				const songInfo = Html()
					.create("div")
					.addClass("song-info");
				const songTitle = Html()
					.create("h3")
					.text(song.title);
				const artistName = Html()
					.create("span")
					.text(song.parentArtistName);
				const songDuration = Html()
					.create("span")
					.addClass("duration")
					.text(song.duration);

				playCircle.addChild(playButton);
				songBox.addChild(playCircle);
				songInfo.addChild(songTitle);
				songInfo.addChild(artistName);
				songBox.addChild(songInfo);
				songBox.addChild(songDuration);
				songSection.addChild(songBox);
			});
		});
		return songSection;
	}

	// ALL ALBUMS BLOCK

	renderContentBlockAllAlbums(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "albums";
		const resourceURL = rootDataURL + "/" + requestedData;

		const main = Html().select(".main");
		const content = this.generateContentAllAlbums(resourceURL);
		main.replace(content);
	}

	generateContentAllAlbums(resourceURL) {
		const pageTitle = Html()
			.create("h1")
			.addClass("page-title")
			.text("Albums");
		const albumGallery = this.generateAlbumGallery(resourceURL);

		const content = Html()
			.create("div")
			.addChild(pageTitle)
			.addChild(albumGallery);
		return content;
	}

	generateAlbumGallery(resourceURL) {
		const albumGallery = Html()
			.create("section")
			.addClass("card-gallery");

		Api().getRequest(resourceURL, albumCollection => {
			albumCollection.forEach(album => {
				const albumCard = Html()
					.create("article")
					.addClass("card")
					.click(event => {
						event.preventDefault();
						this.renderContentBlock("singleAlbumBlock", album.id);
					});
				const albumTitle = Html()
					.create("h3")
					.addClass("card__title")
					.text(album.title);
				const albumCover = Html()
					.create("figure")
					.addClass("album-card__cover-image");
				const coverImg = Html()
					.create("img")
					.addAttribute("src", album.imgUrl);
				const artistName = Html()
					.create("h4")
					.addClass("album-card__artist-name")
					.text(album.parentName);
				const releaseDate = Html()
					.create("h4")
					.addClass("album-card__date")
					.text(album.publishYear);

				albumCover.addChild(coverImg);
				albumCard.addChild(albumTitle);
				albumCard.addChild(albumCover);
				albumCard.addChild(artistName);
				albumCard.addChild(releaseDate);

				albumGallery.addChild(albumCard);
			});
		});
		return albumGallery;
	}

	// ALL ARTISTS BLOCK

	renderContentBlockAllArtists(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "artists";
		const resourceURL = rootDataURL + "/" + requestedData;

		const main = Html().select(".main");
		const content = this.generateContentAllArtists(resourceURL);
		main.replace(content);
	}

	generateContentAllArtists(resourceURL) {
		const pageTitle = Html()
			.create("h1")
			.addClass("page-title")
			.text("Artists");

		const cardGallery = Html()
			.create("section")
			.addClass("card-gallery");

		Api().getRequest(resourceURL, artistCollection => {
			artistCollection.forEach(artist => {
				const card = Html()
					.create("article")
					.addClass("card")
					.click(event => {
						event.preventDefault();
						this.renderContentBlock("singleArtistBlock", artist.id);
					});

				const cardFigure = Html()
					.create("figure")
					.addClass("card__figure");

				const cardFigurePortrait = Html()
					.create("img")
					.addClass("card__figure__portrait")
					.addAttribute("src", artist.imgUrl);

				const cardTitle = Html()
					.create("h3")
					.addClass("card__title")
					.text(artist.name);

				card.addChild(cardFigure);
				cardFigure.addChild(cardFigurePortrait);
				card.addChild(cardTitle);
				cardGallery.addChild(card);
			});
		});

		const content = Html()
			.create("div")
			.addChild(pageTitle)
			.addChild(cardGallery);
		return content;
	}

	// HOME BLOCK

	renderContentBlockHome(requestedData) {
		if (requestedData === undefined) {
			requestedData = "";
		}
		const rootDataURL = Api().getRootURL() + "home";
		const resourceURL = rootDataURL + "/" + requestedData;

		const main = Html().select(".main");
		const content = this.generateContentHome(resourceURL);
		main.replace(content);
	}

	generateContentHome(resourceURL) {
		const pageTitle = Html()
			.create("h1")
			.text("Welcome to Stonkify!");

		const boast = Html()
			.create("h2")
			.text(
				"After browsing our amazing site, you'll want to buy every last one of our stonks!"
			);

		const obviousStatement = Html()
			.create("h3")
			.text("Click on Artists or Albums to get started!");

		const content = Html()
			.create("div")
			.addClass("welcome-container")
			.addChild(pageTitle)
			.addChild(boast)
			.addChild(obviousStatement);
		return content;
	}

	// =========================================================================================
	// =========================================================================================

	renderWrapper() {
		const app = Html().select("#app");
		const wrapper = Html()
			.create("div")
			.addClass("wrapper");
		app.addChild(wrapper);
	}

	renderSidebar() {
		const wrapper = Html().select(".wrapper");

		const banner = Html()
			.create("section")
			.addClass("banner")
			.addClass("sidebar");
		const bannerLogo = Html()
			.create("div")
			.addClass("banner__logo");
		const bannerLogoFigure = Html()
			.create("figure")
			.addClass("banner__logo__image");
		const figureImg = Html()
			.create("img")
			.addAttribute("src", logoAvatar)
			.addAttribute("alt", "Meme Man");

		const bannerLogoTitle = Html()
			.create("h1")
			.addClass("banner__logo__title")
			.text("Stonkify");

		const bannerNavList = Html()
			.create("ul")
			.addClass("banner__nav-list");

		//HOME BUTTON

		const homeViewItem = Html()
			.create("li")
			.addClass("nav-list__item");
		homeViewItem.addChild(
			Html()
				.create("a")
				.addClass("nav-list__anchor")
				.addAttribute("href", "homeBlock")
				.text("Home")
				.click(event => {
					event.preventDefault();
					this.renderContentBlock("homeBlock", "");
				})
		);

		//ARTISTS BUTTON

		const artistsViewItem = Html()
			.create("li")
			.addClass("nav-list__item");
		artistsViewItem.addChild(
			Html()
				.create("a")
				.addClass("nav-list__anchor")
				.addAttribute("href", "allArtistsBlock")
				.text("Artists")
				.click(event => {
					event.preventDefault();
					this.renderContentBlock("allArtistsBlock", "");
				})
		);

		//ALBUMS BUTTON

		const albumsViewItem = Html()
			.create("li")
			.addClass("nav-list__item");
		albumsViewItem.addChild(
			Html()
				.create("a")
				.addClass("nav-list__anchor")
				.addAttribute("href", "allAlbumsBlock")
				.text("Albums")
				.click(event => {
					event.preventDefault();
					this.renderContentBlock("allAlbumsBlock", "");
				})
		);

		bannerLogoFigure.addChild(figureImg);
		bannerLogo.addChild(bannerLogoFigure);

		banner.addChild(bannerLogo);
		banner.addChild(bannerLogoTitle);

		bannerNavList.addChild(homeViewItem);
		bannerNavList.addChild(artistsViewItem);
		bannerNavList.addChild(albumsViewItem);
		banner.addChild(bannerNavList);

		wrapper.addChild(banner);
	}

	renderEmptyContentPane() {
		const wrapper = Html().select(".wrapper");
		const contentPane = Html()
			.create("section")
			.addClass("content");
		wrapper.addChild(contentPane);
	}

	renderMain() {
		const contentPane = Html().select(".content");

		const main = Html()
			.create("main")
			.addClass("main");

		contentPane.addChild(main);
	}

	renderFooter() {
		const contentPane = Html().select(".content");
		const footer = Html()
			.create("footer")
			.addClass("footer");
		const footerContents = Html()
			.create("h2")
			.html("&copy;2019 Stonkify Freemium");

		footer.addChild(footerContents);
		contentPane.addChild(footer);
	}
}
