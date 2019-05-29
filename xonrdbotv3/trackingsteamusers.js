const Discord = require('discord.js');
const client = new Discord.Client({
    fetchAllMembers: true
});
//var eyes = require('eyes');
var https = require('https');
var fs = require('fs');
var sha256 = require('js-sha256').sha256;
var crypto = require('crypto');
var rp = require('request-promise');
var path = require('path');
//var xml2js = require('xml2js');
//const cheerio = require('cheerio')
var bbcodetomarkdown = require('bbcode-to-markdown');
const imageType = require('image-type');
const readChunk = require('read-chunk');
var moment = require('moment-timezone');
const BSON = require('bson');
const Long = BSON.Long;
var zip = require("node-native-zip");
var bson = new BSON();
const rmfr = require('rmfr');
//var trackingusers = [];
var idsinwork = [];
var downloadlock = [];
const filenamify = require('filenamify');
var archiver = require('archiver');
//var StringStream = require('string-stream');

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
var http = require('http');
var url = require('url');
//var querystring = require('querystring');
var WebSocketServer = new require('ws');
//var grabquery = [];
// подключенные клиенты
var clients = {};
var clientswaitid = [];
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
};
var sha256 = function (data, salt) {
    var hash = crypto.createHmac('sha256', salt); /** Hashing algorithm sha256 */
    hash.update(data);
    var value = hash.digest('hex');
    return {
        salt: salt,
        Hash: value
    };
};

function GenerateHashForUrl(data) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var data = sha256(data, salt);
    return data.Hash;
}
// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
    port: 3001,
    host: '127.0.0.1'
});
webSocketServer.on('connection', function (ws, request) {
    console.log(request.headers["x-real-ip"]);
    var id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

    ws.on('message', function (message) {
        console.log('получено сообщение ' + message);
        let modnumber = parseInt(message);
        if (modnumber > 0) {
            ws.send("validmod");
            if (true == false) { //checkifdeleted
                ws.send("modwasdeleted");
            } else {
                ws.send("placeinquery");
                clientswaitid[id] = modnumber;
                //if(!grabquery.includes(modnumber)) grabquery.push({});
            }
        }
    });

    ws.on('close', function () {
        console.log('соединение закрыто ' + id);
        if (clientswaitid[id] != undefined) {

        }
        delete clientswaitid[id];
        delete clients[id];
    });

});

function removealt(array, ...forDeletion) {
    return array.filter(function (value, index, ar) {
        return !forDeletion.includes(index);
    });
}

http.createServer(async function (request, response) {
    var url = request.url; //this will be /user/5/docs
    // console.log(request.headers["x-real-ip"]);
    let parts = url.split("/");
    if (parts[1] == "dl") {
        let modnumber = parseInt(parts[2]);
        if (modnumber > 0) {
            let ext = "png";
            if (idsinwork.includes(modnumber)) {
                while (true) {
                    if (!idsinwork.includes(modnumber)) return;
                    await sleep(400);
                }
            }
            downloadlock.push(modnumber);

            if (fs.existsSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + modnumber + "/" + modnumber + ".bson") && fs.existsSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + modnumber + "/thumb." + ext)) {
                let bson = null;
                try {
                    let jsondata = Buffer.from(JSON.stringify(bson.deserialize(await fs.readFileSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + modnumber + "/" + modnumber + ".bson", {
                        encoding: null
                    })), null, 4).toString('utf8'));
                    let filestream = new fs.createReadStream("/home/xonrdbotv3/data/ttsworkshop/mods/" + modnumber + "/thumb." + ext);
                    var dl = archiver('zip', {
                        zlib: {
                            level: 9
                        } // Sets the compression level.
                    })
                    dl.pipe(response)
                    dl.append(filestream, {
                        name: modnumber + "." + ext
                    })
                    dl.append(jsondata, {
                        name: modnumber + ".json"
                    })
                    //dl.append(new StringStream("Ooh dynamic stuff!"), {name:'YoDog/dynamic.txt'})
                    dl.finalize(function (err) {
                        downloadlock = removealt(downloadlock, downloadlock.indexOf(modnumber));
                        /*downloadlock.find(function (value, index) {
                            if (element == modnumber) {
                                delete downloadlock[index];
                                return true;
                            }
                        });*/
                        if (err) res.send(500);

                    });

                } catch (err) {

                    response.end("Creating archive failed!");

                }

            } else {
                downloadlock = removealt(downloadlock, downloadlock.indexOf(modnumber))
                response.end("Mod files not found!");
            }

            /*  var archive = new zip();
              await new Promise((resolve, reject) => {

                  archive.addFiles([{
                          name: modnumber + ".json",
                          path: "/home/xonrdbotv3/data/ttsworkshop/mods/" + modnumber + "/" + modnumber + ".json"
                      },
                      {
                          name: modnumber + "." + ext,
                          path: "/home/xonrdbotv3/data/ttsworkshop/mods/" + modnumber + "/thumb." + ext
                      }
                  ], async function () {
                      var buff = archive.toBuffer();
                      response.writeHead(200, {
                          'Content-Type': 'application/octet-stream',
                          'Content-Length': buff.length,
                          'Content-Disposition': 'attachment; filename='+modnumber+'.zip'
                        });
                        response.write(buff);
                      response.end();
                      resolve();
                  });
              });*/

        }
    } else {
        let data = await fs.readFileSync('/home/xonrdbotv3/data/ttsworkshop/mods/index.html', 'utf8');
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        response.write(data);
        response.end();
    }

}).listen(3000, "127.0.0.1");
let workingchannelmodsdeleted = null;
//var compress_images = require('compress-images');
const sharp = require('sharp');
async function realupdatemod(item) {
    let itemid = parseInt(item["publishedfileid"]);

    if (fs.existsSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid)) {
        /* await rmfr("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid + "/*", {
             glob: true
         });*/

    } else await fs.mkdirSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid);
    /* if (fs.existsSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid + "/images")) {
         await rmfr("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid + "/images/*", {
             glob: true
         });
     } else await fs.mkdirSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid + "/images");*/
    await fs.writeFileSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid + "/fullinfo.json", JSON.stringify(item, null, 4), {
        encoding: 'utf8',
        flag: 'w'
    });
    let bsondata = await rp({
        uri: item["file_url"],
        encoding: null
    });
    await fs.writeFileSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid + "/" + itemid + ".bson", bsondata);
    //  let imagebuff = ;
    let ext = null;
    if (item["preview_url"] != undefined && item["preview_url"] != "") {
        let imagebuff = Buffer.from(await rp({
            uri: item["preview_url"],
            encoding: null
        }));


        //const buffer = await readChunk.sync("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid + "/thumb", 0, 12);
        ext = imageType(imagebuff)["ext"];
        imagebuff = await sharp(imagebuff).resize({
            width: 512,
            withoutEnlargement: true
        });
        if (ext == "jpg" || ext == "jpeg")
            imagebuff = await imagebuff.jpeg({
                quality: 60
            });
        else
            imagebuff = await imagebuff.png({
                compressionLevel: 9
            });


        imagebuff = await imagebuff.toBuffer();

        await fs.writeFileSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid + "/thumb." + ext, imagebuff);
    }
    /* await new Promise((resolve, reject) => {
         compress_images('/home/xonrdbotv3/data/ttsworkshop/mods/' + itemid + '/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}', '/home/xonrdbotv3/data/ttsworkshop/mods/compressed/', {
             compress_force: false,
             statistic: true,
             autoupdate: false
         }, false, {
             jpg: {
                 engine: 'mozjpeg',
                 command: ['-quality', '60']
             }
         }, {
             png: {
                 engine: 'pngquant',
                 command: ['--quality=20-50']
             }
         }, {
             svg: {
                 engine: 'svgo',
                 command: '--multipass'
             }
         }, {
             gif: {
                 engine: 'gifsicle',
                 command: ['--colors', '64', '--use-col=web']
             }
         }, function (error, completed, statistic) {
             console.log('-------------');
             console.log(error);
             console.log(completed);
             console.log(statistic);
             console.log('-------------');    
             resolve();
         });
     });*/
    /* let jsondata = JSON.stringify(bson.deserialize(bsondata), null, 4);
     await fs.writeFileSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid + "/" + itemid + ".json", jsondata, {
         encoding: 'utf8',
         flag: 'w'
     });*/

    //console.log(ext);
    //await fs.renameSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid + "/thumb", "/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid + "/thumb." + ext);
    /*let firstimage = null;
    if (item["previews"] != undefined) {
        //let i = 0;
        for (img of item["previews"]) {
            if (img["preview_type"] == 0) {
                if (firstimage == null
                    //&& i != 0
                )
                    firstimage = img["filename"];
                await fs.writeFileSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + itemid + "/images/" + filenamify(img["filename"]), await rp({
                    url: img["url"],
                    encoding: null
                }));
                //i++;
            }
        }
    }*/
    return ext;
}
async function modworker(item) {
    // return;
    let itemid = parseInt(item["publishedfileid"]);
    if (downloadlock.includes(itemid)) {
        while (true) {
            if (!downloadlock.includes(itemid)) return;
            await sleep(400);
        }
    }
    if (idsinwork.includes(itemid)) {
        while (true) {
            if (!idsinwork.includes(itemid)) return;
            await sleep(400);
        }
        return;
    }
    if (item["result"] != 1) {
        console.log("return failed, deleted file");
        return;
    }
    const [results5, fields] = await connection.query('SELECT * FROM ttsmodsbase WHERE steamid=?', [itemid]);
    if (results5.length != 0) {
        //console.log(results5);
        if (results5[0].messageid != null) {
            await workingchannelmodsdeleted.messages.fetch(results5[0].messageid).then(async msg => {
                await msg.delete().catch(error => {
                    if (error.code != 10008) throw error;
                });
            }).catch(error => {
                if (error.code != 10008) throw error;
            });
        }
        if (results5[0].steam_lastupdate != item["time_updated"]) {
            console.log("update: " + itemid);
            idsinwork.push(itemid);
            let ext = await realupdatemod(item);
            await connection.query('UPDATE ttsmodsbase SET temp_is_deleted=?,lastupdate=?,messageid=?,thumbext=?,steam_lastupdate=? WHERE steamid=?', [0, moment.utc().unix(), null, itemid, ext, item["time_updated"]]);
            idsinwork = idsinwork.filter(x => x != itemid);
        } else console.log("skip: " + itemid);
    } else {
        console.log("new: " + itemid);
        idsinwork.push(itemid);
        let ext = await realupdatemod(item);
        await connection.query('INSERT INTO ttsmodsbase SET steamid=?,lastupdate=?,thumbext=?,steam_lastupdate=?', [itemid, moment.utc().unix(), ext, item["time_updated"]]);
        idsinwork = idsinwork.filter(x => x != itemid);
    }

}

function chunk(array, size) {
    if (!array) return [];
    const firstChunk = array.slice(0, size); // create the first chunk of the given array
    if (!firstChunk.length) {
        return array; // this is the base case to terminal the recursive
    }
    return [firstChunk].concat(chunk(array.slice(size, array.length), size));
}
async function checkrequestsfromusers() {
    let keys = Object.keys(clientswaitid);
    let alreadyworkedids = [];
    if (keys.length > 0)
        for (clientarrays of chunk(keys, 20)) {
            let length = clientarrays.length;
            if (length > 0) {
                let builditup = {};
                let crid = 0;
                for (clientid of clientarrays) {
                    builditup["publishedfileids[" + (crid++) + "]"] = clientswaitid[clientid];
                }
                builditup["itemcount"] = crid;
                await rp({
                        method: 'POST',
                        uri: 'https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/',
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        form: builditup,
                        json: true // Automatically stringifies the body to JSON
                    })
                    .then(async function (body) {
                        for (clientid of clientarrays) {
                            let item = body["response"]["publishedfiledetails"].find(x => x["publishedfileid"] == clientswaitid[clientid]);

                            if (clients[clientid] != undefined) {
                                if (item != undefined) {
                                    if (!alreadyworkedids.includes(clientswaitid[clientid])) await modworker(item);
                                    else alreadyworkedids.push(clientswaitid[clientid]);
                                    if (item["creator_appid"] == 286160 && item["consumer_appid"] == 286160) {
                                        clients[clientid].send("readydownload");
                                        clients[clientid].send("dl:" + GenerateHashForUrl(clientswaitid[clientid] + "" + moment.utc().unix() + "" + clientid));
                                    } else clients[clientid].send("onlyttssupported");

                                } else clients[clientid].send("errordownload");


                                clients[clientid].close();
                            }
                            delete clientswaitid[clientid];
                        }

                        //console.log(body);
                    });

            }
            //console.log(keys);
        }
}
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
const urlExists = require('url-exists-promise');
client.on('error', (error) => {
    console.log("Error d.js!");
    process.exit(1);
});
let isready = false;
client.on('ready', async () => {
    if (isready) return;
    else isready = true;
    console.log(`Logged in as ${client.user.tag}!`);
    //return;
    workingchannelmodsdeleted = client.channels.get("507115370121789451");
    let pointer = "*";
    let grabbed = 0;
    while (true) {
        if (pointer == "*") {
            await connection.query('UPDATE ttsmodsbase SET temp_is_deleted=1');
        }
        checkrequestsfromusers();
        //await sleep(1000);
        // continue;

        let body = await rp({
            method: 'GET',
            uri: 'https://api.steampowered.com/IPublishedFileService/QueryFiles/v1/',
            qs: {
                key: 'заменить',
                format: 'json',
                cursor: pointer,
                appid: '286160',
                numperpage: '35',
                cache_max_age_seconds: '1',
                language: '8',
                return_details: '1',
                return_metadata: '1',
                return_previews: '1',
                return_kv_tags: '1',
                return_tags: '1',
                return_vote_data: '1'
            },
            json: true // Automatically stringifies the body to JSON
        });
        //console.log(body);
        await fs.writeFileSync("/home/xonrdbotv3/data/ttsworkshop/mods/test.json", JSON.stringify(body, null, 4), {
            encoding: 'utf8',
            flag: 'w'
        });
        if (body["response"]["publishedfiledetails"] != undefined)
            for (item of body["response"]["publishedfiledetails"]) {
                await modworker(item);
            }

        if (body["response"]["next_cursor"] != undefined && body["response"]["next_cursor"] != "" && body["response"]["next_cursor"] != pointer) {
            pointer = body["response"]["next_cursor"];
            grabbed += body["response"]["publishedfiledetails"].length;
            console.log("continue grab " + pointer);
        } else {
            pointer = "*";
            console.log("grabbed " + grabbed);
            await connection.query('UPDATE ttsmodsbase SET is_deleted=temp_is_deleted');
            const [results5, fields] = await connection.query('SELECT * FROM ttsmodsbase WHERE is_deleted=1 AND messageid=null')[0];
            var length = Object.keys(results5).length;
            for (var i = 0; i < length; i++) {
                try {
                    let item = bson.deserialize(await fs.readFileSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + results5[i].steamid + "/" + results5[i].steamid + ".bson", {
                        encoding: null
                    }));
                    let ext = results5[i].thumbext;
                    let attachfiles = [];
                    let firstimage = null;
                    let firstimageurl = null;
                    if (item["previews"] != undefined) {
                        //let i = 0;
                        for (img of item["previews"]) {
                            if (img["preview_type"] == 0) {
                                if (firstimage == null
                                    //&& i != 0
                                ) {
                                    firstimage = filenamify(img["filename"]);
                                    firstimageurl = img["url"];
                                }
                                //i++;
                            }
                        }
                    }
                    let embed = new Discord.MessageEmbed()
                        .setTitle(item["title"].substring(0, 255).trim())
                        .setDescription(bbcodetomarkdown(item["file_description"].substring(0, 2048).trim()).substring(0, 2048).trim())
                        //.setAuthor("Скачать",'attachment://thumb.png','attachment://11.zip')
                        .setColor(13565957);
                    if (ext != null) {
                        let stats = fs.statSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + results5[i].steamid + "/thumb." + ext);
                        let fileSizeInBytes = stats.size;
                        //Convert the file size to megabytes (optional)
                        let fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
                        if (fileSizeInMegabytes < 4) {
                            attachfiles.push({
                                attachment: "/home/xonrdbotv3/data/ttsworkshop/mods/" + results5[i].steamid + "/thumb." + ext,
                                name: 'thumb.' + ext
                            });
                            embed.setThumbnail("attachment://thumb." + ext)
                        }
                    }
                    if (firstimage != null) {
                        if (await urlExists(firstimageurl)) {
                            //let image = ;
                            let imagebuff = Buffer.from(await rp({
                                uri: firstimageurl,
                                encoding: null
                            }));
                            let stats = fs.statSync(imagebuff);
                            let fileSizeInBytes = stats.size;
                            let fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
                            if (fileSizeInMegabytes < 4) {
                                let ext2 = imageType(imagebuff)["ext"];
                                attachfiles.push({
                                    attachment: imagebuff,
                                    name: 'thumb2.' + ext2
                                });
                                embed.setImage("attachment://thumb2." + ext2);
                            }
                        }
                        /*let stats = fs.statSync("/home/xonrdbotv3/data/ttsworkshop/mods/" + results5[i].steamid + "/images/" + firstimage);
                        let fileSizeInBytes = stats.size;
                            
                        let fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
                        if (fileSizeInMegabytes < 4) {
                            let ext2 = path.extname(firstimage);
                            attachfiles.push({
                                attachment: "/home/xonrdbotv3/data/ttsworkshop/mods/" + results5[i].steamid + "/images/" + firstimage,
                                name: 'thumb2' + ext2
                            });
                            embed.setImage("attachment://thumb2" + ext2);
                        }*/
                    }
                    if (attachfiles.length > 0)
                        embed.attachFiles(attachfiles);
                    embed.addField("Подписки", item["subscriptions"], true);
                    embed.addField("Избранное", item["favorited"], true);
                    //embed.addField("Отслеживающих", item["followers"], true);
                    embed.addField("Просмотров", item["views"], true);
                    embed.addField("Оценка", "👍" + item["vote_data"]["votes_up"] + " 👎" + item["vote_data"]["votes_down"] + " = **" + (item["vote_data"]["score"] * 100).toFixed(2) + "%**", true);
                    embed.addField("Создан", moment.unix(item["time_created"]).tz("Europe/Moscow").format('DD-MM-YYYY hh:mm:ss') + " MSK", true);
                    embed.addField("Последнее обновление", moment.unix(item["time_updated"]).tz("Europe/Moscow").format('DD-MM-YYYY hh:mm:ss') + " MSK", true);
                    embed.addField("Скачать", "https://dlttsmods.ninri.ru/dlset/" + results5[i].steamid, false);

                    let msg = await workingchannelmodsdeleted.send(embed);
                    await connection.query('UPDATE ttsmodsbase SET messageid=? WHERE steamid=?', [msg.id, results5[i].steamid]);
                } catch (err) {}
            }
            grabbed = 0;
            console.log("grab end");
            //process.exit(1);
        }
        await sleep(1000);
    }
});
const mysql = require('mysql2/promise');
var connection = null; 
//connection.connect();

client.on('message', msg => {
    /*  if (msg.content === 'ping') {
        msg.reply('pong');
      }*/
});
(async () => {
    await singlefire();
    await client.login('заменить');
})();