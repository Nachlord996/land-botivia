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
            description: "¡ Botiviano al rescate ! Siempre estoy a disposición\n\nDejo algunos llamados en mi idioma nativo:\n🔻 `!help` - Pide una mano\n🔻 `!m` - Recibe un saludo personal\n🔻 `!squad` - Muestra los admins\n\nUn saludo, que Dios te ayude.\nMientras tanto, me retiro a la montaña 💫"
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