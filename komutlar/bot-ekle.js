const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
    let Kanal = await db.fetch(`addChannel.${message.guild.id}`);
  if(!Kanal) return message.channel.send(`Sistem ayarlanmamış. Ayarlamak İçin !addChannel`)
  
   let Kanal2 = await db.fetch(`logChannel.${message.guild.id}`);
  if(!Kanal2) return message.channel.send(`Sistem ayarlanmamış. Ayarlamak İçin !addChannel`)

  
      const embed = new Discord.MessageEmbed()
     .setColor("BLUE")
     .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
	 .setTimestamp()
     .setFooter(client.user.username, client.user.avatarURL())
	 

	  if(message.channel.id !== Kanal) return message.channel.send(embed.setDescription(`Bu Komutu Sadece <#${Kanal}> Kanalında Kullanabilirsin!`));
	  
	  let botID = args[0];
      if(!botID || isNaN(botID)) return message.channel.send(embed.setDescription("Lütfen Eklemek İstediDiniz Botun ID sini Giriniz."));
	  let discordBot = null;
      try {
		  discordBot = await client.users.fetch(botID);
	  }	catch {
          return message.channel.send(embed.setDescription("Discord Apide Böyle Bir Bot Bulamadım."));
	  }		

	  if(!discordBot.bot) return message.channel.send(embed.setDescription("Lütfen Bot IDsi Giriniz, Kullanıcı ID Girmeyin!"));
	  let bot =  db.fetch(`serverData.${message.guild.id}.botsData.${botID}`);
	  
 
	  if(bot) {
		let member = await client.users.fetch(bot.owner);
        return message.channel.send(`<a:no:727544475433566330> **${discordBot.username}** Adlı Bot Sisteme **${member.username}** Tarafından Eklenmiş Durum; **${bot.status}**`)
	 }
	
	  db.add(`serverData.${message.guild.id}.waitSize`, 1)
	  db.set(`serverData.${message.guild.id}.botsData.${botID}.owner`,  message.author.id)
	  db.set(`serverData.${message.guild.id}.botsData.${botID}.status`, "Beklemede")
	  
      let sira = db.fetch(`serverData.${message.guild.id}.waitSize`) || 0;
	   
	message.guild.channels.cache.get(Kanal2).send(
	  embed
	  .setDescription(`Sisteme Bir Bot Eklendi, Bu Bot ile Sırada Toplam **${sira}** Bot Mevcut!`)
	  .addField("**Ekleyen Hakkında**",`${message.author} (**${message.author.tag}**)`)
	  .addField("**Bot Hakkında**", `\`${discordBot.tag}\`(**${discordBot.id}**)`)
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
  name: 'bot-ekle',
  description: 'kız rolünü ayarlar',
  usage: '!kız-rol @rol'
}