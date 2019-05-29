'use strict';
try {
const path = require('path');

class StaticUtil {
    
    /**
     * Используется через await для ожидания указанного времени.
     *
     * @param {*} millis миллисекунды
     * @returns обещание
     */
    sleep(millis) {
        return new Promise(resolve => setTimeout(resolve, millis));
    }

    /**
     * Проверка, что переменная не равна null или undefined и длина больше нуля.
     *
     * @param {*} str
     * @returns
     */
    isEmpty(str) {
        return (!str || 0 === str.length);
    }

    /**
     * Проверка, что переменная не равна null или undefined и содержимое не пустое.
     *
     * @param {*} str
     * @returns
     */
    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    /**
     * Отчистить текстовый канал от сообщений, игнорирует ошибку 10008 (неизвестное сообщение, может возникнуть, если сообщение было удалено до фактического исполнения нашего удаления, (Unknown message) https://discordapp.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes).
     *
     * @param {*} channel референс канала из Discord.js.
     * @param {*} compare функция сравнения, в первый аргумент передаётся референс сообщения Discord.js. Да - оставить, нет - удалить.
     */
    async CleanUpTextChannel(channel, compare) {
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

    /**
     * Является ли строка JSON структурой.
     *
     * @param {*} something строка для проверки.
     * @returns В случае успеха возвращает JSON структуру, иначе вернёт undefined.
     */
    isJSON(something) {
        if (typeof something != 'string')
            something = JSON.stringify(something);
        try {
            return JSON.parse(something);
        } catch (e) {
            return undefined;
        }
    }

}

    class ManageDatabaseJSON {

        constructor(filepathstring) {
            this.StaticUtil = new StaticUtil();
            this.fullfilepath = path.resolve(filepathstring);
            this.fileext = path.extname(this.fullfilepath);
            this.filebasename = path.basename(this.fullfilepath, this.fileext);
            this.filedir = path.dirname(this.fullfilepath);
            this.tempfilepath = `${this.filedir}/${this.filebasename}.tmp`;
            this.data = undefined;
        }

        /**
         * Проверяет наличие временного файла, его соответствие JSON. Заменяет обычный файл новым, если необходимо.
         *
         * @param {*} skipjsoncheck Пропускаем проверку, если мы уверены в том, что в файле JSON структура.
         * @returns Да/Нет Во временном файле находится JSON структура? (только, если не пропускается проверка)
         * @memberof ManageDatabaseJSON
         */
        tempfilecheck(skipjsoncheck) {
            if (fs.existsSync(this.tempfilepath)) {
                if (skipjsoncheck || this.StaticUtil.util.isJSON(fs.readFileSync(this.tempfilepath, 'utf8')) !== undefined) {
                    fs.renameSync(this.tempfilepath, this.fullfilepath);
                    return true;
                } else fs.unlinkSync(this.tempfilepath);
            }
            return false;
        }

        /**
         * Загружает в переменную this.data JSON структуру из .json файла.
         *
         * @returns JSON структуру.
         * @memberof ManageDatabaseJSON
         */
        load() {
            if (fs.existsSync(this.fullfilepath)) {
                let skipcheck = this.tempfilecheck();
                let filedata = fs.readFileSync(this.fullfilepath, 'utf8');
                if (!skipcheck) {
                    filedata = this.StaticUtil.isJSON(filedata);
                } else filedata = JSON.parse(filedata);
                if (filedata !== undefined) {
                    this.data = filedata;
                    return this.data;
                } else throw new Error(`Файл ${this.fullfilepath} не является JSON структурой.`);
            } else throw new Error(`Файл ${this.fullfilepath} не существует.`);
        }

        /**
         * Сохраняет данные в .json файл.
         *
         * @memberof ManageDatabaseJSON
         */
        save() {
            if (this.data !== undefined) {
                fs.writeFileSync(this.tempfilepath, JSON.stringify(this.data, null, 4), {
                    encoding: 'utf8',
                    flag: 'w'
                });
                this.tempfilecheck(true);
            } else throw new Error(`Данные файла ${this.fullfilepath} не определены.`);
        }

    }

    class CleaningChannel {

        constructor(chid, onlylastmsg = false, cleantime = 0) {
            this.chid = chid;
            this.cleantime = cleantime;
            this.onlylastmsg = onlylastmsg;
            this.fetchedmessages = false;
        }
        async cleantimemsgs() {
            if (this.cleantime > 0) {
                const lifetimeMs = this.cleantime; //30
                const now = Date.now();
                //console.log("timedelete: " + this.chid);

                await Promise.all(client.channels.get(this.chid).messages.filter(message => now - (message.editedTimestamp || message.createdTimestamp) > lifetimeMs).map(x => x.delete())).catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }

                });
            }
        }
        async CleanUpTask(members, member = null) {
            if (this.fetchedmessages == false) {
                console.log("fetchmessages");
                //console.log(members);
                await client.channels.get(this.chid).messages.fetch().then(async messaxxxccges => {
                    if (messaxxxccges.array().length > 0) {
                        let lastid = messaxxxccges.last().id;
                        await Promise.all(messaxxxccges.filter(x => !members.has(x.author.id) || x.author.bot).map(x => x.delete())).catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });

                        while (true) {
                            const messages = await client.channels.get(this.chid).messages.fetch({
                                limit: 100,
                                before: lastid
                            });
                            if (messages.array().length > 0) {
                                lastid = messages.last().id;
                                //console.log(messages.filter(x => !members.has(x.author.id)));
                                await Promise.all(messages.filter(x => !members.has(x.author.id) || x.author.bot).map(x => x.delete())).catch(async function (reason) {
                                    console.log("ERROR1:" + reason);
                                    if (reason.code != 10008 && reason.code != 10003) {
                                        console.log("Emoji message get error.");
                                        console.log(reason);
                                        process.exit(1);
                                    }
                                });
                                console.log("looping");
                                continue;
                            } else {
                                console.log("break");
                                break;
                            }
                        }
                    }
                });
                this.fetchedmessages = true;
            } else {
                if (member != undefined && member != null && member.id != undefined && member.id != null) {
                    console.log("leavedelete: " + this.chid + " " + member.id);
                    await Promise.all(client.channels.get(this.chid).messages.filter(x => x.author.id == member.id || x.author.bot).map(x => x.delete())).catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
                } else console.log("nomember");
            }
        }
        async deletemoremessagesfromuserexceptlast(member) {
            let channel = client.channels.get(this.chid);
            let nenbersids = [];
            if (member == null) {
                await channel.messages.fetch().then(async messaxxxccges => {
                    if (messaxxxccges.array().length > 0) {
                        let lastid = messaxxxccges.last().id;

                        for (let [value, x] of messaxxxccges) {
                            if (!x.deleted) {
                                if (nenbersids.includes(x.author.id) || x.author.bot) {
                                    // console.log("DELETE:"+x.id);
                                    await x.delete().catch(async function (reason) {
                                        console.log("ERROR1:" + reason);
                                        if (reason.code != 10008 && reason.code != 10003) {
                                            console.log("Emoji message get error.");
                                            console.log(reason);
                                            process.exit(1);
                                        }
                                    });
                                } else {
                                    //console.log("IGNORE:"+x.id);
                                    nenbersids.push(x.author.id);
                                }
                            }
                        }

                        while (true) {
                            // console.log("BEFORE:"+lastid);
                            const messages = await channel.messages.fetch({
                                limit: 100,
                                before: lastid
                            });
                            if (messages.array().length > 0) {
                                lastid = messages.last().id;
                                //console.log(messages.filter(x => !members.has(x.author.id)));
                                for (let [value, x] of messages) {
                                    if (!x.deleted) {
                                        if (nenbersids.includes(x.author.id) || x.author.bot) {
                                            //  console.log("DELETE2:"+x.id);
                                            await x.delete().catch(async function (reason) {
                                                console.log("ERROR1:" + reason);
                                                if (reason.code != 10008 && reason.code != 10003) {
                                                    console.log("Emoji message get error.");
                                                    console.log(reason);
                                                    process.exit(1);
                                                }
                                            });
                                        } else {
                                            //  console.log("IGNORE2:"+x.id);
                                            nenbersids.push(x.author.id);
                                        }
                                    }
                                }
                                //  console.log("looping");
                                continue;
                            } else {
                                //  console.log("break");
                                break;
                            }
                        }
                    }
                });
                //console.log(nenbersids);
            }
        }

    }
    class EmojiReports {
        constructor(guild, emojichannels) {
            this.guild = client.guilds.get(guild);
            this.emojichannels = emojichannels;
            let that = this;
            setInterval(function () {
                const lifetimeMs = 60 * 1000;
                const now = Date.now();
                //let channels = 0;
                //let messages = 0;
                let arrayofignorechs = [];
                for (let x of that.emojichannels) {
                    arrayofignorechs.push(x.chid);
                }
                for (const channel of client.channels.values()) {
                    if (arrayofignorechs.includes(channel.id)) continue;
                    if (!channel.messages) continue;
                    //channels++;

                    //messages += 
                    channel.messages.sweep(
                        message => now - (message.editedTimestamp || message.createdTimestamp) > lifetimeMs
                    );
                    //console.log("end");
                }
            }, 60000);
        }

        async startEmojiCheck() {
            for (let x of this.emojichannels) {
                await x.messagesLoop();
            }
        }

    }
    class EmojiChannel {

        constructor(chid, emojilist, guild) {
            this.chid = chid;
            this.ignorelist = ["468443699395952640","468445648342089749","468447131305377811","468447163123367936","468447190990454794"];
            this.channel = guild.channels.get(chid);
            this.emojilist = emojilist;
            this.database = new ManageDatabaseJSON("data/cleanerEmojis.json");
            this.data = this.database.load();
            this.channelStore = this.data.channelsStore.find(x => x.id == this.chid);
            if (this.channelStore === undefined) {
                const pushedindex = this.data.channelsStore.push({
                    id: this.chid,
                    lastEmojiMessageTimestamp: 0
                }) - 1;
                this.channelStore = this.data.channelsStore[pushedindex];
            }
            this.guild = guild;
            client.on('message', msg => {
                if (msg.channel.id == this.chid) this.startEmojiCheck(msg);
            });
        }

        async startEmojiCheck(message) {
            if(this.ignorelist.includes(message.id) || message.content == "")return;
            let ifneedtoupdate = false;
            for (let emoji of this.emojilist) {
                const emojiid = this.guild.emojis.find(x => x.name == emoji).id;
                if (emojiid !== undefined) {
                    if (!message.reactions.has(emojiid)) {
                        await message.react(emojiid).catch(function (reason) {
                            if (reason.code != 10008) {
                                console.log("DeletionError:" + reason);
                                process.exit(1);
                            }else return;
                        });
                        ifneedtoupdate = true;
                    }
                } else console.log("undefined emoji " + emoji);
            }

            if (ifneedtoupdate && this.channelStore.lastEmojiMessageTimestamp < message.createdTimestamp) {
                this.channelStore.lastEmojiMessageTimestamp = message.createdTimestamp;
                this.database.save();
            }
        }

        async messagesLoop() {
            let lastid = null;
            while (true) {
                const messages = await this.channel.messages.fetch({
                    limit: 100,
                    ...(lastid !== null && {
                        before: lastid
                    })
                });
                if (messages.size > 0) {
                    lastid = messages.last().id;
                    for (let message of messages.filter(message => message.createdTimestamp > this.channelStore.lastEmojiMessageTimestamp).array().reverse()) {
                        await this.startEmojiCheck(message);
                    }
                } else {
                    break;
                }
            }
        }

    }

    class GuildContainer {

        constructor(guild, cleaningchannels) {
            this.guild = client.guilds.get(guild);
            this.cleaningchannels = cleaningchannels;
            let that = this;
            setInterval(function () {
                const lifetimeMs = 60 * 1000;
                const now = Date.now();
                //let channels = 0;
                //let messages = 0;
                let arrayofignorechs = [];
                for (let x of that.cleaningchannels) {
                    arrayofignorechs.push(x.chid);
                }
                for (const channel of client.channels.values()) {
                    if (arrayofignorechs.includes(channel.id)) continue;
                    if (!channel.messages) continue;
                    //channels++;

                    //messages += 
                    channel.messages.sweep(
                        message => now - (message.editedTimestamp || message.createdTimestamp) > lifetimeMs
                    );
                    //console.log("end");
                }
            }, 60000);
        }
        async fetchmembers() {
            await this.guild.members.fetch();
        }
        async CleanUpTask(member = null) {
            for (let x of this.cleaningchannels) {
                await x.CleanUpTask(this.guild.members, member);
            }
        }
    }
    const Discord = require('discord.js');
    const client = new Discord.Client({
        fetchAllMembers: true,
        messageCacheMaxSize: Infinity
    });
    var guildcontainer;
    var setupmembers = false;

    function isJSON(something) {
        if (typeof something != 'string')
            something = JSON.stringify(something);

        try {
            JSON.parse(something);
            return true;
        } catch (e) {
            return false;
        }
    }

    function sleep(millis) {
        return new Promise(resolve => setTimeout(resolve, millis));
    }
    client.on('guildMemberRemove', async (member) => {
        while (guildcontainer == undefined || setupmembers == false) {
            console.log("wait until set");
            await sleep(1000);
        }
        await guildcontainer.CleanUpTask(member);
    });
    var freeplayerschs = ["472897474298904591", "450207850959208468", "456439303786987520"];
    client.on('voiceStateUpdate', async (oldVoiceState, newVoiceState) => {
        if (newVoiceState.channelID !== undefined && freeplayerschs.includes(newVoiceState.channelID)) {
            if (newVoiceState.selfDeaf) {
                console.log("MOVE PLAYER MUTE: " + newVoiceState.member.id);
                await newVoiceState.member.voice.setChannel("456447660531122187");
                await newVoiceState.member.send("Вы были перемещены в комнату бездействущие из-за того, что у вас был отключен звук в комнате поиска игроков.").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
            }
        }
    });
    process.on('unhandledRejection', function (reason, p) {
        console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
        process.exit(1);
    });
    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ', err);
        process.exit(1);
    });
    client.on("disconnect", (error) => {
        console.log("Disconnected!");
        process.exit(1);
    });
    client.on("disconnected", (error) => {
        console.log("Disconnected!");
        process.exit(1);
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
    let mainchid = "255706484380401666";
    var fs = require('fs');
    let arrayofdata = [];
    let file = fs.readFileSync('data/dominionpartner_data.json', 'utf8');
    if (!isJSON(file)) {
        fs.writeFileSync("data/dominionpartner_data.json", JSON.stringify([]), {
            encoding: 'utf8',
            flag: 'w'
        });
    } else arrayofdata = JSON.parse(file);

    function removealt(array, ...forDeletion) {
        return array.filter(function (value, index, ar) {
            return !forDeletion.includes(index);
        });
    }

    async function startloop() {
        let [result, fields] = await connection.query('SELECT * FROM rememberedgamenames WHERE roomid!=""');
        let included = [];
        //  let ignoreinwork = [];
        for (let resultitem of result) {
            if (included.includes(resultitem.roomid)) continue;
            included.push(resultitem.roomid);
            // if(ignoreinwork.includes(resultitem.roomid))continue;
            // else ignoreinwork.push(resultitem.roomid);
            if (resultitem.gamename.match(/доминион/i) || resultitem.gamename.match(/dominion/i)) {
                if (arrayofdata.findIndex(x => x.roomid === resultitem.roomid) === -1) {
                    console.log("notfoundinroom");

                    let invite = await client.channels.get(resultitem.roomid).createInvite({
                        maxAge: 0
                    });
                    console.log("notfoundinroom2");
                    //let voicech = client.channels.get(resultitem.roomid);
                    const msg = await client.channels.get(mainchid).send("@here, <@" + resultitem.userid + "> запустил **" + resultitem.gamename + "** на сервере __НИНРИ__. Перейти в комнату: https://discord.gg/" + invite.code).catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                    console.log("notfoundinroom3");
                    arrayofdata.push({
                        roomid: resultitem.roomid,
                        msgid: msg.id
                    });
                    console.log("notfoundinroom4");
                    //console.log('FINISHED', item["title"]);
                    fs.writeFileSync("data/dominionpartner_data.json", JSON.stringify(arrayofdata), {
                        encoding: 'utf8',
                        flag: 'w'
                    });
                    console.log("notfoundinroom5");
                    console.log(resultitem);
                    console.log(arrayofdata);
                }
            } else {
                let itemindex = arrayofdata.findIndex(x => x.roomid === resultitem.roomid);
                if (itemindex !== -1) {
                    let item = arrayofdata[itemindex];
                    console.log("deletion");
                    await client.channels.get(mainchid).messages.fetch(item.msgid)
                        .then(async message => {
                            await message.delete().catch(function (reason) {
                                console.log("ERROR1:" + reason);
                                if (reason.code != 10008 && reason.code != 10003) {
                                    console.log("Emoji message get error.");
                                    console.log(reason);
                                    process.exit(1);
                                }
                            });
                        }).catch(function (err) {
                            if (err.code != 10008) {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    arrayofdata = arrayofdata.filter((x, index) => index != itemindex);
                    fs.writeFileSync("data/dominionpartner_data.json", JSON.stringify(arrayofdata), {
                        encoding: 'utf8',
                        flag: 'w'
                    });
                    console.log(resultitem);
                    console.log(arrayofdata);
                }
            }

            //ignoreinwork = removealt(ignoreinwork, ignoreinwork.indexOf(resultitem.roomid));
        }

        for (let item of arrayofdata.filter(x => !included.includes(x.roomid))) {
            await client.channels.get(mainchid).messages.fetch(item.msgid)
                .then(async message => {
                    await message.delete().catch(function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
                }).catch(function (err) {
                    if (err.code != 10008) {
                        // Crawling failed...
                        console.log(err);
                        process.exit(1);
                    }
                });
        }
        let newarrayofdata = arrayofdata.filter(x => included.includes(x.roomid));
        //if (newarrayofdata != arrayofdata) {
        arrayofdata = newarrayofdata;
        //console.log(arrayofdata);
        fs.writeFileSync("data/dominionpartner_data.json", JSON.stringify(arrayofdata), {
            encoding: 'utf8',
            flag: 'w'
        });
        //}
        await sleep(3000);
        setImmediate(startloop);
    }
    client.on('error', (error) => {
        console.log("Error d.js!");
        process.exit(1);
    });
    client.on('message', async msg => {
        let newch = guildcontainer.cleaningchannels.find(x => x.chid == msg.channel.id);
        // console.log(newch);

        if (msg.channel.id == "500589919752683521" || msg.channel.id == "355732351864537098" || msg.channel.id == "500590376672034816") {
            if (msg.author.bot) await msg.delete().catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
        }
        if (newch != undefined && newch.onlylastmsg) {
            console.log("executeclean");
            await newch.deletemoremessagesfromuserexceptlast();
        }
        if (msg.channel.id == "467435197496033291")
            if (!msg.deleted) {
                /*try {
                    await msg.react("516658670524956692");
                    await msg.react("🎲");
                    await msg.react("💤");
                    await msg.react("🔒");
                } catch (err) {
                    if (err.code != 10008) {
                        console.log("emojissenderror");
                        process.exit(1);
                    } //else{return;}
                }*/
            }
    });
    /* async function startloop2() {
         for(let ch of guildcontainer.cleaningchannels.filter(x=>x.onlylastmsg)){
             await ch.deletemoremessagesfromuserexceptlast();
         }
         await sleep(300000);
         setImmediate(startloop2);
     }*/
    async function startloop3() {
        for (let ch of guildcontainer.cleaningchannels.filter(x => x.cleantime > 0)) {
            await ch.cleantimemsgs();
        }
        await sleep(300000);
        setImmediate(startloop3);
    }
    let isready = false;
    client.on('ready', async () => {
        if (isready) return;
        else isready = true;
        await singlefire();
        console.log(`Logged in as ${client.user.tag}!`);
        await client.user.setStatus('invisible');
        setInterval(function () {
            client.user.setStatus('invisible');
        }, 600000);
        for (const ch of freeplayerschs) {
            for (const [key, member] of client.channels.get(ch).members) {
                if (member.voice.selfDeaf) {
                    console.log("MOVE PLAYER MUTE: " + member.id);
                    await member.voice.setChannel("456447660531122187");
                    await member.send("Вы были перемещены в комнату бездействущие из-за того, что у вас был отключен звук в комнате поиска игроков.").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!")).catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }
            }
        }


        guildcontainer = new GuildContainer('286198213612929024', [new CleaningChannel("355732351864537098", true), new CleaningChannel("500589919752683521", true), new CleaningChannel("500590376672034816", true),
            new CleaningChannel("500589087716147200", false, 2592000000), new CleaningChannel("500588693845704704", false, 2592000000), new CleaningChannel("387347079883653120", false, 2592000000), //запланированные
            new CleaningChannel("495355543934730241"),
            new CleaningChannel("571757646898790410", true) // Турнирный выбор
        ]);
        await guildcontainer.fetchmembers();
        setupmembers = true;
        await guildcontainer.CleanUpTask();
        startloop3();
        //startloop2();
        startloop();

        let emojiReports = new EmojiReports('286198213612929024', [new EmojiChannel("467435197496033291", ["praisetheluck", "whaaat", "lol", "sneaky", "nooo", "pleasure", "salute", "magictrick", "predator", "simpleright", "rampage", "praise", "hope", "proud", "flex"], client.guilds.get('286198213612929024'))]);
        await emojiReports.startEmojiCheck();
        for (let ch of guildcontainer.cleaningchannels.filter(x => x.onlylastmsg)) {
            await ch.deletemoremessagesfromuserexceptlast();
        }
    });
    client.login('заменить');
} catch (err) {

    console.log("new error:" + err);
    process.exit(1);

}