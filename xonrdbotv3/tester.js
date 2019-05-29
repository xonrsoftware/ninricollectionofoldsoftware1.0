const Discord = require('discord.js');
const client = new Discord.Client({
    fetchAllMembers: true
});
var eyes = require('eyes');
var https = require('https');
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
const {
    JSDOM
} = jsdom;
//var arrayofdata = JSON.parse(fs.readFileSync('data/platimarket_data.json', 'utf8'));
/*async function deleteallanother() {
  const msgs = await client.channels.get("507153088898007074").messages.fetch({
    limit: 100
  });
  await msgs.filter(ch => arrayofdata.filter(x => x["msgid"] == ch.id).length == 0).forEach(async msg => {
    //console.log(msg);
    await msg.delete();
  });
}*/
client.on('error', (error) => {
    console.log("Error d.js!");
    process.exit(1);
});


process.on('unhandledRejection', function (reason, p) {
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    //setTimeout(function () {
    process.exit(1);
    // }, 3000);
    // application specific logging here
});
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
    setTimeout(function () {
        process.exit(1);
    }, 3000);
    // process.exit(1);
});

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
class ScriptEmojiGuildStore {
    constructor(guild) {
        this.guild = guild;
    }
    async init(){
        if(/^\d+$/.test(this.guild.id) == true){
        let files = fs.readdirSync("/home/xonrdbotv3/data/emojis/"+this.guild.id);
        for(let i in files) {
            if(path.extname(files[i]) === ".txt") {
console.log(files[i]);
            }
         }
        }else{
            console.log("hackattemp");
        }
    }

}
async function CleanUpTextChannel(channel,compare){
    let lastid = null;
    while (true) {
        const messages = await channel.messages.fetch({
            limit: 100,
            ...(lastid !== null && {
                before: lastid
            })
        });
        if (messages.size > 0) {
            lastid = messages.last().id;
            await Promise.all(messages.filter(x => !compare(x)).map(x => x.delete())).catch(function (reason) {
                if (reason.code != 10008) {
                    console.log("DeletionError:" + reason);
                    process.exit(1);
                }
            });
        } else {
            break;
        }
    }
}
let isready = false;
client.on('ready', async () => {
    if (isready) return;
    else isready = true;

    await CleanUpTextChannel(client.channels.get("286198213612929024"),()=>false);
    console.log("Done.");
    //await singlefire();

});
const mysql = require('mysql2/promise');
var connection = null;
async function singlefire() {
    connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'заменить',
        password: 'заменить',
        database: 'заменить',
        charset: 'utf8mb4'
    });
    setInterval(function () {
        connection.ping();
    }, 5000);
}
client.on('message', msg => {
    /*  if (msg.content === 'ping') {
        msg.reply('pong');
      }*/
});

client.login('заменить');