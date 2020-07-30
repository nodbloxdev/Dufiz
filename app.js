const { config } = require('dotenv');
const fs = require('fs');
const { Client, Collection, MessageAttachment } = require('discord.js');

const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();


const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();

client.aliases = new Collection();

config({
    path: __dirname + "/.env"
})

client.once('ready', () => {
	console.log(`${client.user.username} is now ONLINE.`)
});



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
    
    console.log(`${file} are loaded`)
}


client.on("ready", () => {
    client.user.setActivity("Dufiz Studio", {type: "WATCHING"});
});


client.on("message", async message => {

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(process.env.PREFIX)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    

    if (cmd.length === 0) return;
    
    let commandFiles = client.commands.get(cmd);
    if (!commandFiles) commandFiles = client.commands.get(client.aliases.get(cmd));

    if (commandFiles) 
    commandFiles.run(client, message, args);

});

client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;
 
   let data = await canva.welcome(member, { link: "https://cdn.discordapp.com/attachments/480178644203864085/738184791261839511/idk_lol.png" })
 
    const attachment = new MessageAttachment(
      data,
      "welcome-image.png"
    );
 
    channel.send(
      attachment
    );   
   });





client.login(process.env.TOKEN)