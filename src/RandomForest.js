/**
 * RandomForest
 * ============
 *
 *
 */

import CrowdProcess from 'crowdprocess'
import DecisionTree from './DecisionTree'
import DecisionTreeRaw from 'raw!./DecisionTree.js'


/**
 *
 */
export default class RandomForest {

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
	train (data, labels, options = {}) {
		this.numTrees = options.numTrees || 100;
		// initialize many trees and train them all independently
		this.trees = new Array(this.numTrees);
		for (var i = 0; i < this.numTrees; i++) {
			this.trees[i] = new DecisionTree();
			this.trees[i].train(data, labels, options);
		}
	}

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
	trainCRP (data, labels, options = {}) {
		this.numTrees = options.numTrees || 100;

		// ignore local environment endpoint
		options.url = "https://api.crowdprocess.com:443"

		if (!options.token && !options.email || !options.password) {
			throw new Error('Missing credentials!');
		}

		var dataset = JSON.stringify({ data, labels, options})
		return CrowdProcess(options)(Array.apply(null, new Array(this.numTrees)).map(()=> dataset),
			[ // ~ program (incl. imports)
				DecisionTreeRaw,
				function Run (task) {
					var {data, labels, options} = JSON.parse(task)
					var tree = new DecisionTree()
					tree.train(data, labels, options)
					return JSON.stringify(tree);
				}
			].map((fn)=>fn.toString()).join('\n')
				/** webpack loader modified reference -> unformat inside the Run function.... **/
				.replace(/_DecisionTree2\['default'\]/g, 'DecisionTree')
				, (results)=> this.trees = results.map((result) => new DecisionTree(result))
			)
		.on('error', ::console.error)
	}

	/**
	 * [predictOne description]
	 * inst is a 1D array of length D of an example.
	 * returns the probability of label 1, i.e. a number in range [0, 1]
	 *
	 * @param  {Array}  inst -
	 * @return {Number}
	 */
	predictOne (inst) {
		// have each tree predict and average out all votes
		var dec = 0;
		var num = this.trees.length;
		for (var i = 0; i < num; i++) { // ~ numTrees
			dec += this.trees[i].predictOne(inst);
		}
		return dec / num;
	}

	/**
	 * [predict description]
	 * convenience function. Here, data is NxD array.
	 * returns probabilities of being 1 for all data in an array.
	 *
	 * @param  {Array}  data -
	 * @return {Number}
	 */
	predict (data) {
		var probabilities = new Array(data.length);
		for (var i = 0; i < data.length; i++) {
			probabilities[i] = this.predictOne(data[i]);
		}
		return probabilities;
	}
}
