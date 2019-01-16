
var textarea;
var button;

var save =
{

	"names": ["Period 1","Period 2","Period 3","Period 4","Period 5","Period 6","Period 7","Period 8"],
	"types": [0,0,0,0,0,0,0,0],
	"rooms": ["","","","","","","",""]

}

window.onload = function()
{

	textarea = document.getElementById("text");
	button = document.getElementById("button");

	chrome.storage.sync.get(["save"], function(result)
	{

		if (result.save != null)
		{

			save = JSON.parse(result.save);

		}

	});

	HTTPRequest("https://ospangler.github.io/SHSS/schedulechangedatabase_v1.json").then(function(result)
	{

		textarea.value = result;

	}, function(reject)
	{

		console.log(reject);

	});

}

function savedata()
{

	chrome.storage.sync.set({"save": JSON.stringify(save)}, function()
	{



	});

}

function HTTPRequest(URL)
{

	return new Promise(function(Resolve, Reject)
	{

		var XMLHTTP = new XMLHttpRequest();

		XMLHTTP.open("GET", URL);
		XMLHTTP.send();

		XMLHTTP.onload = function()
		{

			if (XMLHTTP.status == 200) Resolve(XMLHTTP.response);
			else Reject(XMLHTTP.statusText);

		}

	});

}