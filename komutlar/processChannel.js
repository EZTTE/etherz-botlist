const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {  

let mentionChannel = message.mentions.channels.first();
  db.set(`processChannel.${message.guild.id}`, mentionChannel.id);
  message.channel.send(new Discord.MessageEmbed()
  .setAuthor("EtherZ Bot",client.user.avatarURL())
  .setColor("#f8f8f9")
  .setDescription(`**<a:tenor:807201675738611800> | Kanal başarıyla ${mentionChannel} olarak ayarlandı**`)
  .setFooter("Tüm Hakları Saklıdır."))
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'processChannel',
  description: 'kız rolünü ayarlar',
  usage: '!kız-rol @rol'
}