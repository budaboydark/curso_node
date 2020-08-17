const shell = require('shelljs');
module.exports.contas = (server, req, res) => {
    res.send('controller teste')
}

module.exports.bkp = (server, req, res) => {
    const data = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') 
    res.send(data)
    
}