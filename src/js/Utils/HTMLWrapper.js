export default function(htmlElementType) {
	return new HTMLWrapper(htmlElementType);
}

class HTMLWrapper {
	constructor(htmlElementType) {
		this.element = document.getElementsByTagName("html")[0];
		if (htmlElementType !== undefined) {
			const newElement = document.createElement(elementType);
			if (newElement instanceof HTMLUnknownElement) {
				throw new Error("Invalid HTML tag");
			} else {
				this.element = newElement;
			}
		}
	}

	addAttribute(attributeToSet, attributeValue) {
		this.element.setAttribute(attributeToSet, attributeValue);

		return this;
	}

	addChild(elementToAdd) {
		if (elementToAdd.render() instanceof HTMLUnknownElement) {
			throw new Error("Invalid HTML tag");
		}

		this.element.append(elementToAdd.render());

		return this;
	}

	addClass(classToAdd) {
		if (this.element.classList.contains(classToAdd)) {
			throw new Error("Class already exists on element.");
		}
		this.element.classList.add(classToAdd);
		return this;
	}

	click(callback) {
		this.element.addEventListener("click", callback);

		return this;
	}

	create(elementType) {
		this.element = document.createElement(elementType);
		return this;
	}

	html(contentToAdd) {
		if (contentToAdd === undefined) {
			return this.element.innerHTML;
		}
		this.element.innerHTML = contentToAdd;

		return this;
	}

	_isClassQuery(query) {
		return query.startsWith(".");
	}

	_isIdQuery(query) {
		return query.startsWith("#");
	}

	render() {
		return this.element;
	}

	replace(element) {
		this.element.innerHTML = "";
		this.addChild(element);

		return this;
	}

	select(query) {
		const selection = document.querySelectorAll(query);

		if (selection.length === 1) {
			this.element = selection[0];
		} else {
			this.element = selection;
		}

		return this;
	}

	text(textToAdd) {
		if (textToAdd === undefined) {
			return this.element.textContent;
		}
		this.element.textContent = textToAdd;
		return this;
	}
}
