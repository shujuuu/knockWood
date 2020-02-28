// HTTP Portion
var https = require('https');
var fs = require('fs');
var url = require('url');

var options = {
    key: fs.readFileSync('my-key.pem'),
    cert: fs.readFileSync('my-cert.pem')
};

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

var httpServer = https.createServer(options, requestHandler);
httpServer.listen(8080);

console.log('sentiment analysis running on 8080');

//sentiment analysis
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

//serial port
var connected = false;
var SerialPort = require('serialport');
var serialPort = new SerialPort("/dev/cu.usbmodem1411", {
    baudRate: 9600
});
serialPort.on("open", function () {
    console.log("Connect to Arduio");
});

// WebSocket Portion
var io = require('socket.io').listen(httpServer);

io.sockets.on('connection',
    // We are given a websocket object in our function
    function (socket) {
        console.log("We have a new client: " + socket.id);

        socket.on('sendTranscript', function (data) {
            console.log("Received: " + data);

            var result = sentiment.analyze(data);
            console.log(result);

            //if bad then send

            if (connected) {
                serialPort.write("to be sent to arduino");
            }
        });


        socket.on('disconnect', function () {
            console.log("Client has disconnected " + socket.id);
        });
    }
);
