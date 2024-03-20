document.addEventListener('DOMContentLoaded', (event) => {
    const locales = ["en-GB", "cs-CZ", "es-ES", "fr-FR", "ru-RU", "hi-IN", "zh-CN"];
    const localeToUrl = {
        'en': 'https://mental-education.org/',
        'cs': 'https://mental-education.org/cz/',
        'es': 'https://mental-education.org/es/',
        'fr': 'https://mental-education.org/fr/',
        'ru': 'https://mental-education.org/ru/',
        'hi': 'https://mental-education.org/in/',
        'zh': 'https://mental-education.org/cn/'
    };

    function getFlagSrc(countryCode) {
        return /^[A-Z]{2}$/.test(countryCode)
            ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
            : "";
    }

    const dropdownContent = document.getElementById('dropdown-content');

	locales.forEach((locale) => {
		const lang = new Intl.Locale(locale);
		const flagSrc = getFlagSrc(lang.region);
		const link = document.createElement("a");
		link.className = "flag-link";
		link.href = localeToUrl[lang.language];
		link.innerHTML = `<img src="${flagSrc}" alt="${lang.language} flag" style="width: 25px; text-align: center;">`;
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
});