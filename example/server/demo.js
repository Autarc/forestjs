/**
 * Demo
 * ====
 *
 *
 */

var forestjs = require('../dist/forestjs.js')

var forest = new forestjs.RandomForest();

var data = [];
var labels = [];
var options = {
	type: 1
};

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

options.email = '';
options.password = '';

forest.trainCRP(data, labels, options).on('end', function(){
	var prob = forest.predictOne([(x-WIDTH/2)/ss, (y-HEIGHT/2)/ss]);
	// console.log(forest);
	console.log(prob);
});
