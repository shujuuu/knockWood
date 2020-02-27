//2. analyze sentiment
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var result = sentiment.analyze('i never get sick');
console.dir(result);
//3. send to arduino