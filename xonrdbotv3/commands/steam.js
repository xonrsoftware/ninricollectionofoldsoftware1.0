//Require base modules
const discord = require("discord.js");
const request = require('request-promise');
const steamID = require('steamid');
const moment = require('moment');

// Require config file and steamCountries json database
var config = require('../config.json');
var steamCountries = require('../data/steam_countries.min.json'); // Thanks to https://github.com/Holek/steam-friends-countries for the JSON file.


var self = module.exports = {

  getSteamUserData: async function (message, steamIDString, userid) {

    if (steamIDString === undefined) {
      //console.error("ERROR: Command was missing SteamID");
      throw {
        name: "CUSTOMERROREMPTYSTEAMID",
        message: "не задан SteamID."
      };
      //message.reply("не задан SteamID.");
      return;
    }

    // if steamIDString is valid url, extract the id with regex
    if (/(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+/.test(steamIDString) === true) {
      var regexp = /(?:https?:\/\/)?(?:steamcommunity\.com\/)(?:profiles|id)\/([a-zA-Z0-9]+)/g;
      var match = regexp.exec(steamIDString);
      steamIDString = match[1];
    }

    // convert steamIDString to valid SteamID64
    return await request({
      uri: "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + config.steamAPIKey + "&vanityurl=" + steamIDString,
      resolveWithFullResponse: true,
      json: true
    }).then(async function (response) {
      let body = response.body;
      // throw error when SteamAPI is not accepting SteamAPI Key
      if (response.statusCode == 403) {
        //console.error("ERROR: SteamAPI key might be missing, wrong or forbidden.");
        //console.error("Please check your config.json if the steamAPIKey parameter is correct.");
        throw {
          name: "CUSTOMERRORSTEAMAPIKEY",
          message: "ошибка выполнения запроса, попробуйте повторить позднее."
        };
        //message.reply("ошибка выполнения запроса, попробуйте повторить позднее.");
        return;
      }

      // throw error when discord mention is used
      if (steamIDString.startsWith('<@') === true) {
        //console.error("ERROR: Tried getting SteamID from Discord user name. This is not possible without an userbot.");
        throw {
          name: "CUSTOMERRORBOTCANNTGETSTEAMPROFILE",
          message: "боты не могут получить информацию о привязанных аккаунтах к профилю Discord."
        };
        //message.reply("боты не могут получить информацию о привязанных аккаунтах к профилю Discord.");
        return;
      }

      // check if steamID is only digits and exactly 17 chars long (length of SteamID64)
      if (/^\d+$/.test(steamIDString) && steamIDString.length == 17) {
        steamID64 = steamIDString;
        console.log("SUCCESS: Got SteamID " + steamID64);
      }
      // else check if ResolveVanityURL worked
      else if (body.response.success == 1) {
        steamID64 = body.response.steamid;
        console.log("SUCCESS: Got SteamID " + steamID64);
      }
      // else check if ID is SteamID2 or SteamID3, convert it to SteamID64
      else if ((matches = steamIDString.match(/^STEAM_([0-5]):([0-1]):([0-9]+)$/)) || (matches = steamIDString.match(/^\[([a-zA-Z]):([0-5]):([0-9]+)(:[0-9]+)?\]$/))) {
        var SteamID3 = new SteamID(steamIDString);
        steamID64 = SteamID3.getSteamID64();
        console.log("SUCCESS: Got SteamID " + steamID64);
      }
      // else throw error and return
      else {
        //message.reply("не найден аккаунт с указанным SteamID **" + steamIDString + "**. \nВы можете использовать ссылку на профиль Steam в качестве SteamID.");
        //console.error("ERROR: Could not get SteamID from string:");
        //console.error(steamIDString);
        throw {
          name: "CUSTOMERRORNOTFOUNDPROFILE",
          message: "не найден аккаунт с указанным SteamID **" + steamIDString + "**. \nВы можете использовать ссылку на профиль Steam в качестве SteamID."
        };
        return;
      }

      // set urls to get fetched by request module
      var urls = ["http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=" + config.steamAPIKey + "&steamid=" + steamID64,
        "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + config.steamAPIKey + "&steamids=" + steamID64
      ];

      // request function, gets all the data needed and creates a new object
     return await requestURL(urls).then((response)=> {
     // console.log((response[urls[1]].body));
        steamUserData = {
          avatar: (response[urls[1]].body.response.players[0].avatarfull),
          username: (response[urls[1]].body.response.players[0].personaname),
          realname: (response[urls[1]].body.response.players[0].realname),
          status: (response[urls[1]].body.response.players[0].personastate),
          gameinfo: (response[urls[1]].body.response.players[0].gameextrainfo),
          gameid: (response[urls[1]].body.response.players[0].gameid),
          lobbysteamid: (response[urls[1]].body.response.players[0].lobbysteamid),
          duserid: userid,
          steamID64,
          level: (response[urls[0]].body.response.player_level),
          timecreated: (response[urls[1]].body.response.players[0].timecreated),
          lastlogoff: (response[urls[1]].body.response.players[0].lastlogoff),
          loccountrycode: (response[urls[1]].body.response.players[0].loccountrycode),
          locstatecode: (response[urls[1]].body.response.players[0].locstatecode),
          loccityid: (response[urls[1]].body.response.players[0].loccityid),
        };
        //console.log(steamUserData);
        return steamUserData;
        // pass the steamUserData object to sendUserEmbedMessage function

      });
    }).catch(function (err) {
      throw {
        name: err.name,
        message: err.message
      };
  });
  },
  sendUserEmbedMessage: function (sendvar, steamUserData) {
    // set steamUserEmbed as new RichEmbed object
    var steamUserEmbed = new discord.MessageEmbed();

    /*steam://joinlobby/286160/109775240975664641/76561198013440719
    steamUserEmbed.addField("Лобби", steamUserData.lobbysteamid, true );
  
        // send message to current channel
        message.channel.send({embed: steamUserEmbed});*/
        if(steamUserData != undefined)
    if (steamUserData.lobbysteamid) {
      steamUserEmbed.setColor(7823103);
      steamUserEmbed.addField("Запрос от пользователя", "<@" + steamUserData.duserid + ">", true);
      steamUserEmbed.addField("В игре", steamUserData.gameinfo, true);
      steamUserEmbed.addField("Подключиться", "steam://joinlobby/" + steamUserData.gameid + "/" + steamUserData.lobbysteamid + "/" + steamUserData.steamID64, true);
      sendvar.send({
        embed: steamUserEmbed
      }).catch((err) => {
        if (err.code == 50007) console.log("Can't send M!");
        else {
          console.log(err);
          process.exit();
        }
      });
    } else sendvar.send("Не удалось получить лобби игры. Перейдите по ссылке steam://openurl/https://steamcommunity.com/my/edit/settings и убедитесь, что ваш профиль открыт, а у игры есть лобби.").catch((err) => {
      if (err.code == 50007) console.log("Can't send M!");
      else {
        console.log(err);
        process.exit();
      }
    });
  }
};



/**
 * Handle multiple requests at once
 * @param urls [array]
 * @param callback [function]
 * @requires request module for node ( https://github.com/mikeal/request )
 */

function requestURL(urls) {
  'use strict';
  return new Promise(async (resolve, reject) => {
  var results = {},
    t = urls.length,
    c = 0,
    handler = function (response) {
      
      var url = response.request.uri.href;
      //console.log(url);
      //console.log(response.body);
      results[url] = {
        error: null,
        response: response,
        body: response.body
      };
      if (++c === urls.length) {
        resolve(results);
      }
    };
  while (t--) {
    await request({
      uri: urls[t],
      resolveWithFullResponse: true,
      json: true
    }).then(handler);
  }
});
}