const  store = require('./store');

function addUser(name) {

    if(!name){
        return Promise.reject('Invalid name');
    }

    const user = {
        name: name,
    }

    return store.add(user);
}

function listUsers() {
    return store.list();
}

function updateMessage(id, message){
    return new Promise(async (resolve, reject)=>{
        if(!id || !message) {
            reject('Invalid data');
            return false;
        }
        const result = await store.updateText(id, message)

        resolve(result);
    })
}

function deleteMessage(id){
    return new Promise((resolve, reject) => {
        
        if(!id){
            reject('Id invalido');
            return false;
        }

        store.removeMessage(id)
        .then(() =>{
            resolve();
        }).catch(e => {
            reject(e);
        });
    });
}

module.exports = {
    addUser,
    listUsers
}