const { Wolf }= require('./wolf')

exports.CMD_PREFIX = '!'
exports.EMBEDCOLOR = '#8dd1e0'
exports.SQUAD_SERVER_ID = '524374028656312320'
exports.ADMIN_ID = '335499190899703809'

const ADMINCALLTIME = 150000 
const Server_Wolfs = [] 

exports.addWolf = (name, username, id, dm_id)  => { Server_Wolfs.push(new Wolf(name, username, id, dm_id)) }

exports.requestHelp = (wolf_id, request_date) => {
    var requester = lookWolf(wolf_id)
    if (requester != undefined) return requester.requestHelp(request_date, ADMINCALLTIME)
}

function lookWolf(wolf_id){
    return Server_Wolfs.find((wolf) => wolf.id === wolf_id)
}
