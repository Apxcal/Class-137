statuss="";
objects=[];
value=""
speechSynthesis="";

function setup(){
    canvas=createCanvas(580, 480);
    canvas.center;
    video=createCapture(VIDEO);
    video.size(580, 480);
    video.hide();
}

function preload(){
}

function draw(){
    image(video, 0, 0, 580, 480);
    if(statuss != "true"){
        fill(255, 0, 0);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == value){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status2").innerHTML="Object Mentioned Found";
                speak();
            }
            else{
                document.getElementById("status2").innerHTML="Object Mentioned Not Found";
            }
    }
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    value=document.getElementById("input").text;
    objectDetector.detect(video, gotResult);
}

function modelLoaded(){
    console.log("Model is Loaded.");
    statuss="true";
}

function gotResukt(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function speak(){
    synth=window.speechSynthesis;
    utterThis=new SpeechSynthesisUtterance(objects[i].label);
    synth.speak(utterThis);
}