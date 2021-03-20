const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
    let Yetkili = await db.fetch(`modRole.${message.guild.id}`);
  if(!Yetkili) return message.channel.send(`Sistem ayarlanmamış. Ayarlamak İçin !modRole`)
  
  
	  const embed = new Discord.MessageEmbed()
     .setColor("BLUE")
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	 .setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())
	 
	  if(!message.member.roles.cache.has(Yetkili)) return message.channel.send(embed.setDescription("Sende Bu Komutu Kullanabilmek Gerekli İzin Sende Bulunmuyor"))

	  let obj = await db.get(`serverData.${message.guild.id}.botsData`) || {}
	  let veri = Object.keys(obj).map(botID => {
		return {
		  ID: botID,
		  durum: obj[botID].status
		};
	  }).filter(data => data.durum == "Beklemede")
	  if(veri.length <= 0) return message.channel.send(embed.setDescription("Şuan Beklemede Olan Bot Bulunmuyor")) 
	  
	 return message.channel.send(embed .setDescription(
	  `Sistem Şuan Toplam **${veri.length}** Bot Onay Beklemede! \n\n`+
	  veri.map(data => `(**${data.ID}**) | [Botu Ekle (0)](https://discord.com/oauth2/authorize?client_id=${data.ID}&scope=bot&permissions=0) `).join("\n"))
	  )
  }

exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'başvuru-liste',
  description: 'kız rolünü ayarlar',
  usage: '!kız-rol @rol'
}