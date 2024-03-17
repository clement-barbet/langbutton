const locales = ["en-GB", "cs-CZ", "es-ES", "fr-FR", "ru-RU", "hi-IN", "zh-CN"];
const localeToUrl = {
    'en': 'https://smartcitiesadvisor.com',
    'cs': 'https://smartcitiesadvisor.com/cz',
    'es': 'https://www.smartcitiesadvisor.com/smart-cities-advisor-es',
    'fr': 'https://www.smartcitiesadvisor.com/fr',
    'ru': 'https://www.smartcitiesadvisor.com/rus',
    'hi': 'https://www.smartcitiesadvisor.com/in',
    'zh': 'https://www.smartcitiesadvisor.com/cn'
};

function getFlagSrc(countryCode) {
	return /^[A-Z]{2}$/.test(countryCode)
		? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
		: "";
}

const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-content");

function setSelectedLocale(locale = null) {
	let selectedLocale = locale;

	if (!selectedLocale) {
		selectedLocale = locales[0];
	}

	const intlLocale = new Intl.Locale(selectedLocale);
	const langName = new Intl.DisplayNames([selectedLocale], {
		type: "language",
	}).of(intlLocale.language);

	dropdownContent.innerHTML = "";

	const otherLocales = locales.filter((loc) => loc !== selectedLocale);
	otherLocales.forEach((otherLocale) => {
		const otherIntlLocale = new Intl.Locale(otherLocale);
		const otherLangName = new Intl.DisplayNames([otherLocale], {
			type: "language",
		}).of(otherIntlLocale.language);

		const listEl = document.createElement("li");
		listEl.innerHTML = `${otherLangName}<img src="${getFlagSrc(
			otherIntlLocale.region
		)}" />`;
		listEl.value = otherLocale;
		listEl.addEventListener("mousedown", function () {
			setSelectedLocale(otherLocale);
		});
		dropdownContent.appendChild(listEl);
	});

	dropdownBtn.innerHTML = `<img src="${getFlagSrc(
		intlLocale.region
	)}" />${langName}<span class="arrow-down"></span>`;
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetch('https://ip-api.com/json')
        .then(response => response.json())
        .then(data => {
            const countryCode = data.countryCode;
            const locale = locales.find(locale => new Intl.Locale(locale).region === countryCode);
            setSelectedLocale(locale);

            if (window.location.hostname === 'smartcitiesadvisor.com' && new Intl.Locale(locale).language !== 'en') {
                window.location.href = localeToUrl[new Intl.Locale(locale).language];
            }
        });
});