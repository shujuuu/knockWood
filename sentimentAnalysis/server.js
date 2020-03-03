// HTTP Portion
var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

// var options = {
//     key: fs.readFileSync('my-key.pem'),
//     cert: fs.readFileSync('my-cert.pem')
// };

function requestHandler(req, res) {

    var parsedUrl = url.parse(req.url);
    console.log("The Request is: " + parsedUrl.pathname);

    fs.readFile(__dirname + parsedUrl.pathname,

        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading ' + parsedUrl.pathname);
            }

            res.writeHead(200);
            res.end(data);
        }
    );
}
console.log('sentiment analysis running on 8080');

//sentiment analysis
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

//serial port
var connected = false;
var SerialPort = require('serialport');
var serialPort = new SerialPort("/dev/cu.usbmodem14101", {
    baudRate: 9600
});
// var Readline = SerialPort.parsers.Readline;
// var parser = new Readline();

serialPort.on("open", function () {
    console.log("serial port open & connected");
});

// let webSocketServer = require('ws').Server;
// WebSocket Portion
var io = require('socket.io').listen(httpServer);

io.sockets.on('connection',
    // We are given a websocket object in our function
    function (socket) {
        console.log("We have a new client: " + socket.id);

        socket.on('sendTranscript', function (data) {
            // console.log("Received: " + data);
            var result = sentiment.analyze(data);
            let score = result.score;
            console.log(result.tokens); //all the words
            console.log(result.score); //total score

            //option1: for local server only, send data
            if (result.score < "0") {
                console.log('this is bad result');

                // console.log('baud rate: ' + myPort.options.baudRate);
                serialPort.write(score.toString());
                
            }

            //option 2: for node server by anthony
            // socket.emit("result", result);
        });


        socket.on('disconnect', function () {
            console.log("Client has disconnected " + socket.id);
        });
    }
);
