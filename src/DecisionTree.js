/**
 * DecisionTree
 * ============
 *
 *
 */

/**
 * represents a single decision tree
 */
export default class DecisionTree {

	/**
	 * [constructor description]
	 *
	 * @param  {[type]} serial [description]
	 * @return {[type]}        [description]
	 */
	constructor (serial = {}) {
		if (typeof serial === 'string') {
			serial = JSON.parse(serial)
		}
		for (var key of Object.keys(serial)) {
			this[key] = serial[key]
		}
		if (!this.trainFun) {
			this.trainFun = (this.weakType === 0) ? decisionStumpTrain : decision2DStumpTrain;
		}
		if (!this.testFun) {
			this.testFun = (this.weakType === 0) ? decisionStumpTest : decision2DStumpTest;
		}
	}

	/**
	 * [train description]
	 *
	 * @param  {Array}   data    -
	 * @param  {Array}   labels  -
	 * @param  {Object]} options -
	 */
	train (data, labels, options = {}) {

    var maxDepth = options.maxDepth || 4;
    var weakType = options.type || 0;

    var trainFun = options.trainFun || decision2DStumpTrain;
    var testFun = options.testFun || decision2DStumpTest;

    if (weakType == 0) {
      trainFun = decisionStumpTrain;
      testFun = decisionStumpTest;
    }
    if (weakType == 1) {
      trainFun = decision2DStumpTrain;
      testFun = decision2DStumpTest;
    }

    // initialize various helper variables
    var numInternals = Math.pow(2, maxDepth) - 1;
    var numNodes = Math.pow(2, maxDepth + 1) - 1;
    var ixs = new Array(numNodes); // 31 -> 2^5 -1
		// console.log(numNodes, maxDepth);
		// debugger
    for (var i = 1; i < ixs.length; i++) {
			ixs[i] = [];
		}
    ixs[0] = new Array(labels.length);
    for (var i = 0; i < labels.length; i++) {
			ixs[0][i] = i; // root node starts out with all nodes as relevant
		}
    var models = new Array(numInternals);

    // train
    for (var n = 0; n < numInternals; n++) {

      // few base cases
      var ixhere= ixs[n];
      if (ixhere.length == 0) {
				continue;
			}
      if (ixhere.length == 1) {
				ixs[n*2+1] = [ixhere[0]];
				continue;
			} // arbitrary send it down left

      // learn a weak model on relevant data for this node
      var model = trainFun(data, labels, ixhere);

      models[n] = model; // back it up model

      // split the data according to the learned model
      var ixleft = [];
      var ixright = [];

			for (var i = 0; i < ixhere.length; i++) {
        var label = testFun(data[ixhere[i]], model);
        if (label === 1) {
					ixleft.push(ixhere[i]);
				} else {
					ixright.push(ixhere[i]);
				}
      }
      ixs[n*2+1] = ixleft;
      ixs[n*2+2] = ixright;
    }

    // compute data distributions at the leafs
    var leafPositives = new Array(numNodes);
    var leafNegatives = new Array(numNodes);
    for (var n = numInternals; n < numNodes; n++) {
      var numones = 0;
      for(var i = 0; i < ixs[n].length; i++) {
        if (labels[ixs[n][i]] === 1) {
					numones+=1;
				}
      }
      leafPositives[n] = numones;
      leafNegatives[n] = ixs[n].length - numones;
    }

    // back up important prediction variables for predicting later
    this.models = models;
    this.leafPositives = leafPositives;
    this.leafNegatives = leafNegatives;
    this.maxDepth = maxDepth;
		this.weakType = weakType;
    this.trainFun = trainFun;
    this.testFun = testFun;
	}

	/**
	 * [predictOne description]
	 * returns probability that example inst is 1.
	 *
	 * @param  {Array}  inst -
	 * @return {Number}
	 */
	predictOne (inst) {
		var n = 0;
		for (var i = 0; i < this.maxDepth;i++) {
			var dir = this.testFun(inst, this.models[n]);
			if (dir === 1) {
				n = n*2+1; // descend left
			} else {
				n = n*2+2; // descend right
			}
		}
		return (this.leafPositives[n] + 0.5) / (this.leafNegatives[n] + 1.0); // bayesian smoothing!
	}
}

/**
 * [decisionStumpTrain description]
 * returns model
 *
 * @param  {Array}  data    -
 * @param  {Array}  labels  -
 * @param  {Array}  ix      -
 * @param  {Object} options -
 * @return {Object}
 */
function decisionStumpTrain (data, labels, ix, options = {}) {

  var numtries = options.numTries || 10;

  // choose a dimension at random and pick a best split
  var ri = randi(0, data[0].length);
  var N = ix.length;

  // evaluate class entropy of incoming data
  var H = entropy(labels, ix);
  var bestGain = 0;
  var bestThr = 0;
  for (var i = 0; i < numtries; i++) {

    // pick a random splitting threshold
    var ix1 = ix[randi(0, N)];
    var ix2 = ix[randi(0, N)];
    while (ix2 == ix1) {
			ix2 = ix[randi(0, N)]; // enforce distinctness of ix2
		}

    var a = Math.random();
    var thr = data[ix1][ri]*a + data[ix2][ri]*(1-a);

    // measure information gain we'd get from split with thr
    var l1 = 1, r1 = 1, lm1 = 1, rm1 = 1; //counts for Left and label 1, right and label 1, left and minus 1, right and minus 1
    for (var j = 0; j < ix.length; j++) {
      if(data[ix[j]][ri] < thr) {
        if (labels[ix[j]] == 1) {
					l1++;
				} else {
					lm1++;
				}
      } else {
        if (labels[ix[j]] == 1) {
					r1++;
				} else {
					rm1++;
				}
      }
    }

    var t = l1+lm1;  // normalize the counts to obtain probability estimates
    l1 =l1/t;
    lm1 =lm1/t;
    t = r1+rm1;
    r1 =r1/t;
    rm1 = rm1/t;

    var LH = -l1*Math.log(l1) -lm1*Math.log(lm1); // left and right entropy
    var RH = -r1*Math.log(r1) -rm1*Math.log(rm1);

    var informationGain = H - LH - RH;
    //console.log("Considering split %f, entropy %f -> %f, %f. Gain %f", thr, H, LH, RH, informationGain);
    if (informationGain > bestGain || i === 0) {
      bestGain = informationGain;
      bestThr = thr;
    }
  }

  return { // model
		ri,
		thr: bestThr
	};
}

/**
 * [decisionStumpTest description]
 * returns a decision for a single data instance
 *
 * @param  {Arrat}  inst  -
 * @param  {Object} model -
 * @return {Number}
 */
function decisionStumpTest (inst, model) {
  if (!model) {
    // this is a leaf that never received any data...
    return 1;
  }
  return inst[model.ri] < model.thr ? 1 : -1;
}

/**
 * [decision2DStumpTrain description]
 * returns model. Code duplication with decisionStumpTrain :(
 *
 * @param  {Array} data     -
 * @param  {Array} labels   -
 * @param  {Array} ix       -
 * @param  {Object} options -
 * @return {Object}         - model
 */
function decision2DStumpTrain (data, labels, ix, options = {}) {

  var numtries = options.numTries || 10;

  // choose a dimension at random and pick a best split
  var N = ix.length;

  var ri1 = 0;
  var ri2 = 1;

	if (data[0].length > 2) {
    // more than 2D data. Pick 2 random dimensions
    ri1 = randi(0, data[0].length);
    ri2 = randi(0, data[0].length);
    while (ri2 == ri1) {
			ri2 = randi(0, data[0].length); // must be distinct!
		}
  }

  // evaluate class entropy of incoming data
  var H = entropy(labels, ix);
  var bestGain = 0;
  var bestw1, bestw2, bestthr;
  var dots = new Array(ix.length);

	for (var i = 0; i < numtries; i++) {

    // pick random line parameters
    var alpha = randf(0, 2*Math.PI);
    var w1 = Math.cos(alpha);
    var w2 = Math.sin(alpha);

    // project data on this line and get the dot products
    for (var j = 0; j < ix.length; j++) {
      dots[j] = w1*data[ix[j]][ri1] + w2*data[ix[j]][ri2];
    }

    // we are in a tricky situation because data dot product distribution
    // can be skewed. So we don't want to select just randomly between
    // min and max. But we also don't want to sort as that is too expensive
    // let's pick two random points and make the threshold be somewhere between them.
    // for skewed datasets, the selected points will with relatively high likelihood
    // be in the high-desnity regions, so the thresholds will make sense
    var ix1 = ix[randi(0, N)];
    var ix2 = ix[randi(0, N)];
    while (ix2 == ix1) {
			ix2= ix[randi(0, N)]; // enforce distinctness of ix2
		}
    var a = Math.random();
    var dotthr = dots[ix1]*a + dots[ix2]*(1-a);

    // measure information gain we'd get from split with thr
    var l1 = 1, r1 = 1, lm1 = 1, rm1 = 1; //counts for Left and label 1, right and label 1, left and minus 1, right and minus 1
    for (var j = 0; j < ix.length; j++) {
      if (dots[j] < dotthr) {
        if (labels[ix[j]] == 1) {
					l1++;
				} else {
					lm1++;
				}
      } else {
        if (labels[ix[j]] == 1) {
					r1++;
				} else {
					rm1++;
				}
      }
    }
    var t = l1+lm1;
    l1 = l1/t;
    lm1 = lm1/t;
    t = r1+rm1;
    r1 = r1/t;
    rm1 = rm1/t;

    var LH = -l1*Math.log(l1) -lm1*Math.log(lm1); // left and right entropy
    var RH = -r1*Math.log(r1) -rm1*Math.log(rm1);

    var informationGain = H - LH - RH;
    //console.log("Considering split %f, entropy %f -> %f, %f. Gain %f", thr, H, LH, RH, informationGain);
    if (informationGain > bestGain || i === 0) {
      bestGain= informationGain;
      bestw1= w1;
      bestw2= w2;
      bestthr= dotthr;
    }
  }

  return { // model
		w1: bestw1,
		w2: bestw2,
		dotthr: bestthr
	};
}

/**
 * [decision2DStumpTest description]
 * returns label for a single data instance
 *
 * @param  {Array}  inst  -
 * @param  {Object} model -
 * @return {Number}
 */
function decision2DStumpTest (inst, model) {
  if (!model) {
    // this is a leaf that never received any data...
    return 1;
  }
  return inst[0]*model.w1 + inst[1]*model.w2 < model.dotthr ? 1 : -1;
}

/**
 * [entropy description]
 * Misc utility functions
 *
 * @param  {String} labels -
 * @param  {Array}  ix     -
 * @return {Number}
 */
function entropy (labels, ix) {
  var N = ix.length;
  var p = 0;
  for (var i = 0; i < N; i++) {
    if (labels[ix[i]] == 1) {
			p += 1;
		}
  }
  p = (1+p)/(N+2); // let's be bayesian about this
  var q = (1+N-p)/(N+2);
  return (-p*Math.log(p) -q*Math.log(q));
}

/**
 * [randf description]
 * generate random floating point number between a and b
 *
 * @param  {Number} a -
 * @param  {Number} b -
 * @return {Number}
 */
function randf (a, b) {
  return Math.random()*(b-a)+a;
}

/**
 * [randi description]
 * generate random integer between a and b (b excluded)
 *
 * @param  {Number} a -
 * @param  {Number} b -
 * @return {Number}
 */
function randi (a, b) {
  return Math.floor(Math.random()*(b-a)+a);
}
