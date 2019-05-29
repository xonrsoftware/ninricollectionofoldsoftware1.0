function download(filename, text,memtype) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:'+memtype+';charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}
Dropzone.options.dropzoneform = {
init: function() {
		thisDropzone = this;
		this.on("success", function(file, responseText) {

			download(file.name.replace(/\.[^/.]+$/, "")+"_TTSDECK.json",responseText,"application/json");
			
			//alert(responsejs["success"]); // console should show the ID you pointed to
			// do stuff with file.id ...
		});
	}
};
// this is the id of the form
$( document ).ready(function() {
    var frm = $('#generateboosters');

    frm.submit(function (e) {

        e.preventDefault();
document.getElementById("errorboosters").style.display = "none";
document.getElementById("boosterloader").style.display = "block";
document.getElementById("smboosters").disabled = true;
        $.ajax({
            type: frm.attr('method'),
            url: frm.attr('action'),
            data: frm.serialize(),
            success: function (data) {
download("BOOSTERS_TTS.json",data,"application/json");
document.getElementById("boosterloader").style.display = "none";
document.getElementById("smboosters").disabled = false;
            },
            error: function (data) {
			document.getElementById("errorboosters").style.display = "block";
			$("#errorboostersinner").html(data.responseText);
			document.getElementById("boosterloader").style.display = "none";
			document.getElementById("smboosters").disabled = false;
            },
        });
    });
	});