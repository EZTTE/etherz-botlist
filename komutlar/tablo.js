const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {

	 let succSize = db.get(`serverData.${message.guild.id}.succSize`) || 0;
	 let waitSize = db.get(`serverData.${message.guild.id}.waitSize`) || 0;
	 let redSize = db.get(`serverData.${message.guild.id}.redSize`) || 0;
	   
	 const embed = new Discord.MessageEmbed()
	  .setColor("BLUE")
	  .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	  .setTimestamp()
	  .setDescription(`Toplam Botlar; **${succSize + waitSize + redSize}**\nOnaylanan Botlar; **${succSize}**\nBekleyen Botlar; **${waitSize}**\nReddedilen Botlar; **${redSize}**`)
	  .setFooter(client.user.username, client.user.avatarURL())
     message.channel.send(embed)
  }
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'tablo',
  description: 'kız rolünü ayarlar',
  usage: '!kız-rol @rol'
}