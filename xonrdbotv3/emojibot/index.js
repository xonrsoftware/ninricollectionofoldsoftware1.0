const Discord = require('discord.js');
const client = new Discord.Client({
    fetchAllMembers: true
});
var eyes = require('eyes');
var https = require('https');
const md5File = require('md5-file/promise')
var fs = require('fs');
var sha256 = require('js-sha256').sha256;
var crypto = require('crypto');
var rp = require('request-promise');
var xml2js = require('xml2js');
const cheerio = require('cheerio');
const jsdom = require("jsdom");
var path = require('path');
const parserrelax = require('really-relaxed-json').createParser();
const tough = require('tough-cookie');
const mysql = require('mysql2/promise');
const sharp = require('sharp');

const {
    JSDOM
} = jsdom;

client.on('error', (error) => {
    console.log("Error d.js: "+error);
    process.exit(1);
});
process.on('unhandledRejection', function (reason, p) {
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    process.exit(1);
});
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
    process.exit(1);
});

const ScriptEmojiGuildStore = require('./classes/ScriptEmojiGuildStore.js');

let isready = false;
client.on('ready', async () => {
    if (isready) return;
    else isready = true;
    
    /* let Embed = new Discord.MessageEmbed()
    .setTitle("FFFF")
    .setDescription("[<:lol:568702458918993920>](https://discordapp.com/channels/568609662073700353/568609750594617360/568717043948584964)")
    .setTimestamp();
    client.guilds.get("568609662073700353").channels.get("568940150088925202").send(Embed);
 */


    let ScriptEmojiGuildStoreVar = new ScriptEmojiGuildStore("568609662073700353");
    await ScriptEmojiGuildStoreVar.init(client);
});



client.login('заменить');