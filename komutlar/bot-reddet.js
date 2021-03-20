const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  let Yetkili = await db.fetch(`modRole.${message.guild.id}`);
  if(!Yetkili) return message.channel.send(`Sistem ayarlanmamış. Ayarlamak İçin !modRole`)

  
 let Kanal = await db.fetch(`processChannel.${message.guild.id}`);
  if(!Kanal) return message.channel.send(`Sistem ayarlanmamış. Ayarlamak İçin !processChannel`)

   
   let Kanal2 = await db.fetch(`logChannel.${message.guild.id}`);
  if(!Kanal2) return message.channel.send(`Sistem ayarlanmamış. Ayarlamak İçin !addChannel`)

  
  let Dev = await db.fetch(`devRole.${message.guild.id}`);
  if(!Dev) return message.channel.send(`Sistem ayarlanmamış. Ayarlamak İçin !devRole`)

  
      const embed = new Discord.MessageEmbed()
     .setColor("BLUE")
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	 .setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())

	  if(!message.member.roles.cache.has(Yetkili)) return message.channel.send(embed.setDescription("Üzgünüm Bu Komutu Kullanabilmek Gerekli İzin Sende Bulunmuyor"))
	  if(message.channel.id !== Kanal) return message.channel.send(embed.setDescription(`Bu Komutu Sadece <#${Kanal}> Kanalında Kullanabilirsin!`));
      let botID = args[0];
      let redReason = args.slice(1).join(' ');
      if(!botID || isNaN(botID)) return message.channel.send(embed.setDescription("Reddetmek istediğiniz Botun ID sini Belirtiniz."));
	  if(!redReason) return message.channel.send(embed.setDescription("Lütfen Bir Sebeb Belirtiniz."));
	  
	  let discordBot = null;
      try {
		  discordBot = await client.users.fetch(botID);
	  }	catch {
          return message.channel.send(embed.setDescription("Discord Apide Böyle Bir Bot Bulamadım."));
	  }	
	  
	  let bot =  db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
	  if(!bot) return message.channel.send(embed.setDescription(`**${discordBot.username}** Adlı Bot Sisteme Daha Önceden Eklenmemiş.`));

	  if(bot.status == "Reddedildi")  return message.channel.send(embed.setDescription(`**${discordBot.username}** Adlı Bot Zaten Reddedilmiş Durumda!`))
	  if(bot.status == "Beklemede")  db.subtract(`serverData.${message.guild.id}.waitSize`, 1)
	  if(bot.status == "Onaylı")  db.subtract(`serverData.${message.guild.id}.succSize`, 1)
       let memberData = await client.users.fetch(bot.owner)
   
       if(message.guild.members.cache.get(bot.owner)) message.guild.members.cache.get(bot.owner).roles.remove(Dev)
		   
	   db.add(`serverData.${message.guild.id}.redSize`, 1);
	   db.set(`serverData.${message.guild.id}.botsData.${botID}.status`, "Reddedildi")
	   db.set(`serverData.${message.guild.id}.botsData.${botID}.redReason`, redReason)
	  message.guild.channels.cache.get(Kanal2).send(
	   embed.setDescription(`${memberData} (**${memberData.tag}**) Adlı Kişinin \`${discordBot.tag}\`(**${discordBot.id}**) Adlı Botu \`${redReason}\` Sebebi ile Reddedildi!`)
	  
	  )
    message.react('✅')

  }

exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'bot-reddet',
  description: 'kız rolünü ayarlar',
  usage: '!kız-rol @rol'
}