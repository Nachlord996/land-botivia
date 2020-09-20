const data = require('./data_and_constants.js')
const Handlers = require('./handlers')

exports.manageMessage = (client, message) => {
    if (message.content.startsWith(data.CMD_PREFIX)) {
        manageCommand(client, message)
    }
}

exports.manageVoiceUpdate = (client, old_state, new_state) => {

    switch(old_state.channelID){
        case data.AMONG_US_VOICE_CHANNEL:
            if (new_state.channelID != data.AMONG_US_VOICE_CHANNEL){
                Handlers.amongUsDisconnect(client, old_state.member)
            } 
            break;
        default:
            if (new_state.channelID === data.AMONG_US_VOICE_CHANNEL){
                Handlers.amongUsConnect(client, new_state.member)
            } else {
                if (new_state.channelID != undefined){
                    new_state.member.voice.setMute(false)
                }
            }
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
            break;
        case '!monjas':
            Handlers.playAmongUs(client, message)
            break;
        case '!mute':
            Handlers.muteAll(client, message)
            break;
        case '!meet':
            Handlers.meet(client, message)
            break;
        default:
           Handlers.unknown(message)
    }
}