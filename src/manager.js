const data = require('./data_and_constants.js')
const Handlers = require('./handlers')

exports.manageMessage = (client, message) => {
 
    if (message.content.startsWith(data.CMD_PREFIX)) {
        manageCommand(client, message)
    }
}

function manageCommand(client, message) {
    let cmd = message.content.split(' ')
    switch(cmd.length){
        case 1:
            noParamsCommand(cmd[0], client, message);
            break;
        default: 
            Handlers.unknown(message);
    }
}

function noParamsCommand(command, client, message){
    switch (command) {
        case '!m':
            Handlers.greet(message)
            break;
        case '!help':
            Handlers.help(message)
            break; 
        case '!squad':
            Handlers.squad(client, message)
            break;
        case '!admin':
            Handlers.adminCall(client, message)
        default:
           break;
    }
}