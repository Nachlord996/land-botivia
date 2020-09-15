class wolf {
    constructor(name, username, id, dm_id){
        this.name = name
        this.username = username
        this.id = id
        this.dm_id = dm_id
        this.helpRequest = new helpRequest()
    }

    requestHelp(date, wait_ms){
        let next_available_request_time =  this.helpRequest.request_date + (wait_ms)
        if (next_available_request_time > date) return next_available_request_time - date
        this.helpRequest.executeRequest(date)
    }

}

class helpRequest {
    constructor(){
        this.request_state = requestState.CLEARED
        this.request_date = Date.now()
    }

    clearRequest(date) {
        this.requestState = requestState.CLEARED 
        this.request_date = date 
    }

    executeRequest(date){
        this.requestState = requestState.TAKEN
        this.request_date = date
    }
}

const requestState = {
    CLEARED: 'false',
    TAKEN: 'true'
}

exports.Wolf = wolf