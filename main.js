status_model = "";
objects = [];




function preload() {

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
}

function start() {

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function modelLoaded() {
    console.log("cocossd model is loaded");
    status_model = true;
    
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status_model != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("no_of_objects").innerHTML = "Number of Objects Detected are : "+objects.length;
            percent = floor(objects[i].confidence * 100);

            fill(r,g,b);
            noFill();
            text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 15);
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}
