const Discord = require('discord.js')
const data = require('./data_and_constants')

exports.unknown = (message) => {
    let response = new Discord.MessageEmbed(
        {
            title: "🦙 ¿ No hablas botiviano ? 🦙",
            color: data.EMBEDCOLOR,
            description: 'Que raro, aquí en botivia es muy popular...\nNo hay problema, puedes empezar con esta palabra:\n`!help`'
        }
    )
    message.channel.send(response)
}

exports.greet = (message) => {
    let response = new Discord.MessageEmbed(
        {
            title: "Saludos 🏂",
            color: data.EMBEDCOLOR,
            description: `Un placer verte de nuevo **${message.author.username}**!`
        }
    )

    message.channel.send(response)
}

exports.help = (message) => {
    let response = new Discord.MessageEmbed(
        {
            title: "🦙 ¿ Alguien ordenó un Botiviano ? 🦙",
            color: data.EMBEDCOLOR,
            description: "¡ Botiviano al rescate ! Siempre estoy a disposición\n\nDejo algunos llamados en mi idioma nativo:\n🔻 `!help` - Pide una mano\n🔻 `!m` - Recibe un saludo personal\n🔻 `!squad` - Muestra los admins\n🔻 `!admin` - Solicita ayuda al administrador\n\nUn saludo, que Dios te ayude.\nMientras tanto, me retiro a la montaña 💫"
        }
    )

    message.channel.send(response)
}

exports.adminCall = (client, message) => {
    var response
    var member_id = message.member.id
    var next_help_time = data.requestHelp(member_id, Date.now())
    if (next_help_time == undefined){
        response = new Discord.MessageEmbed(
            {
                title: "👑 Larga vida al rey 👑",
                color: data.EMBEDCOLOR,
                description: "El admin está en camino, relájate con un café ☕.\nMientras tanto, me retiro a la montaña 💫"
            }
        )
        let telegram = new Discord.MessageEmbed(
            {
                title: "🐐 Escuadrón de cabras informantes 🗻",
                color: data.EMBEDCOLOR,
                description: "**Admin**! " + message.author.username + " está en problemas.\nSolicita su ayuda en " + message.guild.name +" #" + message.channel.name
            }
        )

        client.guilds.cache.get(data.SQUAD_SERVER_ID).members.cache.get(data.ADMIN_ID).send(telegram)
    } else {
        var timeleft_seg = Math.floor(next_help_time / 1000)
                if (timeleft_seg > 60){
                    timeleft_min = (timeleft_seg / 60) >> 0
                    timeleft_seg = timeleft_seg % 60
                } else { 
                    timeleft_min = 0
                }
        var line = timeleft_min + 'm ' + timeleft_seg + 's'
        response = new Discord.MessageEmbed(
            {
                title: "⛔️ En Botivia no se spammea ⛔️",
                color: data.EMBEDCOLOR,
                description: '<@' + message.author.id + '> intentalo de nuevo en **' + line + '**.\nRegreso a mis actividades de Botiviano promedio 🏕'
            }
        )
    }

    message.channel.send(response)
}


exports.squad = (client, message) => {
    var response
    var squad_sv = client.guilds.cache.get(data.SQUAD_SERVER_ID)

    if (message.guild.id == squad_sv.id) {
        squad_sv.members.fetch().then((members) => {
            var alpha_wolfs = ""
            for (member of members.values()) {
                console.log(member.roles.cache.values())
                if (member.roles.cache.find(role => (role.name === "Lobos Alfa")) != undefined) {
                    alpha_wolfs += `🐺 **${member.user.username}** \n`
                }

            }
            response = new Discord.MessageEmbed(
                {
                    title: 'Mucho más que una manada',
                    description: `Nuestro Alpha Supremo:\n👑 **SimonLP**\n\nLobos Alpha:\n${alpha_wolfs}`
                })
           message.channel.send(response)
        })
    }
}

exports.playAmongUs = (client, message) => {
    var response 
    var requester_id = message.member.id
    if (data.takeAmongUsRoom(requester_id)){
        var server = client.guilds.cache.get(data.SQUAD_SERVER_ID)
        server.members.fetch().then(
            (members) => {
                var role = server.roles.cache.get(data.CAPTAIN_ROLE_ID)
                var member = members.get(requester_id)
                if (member != undefined && role != undefined){
                   member.roles.add(role)
                   member.user.send(new Discord.MessageEmbed({
                       title: '🦅 ¡ Eres el capitán ! 🦅',
                       color: data.EMBEDCOLOR,
                       description: 'Ahora dispones del canal #amongus para enviar comandos!\nAplica las leyes de Botivia:\n🔻`!mute` - Silencia a todos en la sala\n🔻`!meet` - Habilita el audio en las reuniones\n\nDisfuta de tu partida! 💫'
                   }))
                }
            }
        )
        response = new Discord.MessageEmbed({
            title: '🕵 ¡ Descubre al asesino ! 🕵',
            color: data.EMBEDCOLOR,
            description: '<@' + message.author.id + '>, eres el nuevo capitán de la nave 🚀\nTengo que informar a la base del impostor, Buen viaje!'
        })
    } else {
        var response = new Discord.MessageEmbed({
            title: '🔑 ¡ Tal vez la próxima ! 🔑',
            color: data.EMBEDCOLOR,
            description: 'La sala se encuentra reservada, inténtalo más tarde.'
        })
    
    }    
    message.channel.send(response)
}

exports.muteAll = (client, message) => {
    var voice_channel = message.member.voice.channel
    if (message.channel.id === data.AMONG_US_TEXT_CHANNEL && voice_channel.id === data.AMONG_US_VOICE_CHANNEL){
        var response = new Discord.MessageEmbed({
            color: data.EMBEDCOLOR,
            description: 'Se ha silenciado el canal #among-us'
        })

        voice_channel.members.forEach((player) => {player.voice.setMute(true)})
        data.Among_Us_Channel.state = false
        
        message.channel.send(response)
    }
}

exports.meet = (client, message) => {
    var voice_channel = message.member.voice.channel
    if (message.channel.id === data.AMONG_US_TEXT_CHANNEL && voice_channel.id === data.AMONG_US_VOICE_CHANNEL){
        var response = new Discord.MessageEmbed({
            color: data.EMBEDCOLOR,
            description: 'LLegó el momento de hablar!'
        })

        voice_channel.members.forEach((player) => {player.voice.setMute(false)})
        data.Among_Us_Channel.state = true
        
        message.channel.send(response)
    }
}

exports.amongUsConnect = (client, member) => {
    data.Among_Us_Channel.connect()
    if (!data.Among_Us_Channel.state){
        member.voice.setMute(true)
    }
}

exports.amongUsDisconnect = (client, member) => {
    member.voice.setMute(false)
    var channel = data.Among_Us_Channel
    if (channel.disconnect()){
        var captain_ID = channel.borrower.id
        var captain = client.guilds.cache.get(data.SQUAD_SERVER_ID).members.cache.get(captain_ID)
        if (captain != undefined){
        captain.fetch().then(
            (member) => {            
                    captain.roles.remove(data.CAPTAIN_ROLE_ID)
                }
            
        )}
    }
}