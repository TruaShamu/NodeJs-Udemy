const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.write('<html>');
        res.write('<head><title>Assignment 1!</title></head>');
        res.write('<body>');
        res.write('<h1>Enter Username:<h1>');
        res.write('<form action="/message" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>');
        res.write('</body>')
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Trua</li>');
        res.write('<li>Makaio</li>');
        res.write('<li>Nalani</li>');
        res.write('<li>Malia</li>');
        res.write('<li>Katina</li>')
        res.write('</ul>')
        res.write('</body>')
        res.write('</html>')
        return res.end()
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(parsedBody);
            fs.writeFile("message.txt", message, err => {
                res.statusCode = 302;
                //res.setHeader('Location', '/');
                return res.end();
            });
        });
        
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Jello!!!!</title></head>');
    res.write('<body><h1>Killjoys, make some noise!!!</h1></body>');
    res.write('</html>');
    res.end();
    //process.exit();
}

module.exports = {
    handler: requestHandler,
    someText: 'THE BLACK PARADE'
};

module.exports.handler = requestHandler;