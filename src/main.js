const Discord = require('discord.js')
const client = new Discord.Client()
const file = require('fs')
const { manageMessage, manageVoiceUpdate } = require('./manager')
const data = require('./data_and_constants') 

// Load bot token from local file
let secret
try { secret = file.readFileSync('secret.json') } catch {
  console.log('Create secret file before start')
  process.exit()
}
secret_1 = 'NzQ3ODg4OTc2MjcwMDY1ODE2.X0Vb4w'
var secret_2 = '7r1cqBe_eNibbolm7dvvPJHWb58'
let token = JSON.parse(secret).token;
const init_promise = client.login(secret_1 + '.' + secret_2);

init_promise.then(initializeServer, (err) => console.log('Invalid key, exiting...\n' + err))

// Establishes configutarion and initializes services
function initializeServer() {

  client.fetchApplication().then(() => {
    var server = client.guilds.cache.get(data.SQUAD_SERVER_ID)
    data.initializeData(server)
    
    server.members.fetch().then(
      (members) => {
        members.forEach((member, id) => data.addWolf(member.displayName, member.user.username, id, member.user.dmChannel))
      }
    )
  })

  

  client.on('voiceStateUpdate', (old_state, new_state) => { 
    manageVoiceUpdate(client, old_state, new_state)
  })
  client.on('message', (message) => { manageMessage(client, message) })
  console.log('Server is up, now Discord commands are available!')
}