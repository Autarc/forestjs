require("source-map-support").install();
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("util"), require("stream"), require("url"), require("http"), require("https"), require("querystring"), require("string_decoder"), require("buffer"), require("events"));
	else if(typeof define === 'function' && define.amd)
		define(["util", "stream", "url", "http", "https", "querystring", "string_decoder", "buffer", "events"], factory);
	else if(typeof exports === 'object')
		exports["forestjs"] = factory(require("util"), require("stream"), require("url"), require("http"), require("https"), require("querystring"), require("string_decoder"), require("buffer"), require("events"));
	else
		root["forestjs"] = factory(root["util"], root["stream"], root["url"], root["http"], root["https"], root["querystring"], root["string_decoder"], root["buffer"], root["events"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_26__, __WEBPACK_EXTERNAL_MODULE_35__, __WEBPACK_EXTERNAL_MODULE_36__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Index
	 * =====
	 *
	 * Export public API
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _DecisionTreeJs = __webpack_require__(1);
	
	var _DecisionTreeJs2 = _interopRequireDefault(_DecisionTreeJs);
	
	var _RandomForestJs = __webpack_require__(2);
	
	var _RandomForestJs2 = _interopRequireDefault(_RandomForestJs);
	
	exports['default'] = {
	  DecisionTree: _DecisionTreeJs2['default'],
	  RandomForest: _RandomForestJs2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * DecisionTree
	 * ============
	 *
	 *
	 */
	
	/**
	 * represents a single decision tree
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var DecisionTree = (function () {
	
	  /**
	   * [constructor description]
	   *
	   * @param  {[type]} serial [description]
	   * @return {[type]}        [description]
	   */
	
	  function DecisionTree() {
	    var serial = arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, DecisionTree);
	
	    if (typeof serial === 'string') {
	      serial = JSON.parse(serial);
	    }
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = Object.keys(serial)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var key = _step.value;
	
	        this[key] = serial[key];
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator['return']) {
	          _iterator['return']();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
	    if (!this.trainFun) {
	      this.trainFun = this.weakType === 0 ? decisionStumpTrain : decision2DStumpTrain;
	    }
	    if (!this.testFun) {
	      this.testFun = this.weakType === 0 ? decisionStumpTest : decision2DStumpTest;
	    }
	  }
	
	  _createClass(DecisionTree, [{
	    key: 'train',
	
	    /**
	     * [train description]
	     *
	     * @param  {Array}   data    -
	     * @param  {Array}   labels  -
	     * @param  {Object]} options -
	     */
	    value: function train(data, labels) {
	      var options = arguments[2] === undefined ? {} : arguments[2];
	
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
	        var ixhere = ixs[n];
	        if (ixhere.length == 0) {
	          continue;
	        }
	        if (ixhere.length == 1) {
	          ixs[n * 2 + 1] = [ixhere[0]];
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
	        ixs[n * 2 + 1] = ixleft;
	        ixs[n * 2 + 2] = ixright;
	      }
	
	      // compute data distributions at the leafs
	      var leafPositives = new Array(numNodes);
	      var leafNegatives = new Array(numNodes);
	      for (var n = numInternals; n < numNodes; n++) {
	        var numones = 0;
	        for (var i = 0; i < ixs[n].length; i++) {
	          if (labels[ixs[n][i]] === 1) {
	            numones += 1;
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
	  }, {
	    key: 'predictOne',
	
	    /**
	     * [predictOne description]
	     * returns probability that example inst is 1.
	     *
	     * @param  {Array}  inst -
	     * @return {Number}
	     */
	    value: function predictOne(inst) {
	      var n = 0;
	      for (var i = 0; i < this.maxDepth; i++) {
	        var dir = this.testFun(inst, this.models[n]);
	        if (dir === 1) {
	          n = n * 2 + 1; // descend left
	        } else {
	          n = n * 2 + 2; // descend right
	        }
	      }
	      return (this.leafPositives[n] + 0.5) / (this.leafNegatives[n] + 1.0); // bayesian smoothing!
	    }
	  }]);
	
	  return DecisionTree;
	})();
	
	exports['default'] = DecisionTree;
	
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
	function decisionStumpTrain(data, labels, ix) {
	  var options = arguments[3] === undefined ? {} : arguments[3];
	
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
	    var thr = data[ix1][ri] * a + data[ix2][ri] * (1 - a);
	
	    // measure information gain we'd get from split with thr
	    var l1 = 1,
	        r1 = 1,
	        lm1 = 1,
	        rm1 = 1; //counts for Left and label 1, right and label 1, left and minus 1, right and minus 1
	    for (var j = 0; j < ix.length; j++) {
	      if (data[ix[j]][ri] < thr) {
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
	
	    var t = l1 + lm1; // normalize the counts to obtain probability estimates
	    l1 = l1 / t;
	    lm1 = lm1 / t;
	    t = r1 + rm1;
	    r1 = r1 / t;
	    rm1 = rm1 / t;
	
	    var LH = -l1 * Math.log(l1) - lm1 * Math.log(lm1); // left and right entropy
	    var RH = -r1 * Math.log(r1) - rm1 * Math.log(rm1);
	
	    var informationGain = H - LH - RH;
	    //console.log("Considering split %f, entropy %f -> %f, %f. Gain %f", thr, H, LH, RH, informationGain);
	    if (informationGain > bestGain || i === 0) {
	      bestGain = informationGain;
	      bestThr = thr;
	    }
	  }
	
	  return { // model
	    ri: ri,
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
	function decisionStumpTest(inst, model) {
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
	function decision2DStumpTrain(data, labels, ix) {
	  var options = arguments[3] === undefined ? {} : arguments[3];
	
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
	    var alpha = randf(0, 2 * Math.PI);
	    var w1 = Math.cos(alpha);
	    var w2 = Math.sin(alpha);
	
	    // project data on this line and get the dot products
	    for (var j = 0; j < ix.length; j++) {
	      dots[j] = w1 * data[ix[j]][ri1] + w2 * data[ix[j]][ri2];
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
	      ix2 = ix[randi(0, N)]; // enforce distinctness of ix2
	    }
	    var a = Math.random();
	    var dotthr = dots[ix1] * a + dots[ix2] * (1 - a);
	
	    // measure information gain we'd get from split with thr
	    var l1 = 1,
	        r1 = 1,
	        lm1 = 1,
	        rm1 = 1; //counts for Left and label 1, right and label 1, left and minus 1, right and minus 1
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
	    var t = l1 + lm1;
	    l1 = l1 / t;
	    lm1 = lm1 / t;
	    t = r1 + rm1;
	    r1 = r1 / t;
	    rm1 = rm1 / t;
	
	    var LH = -l1 * Math.log(l1) - lm1 * Math.log(lm1); // left and right entropy
	    var RH = -r1 * Math.log(r1) - rm1 * Math.log(rm1);
	
	    var informationGain = H - LH - RH;
	    //console.log("Considering split %f, entropy %f -> %f, %f. Gain %f", thr, H, LH, RH, informationGain);
	    if (informationGain > bestGain || i === 0) {
	      bestGain = informationGain;
	      bestw1 = w1;
	      bestw2 = w2;
	      bestthr = dotthr;
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
	function decision2DStumpTest(inst, model) {
	  if (!model) {
	    // this is a leaf that never received any data...
	    return 1;
	  }
	  return inst[0] * model.w1 + inst[1] * model.w2 < model.dotthr ? 1 : -1;
	}
	
	/**
	 * [entropy description]
	 * Misc utility functions
	 *
	 * @param  {String} labels -
	 * @param  {Array}  ix     -
	 * @return {Number}
	 */
	function entropy(labels, ix) {
	  var N = ix.length;
	  var p = 0;
	  for (var i = 0; i < N; i++) {
	    if (labels[ix[i]] == 1) {
	      p += 1;
	    }
	  }
	  p = (1 + p) / (N + 2); // let's be bayesian about this
	  var q = (1 + N - p) / (N + 2);
	  return -p * Math.log(p) - q * Math.log(q);
	}
	
	/**
	 * [randf description]
	 * generate random floating point number between a and b
	 *
	 * @param  {Number} a -
	 * @param  {Number} b -
	 * @return {Number}
	 */
	function randf(a, b) {
	  return Math.random() * (b - a) + a;
	}
	
	/**
	 * [randi description]
	 * generate random integer between a and b (b excluded)
	 *
	 * @param  {Number} a -
	 * @param  {Number} b -
	 * @return {Number}
	 */
	function randi(a, b) {
	  return Math.floor(Math.random() * (b - a) + a);
	}
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * RandomForest
	 * ============
	 *
	 *
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _crowdprocess = __webpack_require__(3);
	
	var _crowdprocess2 = _interopRequireDefault(_crowdprocess);
	
	var _DecisionTree = __webpack_require__(1);
	
	var _DecisionTree2 = _interopRequireDefault(_DecisionTree);
	
	var _rawDecisionTreeJs = __webpack_require__(41);
	
	var _rawDecisionTreeJs2 = _interopRequireDefault(_rawDecisionTreeJs);
	
	/**
	 *
	 */
	
	var RandomForest = (function () {
		function RandomForest() {
			_classCallCheck(this, RandomForest);
		}
	
		_createClass(RandomForest, [{
			key: 'train',
	
			/**
	   * [train description]
	   *
	   *	data is 2D array of size N x D of examples
	   *	labels is a 1D array of labels (only -1 or 1 for now). In future will support multiclass or maybe even regression
	   *	options.numTrees can be used to customize number of trees to train (default = 100)
	   *	options.maxDepth is the maximum depth of each tree in the forest (default = 4)
	   *	options.numTries is the number of random hypotheses generated at each node during training (default = 10)
	   *		options.trainFun is a function with signature "function myWeakTrain(data, labels, ix, options)". Here, ix is a list of
	   *										indeces into data of the instances that should be payed attention to. Everything not in the list
	  	 *  									should be ignored. This is done for efficiency. The function should return a model where you store
	   *										variables. (i.e. model = {}; model.myvar = 5;) This will be passed to testFun.
	   *		options.testFun is a function with signature "funtion myWeakTest(inst, model)" where inst is 1D array specifying an example,
	   *										and model will be the same model that you return in options.trainFun. For example, model.myvar will be 5.
	   *										see decisionStumpTrain() and decisionStumpTest() downstairs for example.
	   *
	   * @param  {Array}  data    -
	   * @param  {Array}  labels  -
	   * @param  {Object} options -
	   */
			value: function train(data, labels) {
				var options = arguments[2] === undefined ? {} : arguments[2];
	
				this.numTrees = options.numTrees || 100;
				// initialize many trees and train them all independently
				this.trees = new Array(this.numTrees);
				for (var i = 0; i < this.numTrees; i++) {
					this.trees[i] = new _DecisionTree2['default']();
					this.trees[i].train(data, labels, options);
				}
			}
		}, {
			key: 'trainCRP',
	
			/**
	   * [trainCRP description]
	   *
	   * Modified train function for distributed computation
	   *
	   * @param  {Array}  data    - [description]
	   * @param  {Array}  labels  - [description]
	   * @param  {Object} options - [description]
	   * @return {Stream}           [description]
	   */
			value: function trainCRP(data, labels) {
				var _this = this;
	
				var options = arguments[2] === undefined ? {} : arguments[2];
	
				this.numTrees = options.numTrees || 100;
	
				// ignore local environment endpoint
				options.url = 'https://api.crowdprocess.com:443';
	
				if (!options.token && !options.email || !options.password) {
					throw new Error('Missing credentials!');
				}
	
				var dataset = JSON.stringify({ data: data, labels: labels, options: options });
				return (0, _crowdprocess2['default'])(options)(Array.apply(null, new Array(this.numTrees)).map(function () {
					return dataset;
				}), [// ~ program (incl. imports)
				_rawDecisionTreeJs2['default'], function Run(task) {
					var _JSON$parse = JSON.parse(task);
	
					var data = _JSON$parse.data;
					var labels = _JSON$parse.labels;
					var options = _JSON$parse.options;
	
					var tree = new _DecisionTree2['default']();
					tree.train(data, labels, options);
					return JSON.stringify(tree);
				}].map(function (fn) {
					return fn.toString();
				}).join('\n')
				/** webpack loader modified reference -> unformat inside the Run function.... **/
				.replace(/_DecisionTree2\['default'\]/g, 'DecisionTree'), function (results) {
					return _this.trees = results.map(function (result) {
						return new _DecisionTree2['default'](result);
					});
				}).on('error', console.error.bind(console));
			}
		}, {
			key: 'predictOne',
	
			/**
	   * [predictOne description]
	   * inst is a 1D array of length D of an example.
	   * returns the probability of label 1, i.e. a number in range [0, 1]
	   *
	   * @param  {Array}  inst -
	   * @return {Number}
	   */
			value: function predictOne(inst) {
				// have each tree predict and average out all votes
				var dec = 0;
				var num = this.trees.length;
				for (var i = 0; i < num; i++) {
					// ~ numTrees
					dec += this.trees[i].predictOne(inst);
				}
				return dec / num;
			}
		}, {
			key: 'predict',
	
			/**
	   * [predict description]
	   * convenience function. Here, data is NxD array.
	   * returns probabilities of being 1 for all data in an array.
	   *
	   * @param  {Array}  data -
	   * @return {Number}
	   */
			value: function predict(data) {
				var probabilities = new Array(data.length);
				for (var i = 0; i < data.length; i++) {
					probabilities[i] = this.predictOne(data[i]);
				}
				return probabilities;
			}
		}]);
	
		return RandomForest;
	})();
	
	exports['default'] = RandomForest;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(5);
	var JobClient = __webpack_require__(6);
	var StreamClient = __webpack_require__(16);
	var inherits = __webpack_require__(4).inherits;
	
	
	var Duplex = Stream.Duplex ||
	  __webpack_require__(29).Duplex;
	
	var PassThrough = Stream.PassThrough ||
	  __webpack_require__(29).PassThrough;
	
	module.exports = CrowdProcess;
	
	function CrowdProcess(username, password) {
	  var opts = {};
	  if (arguments.length === 1 &&
	      typeof arguments[0] === 'string') {
	    opts.token = arguments[0];
	  }
	
	  if (arguments.length === 1 &&
	      typeof arguments[0] === 'object') {
	    opts = arguments[0];
	  }
	
	  if (arguments.length === 2 &&
	      typeof arguments[0] === 'string' &&
	      typeof arguments[1] === 'string') {
	    opts.email = arguments[0];
	    opts.password = arguments[1];
	  }
	
	  var jobs = JobClient(opts);
	  var streams = StreamClient(opts);
	
	  function DuplexThrough(data, program, onResults) {
	    if (!(this instanceof DuplexThrough)) {
	      return new DuplexThrough(data, program, onResults);
	    }
	
	    var self = this;
	
	    var opts = {};
	
	    if (data instanceof Object &&
	        Object.getPrototypeOf(data) === Object.prototype) {
	      opts = data;
	    }
	
	    if (data instanceof Stream || data instanceof Array) {
	      opts.data = data;
	    }
	
	    if (data instanceof Function) {
	      opts.program = data.toString();
	    }
	
	    if (typeof data === 'string') {
	      opts.program = data;
	    }
	
	    if (Buffer.isBuffer(data)) {
	      opts.program = data.toString();
	    }
	
	    if (!opts.program &&
	        (program instanceof Function ||
	         typeof program === 'string' ||
	         Buffer.isBuffer(program))) {
	      opts.program = program;
	    }
	
	    if (!opts.mock &&
	        opts.program instanceof Function) {
	      opts.program = opts.program.toString();
	    }
	
	    if (Buffer.isBuffer(opts.program)) {
	      opts.program = opts.program.toString();
	    }
	
	    if (opts.program &&
	        !opts.data &&
	        program instanceof Function) {
	      opts.onResults = program;
	    }
	
	    if (onResults instanceof Function) {
	      opts.onResults = onResults;
	    }
	
	    opts.objectMode = true; // force objectMode
	
	    Duplex.call(this, opts);
	
	    this.opts = opts;
	
	    this.inRStream = new PassThrough(opts); // tasks
	    this.outWStream = new PassThrough(opts); // results
	
	    this.numTasks = 0;
	    this.numResults = 0;
	    this.bufferedResults = [];
	
	    this.on('pipe', function (src) {
	      src.on('end', function () {
	        self.inRStream.end();
	      });
	    });
	
	    this.on('end', function () {
	      self.inRStream.end();
	    });
	
	    if (opts.id) {
	      process.nextTick(function () {
	        onJobCreation(null, {
	          id: opts.id
	        });
	      });
	    } else if (opts.mock) {
	      process.nextTick(onJobCreation);
	    } else {
	      jobs.create({
	        program: opts.program,
	        group: opts.group,
	        bid: opts.bid
	      }, onJobCreation);
	    }
	
	    function onJobCreation (err, res) {
	      if (err) {
	        self.emit('error', err);
	        return;
	      }
	
	      if (!self.opts.mock) {
	        var id = res.id;
	        if (!self.opts.id) {
	          self.emit('created', id);
	        }
	        self.resultStream = streams(id).Results({ stream: true });
	        self.errorStream = streams(id).Errors({ stream: true });
	        self.taskStream = streams(id).Tasks();
	
	        self.inRStream.pipe(self.taskStream);
	        self.resultStream.pipe(self.outWStream);
	
	        self.errorStream.on('data', function (err) {
	          self.numResults++;
	          self.emit('error', err);
	          self._maybeClose();
	        });
	      }
	
	      if (self.opts.data instanceof Stream) {
	        self.opts.data.pipe(self);
	        self.opts.data.on('end', function () {
	          self.inRStream.end();
	          self.end();
	        });
	      }
	
	      if (self.opts.data instanceof Array) {
	        var data = self.opts.data;
	        var n = data.length;
	        for (var i = 0; i < n; i++) {
	          self.numTasks++;
	          if (data[i] === null) { // just so it doesn't close the stream!
	            self.inRStream.write(0);
	          } else {
	            self.inRStream.write(data[i]);
	          }
	        }
	        self.inRStream.end();
	        self.end();
	      }
	
	      if (self.opts.onResults) {
	        self.on('data', function (chunk) {
	          self.bufferedResults.push(chunk);
	        });
	      }
	
	      self.outWStream.on('readable', function () {
	        self._read(0);
	      });
	
	      self.outWStream.on('end', function () {
	        self.push(null);
	      });
	
	      if (self.opts.mock) {
	        var program = self.opts.program;
	
	        if (typeof program === 'string') {
	          throw new Error('In mock mode, your program has to be a function.');
	        }
	
	        self.inRStream.on('data', function (d) {
	          var result;
	          if (program.length === 2) {
	            program(d, onResult);
	          } else {
	            result = program(d);
	            onResult(result);
	          }
	
	          function onResult (result) {
	            process.nextTick(function () {
	              self.outWStream.write(result);
	            });
	          }
	        });
	      }
	    }
	  }
	
	  inherits(DuplexThrough, Duplex);
	
	  DuplexThrough.prototype._write = _write;
	  function _write (chunk, enc, cb) {
	    var self = this;
	    self.numTasks++;
	    if (self.inRStream.write(chunk)) {
	      cb();
	      self._maybeClose();
	    } else {
	      self.inRStream.once('drain', cb);
	    }
	  }
	
	  DuplexThrough.prototype._read = _read;
	  function _read (n) {
	    var self = this;
	    while (null !== (chunk = self.outWStream.read())) {
	      self.numResults++;
	      if (!self.push(chunk)) {
	        break;
	      }
	
	      self._maybeClose();
	    }
	  }
	
	  DuplexThrough.prototype._maybeClose = _maybeClose;
	  function _maybeClose () {
	    var self = this;
	    if (self.ended) {
	      return;
	    }
	
	    if (self._writableState.ended && self.numResults == self.numTasks) {
	      self.ended = true;
	      if (!self.opts.mock) {
	        self.resultStream.end();
	        self.errorStream.end();
	      }
	      self.inRStream.end();
	      self.push(null);
	      if (self.opts.onResults) {
	        self.opts.onResults(self.bufferedResults);
	      }
	    }
	  }
	
	  // legacy
	  DuplexThrough.map = DuplexThrough;
	
	  return DuplexThrough;
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("stream");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(7);
	var stream2Buffer = __webpack_require__(13);
	var extend = __webpack_require__(14);
	var config = __webpack_require__(15);
	
	var defaultOptions = {
	  url: config.server.url
	};
	
	exports =
	module.exports =
	function Client(options) {
	  if (!options)
	    options = {};
	  options = extend(extend({}, defaultOptions), options);
	
	  var defaultReqOpts = {
	    headers: {
	      "Content-Type": "application/json"
	    }
	  };
	
	  if (options.token)
	    defaultReqOpts.headers.Authorization = "token " + options.token;
	
	  if (options.email && options.password)
	    defaultReqOpts.headers.Authorization = "Basic "+
	      (new Buffer(options.email+':'+options.password)
	        .toString('base64'));
	
	  function jobs (jobId) {
	    return {
	      show: Show(options, defaultReqOpts, jobId),
	      destroy: Destroy(options, defaultReqOpts, jobId)
	    };
	  }
	
	  jobs.create = create;
	  function create(jobDoc, cb) {
	
	    var opts = extend({
	      uri: options.url + '/jobs'
	    }, defaultReqOpts);
	
	    var req = request.post(opts, function(err, res) {
	      if (err) {
	        throw new Error(err);
	      }
	
	      if (res.statusCode !== 201) {
	        err = new Error('Response status code is ' + res.statusCode);
	        err.status = res.statusCode;
	        return cb(err);
	      }
	      stream2Buffer(req, function (err, body) { // boyd:
	        if (err) {
	          throw new Error(err);
	        }
	        cb(err, JSON.parse(body.toString())); // {id: token}
	      });
	    });
	
	    req.write(JSON.stringify(jobDoc));
	    req.end();
	  }
	
	  jobs.list = list;
	  function list(cb) {
	    var opts = extend({
	      uri: options.url + '/jobs'
	    }, defaultReqOpts);
	
	    var req = request.get(opts, function(err, res) {
	      if (err)
	        return cb(err);
	
	      if (res.statusCode !== 200) {
	        err = new Error('Response status code is ' + res.statusCode);
	        err.status = res.statusCode;
	        return cb(err);
	      }
	
	      stream2Buffer(req, function (err, body) {
	        if (err)
	          throw new Error(err);
	
	        cb(null, JSON.parse(body.toString()));
	      });
	    });
	  }
	
	  jobs.listStream = listStream;
	  function listStream () {
	    var opts = extend({
	      uri: options.url + '/jobs?stream=true'
	    }, defaultReqOpts);
	
	    var req = request.get(opts);
	    return req;
	  }
	
	
	  jobs.purge = purge;
	  function purge(cb) {
	    var opts = extend({
	      uri: options.url + '/jobs',
	      method: 'DELETE'
	    }, defaultReqOpts);
	
	    var req = request.del(opts, function (err, res) {
	      if (err)
	        throw new Error(err);
	
	      if (res.statusCode != 204) {
	        err = new Error('Response status code is ' + res.statusCode);
	        err.status = res.statusCode;
	        return cb(err);
	      }
	
	      cb(null);
	    });
	  }
	
	  return jobs;
	};
	
	function Show (options, defaultReqOpts, jobId) {
	  return function show (cb) {
	    var opts = extend({
	      uri: options.url + '/jobs/' + jobId
	    }, defaultReqOpts);
	
	    var req = request.get(opts, function(err, res) {
	      if (err)
	        throw new Error(err);
	
	      if (res.statusCode !== 200) {
	        err = new Error('Response status code is ' + res.statusCode);
	        err.status = res.statusCode;
	        return cb(err);
	      }
	
	      stream2Buffer(req, function (err, body) {
	        if (err)
	          throw new Error(err);
	
	        cb(err, JSON.parse(body.toString()));
	      });
	    });
	  };
	}
	
	function Destroy (options, defaultReqOpts, jobId) {
	  return function destroy (cb) {
	    var opts = extend({
	      uri: options.url + '/jobs/' + jobId,
	      method: 'DELETE'
	    }, defaultReqOpts);
	
	    var req = request(opts, function (err, res) {
	      if (err)
	        throw new Error(err);
	
	      if (res.statusCode !== 204) {
	        err = new Error('Response status code is ' + res.statusCode);
	        err.status = req.statusCode;
	        return cb(err);
	      }
	
	      cb(null);
	    });
	  };
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var url = __webpack_require__(8);
	var http = __webpack_require__(9);
	var https = __webpack_require__(10);
	var through = __webpack_require__(11);
	var duplexer = __webpack_require__(12);
	
	module.exports = hyperquest;
	
	function bind (obj, fn) {
	  var args = Array.prototype.slice.call(arguments, 2);
	  return function () {
	    var argv = args.concat(Array.prototype.slice.call(arguments));
	    return fn.apply(obj, argv);
	  }
	}
	
	function hyperquest (uri, opts, cb, extra) {
	    if (typeof uri === 'object') {
	        cb = opts;
	        opts = uri;
	        uri = undefined;
	    }
	    if (typeof opts === 'function') {
	      cb = opts;
	      opts = undefined;
	    }
	    if (!opts) opts = {};
	    if (uri !== undefined) opts.uri = uri;
	    if (extra) opts.method = extra.method;
	    
	    var req = new Req(opts);
	    var ws = req.duplex && through();
	    if (ws) ws.pause();
	    var rs = through();
	    
	    var dup = req.duplex ? duplexer(ws, rs) : rs;
	    if (!req.duplex) {
	        rs.writable = false;
	    }
	    dup.request = req;
	    dup.setHeader = bind(req, req.setHeader);
	    dup.setLocation = bind(req, req.setLocation);
	    
	    var closed = false;
	    dup.on('close', function () { closed = true });
	    
	    process.nextTick(function () {
	        if (closed) return;
	        dup.on('close', function () { r.destroy() });
	        
	        var r = req._send();
	        r.on('error', bind(dup, dup.emit, 'error'));
	        
	        r.on('response', function (res) {
	            dup.response = res;
	            dup.emit('response', res);
	            if (req.duplex) res.pipe(rs)
	            else {
	                res.on('data', function (buf) { rs.queue(buf) });
	                res.on('end', function () { rs.queue(null) });
	            }
	        });
	        
	        if (req.duplex) {
	            ws.pipe(r);
	            ws.resume();
	        }
	        else r.end();
	    });
	    
	    if (cb) {
	        dup.on('error', cb);
	        dup.on('response', bind(dup, cb, null));
	    }
	    return dup;
	}
	
	hyperquest.get = hyperquest;
	
	hyperquest.post = function (uri, opts, cb) {
	    return hyperquest(uri, opts, cb, { method: 'POST' });
	};
	
	hyperquest.put = function (uri, opts, cb) {
	    return hyperquest(uri, opts, cb, { method: 'PUT' });
	};
	
	hyperquest['delete'] = function (uri, opts, cb) {
	    return hyperquest(uri, opts, cb, { method: 'DELETE' });
	};
	
	function Req (opts) {
	    this.headers = opts.headers || {};
	    
	    var method = (opts.method || 'GET').toUpperCase();
	    this.method = method;
	    this.duplex = !(method === 'GET' || method === 'DELETE'
	        || method === 'HEAD');
	    this.auth = opts.auth;
	    
	    this.options = opts;
	    
	    if (opts.uri) this.setLocation(opts.uri);
	}
	
	Req.prototype._send = function () {
	    this._sent = true;
	    
	    var headers = this.headers || {};
	    var u = url.parse(this.uri);
	    var au = u.auth || this.auth;
	    if (au) {
	        headers.authorization = 'Basic ' + Buffer(au).toString('base64');
	    }
	    
	    var protocol = u.protocol || '';
	    var iface = protocol === 'https:' ? https : http;
	    var opts = {
	        scheme: protocol.replace(/:$/, ''),
	        method: this.method,
	        host: u.hostname,
	        port: Number(u.port) || (protocol === 'https:' ? 443 : 80),
	        path: u.path,
	        agent: false,
	        headers: headers,
	        withCredentials: this.options.withCredentials
	    };
	    if (protocol === 'https:') {
	        opts.pfx = this.options.pfx;
	        opts.key = this.options.key;
	        opts.cert = this.options.cert;
	        opts.ca = this.options.ca;
	        opts.ciphers = this.options.ciphers;
	        opts.rejectUnauthorized = this.options.rejectUnauthorized;
	        opts.secureProtocol = this.options.secureProtocol;
	    }
	    var req = iface.request(opts);
	    
	    if (req.setTimeout) req.setTimeout(Math.pow(2, 32) * 1000);
	    return req;
	};
	
	Req.prototype.setHeader = function (key, value) {
	    if (this._sent) throw new Error('request already sent');
	    this.headers[key] = value;
	    return this;
	};
	
	Req.prototype.setLocation = function (uri) {
	    this.uri = uri;
	    return this;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(5)
	
	// through
	//
	// a stream that does nothing but re-emit the input.
	// useful for aggregating a series of changing but not ending streams into one stream)
	
	
	
	exports = module.exports = through
	through.through = through
	
	//create a readable writable stream.
	
	function through (write, end) {
	  write = write || function (data) { this.queue(data) }
	  end = end || function () { this.queue(null) }
	
	  var ended = false, destroyed = false, buffer = []
	  var stream = new Stream()
	  stream.readable = stream.writable = true
	  stream.paused = false
	
	  stream.write = function (data) {
	    write.call(this, data)
	    return !stream.paused
	  }
	
	  function drain() {
	    while(buffer.length && !stream.paused) {
	      var data = buffer.shift()
	      if(null === data)
	        return stream.emit('end')
	      else
	        stream.emit('data', data)
	    }
	  }
	
	  stream.queue = stream.push = function (data) {
	    buffer.push(data)
	    drain()
	    return stream
	  }
	
	  //this will be registered as the first 'end' listener
	  //must call destroy next tick, to make sure we're after any
	  //stream piped from here.
	  //this is only a problem if end is not emitted synchronously.
	  //a nicer way to do this is to make sure this is the last listener for 'end'
	
	  stream.on('end', function () {
	    stream.readable = false
	    if(!stream.writable)
	      process.nextTick(function () {
	        stream.destroy()
	      })
	  })
	
	  function _end () {
	    stream.writable = false
	    end.call(stream)
	    if(!stream.readable)
	      stream.destroy()
	  }
	
	  stream.end = function (data) {
	    if(ended) return
	    ended = true
	    if(arguments.length) stream.write(data)
	    _end() // will emit or queue
	    return stream
	  }
	
	  stream.destroy = function () {
	    if(destroyed) return
	    destroyed = true
	    ended = true
	    buffer.length = 0
	    stream.writable = stream.readable = false
	    stream.emit('close')
	    return stream
	  }
	
	  stream.pause = function () {
	    if(stream.paused) return
	    stream.paused = true
	    stream.emit('pause')
	    return stream
	  }
	  stream.resume = function () {
	    if(stream.paused) {
	      stream.paused = false
	    }
	    drain()
	    //may have become paused again,
	    //as drain emits 'data'.
	    if(!stream.paused)
	      stream.emit('drain')
	    return stream
	  }
	  return stream
	}
	


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(5)
	var writeMethods = ["write", "end", "destroy"]
	var readMethods = ["resume", "pause"]
	var readEvents = ["data", "close"]
	var slice = Array.prototype.slice
	
	module.exports = duplex
	
	function forEach (arr, fn) {
	    if (arr.forEach) {
	        return arr.forEach(fn)
	    }
	
	    for (var i = 0; i < arr.length; i++) {
	        fn(arr[i], i)
	    }
	}
	
	function duplex(writer, reader) {
	    var stream = new Stream()
	    var ended = false
	
	    forEach(writeMethods, proxyWriter)
	
	    forEach(readMethods, proxyReader)
	
	    forEach(readEvents, proxyStream)
	
	    reader.on("end", handleEnd)
	
	    writer.on("drain", function() {
	      stream.emit("drain")
	    })
	
	    writer.on("error", reemit)
	    reader.on("error", reemit)
	
	    stream.writable = writer.writable
	    stream.readable = reader.readable
	
	    return stream
	
	    function proxyWriter(methodName) {
	        stream[methodName] = method
	
	        function method() {
	            return writer[methodName].apply(writer, arguments)
	        }
	    }
	
	    function proxyReader(methodName) {
	        stream[methodName] = method
	
	        function method() {
	            stream.emit(methodName)
	            var func = reader[methodName]
	            if (func) {
	                return func.apply(reader, arguments)
	            }
	            reader.emit(methodName)
	        }
	    }
	
	    function proxyStream(methodName) {
	        reader.on(methodName, reemit)
	
	        function reemit() {
	            var args = slice.call(arguments)
	            args.unshift(methodName)
	            stream.emit.apply(stream, args)
	        }
	    }
	
	    function handleEnd() {
	        if (ended) {
	            return
	        }
	        ended = true
	        var args = slice.call(arguments)
	        args.unshift("end")
	        stream.emit.apply(stream, args)
	    }
	
	    function reemit(err) {
	        stream.emit("error", err)
	    }
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function streamToBuffer(stream, callback) {
	  var done = false;
	  var buffers = [];
	
	  stream.on('data', function (data) {
	    buffers.push(data);
	  });
	
	  stream.on('end', function () {
	    if (done)
	      return;
	
	    done = true;
	
	    var buff;
	
	    try {
	      buff = Buffer.concat(buffers);
	    } catch (err) {
	      if (stream._readableState) {
	        if (stream._readableState.encoding === 'utf8' ||
	            stream._readableState.encoding === 'ascii')
	          buff = buffers.join('');
	
	        if (stream._readableState.objectMode)
	          buff = buffers;
	      } else
	        buff = buffers.join('');
	    }
	
	    callback(null, buff);
	    buffers.length = 0;
	  });
	
	  stream.on('error', function (err) {
	    done = true;
	    buffers = null;
	    callback(err);
	  });
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	exports =
	module.exports =
	function extend (origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || typeof add !== 'object')
	    return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	
	  return origin;
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports.server =
	  (true) ?
	    {
	      "url": "http://localhost:8002"
	    }
	 :
	    {
	      "url": "https://api.crowdprocess.com:443"
	    };

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(17);
	var TaskStream = __webpack_require__(18);
	var ResultsStream = __webpack_require__(27);
	var ErrorsStream = __webpack_require__(28);
	
	module.exports = Client;
	
	function Client(options) {
	  var defaultReqOpts = {
	    headers: {
	      "Content-Type": "application/json"
	    }
	  };
	
	  if (!options) {
	    options = {};
	  }
	
	  if (options.token)
	    defaultReqOpts.headers.Authorization = "token " + options.token;
	
	  if (options.email && options.password)
	    defaultReqOpts.headers.Authorization = "Basic "+
	      (new Buffer(options.email+':'+options.password)
	        .toString('base64'));
	
	  options.baseUrl = (options.url || config.server.url) + '/jobs/';
	
	  return function streams (jobId) {
	    return {
	      Tasks: TaskStream(jobId, defaultReqOpts, options),
	      Results: ResultsStream(jobId, defaultReqOpts, options),
	      Errors: ErrorsStream(jobId, defaultReqOpts, options),
	    };
	  };
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports.server =
	  (true) ?
	    {
	      "url": "http://localhost:8002"
	    }
	 :
	    {
	      "url": "https://api.crowdprocess.com:443"
	    };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Transform = __webpack_require__(5).Transform;
	var extend = __webpack_require__(4)._extend;
	var request = __webpack_require__(19);
	var querystring = __webpack_require__(22);
	var nlJSON = __webpack_require__(23);
	
	module.exports = TaskStream;
	function TaskStream (jobId, defaultReqOpts, options) {
	  return function taskStream () {
	    var opts = extend({
	      uri: options.baseUrl + encodeURIComponent(jobId) + '/tasks',
	    }, defaultReqOpts);
	
	    var req = request.post(opts);
	    req.on('response', checkStatus);
	    function checkStatus() {
	      var status = req.response.statusCode;
	      // 0 means client canceled on the browser
	      if (status !== 201 && status !== 0) {
	        var err = new Error('Unexpected status code: ' + status);
	        err.status = status;
	        throw err;
	      }
	    }
	
	    var stringifier = new nlJSON.Stringifier();
	    stringifier.pipe(req);
	
	    return stringifier;
	  };
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var url = __webpack_require__(8);
	var http = __webpack_require__(9);
	var https = __webpack_require__(10);
	var through = __webpack_require__(20);
	var duplexer = __webpack_require__(21);
	
	module.exports = hyperquest;
	
	function bind (obj, fn) {
	  var args = Array.prototype.slice.call(arguments, 2);
	  return function () {
	    var argv = args.concat(Array.prototype.slice.call(arguments));
	    return fn.apply(obj, argv);
	  }
	}
	
	function hyperquest (uri, opts, cb, extra) {
	    if (typeof uri === 'object') {
	        cb = opts;
	        opts = uri;
	        uri = undefined;
	    }
	    if (typeof opts === 'function') {
	      cb = opts;
	      opts = undefined;
	    }
	    if (!opts) opts = {};
	    if (uri !== undefined) opts.uri = uri;
	    if (extra) opts.method = extra.method;
	    
	    var req = new Req(opts);
	    var ws = req.duplex && through();
	    if (ws) ws.pause();
	    var rs = through();
	    
	    var dup = req.duplex ? duplexer(ws, rs) : rs;
	    if (!req.duplex) {
	        rs.writable = false;
	    }
	    dup.request = req;
	    dup.setHeader = bind(req, req.setHeader);
	    dup.setLocation = bind(req, req.setLocation);
	    
	    var closed = false;
	    dup.on('close', function () { closed = true });
	    
	    process.nextTick(function () {
	        if (closed) return;
	        dup.on('close', function () { r.destroy() });
	        
	        var r = req._send();
	        r.on('error', bind(dup, dup.emit, 'error'));
	        
	        r.on('response', function (res) {
	            dup.response = res;
	            dup.emit('response', res);
	            if (req.duplex) res.pipe(rs)
	            else {
	                res.on('data', function (buf) { rs.queue(buf) });
	                res.on('end', function () { rs.queue(null) });
	            }
	        });
	        
	        if (req.duplex) {
	            ws.pipe(r);
	            ws.resume();
	        }
	        else r.end();
	    });
	    
	    if (cb) {
	        dup.on('error', cb);
	        dup.on('response', bind(dup, cb, null));
	    }
	    return dup;
	}
	
	hyperquest.get = hyperquest;
	
	hyperquest.post = function (uri, opts, cb) {
	    return hyperquest(uri, opts, cb, { method: 'POST' });
	};
	
	hyperquest.put = function (uri, opts, cb) {
	    return hyperquest(uri, opts, cb, { method: 'PUT' });
	};
	
	hyperquest['delete'] = function (uri, opts, cb) {
	    return hyperquest(uri, opts, cb, { method: 'DELETE' });
	};
	
	function Req (opts) {
	    this.headers = opts.headers || {};
	    
	    var method = (opts.method || 'GET').toUpperCase();
	    this.method = method;
	    this.duplex = !(method === 'GET' || method === 'DELETE'
	        || method === 'HEAD');
	    this.auth = opts.auth;
	    
	    this.options = opts;
	    
	    if (opts.uri) this.setLocation(opts.uri);
	}
	
	Req.prototype._send = function () {
	    this._sent = true;
	    
	    var headers = this.headers || {};
	    var u = url.parse(this.uri);
	    var au = u.auth || this.auth;
	    if (au) {
	        headers.authorization = 'Basic ' + Buffer(au).toString('base64');
	    }
	    
	    var protocol = u.protocol || '';
	    var iface = protocol === 'https:' ? https : http;
	    var opts = {
	        scheme: protocol.replace(/:$/, ''),
	        method: this.method,
	        host: u.hostname,
	        port: Number(u.port) || (protocol === 'https:' ? 443 : 80),
	        path: u.path,
	        agent: false,
	        headers: headers,
	        withCredentials: this.options.withCredentials
	    };
	    if (protocol === 'https:') {
	        opts.pfx = this.options.pfx;
	        opts.key = this.options.key;
	        opts.cert = this.options.cert;
	        opts.ca = this.options.ca;
	        opts.ciphers = this.options.ciphers;
	        opts.rejectUnauthorized = this.options.rejectUnauthorized;
	        opts.secureProtocol = this.options.secureProtocol;
	    }
	    var req = iface.request(opts);
	    
	    if (req.setTimeout) req.setTimeout(Math.pow(2, 32) * 1000);
	    return req;
	};
	
	Req.prototype.setHeader = function (key, value) {
	    if (this._sent) throw new Error('request already sent');
	    this.headers[key] = value;
	    return this;
	};
	
	Req.prototype.setLocation = function (uri) {
	    this.uri = uri;
	    return this;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(5)
	
	// through
	//
	// a stream that does nothing but re-emit the input.
	// useful for aggregating a series of changing but not ending streams into one stream)
	
	
	
	exports = module.exports = through
	through.through = through
	
	//create a readable writable stream.
	
	function through (write, end) {
	  write = write || function (data) { this.queue(data) }
	  end = end || function () { this.queue(null) }
	
	  var ended = false, destroyed = false, buffer = []
	  var stream = new Stream()
	  stream.readable = stream.writable = true
	  stream.paused = false
	
	  stream.write = function (data) {
	    write.call(this, data)
	    return !stream.paused
	  }
	
	  function drain() {
	    while(buffer.length && !stream.paused) {
	      var data = buffer.shift()
	      if(null === data)
	        return stream.emit('end')
	      else
	        stream.emit('data', data)
	    }
	  }
	
	  stream.queue = stream.push = function (data) {
	    buffer.push(data)
	    drain()
	    return stream
	  }
	
	  //this will be registered as the first 'end' listener
	  //must call destroy next tick, to make sure we're after any
	  //stream piped from here.
	  //this is only a problem if end is not emitted synchronously.
	  //a nicer way to do this is to make sure this is the last listener for 'end'
	
	  stream.on('end', function () {
	    stream.readable = false
	    if(!stream.writable)
	      process.nextTick(function () {
	        stream.destroy()
	      })
	  })
	
	  function _end () {
	    stream.writable = false
	    end.call(stream)
	    if(!stream.readable)
	      stream.destroy()
	  }
	
	  stream.end = function (data) {
	    if(ended) return
	    ended = true
	    if(arguments.length) stream.write(data)
	    _end() // will emit or queue
	    return stream
	  }
	
	  stream.destroy = function () {
	    if(destroyed) return
	    destroyed = true
	    ended = true
	    buffer.length = 0
	    stream.writable = stream.readable = false
	    stream.emit('close')
	    return stream
	  }
	
	  stream.pause = function () {
	    if(stream.paused) return
	    stream.paused = true
	    stream.emit('pause')
	    return stream
	  }
	  stream.resume = function () {
	    if(stream.paused) {
	      stream.paused = false
	    }
	    drain()
	    //may have become paused again,
	    //as drain emits 'data'.
	    if(!stream.paused)
	      stream.emit('drain')
	    return stream
	  }
	  return stream
	}
	


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(5)
	var writeMethods = ["write", "end", "destroy"]
	var readMethods = ["resume", "pause"]
	var readEvents = ["data", "close"]
	var slice = Array.prototype.slice
	
	module.exports = duplex
	
	function forEach (arr, fn) {
	    if (arr.forEach) {
	        return arr.forEach(fn)
	    }
	
	    for (var i = 0; i < arr.length; i++) {
	        fn(arr[i], i)
	    }
	}
	
	function duplex(writer, reader) {
	    var stream = new Stream()
	    var ended = false
	
	    forEach(writeMethods, proxyWriter)
	
	    forEach(readMethods, proxyReader)
	
	    forEach(readEvents, proxyStream)
	
	    reader.on("end", handleEnd)
	
	    writer.on("drain", function() {
	      stream.emit("drain")
	    })
	
	    writer.on("error", reemit)
	    reader.on("error", reemit)
	
	    stream.writable = writer.writable
	    stream.readable = reader.readable
	
	    return stream
	
	    function proxyWriter(methodName) {
	        stream[methodName] = method
	
	        function method() {
	            return writer[methodName].apply(writer, arguments)
	        }
	    }
	
	    function proxyReader(methodName) {
	        stream[methodName] = method
	
	        function method() {
	            stream.emit(methodName)
	            var func = reader[methodName]
	            if (func) {
	                return func.apply(reader, arguments)
	            }
	            reader.emit(methodName)
	        }
	    }
	
	    function proxyStream(methodName) {
	        reader.on(methodName, reemit)
	
	        function reemit() {
	            var args = slice.call(arguments)
	            args.unshift(methodName)
	            stream.emit.apply(stream, args)
	        }
	    }
	
	    function handleEnd() {
	        if (ended) {
	            return
	        }
	        ended = true
	        var args = slice.call(arguments)
	        args.unshift("end")
	        stream.emit.apply(stream, args)
	    }
	
	    function reemit(err) {
	        stream.emit("error", err)
	    }
	}


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("querystring");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	exports.Stringifier = __webpack_require__(24);
	exports.Parser = __webpack_require__(25);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(4);
	var Transform = __webpack_require__(5).Transform;
	util.inherits(Stringifier, Transform);
	
	function Stringifier(options) {
	  if (!options)
	    options = {};
	
	  if (!(this instanceof Stringifier))
	    return new Stringifier(options);
	
	  Transform.call(this, options);
	  this._writableState.objectMode = true;
	  this._readableState.objectMode = false;
	}
	
	Stringifier.prototype._transform = function(chunk, encoding, done) {
	  this.push(JSON.stringify(chunk)+'\n');
	  done();
	};
	
	module.exports = Stringifier;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// shamelessly borrowed from http://nodejs.org/api/stream.html
	
	var util = __webpack_require__(4);
	var StringDecoder = __webpack_require__(26).StringDecoder;
	var Transform = __webpack_require__(5).Transform;
	util.inherits(Parser, Transform);
	
	function Parser(options) {
	  if (!(this instanceof Parser))
	    return new Parser(options);
	
	  Transform.call(this, options);
	  this._writableState.objectMode = false;
	  this._readableState.objectMode = true;
	  this._buffer = '';
	  this._decoder = new StringDecoder('utf8');
	}
	
	Parser.prototype._transform = function(chunk, encoding, cb) {
	  this._buffer += this._decoder.write(chunk);
	  var lines = this._buffer.split(/\r?\n/);
	  this._buffer = lines.pop();
	  for (var l = 0; l < lines.length; l++) {
	    var line = lines[l];
	    try {
	      var obj = JSON.parse(line);
	      this.push((obj === null || obj === undefined) ? false : obj);
	    } catch (err) {
	      var context = lines.slice(l).join('\n')+'\n'+this._buffer;
	      er = new Error(err.message+' in '+JSON.stringify(context));
	      this.emit('error', er);
	      return;
	    }
	  }
	  cb();
	};
	
	Parser.prototype._flush = function(cb) {
	  var rem = this._buffer.trim();
	  if (rem) {
	    try {
	      var obj = JSON.parse(rem);
	      this.push(obj);
	    } catch (err) {
	      this.emit('error', err);
	      return;
	    }
	  }
	  cb();
	};
	
	module.exports = Parser;


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("string_decoder");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Transform = __webpack_require__(5).Transform;
	var extend = __webpack_require__(4)._extend;
	var request = __webpack_require__(19);
	var querystring = __webpack_require__(22);
	var nlJSON = __webpack_require__(23);
	
	module.exports = ResultStream;
	function ResultStream(jobId, defaultReqOpts, options) {
	  return function resultStream (reqOpts) {
	    if (!reqOpts)
	      reqOpts = {};
	
	    var url = options.baseUrl +
	              encodeURIComponent(jobId) +
	              '/results?' +
	              querystring.stringify(reqOpts);
	
	    var opts = extend({
	      uri: url
	    }, defaultReqOpts);
	
	    var req = request(opts);
	    req.on('response', checkStatus);
	    function checkStatus() {
	      var status = req.response.statusCode;
	      // 0 means client canceled on the browser
	      if (status !== 200 && status !== 0) {
	        var err = new Error('Unexpected status code: ' + status);
	        err.status = status;
	        throw err;
	      }
	    }
	
	    var parser = new nlJSON.Parser();
	    req.pipe(parser);
	
	    parser.on('end', function() {
	      req.end();
	    });
	
	    return parser;
	  };
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Transform = __webpack_require__(5).Transform;
	var extend = __webpack_require__(4)._extend;
	var request = __webpack_require__(19);
	var querystring = __webpack_require__(22);
	var nlJSON = __webpack_require__(23);
	
	module.exports = ErrorsStream;
	function ErrorsStream(jobId, defaultReqOpts, options) {
	  return function errorStream (reqOpts) {
	    if (!reqOpts)
	      reqOpts = {};
	
	    var url = options.baseUrl +
	              encodeURIComponent(jobId) +
	              '/errors?' +
	              querystring.stringify(reqOpts);
	
	    var opts = extend({
	      uri: url
	    }, defaultReqOpts);
	
	    var req = request(opts);
	    req.on('response', checkStatus);
	    function checkStatus() {
	      var status = req.response.statusCode;
	      // 0 means client canceled on the browser
	      if (status !== 200 && status !== 0) {
	        var err = new Error('Unexpected status code: ' + status);
	        err.status = status;
	        throw err;
	      }
	    }
	
	    var parser = new nlJSON.Parser();
	    req.pipe(parser);
	
	    parser.on('end', function() {
	      req.end();
	    });
	
	    return parser;
	  };
	}


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(33);
	exports.Stream = __webpack_require__(5);
	exports.Readable = exports;
	exports.Writable = __webpack_require__(38);
	exports.Duplex = __webpack_require__(30);
	exports.Transform = __webpack_require__(39);
	exports.PassThrough = __webpack_require__(40);


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// a duplex stream is just a stream that is both readable and writable.
	// Since JS doesn't have multiple prototypal inheritance, this class
	// prototypally inherits from Readable, and then parasitically from
	// Writable.
	
	module.exports = Duplex;
	
	/*<replacement>*/
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	/*</replacement>*/
	
	
	/*<replacement>*/
	var util = __webpack_require__(31);
	util.inherits = __webpack_require__(32);
	/*</replacement>*/
	
	var Readable = __webpack_require__(33);
	var Writable = __webpack_require__(38);
	
	util.inherits(Duplex, Readable);
	
	forEach(objectKeys(Writable.prototype), function(method) {
	  if (!Duplex.prototype[method])
	    Duplex.prototype[method] = Writable.prototype[method];
	});
	
	function Duplex(options) {
	  if (!(this instanceof Duplex))
	    return new Duplex(options);
	
	  Readable.call(this, options);
	  Writable.call(this, options);
	
	  if (options && options.readable === false)
	    this.readable = false;
	
	  if (options && options.writable === false)
	    this.writable = false;
	
	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false)
	    this.allowHalfOpen = false;
	
	  this.once('end', onend);
	}
	
	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended)
	    return;
	
	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  process.nextTick(this.end.bind(this));
	}
	
	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	function isBuffer(arg) {
	  return Buffer.isBuffer(arg);
	}
	exports.isBuffer = isBuffer;
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4).inherits


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	module.exports = Readable;
	
	/*<replacement>*/
	var isArray = __webpack_require__(34);
	/*</replacement>*/
	
	
	/*<replacement>*/
	var Buffer = __webpack_require__(35).Buffer;
	/*</replacement>*/
	
	Readable.ReadableState = ReadableState;
	
	var EE = __webpack_require__(36).EventEmitter;
	
	/*<replacement>*/
	if (!EE.listenerCount) EE.listenerCount = function(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/
	
	var Stream = __webpack_require__(5);
	
	/*<replacement>*/
	var util = __webpack_require__(31);
	util.inherits = __webpack_require__(32);
	/*</replacement>*/
	
	var StringDecoder;
	
	
	/*<replacement>*/
	var debug = __webpack_require__(4);
	if (debug && debug.debuglog) {
	  debug = debug.debuglog('stream');
	} else {
	  debug = function () {};
	}
	/*</replacement>*/
	
	
	util.inherits(Readable, Stream);
	
	function ReadableState(options, stream) {
	  var Duplex = __webpack_require__(30);
	
	  options = options || {};
	
	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
	
	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;
	
	  this.buffer = [];
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	
	
	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.readableObjectMode;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;
	
	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;
	
	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;
	
	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    if (!StringDecoder)
	      StringDecoder = __webpack_require__(37).StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	
	function Readable(options) {
	  var Duplex = __webpack_require__(30);
	
	  if (!(this instanceof Readable))
	    return new Readable(options);
	
	  this._readableState = new ReadableState(options, this);
	
	  // legacy
	  this.readable = true;
	
	  Stream.call(this);
	}
	
	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function(chunk, encoding) {
	  var state = this._readableState;
	
	  if (util.isString(chunk) && !state.objectMode) {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = new Buffer(chunk, encoding);
	      encoding = '';
	    }
	  }
	
	  return readableAddChunk(this, state, chunk, encoding, false);
	};
	
	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function(chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};
	
	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (util.isNullOrUndefined(chunk)) {
	    state.reading = false;
	    if (!state.ended)
	      onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var e = new Error('stream.unshift() after end event');
	      stream.emit('error', e);
	    } else {
	      if (state.decoder && !addToFront && !encoding)
	        chunk = state.decoder.write(chunk);
	
	      if (!addToFront)
	        state.reading = false;
	
	      // if we want the data now, just emit it.
	      if (state.flowing && state.length === 0 && !state.sync) {
	        stream.emit('data', chunk);
	        stream.read(0);
	      } else {
	        // update the buffer info.
	        state.length += state.objectMode ? 1 : chunk.length;
	        if (addToFront)
	          state.buffer.unshift(chunk);
	        else
	          state.buffer.push(chunk);
	
	        if (state.needReadable)
	          emitReadable(stream);
	      }
	
	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }
	
	  return needMoreData(state);
	}
	
	
	
	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended &&
	         (state.needReadable ||
	          state.length < state.highWaterMark ||
	          state.length === 0);
	}
	
	// backwards compatibility.
	Readable.prototype.setEncoding = function(enc) {
	  if (!StringDecoder)
	    StringDecoder = __webpack_require__(37).StringDecoder;
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};
	
	// Don't raise the hwm > 128MB
	var MAX_HWM = 0x800000;
	function roundUpToNextPowerOf2(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2
	    n--;
	    for (var p = 1; p < 32; p <<= 1) n |= n >> p;
	    n++;
	  }
	  return n;
	}
	
	function howMuchToRead(n, state) {
	  if (state.length === 0 && state.ended)
	    return 0;
	
	  if (state.objectMode)
	    return n === 0 ? 0 : 1;
	
	  if (isNaN(n) || util.isNull(n)) {
	    // only flow one buffer at a time
	    if (state.flowing && state.buffer.length)
	      return state.buffer[0].length;
	    else
	      return state.length;
	  }
	
	  if (n <= 0)
	    return 0;
	
	  // If we're asking for more than the target buffer level,
	  // then raise the water mark.  Bump up to the next highest
	  // power of 2, to prevent increasing it excessively in tiny
	  // amounts.
	  if (n > state.highWaterMark)
	    state.highWaterMark = roundUpToNextPowerOf2(n);
	
	  // don't have that much.  return null, unless we've ended.
	  if (n > state.length) {
	    if (!state.ended) {
	      state.needReadable = true;
	      return 0;
	    } else
	      return state.length;
	  }
	
	  return n;
	}
	
	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function(n) {
	  debug('read', n);
	  var state = this._readableState;
	  var nOrig = n;
	
	  if (!util.isNumber(n) || n > 0)
	    state.emittedReadable = false;
	
	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 &&
	      state.needReadable &&
	      (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended)
	      endReadable(this);
	    else
	      emitReadable(this);
	    return null;
	  }
	
	  n = howMuchToRead(n, state);
	
	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0)
	      endReadable(this);
	    return null;
	  }
	
	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	
	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);
	
	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }
	
	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  }
	
	  if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0)
	      state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	  }
	
	  // If _read pushed data synchronously, then `reading` will be false,
	  // and we need to re-evaluate how much data we can return to the user.
	  if (doRead && !state.reading)
	    n = howMuchToRead(nOrig, state);
	
	  var ret;
	  if (n > 0)
	    ret = fromList(n, state);
	  else
	    ret = null;
	
	  if (util.isNull(ret)) {
	    state.needReadable = true;
	    n = 0;
	  }
	
	  state.length -= n;
	
	  // If we have nothing in the buffer, then we want to know
	  // as soon as we *do* get something into the buffer.
	  if (state.length === 0 && !state.ended)
	    state.needReadable = true;
	
	  // If we tried to read() past the EOF, then emit end on the next tick.
	  if (nOrig !== n && state.ended && state.length === 0)
	    endReadable(this);
	
	  if (!util.isNull(ret))
	    this.emit('data', ret);
	
	  return ret;
	};
	
	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}
	
	
	function onEofChunk(stream, state) {
	  if (state.decoder && !state.ended) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;
	
	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}
	
	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync)
	      process.nextTick(function() {
	        emitReadable_(stream);
	      });
	    else
	      emitReadable_(stream);
	  }
	}
	
	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}
	
	
	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(function() {
	      maybeReadMore_(stream, state);
	    });
	  }
	}
	
	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended &&
	         state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;
	    else
	      len = state.length;
	  }
	  state.readingMore = false;
	}
	
	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function(n) {
	  this.emit('error', new Error('not implemented'));
	};
	
	Readable.prototype.pipe = function(dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;
	
	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&
	              dest !== process.stdout &&
	              dest !== process.stderr;
	
	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted)
	    process.nextTick(endFn);
	  else
	    src.once('end', endFn);
	
	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }
	
	  function onend() {
	    debug('onend');
	    dest.end();
	  }
	
	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);
	
	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain &&
	        (!dest._writableState || dest._writableState.needDrain))
	      ondrain();
	  }
	
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    if (false === ret) {
	      debug('false write response, pause',
	            src._readableState.awaitDrain);
	      src._readableState.awaitDrain++;
	      src.pause();
	    }
	  }
	
	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EE.listenerCount(dest, 'error') === 0)
	      dest.emit('error', er);
	  }
	  // This is a brutally ugly hack to make sure that our error handler
	  // is attached before any userland ones.  NEVER DO THIS.
	  if (!dest._events || !dest._events.error)
	    dest.on('error', onerror);
	  else if (isArray(dest._events.error))
	    dest._events.error.unshift(onerror);
	  else
	    dest._events.error = [onerror, dest._events.error];
	
	
	
	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);
	
	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }
	
	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);
	
	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }
	
	  return dest;
	};
	
	function pipeOnDrain(src) {
	  return function() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain)
	      state.awaitDrain--;
	    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}
	
	
	Readable.prototype.unpipe = function(dest) {
	  var state = this._readableState;
	
	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0)
	    return this;
	
	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes)
	      return this;
	
	    if (!dest)
	      dest = state.pipes;
	
	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest)
	      dest.emit('unpipe', this);
	    return this;
	  }
	
	  // slow case. multiple pipe destinations.
	
	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	
	    for (var i = 0; i < len; i++)
	      dests[i].emit('unpipe', this);
	    return this;
	  }
	
	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1)
	    return this;
	
	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1)
	    state.pipes = state.pipes[0];
	
	  dest.emit('unpipe', this);
	
	  return this;
	};
	
	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function(ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	
	  // If listening to data, and it has not explicitly been paused,
	  // then call resume to start the flow of data on the next tick.
	  if (ev === 'data' && false !== this._readableState.flowing) {
	    this.resume();
	  }
	
	  if (ev === 'readable' && this.readable) {
	    var state = this._readableState;
	    if (!state.readableListening) {
	      state.readableListening = true;
	      state.emittedReadable = false;
	      state.needReadable = true;
	      if (!state.reading) {
	        var self = this;
	        process.nextTick(function() {
	          debug('readable nexttick read 0');
	          self.read(0);
	        });
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }
	
	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	
	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function() {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    if (!state.reading) {
	      debug('resume read 0');
	      this.read(0);
	    }
	    resume(this, state);
	  }
	  return this;
	};
	
	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(function() {
	      resume_(stream, state);
	    });
	  }
	}
	
	function resume_(stream, state) {
	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading)
	    stream.read(0);
	}
	
	Readable.prototype.pause = function() {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};
	
	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  if (state.flowing) {
	    do {
	      var chunk = stream.read();
	    } while (null !== chunk && state.flowing);
	  }
	}
	
	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function(stream) {
	  var state = this._readableState;
	  var paused = false;
	
	  var self = this;
	  stream.on('end', function() {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length)
	        self.push(chunk);
	    }
	
	    self.push(null);
	  });
	
	  stream.on('data', function(chunk) {
	    debug('wrapped data');
	    if (state.decoder)
	      chunk = state.decoder.write(chunk);
	    if (!chunk || !state.objectMode && !chunk.length)
	      return;
	
	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });
	
	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
	      this[i] = function(method) { return function() {
	        return stream[method].apply(stream, arguments);
	      }}(i);
	    }
	  }
	
	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function(ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });
	
	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function(n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };
	
	  return self;
	};
	
	
	
	// exposed for testing purposes only.
	Readable._fromList = fromList;
	
	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	function fromList(n, state) {
	  var list = state.buffer;
	  var length = state.length;
	  var stringMode = !!state.decoder;
	  var objectMode = !!state.objectMode;
	  var ret;
	
	  // nothing in the list, definitely empty.
	  if (list.length === 0)
	    return null;
	
	  if (length === 0)
	    ret = null;
	  else if (objectMode)
	    ret = list.shift();
	  else if (!n || n >= length) {
	    // read it all, truncate the array.
	    if (stringMode)
	      ret = list.join('');
	    else
	      ret = Buffer.concat(list, length);
	    list.length = 0;
	  } else {
	    // read just some of it.
	    if (n < list[0].length) {
	      // just take a part of the first list item.
	      // slice is the same for buffers and strings.
	      var buf = list[0];
	      ret = buf.slice(0, n);
	      list[0] = buf.slice(n);
	    } else if (n === list[0].length) {
	      // first list is a perfect match
	      ret = list.shift();
	    } else {
	      // complex case.
	      // we have enough to cover it, but it spans past the first buffer.
	      if (stringMode)
	        ret = '';
	      else
	        ret = new Buffer(n);
	
	      var c = 0;
	      for (var i = 0, l = list.length; i < l && c < n; i++) {
	        var buf = list[0];
	        var cpy = Math.min(n - c, buf.length);
	
	        if (stringMode)
	          ret += buf.slice(0, cpy);
	        else
	          buf.copy(ret, c, 0, cpy);
	
	        if (cpy < buf.length)
	          list[0] = buf.slice(cpy);
	        else
	          list.shift();
	
	        c += cpy;
	      }
	    }
	  }
	
	  return ret;
	}
	
	function endReadable(stream) {
	  var state = stream._readableState;
	
	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0)
	    throw new Error('endReadable called on non-empty stream');
	
	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(function() {
	      // Check that we didn't get one last unshift.
	      if (!state.endEmitted && state.length === 0) {
	        state.endEmitted = true;
	        stream.readable = false;
	        stream.emit('end');
	      }
	    });
	  }
	}
	
	function forEach (xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	
	function indexOf (xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};


/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("buffer");

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var Buffer = __webpack_require__(35).Buffer;
	
	var isBufferEncoding = Buffer.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     }
	
	
	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}
	
	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	var StringDecoder = exports.StringDecoder = function(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }
	
	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	};
	
	
	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;
	
	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;
	
	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }
	
	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);
	
	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
	
	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;
	
	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }
	
	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);
	
	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }
	
	  charStr += buffer.toString(this.encoding, 0, end);
	
	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }
	
	  // or just emit the charStr
	  return charStr;
	};
	
	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;
	
	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];
	
	    // See http://en.wikipedia.org/wiki/UTF-8#Description
	
	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }
	
	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }
	
	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};
	
	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);
	
	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }
	
	  return res;
	};
	
	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}
	
	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}
	
	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// A bit simpler than readable streams.
	// Implement an async ._write(chunk, cb), and it'll handle all
	// the drain event emission and buffering.
	
	module.exports = Writable;
	
	/*<replacement>*/
	var Buffer = __webpack_require__(35).Buffer;
	/*</replacement>*/
	
	Writable.WritableState = WritableState;
	
	
	/*<replacement>*/
	var util = __webpack_require__(31);
	util.inherits = __webpack_require__(32);
	/*</replacement>*/
	
	var Stream = __webpack_require__(5);
	
	util.inherits(Writable, Stream);
	
	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	}
	
	function WritableState(options, stream) {
	  var Duplex = __webpack_require__(30);
	
	  options = options || {};
	
	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = options.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;
	
	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;
	
	  if (stream instanceof Duplex)
	    this.objectMode = this.objectMode || !!options.writableObjectMode;
	
	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;
	
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;
	
	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;
	
	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';
	
	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;
	
	  // a flag to see when we're in the middle of a write.
	  this.writing = false;
	
	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;
	
	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;
	
	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;
	
	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function(er) {
	    onwrite(stream, er);
	  };
	
	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;
	
	  // the amount that is being written when _write is called.
	  this.writelen = 0;
	
	  this.buffer = [];
	
	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;
	
	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;
	
	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;
	}
	
	function Writable(options) {
	  var Duplex = __webpack_require__(30);
	
	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex))
	    return new Writable(options);
	
	  this._writableState = new WritableState(options, this);
	
	  // legacy.
	  this.writable = true;
	
	  Stream.call(this);
	}
	
	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function() {
	  this.emit('error', new Error('Cannot pipe. Not readable.'));
	};
	
	
	function writeAfterEnd(stream, state, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  process.nextTick(function() {
	    cb(er);
	  });
	}
	
	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  if (!util.isBuffer(chunk) &&
	      !util.isString(chunk) &&
	      !util.isNullOrUndefined(chunk) &&
	      !state.objectMode) {
	    var er = new TypeError('Invalid non-string/buffer chunk');
	    stream.emit('error', er);
	    process.nextTick(function() {
	      cb(er);
	    });
	    valid = false;
	  }
	  return valid;
	}
	
	Writable.prototype.write = function(chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;
	
	  if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  else if (!encoding)
	    encoding = state.defaultEncoding;
	
	  if (!util.isFunction(cb))
	    cb = function() {};
	
	  if (state.ended)
	    writeAfterEnd(this, state, cb);
	  else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }
	
	  return ret;
	};
	
	Writable.prototype.cork = function() {
	  var state = this._writableState;
	
	  state.corked++;
	};
	
	Writable.prototype.uncork = function() {
	  var state = this._writableState;
	
	  if (state.corked) {
	    state.corked--;
	
	    if (!state.writing &&
	        !state.corked &&
	        !state.finished &&
	        !state.bufferProcessing &&
	        state.buffer.length)
	      clearBuffer(this, state);
	  }
	};
	
	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode &&
	      state.decodeStrings !== false &&
	      util.isString(chunk)) {
	    chunk = new Buffer(chunk, encoding);
	  }
	  return chunk;
	}
	
	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (util.isBuffer(chunk))
	    encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;
	
	  state.length += len;
	
	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret)
	    state.needDrain = true;
	
	  if (state.writing || state.corked)
	    state.buffer.push(new WriteReq(chunk, encoding, cb));
	  else
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	
	  return ret;
	}
	
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev)
	    stream._writev(chunk, state.onwrite);
	  else
	    stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}
	
	function onwriteError(stream, state, sync, er, cb) {
	  if (sync)
	    process.nextTick(function() {
	      state.pendingcb--;
	      cb(er);
	    });
	  else {
	    state.pendingcb--;
	    cb(er);
	  }
	
	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}
	
	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}
	
	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	
	  onwriteStateUpdate(state);
	
	  if (er)
	    onwriteError(stream, state, sync, er, cb);
	  else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(stream, state);
	
	    if (!finished &&
	        !state.corked &&
	        !state.bufferProcessing &&
	        state.buffer.length) {
	      clearBuffer(stream, state);
	    }
	
	    if (sync) {
	      process.nextTick(function() {
	        afterWrite(stream, state, finished, cb);
	      });
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}
	
	function afterWrite(stream, state, finished, cb) {
	  if (!finished)
	    onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}
	
	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}
	
	
	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	
	  if (stream._writev && state.buffer.length > 1) {
	    // Fast case, write everything using _writev()
	    var cbs = [];
	    for (var c = 0; c < state.buffer.length; c++)
	      cbs.push(state.buffer[c].callback);
	
	    // count the one we are adding, as well.
	    // TODO(isaacs) clean this up
	    state.pendingcb++;
	    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {
	      for (var i = 0; i < cbs.length; i++) {
	        state.pendingcb--;
	        cbs[i](err);
	      }
	    });
	
	    // Clear buffer
	    state.buffer = [];
	  } else {
	    // Slow case, write chunks one-by-one
	    for (var c = 0; c < state.buffer.length; c++) {
	      var entry = state.buffer[c];
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        c++;
	        break;
	      }
	    }
	
	    if (c < state.buffer.length)
	      state.buffer = state.buffer.slice(c);
	    else
	      state.buffer.length = 0;
	  }
	
	  state.bufferProcessing = false;
	}
	
	Writable.prototype._write = function(chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	
	};
	
	Writable.prototype._writev = null;
	
	Writable.prototype.end = function(chunk, encoding, cb) {
	  var state = this._writableState;
	
	  if (util.isFunction(chunk)) {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (util.isFunction(encoding)) {
	    cb = encoding;
	    encoding = null;
	  }
	
	  if (!util.isNullOrUndefined(chunk))
	    this.write(chunk, encoding);
	
	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }
	
	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished)
	    endWritable(this, state, cb);
	};
	
	
	function needFinish(stream, state) {
	  return (state.ending &&
	          state.length === 0 &&
	          !state.finished &&
	          !state.writing);
	}
	
	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}
	
	function finishMaybe(stream, state) {
	  var need = needFinish(stream, state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else
	      prefinish(stream, state);
	  }
	  return need;
	}
	
	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished)
	      process.nextTick(cb);
	    else
	      stream.once('finish', cb);
	  }
	  state.ended = true;
	}


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	
	// a transform stream is a readable/writable stream where you do
	// something with the data.  Sometimes it's called a "filter",
	// but that's not a great name for it, since that implies a thing where
	// some bits pass through, and others are simply ignored.  (That would
	// be a valid example of a transform, of course.)
	//
	// While the output is causally related to the input, it's not a
	// necessarily symmetric or synchronous transformation.  For example,
	// a zlib stream might take multiple plain-text writes(), and then
	// emit a single compressed chunk some time in the future.
	//
	// Here's how this works:
	//
	// The Transform stream has all the aspects of the readable and writable
	// stream classes.  When you write(chunk), that calls _write(chunk,cb)
	// internally, and returns false if there's a lot of pending writes
	// buffered up.  When you call read(), that calls _read(n) until
	// there's enough pending readable data buffered up.
	//
	// In a transform stream, the written data is placed in a buffer.  When
	// _read(n) is called, it transforms the queued up data, calling the
	// buffered _write cb's as it consumes chunks.  If consuming a single
	// written chunk would result in multiple output chunks, then the first
	// outputted bit calls the readcb, and subsequent chunks just go into
	// the read buffer, and will cause it to emit 'readable' if necessary.
	//
	// This way, back-pressure is actually determined by the reading side,
	// since _read has to be called to start processing a new chunk.  However,
	// a pathological inflate type of transform can cause excessive buffering
	// here.  For example, imagine a stream where every byte of input is
	// interpreted as an integer from 0-255, and then results in that many
	// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
	// 1kb of data being output.  In this case, you could write a very small
	// amount of input, and end up with a very large amount of output.  In
	// such a pathological inflating mechanism, there'd be no way to tell
	// the system to stop doing the transform.  A single 4MB write could
	// cause the system to run out of memory.
	//
	// However, even in such a pathological case, only a single written chunk
	// would be consumed, and then the rest would wait (un-transformed) until
	// the results of the previous transformed chunk were consumed.
	
	module.exports = Transform;
	
	var Duplex = __webpack_require__(30);
	
	/*<replacement>*/
	var util = __webpack_require__(31);
	util.inherits = __webpack_require__(32);
	/*</replacement>*/
	
	util.inherits(Transform, Duplex);
	
	
	function TransformState(options, stream) {
	  this.afterTransform = function(er, data) {
	    return afterTransform(stream, er, data);
	  };
	
	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	}
	
	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;
	
	  var cb = ts.writecb;
	
	  if (!cb)
	    return stream.emit('error', new Error('no writecb in Transform class'));
	
	  ts.writechunk = null;
	  ts.writecb = null;
	
	  if (!util.isNullOrUndefined(data))
	    stream.push(data);
	
	  if (cb)
	    cb(er);
	
	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}
	
	
	function Transform(options) {
	  if (!(this instanceof Transform))
	    return new Transform(options);
	
	  Duplex.call(this, options);
	
	  this._transformState = new TransformState(options, this);
	
	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;
	
	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;
	
	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;
	
	  this.once('prefinish', function() {
	    if (util.isFunction(this._flush))
	      this._flush(function(er) {
	        done(stream, er);
	      });
	    else
	      done(stream);
	  });
	}
	
	Transform.prototype.push = function(chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};
	
	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function(chunk, encoding, cb) {
	  throw new Error('not implemented');
	};
	
	Transform.prototype._write = function(chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform ||
	        rs.needReadable ||
	        rs.length < rs.highWaterMark)
	      this._read(rs.highWaterMark);
	  }
	};
	
	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function(n) {
	  var ts = this._transformState;
	
	  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};
	
	
	function done(stream, er) {
	  if (er)
	    return stream.emit('error', er);
	
	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;
	
	  if (ws.length)
	    throw new Error('calling transform done when ws.length != 0');
	
	  if (ts.transforming)
	    throw new Error('calling transform done when still transforming');
	
	  return stream.push(null);
	}


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	// a passthrough stream.
	// basically just the most minimal sort of Transform stream.
	// Every written chunk gets output as-is.
	
	module.exports = PassThrough;
	
	var Transform = __webpack_require__(39);
	
	/*<replacement>*/
	var util = __webpack_require__(31);
	util.inherits = __webpack_require__(32);
	/*</replacement>*/
	
	util.inherits(PassThrough, Transform);
	
	function PassThrough(options) {
	  if (!(this instanceof PassThrough))
	    return new PassThrough(options);
	
	  Transform.call(this, options);
	}
	
	PassThrough.prototype._transform = function(chunk, encoding, cb) {
	  cb(null, chunk);
	};


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = "/**\n * DecisionTree\n * ============\n *\n *\n */\n\n/**\n * represents a single decision tree\n */\n'use strict';\n\nObject.defineProperty(exports, '__esModule', {\n  value: true\n});\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nvar DecisionTree = (function () {\n\n  /**\n   * [constructor description]\n   *\n   * @param  {[type]} serial [description]\n   * @return {[type]}        [description]\n   */\n\n  function DecisionTree() {\n    var serial = arguments[0] === undefined ? {} : arguments[0];\n\n    _classCallCheck(this, DecisionTree);\n\n    if (typeof serial === 'string') {\n      serial = JSON.parse(serial);\n    }\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = Object.keys(serial)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        var key = _step.value;\n\n        this[key] = serial[key];\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator['return']) {\n          _iterator['return']();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n\n    if (!this.trainFun) {\n      this.trainFun = this.weakType === 0 ? decisionStumpTrain : decision2DStumpTrain;\n    }\n    if (!this.testFun) {\n      this.testFun = this.weakType === 0 ? decisionStumpTest : decision2DStumpTest;\n    }\n  }\n\n  _createClass(DecisionTree, [{\n    key: 'train',\n\n    /**\n     * [train description]\n     *\n     * @param  {Array}   data    -\n     * @param  {Array}   labels  -\n     * @param  {Object]} options -\n     */\n    value: function train(data, labels) {\n      var options = arguments[2] === undefined ? {} : arguments[2];\n\n      var maxDepth = options.maxDepth || 4;\n      var weakType = options.type || 0;\n\n      var trainFun = options.trainFun || decision2DStumpTrain;\n      var testFun = options.testFun || decision2DStumpTest;\n\n      if (weakType == 0) {\n        trainFun = decisionStumpTrain;\n        testFun = decisionStumpTest;\n      }\n      if (weakType == 1) {\n        trainFun = decision2DStumpTrain;\n        testFun = decision2DStumpTest;\n      }\n\n      // initialize various helper variables\n      var numInternals = Math.pow(2, maxDepth) - 1;\n      var numNodes = Math.pow(2, maxDepth + 1) - 1;\n      var ixs = new Array(numNodes); // 31 -> 2^5 -1\n      // console.log(numNodes, maxDepth);\n      // debugger\n      for (var i = 1; i < ixs.length; i++) {\n        ixs[i] = [];\n      }\n      ixs[0] = new Array(labels.length);\n      for (var i = 0; i < labels.length; i++) {\n        ixs[0][i] = i; // root node starts out with all nodes as relevant\n      }\n      var models = new Array(numInternals);\n\n      // train\n      for (var n = 0; n < numInternals; n++) {\n\n        // few base cases\n        var ixhere = ixs[n];\n        if (ixhere.length == 0) {\n          continue;\n        }\n        if (ixhere.length == 1) {\n          ixs[n * 2 + 1] = [ixhere[0]];\n          continue;\n        } // arbitrary send it down left\n\n        // learn a weak model on relevant data for this node\n        var model = trainFun(data, labels, ixhere);\n\n        models[n] = model; // back it up model\n\n        // split the data according to the learned model\n        var ixleft = [];\n        var ixright = [];\n\n        for (var i = 0; i < ixhere.length; i++) {\n          var label = testFun(data[ixhere[i]], model);\n          if (label === 1) {\n            ixleft.push(ixhere[i]);\n          } else {\n            ixright.push(ixhere[i]);\n          }\n        }\n        ixs[n * 2 + 1] = ixleft;\n        ixs[n * 2 + 2] = ixright;\n      }\n\n      // compute data distributions at the leafs\n      var leafPositives = new Array(numNodes);\n      var leafNegatives = new Array(numNodes);\n      for (var n = numInternals; n < numNodes; n++) {\n        var numones = 0;\n        for (var i = 0; i < ixs[n].length; i++) {\n          if (labels[ixs[n][i]] === 1) {\n            numones += 1;\n          }\n        }\n        leafPositives[n] = numones;\n        leafNegatives[n] = ixs[n].length - numones;\n      }\n\n      // back up important prediction variables for predicting later\n      this.models = models;\n      this.leafPositives = leafPositives;\n      this.leafNegatives = leafNegatives;\n      this.maxDepth = maxDepth;\n      this.weakType = weakType;\n      this.trainFun = trainFun;\n      this.testFun = testFun;\n    }\n  }, {\n    key: 'predictOne',\n\n    /**\n     * [predictOne description]\n     * returns probability that example inst is 1.\n     *\n     * @param  {Array}  inst -\n     * @return {Number}\n     */\n    value: function predictOne(inst) {\n      var n = 0;\n      for (var i = 0; i < this.maxDepth; i++) {\n        var dir = this.testFun(inst, this.models[n]);\n        if (dir === 1) {\n          n = n * 2 + 1; // descend left\n        } else {\n          n = n * 2 + 2; // descend right\n        }\n      }\n      return (this.leafPositives[n] + 0.5) / (this.leafNegatives[n] + 1.0); // bayesian smoothing!\n    }\n  }]);\n\n  return DecisionTree;\n})();\n\nexports['default'] = DecisionTree;\n\n/**\n * [decisionStumpTrain description]\n * returns model\n *\n * @param  {Array}  data    -\n * @param  {Array}  labels  -\n * @param  {Array}  ix      -\n * @param  {Object} options -\n * @return {Object}\n */\nfunction decisionStumpTrain(data, labels, ix) {\n  var options = arguments[3] === undefined ? {} : arguments[3];\n\n  var numtries = options.numTries || 10;\n\n  // choose a dimension at random and pick a best split\n  var ri = randi(0, data[0].length);\n  var N = ix.length;\n\n  // evaluate class entropy of incoming data\n  var H = entropy(labels, ix);\n  var bestGain = 0;\n  var bestThr = 0;\n  for (var i = 0; i < numtries; i++) {\n\n    // pick a random splitting threshold\n    var ix1 = ix[randi(0, N)];\n    var ix2 = ix[randi(0, N)];\n    while (ix2 == ix1) {\n      ix2 = ix[randi(0, N)]; // enforce distinctness of ix2\n    }\n\n    var a = Math.random();\n    var thr = data[ix1][ri] * a + data[ix2][ri] * (1 - a);\n\n    // measure information gain we'd get from split with thr\n    var l1 = 1,\n        r1 = 1,\n        lm1 = 1,\n        rm1 = 1; //counts for Left and label 1, right and label 1, left and minus 1, right and minus 1\n    for (var j = 0; j < ix.length; j++) {\n      if (data[ix[j]][ri] < thr) {\n        if (labels[ix[j]] == 1) {\n          l1++;\n        } else {\n          lm1++;\n        }\n      } else {\n        if (labels[ix[j]] == 1) {\n          r1++;\n        } else {\n          rm1++;\n        }\n      }\n    }\n\n    var t = l1 + lm1; // normalize the counts to obtain probability estimates\n    l1 = l1 / t;\n    lm1 = lm1 / t;\n    t = r1 + rm1;\n    r1 = r1 / t;\n    rm1 = rm1 / t;\n\n    var LH = -l1 * Math.log(l1) - lm1 * Math.log(lm1); // left and right entropy\n    var RH = -r1 * Math.log(r1) - rm1 * Math.log(rm1);\n\n    var informationGain = H - LH - RH;\n    //console.log(\"Considering split %f, entropy %f -> %f, %f. Gain %f\", thr, H, LH, RH, informationGain);\n    if (informationGain > bestGain || i === 0) {\n      bestGain = informationGain;\n      bestThr = thr;\n    }\n  }\n\n  return { // model\n    ri: ri,\n    thr: bestThr\n  };\n}\n\n/**\n * [decisionStumpTest description]\n * returns a decision for a single data instance\n *\n * @param  {Arrat}  inst  -\n * @param  {Object} model -\n * @return {Number}\n */\nfunction decisionStumpTest(inst, model) {\n  if (!model) {\n    // this is a leaf that never received any data...\n    return 1;\n  }\n  return inst[model.ri] < model.thr ? 1 : -1;\n}\n\n/**\n * [decision2DStumpTrain description]\n * returns model. Code duplication with decisionStumpTrain :(\n *\n * @param  {Array} data     -\n * @param  {Array} labels   -\n * @param  {Array} ix       -\n * @param  {Object} options -\n * @return {Object}         - model\n */\nfunction decision2DStumpTrain(data, labels, ix) {\n  var options = arguments[3] === undefined ? {} : arguments[3];\n\n  var numtries = options.numTries || 10;\n\n  // choose a dimension at random and pick a best split\n  var N = ix.length;\n\n  var ri1 = 0;\n  var ri2 = 1;\n\n  if (data[0].length > 2) {\n    // more than 2D data. Pick 2 random dimensions\n    ri1 = randi(0, data[0].length);\n    ri2 = randi(0, data[0].length);\n    while (ri2 == ri1) {\n      ri2 = randi(0, data[0].length); // must be distinct!\n    }\n  }\n\n  // evaluate class entropy of incoming data\n  var H = entropy(labels, ix);\n  var bestGain = 0;\n  var bestw1, bestw2, bestthr;\n  var dots = new Array(ix.length);\n\n  for (var i = 0; i < numtries; i++) {\n\n    // pick random line parameters\n    var alpha = randf(0, 2 * Math.PI);\n    var w1 = Math.cos(alpha);\n    var w2 = Math.sin(alpha);\n\n    // project data on this line and get the dot products\n    for (var j = 0; j < ix.length; j++) {\n      dots[j] = w1 * data[ix[j]][ri1] + w2 * data[ix[j]][ri2];\n    }\n\n    // we are in a tricky situation because data dot product distribution\n    // can be skewed. So we don't want to select just randomly between\n    // min and max. But we also don't want to sort as that is too expensive\n    // let's pick two random points and make the threshold be somewhere between them.\n    // for skewed datasets, the selected points will with relatively high likelihood\n    // be in the high-desnity regions, so the thresholds will make sense\n    var ix1 = ix[randi(0, N)];\n    var ix2 = ix[randi(0, N)];\n    while (ix2 == ix1) {\n      ix2 = ix[randi(0, N)]; // enforce distinctness of ix2\n    }\n    var a = Math.random();\n    var dotthr = dots[ix1] * a + dots[ix2] * (1 - a);\n\n    // measure information gain we'd get from split with thr\n    var l1 = 1,\n        r1 = 1,\n        lm1 = 1,\n        rm1 = 1; //counts for Left and label 1, right and label 1, left and minus 1, right and minus 1\n    for (var j = 0; j < ix.length; j++) {\n      if (dots[j] < dotthr) {\n        if (labels[ix[j]] == 1) {\n          l1++;\n        } else {\n          lm1++;\n        }\n      } else {\n        if (labels[ix[j]] == 1) {\n          r1++;\n        } else {\n          rm1++;\n        }\n      }\n    }\n    var t = l1 + lm1;\n    l1 = l1 / t;\n    lm1 = lm1 / t;\n    t = r1 + rm1;\n    r1 = r1 / t;\n    rm1 = rm1 / t;\n\n    var LH = -l1 * Math.log(l1) - lm1 * Math.log(lm1); // left and right entropy\n    var RH = -r1 * Math.log(r1) - rm1 * Math.log(rm1);\n\n    var informationGain = H - LH - RH;\n    //console.log(\"Considering split %f, entropy %f -> %f, %f. Gain %f\", thr, H, LH, RH, informationGain);\n    if (informationGain > bestGain || i === 0) {\n      bestGain = informationGain;\n      bestw1 = w1;\n      bestw2 = w2;\n      bestthr = dotthr;\n    }\n  }\n\n  return { // model\n    w1: bestw1,\n    w2: bestw2,\n    dotthr: bestthr\n  };\n}\n\n/**\n * [decision2DStumpTest description]\n * returns label for a single data instance\n *\n * @param  {Array}  inst  -\n * @param  {Object} model -\n * @return {Number}\n */\nfunction decision2DStumpTest(inst, model) {\n  if (!model) {\n    // this is a leaf that never received any data...\n    return 1;\n  }\n  return inst[0] * model.w1 + inst[1] * model.w2 < model.dotthr ? 1 : -1;\n}\n\n/**\n * [entropy description]\n * Misc utility functions\n *\n * @param  {String} labels -\n * @param  {Array}  ix     -\n * @return {Number}\n */\nfunction entropy(labels, ix) {\n  var N = ix.length;\n  var p = 0;\n  for (var i = 0; i < N; i++) {\n    if (labels[ix[i]] == 1) {\n      p += 1;\n    }\n  }\n  p = (1 + p) / (N + 2); // let's be bayesian about this\n  var q = (1 + N - p) / (N + 2);\n  return -p * Math.log(p) - q * Math.log(q);\n}\n\n/**\n * [randf description]\n * generate random floating point number between a and b\n *\n * @param  {Number} a -\n * @param  {Number} b -\n * @return {Number}\n */\nfunction randf(a, b) {\n  return Math.random() * (b - a) + a;\n}\n\n/**\n * [randi description]\n * generate random integer between a and b (b excluded)\n *\n * @param  {Number} a -\n * @param  {Number} b -\n * @return {Number}\n */\nfunction randi(a, b) {\n  return Math.floor(Math.random() * (b - a) + a);\n}\nmodule.exports = exports['default'];"

/***/ }
/******/ ])
});
;
//# sourceMappingURL=forestjs.js.map