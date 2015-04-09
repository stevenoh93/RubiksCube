var reader;

function checkFileAPI() {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        return true; 
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}

function readText() {
	var filePath = document.getElementById("filepath");
	var output = "";
    if(filePath.files && filePath.files[0]) {           
        reader.onload = function (e) {
            output = e.target.result;
            parseResult(output);
        };
        reader.readAsText(filePath.files[0]);
    }
}

function exportCube() {
	var textToWrite = rotHistory.toString();
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = "exportCube.cubestate";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = function(event) {document.body.removeChild(event.target);}
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function parseResult(result) {
	boxes = [];
	rotHistory = [];
	drawScene();
	var list = result.split(",");
	var i=0;
	var intervalFunc = setInterval( function() {
		selectBox(Number(list[i]), Number(list[i+1]));
		i+=2;
		if (i > list.length-1)
			clearInterval(intervalFunc);
	} , 600 );
}