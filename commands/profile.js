const { MessageEmbed } = require("discord.js");

const { Canvas } = require("canvas-constructor")
const fetch = require("node-fetch")

module.exports = {
    name: "profile",
    description: "Returns with a fancy profile card",
    run: async (client, message, args) => {
        const avatar = await fetch(message.author.displayAvatarURL({format: 'png'}))
    
    
    
        let mage = new Canvas(500, 250)
        .setColor("#cfcfcf")
        .addRect(0, 0, 500, 250)
        .setColor("#4fa1e0")
        .addRect(0, 0, 500, 80)
        .setColor("#ffffff")
        .setTextFont('bold 40px Impact')
        .addText("PROFILE CARD", 110, 55)
        .setColor("#4fa1e0")
        .setTextFont('bold 20px Impact') 
        .addText(`ID - ${message.author.id}`, 30, 140)
        .addText(`TAG - ${message.author.tag}`, 30, 170)
        .addText(`GUILD NAME - ${message.guild.name}`, 30, 200)
        .setColor("#cfcfcf")
        .addCircle(60, 40, 33)
        .addCircularImage(await avatar.buffer(), 60, 40, 30)
        .toBuffer();
            
    message.channel.send({files: [mage]})
    }
}