/**
 * Main
 * ====
 *
 * Code of the Demo
 *
 * This demo includes npg library (notpygamejs) that I wrote a while ago. It can
 * be found on my Github page (https://github.com/karpathy/notpygamejs). It's a
 * quick and dirty canvas wrapper that has some helped functions I use often.
 * It's main use is to contain a main loop and expose methods update(), draw(),
 * as well as some events keyUp(), mouseClick() etc.
 */

 var N;// = 10;   // number of data points
 var data = [];   // = new Array(N);
 var labels = []; // = new Array(N);
 var forest = new forestjs.RandomForest();
 var dirty = true;
 var ss = 50; // scaling factor for drawing
 var density = 10; // density of drawing. Decrease for higher resolution (but slower)
 var avgerr = 0;
 var drawSoft = true;
 var options = {
   type: 1
 };


/**
 * [myinit description]
 * Initialized call from NPG
 *
 * @return {[type]} [description]
 */
function myinit(){

  var email = prompt('[CrowdProcess] E-Mail:');
  var password = prompt('[CrowdProcess] Password:');

  if (email && password) {
    options.email = email;
    options.password = password;
  }

  data[0] = [-0.4326,  1.1909 ];
  data[1] = [1.5,       3.0];
  data[2] = [0.1253, -0.0376   ];
  data[3] = [0.2877,   0.3273  ];
  data[4] = [-1.1465,   0.1746 ];
  data[5] = [1.8133,   2.1139  ];
  data[6] = [2.7258,   3.0668  ];
  data[7] = [1.4117,   2.0593  ];
  data[8] = [4.1832,   1.9044  ];
  data[9] = [1.8636,   1.1677  ];
  data[10] = [-0.5 ,   -0.5  ];
  data[11] = [1.0 ,   2.0 ];
  data[12] = [1.0 ,   -1.0 ];

  labels[0] = 1;
  labels[1] = 1;
  labels[2] = 1;
  labels[3] = 1;
  labels[4] = 1;
  labels[5] = -1;
  labels[6] = -1;
  labels[7] = -1;
  labels[8] = -1;
  labels[9] = -1;
  labels[10] = -1;
  labels[11] = 1;
  labels[12] = 1;

  N = data.length;

  retrain();
}

/**
 * [retrain description]
 *
 * @return {[type]} [description]
 */
function retrain(){
  if (!options.email) {
    forest.train(data, labels, options);
    dirty = true;
  } else {
    dirty = false;
    forest.trainCRP(data, labels, options).on('end', function(){
      dirty = true;
    })
  }
}

/**
 * [draw description]
 */
function draw(){
  if (!dirty) {
    return;
  }

  ctx.clearRect(0,0,WIDTH,HEIGHT);

  // draw decisions in the grid
  for (var x = 0; x <= WIDTH; x += density) {
    for (var y = 0; y <= HEIGHT; y += density) {
      var dec = forest.predictOne([(x-WIDTH/2)/ss, (y-HEIGHT/2)/ss]);
      if (!drawSoft) {
        if (dec > 0.5) {
          ctx.fillStyle = 'rgb(150,250,150)';
        } else {
          ctx.fillStyle = 'rgb(250,150,150)';
        }
      } else {
        var ri = 250*(1-dec) + 150*dec;
        var gi = 250*dec + 150*(1-dec);
        ctx.fillStyle = 'rgb('+Math.floor(ri)+','+Math.floor(gi)+',150)';
      }
      ctx.fillRect(x-density/2-1, y-density-1, density+2, density+2);
    }
  }

  // draw axes
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(50,50,50)';
  ctx.lineWidth = 1;
  ctx.moveTo(0, HEIGHT/2);
  ctx.lineTo(WIDTH, HEIGHT/2);
  ctx.moveTo(WIDTH/2, 0);
  ctx.lineTo(WIDTH/2, HEIGHT);
  ctx.stroke();

  // draw datapoints.
  ctx.strokeStyle = 'rgb(0,0,0)';
  for(var i=0;i<N;i++) {
    if(labels[i]==1) ctx.fillStyle = 'rgb(100,200,100)';
    else ctx.fillStyle = 'rgb(200,100,100)';
    drawCircle(data[i][0]*ss+WIDTH/2, data[i][1]*ss+HEIGHT/2, 5);
  }

  ctx.fillStyle= 'rgb(0,0,0)';
  ctx.fillText("Average error: " + avgerr.toPrecision(4), 10, HEIGHT-30);
  dirty= false;
}

function mouseClick (x, y, shiftPressed) {
  // add datapoint at location of click
  data[N] = [(x-WIDTH/2)/ss, (y-HEIGHT/2)/ss];
  labels[N] = shiftPressed ? 1 : -1;
  N += 1;
  retrain();
}

function keyUp(key){
  if(key == 82) { // 'r'
    retrain();
  }
}

// UI stuff
function refreshTrees(event, ui) {
  var numTrees = Math.floor(ui.value);
  $("#treesreport").text("number of trees = " + numTrees);
  options.numTrees= numTrees;
  retrain();
}

function refreshDepth(event, ui) {
  var maxDepth = Math.floor(ui.value);
  $("#depthreport").text("max depth = " + maxDepth);
  options.maxDepth = maxDepth;
  retrain();
}

function refreshTries(event, ui) {
  var tries = Math.floor(ui.value);
  $("#triesreport").text("hypotheses / node = " + tries);
  options.numTries = tries;
  retrain();
}

$(function() {

  $("#slider1").slider({
      orientation: "horizontal",
      slide: refreshTrees,
      max: 200,
      min: 1,
      step: 1,
      value: 100
  });

  $("#slider2").slider({
      orientation: "horizontal",
      slide: refreshDepth,
      max: 12,
      min: 2,
      step: 1,
      value: 4
  });

  $("#slider3").slider({
      orientation: "horizontal",
      slide: refreshTries,
      max: 50,
      min: 1,
      step: 1,
      value: 10
  });

  NPGinit(10);
});

function update(){/** stub **/}
function keyDown(key){/** stub **/}
