const AMONG_US_TEXT_CHANNEL = '756587067017789582'
const AMONG_US_VOICE_CHANNEL = '756583999228346449' 
const CAPTAIN_ROLE_ID = '756596214778298499' 

const ROOMS = []

class Game_Room {
    constructor(voiceChannelID, textChannelID, captainRoleID){
        this.channelID = voiceChannelID
        this.cmdChannelID = textChannelID
        this.captainRoleID = captainRoleID
        this.available = true 
        this.state = true
        this.connectedUsers = 0
    }

    takeRoom(wolf_borrower) {
        if (this.available){
            this.borrower = wolf_borrower
            this.available = false
            return true
        }
        return false
    }

    connect(){
        this.connectedUsers += 1
    }

    disconnect(){
        var empty = false
        this.connectedUsers--
        if (this.connectedUsers == 0){
            empty = true
        }
        return empty
    }
} 

function addRoom(text_channel_id, voice_channel_id, captain_role_id){
    ROOMS.push(new Game_Room(voice_channel_id, text_channel_id, captain_role_id))
    console.log(ROOMS)
}

function takeRoom(borrower_id){
    return ROOMS.find((room) => room.takeRoom(borrower_id)) != undefined
}

function changeVoiceState(voice_channel, text_channel, nextState) {
    var result = false
    if (typeof(nextState) === 'boolean'){
        var target_room = ROOMS.find((room) => room.channelID === voice_channel && room.cmdChannelID === text_channel)
        if (target_room != undefined){
            target_room.state = nextState
            result = true
        }
    }
    return result
}

function connect(voice_channel){
    var target_room = ROOMS.find((room) => room.channelID === voice_channel)
    if (target_room != undefined){
        target_room.connect()
    }
}

function getRoomState(voice_channel_id){
    var result = undefined
    var target_room = ROOMS.find((room) => {room.channelID === voice_channel_id})
    if (target_room != undefined){
        result = target_room.state
    }
    return result
}

function disconnect(voice_channel, close_action){
    var result = false
    var target_room = ROOMS.find((room) => room.channelID === voice_channel)
    if (target_room != undefined){
        if (target_room.disconnect()){
            close_action(target_room)
        }
        result = true
    }
    return result
}

exports.addRoom = addRoom
exports.takeRoom = takeRoom
exports.connect = connect
exports.disconnect = disconnect
exports.changeVoiceState = changeVoiceState
exports.getRoomState = getRoomState