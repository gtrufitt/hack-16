//fonts.js


var egyptianWeb = 'https://assets.guim.co.uk/fonts/9849697bbb3a749ce02d4b85bf0b3cd8/GuardianEgyptianWeb.woff2.json'
var textEgyptianWeb = 'https://assets.guim.co.uk/fonts/ae8a1b17105d9a63b0da12c54a109721/GuardianTextEgyptianWeb.woff2.json'
var sansWeb = 'https://assets.guim.co.uk/fonts/1976d273f3aeeab8863d462068fec10b/GuardianSansWeb.woff2.json'
var textSansWeb = 'https://assets.guim.co.uk/fonts/355c7e3d0d08d7772e40e50fd5a92b7b/GuardianTextSansWeb.woff2.json'

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

		var css = eval(font);

		var head = document.head || document.getElementsByTagName('head')[0],
		    style = document.createElement('style');

		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
	}).catch(function(err) {
		console.log(err);
	});
}

function loadFonts() {
	loadFont(egyptianWeb, 'egyptianweb');
	loadFont(textEgyptianWeb, 'textegyptianweb');
	loadFont(sansWeb, 'sansweb');
	loadFont(textSansWeb, 'textsansweb');
}