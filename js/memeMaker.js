console.log('Hi from memeMaker.js');

function textChangeListener (evt)
{
	var id = evt.target.id;
	var text = evt.target.value;
	if (id == "topLineText")
	{window.topLineText = text;}
	else
	{window.bottomLineText = text;}
	redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine)
{
	// Get Canvas2DContext
    var theCanvas = document.querySelector('canvas');
    var context = theCanvas.getContext("2d");
    var meme = new Image();
    //console.log('image: ' + image);
    // Your code here
    if (topLine == null)
    {topLine = '';}
	if (bottomLine == null)
    {bottomLine = '';}
	
    console.log('topLine: ' + topLine);
    console.log('bottomLine: ' + bottomLine);
    context.drawImage(image, 0, 0, theCanvas.width, theCanvas.height);

    context.font = "25pt Impact";
	context.textAlign = "center";
	context.fillStyle = "white";
	context.strokeStyle = "black";
	context.lineWidth = 3;
	context.fillText(topLine, theCanvas.width/2, 30);
	context.strokeText(topLine, theCanvas.width/2, 30);

	context.fillText(bottomLine, theCanvas.width/2, 140);
	context.strokeText(bottomLine, theCanvas.width/2, 140);

    meme.onload = function(){
		console.log('Image loaded');
		context.drawImage(image, 0, 0, theCanvas.width, theCanvas.height);
		var savedImage = theCanvas.toDataURL();
		window.open(savedImage);
	}
}

function saveFile() 
{
  	window.open(document.querySelector('canvas').toDataURL());
}

function handleFileSelect(evt) 
{
  	var canvasWidth = 500;
  	var canvasHeight = 500;
  	var file = evt.target.files[0];
  	var reader = new FileReader();
  	reader.onload = function(fileObject) 
  	{
  		console.log('File loaded');
  		var data = fileObject.target.result;

        // Create an image object
        var image = new Image();

        image.onload = function()
        {
        	window.imageSrc = this;
        	redrawMeme(window.imageSrc, null, null);
        }        
        // Set image data to background image.
        image.src = data;
        //console.log(fileObject.target.result);
    };
    reader.readAsDataURL(file)
}

function iniciar(){
	window.topLineText = "";
	window.bottomLineText = "";
	var input1 = document.getElementById('topLineText');
	var input2 = document.getElementById('bottomLineText');
	input1.oninput = textChangeListener;
	input2.oninput = textChangeListener;
	document.getElementById('file').addEventListener('change', handleFileSelect, false);
	document.querySelector('button').addEventListener('click', saveFile, false);
}
window.addEventListener('load', iniciar, false);

