try {
  const Discord = require('discord.js');
  const client = new Discord.Client({
    fetchAllMembers: true
  });
  var eyes = require('eyes');
  var https = require('https');
  var fs = require('fs');
  var crypto = require('crypto');
  var xml2js = require('xml2js');
  const cheerio = require('cheerio')
  const Entities = require('html-entities').AllHtmlEntities;

  const entities = new Entities();
  var parser = new xml2js.Parser();
  //var settings = JSON.parse(fs.readFileSync('data/nnigiveawayfeed_settings.json', 'utf8'));
  var arrayofdata = JSON.parse(fs.readFileSync('data/nnigiveawayfeed_data.json', 'utf8'));
  async function deleteallanother() {
    let lastid = null;
    while (true) {
      const messages = await client.channels.get("507153088898007074").messages.fetch({
        limit: 100,
        ...(lastid !== null && {
          before: lastid
        })
      });
      if (messages.array().length > 0) {
        lastid = messages.last().id;
        //console.log(messages.filter(x => !members.has(x.author.id)));
        await messages.filter(ch => arrayofdata.filter(x => x["msgid"] == ch.id).length == 0).forEach(async msg => {
          //console.log(msg);
          await msg.delete().catch(async function (reason) {
            console.log("ERROR1:" + reason);
            if (reason.code != 10008 && reason.code != 10003) {
              console.log("Emoji message get error.");
              console.log(reason);
              process.exit(1);
            }
          });
        });
        console.log("looping");
        continue;
      } else {
        console.log("break");
        break;
      }
    }
  }

  function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }
  client.on('error', (error) => {
    console.log("Error d.js!");
    process.exit(1);
  });
  client.on("disconnect", (error) => {
    console.log("Disconnected!");
    setTimeout(function () {
      process.exit(1);
    }, 3000);
  });
  client.on("disconnected", (error) => {
    console.log("Disconnected!");
    process.exit(1);
  });

  function formatDateToString(date) {
    // 01, 02, 03, ... 29, 30, 31
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    // 01, 02, 03, ... 10, 11, 12
    var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    // 1970, 1971, ... 2015, 2016, ...
    var yyyy = date.getFullYear();

    // create the format you want
    return (dd + "." + MM + "." + yyyy);
  }
  let isready = false;
  client.on('ready', async () => {
    if (isready) return;
    else isready = true;
    console.log(`Logged in as ${client.user.tag}!`);
    await client.user.setStatus('invisible');
    setInterval(function () {
      client.user.setStatus('invisible');
    }, 600000);
    parser.on('error', function (err) {
      console.log('Parser error', err);
    });
    while (true) {
      let data = '';
      await https.get('https://isthereanydeal.com/rss/specials/', async function (res) {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          res.on('data', function (data_) {
            data += data_.toString();
          });
          res.on('end', async function () {
            await parser.parseString(data, async function (err, result) {
              let newdatavar = [];
              for (let item of result["rss"]["channel"][0]["item"].reverse()) {
                let ret = new String(item["title"]);
                if (ret = ret.match(/^\[giveaway\](.*)/i)) {
                  ret = entities.decode(ret[1].trim());
                  let str = item["title"];
                  str += item["link"];

                  const $ = cheerio.load(item["description"][0])

                  //console.log(item["description"]);
                  let postdate = new Date(item["pubDate"]);
                  let embed = new Discord.MessageEmbed()
                    .setTitle(ret)
                    .setDescription()
                    .setColor(7823103)
                    .setTimestamp();
                  //let currentdescr = new String(item["link"]);
                  let stringbuilder = "";
                  let links = $('a');
                  //let countoflinks = 0;
                  $(links).each(function (i, link) {
                    if ($(link).text() != "see details" && !$(link).attr('href').includes("isthereanydeal.com/specials")) {
                      str += $(link).text();
                      stringbuilder += "\n***" + entities.decode($(link).text().trim()) + "***";
                      //countoflinks++;
                    }
                  });
                  if (stringbuilder != "") {
                    // if (countoflinks == 1)
                    //  embed.setDescription(new String(item["link"]) + "\nНаименование:```" + stringbuilder+"```");
                    //else
                    embed.setDescription(new String(item["link"]) + "\n" + stringbuilder + "\n\u200B");
                  } else embed.setDescription(new String(item["link"]));
                  // console.log();
                  //process.exit(1);
                  //str += item["pubDate"];
                  let hash = crypto.createHash('sha1').update(str).digest('base64');
                  let newtxtformat = "**" + ret + "**\n<" + new String(item["link"]) + ">";
                  if (stringbuilder != "")
                    newtxtformat += "\nСписок наименований:" + stringbuilder;
                  newtxtformat += "\nДата публикации: " + formatDateToString(postdate) + "\n\u200B";
                  //  console.log(item["title"]+" "+hash);
                  if (arrayofdata.filter(x => x.hash == hash).length == 0) {
                    //const msg = await client.channels.get('507153088898007074').send(embed);
                    const msgcontainer = await client.channels.get('507153088898007074').send(newtxtformat, {
                      split: true
                    }).catch((err) => {
                      if (err.code == 50007) console.log("Can't send M!");
                      else {
                        console.log(err);
                        process.exit(1);
                      }
                    });
                    console.log('FINISHED', item["title"]);
                    if (Array.isArray(msgcontainer)) {
                      for (const msg of msgcontainer) {
                        arrayofdata.push({
                          msgid: msg.id,
                          hash: hash
                        });
                        newdatavar.push({
                          msgid: msg.id,
                          hash: hash
                        });
                      }
                    } else {
                      arrayofdata.push({
                        msgid: msgcontainer.id,
                        hash: hash
                      });
                      newdatavar.push({
                        msgid: msgcontainer.id,
                        hash: hash
                      });
                    }
                    fs.writeFileSync("data/nnigiveawayfeed_data.json", JSON.stringify(arrayofdata), {
                      encoding: 'utf8',
                      flag: 'w'
                    });
                  } else newdatavar = newdatavar.concat(arrayofdata.filter(x => x.hash == hash));
                }
              }
              arrayofdata = newdatavar;
              fs.writeFileSync("data/nnigiveawayfeed_data.json", JSON.stringify(arrayofdata), {
                encoding: 'utf8',
                flag: 'w'
              });
              await deleteallanother();
            });
          });
        }
      });
      await sleep(300000);
    }
  });

  client.on('message', msg => {
    /*  if (msg.content === 'ping') {
        msg.reply('pong');
      }*/
  });

  client.login('заменить');
} catch (err) {

  console.log("new error:" + err);
  process.exit(1);

}