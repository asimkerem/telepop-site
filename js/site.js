// Telepop sitesi: dil seçimi (Türkçe / İngilizce).
// Sıra: adresteki ?dil=tr|en (oyun kendi dilini gönderir), daha önce seçilen, tarayıcının dili.
(function () {
	var DILLER = ["tr", "en"];
	var kok = document.documentElement;

	function oku() {
		try { return window.localStorage.getItem("telepop-dil"); } catch (e) { return null; }
	}
	function yaz(dil) {
		try { window.localStorage.setItem("telepop-dil", dil); } catch (e) { /* özel pencere: yalnızca bu sayfada */ }
	}
	function uygula(dil) {
		kok.setAttribute("data-dil", dil);
		kok.setAttribute("lang", dil);
		var baslik = kok.getAttribute("data-baslik-" + dil);
		if (baslik) { document.title = baslik; }
		var dugmeler = document.querySelectorAll("[data-dil-sec]");
		for (var i = 0; i < dugmeler.length; i++) {
			dugmeler[i].setAttribute("aria-pressed", dugmeler[i].getAttribute("data-dil-sec") === dil ? "true" : "false");
		}
	}

	var adres = null;
	try { adres = new URLSearchParams(window.location.search).get("dil"); } catch (e) { adres = null; }
	var dil = DILLER.indexOf(adres) >= 0 ? adres : oku();
	if (DILLER.indexOf(dil) < 0) {
		var tarayici = (navigator.language || "en").toLowerCase();
		dil = tarayici.indexOf("tr") === 0 ? "tr" : "en";
	}
	if (DILLER.indexOf(adres) >= 0) { yaz(adres); }
	uygula(dil);

	document.addEventListener("click", function (olay) {
		var dugme = olay.target.closest ? olay.target.closest("[data-dil-sec]") : null;
		if (!dugme) { return; }
		var yeni = dugme.getAttribute("data-dil-sec");
		yaz(yeni);
		uygula(yeni);
	});
})();
