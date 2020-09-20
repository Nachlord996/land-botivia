class Among_Us {
    constructor(voiceChannelID, textChannelID){
        this.channelID = voiceChannelID
        this.cmdChannelID = textChannelID
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

exports.Among_Us = Among_Us