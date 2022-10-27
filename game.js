document.addEventListener("DOMContentLoaded", function () {
  let wasShot = false
  let shotsFired = 0
  let totalDucks = 0
  let Hits = 0
  var speed = 9
  let hitAccuracy = 0
  var minus = 76
  /*  Declaring variables */
  window.scrollbars = false;
  scoreBoard()
  var bg = document.getElementById("div1");
  /* bg.id = "div1" */
  /* custom crosshair cursor */
  bg.style.cursor = "url('9Tpbo9enc.png')";
  bg.style.width = "100%";
  bg.style.border = "1px solid blue";
  bg.style.height = "100%";
  bg.style.userSelect = "none";
  bg.src = "enlarge_6.png";
  bg.style.backgroundSize = "auto";
  bg.style.position = "sticky";
  bg.style.top = "0px";
  bg.style.left = "0px";
  let doggle = document.getElementById("dog")
  doggle.style.position = 'absolute';
  doggle.style.bottom = '10px';
  doggle.style.left = '45%';
  doggle.style.marginLeft = '-40px';

  /*     Checking for mouseclick on the background image */
  bg.addEventListener("click", function () {
    /*    used for calculating the scoreBoard */
    /* record each shot */
    let shots = (shotsFired = shotsFired + 1);
    /*  store data in session Storage */
    sessionStorage.setItem("fired", shots)
    /*    scoreBoard(0) */

    /* missed shot */
    if (wasShot = true) {
      minus = 400
      let beat2 = new Audio("Duck Hunt SFX (11).wav");
      beat2.play();
      let beat3 = new Audio("gun.wav");
      beat3.play();
      /*     some animation for the doggo */
      document.getElementById("dog").style.visibility = "visible"
      document.getElementById("dog").style.opacity = "10%"
      document.getElementById("dog").style.animation = "fadeIn 1s"
      document.getElementById("dog").style.animationDelay = "1s"
      document.getElementById("dog").style.animationFillMode = "both"

      wasShot = true

    } else {
      minus = 76
      beat2.pause()

      wasShot = false
    }




  });

  /* document.body.appendChild(bg); */
  let doggo = document.getElementById("dog")
  doggo.addEventListener("click", function () {

    let ruff = new Audio("Duck Hunt SFX (5).wav");

    ruff.play();
  });

  document.body.oncontextmenu = function (event) {
    event.preventDefault();
    var clay = document.createElement("div");
    clay.style.width = "0px";
    clay.style.height = "0px";
    clay.style.margin = "0px"
    clay.style.padding = "0px"
    /*   clay.style.backgroundColor = 'transparent';
clay.style.backgroundColor = "rgba(0, 0, 0, 0.30)";  */
    clay.style.position = "absolute";
    clay.style.top = event.clientY + "px"
    clay.style.border = "none"
    clay.style.left = event.clientX + "px"
    clay.contentEditable = false;
    clay.draggable = false
    document.body.appendChild(clay);
    /* counting ducks spawns */
    let ducks = (totalDucks = totalDucks + 1);
    /* storing data */
    sessionStorage.setItem("ducksspawned", ducks)
    var mouseDown = false;
    document.body.onmousedown = function () {
      mouseDown = true;

    };
    document.body.onmouseup = function () {
      mouseDown = false;
    };
    document.body.onmousemove = function (event) {
      if (event.button == 2) {
        clay.style.top = event.clientY + "px";
        clay.style.left = event.clientX + "px";
      }
    };
    var x = 0;
    var y = 0;
    var dx = 1;
    var dy = 1;
    setInterval(function () {
      clay.style.top = parseInt(clay.style.top) + dy + "px";
      clay.style.left = parseInt(clay.style.left) + dx + "px";
      if (parseInt(clay.style.top) < 0) {
        dy = 1;
      }
      if (parseInt(clay.style.top) > window.innerHeight - 120) {
        dy = -1;

      }
      /* if duck  is at edge of screen send the other way */
      if (parseInt(clay.style.left) < 70) {
        dx = 1;
        /* use css to flip duck */
        clay.style.transform = "scaleX(1)"
      }
      /* if duck  is at edge of screen send the other way */
      if (parseInt(clay.style.left) > window.innerWidth - 120) {
        dx = -1;
        /* use css to flip duck */
        clay.style.transform = "scaleX(-1)"
      }
    }, Math.floor(Math.random() * speed) + 1);
    var duck = document.createElement("img");
    duck.className = "target";

    duck.style.position = "absolute";
    duck.style.top = "0px";
    duck.style.left = "0px";
    duck.style.margin = "0px";
    duck.style.padding = "0px";
    duck.style.width = "70px";
    duck.style.height = "70px";
    duck.style.textAlign = "center";
    duck.style.alignSelf = "center";
    duck.style.backgroundSize = "60px 60px";
    duck.style.borderRadius = "50px"
    duck.style.fontSize = "10px";
    duck.style.fontWeight = "5";
    duck.style.contentEditable = "false";
    duck.style.cursor = "url('https://web06.scwebsrv.com/Duck%20Hunter/crosshair.png'), url('crosshair.png'), default"
    duck.style.userSelect = "none";
    duck.style.border = "none"
    duck.onclick = function () {
      /* on clicking on a duck to delete the img */
      document.body.removeChild(clay);
      wasShot = false
      /*     recording hits */
      let tally = (Hits = Hits + 1);
      /* store data */
      sessionStorage.setItem("dh", tally)
      /* call scoreboard function */
      scoreBoard()
      let beat = new Audio("gun.wav");
      document.getElementById("div1").style.background = "none";
      beat.play();
      /* if the audio is playing kinda a weirf way to do it */
      if ((beat.play = true)) {
        /* spawn ducks in a hacky way */
        rightClick(Math.floor(Math.random()) - event.clientX, Math.random() - event.clientY)
        document.getElementById("dog").style.visibility = "hidden"
        let beat1 = new Audio("Duck Hunt SFX (4).wav");
        beat1.play();


      } else {


      }


    };
    clay.appendChild(duck);
  };
});





function sleep(milliseconds) {
  return new Promise((resolve) =>
    setTimeout(resolve, milliseconds)
  );
}



function rightClick(x, y) {
  var evt = new MouseEvent("contextmenu", {
    bubbles: true,
    cancelable: true,
    view: window,
    button: 2,
    buttons: 2,
    clientX: x,
    clientY: y
  });
  document.body.dispatchEvent(evt);
}




/*   This plays the background music */
function playMusic() {
  let st = new Audio("st.mp3");
  st.play();
  st.loop = true

}

/* 
  This Resets the store and scoreboard */
function reset() {

  sessionStorage.clear
  let shotsFired = 0
  let totalDucks = 0
  let Hits = 0
  console.log("reset")
  sessionStorage.removeItem("dh")
  sessionStorage.removeItem("fired")
  sessionStorage.removeItem("ducksspawned")
  location.reload(true);
  /*     document.getElementById("dog").style.opacity = "10%"
      document.getElementById("dog").style.visibility = "visible" */
}


function start() {
  let shotsFired = 0
  let totalDucks = 0
  let Hits = 0
  console.log("reset")
  sessionStorage.setItem("dh", 0)
  sessionStorage.setItem("fired", 0)
  sessionStorage.setItem("ducksspawned", 0)
  rightClick(-500, -100)
  rightClick(+600, -700)
  rightClick(-500, -100)
  rightClick(+300, -900)
  rightClick(-900, -600)
  rightClick(+500, -800)
  let splash = document.getElementById("splash1")
  splash.style.display = "none"
  playMusic()
}



/* setInterval(, 10000); */
var minus = 0
/* 
This function generates all the data for the scoreBoard */
function scoreBoard() {




  let hitX = sessionStorage.getItem("dh")
  let shotsMissed = sessionStorage.getItem("fired")
  let duckies = sessionStorage.getItem("ducksspawned")
  let totalScore = (parseInt(200) + parseInt(hitX) - parseInt(shotsMissed) + parseInt(duckies + 76))
  var total = parseInt(totalScore = totalScore)
  let shotsFired = (parseInt(hitX) + parseInt(shotsMissed))
  let hitAccuracy = (parseInt(hitX / shotsFired * 100))

  document.getElementById("score").innerText = "Hits: " + hitX + ("\n") + " shots Missed: " + shotsMissed + ("\n") + "Hit Accuracy: " + hitAccuracy + ("\n") + "Total Score: " + parseInt(total - minus)



  if (totalScore < 10) {
    totalScore = totalScore + 10

  }

  if (totalScore > 876 && totalScore < 900) {
    let dom2 = new Audio("firstblood.wav");
    dom2.play();
  } else if (totalScore > 976 && totalScore < 977) {
    let dom2 = new Audio("firstblood.wav");
    dom2.play();
  }

  if (totalScore > 5000 && totalScore < 5100) {
    speed = 1
    console.log("godlike")
    let dom = new Audio("dominating.wav");
    dom.play();
  } else if (totalScore > 8000 && totalScore < 8100) {

    let dom2 = new Audio("ownage.wav");
    dom2.play();

  }


  if (totalScore > 10000 && totalScore < 10120) {
    console.log("hs")

    let dom4 = new Audio("holyshit.wav");
    dom4.play();
  } else if (totalScore > 15000 && totalScore < 15110) {

    let dom5 = new Audio("unstoppable.wav");
    dom5.play();

  }

}


window.onload = function () {
  sessionStorage.clear
  let shotsFired = 0
  let totalDucks = 0
  let Hits = 0
  var speed = 9
  let hitAccuracy = 0
  console.log("reset")
  sessionStorage.removeItem("dh")
  sessionStorage.removeItem("fired")
  sessionStorage.removeItem("ducksspawned")
}
 /* function SplashScreen() {
 let splash = document.getElementById("splash1");
splash.style.display = "none";
/*   splash.style.position = 'absolute';
 splash.style.bottom = '10px';
 splash.style.left = '45%';
 splash.style.marginLeft = '-40px';
 splash.style.backgroundColor = "blue";
 splash.style.width = "50%";
 splash.style.height = "50%";
*/







