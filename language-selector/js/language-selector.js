const locales = ["en-GB", "cs-CZ", "es-ES", "fr-FR", "ru-RU", "hi-IN", "zh-CN"];

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
      const browserLocales = navigator.languages;
      selectedLocale = browserLocales.find(browserLocale => locales.includes(browserLocale));
      if (!selectedLocale) {
        selectedLocale = locales[0]; // Si no se encuentra el idioma del navegador, selecciona el primer idioma de la lista
      }
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

setSelectedLocale(locales[0]);
const browserLang = new Intl.Locale(navigator.language).language;
for (const locale of locales) {
	const localeLang = new Intl.Locale(locale).language;
	if (localeLang === browserLang) {
		setSelectedLocale(locale);
	}
}
