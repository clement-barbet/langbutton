document.addEventListener("DOMContentLoaded", (event) => {
	const locales = [
		"en-GB",
		"cs-CZ",
		"es-ES",
		"fr-FR",
		"ru-RU",
		"hi-IN",
		"zh-CN",
	];
	const langNames = {
		en: "English",
		cs: "Česky",
		es: "Español",
		fr: "Français",
		ru: "Русский",
		hi: "हिन्दी",
		zh: "中文",
	};
	const urlToLang = {
		"": "en",
		cz: "cs",
		es: "es",
		fr: "fr",
		rus: "ru",
		in: "hi",
		cn: "zh",
	};
	const localeToUrl = {
		en: "https://www.myaudit.org/",
		cs: "https://www.myaudit.org/cz/",
		es: "https://www.myaudit.org/es/",
		fr: "https://www.myaudit.org/fr/",
		ru: "https://www.myaudit.org/ru/",
		hi: "https://www.myaudit.org/in/",
		zh: "https://www.myaudit.org/cn/",
	};

	function getFlagSrc(countryCode) {
		return /^[A-Z]{2}$/.test(countryCode)
			? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
			: "";
	}

	const dropdownContent = document.getElementById("dropdown-content");
	const dropbtn = document.querySelector(".dropbtn");
	const currentPath = window.location.pathname;
	const currentLang = urlToLang[currentPath.split("/")[1]] || "en";

	locales.forEach((locale) => {
		const lang = new Intl.Locale(locale);
		const flagSrc = getFlagSrc(lang.region);
		const link = document.createElement("a");
		link.className = "flag-link";
		link.href = localeToUrl[lang.language];
		const langName = capitalizeFirstLetter(langNames[lang.language]);
		link.innerHTML = `<img src="${flagSrc}" alt="${lang.language} flag" style="width: 25px; text-align: center;">`;

		if (lang.language === currentLang) {
			link.style.backgroundColor = "#f1f1f1";
			dropbtn.innerHTML += ` <span>${langName}</span>`;
		}

		dropdownContent.appendChild(link);
	});

	document.querySelector(".dropbtn").addEventListener("click", function () {
		const dropdownContent = document.querySelector(".dropdown-content");
		if (dropdownContent.style.display === "block") {
			dropdownContent.style.display = "none";
		} else {
			dropdownContent.style.display = "block";
		}
	});

	document.addEventListener("click", function (event) {
		const isClickInsideContent = dropdownContent.contains(event.target);
		const isClickInsideButton = dropbtn.contains(event.target);

		if (!isClickInsideContent && !isClickInsideButton) {
			dropdownContent.style.display = "none";
		}
	});
});

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
