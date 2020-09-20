const { Wolf }= require('./wolf')
const { Among_Us } = require('./among_us')

const AMONG_US_TEXT_CHANNEL = '756587067017789582'
const AMONG_US_VOICE_CHANNEL = '756583999228346449' 

exports.CMD_PREFIX = '!'
exports.EMBEDCOLOR = '#8dd1e0'
exports.SQUAD_SERVER_ID = '524374028656312320'
exports.ADMIN_ID = '335499190899703809'
exports.CAPTAIN_ROLE_ID = '756596214778298499' 
exports.AMONG_US_VOICE_CHANNEL = AMONG_US_VOICE_CHANNEL
exports.AMONG_US_TEXT_CHANNEL = AMONG_US_TEXT_CHANNEL

const ADMINCALLTIME = 150000 
const Server_Wolfs = [] 
const Among_Us_Channel = new Among_Us(AMONG_US_VOICE_CHANNEL, AMONG_US_TEXT_CHANNEL)

exports.addWolf = (name, username, id, dm_id)  => { Server_Wolfs.push(new Wolf(name, username, id, dm_id)) }

exports.requestHelp = (wolf_id, request_date) => {
    var requester = lookWolf(wolf_id)
    if (requester != undefined) return requester.requestHelp(request_date, ADMINCALLTIME)
}

function lookWolf(wolf_id){
    return Server_Wolfs.find((wolf) => wolf.id === wolf_id)
}

exports.takeAmongUsRoom = (borrower_id) => {
    var requester = lookWolf(borrower_id)
    if (requester != undefined) return Among_Us_Channel.takeRoom(requester) 
}

exports.Among_Us_Channel = Among_Us_Channel


