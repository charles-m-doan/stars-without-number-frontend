export default function() {
	return new Api();
}

class Api {
	constructor(rootURL) {
		if (rootURL === undefined) {
			rootURL = "http://localhost:8080/api/";
		}
		this.rootURL = rootURL;
	}

	getRootURL() {
		return this.rootURL;
	}

	getRequest(location, callback) {
		fetch(location)
			.then(response => response.json())
			.then(callback)
			.catch(err => console.log(err));
	}

	postRequest(location, requestBody, callback) {
		fetch(location, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify(requestBody)
		})
			.then(response => response.json())
			.then(callback)
			.catch(err => console.log(err));
	}
}
