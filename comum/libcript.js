const errs = require('restify-errors');
const validationContract = require('../validator/validator');
var sodium = require('sodium-native');

const libcript = (server) => {

    server.post('/criptbody', (req, res, next) => {
        try{
            var dados = req.body;
            var str   = JSON.stringify(dados);
            var nonce = Buffer.alloc(sodium.crypto_secretbox_NONCEBYTES);
            var message = Buffer.from(str);
            var ciphertext = Buffer.alloc(message.length + sodium.crypto_secretbox_MACBYTES);

            //Chave Secreta:
            var Key64 = '22vb22vb22vb29vb22vb22vb29vbB22vX9NRLiX9ZWs=';
            var key = Buffer.from(Key64, 'base64');
            sodium.crypto_secretbox_easy(ciphertext, message, nonce, key)
            let base64data = ciphertext.toString('base64');

            res.send({valor: base64data}); 
        } 
        catch (e) {
            res.send(new errs.BadRequestError(e));
        };
    });

    server.post('/decriptbody', (req, res, next) => {
        try{
            var dados = req.body;
            var str   = req.params.valor;
            var nonce = Buffer.alloc(sodium.crypto_secretbox_NONCEBYTES)
            var message = Buffer.from(str);
            var ciphertext = Buffer.alloc(message.length + sodium.crypto_secretbox_MACBYTES)

            //Chave Secreta:
            var Key64 = '22vb22vb22vb29vb22vb22vb29vbB22vX9NRLiX9ZWs=';
            var key = Buffer.from(Key64, 'base64');        
            sodium.crypto_secretbox_easy(ciphertext, message, nonce, key)
            
            let maCript = Buffer.from(str, 'base64');
            var plainText = Buffer.alloc(maCript.length - sodium.crypto_secretbox_MACBYTES);
            if (!sodium.crypto_secretbox_open_easy(plainText, maCript, nonce, key)) {
                res.send(new errs.BadRequestError('Decryption failed!'));
            } else {
                res.send(JSON.parse(plainText.toString()));
            }
        } 
        catch (e) {
            res.send(new errs.BadRequestError(e));
        };
    }); 


    server.post('/cript', (req, res, next) => {
        try{
            var str   = req.params.valor;
            var nonce = Buffer.alloc(sodium.crypto_secretbox_NONCEBYTES);
            var message = Buffer.from(str);
            var ciphertext = Buffer.alloc(message.length + sodium.crypto_secretbox_MACBYTES)
            //Chave Secreta:
            var Key64 = '22vb22vb22vb29vb22vb22vb29vbB22vX9NRLiX9ZWs=';
            var key = Buffer.from(Key64, 'base64');

            sodium.crypto_secretbox_easy(ciphertext, message, nonce, key)
            let base64data = ciphertext.toString('base64');
            res.send({valor: base64data});
        } 
        catch (e) {
            res.send(new errs.BadRequestError(e));
        };
    });

    server.post('/decript', (req, res, next) => {
        try{
            var dados = req.body;
            var str   = req.params.valor;

            var nonce = Buffer.alloc(sodium.crypto_secretbox_NONCEBYTES)
            var message = Buffer.from(str);
            var ciphertext = Buffer.alloc(message.length + sodium.crypto_secretbox_MACBYTES)
            //Chave Secreta:
            var Key64 = '22vb22vb22vb29vb22vb22vb29vbB22vX9NRLiX9ZWs=';
            var key = Buffer.from(Key64, 'base64');
            
            sodium.crypto_secretbox_easy(ciphertext, message, nonce, key)     
            let maCript = Buffer.from(str, 'base64');
            var plainText = Buffer.alloc(maCript.length - sodium.crypto_secretbox_MACBYTES);
            
            if (!sodium.crypto_secretbox_open_easy(plainText, maCript, nonce, key)) {
                res.send(new errs.BadRequestError('Decryption failed!'));
            } else {
                res.send({valor: plainText.toString()});
            }
        } 
        catch (e) {
            res.send(new errs.BadRequestError(e));
        };
    }); 
    
}

module.exports = libcript;