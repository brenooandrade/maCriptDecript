const restify = require('restify');
const errs = require('restify-errors');
const corsMiddleware = require('restify-cors-middleware');
const bodyParser = require('body-parser');
const validationContract = require('../validator/validator');
const config = require('../comum/config');

//Criando servidor Restify
const server = restify.createServer({
    name: 'maCriptDecript',
    version: '1.0.0'
});

//Utilizando CORS, plugins restify, body-parser e query-parser
var cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['*', 'Authorization'],
    exposeHeaders: []
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser({
    mapParams: true,
    mapFiles: false,
    overrideParams: false
}));

server.use(restify.plugins.queryParser());

//Utilizar porta padrão
const port = normalizePort(global.PORT || 3010);
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
}

//Subindo servidor na porta padrão
server.listen(port, function () {
    console.log('maCriptDecript API Online - Porta: %s Ambiente: %s', process.env.PORT, process.env.NODE_ENV);
});

//URL principal
server.get('/', function (req, res, next) {
    res.send('maCriptDecript API Online!');
});

/* ## ROTAS PARA CRIPT DECRIPT ## */
libcript = require('../comum/libcript');
libcript(server); 

module.exports = server;

