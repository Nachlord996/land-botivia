/**
 * A simple and clean Node JS Module to work with Among Us rooms.
 * 
 * Basically, a room is a unique 3-tuple which holds enough information for simulating Among Us desired behavior.
 * Every room is made up from 1 private text channel, 1 public voice channel and a certain role for admin purposes.
 * Making a reservation over a room, change its voice state (mute/talking) and managing connections are the main features
 * implemented by this module.
 *      
 * Dev: Ignacio Martinez
 * Last Update: 21/09/2020 
 */

 // Temporal Storage for instances of Game_Room 
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

    connect() {
        if(!this.available){
            this.connectedUsers += 1
        }
    }

    disconnect() {
        var empty = false
        if(!this.available){
            this.connectedUsers--
            if (this.connectedUsers == 0){
                empty = true
                this.available = true
            }
        }
        return empty
    }

    generateTicket(){
        return new Room_ticket(this.channelID, this.cmdChannelID, this.captainRoleID)
    }
} 

class Room_ticket {
    constructor(voiceChannelID, textChannelID, captainRoleID){
        this.channelID = voiceChannelID
        this.cmdChannelID = textChannelID
        this.captainRoleID = captainRoleID
    }
}

/**
 *  Add a new room to the storage
 *  Params names are self-explanatory 
 * */ 
function addRoom(text_channel_id, voice_channel_id, captain_role_id){
    ROOMS.push(new Game_Room(voice_channel_id, text_channel_id, captain_role_id))
}

/**
 *  Assign an available room to a requester
 *  Checks whether there is a empty room. If condition is met, generates a room ticket with basic information of the assigned room 
 *  Otherwise returns undefined
 */
function takeRoom(borrower_id){
    var ticket
    var available_room = ROOMS.find((room) => room.takeRoom(borrower_id))
    if (available_room != undefined){
        ticket = available_room.generateTicket()
    }
    return ticket
}

/**
 * Set voiceState value of a specific room.
 * Searchs for desired room and assigns param value to room's property
 * Return true when voiceState was changed, otherwise false
 */
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

/**
 * Get voiceState value of a specific room.
 * Returns its state if found.
 */
function getRoomState(voice_channel_id){
    var result = undefined
    var target_room = ROOMS.find((room) => room.channelID === voice_channel_id)
    if (target_room != undefined){
        result = target_room.state
    }
    return result
}

function connect(voice_channel){
    var target_room = ROOMS.find((room) => room.channelID === voice_channel)
    if (target_room != undefined){
        target_room.connect()
    }
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

// Make the functions public
exports.addRoom = addRoom
exports.takeRoom = takeRoom
exports.connect = connect
exports.disconnect = disconnect
exports.changeVoiceState = changeVoiceState
exports.getRoomState = getRoomState