const Discord = require('discord.js')
const client = new Discord.Client()
const file = require('fs')
const { manageMessage } = require('./manager')
const data = require('./data_and_constants')

// Load bot token from local file
let secret
try { secret = file.readFileSync('secret.json') } catch {
  console.log('Create secret file before start')
  process.exit()
}
let token = JSON.parse(secret).token;
const init_promise = client.login(token);

init_promise.then(initializeServer, (err) => console.log('Invalid key, exiting...\n' + err))

// Establishes configutarion and initializes services
function initializeServer() {

  client.fetchApplication().then(() => {
    client.guilds.cache.get(data.SQUAD_SERVER_ID).members.fetch().then(
      (members) => {
        members.forEach((member, id) => data.addWolf(member.displayName, member.user.username, id, member.user.dmChannel))
      }
    )
  })
 
  client.on('message', (message) => { 

    manageMessage(client, message) })
  console.log('Server is up, now Discord commands are available!')
}