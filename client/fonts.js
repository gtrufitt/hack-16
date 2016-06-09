//fonts.js


var egyptianWeb = 'https://assets.guim.co.uk/fonts/9849697bbb3a749ce02d4b85bf0b3cd8/GuardianEgyptianWeb.woff2.json'
var textEgyptianWeb = 'https://assets.guim.co.uk/fonts/ae8a1b17105d9a63b0da12c54a109721/GuardianTextEgyptianWeb.woff2.json'

module.exports = loadFonts

function loadFont(fontUrl, fontName) {
	fetch(fontUrl, {
		method: 'get',
		mode: 'cors'
	}).then(function(response) {
		// Convert to JSON
		return response.text()
	}).then(function(font){		
		var guFont = fontData => fontData.css;

		document.querySelector('.webfont-' + fontName).innerHTML = eval(font);
	}).catch(function(err) {
		console.log(err);
	});
}

function loadFonts() {
	loadFont(egyptianWeb, 'egyptianweb');
	loadFont(textEgyptianWeb, 'textegyptianweb');
}