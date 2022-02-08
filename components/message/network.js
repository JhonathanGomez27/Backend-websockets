const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();
const path = require("path");

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname)); //Appending extension
    }
});
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(pdf|doc|docx|jpg)$/)) {
            return cb(new Error('Error en el tipo de archivo.'));
        }
        cb(null, true);
    }
});

router.get("/", (req, res) => {
    const filterMessages = req.query.chat || null;
    controller.getMessages(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected error', 500, e)
        })
});

router.post("/", upload.single('file'), (req, res) => {

    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file).
        then((fullMessage)=>{
            response.success(req, res, fullMessage, 201);
        })
        .catch(e=>{
            response.error(req, res, 'Informacion Invalida', 400, 'Error en controlador',);
        });

    
});

router.patch("/:id", (req, res)=> {
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        }).catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        })
})

router.delete("/:id", (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200)
        }).catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        })
});

module.exports = router;