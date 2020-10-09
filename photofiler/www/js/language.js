var APPS_XML_LANGUAGE_EN;
var APPS_XML_LANGUAGE;
var APPS_URL = "/photofiler/"
function apps_load_language() {
	var multi_lang_idx = new Array(
        /*0*/	"en-US",
        /*1*/	"fr-FR",
        /*2*/	"it-IT",
        /*3*/	"de-DE",
        /*4*/	"es-ES",
        /*5*/	"zh-CN",
        /*6*/	"zh-TW",
        /*7*/	"ko-KR",
        /*8*/	"ja-JP",
        /*9*/	"ru-RU",
        /*10*/	"pt-BR",
        /*11*/	"cs-CZ",
        /*12*/	"nl-NL",
        /*13*/	"hu-HU",
        /*14*/	"no-NO",
        /*15*/	"pl-PL",
        /*16*/	"sv-SE",
        /*17*/	"tr-TR");
				
	var my_file = APPS_URL +multi_lang_idx[parseInt(MULTI_LANGUAGE, 10)].toString()+".xml";
	
	wd_ajax({
		type: "GET",
		url: my_file,
		dataType: "xml",
		async: false,
		cache: false,
		error: function () {},
		success: function (xml) {
			APPS_XML_LANGUAGE = xml;
		}
	});
}

function apps_load_en_language() {
	wd_ajax({
		type: "GET",
		url: APPS_URL+"en-US.xml",
		dataType: "xml",
		async: false,
		cache: false,
		error: function () {},
		success: function (xml) {
			APPS_XML_LANGUAGE_EN = xml;
		}
	});
}

function apps_T(c, id) {
	var str = "";
	var find = false;

	if (typeof APPS_XML_LANGUAGE == 'undefined') apps_load_language();
	if (typeof APPS_XML_LANGUAGE_EN == 'undefined') apps_load_en_language();

	$(APPS_XML_LANGUAGE).find(c).each(function () {
		str = $(this).find(id).text()
		if (str != "")
			find = true;
		return false;
	});

	if (find == false) {
		$(APPS_XML_LANGUAGE_EN).find(c).each(function () {
			str = $(this).find(id).text()
			return false;
		});
	}
	return str;
}

function apps_language() {
	$('._apps_text').each(function () {
		var str = apps_T($(this).attr('lang'), $(this).attr('datafld'));
		if (str != "") {
			$(this).empty();
			$(this).html(str);
		}
	});
}

function apps_ready_language() {
	apps_load_en_language();
	apps_load_language();
	apps_language();
}