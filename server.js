const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const logger = require('morgan');
const dotenv = require('dotenv').config();
const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');
const cors = require('cors');
const { contact, haircutStyles, scheduleAppointment } = require('./routes');

app.set('appName', 'FreshCutz');
app.set('port', dotenv.parsed.PORT || 3001);

app.use(logger());
app.use(errorHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(history({
    rewrites: [
        {
            to: /^\/api\/.*$/,
            from: function(context) {
                return context.parsedUrl.path;
            }
        },
    ],
}));
app.use(serveStatic(path.join(__dirname, 'build')));
app.use(cors());

// Routes
app.use(haircutStyles);
app.use(contact);
app.use(scheduleAppointment);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});

const server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});

