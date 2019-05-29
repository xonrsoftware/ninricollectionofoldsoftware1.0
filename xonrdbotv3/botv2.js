try {
    const Discord = require('discord.js');
    const client = new Discord.Client({
        fetchAllMembers: true,
        messageCacheMaxSize: Infinity
    });
    var shuffle = require('crypto-shuffle')
    var steamidget = require("./commands/steam.js");
    var botid = "466307284977582109";
    var channelsvar = [];
    var rpgvar = [];
    var fs = require('fs');
    var util = require('util');
    var coopvar = [];
    var activegamesroomsid = [];
    var waitgamesroomsid = [];
    var rageroomsid = [];

    var vartextchannelid = [];
    var watchingmessagesmessageid = [];
    var watchingmessagesroomid = [];
    var watchingmessagesserverid = [];
    var watchingmessagesuserid = [];
    var log_file = fs.createWriteStream(__dirname + '/botv2.log', {
        flags: 'w'
    });
    client.on('debug', message => {
        log_file.write(util.format(message) + '\n');
    });
    // Возможно потребуется проверять на наличие лишних прав у пустых комнат.
    /*
    Ohh... i thought where is no users option. Thanks.
    SplingushСегодня в 09:46
    But they won't show up. The users in the mentions are taken from what discord sends with the message. If you "mention" someone by manually typing the <@id> in a DM, it's not a real mention.

    SoujiСегодня в 10:09
    that won't help
    it's not an issue with the bots cache but the users cache who's viewing the mention(изменено)
    SplingushСегодня в 10:10
    No it won't. Those are offline members in big guilds, and aren't loaded on your client.
    */

    var pendingcreating = [];
    var pendingexist = [];
    //var pendingholdsettings = [];
    var botarray = [
        '232916519594491906',
        '329668530926780426',
        '110462073074388992',
        '155149108183695360',
        '184405311681986560'
    ];
    var ignorevoicechannels = [
        '456447660531122187',
        '456439303786987520',
        '479323876137107467',
        '450207850959208468',
        '479326920035794944',
        '472897474298904591',
        '479327212596625409'
    ];
    var ignoreuntilupdateid = [];
    var ignoreuntilupdatetimestamp = [];

    function remove(array, ...forDeletion) {
        return array.filter(function (value, index, ar) {
            return forDeletion.includes(index);
        });
    }

    function removealt(array, ...forDeletion) {
        return array.filter(function (value, index, ar) {
            return !forDeletion.includes(index);
        });
    }
    /*process.on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection at:', p, 'reason:', reason);
      // application specific logging, throwing an error, or other logic here
    });*/
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
    //let firstrunsmiles = true;
    async function checkforemoji(index) {
        if (channelsvar.includes(index) || rpgvar.includes(index) || coopvar.includes(index)) {
            try {
                //if (client.channels.get(watchingmessagesserverid[index]).messages != undefined && client.channels != undefined) {
                if ( //client.channels.get(watchingmessagesserverid[index]).messages.has(watchingmessagesmessageid[index]) && 
                    client.channels.has(watchingmessagesroomid[index]) && client.channels.get(watchingmessagesserverid[index]) != undefined && client.channels.get(watchingmessagesroomid[index]).members.has(watchingmessagesuserid[index])) {
                    await client.channels.get(watchingmessagesserverid[index]).messages.fetch(watchingmessagesmessageid[index])
                        .then(async message => {
                            if (message != undefined) {
                                var reactions = message.reactions.get('🎲');
                                if (reactions != undefined) {
                                    let users = await reactions.users.fetch();
                                    if (users.has(watchingmessagesuserid[index])) {
                                        if (!activegamesroomsid.includes(watchingmessagesroomid[index])) {
                                            activegamesroomsid.push(watchingmessagesroomid[index]);
                                        }
                                    } else {
                                        if (activegamesroomsid.includes(watchingmessagesroomid[index]))
                                            activegamesroomsid = removealt(activegamesroomsid, activegamesroomsid.indexOf(watchingmessagesroomid[index]));
                                    }
                                } else await message.react('🎲');

                                reactions = message.reactions.get('💤');
                                if (reactions != undefined) {
                                    let users = await reactions.users.fetch();
                                    if (users.has(watchingmessagesuserid[index])) {
                                        if (!waitgamesroomsid.includes(watchingmessagesroomid[index])) {
                                            waitgamesroomsid.push(watchingmessagesroomid[index]);
                                        }
                                    } else {
                                        if (waitgamesroomsid.includes(watchingmessagesroomid[index]))
                                            waitgamesroomsid = removealt(waitgamesroomsid, waitgamesroomsid.indexOf(watchingmessagesroomid[index]));
                                    }
                                } else await message.react('💤');

                                reactions = message.reactions.get('🔒');
                                if (reactions != undefined) {
                                    let users = await reactions.users.fetch();

                                    if (users.has(watchingmessagesuserid[index]) && client.channels.get(watchingmessagesroomid[index]).userLimit == 0) {
                                        await client.channels.get(watchingmessagesroomid[index]).setUserLimit(client.channels.get(watchingmessagesroomid[index]).members.size);
                                    }
                                } else await message.react('🔒');
                                //if (rageroomsid.includes(watchingmessagesroomid[index]) //|| !activegamesroomsid.includes(watchingmessagesroomid[index])
                                // ) {
                                //if(firstrunsmiles) firstrunsmiles = false;
                                reactions = message.reactions.get("516658670524956692");
                                if (reactions != undefined) {
                                    let users = await reactions.users.fetch();
                                    if (!users.has(watchingmessagesuserid[index])) {
                                        if (rageroomsid.includes(watchingmessagesroomid[index]))
                                            rageroomsid = removealt(rageroomsid, rageroomsid.indexOf(watchingmessagesroomid[index]));
                                    } else {
                                        if (!rageroomsid.includes(watchingmessagesroomid[index]))
                                            rageroomsid.push(watchingmessagesroomid[index]);
                                    }
                                } else await message.react('516658670524956692');
                                //}
                            }
                        }).catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                            if (client.channels.get(index).members.size > 0) {
                                await client.channels.get(vartextchannelid[index]).send("Не найдено сообщение с эмодзи контроля, хост был удалён.\nСтать хостом можно сделав сообщение о сборе в <#575310216351055882>, боту <@466307284977582109>, изменив название комнаты, кликнув на эмодзи 🚩 под сообщением.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                }).then(async (msg) => {
                                    await msg.react("🚩");
                                    await connection.query('DELETE FROM waitingforhosttotake WHERE chid=?', [index]);
                                    await connection.query('INSERT INTO waitingforhosttotake SET chid=?,messageid=?', [index, msg.id]);
                                    ignoresweeptakehost[index] = msg.id;
                                });
                            }

                            await connection.query('DELETE FROM rememberedgamenames WHERE roomid=?', [watchingmessagesroomid[index]]);
                            console.log("DELETE remeber6 " + index);
                            delete watchingmessagesmessageid[index];
                            delete watchingmessagesroomid[index];
                            delete watchingmessagesserverid[index];
                            delete watchingmessagesuserid[index];
                            if (activegamesroomsid.includes(index))
                                activegamesroomsid = removealt(activegamesroomsid, activegamesroomsid.indexOf(index));
                            if (waitgamesroomsid.includes(index))
                                waitgamesroomsid = removealt(waitgamesroomsid, waitgamesroomsid.indexOf(index));
                            /* if (channelsvar.includes(index))
                                 await setuppermchannelsvar(client.channels.get(index));
                             else if (coopvar.includes(client.channels.get(index)))
                                 await setuppermcoop(mychannel);
                             else if (rpgvar.includes(client.channels.get(index)))
                                 await setuppermrpg(mychannel);*/
                        });

                } else {
                    //if(!pendingexist.includes(watchingmessagesmessageid)){
                    if (client.channels.get(index).members.size > 0) {
                        await client.channels.get(vartextchannelid[index]).send("Хост покинул комнату, либо комната была удалена, значение хоста было сброшено.\nСтать хостом можно сделав сообщение о сборе в <#575310216351055882>, боту <@466307284977582109>, изменив название комнаты, кликнув на эмодзи 🚩 под сообщением.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        }).then(async (msg) => {
                            await msg.react("🚩");
                            await connection.query('DELETE FROM waitingforhosttotake WHERE chid=?', [index]);
                            await connection.query('INSERT INTO waitingforhosttotake SET chid=?,messageid=?', [index, msg.id]);
                            ignoresweeptakehost[index] = msg.id;
                        });
                    }
                    await connection.query('DELETE FROM rememberedgamenames WHERE roomid=?', [watchingmessagesroomid[index]]);
                    console.log("DELETE remeber6 " + index);
                    delete watchingmessagesmessageid[index];
                    delete watchingmessagesroomid[index];
                    delete watchingmessagesserverid[index];
                    delete watchingmessagesuserid[index];
                    if (activegamesroomsid.includes(index))
                        activegamesroomsid = removealt(activegamesroomsid, activegamesroomsid.indexOf(index));
                    if (waitgamesroomsid.includes(index))
                        waitgamesroomsid = removealt(waitgamesroomsid, waitgamesroomsid.indexOf(index));
                    /* if (channelsvar.includes(index))
                         await setuppermchannelsvar(client.channels.get(index));
                     else if (coopvar.includes(client.channels.get(index)))
                         await setuppermcoop(mychannel);
                     else if (rpgvar.includes(client.channels.get(index)))
                         await setuppermrpg(mychannel);*/
                    //}
                }
                // }
            } catch (err) {
                //if(!pendingexist.includes(watchingmessagesmessageid)){
                //pendingexist.push(watchingmessagesmessageid);

                try {
                    await client.users.get(watchingmessagesuserid[index]).createDM().then(async (dm) => {
                        await client.channels.get(watchingmessagesserverid[index]).messages.fetch().then(async messages => {
                            // pendingexist = removealt(pendingexist, pendingexist.indexOf(watchingmessagesmessageid));
                            await checkforemoji(index);
                        }).catch(async function (reason) {
                            await checkforemoji(index);
                            console.log("ERRORcreateDM:" + reason);
                        });
                    }).catch(function (reason) {
                        //checkforemoji(index);
                        console.log("ERRORcreateDM1:" + reason);
                    });
                } catch (err) {
                    console.log("INTERNAL EMOJI2 ERROR:" + err);
                    // pendingexist = removealt(pendingexist, pendingexist.indexOf(watchingmessagesmessageid));
                    await checkforemoji(index);
                }
                console.log("INTERNAL EMOJI ERROR:" + err);
                //}
            }
        }

    }
    var helptext = `
**Разделы:**
\\⚪ __**!ни**__ или __**!ni**__ —  раздел для **настольных игр**.
\\⚪ __**!нри**__ или __**!nri**__ —  раздел для **ролевых игр: GoW, D&D, GURPS, самопалы**...
\\⚪ __**!нни**__ или __**!nni**__ —  раздел для **НЕ настольных игр**.

:exclamation: **Без активации хотя бы одного раздела, вы не сможете видеть основные каналы и комнаты сервера!**

В зависимости от используемой для игры платформы:
\\⚪ __**!tts**__ или __**!tabletopsimulator**__ или __**!тейблтопсимулятор**__ — для получения роли Tabletop Simulator;
\\⚪ __**!vs**__ или __**!vassal**__ или __**!вассал**__ — для получения роли Vassal.
\\⚪ __**!ttp**__ или __**!tabletopia**__ или __**!тейблтопия**__ — для получения роли Tabletopia;
\\⚪ __**!otp**__ или __**!otherplatform**__ или __**!другаяплатформа**__ — для получения роли Другая платформа.

*У каждой платформы есть отдельный текстовый чат.*

**Пиратский Tabletop Simulator:**
Мы опубликовали подробную инструкцию с картинками по получению игры Tabletop Simulator **БЕСПЛАТНО**.  Последняя версия, рабочий мультиплеер.
Для обладателей лицензионной копии у нас тоже есть сюрприз, **активация всех дополнений распаковкой одного архива!**

Подробнее: <#473200331132502016>. 
Канал доступен только пользователям с ролью платформы Tabletop Simulator.

Можно вступить в тематические каналы:
  __Общие:__
:white_small_square: __**!ттспират**__ или __**!ttspirate**__ — канал для пиратов Tabletop Simulator, используется для координации сборов на игру. Крайне рекомендуем пиратам получить эту роль в дополнении к основной роли Tabletop Simulator!
:white_small_square: __**!мододел**__ или __**!workshop**__ — канал для моддеров, где обсуждаются вопросы по созданию модов, скриптинг Lua / TTS API, переводы, моделирование и т.д.

  __Настольные игры:__
:white_small_square: __**!бсг**__ или __**!bsg**__ — канал по BattleStar Galactica *(Звёздный крейсер Галактика)*;
:white_small_square: __**!евро**__ или __**!euro**__ — канал по евроиграм: Агрикола, Виноделие, Билет на поезд и др.
:white_small_square: __**!зомбицид**__ или __**!zombicide**__ — канал посвящённый Зомбициду, как современному, так и средневековому;
:white_small_square: __**!лавкрафт**__ или __**!lovecraft**__ — канал по играм Лавкрафта - Ужас Аркхэма, Древний Ужас, Особняки Безумия, Знак Древних и другие;
:white_small_square: __**!патигейм**__ или __**!partygame**__ — канал по компанейским играм: Таверна Красный дракон, Манчкин, Секретный Гитлер и др;
:white_small_square: __**!стратегия**__ или __**!strategy**__ — канал по стратегическим играм: Codex, Mage Wars, Forbidden stars и др.

  __Настольные ролевые игры:__
:white_small_square: __**!следопыт**__ или __**!pathfinder**__ — канал по настольной ролевой игре Pathfinder.

  __Не настольные игры:__
:white_small_square: __**!свояигра**__ или __**!sigame**__ — канал по компьютерной версии Своей игры.
**  **
:exclamation:  Повторная отправка команды уберёт роль и закроет доступ к соответствующим каналам.
**  **
**Другие команды:**
Команды партнёров из <#480978383518302209>.
__**!кстимлобби**__ СсылкаНаПрофильСтим или __**!ksteamlobby**__ СсылкаНаПрофильСтим — Работает везде (в том числе через личное сообщение боту <@466307284977582109>), выводит текущую игру и ссылку подключения к ней, профиль стим должен быть открыт, доступ к игровой информации обязательно должен быть открыт. Можно получать ссылку на лобби не только Tabletop Simulator. (Отправив команду через #для-команд-боту, вы получите ответ в личном сообщении от бота)
__**!кстимлоббисохранить**__ СсылкаНаПрофильСтим или __**!ksteamlobbysave**__ СсылкаНаПрофильСтим — Запоминает указанный профиль для использования в **!кстимлобби** без указания профиля.
__**!кстимлобби**__ или __**!ksteamlobby**__ — Работает везде (в том числе через личное сообщение боту <@466307284977582109>), выводит текущую игру сохранённого пользователя стим и ссылку подключения к ней, профиль стим должен быть открыт, доступ к игровой информации обязательно должен быть открыт. Можно получать ссылку на лобби не только Tabletop Simulator. (Отправив команду через #для-команд-боту, вы получите ответ в личном сообщении от бота)
__**!кслучай**__ или __**!krandom**__ 5 — Выводит случайное число от 1 до 5. 
__**!кслучай**__ или __**!krandom**__ 32 88 — Выводит случайное число от 32 до 88.
\\❗  Максимальное число в качестве параметра команды !кслучай — 100000000.
\\❕  Используется защищённый алгоритм, предсказать число невозможно.
**  **
:exclamation:  **В этот канал следует отправлять ТОЛЬКО команды из списка, если вы хотите отправить другие команды, то используйте другой канал!**
:exclamation:  **Вы должны получить ответ от бота в течение 1 минуты, если вы не получили ответ, то повторите попытку.**
:grey_question: *Для музыкальных ботов используйте <#333619613164240897> (Открывается после получения основной роли)*
:grey_question: *Полный список команд для бота вы найдёте в <#485413029551276032>*
`;
    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array)
        }
    }
    Array.prototype.forEachAsync = async function (fn) {
        for (let t of this) {
            await fn(t)
        }
    }

    Array.prototype.forEachAsyncParallel = async function (fn) {
        await Promise.all(this.map(fn));
    }
    var fs = require('fs');
    async function fixmute() {
        if (client.guilds.get('286198213612929024') == undefined || client.guilds.get('286198213612929024').members == undefined) {
            console.log("Error fixmute!");
            process.exit(1);
        } else {
            for (const [key, element] of client.guilds.get('286198213612929024').members) {
                if (element.serverDeaf) {
                    console.log("FIX DEAF:" + element.displayName);
                    await element.voice.setDeaf(false);
                }
                if (element.serverMute) {
                    console.log("FIX MUTE:" + element.displayName);
                    await element.voice.setMute(false);
                }
            }
        }
    }
    client.on('guildMemberRemove', async (member) => {
        //await checkuserbase();
    });

    let ignoresweeptakehost = [];
    client.on('userUpdate', async (oldUserPre, NewUserPre) => {
        if (client.guilds.get('286198213612929024') == undefined || client.guilds.get('286198213612929024').members == undefined) {
            console.log("Error userUpdate!");
            process.exit(1);
        } else {
            if (NewUserPre != undefined && NewUserPre != null && NewUserPre.id != undefined) {
                let newUser = client.guilds.get('286198213612929024').members.get(NewUserPre.id);
                if (newUser == undefined) newUser = client.guilds.get('286198213612929024').members.fetch(NewUserPre.id);
                if (newUser != undefined) {
                    if (newUser.voice.serverDeaf)
                        await newUser.voice.setDeaf(false);

                    if (newUser.voice.serverMute)
                        await newUser.voice.setMute(false);
                }
            }
        }
    });
    client.on('error', (error) => {
        console.log("Error d.js!");
        process.exit(1);
    });
    let isready = false;
    client.on('ready', async () => {
        if (isready) return;
        else isready = true;
        console.log("Ready!");
        //wait(2000);
        fs.writeFileSync("botdata.json", JSON.stringify(client.guilds.get('286198213612929024').roles.array()), {
            encoding: 'utf8',
            flag: 'w'
        });
        fs.writeFileSync("botemojisdata.json", JSON.stringify(client.guilds.get('286198213612929024').emojis.array()), {
            encoding: 'utf8',
            flag: 'w'
        });
        fs.writeFileSync("botemojisdata2.json", JSON.stringify(client.guilds.get('466299551964332062').emojis.array()), {
            encoding: 'utf8',
            flag: 'w'
        });
        await client.user.setStatus('invisible');
        setInterval(function () {
            client.user.setStatus('invisible');
        }, 600000);
        /*await client.user.setActivity('за комнатами', {
            type: 'WATCHING'
        });
        setInterval(function () {
            client.user.setActivity('за комнатами', {
                type: 'WATCHING'
            });
        }, 600000);*/
        var tempvar = await client.channels.get("286198213612929024");
        if (tempvar == undefined) {
            console.log("FAILED START");
            process.exit(1);
        }
        var tempvar2 = await client.channels.get("393383348833353728");
        if (tempvar2 == undefined) {
            console.log("FAILED START");
            process.exit(1);
        }
        var tempvar3 = await client.channels.get("472889032628764672");
        if (tempvar3 == undefined) {
            console.log("FAILED START");
            process.exit(1);
        }
        Array.prototype.push.apply(modarray, client.guilds.get('286198213612929024').roles.get("389081897646424064").members.map(function (mem) {
            return mem.user.id;
        }));
        Array.prototype.push.apply(modarray, client.guilds.get('286198213612929024').roles.get("294447183921414145").members.map(function (mem) {
            return mem.user.id;
        }));
        Array.prototype.push.apply(modarray, client.guilds.get('286198213612929024').roles.get("286201408238387201").members.map(function (mem) {
            return mem.user.id;
        }));
        await fixmute();
        await tempvar3.messages.fetch();
        await tempvar2.messages.fetch();
        await tempvar.messages.fetch();
        for (let c of channelsvar) {
            var channelnumber = channelsvar.indexOf(c);
            await Promise.all(client.guilds.get('286198213612929024').channels.filter(ch => ch.type == "voice" && ch.parentID == "362003311861301248" && !ignorechannelslist.includes(ch.id) && ch.name == '🎀:' + (channelnumber + 1) + ' [Инициализация]').map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
            Promise.all(await client.guilds.get('286198213612929024').channels.filter(ch => ch.type == "text" && ch.parentID == "362003311861301248" && !ignorechannelslist.includes(ch.id) && ch.name == '📝' + (channelnumber + 1) + '-инициализация').map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
        }
        for (let c of coopvar) {
            var channelnumber = coopvar.indexOf(c);
            Promise.all(await client.guilds.get('286198213612929024').channels.filter(ch => ch.type == "voice" && ch.parentID == "363054686460182528" && !ignorechannelslist.includes(ch.id) && ch.name == 'O🎀:' + (channelnumber + 1) + ' [Инициализация]').map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
            Promise.all(await client.guilds.get('286198213612929024').channels.filter(ch => ch.type == "text" && ch.parentID == "363054686460182528" && !ignorechannelslist.includes(ch.id) && ch.name == '📝' + (channelnumber + 1) + '-инициализация').map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
        }
        for (let c of rpgvar) {
            var channelnumber = rpgvar.indexOf(c);
            Promise.all(await client.guilds.get('286198213612929024').channels.filter(ch => ch.type == "voice" && ch.parentID == "381083236455153686" && !ignorechannelslist.includes(ch.id) && ch.name == 'R🎀:' + (channelnumber + 1) + ' [Инициализация]').map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
            Promise.all(await client.guilds.get('286198213612929024').channels.filter(ch => ch.type == "text" && ch.parentID == "381083236455153686" && !ignorechannelslist.includes(ch.id) && ch.name == '📝' + (channelnumber + 1) + '-инициализация').map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
        }
        let [result, fields] = await connection.query('SELECT * FROM waitingforhosttotake');
        //console.log(result[0].roomid);
        //process.exit(1);
        var length = Object.keys(result).length;
        for (let i = 0; i < length; i++) {
            if (client.guilds.get('286198213612929024').channels.has(result[i].chid) && vartextchannelid[result[i].chid] != undefined && client.guilds.get('286198213612929024').channels.has(vartextchannelid[result[i].chid])) {
                await client.channels.get(vartextchannelid[result[i].chid]).messages.fetch(result[i].messageid).then((msg) => {
                    ignoresweeptakehost[result[i].chid] = msg.id;
                    //ignoresweeptakehost.push(msg.id);
                }).catch(async function (err) {
                    if (err.code != 10008) {
                        console.log("Host take message was deleted while bot was offline.");
                        console.log(err);
                        process.exit(1);
                    }
                    await connection.query('DELETE FROM waitingforhosttotake WHERE chid=?', [result[i].chid]);
                });
            } else {
                await connection.query('DELETE FROM waitingforhosttotake WHERE chid=?', [result[i].chid]);
            }
        };

        var ourchannel = client.channels.get("478312979843252234");
        if (ourchannel != undefined) {
            var loopback = 0;
            while (true) {
                var breakthis = false;

                await client.channels.get(ourchannel.id).messages.fetch({
                    limit: 100
                }).then(async (messages) => {
                    let messagesArr = messages.array();
                    let messageCount = messagesArr.length;
                    if (messageCount > 0) {
                        console.log("LOOPING");
                        var deletecount = 0;
                        Promise.all(messages.map(element => {
                            if (element.author.id != "466307284977582109") {
                                deletecount++;
                                return element.delete();
                            }
                        })).catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                        if (deletecount == 0 && loopback == 1) {
                            breakthis = true;
                            return;
                        } else if (deletecount > 0) loopback = 0;
                        else if (deletecount == 0) loopback = 1;
                    } else {
                        console.log("STOP8");
                        breakthis = true;
                        return;
                    }
                });
                if (breakthis) break;
            }
            /* try {
                 while (true) {
                     var breakthis = false;
                     await client.channels.get(ourchannel.id).fetchMessages({
                             limit: 100
                         }).then(async (messages) => {
                             let messagesArr = messages.array();
                             let messageCount = messagesArr.length;
                             if (messageCount > 0) {
                                 console.log("LOOPING");
                                 await client.channels.get(ourchannel.id).bulkDelete(messageCount);

                             } else {
                                 console.log("STOP");
                                 breakthis = true;
                                 return;
                             }
                         });
                     if (breakthis) break;
                 }
                 
             } catch (err) {
                 while (true) {
                     var breakthis = false;
                     await client.channels.get(ourchannel.id).fetchMessages({
                             limit: 100
                         }).then(async (messages) => {
                             let messagesArr = messages.array();
                             let messageCount = messagesArr.length;
                             if (messageCount > 0) {
                                 console.log("LOOPING");
                                 await Promise.all(messages.map(async (element) => {
                                     await element.delete().catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             }).catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             });
                                 }));
                             } else {
                                 console.log("STOP");
                                 breakthis = true;
                                 return;
                             }
                         });
                     if (breakthis) break;
                 }
                 console.log("ASYNC ERROR 1" + err);
             }*/
            // client.channels.get(ourchannel.id).send(helptext,{"split":true});
        }

        // var timerId = setInterval(function() {
        /*await asyncForEach(Object.keys(watchingmessagesroomid), async (index) => {
            await checkforemoji(index);
            console.log("CHECKED");
        });*/

        for (let index of Object.keys(watchingmessagesroomid)) {
            //console.log(index);
            await checkforemoji(index);
        }
        console.log("GT");
        //deleteoldmessages
        setInterval(function () {
            const lifetimeMs = 300 * 1000;
            const now = Date.now();
            for (const channel of client.channels.values()) {
                if (!channel.messages) continue;
                channel.messages.sweep(
                    message => !Object.values(watchingmessagesmessageid).includes(message.id) && !Object.values(ignoresweeptakehost).includes(message.id) && (now - (message.editedTimestamp || message.createdTimestamp) > lifetimeMs)
                );
            }
        }, 60000);
        setInterval(function () {
            trimexpruser();
        }, 500);
        await checkchannels();
        await movebotsfromfreeplayers();
        await checkoutnewhostbynamechange();
        checkforswaptoemptyroom();
        startloop();

        /*while (true) {
            await checkchannels();
            await wait(100);
        }*/
    });

    async function startloop() {

        while (true) {
            await checkchannels();
            await wait(350);
        }

        //setImmediate(startloop);
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
    client.on('ratelimit', (rateLimitInfo) => {
        client.guilds.get('286198213612929024').channels.get('474212860667363328').send('Запросы бота замедленны, возможна DDOS атака, информация:\n' + rateLimitInfo).catch((err) => {
            if (err.code == 50007) console.log("Can't send M!");
            else {
                console.log(err);
                process.exit(1);
            }
        });
    });

    client.on('messageReactionAdd', async (reaction, user) => {
        //console.log(watchingmessagesmessageid[''+reaction.message.id.toString()+'']);
        //console.log(watchingmessagesmessageid[''+reaction.message.id+'']);
        //console.log(watchingmessagesmessageid[reaction.message.id]);
        //console.log(watchingmessagesmessageid[reaction.message.channel.id]);
        //console.log(reaction.message.id);
        //console.log(watchingmessagesmessageid);
        //console.log(user);
        //console.log("INSTA REACTIONZ");
        if (reaction.message != undefined && !reaction.message.deleted) {
            let channelid = getKeyByValue(watchingmessagesmessageid, reaction.message.id);
            if (channelid != undefined) {
                if (user.id == watchingmessagesuserid[channelid]) {
                    if (watchingmessagesmessageid[channelid] == reaction.message.id) {
                        if (reaction.emoji.name == "🎲") {
                            if (!activegamesroomsid.includes(channelid))
                                activegamesroomsid.push(channelid);
                            if (channelsvar.includes(channelid))
                                await workwithchannel(channelid, channelsvar.indexOf(channelid) + 1, null);
                            else if (rpgvar.includes(channelid))
                                await workwithchannel(channelid, rpgvar.indexOf(channelid) + 1, null);
                            else if (coopvar.includes(channelid))
                                await workwithchannel(channelid, coopvar.indexOf(channelid) + 1, null);
                        } else if (reaction.emoji.name == "🔒") {
                            client.channels.get(channelid).setUserLimit(client.channels.get(channelid).members.size).then(async () => {
                                if (channelsvar.includes(channelid))
                                    await workwithchannel(channelid, channelsvar.indexOf(channelid) + 1, null);
                                else if (rpgvar.includes(channelid))
                                    await workwithchannel(channelid, rpgvar.indexOf(channelid) + 1, null);
                                else if (coopvar.includes(channelid))
                                    await workwithchannel(channelid, coopvar.indexOf(channelid) + 1, null);
                            });

                        } else if (reaction.emoji.id == "516658670524956692") {
                            //if (!activegamesroomsid.includes(channelid)) {
                            if (!rageroomsid.includes(channelid))
                                rageroomsid.push(channelid);
                            await connection.query('UPDATE rememberedgamenames SET rage=1 WHERE roomid=?', [channelid]);
                            //message.reactions.get('😈').remove(botid);
                            //}

                        } else if (reaction.emoji.name == "💤") {
                            if (!waitgamesroomsid.includes(channelid)) {
                                waitgamesroomsid.push(channelid);
                            }
                        }
                    }
                }
            } else if (user.bot == false) {
                let channelid = getKeyByValue(vartextchannelid, reaction.message.channel.id);
                if (reaction.emoji.name == "🚩") {

                    let type = null;
                    if (channelsvar.includes(channelid)) {
                        type = 0;
                    } else if (rpgvar.includes(channelid)) {
                        type = 1;
                    } else if (coopvar.includes(channelid)) {
                        type = 3;
                    }
                    if (type != null) {
                        let newChannel = client.guilds.get('286198213612929024').channels.get(channelid);
                        if (newChannel != undefined) {
                            console.log("hooked:" + user.username);
                            trimexpruser(user.id, type);
                            var tempnamevar = newChannel.name;
                            if (newChannel.name.substring(0, 5).includes("😈"))
                                tempnamevar = tempnamevar.replace(/😈/, '');
                            if (newChannel.name.substring(0, 5).includes("🎀"))
                                tempnamevar = tempnamevar.replace(/🎀/, '');
                            if (newChannel.name.substring(0, 5).includes("⏳"))
                                tempnamevar = tempnamevar.replace(/⏳/, '');
                            if (newChannel.name.substring(0, 5).includes("💤"))
                                tempnamevar = tempnamevar.replace(/💤/, '');
                            if (newChannel.name.substring(0, 5).includes("🐲"))
                                tempnamevar = tempnamevar.replace(/🐲/, '');
                            if (newChannel.name.substring(0, 5).includes("🎮"))
                                tempnamevar = tempnamevar.replace(/🎮/, '');
                            if (newChannel.name.substring(0, 5).includes("🎲"))
                                tempnamevar = tempnamevar.replace(/🎲/, '');
                            if (rpgvar.includes(newChannel.id)) {
                                tempnamevar = tempnamevar.replace("R:" + (rpgvar.indexOf(newChannel.id) + 1), '');
                            } else if (coopvar.includes(newChannel.id)) {
                                tempnamevar = tempnamevar.replace("O:" + (coopvar.indexOf(newChannel.id) + 1), '');
                            } else if (channelsvar.includes(newChannel.id)) {
                                tempnamevar = tempnamevar.replace(":" + (channelsvar.indexOf(newChannel.id) + 1), '');
                            }
                            tempnamevar = tempnamevar.trim();
                            /*const selfsendedmessage = await user.send('```fix\nВы стали хостом.\n Текущее состояние игры - \⏳ (Набор игроков).\n Чтобы изменить статус на \🎲 (Идёт игра) или "перерыв" (\💤), кликни по соответствующему эмодзи внизу этого сообщения.\n Используйте 🔒, чтобы установить лимит равный количеству игроков в голосовой комнате. Снятие эмодзи уберёт лимит комнаты.\n Используйте \😈 в объявлении, чтобы обозначить использование мата в голосовой комнате, возможно установить только до выставления статуса "Идёт игра".\n```').then(async (msg) => {
                                await msg.react("516658670524956692");
                                await msg.react("🎲");
                                await msg.react("💤");
                                await msg.react("🔒");
                            });*/
                            console.log("insertreaction:" + newChannel.name);
                            await connection.query('INSERT INTO rememberedgamenames SET timestampexp=?,userid=?,gamename=?,messageid=?,messageserverid=?,roomtype=?', [new Date().getTime() + 60000, user.id, tempnamevar, "", "", type]);
                            await checkchannels(user.id);
                        }
                    }
                }
            }
        }
        // console.log(reaction.emoji.name);
    });
    var steam = require('steam-web');

    var steamwrap = new steam({
        apiKey: 'заменить',
        format: 'json' //optional ['json', 'xml', 'vdf']
    });
    client.on('messageReactionRemove', async (reaction, user) => {
        //console.log("INSTA REACTIONZ");
        if (reaction.message != undefined && !reaction.message.deleted) {
            var channelid = getKeyByValue(watchingmessagesmessageid, reaction.message.id);
            if (watchingmessagesmessageid[channelid] != undefined && user.id == watchingmessagesuserid[channelid]) {
                if (reaction.emoji.name == "🎲") {
                    /*var reactions32 = reaction.message.reactions.get('516658670524956692');
                    if (reactions32 != undefined) {
                        let users = await reactions32.users.fetch();
                        //console.log("YEP");
                        if (!users.has(watchingmessagesuserid[channelid])) {
                            if (rageroomsid.includes(channelid))
                                rageroomsid = removealt(rageroomsid, rageroomsid.indexOf(channelid));
                        } else {
                            if (!rageroomsid.includes(channelid))
                                rageroomsid.push(channelid);
                        }
                    }*/


                    if (activegamesroomsid.includes(channelid))
                        activegamesroomsid = removealt(activegamesroomsid, activegamesroomsid.indexOf(channelid));
                    if (channelsvar.includes(channelid))
                        await workwithchannel(channelid, channelsvar.indexOf(channelid) + 1, null);
                    else if (rpgvar.includes(channelid))
                        await workwithchannel(channelid, rpgvar.indexOf(channelid) + 1, null);
                    else if (coopvar.includes(channelid))
                        await workwithchannel(channelid, coopvar.indexOf(channelid) + 1, null);

                } else if (reaction.emoji.name == "🔒") {
                    client.channels.get(channelid).setUserLimit(0).then(async () => {
                        if (channelsvar.includes(channelid))
                            await workwithchannel(channelid, channelsvar.indexOf(channelid) + 1, null);
                        else if (rpgvar.includes(channelid))
                            await workwithchannel(channelid, rpgvar.indexOf(channelid) + 1, null);
                        else if (coopvar.includes(channelid))
                            await workwithchannel(channelid, coopvar.indexOf(channelid) + 1, null);
                    });
                } else if (reaction.emoji.name == "💤") {
                    if (waitgamesroomsid.includes(channelid)) {
                        waitgamesroomsid = removealt(waitgamesroomsid, waitgamesroomsid.indexOf(channelid));
                    }
                } else if (reaction.emoji.id == "516658670524956692" //&& !activegamesroomsid.includes(channelid)
                ) {
                    if (rageroomsid.includes(channelid)) {
                        rageroomsid = removealt(rageroomsid, rageroomsid.indexOf(channelid));
                        await connection.query('UPDATE rememberedgamenames SET rage=0 WHERE roomid=?', [channelid]);
                    }
                    //message.reactions.get('😈').remove(botid);
                }
            }
        }
    });
    client.on('messageReactionRemoveAll', async (message) => {
        if (message != undefined && !message.deleted) {
            //console.log("INSTA REACTIONZ");
            var channelid = getKeyByValue(watchingmessagesmessageid, message.id);
            if (watchingmessagesmessageid[channelid] != undefined && user.id == watchingmessagesuserid[channelid]) {
                client.channels.get(channelid).setUserLimit(0);
                if (activegamesroomsid.includes(channelid))
                    activegamesroomsid = removealt(activegamesroomsid, activegamesroomsid.indexOf(channelid));
                if (waitgamesroomsid.includes(channelid)) {
                    waitgamesroomsid = removealt(waitgamesroomsid, waitgamesroomsid.indexOf(channelid));
                }
                if (rageroomsid.includes(channelid)) {
                    rageroomsid = removealt(rageroomsid, rageroomsid.indexOf(channelid));
                }
                if (channelsvar.includes(channelid))
                    await workwithchannel(channelid, channelsvar.indexOf(channelid) + 1, null);
                else if (rpgvar.includes(channelid))
                    await workwithchannel(channelid, rpgvar.indexOf(channelid) + 1, null);
                else if (coopvar.includes(channelid))
                    await workwithchannel(channelid, coopvar.indexOf(channelid) + 1, null);
                //console.log("INSTA REACTION");
            }
        }
    });

    /*function rndarr(a, b, c, d) { //array,placeholder,placeholder,placeholder
        c = a.length;
        while (c) b = Math.random() * c-- | 0, d = a[c], a[c] = a[b], a[b] = d
    }*/
    const _ = require("underscore");
    var angerrypingarray = [
        "481061593170313219",
        "481061593275170817",
        "481061593291948053",
        "481061593506119691",
        "481061593527091210",
        "481061593602457610",
        "481061593824886784",
        "481061594395181076",
        "481061595120795650",
        "481061595678638091"
    ];
    var randomNumber = require("random-number-csprng");
    async function randomIntFromInterval(min, max) // min and max included
    {
        return await randomNumber(min, max);
    }
    client.on('message', msg => {
        /*if (msg.channel.type != "dm" && msg.mentions.everyone) {
            msg.react(_.sample(angerrypingarray));
        }*/
        if (msg.author.id == "466307284977582109") return; //IGNORE OWN MESSAGES
        let matchedcontent;
        //  if (msg.content.match(/^!к(.*)/i) || msg.content.match(/^!k(.*)/i)) {

        //var voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
        /*OLDvartextchannelid.map(function(e) { return e; }).indexOf(msg.channel.id);vartextchannelid.findIndex(function(entry) {
              if(entry == msg.channel.id)return true;
          });*/
        //if (voicechh == undefined || voicechh == null || voicechh == -1)
        //   voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];

        //console.log("fff");
        //console.log(voicechh);
        // console.log(Object.values(watchingmessagesuserid).indexOf(msg.author.id));

        if (matchedcontent = msg.content.match(/^!кслучай\s*([0-9]+)\s+([0-9]+)/i) || msg.content.match(/^!krandom\s*([0-9]+)\s+([0-9]+)/i)) {
            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
            if (voicechh == undefined || voicechh == null || voicechh == -1)
                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                var textchannel = vartextchannelid[voicechh];
                if (watchingmessagesuserid[voicechh] != undefined) {
                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                        matchedcontent[1] = parseInt(matchedcontent[1]);
                        matchedcontent[2] = parseInt(matchedcontent[2]);
                        if (matchedcontent[1] >= 0 && matchedcontent[1] < 100000000 && matchedcontent[2] > 1 && matchedcontent[2] < 100000000 && matchedcontent[1] < matchedcontent[2]) {
                            if (msg.channel.id == "478312979843252234") {
                                client.users.get(msg.author.id).createDM().then((dm) => {
                                    (async (msg, matchedcontent) => {
                                        await msg.author.send("Случайное число от " + matchedcontent[1] + " до " + matchedcontent[2] + ", результат: " + await randomIntFromInterval(matchedcontent[1], matchedcontent[2]))(msg, matchedcontent).catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    })(msg, matchedcontent);
                                });
                            } else(async (msg, matchedcontent) => {
                                await msg.channel.send("<@" + msg.author.id + "> Случайное число от " + matchedcontent[1] + " до " + matchedcontent[2] + ", результат: " + await randomIntFromInterval(matchedcontent[1], matchedcontent[2])).catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            })(msg, matchedcontent);
                        } else {
                            if (msg.channel.id == "478312979843252234") {
                                client.users.get(msg.author.id).createDM().then((dm) => {
                                    msg.author.send("Неверный диапазон!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            } else msg.channel.send("<@" + msg.author.id + "> Неверный диапазон!").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        }
                    } else {
                        if (msg.channel.id == "478312979843252234") {
                            client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Вы не являетесь хостом комнаты.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.channel.send("Вы не являетесь хостом комнаты.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                } else {
                    if (msg.channel.id == "478312979843252234") {
                        client.users.get(msg.author.id).createDM().then((dm) => {
                            msg.author.send("Хост комнаты не задан.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                    } else msg.channel.send("Хост комнаты не задан.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }

            } else {
                msg.author.send("Мы не смогли найти голосовуй комнату, в которой вы бы были хостом.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
        } else if (matchedcontent = msg.content.match(/^!кслучай\s*([0-9]+)/i) || msg.content.match(/^!krandom\s*([0-9]+)/i)) {
            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
            if (voicechh == undefined || voicechh == null || voicechh == -1)
                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                var textchannel = vartextchannelid[voicechh];
                if (watchingmessagesuserid[voicechh] != undefined) {
                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                        matchedcontent[1] = parseInt(matchedcontent[1]);
                        if (matchedcontent[1] > 1 && matchedcontent[1] < 1000000) {
                            if (msg.channel.id == "478312979843252234") {
                                client.users.get(msg.author.id).createDM().then((dm) => {
                                    (async (msg, matchedcontent) => {
                                        await msg.author.send("Случайное число от 1 до " + matchedcontent[1] + ", результат: " + await randomIntFromInterval(1, matchedcontent[1])).catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    })(msg, matchedcontent);
                                });
                            } else(async (msg, matchedcontent) => {
                                await msg.channel.send("<@" + msg.author.id + "> Случайное число от 1 до " + matchedcontent[1] + ", результат: " + await randomIntFromInterval(1, matchedcontent[1])).catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            })(msg, matchedcontent);
                        } else {
                            if (msg.channel.id == "478312979843252234") {
                                client.users.get(msg.author.id).createDM().then((dm) => {
                                    msg.author.send("Неверное число!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            } else msg.channel.send("<@" + msg.author.id + "> Неверное число!").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        }
                    } else {
                        if (msg.channel.id == "478312979843252234") {
                            client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Вы не являетесь хостом комнаты.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.channel.send("Вы не являетесь хостом комнаты.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                } else {
                    if (msg.channel.id == "478312979843252234") {
                        client.users.get(msg.author.id).createDM().then((dm) => {
                            msg.author.send("Хост комнаты не задан.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                    } else msg.channel.send("Хост комнаты не задан.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }

            } else {
                msg.author.send("Мы не смогли найти голосовуй комнату, в которой вы бы были хостом.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
        } else if (msg.content.match(/^!кчсини/i) || msg.content.match(/^!kblinit/i)) {
            if (msg.channel.type != "dm") {
                let voicechh = msg.member.voiceChannel;
                if (voicechh != undefined && voicechh != null && voicechh != -1) {
                    if (
                        voicechh.permissionOverwrites.get(msg.author.id) != undefined && voicechh.permissionOverwrites.get(msg.author.id).allow & Permissions.FLAGS.MANAGE_ROLES
                    ) {
                        connection.query('SELECT * FROM serverusers WHERE did=?', [msg.author.id]).then(async function ([results5, fields]) {
                            if (results5.length != 0) {
                                if (results5[0].blockedroomusers != null) {
                                    let arrayofdata = JSON.parse(results5[0].blockedroomusers);
                                    for (let item of arrayofdata) {
                                        if (client.guilds.get('286198213612929024').members.has(item)) {
                                            let tempSelection = client.guilds.get('286198213612929024').members.get(item);
                                            if (voicechh.permissionOverwrites.get(tempSelection.id) == undefined || voicechh.permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT ||
                                                (!(voicechh.permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT) && !(voicechh.permissionOverwrites.get(tempSelection.id).deny & Permissions.FLAGS.CONNECT))) {
                                                await voicechh.updateOverwrite(item, {
                                                    CONNECT: false
                                                });
                                                await client.channels.get(vartextchannelid[voicechh.id]).send("Чёрный список: Выставлен запрет на присоединение для пользователя <@" + item + ">.").catch((err) => {
                                                    if (err.code == 50007) console.log("Can't send M!");
                                                    else {
                                                        console.log(err);
                                                        process.exit(1);
                                                    }
                                                });
                                            }
                                            if (voicechh.members.has(item)) {
                                                await tempSelection.voice.setChannel("456447660531122187");
                                            }

                                        } else if (enableverb) await client.channels.get(vartextchannelid[voicechh.id]).send("Чёрный список: Пользователь <@" + item + "> покинул сервер, пропускаем.").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    }
                                }

                            }
                        });
                    } else msg.author.send("У вас отсутствует право на управление ролями, его может установить хост в настройках прав комнаты.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                } else msg.author.send("Не найден голосовой канал, в котором вы бы находились.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
                if (!msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
            } else msg.author.send("Отправьте команду через любой текстовый канал на сервере.").catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
        } else if (msg.content.match(/^!кчсудалить/i) || msg.content.match(/^!kbldelete/i)) {
            if (msg.channel.type != "dm") {
                connection.query('SELECT * FROM serverusers WHERE did=?', [msg.author.id]).then(async function ([results5, fields]) {
                    if (results5.length != 0) {
                        let tempSelection = undefined;
                        if (msg.mentions.members != undefined) {
                            let first = msg.mentions.members.first();
                            if (first != undefined)
                                tempSelection = first;
                        }
                        if (tempSelection != undefined) {
                            let todelete = msg.mentions.members.map(mem => mem.id);
                            let data = JSON.parse(results5[0].blockedroomusers);
                            /*let notfound = undefined;
                            for (let item of todelete) {
                                if (!data.includes(item)) {
                                    notfound = item;
                                    break;
                                }
                            }
                            if (notfound == undefined) {*/
                            //console.log(data.filter(x => !todelete.includes(x)));
                            if (data != null) {
                                let tosave = null;
                                let usersarray = data.filter(x => !todelete.includes(x));
                                if (usersarray.length > 0)
                                    tosave = JSON.stringify(usersarray);
                                await connection.query('UPDATE serverusers SET blockedroomusers=? WHERE did=?', [tosave, msg.author.id]);
                                // if (msg.channel.id == "478312979843252234") {
                                await client.users.get(msg.author.id).createDM().then(async (dm) => {
                                    await msg.author.send("Список обновлён.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                                // } else await msg.channel.send("Список обновлён.");

                            } else {
                                // if (msg.channel.id == "478312979843252234") {
                                await client.users.get(msg.author.id).createDM().then(async (dm) => {
                                    await msg.author.send("Список пустой.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                                // } else await msg.channel.send("Список пустой.");
                            }

                            /*  } else {
                                  if (msg.channel.id == "478312979843252234") {
                                      await client.users.get(msg.author.id).createDM().then((dm) => {
                                          msg.author.send("В чёрном списке отсутствует пользователь <@" + notfound + ">, исполнение отменено!");
                                      });
                                  } else await msg.channel.send("В чёрном списке отсутствует пользователь <@" + notfound + ">, исполнение отменено!");
                              }*/

                        } else {
                            //if (msg.channel.id == "478312979843252234") {
                            await client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Не задан пользователь!").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                            //} else await msg.channel.send("Не задан пользователь!");
                        }
                    } else {
                        // if (msg.channel.id == "478312979843252234") {
                        await client.users.get(msg.author.id).createDM().then(async (dm) => {
                            await msg.author.send("Мы не смогли найти вас в базе пользователей, пожалуйста, повторите попытку через 5 минут.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                        // } else await msg.channel.send("Мы не смогли найти вас в базе пользователей, пожалуйста, повторите попытку через 5 минут.");
                    }
                });
                if (!msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
            } else msg.author.send("Отправьте команду через любой текстовый канал на сервере.").catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
        } else if (msg.content.match(/^!кчсдобавить/i) || msg.content.match(/^!kbladd/i)) {
            if (msg.channel.type != "dm") {
                connection.query('SELECT * FROM serverusers WHERE did=?', [msg.author.id]).then(async function ([results5, fields]) {
                    if (results5.length != 0) {
                        let tempSelection = undefined;
                        if (msg.mentions.members != undefined) {
                            let first = msg.mentions.members.first();
                            if (first != undefined)
                                tempSelection = first;
                        }
                        if (tempSelection != undefined) {
                            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
                            if (voicechh == undefined || voicechh == null || voicechh == -1)
                                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
                            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                                var textchannel = vartextchannelid[voicechh];
                                if (watchingmessagesuserid[voicechh] != undefined) {
                                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                                        //console.log("good");
                                        let tempSelection = msg.mentions.members.first();
                                        if (tempSelection != undefined) {
                                            await msg.mentions.members.forEach(async (tempSelection) => {
                                                if (client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id) == undefined || client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT ||
                                                    (!(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT) && !(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).deny & Permissions.FLAGS.CONNECT))) {
                                                    client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite(tempSelection.id, {
                                                        CONNECT: false
                                                    });
                                                }
                                                if (client.guilds.get('286198213612929024').channels.get(voicechh).members.has(tempSelection.id)) {
                                                    await tempSelection.voice.setChannel("456447660531122187");
                                                }
                                                await client.guilds.get('286198213612929024').channels.get(textchannel).send("Выставлен запрет на присоединение для пользователя <@" + tempSelection.id + ">!").catch((err) => {
                                                    if (err.code == 50007) console.log("Can't send M!");
                                                    else {
                                                        console.log(err);
                                                        process.exit(1);
                                                    }
                                                });
                                            });
                                        }
                                    }
                                }
                            }
                            let todelete = msg.mentions.members.map(mem => mem.id);
                            let data = JSON.parse(results5[0].blockedroomusers);
                            let tempvar = [];
                            if (data == null) {
                                data = todelete;
                            } else {
                                for (let item of todelete) {
                                    if (!data.includes(item)) data.push(item);
                                }
                            }
                            /*let notfound = undefined;
                            for (let item of todelete) {
                                if (!data.includes(item)) {
                                    notfound = item;
                                    break;
                                }
                            }
                            if (notfound == undefined) {*/
                            let tosave = JSON.stringify(data);
                            if (tosave.length <= 64000) {
                                await connection.query('UPDATE serverusers SET blockedroomusers=? WHERE did=?', [tosave, msg.author.id]);
                                //if (msg.channel.id == "478312979843252234") {
                                await client.users.get(msg.author.id).createDM().then(async (dm) => {
                                    await msg.author.send("Список обновлён.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });

                                    // } else await msg.channel.send("Список обновлён.");
                                });
                            } else {
                                // if (msg.channel.id == "478312979843252234") {
                                await client.users.get(msg.author.id).createDM().then((dm) => {
                                    msg.author.send("Список слишком большой!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                                //} else await msg.channel.send("Список слишком большой!");
                            }

                            /*  } else {
                                  if (msg.channel.id == "478312979843252234") {
                                      await client.users.get(msg.author.id).createDM().then((dm) => {
                                          msg.author.send("В чёрном списке отсутствует пользователь <@" + notfound + ">, исполнение отменено!");
                                      });
                                  } else await msg.channel.send("В чёрном списке отсутствует пользователь <@" + notfound + ">, исполнение отменено!");
                              }*/

                        } else {
                            // if (msg.channel.id == "478312979843252234") {
                            await client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Не задан пользователь!").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                            // } else await msg.channel.send("Не задан пользователь!");
                        }
                    } else {
                        //if (msg.channel.id == "478312979843252234") {
                        await client.users.get(msg.author.id).createDM().then(async (dm) => {
                            await msg.author.send("Мы не смогли найти вас в базе пользователей, пожалуйста, повторите попытку через 5 минут.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                        //} else await msg.channel.send("Мы не смогли найти вас в базе пользователей, пожалуйста, повторите попытку через 5 минут.");
                    }
                });
                if (!msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
            } else msg.author.send("Отправьте команду через любой текстовый канал на сервере.").catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
        } else if (msg.content.match(/^!кчс.*?$/i) || msg.content.match(/^!kbl.*?$/i)) {
            if (msg.channel.type != "dm") {
                connection.query('SELECT * FROM serverusers WHERE did=?', [msg.author.id]).then(async function ([results5, fields]) {
                    if (results5.length != 0) {
                        let tempSelection = undefined;
                        if (msg.mentions.members != undefined) {
                            let first = msg.mentions.members.first();
                            if (first != undefined)
                                tempSelection = first;
                        }
                        if (tempSelection != undefined) {
                            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
                            if (voicechh == undefined || voicechh == null || voicechh == -1)
                                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
                            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                                var textchannel = vartextchannelid[voicechh];
                                if (watchingmessagesuserid[voicechh] != undefined) {
                                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                                        let tempSelection = msg.mentions.members.first();
                                        if (tempSelection != undefined) {
                                            await msg.mentions.members.forEach(async (tempSelection) => {
                                                if (client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id) == undefined || client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT ||
                                                    (!(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT) && !(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).deny & Permissions.FLAGS.CONNECT))) {
                                                    client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite(tempSelection.id, {
                                                        CONNECT: false
                                                    });
                                                }
                                                if (client.guilds.get('286198213612929024').channels.get(voicechh).members.has(tempSelection.id)) {
                                                    await tempSelection.voice.setChannel("456447660531122187");
                                                }
                                                await client.guilds.get('286198213612929024').channels.get(textchannel).send("Выставлен запрет на присоединение для пользователя <@" + tempSelection.id + ">!").catch((err) => {
                                                    if (err.code == 50007) console.log("Can't send M!");
                                                    else {
                                                        console.log(err);
                                                        process.exit(1);
                                                    }
                                                });
                                            });
                                        }
                                    }
                                }
                            }
                            let data = JSON.stringify(msg.mentions.members.map(mem => mem.id));
                            if (data.length <= 64000) {
                                await connection.query('UPDATE serverusers SET blockedroomusers=? WHERE did=?', [data, msg.author.id]);
                                //  if (msg.channel.id == "478312979843252234") {
                                await client.users.get(msg.author.id).createDM().then(async (dm) => {
                                    await msg.author.send("Список обновлён.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            } else {
                                // if (msg.channel.id == "478312979843252234") {
                                await client.users.get(msg.author.id).createDM().then((dm) => {
                                    msg.author.send("Список слишком большой!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                                // } else await msg.channel.send("Список слишком большой!");
                            }

                        } else {
                            if (msg.content.match(/^!кчс\s+null$/i) || msg.content.match(/^!kbl\s+null$/i)) {
                                await connection.query('UPDATE serverusers SET blockedroomusers=null WHERE did=?', [msg.author.id]);
                                // if (msg.channel.id == "478312979843252234") {
                                await client.users.get(msg.author.id).createDM().then(async (dm) => {
                                    await msg.author.send("Чёрный список был очищен.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                                // } else await msg.channel.send("Чёрный список был очищен.");
                            } else {
                                let datatosend = "Чёрный список:";

                                if (results5[0].blockedroomusers == null) {
                                    datatosend += "\nПуст."
                                } else {
                                    let parsedusers = JSON.parse(results5[0].blockedroomusers);
                                    for (let item of parsedusers) {
                                        datatosend += "\n<@" + item + ">";
                                    }
                                }
                                // if (msg.channel.id == "478312979843252234") {
                                await client.users.get(msg.author.id).createDM().then(async (dm) => {
                                    await msg.author.send(datatosend, {
                                        "split": true
                                    }).catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                                // } else await msg.channel.send(datatosend, {
                                //     "split": true
                                // });
                            }
                        }
                    } else {
                        // if (msg.channel.id == "478312979843252234") {
                        await client.users.get(msg.author.id).createDM().then(async (dm) => {
                            await msg.author.send("Мы не смогли найти вас в базе пользователей, пожалуйста, повторите попытку через 5 минут.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                        // } else await msg.channel.send("Мы не смогли найти вас в базе пользователей, пожалуйста, повторите попытку через 5 минут.");
                    }
                });
                if (!msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
            } else msg.author.send("Отправьте команду через любой текстовый канал на сервере.").catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
        } else if (msg.content.match(/^!кстимлоббисохранить/i) || msg.content.match(/^!ksteamlobbysave/i)) {
            if (msg.channel.type != "dm") {
                connection.query('SELECT * FROM serverusers WHERE did=?', [msg.author.id]).then(async function ([results5, fields]) {
                    if (results5.length != 0) {
                        var args = msg.content.split(/[ ]+/); // Split command into arguments
                        if (true) {
                            client.users.get(msg.author.id).createDM().then(async (dm) => {
                                let steamUserData = undefined;
                                try {
                                    steamUserData = await steamidget.getSteamUserData(dm, args[1], msg.author.id);
                                    //steamidget.sendUserEmbedMessage(msg.author, steamUserData);
                                } catch (err) {
                                    //console.log(err);
                                    switch (err.name) {
                                        case 'CUSTOMERROREMPTYSTEAMID':
                                        case 'CUSTOMERRORSTEAMAPIKEY':
                                        case 'CUSTOMERRORBOTCANNTGETSTEAMPROFILE':
                                        case 'CUSTOMERRORNOTFOUNDPROFILE':
                                            msg.author.send(err.message).catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                            break;

                                        default:
                                            msg.author.send("Возникла ошибка при получении лобби.").catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                    }
                                }
                                if (steamUserData != undefined) {
                                    await connection.query('UPDATE serverusers SET steamID64=? WHERE did=?', [steamUserData.steamID64, msg.author.id]);
                                    msg.author.send("SteamID64 " + steamUserData.steamID64 + " сохранён, используйте **!кстимлобби**").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                }

                            });
                        } else {
                            (async (msg, args) => {

                                let steamUserData = undefined;
                                try {
                                    steamUserData = await steamidget.getSteamUserData(msg, args[1], msg.author.id);


                                } catch (err) {
                                    switch (err.name) {
                                        case 'CUSTOMERROREMPTYSTEAMID':
                                        case 'CUSTOMERRORSTEAMAPIKEY':
                                        case 'CUSTOMERRORBOTCANNTGETSTEAMPROFILE':
                                        case 'CUSTOMERRORNOTFOUNDPROFILE':
                                            msg.channel.send(err.message).catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                            break;

                                        default:
                                            msg.channel.send("Возникла ошибка при получении лобби.").catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                    }

                                }
                                if (steamUserData != undefined) {
                                    await connection.query('UPDATE serverusers SET steamID64=? WHERE did=?', [steamUserData.steamID64, msg.author.id]);
                                    if (msg.channel != undefined) {
                                        msg.channel.send("SteamID64 " + steamUserData.steamID64 + " сохранён, используйте **!кстимлобби**").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                        //steamidget.sendUserEmbedMessage(msg.channel, steamUserData);
                                    }
                                }
                            })(msg, args);
                        }
                    } else {
                        // if (msg.channel.id == "478312979843252234") {
                        await client.users.get(msg.author.id).createDM().then(async (dm) => {
                            await msg.author.send("Мы не смогли найти вас в базе пользователей, пожалуйста, повторите попытку через 5 минут.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                        // } else await msg.channel.send("Мы не смогли найти вас в базе пользователей, пожалуйста, повторите попытку через 5 минут.");
                    }
                });
                if (!msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
            } else msg.author.send("Отправьте команду через любой текстовый канал на сервере.").catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
            //console.log("INFO: Received command: " + message);
            // Make command case insensitive
            /* s.getPlayerSummaries({
                 steamids: ['76561198037414410', '76561197960435530'],
                 callback: function(err, data) {
                   console.log(data);
                 }
               })*/
        } else if (msg.content.match(/^!кстимлобби/i) || msg.content.match(/^!ksteamlobby/i)) {
            var args = msg.content.split(/[ ]+/); // Split command into arguments
            if (args.length > 1) {
                if (msg.channel.id == "478312979843252234" || channelscommandsignorelist.includes(msg.channel.id)) {
                    client.users.get(msg.author.id).createDM().then(async (dm) => {
                        let steamUserData = undefined;
                        try {
                            steamUserData = await steamidget.getSteamUserData(dm, args[1], msg.author.id);
                        } catch (err) {
                            //console.log(err);
                            switch (err.name) {
                                case 'CUSTOMERROREMPTYSTEAMID':
                                case 'CUSTOMERRORSTEAMAPIKEY':
                                case 'CUSTOMERRORBOTCANNTGETSTEAMPROFILE':
                                case 'CUSTOMERRORNOTFOUNDPROFILE':
                                    client.users.get(msg.author.id).createDM().then(async (dm) => {
                                        await msg.author.send(err.message).catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    });
                                    break;

                                default:
                                    client.users.get(msg.author.id).createDM().then(async (dm) => {
                                        await msg.author.send("Возникла ошибка при получении лобби.").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    });
                            }
                        }
                        //console.log(steamUserData);
                        if (steamUserData != undefined) {

                            steamidget.sendUserEmbedMessage(msg.author, steamUserData);
                        }

                    });
                } else {
                    (async (msg, args) => {
                        let steamUserData = undefined;
                        try {
                            steamUserData = await steamidget.getSteamUserData(msg, args[1], msg.author.id);

                        } catch (err) {
                            switch (err.name) {
                                case 'CUSTOMERROREMPTYSTEAMID':
                                case 'CUSTOMERRORSTEAMAPIKEY':
                                case 'CUSTOMERRORBOTCANNTGETSTEAMPROFILE':
                                case 'CUSTOMERRORNOTFOUNDPROFILE':
                                    msg.channel.send(err.message).catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    break;

                                default:
                                    msg.channel.send("Возникла ошибка при получении лобби.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                            }


                        }
                        //console.log(steamUserData);
                        if (msg.channel != undefined && steamUserData != undefined) {

                            steamidget.sendUserEmbedMessage(msg.channel, steamUserData);
                        }
                    })(msg, args);
                }
            } else {
                connection.query('SELECT * FROM serverusers WHERE did=?', [msg.author.id]).then(async function ([results5, fields]) {
                    if (results5.length != 0) {
                        if (results5[0].steamID64 != null) {
                            if (msg.channel.id == "478312979843252234" || channelscommandsignorelist.includes(msg.channel.id)) {
                                client.users.get(msg.author.id).createDM().then(async (dm) => {
                                    let steamUserData = undefined;
                                    try {
                                        steamUserData = await steamidget.getSteamUserData(dm, results5[0].steamID64, msg.author.id);

                                    } catch (err) {
                                        //console.log(err);
                                        switch (err.name) {
                                            case 'CUSTOMERROREMPTYSTEAMID':
                                            case 'CUSTOMERRORSTEAMAPIKEY':
                                            case 'CUSTOMERRORBOTCANNTGETSTEAMPROFILE':
                                            case 'CUSTOMERRORNOTFOUNDPROFILE':
                                                client.users.get(msg.author.id).createDM().then(async (dm) => {
                                                    await msg.author.send(err.message).catch((err) => {
                                                        if (err.code == 50007) console.log("Can't send M!");
                                                        else {
                                                            console.log(err);
                                                            process.exit(1);
                                                        }
                                                    });
                                                });
                                                break;

                                            default:
                                                client.users.get(msg.author.id).createDM().then(async (dm) => {
                                                    await msg.author.send("Возникла ошибка при получении лобби.").catch((err) => {
                                                        if (err.code == 50007) console.log("Can't send M!");
                                                        else {
                                                            console.log(err);
                                                            process.exit(1);
                                                        }
                                                    });
                                                });
                                        }
                                    }
                                    if (steamUserData != undefined) {

                                        steamidget.sendUserEmbedMessage(msg.author, steamUserData);
                                    }


                                });
                            } else {
                                (async (msg, args) => {
                                    let steamUserData = undefined;
                                    try {
                                        steamUserData = await steamidget.getSteamUserData(msg, results5[0].steamID64, msg.author.id);


                                    } catch (err) {
                                        switch (err.name) {
                                            case 'CUSTOMERROREMPTYSTEAMID':
                                            case 'CUSTOMERRORSTEAMAPIKEY':
                                            case 'CUSTOMERRORBOTCANNTGETSTEAMPROFILE':
                                            case 'CUSTOMERRORNOTFOUNDPROFILE':
                                                msg.channel.send(err.message).catch((err) => {
                                                    if (err.code == 50007) console.log("Can't send M!");
                                                    else {
                                                        console.log(err);
                                                        process.exit(1);
                                                    }
                                                });
                                                break;

                                            default:
                                                msg.channel.send("Возникла ошибка при получении лобби.").catch((err) => {
                                                    if (err.code == 50007) console.log("Can't send M!");
                                                    else {
                                                        console.log(err);
                                                        process.exit(1);
                                                    }
                                                });
                                        }

                                    }
                                    if (msg.channel != undefined && steamUserData != undefined) {

                                        steamidget.sendUserEmbedMessage(msg.channel, steamUserData);
                                    }
                                })(msg, args);
                            }
                        } else {
                            await client.users.get(msg.author.id).createDM().then(async (dm) => {
                                await msg.author.send("У вас нет сохранённого SteamID64, используйте **!кстимлоббисохранить [ССЫЛКА НА ПРОФИЛЬ СТИМ]**").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        }
                    } else {
                        // if (msg.channel.id == "478312979843252234") {
                        await client.users.get(msg.author.id).createDM().then(async (dm) => {
                            await msg.author.send("Мы не смогли найти вас в базе пользователей, пожалуйста, повторите попытку через 5 минут.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                        // } else await msg.channel.send("Мы не смогли найти вас в базе пользователей, пожалуйста, повторите попытку через 5 минут.");
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
            //console.log("INFO: Received command: " + message);
            // Make command case insensitive
            /* s.getPlayerSummaries({
                 steamids: ['76561198037414410', '76561197960435530'],
                 callback: function(err, data) {
                   console.log(data);
                 }
               })*/
        } else if (msg.content.match(/^!кзапретновых/i) || msg.content.match(/^!kpreventjoin/i)) {
            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
            if (voicechh == undefined || voicechh == null || voicechh == -1)
                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                var textchannel = vartextchannelid[voicechh];
                if (watchingmessagesuserid[voicechh] != undefined) {
                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                        if (
                            client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get("500580990805213194") == undefined || client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get("500580990805213194").allow & Permissions.FLAGS.CONNECT ||
                            (!(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get("500580990805213194").allow & Permissions.FLAGS.CONNECT) && !(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get("500580990805213194").deny & Permissions.FLAGS.CONNECT))
                        ) {
                            client.guilds.get('286198213612929024').channels.get(voicechh).members.forEach(async (entry) => {
                                if (client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(entry.id) == undefined || !(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.CONNECT))
                                    await client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite(entry.id, {
                                        CONNECT: true
                                    });
                            });
                            client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite("500580990805213194", {
                                CONNECT: false
                            });
                            client.guilds.get('286198213612929024').channels.get(textchannel).send("Всем пользователям в голосовой комнате, у которых нет запрета на подключение в правах, было выдано право подключения, у роли 'Настольные игры' оно было отобрано.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        } else {
                            client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite("500580990805213194", {
                                CONNECT: null
                            });
                            client.guilds.get('286198213612929024').channels.get(textchannel).send("Для роли 'Настольные игры' было выставлено право присоединения в положение 'Неопределено'.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        }
                    } else {
                        if (msg.channel.id == "478312979843252234") {
                            client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Вы не являетесь хостом комнаты.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.channel.send("Вы не являетесь хостом комнаты.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                } else {
                    if (msg.channel.id == "478312979843252234") {
                        client.users.get(msg.author.id).createDM().then((dm) => {
                            msg.author.send("Хост комнаты не задан.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                    } else msg.channel.send("Хост комнаты не задан.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }

            } else {
                msg.author.send("Мы не смогли найти голосовуй комнату, в которой вы бы были хостом.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
        } else if (msg.content.match(/^!кмутновых/i) || msg.content.match(/^!kmutenew/i)) {
            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
            if (voicechh == undefined || voicechh == null || voicechh == -1)
                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                var textchannel = vartextchannelid[voicechh];
                if (watchingmessagesuserid[voicechh] != undefined) {
                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                        if (
                            client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get("500580990805213194") == undefined || client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get("500580990805213194").allow & Permissions.FLAGS.SPEAK ||
                            (!(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get("500580990805213194").allow & Permissions.FLAGS.SPEAK) && !(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get("500580990805213194").deny & Permissions.FLAGS.SPEAK))
                        ) {
                            client.guilds.get('286198213612929024').channels.get(voicechh).members.forEach(async (entry) => {
                                if (client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(entry.id) == undefined || !(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.SPEAK))
                                    await client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite(entry.id, {
                                        SPEAK: true
                                    });
                            });
                            client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite("500580990805213194", {
                                SPEAK: false
                            });
                            client.guilds.get('286198213612929024').channels.get(textchannel).send("Всем пользователям в голосовой комнате, у которых не был отключен микрофон через права, было выдано право говорить, у роли 'Настольные игры' оно было отобрано.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        } else {
                            client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite("500580990805213194", {
                                SPEAK: null
                            });
                            client.guilds.get('286198213612929024').channels.get(textchannel).send("Для роли 'Настольные игры' было выставлено право говорить в положение 'Неопределено'.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        }
                    } else {
                        if (msg.channel.id == "478312979843252234") {
                            client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Вы не являетесь хостом комнаты.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.channel.send("Вы не являетесь хостом комнаты.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                } else {
                    if (msg.channel.id == "478312979843252234") {
                        client.users.get(msg.author.id).createDM().then((dm) => {
                            msg.author.send("Хост комнаты не задан.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                    } else msg.channel.send("Хост комнаты не задан.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }

            } else {
                msg.author.send("Мы не смогли найти голосовуй комнату, в которой вы бы были хостом.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
        } else if (msg.content.match(/^!ккик/i) || msg.content.match(/^!kkick/i)) {
            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
            if (voicechh == undefined || voicechh == null || voicechh == -1)
                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                var textchannel = vartextchannelid[voicechh];
                if (watchingmessagesuserid[voicechh] != undefined) {
                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                        let tempSelection = msg.mentions.members.first();
                        if (tempSelection != undefined) {
                            msg.mentions.members.forEach((tempSelection) => {
                                if (client.guilds.get('286198213612929024').channels.get(voicechh).members.has(tempSelection.id)) {
                                    tempSelection.voice.setChannel("456447660531122187");
                                    client.guilds.get('286198213612929024').channels.get(textchannel).send("Пользователь <@" + tempSelection.id + "> был кикнут!");
                                } else {
                                    if (msg.channel.id == "478312979843252234") {
                                        client.users.get(msg.author.id).createDM().then((dm) => {
                                            msg.author.send("Пользователь <@" + tempSelection.id + "> не находится в голосовой комнате!").catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                        });
                                    } else msg.channel.send("Пользователь <@" + tempSelection.id + "> не находится в голосовой комнате!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                }
                            });
                        } else {
                            if (msg.channel.id == "478312979843252234") {
                                client.users.get(msg.author.id).createDM().then((dm) => {
                                    msg.author.send("Не задан пользователь!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            } else msg.channel.send("Не задан пользователь!").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        }
                    } else {
                        if (msg.channel.id == "478312979843252234") {
                            client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Вы не являетесь хостом комнаты.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.channel.send("Вы не являетесь хостом комнаты.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                } else {
                    if (msg.channel.id == "478312979843252234") {
                        client.users.get(msg.author.id).createDM().then((dm) => {
                            msg.author.send("Хост комнаты не задан.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                    } else msg.channel.send("Хост комнаты не задан.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }

            } else {
                msg.author.send("Мы не смогли найти голосовуй комнату, в которой вы бы были хостом.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
        } else if (msg.content.match(/^!кбан/i) || msg.content.match(/^!kban/i)) {
            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
            if (voicechh == undefined || voicechh == null || voicechh == -1)
                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                var textchannel = vartextchannelid[voicechh];
                if (watchingmessagesuserid[voicechh] != undefined) {
                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                        let tempSelection = msg.mentions.members.first();
                        if (tempSelection != undefined) {
                            msg.mentions.members.forEach((tempSelection) => {
                                if (client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id) == undefined || client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT ||
                                    (!(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT) && !(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).deny & Permissions.FLAGS.CONNECT))) {
                                    if (client.guilds.get('286198213612929024').channels.get(voicechh).members.has(tempSelection.id)) {
                                        tempSelection.voice.setChannel("456447660531122187");
                                    }
                                    client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite(tempSelection.id, {
                                        CONNECT: false
                                    }).then(() => {
                                        client.guilds.get('286198213612929024').channels.get(textchannel).send("Выставлен запрет на присоединение для пользователя <@" + tempSelection.id + ">!").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    });
                                } else
                                    client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite(tempSelection.id, {
                                        CONNECT: true
                                    }).then(() => {
                                        client.guilds.get('286198213612929024').channels.get(textchannel).send("Пользователю <@" + tempSelection.id + "> теперь разрешено использовать комнату!").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    });
                            });
                        } else {
                            if (msg.channel.id == "478312979843252234") {
                                client.users.get(msg.author.id).createDM().then((dm) => {
                                    msg.author.send("Не задан пользователь!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            } else msg.channel.send("Не задан пользователь!").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        }
                    } else {
                        if (msg.channel.id == "478312979843252234") {
                            client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Вы не являетесь хостом комнаты.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.channel.send("Вы не являетесь хостом комнаты.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                } else {
                    if (msg.channel.id == "478312979843252234") {
                        client.users.get(msg.author.id).createDM().then((dm) => {
                            msg.author.send("Хост комнаты не задан.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                    } else msg.channel.send("Хост комнаты не задан.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }

            } else {
                msg.author.send("Мы не смогли найти голосовуй комнату, в которой вы бы были хостом.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
        } else if (msg.content.match(/^!кредн/i) || msg.content.match(/^!keditn/i)) {
            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
            if (voicechh == undefined || voicechh == null || voicechh == -1)
                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                var textchannel = vartextchannelid[voicechh];
                if (watchingmessagesuserid[voicechh] != undefined) {
                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                        let tempSelection = msg.mentions.members.first();
                        if (tempSelection != undefined) {
                            msg.mentions.members.forEach((tempSelection) => {
                                if (
                                    (client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id) != undefined && client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.MANAGE_CHANNELS) ||
                                    (client.guilds.get('286198213612929024').channels.get(textchannel).permissionOverwrites.get(tempSelection.id) != undefined && client.guilds.get('286198213612929024').channels.get(textchannel).permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.MANAGE_CHANNELS) ||
                                    (client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id) != undefined && client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.MANAGE_ROLES) ||
                                    (client.guilds.get('286198213612929024').channels.get(textchannel).permissionOverwrites.get(tempSelection.id) != undefined && client.guilds.get('286198213612929024').channels.get(textchannel).permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.MANAGE_ROLES)
                                ) {
                                    client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite(tempSelection.id, {
                                        MANAGE_CHANNELS: false,
                                        MANAGE_ROLES: false
                                    });
                                    client.guilds.get('286198213612929024').channels.get(textchannel).updateOverwrite(tempSelection.id, {
                                        MANAGE_CHANNELS: false,
                                        MANAGE_ROLES: false
                                    });
                                    client.guilds.get('286198213612929024').channels.get(textchannel).send("Выставлен запрет на редактирование комнат для пользователя <@" + tempSelection.id + ">!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                } else {

                                    client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite(tempSelection.id, {
                                        MANAGE_CHANNELS: true,
                                        MANAGE_ROLES: true
                                    });
                                    client.guilds.get('286198213612929024').channels.get(textchannel).updateOverwrite(tempSelection.id, {
                                        MANAGE_CHANNELS: true,
                                        MANAGE_ROLES: true
                                    });

                                    client.guilds.get('286198213612929024').channels.get(textchannel).send("Пользователю <@" + tempSelection.id + "> теперь разрешено редактировать голосовую и текстовую комнату!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });

                                }
                            });
                        } else {
                            if (msg.channel.id == "478312979843252234") {
                                client.users.get(msg.author.id).createDM().then((dm) => {
                                    msg.author.send("Не задан пользователь!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            } else msg.channel.send("Не задан пользователь!").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        }
                    } else {
                        if (msg.channel.id == "478312979843252234") {
                            client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Вы не являетесь хостом комнаты.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.channel.send("Вы не являетесь хостом комнаты.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                } else {
                    if (msg.channel.id == "478312979843252234") {
                        client.users.get(msg.author.id).createDM().then((dm) => {
                            msg.author.send("Хост комнаты не задан.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                    } else msg.channel.send("Хост комнаты не задан.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }

            } else {
                msg.author.send("Мы не смогли найти голосовуй комнату, в которой вы бы были хостом.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
        } else if (msg.content.match(/^!кмут/i) || msg.content.match(/^!kmute/i)) {
            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
            if (voicechh == undefined || voicechh == null || voicechh == -1)
                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                var textchannel = vartextchannelid[voicechh];
                if (watchingmessagesuserid[voicechh] != undefined) {
                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                        let tempSelection = msg.mentions.members.first();
                        if (tempSelection != undefined) {
                            msg.mentions.members.forEach((tempSelection) => {
                                if (client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id) == undefined || client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.SPEAK ||
                                    (!(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.SPEAK) && !(client.guilds.get('286198213612929024').channels.get(voicechh).permissionOverwrites.get(tempSelection.id).deny & Permissions.FLAGS.SPEAK)))
                                    client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite(tempSelection.id, {
                                        SPEAK: false
                                    }).then(() => {
                                        if (client.guilds.get('286198213612929024').channels.get(voicechh).members.has(tempSelection.id)) {
                                            tempSelection.voice.setChannel("456447660531122187").then(() => {
                                                tempSelection.voice.setChannel(voicechh);
                                            });
                                        }
                                        client.guilds.get('286198213612929024').channels.get(textchannel).send("Выставлен запрет на голосовой чат для пользователя <@" + tempSelection.id + ">!").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    });
                                else {

                                    client.guilds.get('286198213612929024').channels.get(voicechh).updateOverwrite(tempSelection.id, {
                                        SPEAK: true
                                    }).then(() => {
                                        if (client.guilds.get('286198213612929024').channels.get(voicechh).members.has(tempSelection.id)) {
                                            tempSelection.voice.setChannel("456447660531122187").then(() => {
                                                tempSelection.voice.setChannel(voicechh);
                                            });
                                        }
                                        client.guilds.get('286198213612929024').channels.get(textchannel).send("Пользователю <@" + tempSelection.id + "> теперь разрешено использовать голосовой чат в комнате!").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    });
                                }
                            });
                        } else {
                            if (msg.channel.id == "478312979843252234") {
                                client.users.get(msg.author.id).createDM().then((dm) => {
                                    msg.author.send("Не задан пользователь!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            } else msg.channel.send("Не задан пользователь!").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        }
                    } else {
                        if (msg.channel.id == "478312979843252234") {
                            client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Вы не являетесь хостом комнаты.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.channel.send("Вы не являетесь хостом комнаты.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                } else {
                    if (msg.channel.id == "478312979843252234") {
                        client.users.get(msg.author.id).createDM().then((dm) => {
                            msg.author.send("Хост комнаты не задан.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                    } else msg.channel.send("Хост комнаты не задан.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }

            } else {
                msg.author.send("Мы не смогли найти голосовуй комнату, в которой вы бы были хостом.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
        } else if (msg.content.match(/^!кпередатьхоста/i) || msg.content.match(/^!ktransferhost/i)) {
            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
            if (voicechh == undefined || voicechh == null || voicechh == -1)
                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                let textchannel = vartextchannelid[voicechh];
                if (watchingmessagesuserid[voicechh] != undefined) {
                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                        let ourchannel = client.guilds.get('286198213612929024').channels.get(voicechh);
                        let tempSelection = msg.mentions.members.first();
                        if (tempSelection != undefined && tempSelection.id != watchingmessagesuserid[voicechh]) {
                            if (ourchannel.members.has(tempSelection.id)) {
                                if (!pendingresetroom.includes(ourchannel.id)) {
                                    pendingresetroom.push(ourchannel.id);
                                    let userid = tempSelection.id;
                                    (async (ourchannel, userid, voicechh, textchannel, tempSelection) => {
                                        await cleanoldmessages(client.channels.get(vartextchannelid[ourchannel.id]));
                                        let constmessage = await client.channels.get(vartextchannelid[ourchannel.id]).send({
                                            reply: tempSelection.id,
                                            embed: {
                                                color: 7823103,
                                                /*author: {
                                                    name: tempSelection.displayName.substring(0, 100),
                                                    icon_url: tempSelection.user.displayAvatarURL
                                                },*/
                                                title: "Новый хост комнаты.",
                                                description: "Текущее состояние игры - \\⏳ (Набор игроков).\n Чтобы изменить статус на \\🎲 (Идёт игра) или \"перерыв\" (\\💤), кликни по соответствующему эмодзи внизу этого сообщения.\n Используйте 🔒, чтобы установить лимит равный количеству игроков в голосовой комнате. Снятие эмодзи уберёт лимит комнаты.\n Используйте \\😈 в объявлении, чтобы обозначить использование мата и контента нарушающего рамки приличия в голосовой и текстовой комнате.",
                                                timestamp: new Date(),
                                                footer: {
                                                    text: tempSelection.id
                                                }
                                            }
                                        }).catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log("Send Error");
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                        console.log("1HOST MESSAGE:" + ourchannel.name + " ID:" + constmessage.id);

                                        let olduser = watchingmessagesuserid[voicechh];
                                        watchingmessagesserverid[voicechh] = constmessage.channel.id;
                                        watchingmessagesmessageid[voicechh] = constmessage.id;
                                        watchingmessagesuserid[voicechh] = tempSelection.id;
                                        try {
                                            await constmessage.react("516658670524956692");
                                            await constmessage.react("🎲");
                                            await constmessage.react("💤");
                                            await constmessage.react("🔒");
                                        } catch (err) {
                                            if (err.code != 10008) {
                                                console.log("emojissenderror");
                                                process.exit(1);
                                            } else {
                                                console.log("emojissenderroropen");
                                                console.log(err);
                                            }
                                        }

                                        if (rpgvar.includes(ourchannel.id)) {
                                            await Promise.all(ourchannel.permissionOverwrites.filter(role => role.id == olduser).map(function (ch) {
                                                return ch.delete();
                                            })).catch(async function (reason) {
                                                console.log("ERROR1:" + reason);
                                                if (reason.code != 10008 && reason.code != 10003) {
                                                    console.log("Emoji message get error.");
                                                    console.log(reason);
                                                    process.exit(1);
                                                }
                                            });
                                            await Promise.all(client.channels.get(vartextchannelid[ourchannel.id]).permissionOverwrites.filter(role => role.id == olduser).map(function (ch) {
                                                return ch.delete();
                                            })).catch(async function (reason) {
                                                console.log("ERROR1:" + reason);
                                                if (reason.code != 10008 && reason.code != 10003) {
                                                    console.log("Emoji message get error.");
                                                    console.log(reason);
                                                    process.exit(1);
                                                }
                                            });
                                            await setuppermrpg(ourchannel);
                                            await ourchannel.updateOverwrite(userid, {
                                                MANAGE_CHANNELS: true,
                                                MANAGE_WEBHOOKS: false,
                                                CREATE_INSTANT_INVITE: true,
                                                MANAGE_ROLES: true,
                                                CONNECT: true,
                                                VIEW_CHANNEL: true,
                                                SPEAK: true,
                                                USE_VAD: true,
                                                MOVE_MEMBERS: true,
                                                DEAFEN_MEMBERS: false,
                                                MUTE_MEMBERS: false,
                                                PRIORITY_SPEAKER: true
                                            });
                                            let mychannel = ourchannel;
                                            if (channelsvar.includes(mychannel.id)) {
                                                if (mychannel.permissionOverwrites.get('500580990805213194') != undefined) //НИ
                                                    if (!(mychannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                                        await mychannel.updateOverwrite('500580990805213194', {
                                                            MANAGE_CHANNELS: false
                                                        });
                                                        console.log("initclosedelperm:" + mychannel.name);
                                                    }
                                            } else if (coopvar.includes(mychannel.id)) {
                                                //var mychannel = ourchannel;
                                                if (!(mychannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                                    await mychannel.updateOverwrite('363054008564449281', {
                                                        MANAGE_CHANNELS: false
                                                    });
                                                    //console.log("closeperm:" + c);
                                                }
                                            } else if (rpgvar.includes(mychannel.id)) {
                                                //var mychannel = ourchannel;
                                                if (!(mychannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                                    await mychannel.updateOverwrite('381076993384382464', {
                                                        MANAGE_CHANNELS: false
                                                    });
                                                    //console.log("closeperm:" + c);
                                                }
                                            }
                                            await client.channels.get(vartextchannelid[ourchannel.id]).updateOverwrite(userid, {
                                                CREATE_INSTANT_INVITE: true,
                                                MANAGE_CHANNELS: true,
                                                MANAGE_WEBHOOKS: false,
                                                MANAGE_ROLES: true,
                                                VIEW_CHANNEL: true,
                                                SEND_MESSAGES: true,
                                                SEND_TTS_MESSAGES: true,
                                                MANAGE_MESSAGES: true,
                                                EMBED_LINKS: true,
                                                ATTACH_FILES: true,
                                                READ_MESSAGE_HISTORY: true,
                                                MENTION_EVERYONE: true,
                                                USE_EXTERNAL_EMOJIS: true,
                                                ADD_REACTIONS: true
                                            });
                                            if (pendingresetroom.includes(ourchannel.id))
                                                pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));

                                        } else if (channelsvar.includes(ourchannel.id)) {
                                            await Promise.all(ourchannel.permissionOverwrites.filter(role => role.id == olduser).map(function (ch) {
                                                return ch.delete();
                                            })).catch(async function (reason) {
                                                console.log("ERROR1:" + reason);
                                                if (reason.code != 10008 && reason.code != 10003) {
                                                    console.log("Emoji message get error.");
                                                    console.log(reason);
                                                    process.exit(1);
                                                }
                                            });
                                            await Promise.all(client.channels.get(vartextchannelid[ourchannel.id]).permissionOverwrites.filter(role => role.id == olduser).map(function (ch) {
                                                return ch.delete();
                                            })).catch(async function (reason) {
                                                console.log("ERROR1:" + reason);
                                                if (reason.code != 10008 && reason.code != 10003) {
                                                    console.log("Emoji message get error.");
                                                    console.log(reason);
                                                    process.exit(1);
                                                }
                                            });
                                            await setuppermchannelsvar(ourchannel);
                                            await ourchannel.updateOverwrite(userid, {
                                                MANAGE_CHANNELS: true,
                                                MANAGE_WEBHOOKS: false,
                                                CREATE_INSTANT_INVITE: true,
                                                MANAGE_ROLES: true,
                                                CONNECT: true,
                                                VIEW_CHANNEL: true,
                                                SPEAK: true,
                                                USE_VAD: true,
                                                MOVE_MEMBERS: true,
                                                DEAFEN_MEMBERS: false,
                                                MUTE_MEMBERS: false,
                                                PRIORITY_SPEAKER: true
                                            });
                                            let mychannel = ourchannel;
                                            if (channelsvar.includes(mychannel.id)) {
                                                if (mychannel.permissionOverwrites.get('500580990805213194') != undefined) //НИ
                                                    if (!(mychannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                                        await mychannel.updateOverwrite('500580990805213194', {
                                                            MANAGE_CHANNELS: false
                                                        });
                                                        console.log("initclosedelperm:" + mychannel.name);
                                                    }

                                            } else if (coopvar.includes(mychannel.id)) {
                                                //var mychannel = ourchannel;
                                                if (!(mychannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                                    await mychannel.updateOverwrite('363054008564449281', {
                                                        MANAGE_CHANNELS: false
                                                    });
                                                    //console.log("closeperm:" + c);
                                                }
                                            } else if (rpgvar.includes(mychannel.id)) {
                                                // var mychannel = ourchannel;
                                                if (!(mychannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                                    await mychannel.updateOverwrite('381076993384382464', {
                                                        MANAGE_CHANNELS: false
                                                    });
                                                    //console.log("closeperm:" + c);
                                                }
                                            }
                                            await client.channels.get(vartextchannelid[ourchannel.id]).updateOverwrite(userid, {
                                                CREATE_INSTANT_INVITE: true,
                                                MANAGE_CHANNELS: true,
                                                MANAGE_WEBHOOKS: false,
                                                MANAGE_ROLES: true,
                                                VIEW_CHANNEL: true,
                                                SEND_MESSAGES: true,
                                                SEND_TTS_MESSAGES: true,
                                                MANAGE_MESSAGES: true,
                                                EMBED_LINKS: true,
                                                ATTACH_FILES: true,
                                                READ_MESSAGE_HISTORY: true,
                                                MENTION_EVERYONE: true,
                                                USE_EXTERNAL_EMOJIS: true,
                                                ADD_REACTIONS: true
                                            });
                                            if (pendingresetroom.includes(ourchannel.id))
                                                pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));

                                        } else if (coopvar.includes(ourchannel.id)) {
                                            await Promise.all(ourchannel.permissionOverwrites.filter(role => role.id == olduser).map(function (ch) {
                                                return ch.delete();
                                            })).catch(async function (reason) {
                                                console.log("ERROR1:" + reason);
                                                if (reason.code != 10008 && reason.code != 10003) {
                                                    console.log("Emoji message get error.");
                                                    console.log(reason);
                                                    process.exit(1);
                                                }
                                            });
                                            await Promise.all(client.channels.get(vartextchannelid[ourchannel.id]).permissionOverwrites.filter(role => role.id == olduser).map(function (ch) {
                                                return ch.delete();
                                            })).catch(async function (reason) {
                                                console.log("ERROR1:" + reason);
                                                if (reason.code != 10008 && reason.code != 10003) {
                                                    console.log("Emoji message get error.");
                                                    console.log(reason);
                                                    process.exit(1);
                                                }
                                            });
                                            await setuppermcoop(ourchannel);
                                            await ourchannel.updateOverwrite(userid, {
                                                MANAGE_CHANNELS: true,
                                                MANAGE_WEBHOOKS: false,
                                                CREATE_INSTANT_INVITE: true,
                                                MANAGE_ROLES: true,
                                                CONNECT: true,
                                                VIEW_CHANNEL: true,
                                                SPEAK: true,
                                                USE_VAD: true,
                                                MOVE_MEMBERS: true,
                                                DEAFEN_MEMBERS: false,
                                                MUTE_MEMBERS: false,
                                                PRIORITY_SPEAKER: true
                                            });
                                            let mychannel = ourchannel;
                                            if (channelsvar.includes(mychannel.id)) {
                                                if (mychannel.permissionOverwrites.get('500580990805213194') != undefined) //НИ
                                                    if (!(mychannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                                        await mychannel.updateOverwrite('500580990805213194', {
                                                            MANAGE_CHANNELS: false
                                                        });
                                                        console.log("initclosedelperm:" + mychannel.name);
                                                    }
                                            } else if (coopvar.includes(mychannel.id)) {
                                                //var mychannel = ourchannel;
                                                if (!(mychannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                                    await mychannel.updateOverwrite('363054008564449281', {
                                                        MANAGE_CHANNELS: false
                                                    });
                                                    //console.log("closeperm:" + c);
                                                }
                                            } else if (rpgvar.includes(mychannel.id)) {
                                                //var mychannel = ourchannel;
                                                if (!(mychannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                                    await mychannel.updateOverwrite('381076993384382464', {
                                                        MANAGE_CHANNELS: false
                                                    });
                                                    //console.log("closeperm:" + c);
                                                }
                                            }
                                            await client.channels.get(vartextchannelid[ourchannel.id]).updateOverwrite(userid, {
                                                CREATE_INSTANT_INVITE: true,
                                                MANAGE_CHANNELS: true,
                                                MANAGE_WEBHOOKS: false,
                                                MANAGE_ROLES: true,
                                                VIEW_CHANNEL: true,
                                                SEND_MESSAGES: true,
                                                SEND_TTS_MESSAGES: true,
                                                MANAGE_MESSAGES: true,
                                                EMBED_LINKS: true,
                                                ATTACH_FILES: true,
                                                READ_MESSAGE_HISTORY: true,
                                                MENTION_EVERYONE: true,
                                                USE_EXTERNAL_EMOJIS: true,
                                                ADD_REACTIONS: true
                                            });
                                            if (pendingresetroom.includes(ourchannel.id))
                                                pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));
                                        } else {
                                            if (pendingresetroom.includes(ourchannel.id))
                                                pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));
                                        }

                                        var messageid = 0;
                                        var serverid = 0;
                                        /* await tempSelection.send('```fix\nВы стали хостом.\n Текущее состояние игры - \⏳ (Набор игроков).\n Чтобы изменить статус на \🎲 (Идёт игра) или "перерыв" (\💤), кликни по соответствующему эмодзи внизу этого сообщения.\n Используйте 🔒, чтобы установить лимит равный количеству игроков в голосовой комнате. Снятие эмодзи уберёт лимит комнаты.\n Используйте \😈 в объявлении, чтобы обозначить использование мата в голосовой комнате, возможно установить только до выставления статуса "Идёт игра".\n```').then(async (msg) => {
                                             await msg.react("516658670524956692");
                                             await msg.react("🎲");
                                             await msg.react("💤");
                                             await msg.react("🔒");
                                            // serverid = msg.channel.id;
                                           //  messageid = msg.id;
                                         });*/
                                        console.log("updatehosttransfer:" + newChannel.name);
                                        await connection.query('UPDATE rememberedgamenames SET userid=?,messageid=?,messageserverid=?,rage=0 WHERE roomid=?', [tempSelection.id, constmessage.id, constmessage.channel.id, voicechh]);
                                        let [results5, fields] = await connection.query('SELECT * FROM serverusers WHERE did=?', [tempSelection.id]);
                                        if (results5.length != 0) {
                                            if (results5[0].blockedroomusers != null) {
                                                let arrayofdata = JSON.parse(results5[0].blockedroomusers);
                                                for (let item of arrayofdata) {
                                                    if (client.guilds.get('286198213612929024').members.has(item)) {
                                                        let tempSelection = client.guilds.get('286198213612929024').members.get(item);
                                                        if (ourchannel.permissionOverwrites.get(tempSelection.id) == undefined || ourchannel.permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT ||
                                                            (!(ourchannel.permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT) && !(ourchannel.permissionOverwrites.get(tempSelection.id).deny & Permissions.FLAGS.CONNECT))) {
                                                            await ourchannel.updateOverwrite(item, {
                                                                CONNECT: false
                                                            });
                                                            await client.channels.get(vartextchannelid[ourchannel.id]).send("Чёрный список: Выставлен запрет на присоединение для пользователя <@" + item + ">.").catch((err) => {
                                                                if (err.code == 50007) console.log("Can't send M!");
                                                                else {
                                                                    console.log(err);
                                                                    process.exit(1);
                                                                }
                                                            });
                                                        }
                                                        if (ourchannel.members.has(item)) {
                                                            await tempSelection.voice.setChannel("456447660531122187");
                                                        }

                                                    } else if (enableverb) await client.channels.get(vartextchannelid[ourchannel.id]).send("Чёрный список: Пользователь <@" + item + "> покинул сервер, пропускаем.").catch((err) => {
                                                        if (err.code == 50007) console.log("Can't send M!");
                                                        else {
                                                            console.log(err);
                                                            process.exit(1);
                                                        }
                                                    });
                                                }
                                            }

                                        }

                                        if (activegamesroomsid.includes(voicechh))
                                            activegamesroomsid = removealt(activegamesroomsid, activegamesroomsid.indexOf(voicechh));
                                        if (waitgamesroomsid.includes(voicechh))
                                            waitgamesroomsid = removealt(waitgamesroomsid, waitgamesroomsid.indexOf(voicechh));
                                        if (rageroomsid.includes(voicechh))
                                            rageroomsid = removealt(rageroomsid, rageroomsid.indexOf(voicechh));

                                        await checkforemoji(voicechh);
                                        if (ourchannel.members.size == 0 //|| !ourchannel.members.has(tempSelection.id) || watchingmessagesuserid[ourchannel.id] == undefined
                                        ) {
                                            console.log("startexec44");
                                            if (firstimeroomsetup.includes(ourchannel.id))
                                                firstimeroomsetup = removealt(firstimeroomsetup, firstimeroomsetup.indexOf(ourchannel.id));
                                        }
                                    })(ourchannel, userid, voicechh, textchannel, tempSelection);
                                } else {
                                    if (msg.channel.id == "478312979843252234") {
                                        client.users.get(msg.author.id).createDM().then((dm) => {
                                            msg.author.send("Комната в процессе инициализации, попробуйте позднее.").catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                        });
                                    } else msg.channel.send("Комната в процессе инициализации, попробуйте позднее.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                }
                            } else {
                                if (msg.channel.id == "478312979843252234") {
                                    client.users.get(msg.author.id).createDM().then((dm) => {
                                        msg.author.send("Пользователь должен находиться в голосовой комнате!").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    });
                                } else msg.channel.send("Пользователь должен находиться в голосовой комнате!").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            }
                        }
                    } else {
                        if (msg.channel.id == "478312979843252234") {
                            client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Вы не являетесь хостом комнаты.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.channel.send("Вы не являетесь хостом комнаты.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                } else {
                    if (msg.channel.id == "478312979843252234") {
                        client.users.get(msg.author.id).createDM().then((dm) => {
                            msg.author.send("Хост комнаты не задан.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                    } else msg.channel.send("Хост комнаты не задан.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }

            } else {
                msg.author.send("Мы не смогли найти голосовуй комнату, в которой вы бы были хостом.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
        } else if (msg.content.match(/^!кпоум/i) || msg.content.match(/^!kdefault/i)) {
            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
            if (voicechh == undefined || voicechh == null || voicechh == -1)
                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                let textchannel = vartextchannelid[voicechh];
                if (watchingmessagesuserid[voicechh] != undefined) {
                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                        if (!pendingresetroom.includes(ourchannel.id)) {
                            pendingresetroom.push(ourchannel.id);
                            let ourchannel = client.guilds.get('286198213612929024').channels.get(voicechh);
                            let userid = msg.author.id;
                            client.guilds.get('286198213612929024').channels.get(textchannel).send("Хост <@" + msg.author.id + "> инициализировал сброс прав комнаты!").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                            if (rpgvar.includes(ourchannel.id)) {
                                (async (ourchannel) => {
                                    await Promise.all(ourchannel.permissionOverwrites.filter(role => role.id !== "389081897646424064" && role.id !== "294447183921414145" && role.id !== "286198213612929024" && role.id !== "369893791949127680" //&& role.id !== "381084879623946244" 
                                        //&& role.id !== "381084562719113237" 
                                        &&
                                        role.id !== "381076993384382464" && role.id !== "467548950157852673").map(function (ch) {
                                        return ch.delete();
                                    })).catch(async function (reason) {
                                        console.log("ERROR1:" + reason);
                                        if (reason.code != 10008 && reason.code != 10003) {
                                            console.log("Emoji message get error.");
                                            console.log(reason);
                                            process.exit(1);
                                        }
                                    });
                                    await setuppermrpg(ourchannel);
                                    await ourchannel.updateOverwrite(userid, {
                                        MANAGE_CHANNELS: true,
                                        MANAGE_WEBHOOKS: false,
                                        CREATE_INSTANT_INVITE: true,
                                        MANAGE_ROLES: true,
                                        CONNECT: true,
                                        VIEW_CHANNEL: true,
                                        SPEAK: true,
                                        USE_VAD: true,
                                        MOVE_MEMBERS: true,
                                        DEAFEN_MEMBERS: false,
                                        MUTE_MEMBERS: false,
                                        PRIORITY_SPEAKER: true
                                    });
                                    let mychannel = ourchannel;
                                    if (channelsvar.includes(mychannel.id)) {
                                        if (mychannel.permissionOverwrites.get('500580990805213194') != undefined) //НИ
                                            if (!(mychannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                                await mychannel.updateOverwrite('500580990805213194', {
                                                    MANAGE_CHANNELS: false
                                                });
                                                console.log("initclosedelperm:" + mychannel.name);
                                            }
                                    } else if (coopvar.includes(mychannel.id)) {
                                        //var mychannel = ourchannel;
                                        if (!(mychannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                            await mychannel.updateOverwrite('363054008564449281', {
                                                MANAGE_CHANNELS: false
                                            });
                                            //console.log("closeperm:" + c);
                                        }
                                    } else if (rpgvar.includes(mychannel.id)) {
                                        // var mychannel = ourchannel;
                                        if (!(mychannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                            await mychannel.updateOverwrite('381076993384382464', {
                                                MANAGE_CHANNELS: false
                                            });
                                            //console.log("closeperm:" + c);
                                        }
                                    }
                                    await client.channels.get(vartextchannelid[ourchannel.id]).updateOverwrite(userid, {
                                        CREATE_INSTANT_INVITE: true,
                                        MANAGE_CHANNELS: true,
                                        MANAGE_WEBHOOKS: false,
                                        MANAGE_ROLES: true,
                                        VIEW_CHANNEL: true,
                                        SEND_MESSAGES: true,
                                        SEND_TTS_MESSAGES: true,
                                        MANAGE_MESSAGES: true,
                                        EMBED_LINKS: true,
                                        ATTACH_FILES: true,
                                        READ_MESSAGE_HISTORY: true,
                                        MENTION_EVERYONE: true,
                                        USE_EXTERNAL_EMOJIS: true,
                                        ADD_REACTIONS: true
                                    });
                                    if (pendingresetroom.includes(ourchannel.id))
                                        pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));
                                })(ourchannel);
                            } else if (channelsvar.includes(ourchannel.id)) {
                                (async (ourchannel) => {
                                    await Promise.all(ourchannel.permissionOverwrites.filter(role => role.id !== "389081897646424064" && role.id !== "294447183921414145" && role.id !== "500580990805213194" && role.id !== "467548950157852673" && role.id !== "369893791949127680" && role.id !== "286198213612929024").map(function (ch) {
                                        return ch.delete();
                                    })).catch(async function (reason) {
                                        console.log("ERROR1:" + reason);
                                        if (reason.code != 10008 && reason.code != 10003) {
                                            console.log("Emoji message get error.");
                                            console.log(reason);
                                            process.exit(1);
                                        }
                                    });
                                    await setuppermchannelsvar(ourchannel);
                                    await ourchannel.updateOverwrite(userid, {
                                        MANAGE_CHANNELS: true,
                                        MANAGE_WEBHOOKS: false,
                                        CREATE_INSTANT_INVITE: true,
                                        MANAGE_ROLES: true,
                                        CONNECT: true,
                                        VIEW_CHANNEL: true,
                                        SPEAK: true,
                                        USE_VAD: true,
                                        MOVE_MEMBERS: true,
                                        DEAFEN_MEMBERS: false,
                                        MUTE_MEMBERS: false,
                                        PRIORITY_SPEAKER: true
                                    });
                                    let mychannel = ourchannel;
                                    if (channelsvar.includes(mychannel.id)) {
                                        if (mychannel.permissionOverwrites.get('500580990805213194') != undefined) //НИ
                                            if (!(mychannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                                await mychannel.updateOverwrite('500580990805213194', {
                                                    MANAGE_CHANNELS: false
                                                });
                                                console.log("initclosedelperm:" + mychannel.name);
                                            }
                                    } else if (coopvar.includes(mychannel.id)) {
                                        //var mychannel = ourchannel;
                                        if (!(mychannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                            await mychannel.updateOverwrite('363054008564449281', {
                                                MANAGE_CHANNELS: false
                                            });
                                            //console.log("closeperm:" + c);
                                        }
                                    } else if (rpgvar.includes(mychannel.id)) {
                                        //var mychannel = ourchannel;
                                        if (!(mychannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                            await mychannel.updateOverwrite('381076993384382464', {
                                                MANAGE_CHANNELS: false
                                            });
                                            //console.log("closeperm:" + c);
                                        }
                                    }
                                    await client.channels.get(vartextchannelid[ourchannel.id]).updateOverwrite(userid, {
                                        CREATE_INSTANT_INVITE: true,
                                        MANAGE_CHANNELS: true,
                                        MANAGE_WEBHOOKS: false,
                                        MANAGE_ROLES: true,
                                        VIEW_CHANNEL: true,
                                        SEND_MESSAGES: true,
                                        SEND_TTS_MESSAGES: true,
                                        MANAGE_MESSAGES: true,
                                        EMBED_LINKS: true,
                                        ATTACH_FILES: true,
                                        READ_MESSAGE_HISTORY: true,
                                        MENTION_EVERYONE: true,
                                        USE_EXTERNAL_EMOJIS: true,
                                        ADD_REACTIONS: true
                                    });
                                    if (pendingresetroom.includes(ourchannel.id))
                                        pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));
                                })(ourchannel);
                            } else if (coopvar.includes(ourchannel.id)) {
                                (async (ourchannel) => {
                                    await Promise.all(ourchannel.permissionOverwrites.filter(role => role.id !== "389081897646424064" && role.id !== "294447183921414145" && role.id !== "286198213612929024" && role.id !== "369893791949127680" && role.id !== "363054008564449281" && role.id !== "467548950157852673").map(function (ch) {
                                        return ch.delete();
                                    })).catch(async function (reason) {
                                        console.log("ERROR1:" + reason);
                                        if (reason.code != 10008 && reason.code != 10003) {
                                            console.log("Emoji message get error.");
                                            console.log(reason);
                                            process.exit(1);
                                        }
                                    });
                                    await setuppermcoop(ourchannel);
                                    await ourchannel.updateOverwrite(userid, {
                                        MANAGE_CHANNELS: true,
                                        MANAGE_WEBHOOKS: false,
                                        CREATE_INSTANT_INVITE: true,
                                        MANAGE_ROLES: true,
                                        CONNECT: true,
                                        VIEW_CHANNEL: true,
                                        SPEAK: true,
                                        USE_VAD: true,
                                        MOVE_MEMBERS: true,
                                        DEAFEN_MEMBERS: false,
                                        MUTE_MEMBERS: false,
                                        PRIORITY_SPEAKER: true
                                    });
                                    let mychannel = ourchannel;
                                    if (channelsvar.includes(mychannel.id)) {

                                        if (mychannel.permissionOverwrites.get('500580990805213194') != undefined) //НИ
                                            if (!(mychannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                                await mychannel.updateOverwrite('500580990805213194', {
                                                    MANAGE_CHANNELS: false
                                                });
                                                console.log("initclosedelperm:" + mychannel.name);
                                            }
                                    } else if (coopvar.includes(mychannel.id)) {
                                        // var mychannel = ourchannel;
                                        if (!(mychannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                            await mychannel.updateOverwrite('363054008564449281', {
                                                MANAGE_CHANNELS: false
                                            });
                                            //console.log("closeperm:" + c);
                                        }
                                    } else if (rpgvar.includes(mychannel.id)) {
                                        // var mychannel = ourchannel;
                                        if (!(mychannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                            await mychannel.updateOverwrite('381076993384382464', {
                                                MANAGE_CHANNELS: false
                                            });
                                            //console.log("closeperm:" + c);
                                        }
                                    }
                                    await client.channels.get(vartextchannelid[ourchannel.id]).updateOverwrite(userid, {
                                        CREATE_INSTANT_INVITE: true,
                                        MANAGE_CHANNELS: true,
                                        MANAGE_WEBHOOKS: false,
                                        MANAGE_ROLES: true,
                                        VIEW_CHANNEL: true,
                                        SEND_MESSAGES: true,
                                        SEND_TTS_MESSAGES: true,
                                        MANAGE_MESSAGES: true,
                                        EMBED_LINKS: true,
                                        ATTACH_FILES: true,
                                        READ_MESSAGE_HISTORY: true,
                                        MENTION_EVERYONE: true,
                                        USE_EXTERNAL_EMOJIS: true,
                                        ADD_REACTIONS: true
                                    });
                                    if (pendingresetroom.includes(ourchannel.id))
                                        pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));
                                })(ourchannel);
                            } else {
                                if (pendingresetroom.includes(ourchannel.id))
                                    pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));
                            }
                        } else {
                            if (msg.channel.id == "478312979843252234") {
                                client.users.get(msg.author.id).createDM().then((dm) => {
                                    msg.author.send("Комната в процессе инициализации, попробуйте позднее.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            } else msg.channel.send("Комната в процессе инициализации, попробуйте позднее.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        }
                    } else {
                        if (msg.channel.id == "478312979843252234") {
                            client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Вы не являетесь хостом комнаты.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.channel.send("Вы не являетесь хостом комнаты.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                } else {
                    if (msg.channel.id == "478312979843252234") {
                        client.users.get(msg.author.id).createDM().then((dm) => {
                            msg.author.send("Хост комнаты не задан.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                    } else msg.channel.send("Хост комнаты не задан.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }

            } else {
                msg.author.send("Мы не смогли найти голосовуй комнату, в которой вы бы были хостом.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
        } else if (msg.content.match(/^!ксписокпользователей/i) || msg.content.match(/^!kuserlist/i)) {
            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
            if (voicechh == undefined || voicechh == null || voicechh == -1)
                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                var textchannel = vartextchannelid[voicechh];
                if (watchingmessagesuserid[voicechh] != undefined) {
                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                        var userids = [];
                        client.guilds.get('286198213612929024').channels.get(voicechh).members.forEach((entry) => {
                            if (entry.user.bot == false && !msg.mentions.members.has(entry.id))
                                userids.push("<@" + entry.id + ">");
                        });
                        if (userids.length > 0) {
                            var txtarray = [];
                            var useridnum = 1;
                            //console.log(userids);
                            shuffle(userids);
                            userids.forEach((userid) => {
                                txtarray.push({
                                    "name": useridnum++,
                                    "value": userid,
                                    "inline": true
                                });
                            });

                            const embed = {
                                "title": "Случайный список пользователей в голосовой комнате",
                                "description": "",
                                "color": 7823103,
                                "fields": txtarray
                            };

                            if (msg.channel.id == "478312979843252234") {
                                client.users.get(msg.author.id).createDM().then((dm) => {
                                    msg.author.send({
                                        embed
                                    }).catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            } else msg.channel.send({
                                embed
                            }).catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        } else {
                            if (msg.channel.id == "478312979843252234") {
                                client.users.get(msg.author.id).createDM().then((dm) => {
                                    msg.author.send("Список случайных пользователей пуст!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            } else msg.channel.send("<@" + msg.author.id + "> Список случайных пользователей пуст!").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        }
                    } else {
                        if (msg.channel.id == "478312979843252234") {
                            client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Вы не являетесь хостом комнаты.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.channel.send("Вы не являетесь хостом комнаты.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                } else {
                    if (msg.channel.id == "478312979843252234") {
                        client.users.get(msg.author.id).createDM().then((dm) => {
                            msg.author.send("Хост комнаты не задан.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                    } else msg.channel.send("Хост комнаты не задан.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }

            } else {
                msg.author.send("Мы не смогли найти голосовуй комнату, в которой вы бы были хостом.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });

        } else if (msg.content.match(/^!кмафиястарт/i) || msg.content.match(/^!kmafiastart/i)) {
            let voicechh = Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(msg.channel.id)];
            if (voicechh == undefined || voicechh == null || voicechh == -1)
                voicechh = Object.keys(watchingmessagesuserid)[Object.values(watchingmessagesuserid).indexOf(msg.author.id)];
            if (voicechh != undefined && voicechh != null && voicechh != -1) {
                var textchannel = vartextchannelid[voicechh];
                if (watchingmessagesuserid[voicechh] != undefined) {
                    if (watchingmessagesuserid[voicechh] == msg.author.id) {
                        //console.log("Mafia");
                        var mainrole = "";
                        var userids = [];
                        var playercount = 0;
                        client.guilds.get('286198213612929024').channels.get(voicechh).members.forEach((entry) => {
                            if (entry.user.bot == false && entry.id != msg.author.id) {
                                userids.push(entry.id);
                                playercount++;
                            }
                        });
                        //console.log(userids);
                        shuffle(userids);
                        var rolesvar = [];
                        msg.content.split('\n').forEach(function (c, index, array) {
                            if (index == 1) {
                                mainrole = c.trim();
                            } else {
                                var rolenum = c.match(/(.*)\s+([1-9]+)$/);
                                console.log(c);
                                console.log(rolenum);
                                if (rolenum != undefined)
                                    if (rolenum[2] != undefined && rolenum[1] != undefined && rolenum[1].trim() != "") {
                                        for (i = 0; i < rolenum[2]; i++) {
                                            rolesvar.push(rolenum[1].trim());
                                        }
                                    }
                            }
                        });
                        //console.log(rolesvar);
                        // console.log(rolesvar.length + ":" + playercount);
                        if (mainrole != "") {
                            var textvarcontainer = [];
                            if (rolesvar.length > 0) {
                                if (rolesvar.length <= playercount) {
                                    userids.forEach(function (c, index, array) {
                                        //console.log(index);
                                        //console.log(rolesvar[index-1]);
                                        if (rolesvar[index] != undefined) {
                                            textvarcontainer.push({
                                                "name": rolesvar[index],
                                                "value": "<@" + c + ">",
                                                "inline": true
                                            });
                                            const embed = {
                                                "title": "Мафия",
                                                "description": "Выдача ролей.",
                                                "color": 7823103,
                                                "fields": [{
                                                    "name": rolesvar[index],
                                                    "value": "Ваша роль"
                                                }]
                                            };
                                            client.users.get(c).send({
                                                embed
                                            }).catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                        } else {
                                            textvarcontainer.push({
                                                "name": mainrole,
                                                "value": "<@" + c + ">",
                                                "inline": true
                                            });
                                            const embed = {
                                                "title": "Мафия",
                                                "description": "Выдача ролей.",
                                                "color": 7823103,
                                                "fields": [{
                                                    "name": mainrole,
                                                    "value": "Ваша роль"
                                                }]
                                            };
                                            client.users.get(c).send({
                                                embed
                                            }).catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                        }
                                    });
                                    const embed = {
                                        "title": "Роли",
                                        "description": "Список заданных пользователям ролей.",
                                        "color": 7823103,
                                        "fields": textvarcontainer
                                    };
                                    msg.author.send({
                                        embed
                                    }).catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });

                                    client.guilds.get('286198213612929024').channels.get(textchannel).send("Хост <@" + msg.author.id + "> инициализировал мафию.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    // if (msg.channel.type != "dm" && !msg.deleted)
                                    //   msg.delete().catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             }).catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             });
                                } else msg.author.send("Ролей больше чем игроков!").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            } else msg.author.send("Ролей не может быть 0!").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        } else msg.author.send("Основная роль не может быть пустой!").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    } else {
                        if (msg.channel.id == "478312979843252234") {
                            client.users.get(msg.author.id).createDM().then((dm) => {
                                msg.author.send("Вы не являетесь хостом комнаты.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.channel.send("Вы не являетесь хостом комнаты.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                } else {
                    if (msg.channel.id == "478312979843252234") {
                        client.users.get(msg.author.id).createDM().then((dm) => {
                            msg.author.send("Хост комнаты не задан.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        });
                    } else msg.channel.send("Хост комнаты не задан.").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                }

            } else {
                msg.author.send("Мы не смогли найти голосовуй комнату, в которой вы бы были хостом.").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            }
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
            /*} else
            if (msg.channel.id == "478312979843252234")
                if (msg.channel.type != "dm" && !msg.deleted)
                    msg.delete().catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             }).catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             });*/
        } else if (msg.content.match(/^!postgeneral/) && (msg.member.roles.has('286201408238387201') || msg.member.roles.has('294447183921414145') || msg.member.roles.has('389081897646424064'))) {
            // msg.author.send('```asciidoc\nПерезагрузка. ::  \n```').then((msg2) => {
            client.guilds.get('286198213612929024').channels.get('286198213612929024').send(msg.content.replace(/^!postgeneral/i, '')).then(msgg => {
                if (msg.channel.type != "dm" && !msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
            }).catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });

            //});

        } else if (msg.content.match(/^!rebootxonrbot/) && (msg.member.roles.has('286201408238387201') || msg.member.roles.has('294447183921414145') || msg.member.roles.has('389081897646424064'))) {
            msg.author.send('```asciidoc\nПерезагрузка. ::  \n```').then((msg2) => {
                if (msg.channel.type != "dm" && !msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    }).then((msg) => {
                        process.exit(1);
                    });
            }).catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
        } else if (msg.content.startsWith("!getvoicetchannelusers") && (msg.member.roles.has('286201408238387201') || msg.member.roles.has('294447183921414145') || msg.member.roles.has('389081897646424064'))) {
            let tempSelection = msg.mentions.channels.first();
            console.log(tempSelection.members);
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
        } else if (msg.content.match(/^!refreshrules/) && (msg.member.roles.has('286201408238387201') || msg.member.roles.has('294447183921414145') || msg.member.roles.has('389081897646424064'))) {
            msg.author.send('```asciidoc\nПерезаписываем инструкцию команд. ::  \n```').catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            }).then(async (msg2) => {
                if (msg.channel.type != "dm" && !msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
                let ourchannel = client.channels.get("478312979843252234");
                if (ourchannel != undefined) {
                    try {
                        while (true) {
                            var breakthis = false;
                            await client.channels.get(ourchannel.id).messages.fetch({
                                limit: 100
                            }).then(async (messages) => {
                                let messagesArr = messages.array();
                                let messageCount = messagesArr.length;
                                if (messageCount > 0) {
                                    console.log("LOOPING");
                                    await client.channels.get(ourchannel.id).bulkDelete(messageCount);

                                } else {
                                    console.log("STOP2");
                                    breakthis = true;
                                    return;
                                }
                            });
                            if (breakthis) break;
                        }

                    } catch (err) {
                        while (true) {
                            var breakthis = false;
                            await client.channels.get(ourchannel.id).messages.fetch({
                                limit: 100
                            }).then(async (messages) => {
                                let messagesArr = messages.array();
                                let messageCount = messagesArr.length;
                                if (messageCount > 0) {
                                    console.log("LOOPING");
                                    Promise.all(messages.map(element => {
                                        return element.delete();
                                    })).catch(async function (reason) {
                                        console.log("ERROR1:" + reason);
                                        if (reason.code != 10008 && reason.code != 10003) {
                                            console.log("Emoji message get error.");
                                            console.log(reason);
                                            process.exit(1);
                                        }
                                    });
                                } else {
                                    console.log("STOP3");
                                    breakthis = true;
                                    return;
                                }
                            });
                            if (breakthis) break;
                        }
                        console.log("ASYNC ERROR 1" + err);
                    }
                    await client.channels.get(ourchannel.id).send(helptext, {
                        "split": true
                    }).catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });

                }
            });
        } else if (msg.content.match(/^!refreshchdescr/) && (msg.member.roles.has('286201408238387201') || msg.member.roles.has('294447183921414145') || msg.member.roles.has('389081897646424064'))) {
            msg.author.send('```asciidoc\nПерезаписываем инструкции комнат. ::  \n```').catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            }).then(async (msg2) => {
                for (let c of channelsvar) {
                    let ourchannel = client.channels.get(c);
                    if (ourchannel != undefined && ourchannel.members.size == 0) {
                        try {
                            while (true) {
                                var breakthis = false;
                                await client.channels.get(vartextchannelid[ourchannel.id]).messages.fetch({
                                    limit: 100
                                }).then(async (messages) => {
                                    let messagesArr = messages.array();
                                    let messageCount = messagesArr.length;
                                    if (messageCount > 0) {
                                        console.log("LOOPING");
                                        await client.channels.get(vartextchannelid[ourchannel.id]).bulkDelete(messageCount);
                                        /*if (messageCount <= 100) {
                                            breakthis = true;
                                            return;
                                        }*/
                                    } else {
                                        console.log("STOP4");
                                        breakthis = true;
                                        return;
                                    }
                                });
                                if (breakthis) break;
                            }
                            /*await client.channels.get(vartextchannelid[ourchannel.id]).send(starttext, {
                                "split": true
                            });DISABLE ROOM MESSAGE*/
                        } catch (err) {
                            console.log("ASYNC ERROR 2" + err);
                        }
                    }
                }
                for (let c of coopvar) {
                    let ourchannel = client.channels.get(c);
                    if (ourchannel != undefined && ourchannel.members.size == 0) {
                        try {
                            while (true) {
                                var breakthis = false;
                                await client.channels.get(vartextchannelid[ourchannel.id]).messages.fetch({
                                    limit: 100
                                }).then(async (messages) => {
                                    let messagesArr = messages.array();
                                    let messageCount = messagesArr.length;
                                    if (messageCount > 0) {
                                        console.log("LOOPING");
                                        await client.channels.get(vartextchannelid[ourchannel.id]).bulkDelete(messageCount);
                                        /*if (messageCount <= 100) {
                                            breakthis = true;
                                            return;
                                        }*/
                                    } else {
                                        console.log("STOP5");
                                        breakthis = true;
                                        return;
                                    }
                                });
                                if (breakthis) break;
                            }
                            /*await client.channels.get(vartextchannelid[ourchannel.id]).send(starttext, {
                                "split": true
                            });DISABLE ROOM MESSAGE*/
                        } catch (err) {
                            console.log("ASYNC ERROR 3" + err);
                        }
                    }
                }
                for (let c of rpgvar) {
                    let ourchannel = client.channels.get(c);
                    if (ourchannel != undefined && ourchannel.members.size == 0) {
                        try {
                            while (true) {
                                var breakthis = false;
                                await client.channels.get(vartextchannelid[ourchannel.id]).messages.fetch({
                                    limit: 100
                                }).then(async (messages) => {
                                    let messagesArr = messages.array();
                                    let messageCount = messagesArr.length;
                                    if (messageCount > 0) {
                                        console.log("LOOPING");
                                        await client.channels.get(vartextchannelid[ourchannel.id]).bulkDelete(messageCount);
                                        /*if (messageCount <= 100) {
                                            breakthis = true;
                                            return;
                                        }*/
                                    } else {
                                        console.log("STOP6");
                                        breakthis = true;
                                        return;
                                    }
                                });
                                if (breakthis) break;
                            }
                            /*await client.channels.get(vartextchannelid[ourchannel.id]).send(starttext, {
                                "split": true
                            });DISABLE ROOM MESSAGE*/
                        } catch (err) {
                            console.log("ASYNC ERROR 4" + err);
                        }
                    }
                }
                if (msg.channel.type != "dm" && !msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
            });

        } else if (msg.author.bot == false && msg.channel.id == "474213853581017088" && !msg.member.roles.has('286201408238387201') && !msg.member.roles.has('294447183921414145') && !msg.member.roles.has('389081897646424064')) {
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
            client.guilds.get('286198213612929024').channels.get('474212860667363328').send('Поступила заявка от пользователя <@' + msg.author.id + '>:\n' + msg.content).catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
        } else if (msg.author.bot == false && msg.content.match(/^!жалоба(.*)/i)) {
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
            client.guilds.get('286198213612929024').channels.get('389291844628119553').send('Поступила жалоба от пользователя <@' + msg.author.id + '>:' + msg.content.replace(/^!жалоба/i, '')).catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
        } else if (msg.author.bot == false && msg.content.match(/^!обращение(.*)/i)) {
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
            client.guilds.get('286198213612929024').channels.get('389291844628119553').send('Поступило обращение от пользователя <@' + msg.author.id + '>:' + msg.content.replace(/^!обращение/i, '')).catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
        } else if (msg.author.bot == false && msg.content.match(/^!сообщение(.*)/i)) {
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
            client.guilds.get('286198213612929024').channels.get('389291844628119553').send('Поступило сообщение от пользователя <@' + msg.author.id + '>:' + msg.content.replace(/^!сообщение/i, '')).catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
        } else if (msg.channel.id == "387347079883653120" || msg.channel.id == "500588693845704704" || msg.channel.id == "500589087716147200") {
            if (msg.author.bot) msg.delete().catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
            else
                msg.react("🎲");
        } else if (msg.channel.id == "575310216351055882") {
            if (msg.author.bot) msg.delete().catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
            else {
                var validdescr = false;

                var firstLine = "";


                msg.content.split('\n').forEach(function (c, index, array) {
                    if (c.match(/🎲/)) {
                        firstLine = c;
                        return;
                    }
                });
                //🎲
                if (firstLine != "") {
                    var matches = firstLine.match(/🎲(.*)/);
                    if (matches != undefined) {
                        var gamename = matches[1].replace(/[*_~`]/gi, '').trim().substring(0, 255);
                        if (gamename != "") {

                            var timestamp = new Date().getTime();
                            trimexpruser(msg.author.id, 0);
                            console.log("advertremember:" + msg.author.username);
                            connection.query('INSERT INTO rememberedgamenames SET timestampexp=?,userid=?,gamename=?,messageid=?,messageserverid=?', [new Date().getTime() + 60000, msg.author.id, gamename, msg.id, msg.channel.id]).then(() => {
                                checkchannels(msg.author.id);
                            });

                            validdescr = true;
                            if (msg.content.includes("steam://joinlobby/251040/")) {
                                msg.react("482094356350763008");
                            }
                        }
                    }
                }
                if (validdescr == false) {
                    if (!msg.member.roles.has('286201408238387201') && !msg.member.roles.has('294447183921414145') && !msg.member.roles.has('389081897646424064')) {
                        msg.author.send('```asciidoc\nНеправильно оформленное объявление было удалено. ::  \n```\nСообщение о сборе __**должно содержать**__ :game_die: [Название игры], например, ":game_die: Каркассон"\n\nПример подробного оформления *(Информация, сообщаемая об игре, может быть произвольной)*:\n:game_die: **Таверна Красный Дракон** *(Red Dragon Inn)* [RU] - компанейская\n:busts_in_silhouette:  **Игроки:** 2-8\n:timer: **Время партии:** ~2-3 часа\nТы и твои сопартийцы изрядно притомились, проведя день в подземелье. К счастью, приключения позади, и вы готовы как следует отдохнуть. А где лучшие вечеринки? Правильно, в «Красном Драконе»!\n\n:exclamation:  Скопируйте значок "кубика" или добавьте в описание перед названием игры `:game_die:`\n\n*Удалённое объявление:*\n\n```' + msg.content + "```").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                        if (msg.channel.type != "dm" && !msg.deleted)
                            msg.delete().catch(async function (reason) {
                                console.log("ERROR1:" + reason);
                                if (reason.code != 10008 && reason.code != 10003) {
                                    console.log("Emoji message get error.");
                                    console.log(reason);
                                    process.exit(1);
                                }
                            });
                    } else {
                        msg.react("👍").then((react) => {
                            react.message.react("👎");
                        });
                    }
                }
            }
        } else if (msg.channel.id == "478312979843252234") {
            if (msg.channel.type != "dm" && !msg.deleted)
                msg.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
        } else if (msg.channel.id == "466721573051695104") { //SUGGESTIONS
            if (msg.content.match(/^💡/)) {
                msg.channel.send('> https://discordapp.com/channels/286198213612929024/466721573051695104/' + msg.id + '\n<@' + msg.author.id + '> Спасибо, что поделились с нами вашей идеей.\n Пользователи могут проголосовать за идею используя эмодзи прикреплённые к этому сообщению.').catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                }).then((message) => {
                    message.react("👍").then((react) => {
                        react.message.react("👎");
                    });

                });
            } else if (msg.content.match(/^\>/) && msg.author.bot == false) {
                msg.react("👍").then((react) => {
                    react.message.react("👎");
                });
            }
        } else if (msg.channel.id == "469116181157249024" && msg.author.bot == false && !msg.member.roles.has('286201408238387201') && !msg.member.roles.has('294447183921414145') && !msg.member.roles.has('389081897646424064')) { //vote-for-mod
            msg.channel.send('> https://discordapp.com/channels/286198213612929024/469116181157249024/' + msg.id + '\n<@' + msg.author.id + '> Пользователи могут проголосовать за кандидата используя эмодзи прикреплённые к этому сообщению.').catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            }).then((message) => {
                message.react("👍").then((react) => {
                    react.message.react("👎");
                });

            });
        } else if (msg.channel.id == "393383348833353728") {
            if (msg.author.bot) msg.delete().catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
            else {
                var validdescr = false;
                var firstLine = "";


                msg.content.split('\n').forEach(function (c, index, array) {
                    if (c.match(/🎲/)) {
                        firstLine = c;
                        return;
                    }
                });
                // if(firstLine == "")firstLine =  (msg.content).trim();
                //🎲
                if (firstLine != "") {
                    var matches = firstLine.match(/🎲(.*)/);
                    if (matches != undefined) {
                        var gamename = matches[1].replace(/[*_~`]/gi, '').trim().substring(0, 255);
                        if (gamename != "") {

                            var timestamp = new Date().getTime();
                            trimexpruser(msg.author.id, 1);
                            console.log("advertremember2:" + msg.author.username);
                            connection.query('INSERT INTO rememberedgamenames SET timestampexp=?,userid=?,gamename=?,messageid=?,messageserverid=?,roomtype=1', [new Date().getTime() + 60000, msg.author.id, gamename, msg.id, msg.channel.id]).then(() => {
                                checkchannels(msg.author.id);
                            });

                            validdescr = true;
                            if (msg.content.includes("steam://joinlobby/251040/")) {
                                msg.react("482094356350763008");
                            }
                        }
                    }
                }

                if (validdescr == false) {
                    if (!msg.member.roles.has('286201408238387201') && !msg.member.roles.has('294447183921414145') && !msg.member.roles.has('389081897646424064')) {
                        msg.author.send('```asciidoc\nНеправильно оформленное объявление было удалено. ::  \n```\nСообщение о сборе __**должно содержать**__ :game_die: [Название игры], например, ":game_die: Каркассон"\n\nПример подробного оформления *(Информация, сообщаемая об игре, может быть произвольной)*:\n:game_die: **Таверна Красный Дракон** *(Red Dragon Inn)* [RU] - компанейская\n:busts_in_silhouette:  **Игроки:** 2-8\n:timer: **Время партии:** ~2-3 часа\nТы и твои сопартийцы изрядно притомились, проведя день в подземелье. К счастью, приключения позади, и вы готовы как следует отдохнуть. А где лучшие вечеринки? Правильно, в «Красном Драконе»!\n\n:exclamation:  Скопируйте значок "кубика" или добавьте в описание перед названием игры `:game_die:`\n\n*Удалённое объявление:*\n\n```' + msg.content + "```").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                        if (msg.channel.type != "dm" && !msg.deleted)
                            msg.delete().catch(async function (reason) {
                                console.log("ERROR1:" + reason);
                                if (reason.code != 10008 && reason.code != 10003) {
                                    console.log("Emoji message get error.");
                                    console.log(reason);
                                    process.exit(1);
                                }
                            });
                    } else {
                        msg.react("👍").then((react) => {
                            react.message.react("👎");
                        });
                    }
                }
            }
        } else if (msg.channel.id == "472889032628764672") {
            if (msg.author.bot) msg.delete().catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
            else {
                var validdescr = false;
                var firstLine = "";


                msg.content.split('\n').forEach(function (c, index, array) {
                    if (c.match(/🎲/)) {
                        firstLine = c;
                        return;
                    }
                });
                //🎲
                if (firstLine != "") {
                    var matches = firstLine.match(/🎲(.*)/);
                    if (matches != undefined) {
                        var gamename = matches[1].replace(/[*_~`]/gi, '').trim().substring(0, 255);
                        if (gamename != "") {

                            var timestamp = new Date().getTime();
                            trimexpruser(msg.author.id, 3);
                            console.log("advertremember3:" + msg.author.username);
                            connection.query('INSERT INTO rememberedgamenames SET timestampexp=?,userid=?,gamename=?,messageid=?,messageserverid=?,roomtype=3', [new Date().getTime() + 60000, msg.author.id, gamename, msg.id, msg.channel.id]).then(() => {
                                checkchannels(msg.author.id);
                            });

                            validdescr = true;
                            if (msg.content.includes("steam://joinlobby/251040/")) {
                                msg.react("482094356350763008");
                            }
                        }
                    }
                }

                if (validdescr == false) {
                    if (!msg.member.roles.has('286201408238387201') && !msg.member.roles.has('294447183921414145') && !msg.member.roles.has('389081897646424064')) {
                        msg.author.send('```asciidoc\nНеправильно оформленное объявление было удалено. ::  \n```\nСообщение о сборе __**должно содержать**__ :game_die: [Название игры], например, ":game_die: Каркассон"\n\nПример подробного оформления *(Информация, сообщаемая об игре, может быть произвольной)*:\n:game_die: **Таверна Красный Дракон** *(Red Dragon Inn)* [RU] - компанейская\n:busts_in_silhouette:  **Игроки:** 2-8\n:timer: **Время партии:** ~2-3 часа\nТы и твои сопартийцы изрядно притомились, проведя день в подземелье. К счастью, приключения позади, и вы готовы как следует отдохнуть. А где лучшие вечеринки? Правильно, в «Красном Драконе»!\n\n:exclamation:  Скопируйте значок "кубика" или добавьте в описание перед названием игры `:game_die:`\n\n*Удалённое объявление:*\n\n```' + msg.content + "```").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                        if (msg.channel.type != "dm" && !msg.deleted)
                            msg.delete().catch(async function (reason) {
                                console.log("ERROR1:" + reason);
                                if (reason.code != 10008 && reason.code != 10003) {
                                    console.log("Emoji message get error.");
                                    console.log(reason);
                                    process.exit(1);
                                }
                            });
                    } else {
                        msg.react("👍").then((react) => {
                            react.message.react("👎");
                        });
                    }
                }
            }
        } else if (msg.channel.type == "dm" && msg.author.bot == false) {
            var validdescr = false;

            var firstLine = "";


            msg.content.split('\n').forEach(function (c, index, array) {
                if (c.match(/🎲/)) {
                    firstLine = c;
                    return;
                }
            });
            //🎲
            if (firstLine != "") {
                var matches = firstLine.match(/🎲(.*)/);
                if (matches != undefined) {
                    var gamename = matches[1].replace(/[*_~`]/gi, '').trim().substring(0, 255);
                    if (gamename != "") {

                        var timestamp = new Date().getTime();
                        trimexpruser(msg.author.id, 0);
                        trimexpruser(msg.author.id, 1);
                        trimexpruser(msg.author.id, 2);
                        trimexpruser(msg.author.id, 3);
                        console.log("advertremember4:" + msg.author.username);
                        connection.query('INSERT INTO rememberedgamenames SET timestampexp=?,userid=?,gamename=?,messageid=?,messageserverid=?,roomtype=2', [new Date().getTime() + 60000, msg.author.id, gamename, msg.id, msg.channel.id]).then(() => {
                            checkchannels(msg.author.id);
                        });

                        validdescr = true;
                    }
                }
            }
            //sendMessages(userID,[],0);
            if (validdescr == false)
                msg.author.send('```asciidoc\nНе удалось найти название игры :(  ::  \n```').catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            else
                msg.author.send('```fix\nОбъявление успешно получено, зайдите в пустую комнату или комнату без хоста в течение минуты.\n```').catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });

        } else if (msg.content.match(/^!roomsetby\s+(.*)/) && (msg.member.roles.has('286201408238387201') || msg.member.roles.has('294447183921414145') || msg.member.roles.has('389081897646424064'))) {
            console.log("FIRE");
            try {
                var roomid = parseInt(msg.content.match(/^!roomsetby\s+(.*)/)[1].trim()) - 1;
                //console.log(msg.content.match(/^!roomsetbydefault(.*)/)[1].trim());
                if (roomid > -1) {
                    //console.log("FIRE2");
                    if (channelsvar[roomid] != undefined) {
                        //console.log("FIRE3");
                        if (watchingmessagesuserid[channelsvar[roomid]] != undefined)
                            msg.channel.send("<@" + watchingmessagesuserid[channelsvar[roomid]] + ">").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        else
                            msg.channel.send("У комнаты нет хоста.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                    } else
                        msg.channel.send("Комната не найдена.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                }
            } catch (err) {
                console.log(err);
            }
        } else if (msg.content.match(/^!roomsetbyrpg\s+(.*)/) && (msg.member.roles.has('286201408238387201') || msg.member.roles.has('294447183921414145') || msg.member.roles.has('389081897646424064'))) {
            console.log("FIRE");
            try {
                var roomid = parseInt(msg.content.match(/^!roomsetbyrpg\s+(.*)/)[1].trim()) - 1;
                //console.log(msg.content.match(/^!roomsetbydefault(.*)/)[1].trim());
                if (roomid > -1) {
                    //console.log("FIRE2");
                    if (rpgvar[roomid] != undefined) {
                        //console.log("FIRE3");
                        if (watchingmessagesuserid[rpgvar[roomid]] != undefined)
                            msg.channel.send("<@" + watchingmessagesuserid[rpgvar[roomid]] + ">").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        else
                            msg.channel.send("У комнаты нет хоста.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                    } else
                        msg.channel.send("Комната не найдена.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                }
            } catch (err) {
                console.log(err);
            }
        } else if (msg.content.match(/^!roomsetbycoop\s+(.*)/) && (msg.member.roles.has('286201408238387201') || msg.member.roles.has('294447183921414145') || msg.member.roles.has('389081897646424064'))) {
            console.log("FIRE");
            try {
                var roomid = parseInt(msg.content.match(/^!roomsetbycoop\s+(.*)/)[1].trim()) - 1;
                //console.log(msg.content.match(/^!roomsetbydefault(.*)/)[1].trim());
                if (roomid > -1) {
                    //console.log("FIRE2");
                    if (coopvar[roomid] != undefined) {
                        //console.log("FIRE3");
                        if (watchingmessagesuserid[coopvar[roomid]] != undefined)
                            msg.channel.send("<@" + watchingmessagesuserid[coopvar[roomid]] + ">").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        else
                            msg.channel.send("У комнаты нет хоста.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                    } else
                        msg.channel.send("Комната не найдена.").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                }
            } catch (err) {
                console.log(err);
            }
        }
        /* else if (msg.channel.id == "478312979843252234" && msg.author.id != "466307284977582109"
                //&& msg.channel.type != "dm" 
                &&
                !msg.deleted) msg.delete().catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             }).catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             });*/
    });
    client.on('channelCreate', channel => {
        checkchannels();

    });

    function trimexpruser(userid = 0, type = -1) {
        connection.query('DELETE FROM rememberedgamenames WHERE timestampexp<? AND roomid=""', [new Date().getTime()]);
        if (type != -1) {
            connection.query('DELETE FROM rememberedgamenames WHERE userid=? AND roomtype=?', [userid, type]);
            console.log("DELETE remeber8" + type);
        }
    }

    async function checkchannelsdeletion(channelid) {
        ////console.log(rpgvar);
        var thiisprevoiousidofch = channelid;
        console.log("PREVID:" + channelid);
        if (channelsvar.includes(channelid)) {
            pendingcreating.push(channelid);
            var channelnumber = channelsvar.indexOf(channelid);
            await Promise.all(client.guilds.get('286198213612929024').channels.filter(ch => ch.type == "voice" && ch.parentID == "362003311861301248" && !ignorechannelslist.includes(ch.id) && ch.name == '🎀:' + (channelnumber + 1) + ' [Инициализация]').map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
            await client.guilds.get('286198213612929024').channels.create('🎀:' + (channelnumber + 1) + ' [Инициализация]', {
                type: 'voice',
                parent: '362003311861301248',
                permissionOverwrites: [{
                        id: "468289785312837632",
                        allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL'],
                    },
                    {
                        id: "468285710470742046",
                        allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL'],
                    },
                    {
                        id: "468286292430422016",
                        allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL'],
                    },
                    {
                        id: "500580990805213194",
                        allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL'],
                    },
                    {
                        id: "286198213612929024",
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: "369893791949127680",
                        deny: ['SPEAK'],
                    },
                    {
                        id: "467548950157852673",
                        allow: ['USE_VAD', 'VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
                    },
                    {
                        id: "468286292430422016",
                        allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL'],
                    },
                ],
            }).then(async (channel) => {
                await connection.query('UPDATE roomslist SET channelid=? WHERE channelid=?', [channel.id, channelid]);
                console.log("PREVID:" + thiisprevoiousidofch);
                console.log("NEWID:" + channel.id);
                vartextchannelid[channel.id] = vartextchannelid[thiisprevoiousidofch];
                channelsvar[channelnumber] = channel.id;
                delete watchingmessagesmessageid[thiisprevoiousidofch];
                delete vartextchannelid[thiisprevoiousidofch];
                delete watchingmessagesroomid[thiisprevoiousidofch];
                delete watchingmessagesserverid[thiisprevoiousidofch];
                delete watchingmessagesuserid[thiisprevoiousidofch];
                delete watchingmessagesmessageid[channel.id];
                delete watchingmessagesroomid[channel.id];
                delete watchingmessagesserverid[channel.id];
                // delete watchingmessagesuserid[channel.id];
                watchingmessagesuserid[channel.id] = 0;
                await connection.query('DELETE FROM rememberedgamenames WHERE roomid=?', [thiisprevoiousidofch]);
                pendingcreating = removealt(pendingcreating, pendingcreating.indexOf(thiisprevoiousidofch));
                channelid = channel.id;
                pendingcreating = removealt(pendingcreating, pendingcreating.indexOf(channelid));
                setTimeout(() => {
                    waittosortvar = true;
                }, 1);
                syncrightsvoicetext(channel, client.channels.get(vartextchannelid[channel.id]));
            }).catch(function (reason) {
                console.log("ERROR312312:" + reason);
                process.exit(1);
            });
        } else if (coopvar.includes(channelid)) {
            pendingcreating.push(channelid);
            var channelnumber = coopvar.indexOf(channelid);
            await Promise.all(client.guilds.get('286198213612929024').channels.filter(ch => ch.type == "voice" && ch.parentID == "363054686460182528" && !ignorechannelslist.includes(ch.id) && ch.name == 'O🎀:' + (channelnumber + 1) + ' [Инициализация]').map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
            await client.guilds.get('286198213612929024').channels.create('O🎀:' + (channelnumber + 1) + ' [Инициализация]', {
                type: 'voice',
                parent: '363054686460182528',
                permissionOverwrites: [{
                        id: "369893791949127680",
                        deny: ['SPEAK'],
                    },
                    {
                        id: "363054008564449281",
                        allow: ['CONNECT', 'MANAGE_CHANNELS'],
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: "467548950157852673",
                        allow: ['USE_VAD', 'VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
                    },
                ],
            }).then(async (channel) => {
                await connection.query('UPDATE roomslist SET channelid=? WHERE channelid=?', [channel.id, channelid]);
                vartextchannelid[channel.id] = vartextchannelid[thiisprevoiousidofch];
                coopvar[channelnumber] = channel.id;
                delete watchingmessagesmessageid[thiisprevoiousidofch];
                delete vartextchannelid[thiisprevoiousidofch];
                delete watchingmessagesroomid[thiisprevoiousidofch];
                delete watchingmessagesserverid[thiisprevoiousidofch];
                delete watchingmessagesuserid[thiisprevoiousidofch];
                delete watchingmessagesmessageid[channel.id];
                delete watchingmessagesroomid[channel.id];
                delete watchingmessagesserverid[channel.id];
                // delete watchingmessagesuserid[channel.id];
                watchingmessagesuserid[channel.id] = 0;
                await connection.query('DELETE FROM rememberedgamenames WHERE roomid=?', [thiisprevoiousidofch]);
                pendingcreating = removealt(pendingcreating, pendingcreating.indexOf(thiisprevoiousidofch));
                channelid = channel.id;
                pendingcreating = removealt(pendingcreating, pendingcreating.indexOf(channelid));
                setTimeout(() => {
                    waittosortcoopvar = true;
                }, 1);
                syncrightsvoicetext(channel, client.channels.get(vartextchannelid[channel.id]), 2);

            }).catch(function (reason) {
                console.log("ERROR6:" + reason);
                process.exit(1);
            });
        } else if (rpgvar.includes(channelid)) {
            pendingcreating.push(channelid);
            var channelnumber = rpgvar.indexOf(channelid);
            await Promise.all(client.guilds.get('286198213612929024').channels.filter(ch => ch.type == "voice" && ch.parentID == "381083236455153686" && !ignorechannelslist.includes(ch.id) && ch.name == 'R🎀:' + (channelnumber + 1) + ' [Инициализация]').map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
            await client.guilds.get('286198213612929024').channels.create('R🎀:' + (channelnumber + 1) + ' [Инициализация]', {
                type: 'voice',
                parent: '381083236455153686',
                permissionOverwrites: [{
                        id: "369893791949127680",
                        deny: ['SPEAK'],
                    }
                    /*,
                                        {
                                            id: "381084879623946244",
                                            allow: ['MANAGE_ROLES', 'CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD'],
                                }*/
                    /*,
                                        {
                                            id: "381084562719113237",
                                            allow: ['MANAGE_ROLES', 'MANAGE_CHANNELS', 'CREATE_INSTANT_INVITE', 'CONNECT', 'SPEAK'],
                                        }*/
                    ,
                    {
                        id: "381076993384382464",
                        allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
                        deny: ['MANAGE_ROLES'],
                    },
                    {
                        id: "467548950157852673",
                        allow: ['USE_VAD', 'VIEW_CHANNEL', 'CONNECT', 'SPEAK'],
                    },
                ],
            }).then(async (channel) => {
                await connection.query('UPDATE roomslist SET channelid=? WHERE channelid=?', [channel.id, channelid]);
                vartextchannelid[channel.id] = vartextchannelid[thiisprevoiousidofch];
                rpgvar[channelnumber] = channel.id;

                delete watchingmessagesmessageid[thiisprevoiousidofch];
                delete vartextchannelid[thiisprevoiousidofch];
                delete watchingmessagesroomid[thiisprevoiousidofch];
                delete watchingmessagesserverid[thiisprevoiousidofch];
                delete watchingmessagesuserid[thiisprevoiousidofch];
                delete watchingmessagesmessageid[channel.id];
                delete watchingmessagesroomid[channel.id];
                delete watchingmessagesserverid[channel.id];
                // delete watchingmessagesuserid[channel.id];
                watchingmessagesuserid[channel.id] = 0;
                await connection.query('DELETE FROM rememberedgamenames WHERE roomid=?', [thiisprevoiousidofch]);
                pendingcreating = removealt(pendingcreating, pendingcreating.indexOf(thiisprevoiousidofch));
                channelid = channel.id;
                pendingcreating = removealt(pendingcreating, pendingcreating.indexOf(channelid));
                setTimeout(() => {
                    waittosortrpgvar = true;
                }, 1);
                syncrightsvoicetext(channel, client.channels.get(vartextchannelid[channel.id]), 1);
            }).catch(function (reason) {
                console.log("ERROR6:" + reason);
                process.exit(1);
            });
        }
        return channelid;
    }
    /*var gameroomnumtoemo = [
    client.emojis.find("name", "zero").id,
    client.emojis.find("name", "one").id,
    client.emojis.find("name", "two").id,
    client.emojis.find("name", "three").id,
    client.emojis.find("name", "four").id,
    client.emojis.find("name", "five").id,
    client.emojis.find("name", "six").id,
    client.emojis.find("name", "seven").id,
    client.emojis.find("name", "eight").id,
    client.emojis.find("name", "nine").id
    ];*/
    var gameroomnumtoemo = [
        "0",
        "466307896196726786",
        "466307899430273024",
        "466307896246927381",
        "466307896372756491",
        "466307896028823554",
        "466307896523620382",
        "466307899497381908",
        "466307898834944003",
        "466307896863358978",
        "466307896242601998",
        "466307896087543818",
        "466307899056979970",
        "466307896540397568",
        "466307895990943765",
        "466307899103117312",
        "466307896204984342",
        "466307896398053386",
        "466307896163041281",
        "466307896393859107",
        "466307896569757696",
        "466307897840893952",
        "466307896645255188",
        "466307896444059675",
        "466307898948190229",
        "466307896230019073",
        "466307896142200863",
        "466307896268029979",
        "466307898952122379",
        "466307896146264075",
        "466307899270889512"
    ];
    /*var gameroomnumtoemo = [
        "0⃣",
        "1⃣",
        "2⃣",
        "3⃣",
        "4⃣",
        "5⃣",
        "6⃣",
        "7⃣",
        "8⃣",
        "9⃣"
    ];*/
    var ignorenameuntilchange = [];
    //var pendingsetuprpg = [];
    //var pendingsetupchannelsvar = [];
    //var pendingsetupcoopvar = [];
    var pendingmessagesdelete = [];
    var wipedoutids = [];
    var channelinwork = [];
    var pendingresetroom = [];
    async function fullsetup(ourchannel, ignorecheck = false) {
        let c = ourchannel.id;
        let channelid = undefined;
        let prefix = undefined;

        if (prefix == undefined) {
            if (channelsvar.includes(c)) {
                if (ourchannel.members.size <= 0) prefix = '🎀';

                else if (activegamesroomsid.includes(c) //|| (ourchannel.members.size != 0 && ourchannel.userLimit != 0 && ourchannel.userLimit <= ourchannel.members.size)
                ) prefix = '🎲';
                else if (waitgamesroomsid.includes(c)) prefix = '💤';
                else
                    prefix = '⏳';
                channelid = channelsvar.indexOf(c);
            } else if (coopvar.includes(ourchannel.id)) {
                if (ourchannel.members.size <= 0) prefix = 'O🎀';

                else if (activegamesroomsid.includes(c) //|| (ourchannel.members.size != 0 && ourchannel.userLimit != 0 && ourchannel.userLimit <= ourchannel.members.size)
                ) prefix = 'O🎮';
                else if (waitgamesroomsid.includes(c)) prefix = 'O💤';
                else
                    prefix = 'O⏳';
                channelid = coopvar.indexOf(c);
            } else if (rpgvar.includes(c)) {
                if (ourchannel.members.size <= 0) prefix = 'R🎀';

                else if (activegamesroomsid.includes(c) //|| (ourchannel.members.size != 0 && ourchannel.userLimit != 0 && ourchannel.userLimit <= ourchannel.members.size)
                ) prefix = 'R🐲';
                else if (waitgamesroomsid.includes(c)) prefix = 'R💤';
                else
                    prefix = 'R⏳';
                channelid = rpgvar.indexOf(c);
            }
        }
        if (channelid == undefined) return;
        else channelid += 1;
        if (watchingmessagesmessageid[c] != undefined) {
            delete watchingmessagesmessageid[c];
            delete watchingmessagesroomid[c];
            delete watchingmessagesserverid[c];
            delete watchingmessagesuserid[c];
            if (activegamesroomsid.includes(c))
                activegamesroomsid = removealt(activegamesroomsid, activegamesroomsid.indexOf(c));
            if (waitgamesroomsid.includes(c))
                waitgamesroomsid = removealt(waitgamesroomsid, waitgamesroomsid.indexOf(c));
            if (rageroomsid.includes(c))
                rageroomsid = removealt(rageroomsid, rageroomsid.indexOf(c));
            await connection.query('DELETE FROM rememberedgamenames WHERE roomid=?', [ourchannel.id]);
            console.log("DELETE remeber11" + ourchannel.name);
        }
        if (ourchannel.name != prefix + ":" + channelid + " [Пустая]" || ourchannel.bitrate != 64000 || ourchannel.userLimit > 0 || ignorecheck) {
            console.log(ourchannel.name);
            console.log(ourchannel.bitrate);
            console.log(ourchannel.userLimit);
            //if (!pendingmessagesdelete.includes(ourchannel.id)) {
            // pendingmessagesdelete.push(ourchannel.id);

            if (rpgvar.includes(ourchannel.id)) {
                if (!pendingresetroom.includes(ourchannel.id)) {
                    pendingresetroom.push(ourchannel.id);
                    (async (ourchannel, channelid) => {
                        await Promise.all(ourchannel.permissionOverwrites.filter(role => role.id !== "389081897646424064" && role.id !== "294447183921414145" && role.id !== "286198213612929024" && role.id !== "369893791949127680" //&& role.id !== "381084879623946244" 
                            //&& role.id !== "381084562719113237" 
                            &&
                            role.id !== "381076993384382464" && role.id !== "467548950157852673").map(function (ch) {
                            return ch.delete();
                        })).catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                        await setuppermrpg(ourchannel);
                        await ourchannel.edit({
                            channelID: ourchannel.id,
                            name: prefix + ":" + channelid + " [Пустая]",
                            userLimit: 0,
                            bitrate: 64000
                        }).catch(function (reason) {
                            console.log("EDITEEROR:" + reason);
                        });
                        if (pendingresetroom.includes(ourchannel.id))
                            pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));
                    })(ourchannel, channelid);
                } else console.log("IGNORE SETUP RPG: " + ourchannel.name);
            } else if (channelsvar.includes(ourchannel.id)) {
                if (!pendingresetroom.includes(ourchannel.id)) {
                    pendingresetroom.push(ourchannel.id);
                    (async (ourchannel, channelid) => {
                        await Promise.all(ourchannel.permissionOverwrites.filter(role => role.id !== "389081897646424064" && role.id !== "294447183921414145" && role.id !== "500580990805213194" && role.id !== "467548950157852673" && role.id !== "369893791949127680" && role.id !== "286198213612929024").map(function (ch) {
                            return ch.delete();
                        })).catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                        await setuppermchannelsvar(ourchannel);
                        await ourchannel.edit({
                            channelID: ourchannel.id,
                            name: prefix + ":" + channelid + " [Пустая]",
                            userLimit: 0,
                            bitrate: 64000
                        }).catch(function (reason) {
                            console.log("EDITEEROR:" + reason);
                        });
                        if (pendingresetroom.includes(ourchannel.id))
                            pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));
                    })(ourchannel, channelid);
                } else console.log("IGNORE SETUP: " + ourchannel.name);
            } else if (coopvar.includes(ourchannel.id)) {
                if (!pendingresetroom.includes(ourchannel.id)) {
                    pendingresetroom.push(ourchannel.id);
                    (async (ourchannel, channelid) => {
                        await Promise.all(ourchannel.permissionOverwrites.filter(role => role.id !== "389081897646424064" && role.id !== "294447183921414145" && role.id !== "286198213612929024" && role.id !== "369893791949127680" && role.id !== "363054008564449281" && role.id !== "467548950157852673").map(function (ch) {
                            return ch.delete();
                        })).catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                        await setuppermcoop(ourchannel);
                        await ourchannel.edit({
                            channelID: ourchannel.id,
                            name: prefix + ":" + channelid + " [Пустая]",
                            userLimit: 0,
                            bitrate: 64000
                        }).catch(function (reason) {
                            console.log("EDITEEROR:" + reason);
                        });
                        if (pendingresetroom.includes(ourchannel.id))
                            pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));
                    })(ourchannel, channelid);
                } else console.log("IGNORE SETUP COOP: " + ourchannel.name);
            }
            if (!pendingmessagesdelete.includes(ourchannel.id)) {
                pendingmessagesdelete.push(ourchannel.id);
                (async (ourchannel) => {
                    try {
                        while (true) {
                            var breakthis = false;
                            await client.channels.get(vartextchannelid[ourchannel.id]).messages.fetch({
                                limit: 100
                            }).then(async (messages) => {
                                let messagesArr = messages.array();
                                let messageCount = messagesArr.length;
                                if (messageCount > 0) {
                                    console.log("LOOPING");
                                    await client.channels.get(vartextchannelid[ourchannel.id]).bulkDelete(messageCount);
                                    /*if (messageCount <= 100) {
                                        breakthis = true;
                                        return;
                                    }*/
                                } else {
                                    console.log("STOP7");
                                    breakthis = true;
                                    return;
                                }
                            });
                            if (breakthis) break;
                        }
                        /*await client.channels.get(vartextchannelid[ourchannel.id]).send(starttext, {
                            "split": true
                        }); DISABLE ROOM MESSAGE*/
                    } catch (err) {
                        console.log(ourchannel.id + ":" + vartextchannelid[ourchannel.id] + "ASYNC ERROR 5" + err);
                        console.log(vartextchannelid);
                    }
                    if (pendingmessagesdelete.includes(ourchannel.id))
                        pendingmessagesdelete = removealt(pendingmessagesdelete, pendingmessagesdelete.indexOf(ourchannel.id));
                })(ourchannel);
            } else console.log("IGNORE TEXT LOOP: " + ourchannel.name);
        }
    }
    async function workwithchannel(c, channelid, channejj, userid = 0, prefix = "") {
        if (pendingcreating.includes(c)) return undefined;
        if (!channelinwork.includes(c))
            channelinwork.push(c);
        /**/
        let ourchannel = client.channels.get(c);
        if (!client.channels.has(c)) {
            if (channelinwork.includes(ourchannel.id))
                channelinwork = removealt(channelinwork, channelinwork.indexOf(c));
            return undefined;
        }
        if (ourchannel == undefined) {
            if (channelinwork.includes(ourchannel.id))
                channelinwork = removealt(channelinwork, channelinwork.indexOf(c));
            return undefined;
        }

        if (ourchannel.members == undefined || ourchannel.members == null || Object.keys(ourchannel.members) == null || Object.keys(ourchannel.members) == undefined) {
            process.exit(1);
        }

        if (watchingmessagesuserid[c] != undefined) {
            if (!ourchannel.members.has(watchingmessagesuserid[c])) { //IF NO HOST
                let clientid = watchingmessagesuserid[c];
                if (rpgvar.includes(ourchannel.id)) {
                    if (!pendingresetroom.includes(ourchannel.id))
                        pendingresetroom.push(ourchannel.id);
                    (async (ourchannel) => {
                        await Promise.all(ourchannel.permissionOverwrites.filter(role => role.id !== "389081897646424064" && role.id !== "294447183921414145" && role.id !== "286198213612929024" && role.id !== "369893791949127680" //&& role.id !== "381084879623946244" 
                            // && role.id !== "381084562719113237" 
                            &&
                            role.id !== "381076993384382464" && role.id !== "467548950157852673").map(function (ch) {
                            return ch.delete();
                        })).catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                        await setuppermrpg(ourchannel);
                        if (pendingresetroom.includes(ourchannel.id))
                            pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));
                    })(ourchannel);
                } else if (channelsvar.includes(ourchannel.id)) {
                    if (!pendingresetroom.includes(ourchannel.id))
                        pendingresetroom.push(ourchannel.id);
                    (async (ourchannel) => {
                        await Promise.all(ourchannel.permissionOverwrites.filter(role => role.id !== "389081897646424064" && role.id !== "294447183921414145" && role.id !== "500580990805213194" && role.id !== "467548950157852673" && role.id !== "369893791949127680" && role.id !== "286198213612929024").map(function (ch) {
                            return ch.delete();
                        })).catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                        await setuppermchannelsvar(ourchannel);
                        if (pendingresetroom.includes(ourchannel.id))
                            pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));
                    })(ourchannel);
                } else if (coopvar.includes(ourchannel.id)) {
                    if (!pendingresetroom.includes(ourchannel.id))
                        pendingresetroom.push(ourchannel.id);
                    (async (ourchannel) => {
                        await Promise.all(ourchannel.permissionOverwrites.filter(role => role.id !== "389081897646424064" && role.id !== "294447183921414145" && role.id !== "286198213612929024" && role.id !== "369893791949127680" && role.id !== "363054008564449281" && role.id !== "467548950157852673").map(function (ch) {
                            return ch.delete();
                        })).catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                        await setuppermcoop(ourchannel);
                        if (pendingresetroom.includes(ourchannel.id))
                            pendingresetroom = removealt(pendingresetroom, pendingresetroom.indexOf(ourchannel.id));
                    })(ourchannel);
                }
                if (ourchannel.members.size > 0) {
                    // console.log("HOST LEAVE TRACK");
                    if (client.users.get(clientid))
                        client.guilds.get('286198213612929024').members.fetch(client.users.get(clientid)).then((member) => {
                            client.channels.get(vartextchannelid[c]).send("Хост " + member.displayName + " (" + clientid + ") покинул комнату.\nСтать хостом можно сделав сообщение о сборе в <#575310216351055882>, боту <@466307284977582109>, изменив название комнаты, кликнув на эмодзи 🚩 под сообщением.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            }).then(async (msg) => {
                                await msg.react("🚩");
                                await connection.query('DELETE FROM waitingforhosttotake WHERE chid=?', [c]);
                                await connection.query('INSERT INTO waitingforhosttotake SET chid=?,messageid=?', [c, msg.id]);
                                ignoresweeptakehost[c] = msg.id;
                            });
                        }).catch(e => {
                            if (e.code == 10007) {
                                client.channels.get(vartextchannelid[c]).send("Хост <@" + clientid + "> (" + clientid + ") покинул комнату.\nСтать хостом можно сделав сообщение о сборе в <#575310216351055882>, боту <@466307284977582109>, изменив название комнаты, кликнув на эмодзи 🚩 под сообщением.").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                }).then(async (msg) => {
                                    await msg.react("🚩");
                                    await connection.query('DELETE FROM waitingforhosttotake WHERE chid=?', [c]);
                                    await connection.query('INSERT INTO waitingforhosttotake SET chid=?,messageid=?', [c, msg.id]);
                                    ignoresweeptakehost[c] = msg.id;
                                });
                            } else {
                                throw e;
                            }
                        });
                }


                delete watchingmessagesmessageid[c];
                delete watchingmessagesroomid[c];
                delete watchingmessagesserverid[c];
                delete watchingmessagesuserid[c];
                if (activegamesroomsid.includes(c))
                    activegamesroomsid = removealt(activegamesroomsid, activegamesroomsid.indexOf(c));
                if (waitgamesroomsid.includes(c))
                    waitgamesroomsid = removealt(waitgamesroomsid, waitgamesroomsid.indexOf(c));
                if (rageroomsid.includes(c))
                    rageroomsid = removealt(rageroomsid, rageroomsid.indexOf(c));
                await connection.query('DELETE FROM rememberedgamenames WHERE roomid=?', [ourchannel.id]);
                console.log("DELETE remeber1" + ourchannel.name);

            }
        }

        if (channelsvar.includes(c)) {
            if (ourchannel.members.size <= 0) prefix = '🎀';

            else if (activegamesroomsid.includes(c) //|| (ourchannel.members.size != 0 && ourchannel.userLimit != 0 && ourchannel.userLimit <= ourchannel.members.size)
            ) prefix = '🎲';
            else if (waitgamesroomsid.includes(c)) prefix = '💤';
            else
                prefix = '⏳';
        } else if (coopvar.includes(ourchannel.id)) {
            if (ourchannel.members.size <= 0) prefix = 'O🎀';

            else if (activegamesroomsid.includes(c) //|| (ourchannel.members.size != 0 && ourchannel.userLimit != 0 && ourchannel.userLimit <= ourchannel.members.size)
            ) prefix = 'O🎮';
            else if (waitgamesroomsid.includes(c)) prefix = 'O💤';
            else
                prefix = 'O⏳';
        } else if (rpgvar.includes(c)) {
            if (ourchannel.members.size <= 0) prefix = 'R🎀';

            else if (activegamesroomsid.includes(c) //|| (ourchannel.members.size != 0 && ourchannel.userLimit != 0 && ourchannel.userLimit <= ourchannel.members.size)
            ) prefix = 'R🐲';
            else if (waitgamesroomsid.includes(c)) prefix = 'R💤';
            else
                prefix = 'R⏳';
        }

        if (ourchannel.members.size <= 0) {

            await fullsetup(ourchannel);
        } else {
            if (rageroomsid.includes(c))
                prefix = "😈" + prefix;

            let containsuser = false;
            let realhuman = false;
            let userarray = {};
            let userarrayreal = [];
            for (const [key, member] of ourchannel.members) {
                userarrayreal.push(member);
                if (userid > 0 && member.id == userid) {
                    userarray = member;
                    containsuser = true;
                }
                if (!botarray.includes(member.id)) {
                    realhuman = true;
                }
                if (realhuman && containsuser) break;

            }
            if (!realhuman) {
                for (let c of userarrayreal) {
                    await c.voice.setChannel("456447660531122187");
                    console.log("TRY MOVE");
                }


            } else {
                while (insetupafnct.includes(ourchannel.id)) await wait(350);
                insetupafnct.push(ourchannel.id);
                /* if (coopvar.includes(ourchannel.id)) {
                     prefix = 'O🎮';
                 }*/
                let rewritecheck = false;
                if (ourchannel.members.size == 1) {
                    //if (Object.keys(ourchannel.members)[0] == userid) rewritecheck = true;
                    if (containsuser) rewritecheck = true;
                }
                let [results, fields] = await connection.query('SELECT userid FROM rememberedgamenames WHERE roomid=?', [ourchannel.id]);
                var hostid = "";
                if (results.length == 0) rewritecheck = true;
                else {
                    if (rewritecheck != true) {
                        var ifexistsowner = false;
                        for (var i = 0; i < results.length; i++) {
                            if (results[i]["userid"] != userid && ourchannel.members.has(results[i]["userid"])) {
                                ifexistsowner = true;
                                hostid = results[i]["userid"];
                                break;
                            }
                        }
                        if (!ifexistsowner) rewritecheck = true;
                    }
                }
                let type = null;
                if (channelsvar.includes(ourchannel.id)) {
                    type = 0;
                } else if (rpgvar.includes(ourchannel.id)) {
                    type = 1;
                } else if (coopvar.includes(ourchannel.id)) {
                    type = 3;
                }
                if (type != null) {
                    let [results2, fields] = await connection.query('SELECT gamename,messageid,messageserverid,roomtype FROM rememberedgamenames WHERE userid=? AND roomid="" AND (roomtype=? OR roomtype=2)', [userid, type]);
                    if ((ourchannel.name.match(/\[Пустая\]/) || ourchannel.name == prefix + ":" + channelid || rewritecheck) && containsuser) {
                        if (results2[0] != undefined) {
                            //if (!ignorenameuntilchange.includes(ourchannel.id))
                            //  ignorenameuntilchange.push(ourchannel.id);


                            var string = results2[0]["gamename"].substring(0, 90);
                            ourchannel.name = prefix + ":" + channelid + " " + string;

                            await ourchannel.setName(prefix + ":" + channelid + " " + string);
                            await ourchannel.updateOverwrite(userid, {
                                MANAGE_CHANNELS: true,
                                MANAGE_WEBHOOKS: false,
                                CREATE_INSTANT_INVITE: true,
                                MANAGE_ROLES: true,
                                CONNECT: true,
                                VIEW_CHANNEL: true,
                                SPEAK: true,
                                USE_VAD: true,
                                MOVE_MEMBERS: true,
                                DEAFEN_MEMBERS: false,
                                MUTE_MEMBERS: false,
                                PRIORITY_SPEAKER: true
                            });
                            let mychannel = ourchannel;
                            if (channelsvar.includes(mychannel.id)) {

                                if (mychannel.permissionOverwrites.get('500580990805213194') != undefined) //НИ
                                    if (!(mychannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                        await mychannel.updateOverwrite('500580990805213194', {
                                            MANAGE_CHANNELS: false
                                        });
                                        console.log("initclosedelperm:" + mychannel.name);
                                    }
                            } else if (coopvar.includes(mychannel.id)) {
                                //var mychannel = ourchannel;
                                if (!(mychannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                    await mychannel.updateOverwrite('363054008564449281', {
                                        MANAGE_CHANNELS: false
                                    });
                                    //console.log("closeperm:" + c);
                                }
                            } else if (rpgvar.includes(mychannel.id)) {
                                // var mychannel = ourchannel;
                                if (!(mychannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                    await mychannel.updateOverwrite('381076993384382464', {
                                        MANAGE_CHANNELS: false
                                    });
                                    //console.log("closeperm:" + c);
                                }
                            }
                            if (client.channels.get(vartextchannelid[ourchannel.id]) == undefined) {
                                console.log("UNDEFINED:" + ourchannel.id + ":" + vartextchannelid[ourchannel.id]);
                                process.exit(1);
                            }
                            await client.channels.get(vartextchannelid[ourchannel.id]).updateOverwrite(userid, {
                                CREATE_INSTANT_INVITE: true,
                                MANAGE_CHANNELS: true,
                                MANAGE_WEBHOOKS: false,
                                MANAGE_ROLES: true,
                                VIEW_CHANNEL: true,
                                SEND_MESSAGES: true,
                                SEND_TTS_MESSAGES: true,
                                MANAGE_MESSAGES: true,
                                EMBED_LINKS: true,
                                ATTACH_FILES: true,
                                READ_MESSAGE_HISTORY: true,
                                MENTION_EVERYONE: true,
                                USE_EXTERNAL_EMOJIS: true,
                                ADD_REACTIONS: true
                            });

                            console.log("SET NAME:" + ourchannel.name);
                            /*if (watchingmessagesmessageid[c] != undefined) {
                                delete watchingmessagesmessageid[c];
                                delete watchingmessagesroomid[c];
								delete watchingmessagesserverid[c];
                                delete watchingmessagesuserid[c];
                                    }*/
                            let member = client.guilds.get('286198213612929024').members.get(userid);
                            //await client.guilds.get('286198213612929024').fetchMember(client.users.get(userid)).then(async (member) => {
                            let enableverb = false;
                            //let userclient = client.users.get(member.id);

                            // if (watchingmessagesuserid[c] != userid) {
                            //await client.channels.get(vartextchannelid[ourchannel.id]).send("Новый хост комнаты " + member.displayName + " (" + userid + "), желаем приятной игры!");
                            //enableverb = true;
                            // }
                            if (rpgvar.includes(ourchannel.id)) {
                                if (member.roles.has("381084562719113237")) {
                                    connection.query('UPDATE roleplay_masters SET isnotified=0,lastplay=? WHERE did=? AND status=1', [new Date().getTime(), userid]);
                                }
                            }
                            let needupd = false;
                            if (watchingmessagesuserid[c] != userid || !client.channels.get(vartextchannelid[c]).messages.has(watchingmessagesmessageid[c]) //POSSIBLY DOUBLE MESSAGE PROBLEM, ALREADY ON EMOJI CHECK WORK
                            ) {
                                if (watchingmessagesuserid[c] != userid) console.log("CREATE NEW HOST 1");
                                if (!client.channels.get(vartextchannelid[c]).messages.has(watchingmessagesmessageid[c])) console.log("CREATE NEW HOST 2");
                                await cleanoldmessages(client.channels.get(vartextchannelid[ourchannel.id]));
                                let constmessage = await client.channels.get(vartextchannelid[ourchannel.id]).send({
                                    reply: member.id,
                                    embed: {
                                        color: 7823103,
                                        /*author: {
                                            name: member.displayName.substring(0, 100),
                                            icon_url: member.user.displayAvatarURL
                                        },*/
                                        title: "Новый хост комнаты.",
                                        description: "Текущее состояние игры - \\⏳ (Набор игроков).\n Чтобы изменить статус на \\🎲 (Идёт игра) или \"перерыв\" (\\💤), кликни по соответствующему эмодзи внизу этого сообщения.\n Используйте 🔒, чтобы установить лимит равный количеству игроков в голосовой комнате. Снятие эмодзи уберёт лимит комнаты.\n Используйте \\😈 в объявлении, чтобы обозначить использование мата и контента нарушающего рамки приличия в голосовой и текстовой комнате.",
                                        timestamp: new Date(),
                                        footer: {
                                            text: member.id
                                        }
                                    }
                                }).catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log("Send Error");
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                                console.log("2HOST MESSAGE:" + ourchannel.name + " ID:" + constmessage.id);

                                enableverb = true;
                                watchingmessagesroomid[ourchannel.id] = ourchannel.id;
                                watchingmessagesuserid[c] = userid;
                                watchingmessagesserverid[c] = constmessage.channel.id;
                                watchingmessagesmessageid[c] = constmessage.id;
                                try {
                                    await constmessage.react("516658670524956692");
                                    await constmessage.react("🎲");
                                    await constmessage.react("💤");
                                    await constmessage.react("🔒");
                                } catch (err) {
                                    if (err.code != 10008) {
                                        console.log("emojissenderror");
                                        process.exit(1);
                                    } else {
                                        console.log("emojissenderroropen");
                                        console.log(err);
                                    }
                                }
                                if (activegamesroomsid.includes(c))
                                    activegamesroomsid = removealt(activegamesroomsid, activegamesroomsid.indexOf(c));
                                if (waitgamesroomsid.includes(c))
                                    waitgamesroomsid = removealt(waitgamesroomsid, waitgamesroomsid.indexOf(c));
                                if (rageroomsid.includes(c))
                                    rageroomsid = removealt(rageroomsid, rageroomsid.indexOf(c));

                                needupd = true;
                            }
                            console.log("updateinloop:" + ourchannel.name);
                            await connection.query('UPDATE rememberedgamenames SET rage=0,roomid=?,roomtype=?,messageid=?,messageserverid=? WHERE userid=? AND roomtype=?', [ourchannel.id, type, watchingmessagesmessageid[c], watchingmessagesserverid[c], userid, results2[0]["roomtype"]]);
                            let [results5, fields] = await connection.query('SELECT * FROM serverusers WHERE did=?', [member.id]);
                            if (results5.length != 0) {
                                if (results5[0].blockedroomusers != null) {
                                    let arrayofdata = JSON.parse(results5[0].blockedroomusers);
                                    for (let item of arrayofdata) {
                                        if (client.guilds.get('286198213612929024').members.has(item)) {
                                            let tempSelection = client.guilds.get('286198213612929024').members.get(item);
                                            if (ourchannel.permissionOverwrites.get(tempSelection.id) == undefined || ourchannel.permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT ||
                                                (!(ourchannel.permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT) && !(ourchannel.permissionOverwrites.get(tempSelection.id).deny & Permissions.FLAGS.CONNECT))) {
                                                await ourchannel.updateOverwrite(item, {
                                                    CONNECT: false
                                                });
                                                await client.channels.get(vartextchannelid[ourchannel.id]).send("Чёрный список: Выставлен запрет на присоединение для пользователя <@" + item + ">.").catch((err) => {
                                                    if (err.code == 50007) console.log("Can't send M!");
                                                    else {
                                                        console.log(err);
                                                        process.exit(1);
                                                    }
                                                });
                                            }
                                            if (ourchannel.members.has(item)) {
                                                await tempSelection.voice.setChannel("456447660531122187");
                                            }

                                        } else if (enableverb) await client.channels.get(vartextchannelid[ourchannel.id]).send("Чёрный список: Пользователь <@" + item + "> покинул сервер, пропускаем.").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    }
                                }

                            }

                            //}));
                            //task.Wait()
                            if (needupd)
                                await checkforemoji(ourchannel.id);
                            if (ourchannel.members.size == 0 //|| !ourchannel.members.has(userid.id) || watchingmessagesuserid[ourchannel.id] == undefined
                            ) {
                                console.log("startexec3");
                                if (firstimeroomsetup.includes(ourchannel.id))
                                    firstimeroomsetup = removealt(firstimeroomsetup, firstimeroomsetup.indexOf(ourchannel.id));
                            }
                        } else if (ourchannel.name.match(/\[Пустая\]/)
                            //&& (!ignorenameuntilchange.includes(ourchannel.id))
                        ) {
                            //connection.query('SELECT gamename,messageid,messageserverid,roomtype FROM rememberedgamenames WHERE roomid=?', [ourchannel.id], function (error, results2, fields) {
                            //if(results2[0] == undefined || results2[0]["roomid"] == undefined){
                            if (watchingmessagesroomid[ourchannel.id] == undefined) {
                                //console.log("Set name not empty1");
                                ourchannel.name = prefix + ":" + channelid;
                                await ourchannel.setName(prefix + ":" + channelid);
                                if (watchingmessagesmessageid[c] != undefined) {
                                    //watchingmessagesmessageid.splice(watchingmessagesmessageid.indexOf(c), 1);
                                    delete watchingmessagesmessageid[c];
                                    //watchingmessagesroomid.splice(watchingmessagesmessageid.indexOf(c), 1);
                                    delete watchingmessagesroomid[c];
                                    //watchingmessagesserverid.splice(watchingmessagesmessageid.indexOf(c), 1);
                                    delete watchingmessagesserverid[c];
                                    //watchingmessagesuserid.splice(watchingmessagesmessageid.indexOf(c), 1);
                                    delete watchingmessagesuserid[c];
                                }
                                if (activegamesroomsid.includes(c))
                                    activegamesroomsid = removealt(activegamesroomsid, activegamesroomsid.indexOf(c));
                                if (waitgamesroomsid.includes(c))
                                    waitgamesroomsid = removealt(waitgamesroomsid, waitgamesroomsid.indexOf(c));
                                if (rageroomsid.includes(c))
                                    rageroomsid = removealt(rageroomsid, rageroomsid.indexOf(c));
                                await connection.query('DELETE FROM rememberedgamenames WHERE roomid=? AND roomtype=?', [ourchannel.id, type]);
                                console.log("DELETE remeber2" + ourchannel.name);
                                pendingposchange.push(ourchannel.id);
                            }
                            //}
                            // });


                        }


                    } else if (ourchannel.name.match(/\[Пустая\]/)
                        //&& (!ignorenameuntilchange.includes(ourchannel.id))
                    ) {
                        if (watchingmessagesroomid[ourchannel.id] == undefined) {
                            //console.log("Set name not empty1");
                            //connection.query('SELECT gamename,messageid,messageserverid,roomtype FROM rememberedgamenames WHERE roomid=?', [ourchannel.id], function (error, results2, fields) {
                            // if(results2[0] == undefined || results2[0]["roomid"] == undefined){
                            ourchannel.name = prefix + ":" + channelid;
                            await ourchannel.setName(prefix + ":" + channelid);
                            if (watchingmessagesmessageid[c] != undefined) {
                                delete watchingmessagesmessageid[c];
                                delete watchingmessagesroomid[c];
                                delete watchingmessagesserverid[c];
                                delete watchingmessagesuserid[c];
                            }
                            if (activegamesroomsid.includes(c))
                                activegamesroomsid = removealt(activegamesroomsid, activegamesroomsid.indexOf(c));
                            if (waitgamesroomsid.includes(c))
                                waitgamesroomsid = removealt(waitgamesroomsid, waitgamesroomsid.indexOf(c));
                            if (rageroomsid.includes(c))
                                rageroomsid = removealt(rageroomsid, rageroomsid.indexOf(c));
                            //Может исполнится раньше фиксации объявления.
                            await connection.query('DELETE FROM rememberedgamenames WHERE roomid=? AND roomtype=?', [ourchannel.id, type]);
                            console.log("DELETE remeber3" + ourchannel.name);
                            //}
                            // });
                            pendingposchange.push(ourchannel.id);
                        }

                    } else if (containsuser && ifexistsowner && results2[0] != undefined) {
                        userarray.send('```fix\nВы зашли в комнату после подачи объявления, но хост уже определен, управление статусом комнаты есть только у хоста.\n```\nТекущий хост: <@' + hostid + '>').catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                    var compstring = prefix + ":" + channelid;
                    if ((!ourchannel.name.startsWith(prefix + ":" + channelid) && ourchannel.name[compstring.length + 1] == undefined) || (!ourchannel.name.startsWith(prefix + ":" + channelid + " ") && ourchannel.name[compstring.length + 1] != undefined)) {
                        var tempnamevar = ourchannel.name;
                        if (ourchannel.name.substring(0, 5).includes("😈"))
                            tempnamevar = tempnamevar.replace(/😈/, '');
                        if (ourchannel.name.substring(0, 5).includes("🎀"))
                            tempnamevar = tempnamevar.replace(/🎀/, '');
                        if (ourchannel.name.substring(0, 5).includes("⏳"))
                            tempnamevar = tempnamevar.replace(/⏳/, '');
                        if (ourchannel.name.substring(0, 5).includes("💤"))
                            tempnamevar = tempnamevar.replace(/💤/, '');
                        if (ourchannel.name.substring(0, 5).includes("🎮"))
                            tempnamevar = tempnamevar.replace(/🎮/, '');
                        if (ourchannel.name.substring(0, 5).includes("🐲"))
                            tempnamevar = tempnamevar.replace(/🐲/, '');
                        if (ourchannel.name.substring(0, 5).includes("🎲"))
                            tempnamevar = tempnamevar.replace(/🎲/, '');
                        if (rpgvar.includes(ourchannel.id)) {
                            tempnamevar = tempnamevar.replace("R:" + channelid, ':' + channelid);
                        } else if (coopvar.includes(ourchannel.id)) {
                            tempnamevar = tempnamevar.replace("O:" + channelid, ':' + channelid);
                        }
                        /* else if (channelsvar.includes(newChannel.id)) {
                                                tempnamevar = tempnamevar.replace(":" + (channelsvar.indexOf(newChannel.id) + 1), ':');
                                            }*/

                        if (tempnamevar.startsWith(":" + channelid)) {
                            if (tempnamevar.startsWith(":" + channelid + " "))
                                await ourchannel.setName(tempnamevar.replace(":" + channelid, prefix + ":" + channelid));
                            else {
                                await ourchannel.setName(tempnamevar.replace(":" + channelid, prefix + ":" + channelid + " "));
                                console.log("FIRE");
                            }
                        } else
                            await ourchannel.setName(prefix + ":" + channelid + " " + ourchannel.name.substring(0, 90));
                    }

                }
                if (channelinwork.includes(ourchannel.id))
                    channelinwork = removealt(channelinwork, channelinwork.indexOf(c));
                if (insetupafnct.includes(ourchannel.id)) {
                    insetupafnct = removealt(insetupafnct, insetupafnct.indexOf(ourchannel.id));
                }
                return false;


            }

        }
        if (channelinwork.includes(ourchannel.id))
            channelinwork = removealt(channelinwork, channelinwork.indexOf(c));
        return true;
    }

    function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }
    const Permissions = require('discord.js/src/util/Permissions');
    var blockingchangevar = false;
    var waittosortvar = true;
    var waittosortrpgvar = true;
    var waittosortcoopvar = true;
    var blockingchangevarrpg = false;
    var blockingchangevarcoop = false;
    var pendingposchange = [];
    var firstrunvar = true;
    var ignorechannelslist = [
        '363056744873721858',
        '382552139618189312',
        '393383348833353728',
        '381078005268742144',
        '399846088494022656',
        '423041976317902849',
        '450207850959208468',
        '456439303786987520',
        '456447660531122187',
        '472889032628764672'
    ];
    var blocksync = [];
    var channelscommandsignorelist = [
        "472889032628764672",
        "500590376672034816",
        "500589087716147200",
        "399846088494022656",
        "500589919752683521",
        "393383348833353728",
        "500588693845704704",
        "382552139618189312",
        "467435197496033291",
        "355732351864537098",
        "286198213612929024",
        "387347079883653120",
        "507153088898007074",
        "495355543934730241",
        "391687987970179074"
    ];
    async function syncrightsvoicetext(voicechannel, textchannel, type = 0, deletevar = false) {
        if (voicechannel == undefined) return;
        if ( //pendingsetupcoopvar.includes(voicechannel.id) || pendingsetupchannelsvar.includes(voicechannel.id) || pendingsetuprpg.includes(voicechannel.id) || 
            pendingresetroom.includes(voicechannel.id)) return;
        if (blocksync.includes(voicechannel.id) || blocksyncmainrights.includes(voicechannel.id)) return;
        let ourchannel = voicechannel;
        if (textchannel == undefined && !client.channels.has(vartextchannelid[ourchannel.id])) {
            console.log("undefined:" + ourchannel.id);
            if (channelsvar.includes(ourchannel.id)) {
                blocksync.push(voicechannel.id);
                let channelnumber = channelsvar.indexOf(ourchannel.id);
                await Promise.all(client.guilds.get('286198213612929024').channels.filter(ch => ch.type == "text" && ch.parentID == "362003311861301248" && !ignorechannelslist.includes(ch.id) && ch.name == '📝' + (channelnumber + 1) + '-инициализация').map(function (ch) {
                    return ch.delete();
                })).catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                if (watchingmessagesuserid[voicechannel.id] != undefined) {
                    await client.guilds.get('286198213612929024').channels.create('📝' + (channelnumber + 1) + '-инициализация', {
                        type: 'text',
                        parent: '362003311861301248',
                        permissionOverwrites: [{
                            id: watchingmessagesuserid[voicechannel.id],
                            allow: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'EMBED_LINKS'],
                            deny: ['MANAGE_WEBHOOKS'],
                        }],
                    }).then(async (ch) => {
                        await ch.edit({
                            position: client.channels.get('488477909518909470').position + (channelnumber + 1)
                        });
                        vartextchannelid[ourchannel.id] = ch.id;
                        textchannel = ch;
                        await connection.query('UPDATE roomslist SET textchannelid=? WHERE channelid=?', [ch.id, ourchannel.id]);
                    });
                } else {
                    await client.guilds.get('286198213612929024').channels.create('📝' + (channelnumber + 1) + '-инициализация', {
                        type: 'text',
                        parent: '362003311861301248',
                    }).then(async (ch) => {
                        await ch.edit({
                            position: client.channels.get('488477909518909470').position + (channelnumber + 1)
                        });
                        vartextchannelid[ourchannel.id] = ch.id;
                        textchannel = ch;
                        await connection.query('UPDATE roomslist SET textchannelid=? WHERE channelid=?', [ch.id, ourchannel.id]);
                    });
                }
            } else if (coopvar.includes(ourchannel.id)) {
                blocksync.push(voicechannel.id);
                let channelnumber = coopvar.indexOf(ourchannel.id);
                await Promise.all(client.guilds.get('286198213612929024').channels.filter(ch => ch.type == "text" && ch.parentID == "363054686460182528" && !ignorechannelslist.includes(ch.id) && ch.name == '📝' + (channelnumber + 1) + '-инициализация').map(function (ch) {
                    return ch.delete();
                })).catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                let permissionsetvar = [];
                if (watchingmessagesuserid[voicechannel.id] != undefined)
                    permissionsetvar = [{
                        id: watchingmessagesuserid[voicechannel.id],
                        allow: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'EMBED_LINKS'],
                        deny: ['MANAGE_WEBHOOKS'],
                    }];
                await client.guilds.get('286198213612929024').channels.create('📝' + (channelnumber + 1) + '-инициализация', {
                    type: 'text',
                    parent: '363054686460182528',
                    permissionOverwrites: permissionsetvar,
                }).then(async (ch) => {
                    await ch.edit({
                        position: client.channels.get('488480378017939476').position + (channelnumber + 1)
                    });
                    vartextchannelid[ourchannel.id] = ch.id;
                    textchannel = ch;
                    await connection.query('UPDATE roomslist SET textchannelid=? WHERE channelid=?', [ch.id, ourchannel.id]);
                });
            } else if (rpgvar.includes(ourchannel.id)) {
                blocksync.push(voicechannel.id);
                let channelnumber = rpgvar.indexOf(ourchannel.id);
                await Promise.all(client.guilds.get('286198213612929024').channels.filter(ch => ch.type == "text" && ch.parentID == "381083236455153686" && !ignorechannelslist.includes(ch.id) && ch.name == '📝' + (channelnumber + 1) + '-инициализация').map(function (ch) {
                    return ch.delete();
                })).catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                let permissionsetvar = [];
                if (watchingmessagesuserid[voicechannel.id] != undefined)
                    permissionsetvar = [{
                        id: watchingmessagesuserid[voicechannel.id],
                        allow: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'EMBED_LINKS'],
                        deny: ['MANAGE_WEBHOOKS'],
                    }];
                await client.guilds.get('286198213612929024').channels.create('📝' + (channelnumber + 1) + '-инициализация', {
                    type: 'text',
                    parent: '381083236455153686',
                    permissionOverwrites: permissionsetvar,
                }).then(async (ch) => {
                    await ch.edit({
                        position: client.channels.get('488480250678870016').position + (channelnumber + 1)
                    });
                    vartextchannelid[ourchannel.id] = ch.id;
                    textchannel = ch;

                    await connection.query('UPDATE roomslist SET textchannelid=? WHERE channelid=?', [ch.id, ourchannel.id]);
                });
            }
            //if (blocksync.includes(voicechannel.id))
            // blocksync = removealt(blocksync, blocksync.indexOf(voicechannel.id));
        }
        //if(voicechannel.members.size <= 0)return;
        if (textchannel == undefined) return;
        if (!blocksync.includes(voicechannel.id))
            blocksync.push(voicechannel.id);
        let textchannelnamenew = voicechannel.name.toLowerCase().replace(/[^0-9A-Za-zА-Яа-яЁё\s]/g, '').trim().replace(/\s+/g, "-").substring(0, 85).replace(/[-]+$/g, "");
        if (rageroomsid.includes(voicechannel.id)) {
            textchannelnamenew = "😈📝" + textchannelnamenew;
            if (!textchannel.nsfw) {
                console.log("SET NSFM TRUE: " + textchannelnamenew);
                await textchannel.setNSFW(true);
            }
        } else {
            textchannelnamenew = "📝" + textchannelnamenew;
            if (textchannel.nsfw) {
                console.log("SET NSFM FALSE: " + textchannelnamenew);
                await textchannel.setNSFW(false);
            }
        }

        if (textchannel.name != textchannelnamenew) {
            await textchannel.setName(textchannelnamenew);

            console.log("setname:" + textchannelnamenew);
        }
        //try {
        //if(voice)
        //var textchannel = vartextchannelid[vo]
        if (type == 0) {
            let perrmm = [];

            if (voicechannel.permissionOverwrites.get("389081897646424064") == undefined || !(voicechannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.SPEAK) || !(voicechannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.CONNECT) ||
                (voicechannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.VIEW_CHANNEL || voicechannel.permissionOverwrites.get("389081897646424064").deny & Permissions.FLAGS.VIEW_CHANNEL)
            ) {
                await voicechannel.updateOverwrite("389081897646424064", {
                    VIEW_CHANNEL: null,
                    CONNECT: true,
                    SPEAK: true
                });
                console.log("permupdate1");
            }
            if (voicechannel.permissionOverwrites.get("294447183921414145") == undefined || !(voicechannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.SPEAK) || !(voicechannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.CONNECT)

                ||
                (voicechannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.VIEW_CHANNEL || voicechannel.permissionOverwrites.get("294447183921414145").deny & Permissions.FLAGS.VIEW_CHANNEL)
            ) {
                await voicechannel.updateOverwrite("294447183921414145", {
                    VIEW_CHANNEL: null,
                    CONNECT: true,
                    SPEAK: true
                });
                console.log("permupdate4");
            }

            if (textchannel.permissionOverwrites.get("389081897646424064") == undefined || !(textchannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.READ_MESSAGE_HISTORY)) {
                await textchannel.updateOverwrite("389081897646424064", {
                    READ_MESSAGE_HISTORY: true
                });
                console.log("permupdate7");
            }
            if (textchannel.permissionOverwrites.get("389081897646424064") == undefined ||
                (textchannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.VIEW_CHANNEL || textchannel.permissionOverwrites.get("389081897646424064").deny & Permissions.FLAGS.VIEW_CHANNEL)
            ) {
                await textchannel.updateOverwrite("389081897646424064", {
                    VIEW_CHANNEL: null
                });
                console.log("permupdate8");
            }
            if (textchannel.permissionOverwrites.get("389081897646424064") == undefined || !(textchannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.MANAGE_MESSAGES)) {
                await textchannel.updateOverwrite("389081897646424064", {
                    MANAGE_MESSAGES: true
                });
                console.log("permupdate9");
            }
            if (textchannel.permissionOverwrites.get("294447183921414145") == undefined || !(textchannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.READ_MESSAGE_HISTORY)) {
                await textchannel.updateOverwrite("294447183921414145", {
                    READ_MESSAGE_HISTORY: true
                });
                console.log("permupdate10");
            }
            if (textchannel.permissionOverwrites.get("294447183921414145") == undefined ||
                (textchannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.VIEW_CHANNEL || textchannel.permissionOverwrites.get("294447183921414145").deny & Permissions.FLAGS.VIEW_CHANNEL)
            ) {
                await textchannel.updateOverwrite("294447183921414145", {
                    VIEW_CHANNEL: null
                });
                console.log("permupdate11");
            }
            if (textchannel.permissionOverwrites.get("294447183921414145") == undefined || !(textchannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.MANAGE_MESSAGES)) {
                await textchannel.updateOverwrite("294447183921414145", {
                    MANAGE_MESSAGES: true
                });
                console.log("permupdate12");
            }


            if (textchannel.permissionOverwrites.get("500580990805213194") == undefined || !(textchannel.permissionOverwrites.get("500580990805213194").allow & Permissions.FLAGS.READ_MESSAGE_HISTORY)) {
                await textchannel.updateOverwrite("500580990805213194", {
                    READ_MESSAGE_HISTORY: true
                });
                console.log("permupdate13");
            }
            if (textchannel.permissionOverwrites.get("500580990805213194") == undefined || !(textchannel.permissionOverwrites.get("500580990805213194").deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                await textchannel.updateOverwrite("500580990805213194", {
                    VIEW_CHANNEL: false
                });
                console.log("permupdate17");
            }
            if (textchannel.permissionOverwrites.get("286198213612929024") == undefined || !(textchannel.permissionOverwrites.get("286198213612929024").deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                await textchannel.updateOverwrite("286198213612929024", {
                    VIEW_CHANNEL: false
                });
                console.log("permupdate21");
            }
            perrmm.push("286198213612929024");
            perrmm.push("500580990805213194");
            perrmm.push("389081897646424064");
            perrmm.push("294447183921414145");

            let includesinvc = [];
            for (const [key, entry] of voicechannel.members) {
                includesinvc.push(entry.id);
                //if (!modarray.includes(entry.id)) {
                if (entry.id != "466293410848964609") {
                    perrmm.push(entry.id);
                    if (watchingmessagesuserid[voicechannel.id] == entry.id) {
                        if (voicechannel.permissionOverwrites.get(entry.id) != undefined && (!(voicechannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.MUTE_MEMBERS) || !(voicechannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.DEAFEN_MEMBERS) || !(voicechannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.MANAGE_WEBHOOKS))) {
                            await voicechannel.updateOverwrite(entry.id, {
                                MUTE_MEMBERS: false,
                                DEAFEN_MEMBERS: false,
                                MANAGE_WEBHOOKS: false
                            }).catch(async (error) => {
                                console.log("FFF1:" + error);
                                await client.guilds.get('286198213612929024').members.fetch();
                            });
                            await fixmute();
                            client.channels.get('389291844628119553').send("В комнате <#" + voicechannel.id + "> хоста <@" + watchingmessagesuserid[voicechannel.id] + "> были добавлены запрещённые права комнаты.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                            console.log("TRY BYPASS1");
                        }

                        if (textchannel.permissionOverwrites.get(entry.id) != undefined && textchannel.permissionOverwrites.get(entry.id).allow & Permissions.FLAGS.MANAGE_WEBHOOKS) {
                            await textchannel.updateOverwrite(entry.id, {
                                MANAGE_WEBHOOKS: false
                            }).catch(async (error) => {
                                console.log("FFF2:" + error);
                                await client.guilds.get('286198213612929024').members.fetch();
                            });
                            await fixmute();
                            client.channels.get('389291844628119553').send("В комнате <#" + textchannel.id + "> хоста <@" + watchingmessagesuserid[voicechannel.id] + "> были добавлены запрещённые права комнаты.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                            console.log("TRY BYPASS2");
                        }
                    }
                    if (textchannel.permissionOverwrites.get(entry.id) == undefined || !(textchannel.permissionOverwrites.get(entry.id).allow & Permissions.FLAGS.VIEW_CHANNEL)) {
                        await textchannel.updateOverwrite(entry.id, {
                            VIEW_CHANNEL: true
                        }).catch(async (error) => {
                            console.log("114:" + error);
                            await client.guilds.get('286198213612929024').members.fetch();
                        });
                        console.log("SET PERM 4 " + entry.id + " " + voicechannel.name);
                    }
                }
            }
            for (const [key, entry] of voicechannel.permissionOverwrites) {
                perrmm.push(entry.id);
                if (entry.allow & Permissions.FLAGS.SPEAK) {
                    if (textchannel.permissionOverwrites.get(entry.id) == undefined || !(textchannel.permissionOverwrites.get(entry.id).allow & Permissions.FLAGS.SEND_MESSAGES)) {
                        await textchannel.updateOverwrite(entry.id, {
                            SEND_MESSAGES: true
                        });
                        console.log("SET PERM 1 " + entry.id + " " + voicechannel.name);
                    }
                } else if (entry.deny & Permissions.FLAGS.SPEAK) {
                    if (textchannel.permissionOverwrites.get(entry.id) == undefined || !(textchannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.SEND_MESSAGES)) {
                        await textchannel.updateOverwrite(entry.id, {
                            SEND_MESSAGES: false
                        });
                        console.log("SET PERM 2 " + entry.id + " " + voicechannel.name);
                    }
                } else {
                    if (textchannel.permissionOverwrites.get(entry.id) == undefined || textchannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.SEND_MESSAGES || textchannel.permissionOverwrites.get(entry.id).allow & Permissions.FLAGS.SEND_MESSAGES) {
                        await textchannel.updateOverwrite(entry.id, {
                            SEND_MESSAGES: null
                        });
                        console.log("SET PERM 3 " + entry.id + " " + voicechannel.name);
                    }
                }
                if (entry.type == 'member' && !includesinvc.includes(entry.id) && voicechannel.permissionOverwrites.get(entry.id) != undefined && (textchannel.permissionOverwrites.get(entry.id) == undefined || !(textchannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.VIEW_CHANNEL))) {
                    await textchannel.updateOverwrite(entry.id, {
                        VIEW_CHANNEL: false
                    });
                    console.log("SET PERM 4 " + entry.id + " " + voicechannel.name);
                }
            }
            await Promise.all(textchannel.permissionOverwrites.filter(role => !perrmm.includes(role.id)).map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
        } else if (type == 1) {
            let perrmm = [];
            if (voicechannel.permissionOverwrites.get("389081897646424064") == undefined || !(voicechannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.SPEAK) || !(voicechannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.CONNECT) ||
                (voicechannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.VIEW_CHANNEL || voicechannel.permissionOverwrites.get("389081897646424064").deny & Permissions.FLAGS.VIEW_CHANNEL)
            ) {
                await voicechannel.updateOverwrite("389081897646424064", {
                    VIEW_CHANNEL: null,
                    CONNECT: true,
                    SPEAK: true
                });
                console.log("permupdater1");
            }
            if (voicechannel.permissionOverwrites.get("294447183921414145") == undefined || !(voicechannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.SPEAK) || !(voicechannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.CONNECT)

                ||
                (voicechannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.VIEW_CHANNEL || voicechannel.permissionOverwrites.get("294447183921414145").deny & Permissions.FLAGS.VIEW_CHANNEL)
            ) {
                await voicechannel.updateOverwrite("294447183921414145", {
                    VIEW_CHANNEL: null,
                    CONNECT: true,
                    SPEAK: true
                });
                console.log("permupdater4");
            }

            if (textchannel.permissionOverwrites.get("389081897646424064") == undefined || !(textchannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.READ_MESSAGE_HISTORY)) {
                await textchannel.updateOverwrite("389081897646424064", {
                    READ_MESSAGE_HISTORY: true
                });
                console.log("permupdater7");
            }
            if (textchannel.permissionOverwrites.get("389081897646424064") == undefined ||
                (textchannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.VIEW_CHANNEL || textchannel.permissionOverwrites.get("389081897646424064").deny & Permissions.FLAGS.VIEW_CHANNEL)
            ) {
                await textchannel.updateOverwrite("389081897646424064", {
                    VIEW_CHANNEL: null
                });
                console.log("permupdater8");
            }
            if (textchannel.permissionOverwrites.get("389081897646424064") == undefined || !(textchannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.MANAGE_MESSAGES)) {
                await textchannel.updateOverwrite("389081897646424064", {
                    MANAGE_MESSAGES: true
                });
                console.log("permupdater9");
            }
            if (textchannel.permissionOverwrites.get("294447183921414145") == undefined || !(textchannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.READ_MESSAGE_HISTORY)) {
                await textchannel.updateOverwrite("294447183921414145", {
                    READ_MESSAGE_HISTORY: true
                });
                console.log("permupdater10");
            }
            if (textchannel.permissionOverwrites.get("294447183921414145") == undefined ||
                (textchannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.VIEW_CHANNEL || textchannel.permissionOverwrites.get("294447183921414145").deny & Permissions.FLAGS.VIEW_CHANNEL)
            ) {
                await textchannel.updateOverwrite("294447183921414145", {
                    VIEW_CHANNEL: null
                });
                console.log("permupdater11");
            }
            if (textchannel.permissionOverwrites.get("294447183921414145") == undefined || !(textchannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.MANAGE_MESSAGES)) {
                await textchannel.updateOverwrite("294447183921414145", {
                    MANAGE_MESSAGES: true
                });
                console.log("permupdater12");
            }



            if (textchannel.permissionOverwrites.get("381076993384382464") == undefined || !(textchannel.permissionOverwrites.get("381076993384382464").allow & Permissions.FLAGS.READ_MESSAGE_HISTORY)) {
                await textchannel.updateOverwrite("381076993384382464", {
                    READ_MESSAGE_HISTORY: true
                });
                console.log("permupdater13");
            }
            if (textchannel.permissionOverwrites.get("381076993384382464") == undefined || !(textchannel.permissionOverwrites.get("381076993384382464").deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                await textchannel.updateOverwrite("381076993384382464", {
                    VIEW_CHANNEL: false
                });
                console.log("permupdater14");
            }
            /* if (textchannel.permissionOverwrites.get("381084879623946244") == undefined || !(textchannel.permissionOverwrites.get("381084879623946244").deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                 await textchannel.updateOverwrite("381084879623946244", {
                     VIEW_CHANNEL: false
                 });
                 console.log("permupdater15");
             }*/
            /*if (textchannel.permissionOverwrites.get("381084562719113237") == undefined || !(textchannel.permissionOverwrites.get("381084562719113237").deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                await textchannel.updateOverwrite("381084562719113237", {
                    VIEW_CHANNEL: false
                });
                console.log("permupdater16");
            }*/
            if (textchannel.permissionOverwrites.get("286198213612929024") == undefined || !(textchannel.permissionOverwrites.get("286198213612929024").deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                await textchannel.updateOverwrite("286198213612929024", {
                    VIEW_CHANNEL: false
                });
                console.log("permupdater21");
            }
            perrmm.push("286198213612929024");
            perrmm.push("381076993384382464");
            perrmm.push("389081897646424064");
            perrmm.push("294447183921414145");
            //perrmm.push("381084879623946244");
            //perrmm.push("381084562719113237");
            let includesinvc = [];
            for (const [key, entry] of voicechannel.members) {
                includesinvc.push(entry.id);
                //if (!modarray.includes(entry.id)) {
                if (entry.id != "466293410848964609") {
                    perrmm.push(entry.id);
                    if (watchingmessagesuserid[voicechannel.id] == entry.id) {
                        if (voicechannel.permissionOverwrites.get(entry.id) != undefined && (!(voicechannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.MUTE_MEMBERS) || !(voicechannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.DEAFEN_MEMBERS) || !(voicechannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.MANAGE_WEBHOOKS))) {
                            await voicechannel.updateOverwrite(entry.id, {
                                MUTE_MEMBERS: false,
                                DEAFEN_MEMBERS: false,
                                MANAGE_WEBHOOKS: false
                            }).catch(async (error) => {
                                console.log("FFF1:" + error);
                                await client.guilds.get('286198213612929024').members.fetch();
                            });
                            await fixmute();
                            client.channels.get('389291844628119553').send("В комнате <#" + voicechannel.id + "> хоста <@" + watchingmessagesuserid[voicechannel.id] + "> были добавлены запрещённые права комнаты.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                            console.log("TRY BYPASS1");
                        }

                        if (textchannel.permissionOverwrites.get(entry.id) != undefined && textchannel.permissionOverwrites.get(entry.id).allow & Permissions.FLAGS.MANAGE_WEBHOOKS) {
                            await textchannel.updateOverwrite(entry.id, {
                                MANAGE_WEBHOOKS: false
                            }).catch(async (error) => {
                                console.log("FFF2:" + error);
                                await client.guilds.get('286198213612929024').members.fetch();
                            });
                            await fixmute();
                            client.channels.get('389291844628119553').send("В комнате <#" + textchannel.id + "> хоста <@" + watchingmessagesuserid[voicechannel.id] + "> были добавлены запрещённые права комнаты.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                            console.log("TRY BYPASS2");
                        }
                    }
                    if (textchannel.permissionOverwrites.get(entry.id) == undefined || !(textchannel.permissionOverwrites.get(entry.id).allow & Permissions.FLAGS.VIEW_CHANNEL)) {
                        await textchannel.updateOverwrite(entry.id, {
                            VIEW_CHANNEL: true
                        }).catch(async (error) => {
                            console.log("112:" + error);
                            await client.guilds.get('286198213612929024').members.fetch();
                        });
                        console.log("SET PERM 4 2 " + entry.id + " " + voicechannel.name);
                    }
                }
            }
            for (const [key, entry] of voicechannel.permissionOverwrites) {
                if (entry.type == "member" && !client.users.has(entry.id)) {
                    console.log("bugged:" + entry.id);
                    /*  if (perrmm.includes(entry.id))perrmm = removealt(perrmm, perrmm.indexOf(entry.id));
                      console.log("leavesyncuser:"+entry.id);*/
                } else {
                    //console.log(entry.type);
                    perrmm.push(entry.id);
                    if (entry.allow & Permissions.FLAGS.SPEAK) {
                        if (textchannel.permissionOverwrites.get(entry.id) == undefined || !(textchannel.permissionOverwrites.get(entry.id).allow & Permissions.FLAGS.SEND_MESSAGES)) {
                            await textchannel.updateOverwrite(entry.id, {
                                SEND_MESSAGES: true
                            });
                            console.log("SET PERM 1 " + entry.id + " " + voicechannel.name);
                        }
                    } else if (entry.deny & Permissions.FLAGS.SPEAK) {
                        if (textchannel.permissionOverwrites.get(entry.id) == undefined || !(textchannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.SEND_MESSAGES)) {
                            await textchannel.updateOverwrite(entry.id, {
                                SEND_MESSAGES: false
                            });
                            console.log("SET PERM 2 " + entry.id + " " + voicechannel.name);
                        }
                    } else {
                        if (textchannel.permissionOverwrites.get(entry.id) == undefined || textchannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.SEND_MESSAGES || textchannel.permissionOverwrites.get(entry.id).allow & Permissions.FLAGS.SEND_MESSAGES) {
                            await textchannel.updateOverwrite(entry.id, {
                                SEND_MESSAGES: null
                            });
                            console.log("SET PERM 3 " + entry.id + " " + voicechannel.name);
                        }
                    }
                    if (entry.type == 'member' && !includesinvc.includes(entry.id) && voicechannel.permissionOverwrites.get(entry.id) != undefined && (textchannel.permissionOverwrites.get(entry.id) == undefined || !(textchannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.VIEW_CHANNEL))) {
                        await textchannel.updateOverwrite(entry.id, {
                            VIEW_CHANNEL: false
                        });
                        console.log("SET PERM 4 " + entry.id + " " + voicechannel.name);
                    }
                }
            }
            await Promise.all(textchannel.permissionOverwrites.filter(role => !perrmm.includes(role.id)).map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
        } else if (type == 2) {
            let perrmm = [];
            if (voicechannel.permissionOverwrites.get("389081897646424064") == undefined || !(voicechannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.SPEAK) || !(voicechannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.CONNECT) ||
                (voicechannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.VIEW_CHANNEL || voicechannel.permissionOverwrites.get("389081897646424064").deny & Permissions.FLAGS.VIEW_CHANNEL)
            ) {
                await voicechannel.updateOverwrite("389081897646424064", {
                    VIEW_CHANNEL: null,
                    CONNECT: true,
                    SPEAK: true
                });
                console.log("permupdateo1");
            }
            if (voicechannel.permissionOverwrites.get("294447183921414145") == undefined || !(voicechannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.SPEAK) || !(voicechannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.CONNECT)

                ||
                (voicechannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.VIEW_CHANNEL || voicechannel.permissionOverwrites.get("294447183921414145").deny & Permissions.FLAGS.VIEW_CHANNEL)
            ) {
                await voicechannel.updateOverwrite("294447183921414145", {
                    VIEW_CHANNEL: null,
                    CONNECT: true,
                    SPEAK: true
                });
                console.log("permupdateo4");
            }

            if (textchannel.permissionOverwrites.get("389081897646424064") == undefined || !(textchannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.READ_MESSAGE_HISTORY)) {
                await textchannel.updateOverwrite("389081897646424064", {
                    READ_MESSAGE_HISTORY: true
                });
                console.log("permupdateo7");
            }
            if (textchannel.permissionOverwrites.get("389081897646424064") == undefined ||
                (textchannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.VIEW_CHANNEL || textchannel.permissionOverwrites.get("389081897646424064").deny & Permissions.FLAGS.VIEW_CHANNEL)
            ) {
                await textchannel.updateOverwrite("389081897646424064", {
                    VIEW_CHANNEL: null
                });
                console.log("permupdateo8");
            }
            if (textchannel.permissionOverwrites.get("389081897646424064") == undefined || !(textchannel.permissionOverwrites.get("389081897646424064").allow & Permissions.FLAGS.MANAGE_MESSAGES)) {
                await textchannel.updateOverwrite("389081897646424064", {
                    MANAGE_MESSAGES: true
                });
                console.log("permupdateo9");
            }
            if (textchannel.permissionOverwrites.get("294447183921414145") == undefined || !(textchannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.READ_MESSAGE_HISTORY)) {
                await textchannel.updateOverwrite("294447183921414145", {
                    READ_MESSAGE_HISTORY: true
                });
                console.log("permupdateo10");
            }
            if (textchannel.permissionOverwrites.get("294447183921414145") == undefined ||
                (textchannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.VIEW_CHANNEL || textchannel.permissionOverwrites.get("294447183921414145").deny & Permissions.FLAGS.VIEW_CHANNEL)
            ) {
                await textchannel.updateOverwrite("294447183921414145", {
                    VIEW_CHANNEL: null
                });
                console.log("permupdateo11");
            }
            if (textchannel.permissionOverwrites.get("294447183921414145") == undefined || !(textchannel.permissionOverwrites.get("294447183921414145").allow & Permissions.FLAGS.MANAGE_MESSAGES)) {
                await textchannel.updateOverwrite("294447183921414145", {
                    MANAGE_MESSAGES: true
                });
                console.log("permupdateo12");
            }


            if (textchannel.permissionOverwrites.get("363054008564449281") == undefined || !(textchannel.permissionOverwrites.get("363054008564449281").allow & Permissions.FLAGS.READ_MESSAGE_HISTORY)) {
                await textchannel.updateOverwrite("363054008564449281", {
                    READ_MESSAGE_HISTORY: true
                });
                console.log("permupdateo13");
            }
            if (textchannel.permissionOverwrites.get("363054008564449281") == undefined || !(textchannel.permissionOverwrites.get("363054008564449281").deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                await textchannel.updateOverwrite("363054008564449281", {
                    VIEW_CHANNEL: false
                });
                console.log("permupdateo14");
            }
            if (textchannel.permissionOverwrites.get("286198213612929024") == undefined || !(textchannel.permissionOverwrites.get("286198213612929024").deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                await textchannel.updateOverwrite("286198213612929024", {
                    VIEW_CHANNEL: false
                });
                console.log("permupdateo21");
            }
            perrmm.push("286198213612929024");
            perrmm.push("389081897646424064");
            perrmm.push("294447183921414145");
            perrmm.push("363054008564449281");
            let includesinvc = [];
            for (const [key, entry] of voicechannel.members) {
                includesinvc.push(entry.id);
                //if (!modarray.includes(entry.id)) {
                if (entry.id != "466293410848964609") {
                    perrmm.push(entry.id);
                    if (watchingmessagesuserid[voicechannel.id] == entry.id) {
                        if (voicechannel.permissionOverwrites.get(entry.id) != undefined && (!(voicechannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.MUTE_MEMBERS) || !(voicechannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.DEAFEN_MEMBERS) || !(voicechannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.MANAGE_WEBHOOKS))) {
                            await voicechannel.updateOverwrite(entry.id, {
                                MUTE_MEMBERS: false,
                                DEAFEN_MEMBERS: false,
                                MANAGE_WEBHOOKS: false
                            }).catch(async (error) => {
                                console.log("FFF1:" + error);
                                await client.guilds.get('286198213612929024').members.fetch();
                            });
                            await fixmute();
                            client.channels.get('389291844628119553').send("В комнате <#" + voicechannel.id + "> хоста <@" + watchingmessagesuserid[voicechannel.id] + "> были добавлены запрещённые права комнаты.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                            console.log("TRY BYPASS1");
                        }

                        if (textchannel.permissionOverwrites.get(entry.id) != undefined && textchannel.permissionOverwrites.get(entry.id).allow & Permissions.FLAGS.MANAGE_WEBHOOKS) {
                            await textchannel.updateOverwrite(entry.id, {
                                MANAGE_WEBHOOKS: false
                            }).catch(async (error) => {
                                console.log("FFF2:" + error);
                                await client.guilds.get('286198213612929024').members.fetch();
                            });
                            await fixmute();
                            client.channels.get('389291844628119553').send("В комнате <#" + textchannel.id + "> хоста <@" + watchingmessagesuserid[voicechannel.id] + "> были добавлены запрещённые права комнаты.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                            console.log("TRY BYPASS2");
                        }
                    }
                    if (textchannel.permissionOverwrites.get(entry.id) == undefined || !(textchannel.permissionOverwrites.get(entry.id).allow & Permissions.FLAGS.VIEW_CHANNEL)) {
                        await textchannel.updateOverwrite(entry.id, {
                            VIEW_CHANNEL: true
                        }).catch(async (error) => {
                            console.log("113:" + error);
                            await client.guilds.get('286198213612929024').members.fetch();
                        });
                        console.log("SET PERM 4 2 " + entry.id + " " + voicechannel.name);
                    }
                }
            }
            for (const [key, entry] of voicechannel.permissionOverwrites) {
                perrmm.push(entry.id);
                if (entry.allow & Permissions.FLAGS.SPEAK) {
                    if (textchannel.permissionOverwrites.get(entry.id) == undefined || !(textchannel.permissionOverwrites.get(entry.id).allow & Permissions.FLAGS.SEND_MESSAGES)) {
                        await textchannel.updateOverwrite(entry.id, {
                            SEND_MESSAGES: true
                        });
                        console.log("SET PERM 1 " + entry.id + " " + voicechannel.name);
                    }
                } else if (entry.deny & Permissions.FLAGS.SPEAK) {
                    if (textchannel.permissionOverwrites.get(entry.id) == undefined || !(textchannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.SEND_MESSAGES)) {
                        await textchannel.updateOverwrite(entry.id, {
                            SEND_MESSAGES: false
                        });
                        console.log("SET PERM 2 " + entry.id + " " + voicechannel.name);
                    }
                } else {
                    if (textchannel.permissionOverwrites.get(entry.id) == undefined || textchannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.SEND_MESSAGES || textchannel.permissionOverwrites.get(entry.id).allow & Permissions.FLAGS.SEND_MESSAGES) {
                        await textchannel.updateOverwrite(entry.id, {
                            SEND_MESSAGES: null
                        });
                        console.log("SET PERM 3 " + entry.id + " " + voicechannel.name);
                    }
                }
                if (entry.type == 'member' && !includesinvc.includes(entry.id) && voicechannel.permissionOverwrites.get(entry.id) != undefined && (textchannel.permissionOverwrites.get(entry.id) == undefined || !(textchannel.permissionOverwrites.get(entry.id).deny & Permissions.FLAGS.VIEW_CHANNEL))) {
                    await textchannel.updateOverwrite(entry.id, {
                        VIEW_CHANNEL: false
                    });
                    console.log("SET PERM 4 " + entry.id + " " + voicechannel.name);
                }
            }
            await Promise.all(textchannel.permissionOverwrites.filter(role => !perrmm.includes(role.id)).map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR1:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
        }
        if (voicechannel.members.size == 0) {
            if (type == 0) { //Настольные игры
                if (textchannel.permissionOverwrites.get('500580990805213194') == undefined ||
                    textchannel.permissionOverwrites.get('500580990805213194').allow == 0 ||
                    textchannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.MANAGE_ROLES || (textchannel.permissionOverwrites.get('500580990805213194').deny != 0 && textchannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_ROLES) ||
                    textchannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.MANAGE_WEBHOOKS || (textchannel.permissionOverwrites.get('500580990805213194').deny != 0 && textchannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_WEBHOOKS) ||
                    textchannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.MANAGE_CHANNELS || (textchannel.permissionOverwrites.get('500580990805213194').deny != 0 && textchannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_CHANNELS) ||
                    textchannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.MANAGE_MESSAGES || (textchannel.permissionOverwrites.get('500580990805213194').deny != 0 && textchannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_MESSAGES) ||
                    textchannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.CREATE_INSTANT_INVITE || (textchannel.permissionOverwrites.get('500580990805213194').deny != 0 && textchannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE) ||
                    textchannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.SEND_TTS_MESSAGES || (textchannel.permissionOverwrites.get('500580990805213194').deny != 0 && textchannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.SEND_TTS_MESSAGES) ||
                    !(textchannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.ADD_REACTIONS) ||
                    !(textchannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.EMBED_LINKS) ||
                    !(textchannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.ATTACH_FILES) ||
                    !(textchannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.READ_MESSAGE_HISTORY) ||
                    !(textchannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.MENTION_EVERYONE) ||
                    !(textchannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.USE_EXTERNAL_EMOJIS)
                )
                    await textchannel.updateOverwrite('500580990805213194', {
                        MANAGE_ROLES: null,
                        MANAGE_WEBHOOKS: null,
                        MANAGE_CHANNELS: null,
                        MANAGE_MESSAGES: null,
                        CREATE_INSTANT_INVITE: null,
                        SEND_TTS_MESSAGES: null,
                        ADD_REACTIONS: true,
                        EMBED_LINKS: true,
                        ATTACH_FILES: true,
                        READ_MESSAGE_HISTORY: true,
                        MENTION_EVERYONE: true,
                        USE_EXTERNAL_EMOJIS: true
                    }).catch(function (reason) {
                        console.log("ERRORsettxtdefaultrights1:" + reason);
                        channel.delete().catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                        process.exit(1);
                    }).then(() => {
                        console.log("settxtdefaultrights 1");
                    });

            } else if (type == 1) { //Настольные ролевые игры

                if (textchannel.permissionOverwrites.get('381076993384382464') == undefined ||
                    textchannel.permissionOverwrites.get('381076993384382464').allow == 0 ||
                    textchannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.MANAGE_ROLES || (textchannel.permissionOverwrites.get('381076993384382464').deny != 0 && textchannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_ROLES) ||
                    textchannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.MANAGE_WEBHOOKS || (textchannel.permissionOverwrites.get('381076993384382464').deny != 0 && textchannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_WEBHOOKS) ||
                    textchannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.MANAGE_CHANNELS || (textchannel.permissionOverwrites.get('381076993384382464').deny != 0 && textchannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_CHANNELS) ||
                    textchannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.MANAGE_MESSAGES || (textchannel.permissionOverwrites.get('381076993384382464').deny != 0 && textchannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_MESSAGES) ||
                    textchannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.CREATE_INSTANT_INVITE || (textchannel.permissionOverwrites.get('381076993384382464').deny != 0 && textchannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE) ||
                    textchannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.SEND_TTS_MESSAGES || (textchannel.permissionOverwrites.get('381076993384382464').deny != 0 && textchannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.SEND_TTS_MESSAGES) ||
                    !(textchannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.ADD_REACTIONS) ||
                    !(textchannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.EMBED_LINKS) ||
                    !(textchannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.ATTACH_FILES) ||
                    !(textchannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.READ_MESSAGE_HISTORY) ||
                    !(textchannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.MENTION_EVERYONE) ||
                    !(textchannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.USE_EXTERNAL_EMOJIS)
                )
                    await textchannel.updateOverwrite('381076993384382464', {
                        MANAGE_ROLES: null,
                        MANAGE_WEBHOOKS: null,
                        MANAGE_CHANNELS: null,
                        MANAGE_MESSAGES: null,
                        CREATE_INSTANT_INVITE: null,
                        SEND_TTS_MESSAGES: null,
                        ADD_REACTIONS: true,
                        EMBED_LINKS: true,
                        ATTACH_FILES: true,
                        READ_MESSAGE_HISTORY: true,
                        MENTION_EVERYONE: true,
                        USE_EXTERNAL_EMOJIS: true
                    }).catch(function (reason) {
                        console.log("ERRORsettxtdefaultrights2:" + reason);
                        channel.delete().catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                        process.exit(1);
                    }).then(() => {
                        console.log("settxtdefaultrights 2");
                    });
            } else if (type == 2) { //Не настольные игры
                if (textchannel.permissionOverwrites.get('363054008564449281') == undefined ||
                    textchannel.permissionOverwrites.get('363054008564449281').allow == 0 ||
                    textchannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.MANAGE_ROLES || (textchannel.permissionOverwrites.get('363054008564449281').deny != 0 && textchannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_ROLES) ||
                    textchannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.MANAGE_WEBHOOKS || (textchannel.permissionOverwrites.get('363054008564449281').deny != 0 && textchannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_WEBHOOKS) ||
                    textchannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.MANAGE_CHANNELS || (textchannel.permissionOverwrites.get('363054008564449281').deny != 0 && textchannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_CHANNELS) ||
                    textchannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.MANAGE_MESSAGES || (textchannel.permissionOverwrites.get('363054008564449281').deny != 0 && textchannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_MESSAGES) ||
                    textchannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.CREATE_INSTANT_INVITE || (textchannel.permissionOverwrites.get('363054008564449281').deny != 0 && textchannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE) ||
                    textchannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.SEND_TTS_MESSAGES || (textchannel.permissionOverwrites.get('363054008564449281').deny != 0 && textchannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.SEND_TTS_MESSAGES) ||
                    !(textchannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.ADD_REACTIONS) ||
                    !(textchannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.EMBED_LINKS) ||
                    !(textchannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.ATTACH_FILES) ||
                    !(textchannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.READ_MESSAGE_HISTORY) ||
                    !(textchannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.MENTION_EVERYONE) ||
                    !(textchannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.USE_EXTERNAL_EMOJIS)
                )
                    await textchannel.updateOverwrite('363054008564449281', {
                        MANAGE_ROLES: null,
                        MANAGE_WEBHOOKS: null,
                        MANAGE_CHANNELS: null,
                        MANAGE_MESSAGES: null,
                        CREATE_INSTANT_INVITE: null,
                        SEND_TTS_MESSAGES: null,
                        ADD_REACTIONS: true,
                        EMBED_LINKS: true,
                        ATTACH_FILES: true,
                        READ_MESSAGE_HISTORY: true,
                        MENTION_EVERYONE: true,
                        USE_EXTERNAL_EMOJIS: true
                    }).catch(function (reason) {
                        console.log("ERROR3settxtdefaultrights3:" + reason);
                        channel.delete().catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                        process.exit(1);
                    }).then(() => {
                        console.log("settxtdefaultrights 3");
                    });
            }
        }

        if (blocksync.includes(voicechannel.id))
            blocksync = removealt(blocksync, blocksync.indexOf(voicechannel.id));
    }
    var modarray = [];
    var channelisvaremptyroom;
    var coopchannelisvaremptyroom;
    var rpgchannelisvaremptyroom;
    var freeplayerschannels = ["456439303786987520", "450207850959208468", "472897474298904591"];
    async function movebotsfromfreeplayers() {
        /*let [key, members] = client.channels.get("456439303786987520").members;

        let arrayofnewmembers = members.slice(0);
        [key, members] = client.channels.get("450207850959208468").members;
        arrayofnewmembers = arrayofnewmembers.concat(members);
        [key, members] = client.channels.get("472897474298904591").members;
        arrayofnewmembers = arrayofnewmembers.concat(members);

        arrayofchannels = arrayofchannels.concat(coopvar);
        arrayofchannels = arrayofchannels.concat(rpgvar);*/
        for (let chid of freeplayerschannels) {
            for (const [key, newMember] of client.channels.get(chid).members) {
                if (newMember.user.bot)
                    await newMember.voice.setChannel("456447660531122187");
            }
        }
    }
    async function checkforswaptoemptyroom() {
        for (const [key, newMember] of client.channels.get("479323876137107467").members) {
            await initusertransmission(newMember);
        }
        for (const [key, newMember] of client.channels.get("479327212596625409").members) {
            await initusertransmission(newMember, 1);
        }
        for (const [key, newMember] of client.channels.get("479326920035794944").members) {
            await initusertransmission(newMember, 2);
        }
    }
    async function initusertransmission(newMember, type = 0) {
        if (client.guilds.get('286198213612929024') == undefined || client.guilds.get('286198213612929024').members == undefined) {
            console.log("Error initusertransmission!");
            process.exit(1);
        } else {
            if (newMember != undefined && newMember != null && newMember.id != undefined) {
                if (type == 0) {
                    if (!client.channels.get("479323876137107467").members.has(newMember.id)) return;
                    if (channelisvaremptyroom !== undefined && channelisvaremptyroom.members.size == 0)
                        await newMember.voice.setChannel(channelisvaremptyroom.id);
                    else {
                        await wait(1000);
                        await initusertransmission(newMember, type);
                    }
                } else if (type == 1) {
                    if (!client.channels.get("479327212596625409").members.has(newMember.id)) return;
                    if (coopchannelisvaremptyroom !== undefined && coopchannelisvaremptyroom.members.size == 0)
                        await newMember.voice.setChannel(coopchannelisvaremptyroom.id);
                    else {
                        await wait(1000);
                        await initusertransmission(newMember, type);
                    }
                } else if (type == 2) {
                    if (!client.channels.get("479326920035794944").members.has(newMember.id)) return;
                    if (rpgchannelisvaremptyroom !== undefined && rpgchannelisvaremptyroom.members.size == 0)
                        await newMember.voice.setChannel(rpgchannelisvaremptyroom.id);
                    else {
                        await wait(1000);
                        await initusertransmission(newMember, type);
                    }
                }
            }
        }
    }

    function wait(mil) {
        return new Promise(done => setTimeout(done, mil));
    }
    //const wait = new Promise(done => setTimeout(done, 5000));
    client.on('voiceStateUpdate', async (oldMember, newMember) => {

        if (newMember != undefined && newMember != null && newMember.member != undefined && newMember.member != null && newMember.member.id != null && newMember.member.id != undefined) {
            await checkchannels(newMember.member.id);
            if (newMember.channelID == "479323876137107467")
                await initusertransmission(newMember.member);
            else if (newMember.channelID == "479327212596625409")
                await initusertransmission(newMember.member, 1);
            else if (newMember.channelID == "479326920035794944")
                await initusertransmission(newMember.member, 2);

            if (freeplayerschannels.includes(newMember.channelID)) {
                if (newMember.member.user.bot)
                    await newMember.member.voice.setChannel("456447660531122187");
            }
        }
    });
    var imcheckchannels = true;
    let firstimeroomsetup = [];
    async function checkchannels(userid = 0) {
        if (!imcheckchannels) return
        imcheckchannels = false;
        let channels = client.guilds.get('286198213612929024').channels;
        //var channels = client.guilds.get('286198213612929024').channels.forEach((channel) => {
        /*   if (channel.parentID == '362003311861301248') {
               if (!ignorechannelslist.includes(channel.id) && !channelsvar.includes(channel.id) && !rpgvar.includes(channel.id) && !coopvar.includes(channel.id)) {
                   channel.delete().catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             }).catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             });
               }
           }*/
        //});


        let channelid = 1;
        let openindexofchannel = 3;
        let openchannelarray = [];
        let firstopenchannel;
        let firstopen = false;
        for (let c of channelsvar) {
            if (client.channels.has(c)) {
                let mychannel = client.channels.get(c);

                let result = await workwithchannel(c, channelid, channels, userid);
                if (mychannel != undefined) {
                    modarray.forEach((mem) => {
                        if (watchingmessagesuserid[mychannel.id] != undefined && watchingmessagesuserid[mychannel.id] != mem && mychannel.permissionOverwrites.get(mem) != undefined) {
                            client.channels.get('389291844628119553').send("В комнате <#" + mychannel.id + "> хоста <@" + watchingmessagesuserid[mychannel.id] + "> был добавлен модератор / администратор <@" + mem + "> в права, бот удалил его из прав.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                            mychannel.permissionOverwrites.get(mem).delete().catch(async function (reason) {
                                console.log("ERROR1:" + reason);
                                if (reason.code != 10008 && reason.code != 10003) {
                                    console.log("Emoji message get error.");
                                    console.log(reason);
                                    process.exit(1);
                                }
                            });
                        }
                    });


                    if ((result && !firstopen) || !result) {

                        if (result && !firstopen) {
                            firstopenchannel = mychannel;
                            channelisvaremptyroom = mychannel;

                            firstopen = true;
                        }
                        if (mychannel.permissionOverwrites.get('500580990805213194') == null) {
                            (async (mychannel) => {
                                await setuppermchannelsvar(mychannel);
                            })(mychannel);
                        } else {
                            if ((firstopenchannel != undefined && firstopenchannel.id == mychannel.id) || mychannel.members.size > 0) {
                                //console.log("openperm:" + mychannel.name);
                                if (mychannel.permissionOverwrites.get('500580990805213194') != undefined) //НИ
                                    if (!(mychannel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.VIEW_CHANNEL)) {
                                        await mychannel.updateOverwrite('500580990805213194', {
                                            VIEW_CHANNEL: true
                                        });
                                        console.log("openperm:" + mychannel.name);
                                    }
                            } else {
                                if (mychannel.permissionOverwrites.get('500580990805213194') != undefined) //НИ
                                    if (!(mychannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                                        await mychannel.updateOverwrite('500580990805213194', {
                                            VIEW_CHANNEL: false
                                        });
                                        console.log("closeperm:" + mychannel.name);
                                    }
                            }
                        }
                        if (mychannel.parentID != 362003311861301248) {
                            await mychannel.setParent('362003311861301248');
                            console.log("moveopen:" + c);
                        }
                        if (!firstimeroomsetup.includes(mychannel.id) && mychannel.members.size == 0) {
                            firstimeroomsetup.push(mychannel.id);
                            fullsetup(mychannel, true);
                        }
                        openchannelarray.push(mychannel);
                    } else {
                        if (mychannel.permissionOverwrites.get('500580990805213194') == null) {
                            (async (mychannel) => {
                                await setuppermchannelsvar(mychannel);
                            })(mychannel);
                        } else {
                            if (mychannel.permissionOverwrites.get('500580990805213194') != undefined) //НИ
                                if (!(mychannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                                    await mychannel.updateOverwrite('500580990805213194', {
                                        VIEW_CHANNEL: false
                                    });
                                    console.log("closeperm:" + mychannel.name);
                                }
                        }
                        if (mychannel.parentID != 362003311861301248) {
                            await mychannel.setParent('362003311861301248');

                            console.log("movehide:" + c);
                        }
                        if (!firstimeroomsetup.includes(mychannel.id) && mychannel.members.size == 0) {
                            firstimeroomsetup.push(mychannel.id);
                            fullsetup(mychannel, true);
                        }

                    }
                }



            } else {
                if (!pendingcreating.includes(c))
                    await checkchannelsdeletion(c);
            }
            channelid++;
        }
        if (waittosortvar) {
            let localvar = channelsvar;
            //localvar = localvar.reverse();
            waittosortvar = false;
            (async () => {
                if (blockingchangevar) return;
                blockingchangevar = true;
                console.log("VARREADY");
                let localnewpos = client.channels.get('479323876137107467').position + 1;
                for (let item2 of channelsvar) {

                    //index++;
                    // if ( //pendingposchange.includes(item.id)  || firstrunvar
                    //  true == true) {
                    if (client.channels.has(item2)) {
                        var item = client.channels.get(item2);
                        // console.log("item:"+item.name+" POS:"+item.position);
                        if (item.position != localnewpos) {
                            //console.log(localsss[6].id);
                            console.log(item.name + ":VARCURR " + item.position + ":NEED " + localnewpos);
                            await item.setPosition(localnewpos);
                            //if (!firstrunvar) break;
                        }
                        /* else {
                                                        if (pendingposchange.includes(item.id))
                                                            pendingposchange = removealt(pendingposchange, pendingposchange.indexOf(item.id));
                                                    }*/
                    }

                    // }
                    localnewpos = localnewpos + 1;
                }


                //if (firstrunvar) firstrunvar = false;
                blockingchangevar = false;

            })().catch((error) => {
                console.log(error);
            });
        }

        channelid = 1;
        firstopen = false;
        openindexofchannel = 2;
        let openchannelarraycoop = [];
        firstopenchannel = undefined;
        for (let c of coopvar) {
            if (client.channels.has(c)) {
                let mychannel = client.channels.get(c);
                let result = await workwithchannel(c, channelid, channels, userid);
                if (mychannel != undefined) {
                    modarray.forEach((mem) => {
                        if (watchingmessagesuserid[mychannel.id] != undefined && watchingmessagesuserid[mychannel.id] != mem && mychannel.permissionOverwrites.get(mem) != undefined) {
                            client.channels.get('389291844628119553').send("В комнате <#" + mychannel.id + "> хоста <@" + watchingmessagesuserid[mychannel.id] + "> был добавлен модератор / администратор <@" + mem + "> в права, бот удалил его из прав.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                            mychannel.permissionOverwrites.get(mem).delete().catch(async function (reason) {
                                console.log("ERROR1:" + reason);
                                if (reason.code != 10008 && reason.code != 10003) {
                                    console.log("Emoji message get error.");
                                    console.log(reason);
                                    process.exit(1);
                                }
                            });
                        }
                    });
                    if ((result && !firstopen) || !result) {
                        if (result && !firstopen) {
                            firstopenchannel = mychannel;
                            firstopen = true;
                            coopchannelisvaremptyroom = mychannel;
                        }
                        if (mychannel.permissionOverwrites.get('363054008564449281') == undefined) {
                            (async (mychannel) => {
                                await setuppermcoop(mychannel);
                            })(mychannel);
                        } else {
                            if ((firstopenchannel != undefined && firstopenchannel.id == mychannel.id) || mychannel.members.size > 0) {
                                if (!(mychannel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.VIEW_CHANNEL)) {
                                    await mychannel.updateOverwrite('363054008564449281', {
                                        VIEW_CHANNEL: true
                                    });
                                    //console.log("openperm:" + c);
                                }
                            } else {
                                if (!(mychannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                                    await mychannel.updateOverwrite('363054008564449281', {
                                        VIEW_CHANNEL: false
                                    });
                                    //console.log("closeperm:" + c);
                                }
                            }
                        }
                        if (mychannel.parentID != 363054686460182528) {
                            await mychannel.setParent('363054686460182528');
                        }
                        if (!firstimeroomsetup.includes(mychannel.id) && mychannel.members.size == 0) {
                            firstimeroomsetup.push(mychannel.id);
                            fullsetup(mychannel, true);
                        }
                        openchannelarraycoop.push(mychannel);

                    } else {
                        if (mychannel.permissionOverwrites.get('363054008564449281') == undefined) {
                            (async (mychannel) => {
                                await setuppermcoop(mychannel);
                            })(mychannel);
                        } else {
                            if (!(mychannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                                await mychannel.updateOverwrite('363054008564449281', {
                                    VIEW_CHANNEL: false
                                });
                                //console.log("closeperm:" + c);
                            }
                        }
                        if (mychannel.parentID != 363054686460182528) {
                            await mychannel.setParent('363054686460182528');

                            //console.log("movehide:"+c);
                        }
                        if (!firstimeroomsetup.includes(mychannel.id) && mychannel.members.size == 0) {
                            firstimeroomsetup.push(mychannel.id);
                            fullsetup(mychannel, true);
                        }
                    }
                }



            } else {
                if (!pendingcreating.includes(c))
                    await checkchannelsdeletion(c);
            }
            channelid++;
        }
        if (waittosortcoopvar) {
            let localcoopvarvar = coopvar;
            //localcoopvarvar = localcoopvarvar.reverse();
            waittosortcoopvar = false;
            //console.log("FIRST ROOM:"+firstopenchannel.name);
            (async () => {
                if (blockingchangevarcoop) return;
                blockingchangevarcoop = true;

                let localnewposcoop = client.channels.get('479327212596625409').position + 1;
                for (let item2 of coopvar) {
                    //index++;
                    // if ( //pendingposchange.includes(item.id)  || firstrunvar
                    // true == true) {
                    if (client.channels.has(item2)) {
                        var item = client.channels.get(item2);
                        // console.log("item:"+item.name+" POS:"+item.position);
                        if (item.position != localnewposcoop) {
                            //console.log(localsss[6].id);
                            console.log(item.name + ":CURR " + item.position + ":NEED " + localnewposcoop);
                            await item.setPosition(localnewposcoop);
                            //if (!firstrunvar) break;
                        }
                    }

                    //  }
                    localnewposcoop = localnewposcoop + 1;
                }


                //if (firstrunvar) firstrunvar = false;
                blockingchangevarcoop = false;

            })().catch((error) => {
                console.log(error);
            });
        }



        channelid = 1;
        firstopen = false;
        openindexofchannel = 7;
        let openchannelarrayrpg = [];
        firstopenchannel = undefined;
        for (let c of rpgvar) {
            if (client.channels.has(c)) {
                let mychannel = client.channels.get(c);
                let result = await workwithchannel(c, channelid, channels, userid);
                if (mychannel != undefined) {
                    modarray.forEach((mem) => {
                        if (watchingmessagesuserid[mychannel.id] != undefined && watchingmessagesuserid[mychannel.id] != mem && mychannel.permissionOverwrites.get(mem) != undefined) {
                            client.channels.get('389291844628119553').send("В комнате <#" + mychannel.id + "> хоста <@" + watchingmessagesuserid[mychannel.id] + "> был добавлен модератор / администратор <@" + mem + "> в права, бот удалил его из прав.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                            mychannel.permissionOverwrites.get(mem).delete().catch(async function (reason) {
                                console.log("ERROR1:" + reason);
                                if (reason.code != 10008 && reason.code != 10003) {
                                    console.log("Emoji message get error.");
                                    console.log(reason);
                                    process.exit(1);
                                }
                            });
                        }
                    });
                    if ((result && !firstopen) || !result) {
                        if (result && !firstopen) {
                            firstopenchannel = mychannel;
                            firstopen = true;
                            rpgchannelisvaremptyroom = mychannel;
                        }
                        if (mychannel.permissionOverwrites.get('381076993384382464') == null) {
                            (async (mychannel) => {
                                await setuppermrpg(mychannel);
                            })(mychannel);
                        } else {
                            if ((firstopenchannel != undefined && firstopenchannel.id == mychannel.id) || mychannel.members.size > 0) {
                                if (!(mychannel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.VIEW_CHANNEL)) {
                                    await mychannel.updateOverwrite('381076993384382464', {
                                        VIEW_CHANNEL: true
                                    });
                                    //console.log("openperm:" + c);
                                }
                            } else {
                                if (!(mychannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                                    await mychannel.updateOverwrite('381076993384382464', {
                                        VIEW_CHANNEL: false
                                    });
                                    //console.log("closeperm:" + c);
                                }
                            }
                        }
                        if (mychannel.parentID != 381083236455153686) {
                            await mychannel.setParent('381083236455153686');
                        }
                        if (!firstimeroomsetup.includes(mychannel.id) && mychannel.members.size == 0) {
                            firstimeroomsetup.push(mychannel.id);
                            fullsetup(mychannel, true);
                        }
                        openchannelarrayrpg.push(mychannel);

                    } else {

                        if (mychannel.permissionOverwrites.get('381076993384382464') == null) {
                            if (!firstimeroomsetup.includes(mychannel.id))
                                firstimeroomsetup.push(mychannel.id);
                            (async (mychannel) => {
                                await setuppermrpg(mychannel);
                            })(mychannel);
                        } else {
                            if (!(mychannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.VIEW_CHANNEL)) {
                                await mychannel.updateOverwrite('381076993384382464', {
                                    VIEW_CHANNEL: false
                                });
                                //console.log("closeperm:" + c);
                            }
                        }
                        if (mychannel.parentID != 381083236455153686) {
                            await mychannel.setParent('381083236455153686');

                            //console.log("movehide:"+c);
                        }
                        if (!firstimeroomsetup.includes(mychannel.id) && mychannel.members.size == 0) {
                            firstimeroomsetup.push(mychannel.id);
                            fullsetup(mychannel, true);
                        }
                    }
                }



            } else {
                if (!pendingcreating.includes(c))
                    await checkchannelsdeletion(c);
            }
            channelid++;
        }
        if (waittosortrpgvar) {
            let localrpgvar = rpgvar;
            //localrpgvar = localrpgvar.reverse();
            waittosortrpgvar = false;
            //console.log("FIRST ROOM:"+firstopenchannel.name);
            (async () => {
                if (blockingchangevarrpg) return;
                blockingchangevarrpg = true;

                let localnewposrpg = client.channels.get('479326920035794944').position + 1;
                //var index = 1;

                for (let item2 of rpgvar) {
                    //index++;
                    if ( //pendingposchange.includes(item.id)  || firstrunvar
                        true == true) {
                        if (client.channels.has(item2)) {
                            var item = client.channels.get(item2);
                            // console.log("item:"+item.name+" POS:"+item.position);
                            if (item.position != localnewposrpg) {
                                //console.log(localsss[6].id);
                                console.log(item.name + ":CURR " + item.position + ":NEED " + localnewposrpg);
                                await item.setPosition(localnewposrpg);
                                //if (!firstrunvar) break;
                            }
                            /* else {
                                                            if (pendingposchange.includes(item.id))
                                                                pendingposchange = removealt(pendingposchange, pendingposchange.indexOf(item.id));
                                                        }*/
                        }

                    }
                    localnewposrpg = localnewposrpg + 1;
                }


                //if (firstrunvar) firstrunvar = false;
                blockingchangevarrpg = false;

            })().catch((error) => {
                console.log(error);
            });
        }
        (async () => {
            for (let c of channelsvar) {
                if (client.channels.has(c)) {
                    await syncrightsvoicetext(client.channels.get(c), client.channels.get(vartextchannelid[c]));
                }
            }
            for (let c of coopvar) {
                if (client.channels.has(c)) {
                    await syncrightsvoicetext(client.channels.get(c), client.channels.get(vartextchannelid[c]), 2);
                }
            }
            for (let c of rpgvar) {
                if (client.channels.has(c)) {
                    await syncrightsvoicetext(client.channels.get(c), client.channels.get(vartextchannelid[c]), 1);
                }
            }
        })();
        imcheckchannels = true;
    }
    var blocksyncmainrights = [];
    async function setuppermcoop(channel) {
        // if (pendingsetupcoopvar.includes(channel.id)) return;
        if (blocksyncmainrights.includes(channel.id)) return;
        blocksyncmainrights.push(channel.id);

        if (channel.permissionOverwrites.get('286198213612929024') == undefined ||
            channel.permissionOverwrites.get('286198213612929024').deny == 0 || channel.permissionOverwrites.get('286198213612929024').allow != 0 ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MUTE_MEMBERS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.DEAFEN_MEMBERS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MOVE_MEMBERS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.USE_VAD ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MANAGE_ROLES ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MANAGE_CHANNELS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MANAGE_WEBHOOKS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.PRIORITY_SPEAKER ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.SPEAK ||
            !(channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.VIEW_CHANNEL) ||
            !(channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.CONNECT)
        )
            await channel.updateOverwrite('286198213612929024', {
                VIEW_CHANNEL: false,
                CONNECT: false,
                CREATE_INSTANT_INVITE: null,
                MANAGE_CHANNELS: null,
                SPEAK: null,
                MUTE_MEMBERS: null,
                DEAFEN_MEMBERS: null,
                MOVE_MEMBERS: null,
                USE_VAD: null,
                MANAGE_ROLES: null,
                MANAGE_WEBHOOKS: null,
                PRIORITY_SPEAKER: null
            }).catch(function (reason) {
                console.log("ERROR3:" + reason);
                channel.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                process.exit(1);
            }).then(() => {
                console.log("coop 1");
            });
        if (channel.permissionOverwrites.get('369893791949127680') == undefined ||
            channel.permissionOverwrites.get('369893791949127680').deny == 0 || channel.permissionOverwrites.get('369893791949127680').allow != 0 ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MUTE_MEMBERS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.DEAFEN_MEMBERS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MOVE_MEMBERS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.USE_VAD ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MANAGE_ROLES ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MANAGE_CHANNELS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MANAGE_WEBHOOKS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.PRIORITY_SPEAKER ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.CONNECT ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.VIEW_CHANNEL ||
            !(channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.SPEAK)
        )
            await channel.updateOverwrite('369893791949127680', {
                SPEAK: false,
                CREATE_INSTANT_INVITE: null,
                MANAGE_CHANNELS: null,
                VIEW_CHANNEL: null,
                CONNECT: null,
                MUTE_MEMBERS: null,
                DEAFEN_MEMBERS: null,
                MOVE_MEMBERS: null,
                USE_VAD: null,
                MANAGE_ROLES: null,
                MANAGE_WEBHOOKS: null,
                PRIORITY_SPEAKER: null
            }).catch(function (reason) {
                console.log("ERROR3:" + reason);
                channel.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                process.exit(1);
            }).then(() => {
                console.log("coop 2");
            });
        if (channel.permissionOverwrites.get('363054008564449281') == undefined ||
            channel.permissionOverwrites.get('363054008564449281').allow == 0 ||
            channel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.CREATE_INSTANT_INVITE || (channel.permissionOverwrites.get('363054008564449281').deny != 0 && channel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE) ||
            channel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.MUTE_MEMBERS || (channel.permissionOverwrites.get('363054008564449281').deny != 0 && channel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MUTE_MEMBERS) ||
            channel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.DEAFEN_MEMBERS || (channel.permissionOverwrites.get('363054008564449281').deny != 0 && channel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.DEAFEN_MEMBERS) ||
            channel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.MOVE_MEMBERS || (channel.permissionOverwrites.get('363054008564449281').deny != 0 && channel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MOVE_MEMBERS) ||
            channel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.USE_VAD || (channel.permissionOverwrites.get('363054008564449281').deny != 0 && channel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.USE_VAD) ||
            channel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.SPEAK || (channel.permissionOverwrites.get('363054008564449281').deny != 0 && channel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.SPEAK) ||
            channel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.MANAGE_ROLES || (channel.permissionOverwrites.get('363054008564449281').deny != 0 && channel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_ROLES) ||
            channel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.MANAGE_WEBHOOKS || (channel.permissionOverwrites.get('363054008564449281').deny != 0 && channel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_WEBHOOKS) ||
            channel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.PRIORITY_SPEAKER || (channel.permissionOverwrites.get('363054008564449281').deny != 0 && channel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.PRIORITY_SPEAKER) ||
            !(channel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.CONNECT) ||
            !(channel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.MANAGE_CHANNELS)
        )
            await channel.updateOverwrite('363054008564449281', {
                VIEW_CHANNEL: (channel.permissionOverwrites.get('363054008564449281').allow & Permissions.FLAGS.VIEW_CHANNEL),
                CONNECT: true,
                CREATE_INSTANT_INVITE: null,
                MANAGE_CHANNELS: true,
                SPEAK: null,
                MUTE_MEMBERS: null,
                DEAFEN_MEMBERS: null,
                MOVE_MEMBERS: null,
                USE_VAD: null,
                MANAGE_ROLES: null,
                MANAGE_WEBHOOKS: null,
                PRIORITY_SPEAKER: null
            }).catch(function (reason) {
                console.log("ERROR3:" + reason);
                channel.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                process.exit(1);
            }).then(() => {
                console.log("coop 3");
            });
        if (channel.permissionOverwrites.get('467548950157852673') == undefined ||
            channel.permissionOverwrites.get('467548950157852673').allow == 0 || channel.permissionOverwrites.get('467548950157852673').deny != 0 ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.CREATE_INSTANT_INVITE ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MUTE_MEMBERS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.DEAFEN_MEMBERS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MOVE_MEMBERS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MANAGE_ROLES ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MANAGE_CHANNELS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MANAGE_WEBHOOKS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.PRIORITY_SPEAKER ||
            !(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.USE_VAD) ||
            !(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.VIEW_CHANNEL) ||
            !(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.CONNECT) ||
            !(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.SPEAK)
        )
            await channel.updateOverwrite('467548950157852673', {
                USE_VAD: true,
                VIEW_CHANNEL: true,
                CONNECT: true,
                SPEAK: true,
                CREATE_INSTANT_INVITE: null,
                MANAGE_CHANNELS: null,
                MUTE_MEMBERS: null,
                DEAFEN_MEMBERS: null,
                MOVE_MEMBERS: null,
                MANAGE_ROLES: null,
                MANAGE_WEBHOOKS: null,
                PRIORITY_SPEAKER: null
            }).catch(function (reason) {
                console.log("ERROR3:" + reason);
                channel.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                process.exit(1);
            }).then(() => {
                console.log("coop 4");
            });
        if (blocksyncmainrights.includes(channel.id))
            blocksyncmainrights = removealt(blocksyncmainrights, blocksyncmainrights.indexOf(channel.id));
    }
    /*
    CREATE_INSTANT_INVITE: null,
    MANAGE_CHANNELS: null,
    VIEW_CHANNEL: null,
    CONNECT: null,
    SPEAK: null,
    MUTE_MEMBERS: null,
    DEAFEN_MEMBERS: null,
    MOVE_MEMBERS: null,
    USE_VAD: null,
    MANAGE_ROLES: null,
    MANAGE_WEBHOOKS: null,
    MOVE_MEMBERS:null,
    PRIORITY_SPEAKER:null
     */

    async function setuppermchannelsvar(channel) {
        //if (pendingsetupchannelsvar.includes(channel.id)) return;
        if (blocksyncmainrights.includes(channel.id)) return;
        blocksyncmainrights.push(channel.id);
        var channelnumber = channelsvar.indexOf(channel.id);
        if (channel.permissionOverwrites.get('500580990805213194') == undefined ||
            channel.permissionOverwrites.get('500580990805213194').allow == 0 ||
            channel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.CREATE_INSTANT_INVITE || (channel.permissionOverwrites.get('500580990805213194').deny != 0 && channel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE) ||
            channel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.CONNECT || (channel.permissionOverwrites.get('500580990805213194').deny != 0 && channel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.CONNECT) ||
            channel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.SPEAK || (channel.permissionOverwrites.get('500580990805213194').deny != 0 && channel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.SPEAK) ||
            channel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.MUTE_MEMBERS || (channel.permissionOverwrites.get('500580990805213194').deny != 0 && channel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MUTE_MEMBERS) ||
            channel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.DEAFEN_MEMBERS || (channel.permissionOverwrites.get('500580990805213194').deny != 0 && channel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.DEAFEN_MEMBERS) ||
            channel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.MOVE_MEMBERS || (channel.permissionOverwrites.get('500580990805213194').deny != 0 && channel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MOVE_MEMBERS) ||
            channel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.USE_VAD || (channel.permissionOverwrites.get('500580990805213194').deny != 0 && channel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.USE_VAD) ||
            channel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.MANAGE_ROLES || (channel.permissionOverwrites.get('500580990805213194').deny != 0 && channel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_ROLES) ||
            channel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.MANAGE_WEBHOOKS || (channel.permissionOverwrites.get('500580990805213194').deny != 0 && channel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_WEBHOOKS) ||
            channel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.PRIORITY_SPEAKER || (channel.permissionOverwrites.get('500580990805213194').deny != 0 && channel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.PRIORITY_SPEAKER) ||
            !(channel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.MANAGE_CHANNELS)
        )
            if (channel.permissionOverwrites.get('500580990805213194') != undefined)
                await channel.updateOverwrite('500580990805213194', { //НИ
                    MANAGE_CHANNELS: true,
                    VIEW_CHANNEL: (channel.permissionOverwrites.get('500580990805213194').allow & Permissions.FLAGS.VIEW_CHANNEL),
                    CREATE_INSTANT_INVITE: null,
                    CONNECT: null,
                    SPEAK: null,
                    MUTE_MEMBERS: null,
                    DEAFEN_MEMBERS: null,
                    MOVE_MEMBERS: null,
                    USE_VAD: null,
                    MANAGE_ROLES: null,
                    MANAGE_WEBHOOKS: null,
                    PRIORITY_SPEAKER: null

                }).catch(function (reason) {
                    console.log("ERROR3213:" + reason);
                    channel.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
                    process.exit(1);
                }).then(() => {
                    console.log("default 4");
                });
            else
                await channel.updateOverwrite('500580990805213194', { //НИ
                    MANAGE_CHANNELS: true,
                    VIEW_CHANNEL: true,
                    CREATE_INSTANT_INVITE: null,
                    CONNECT: null,
                    SPEAK: null,
                    MUTE_MEMBERS: null,
                    DEAFEN_MEMBERS: null,
                    MOVE_MEMBERS: null,
                    USE_VAD: null,
                    MANAGE_ROLES: null,
                    MANAGE_WEBHOOKS: null,
                    PRIORITY_SPEAKER: null

                }).catch(function (reason) {
                    console.log("ERROR3213:" + reason);
                    channel.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
                    process.exit(1);
                }).then(() => {
                    console.log("default 4");
                });
        if (channel.permissionOverwrites.get('286198213612929024') == undefined ||
            channel.permissionOverwrites.get('286198213612929024').deny == 0 || channel.permissionOverwrites.get('286198213612929024').allow != 0 ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.CONNECT ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.SPEAK ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MUTE_MEMBERS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.DEAFEN_MEMBERS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MOVE_MEMBERS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.USE_VAD ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MANAGE_ROLES ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MANAGE_CHANNELS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MANAGE_WEBHOOKS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.PRIORITY_SPEAKER ||
            !(channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.VIEW_CHANNEL)
        ) {
            //console.log(channel.permissionOverwrites.get('286198213612929024').deny);
            //console.log(channel.permissionOverwrites.get('286198213612929024').allow);
            await channel.updateOverwrite('286198213612929024', {
                VIEW_CHANNEL: false,
                CREATE_INSTANT_INVITE: null,
                MANAGE_CHANNELS: null,
                CONNECT: null,
                SPEAK: null,
                MUTE_MEMBERS: null,
                DEAFEN_MEMBERS: null,
                MOVE_MEMBERS: null,
                USE_VAD: null,
                MANAGE_ROLES: null,
                MANAGE_WEBHOOKS: null,
                PRIORITY_SPEAKER: null
            }).catch(function (reason) {
                console.log("ERROR3:" + reason);
                channel.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                process.exit(1);
            }).then(() => {
                console.log("default 5");
            });
        }
        if (channel.permissionOverwrites.get('369893791949127680') == undefined ||
            channel.permissionOverwrites.get('369893791949127680').deny == 0 || channel.permissionOverwrites.get('369893791949127680').allow != 0 ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.CONNECT ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MUTE_MEMBERS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.DEAFEN_MEMBERS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MOVE_MEMBERS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.USE_VAD ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MANAGE_ROLES ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MANAGE_CHANNELS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MANAGE_WEBHOOKS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.PRIORITY_SPEAKER ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.VIEW_CHANNEL ||
            !(channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.SPEAK)
        )
            await channel.updateOverwrite('369893791949127680', {
                SPEAK: false,
                CREATE_INSTANT_INVITE: null,
                MANAGE_CHANNELS: null,
                VIEW_CHANNEL: null,
                CONNECT: null,
                MUTE_MEMBERS: null,
                DEAFEN_MEMBERS: null,
                MOVE_MEMBERS: null,
                USE_VAD: null,
                MANAGE_ROLES: null,
                MANAGE_WEBHOOKS: null,
                PRIORITY_SPEAKER: null
            }).catch(function (reason) {
                console.log("ERROR3:" + reason);
                channel.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                process.exit(1);
            }).then(() => {
                console.log("default 6");
            });
        if (channel.permissionOverwrites.get('467548950157852673') == undefined ||
            channel.permissionOverwrites.get('467548950157852673').deny != 0 || channel.permissionOverwrites.get('467548950157852673').allow == 0 ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.CREATE_INSTANT_INVITE ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MUTE_MEMBERS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.DEAFEN_MEMBERS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MOVE_MEMBERS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MANAGE_ROLES ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MANAGE_CHANNELS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MANAGE_WEBHOOKS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.PRIORITY_SPEAKER ||
            !(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.USE_VAD) ||
            !(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.VIEW_CHANNEL) ||
            !(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.CONNECT) ||
            !(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.SPEAK)
        )
            await channel.updateOverwrite('467548950157852673', {
                USE_VAD: true,
                VIEW_CHANNEL: true,
                CONNECT: true,
                SPEAK: true,
                CREATE_INSTANT_INVITE: null,
                MANAGE_CHANNELS: null,
                MUTE_MEMBERS: null,
                DEAFEN_MEMBERS: null,
                MOVE_MEMBERS: null,
                MANAGE_ROLES: null,
                MANAGE_WEBHOOKS: null,
                PRIORITY_SPEAKER: null
            }).catch(function (reason) {
                console.log("ERROR200:" + reason);
                channel.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                process.exit(1);
            }).then(() => {
                /* console.log((channel.permissionOverwrites.get('467548950157852673') == undefined));
                 console.log((channel.permissionOverwrites.get('467548950157852673').deny != 0));
                 console.log((channel.permissionOverwrites.get('467548950157852673').allow == 0));
                 console.log((channel.permissionOverwrites.get('467548950157852673').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE));
                 console.log(!(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.CONNECT));
                 console.log((channel.permissionOverwrites.get('467548950157852673').deny & Permissions.FLAGS.MUTE_MEMBERS));
                 console.log((channel.permissionOverwrites.get('467548950157852673').deny & Permissions.FLAGS.DEAFEN_MEMBERS));
                 console.log((channel.permissionOverwrites.get('467548950157852673').deny & Permissions.FLAGS.MOVE_MEMBERS));
                 console.log(!(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.USE_VAD));
                 console.log((channel.permissionOverwrites.get('467548950157852673').deny & Permissions.FLAGS.MANAGE_ROLES));
                 console.log((channel.permissionOverwrites.get('467548950157852673').deny & Permissions.FLAGS.MANAGE_CHANNELS));
                 console.log((channel.permissionOverwrites.get('467548950157852673').deny & Permissions.FLAGS.MANAGE_WEBHOOKS));
                 console.log((channel.permissionOverwrites.get('467548950157852673').deny & Permissions.FLAGS.PRIORITY_SPEAKER ));
                 console.log(!(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.VIEW_CHANNEL));
                 console.log(!(channel.permissionOverwrites.get('467548950157852673').deny & Permissions.FLAGS.SPEAK));*/
                console.log("default 7");
            });
        if (blocksyncmainrights.includes(channel.id))
            blocksyncmainrights = removealt(blocksyncmainrights, blocksyncmainrights.indexOf(channel.id));
    }

    async function setuppermrpg(channel) {
        //if (pendingsetuprpg.includes(channel.id)) return;
        if (blocksyncmainrights.includes(channel.id)) return;
        blocksyncmainrights.push(channel.id);
        //if (pendingsetupcoopvar.includes(channel.id) || pendingsetupchannelsvar.includes(channel.id) || pendingsetuprpg.includes(channel.id)) return;
        var channelnumber = rpgvar.indexOf(channel.id);
        if (channel.permissionOverwrites.get('286198213612929024') == undefined ||
            channel.permissionOverwrites.get('286198213612929024').deny == 0 || channel.permissionOverwrites.get('286198213612929024').allow != 0 ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.SPEAK ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MUTE_MEMBERS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.DEAFEN_MEMBERS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MOVE_MEMBERS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.USE_VAD ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MANAGE_ROLES ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MANAGE_WEBHOOKS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.MANAGE_CHANNELS ||
            channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.PRIORITY_SPEAKER ||
            !(channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.VIEW_CHANNEL) ||
            !(channel.permissionOverwrites.get('286198213612929024').deny & Permissions.FLAGS.CONNECT)
        )
            await channel.updateOverwrite('286198213612929024', {
                VIEW_CHANNEL: false,
                CONNECT: false,
                CREATE_INSTANT_INVITE: null,
                MANAGE_CHANNELS: null,
                SPEAK: null,
                MUTE_MEMBERS: null,
                DEAFEN_MEMBERS: null,
                MOVE_MEMBERS: null,
                USE_VAD: null,
                MANAGE_ROLES: null,
                MANAGE_WEBHOOKS: null,
                PRIORITY_SPEAKER: null
            }).catch(function (reason) {
                console.log("ERROR3:" + reason);
                channel.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                process.exit(1);
            }).then(() => {
                console.log("rpg 1");
            });
        if (channel.permissionOverwrites.get('369893791949127680') == undefined ||
            channel.permissionOverwrites.get('369893791949127680').deny == 0 || channel.permissionOverwrites.get('369893791949127680').allow != 0 ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.CONNECT ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.VIEW_CHANNEL ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MUTE_MEMBERS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.DEAFEN_MEMBERS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MOVE_MEMBERS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.USE_VAD ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MANAGE_ROLES ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MANAGE_WEBHOOKS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.MANAGE_CHANNELS ||
            channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.PRIORITY_SPEAKER ||
            !(channel.permissionOverwrites.get('369893791949127680').deny & Permissions.FLAGS.SPEAK)
        )
            await channel.updateOverwrite('369893791949127680', {
                SPEAK: false,
                CREATE_INSTANT_INVITE: null,
                MANAGE_CHANNELS: null,
                VIEW_CHANNEL: null,
                CONNECT: null,
                MUTE_MEMBERS: null,
                DEAFEN_MEMBERS: null,
                MOVE_MEMBERS: null,
                USE_VAD: null,
                MANAGE_ROLES: null,
                MANAGE_WEBHOOKS: null,
                PRIORITY_SPEAKER: null
            }).catch(function (reason) {
                console.log("ERROR3:" + reason);
                channel.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                process.exit(1);
            }).then(() => {
                console.log("rpg 2");
            });
        /*if (channel.permissionOverwrites.get('381084879623946244') == undefined ||
            channel.permissionOverwrites.get('381084879623946244').deny != 0 || channel.permissionOverwrites.get('381084879623946244').allow == 0 ||
            channel.permissionOverwrites.get('381084879623946244').allow & Permissions.FLAGS.PRIORITY_SPEAKER ||
            channel.permissionOverwrites.get('381084879623946244').allow & Permissions.FLAGS.MANAGE_WEBHOOKS ||
            channel.permissionOverwrites.get('381084879623946244').allow & Permissions.FLAGS.VIEW_CHANNEL ||
            !(channel.permissionOverwrites.get('381084879623946244').allow & Permissions.FLAGS.CREATE_INSTANT_INVITE) ||
            !(channel.permissionOverwrites.get('381084879623946244').allow & Permissions.FLAGS.MANAGE_ROLES) ||
            !(channel.permissionOverwrites.get('381084879623946244').allow & Permissions.FLAGS.MANAGE_CHANNELS) ||
            !(channel.permissionOverwrites.get('381084879623946244').allow & Permissions.FLAGS.CONNECT) ||
            !(channel.permissionOverwrites.get('381084879623946244').allow & Permissions.FLAGS.SPEAK) ||
            !(channel.permissionOverwrites.get('381084879623946244').allow & Permissions.FLAGS.MUTE_MEMBERS) ||
            !(channel.permissionOverwrites.get('381084879623946244').allow & Permissions.FLAGS.DEAFEN_MEMBERS) ||
            !(channel.permissionOverwrites.get('381084879623946244').allow & Permissions.FLAGS.USE_VAD)
        )
            await channel.updateOverwrite('381084879623946244', {
                CREATE_INSTANT_INVITE: true,
                MANAGE_ROLES: true,
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: null,
                CONNECT: true,
                SPEAK: true,
                MUTE_MEMBERS: true,
                DEAFEN_MEMBERS: true,
                USE_VAD: true,
                MANAGE_WEBHOOKS: null,
                PRIORITY_SPEAKER: null

            }).catch(function (reason) {
                console.log("ERROR3:" + reason);
                channel.delete().catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             }).catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             });
                process.exit(1);
            }).then(() => {
                console.log("rpg 3");
            });*/
        /*if (channel.permissionOverwrites.get('381084562719113237') == undefined ||
            channel.permissionOverwrites.get('381084562719113237').deny != 0 || channel.permissionOverwrites.get('381084562719113237').allow == 0 ||
            channel.permissionOverwrites.get('381084562719113237').allow & Permissions.FLAGS.VIEW_CHANNEL ||
            channel.permissionOverwrites.get('381084562719113237').allow & Permissions.FLAGS.MUTE_MEMBERS ||
            channel.permissionOverwrites.get('381084562719113237').allow & Permissions.FLAGS.DEAFEN_MEMBERS ||
            channel.permissionOverwrites.get('381084562719113237').allow & Permissions.FLAGS.MOVE_MEMBERS ||
            channel.permissionOverwrites.get('381084562719113237').allow & Permissions.FLAGS.USE_VAD ||
            channel.permissionOverwrites.get('381084562719113237').allow & Permissions.FLAGS.MANAGE_WEBHOOKS ||
            channel.permissionOverwrites.get('381084562719113237').allow & Permissions.FLAGS.PRIORITY_SPEAKER ||
            !(channel.permissionOverwrites.get('381084562719113237').allow & Permissions.FLAGS.CREATE_INSTANT_INVITE) ||
            !(channel.permissionOverwrites.get('381084562719113237').allow & Permissions.FLAGS.MANAGE_ROLES) ||
            !(channel.permissionOverwrites.get('381084562719113237').allow & Permissions.FLAGS.MANAGE_CHANNELS) ||
            !(channel.permissionOverwrites.get('381084562719113237').allow & Permissions.FLAGS.CONNECT) ||
            !(channel.permissionOverwrites.get('381084562719113237').allow & Permissions.FLAGS.SPEAK)
        )
            await channel.updateOverwrite('381084562719113237', {
                CREATE_INSTANT_INVITE: true,
                MANAGE_ROLES: true,
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: null,
                CONNECT: true,
                SPEAK: true,
                MUTE_MEMBERS: null,
                DEAFEN_MEMBERS: null,
                USE_VAD: null,
                MANAGE_WEBHOOKS: null,
                MOVE_MEMBERS: null,
                PRIORITY_SPEAKER: null
            }).catch(function (reason) {
                console.log("ERROR3:" + reason);
                channel.delete().catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             }).catch(async function (reason) {                             console.log("ERROR1:" + reason);                             if (reason.code != 10008 && reason.code != 10003) {                                 console.log("Emoji message get error.");                                 console.log(err);                                 process.exit(1);                             }                             });
                process.exit(1);
            }).then(() => {
                console.log("rpg 4");
            });*/
        if (channel.permissionOverwrites.get('381076993384382464') == undefined ||
            channel.permissionOverwrites.get('381076993384382464').deny == 0 || channel.permissionOverwrites.get('381076993384382464').allow == 0 ||
            channel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.MUTE_MEMBERS || channel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MUTE_MEMBERS ||
            channel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.DEAFEN_MEMBERS || channel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.DEAFEN_MEMBERS ||
            channel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.MOVE_MEMBERS || channel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MOVE_MEMBERS ||
            channel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.USE_VAD || channel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.USE_VAD ||
            channel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.MANAGE_WEBHOOKS || channel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_WEBHOOKS ||
            channel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.PRIORITY_SPEAKER || channel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.PRIORITY_SPEAKER ||
            channel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.CREATE_INSTANT_INVITE || channel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.CREATE_INSTANT_INVITE ||
            !(channel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_ROLES) ||
            !(channel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.MANAGE_CHANNELS) ||
            !(channel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.CONNECT) ||
            !(channel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.SPEAK)
        )
            await channel.updateOverwrite('381076993384382464', {
                MANAGE_ROLES: false,
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: (channel.permissionOverwrites.get('381076993384382464').allow & Permissions.FLAGS.VIEW_CHANNEL),
                CONNECT: true,
                SPEAK: true,
                CREATE_INSTANT_INVITE: null,
                MUTE_MEMBERS: null,
                DEAFEN_MEMBERS: null,
                MOVE_MEMBERS: null,
                USE_VAD: null,
                MANAGE_WEBHOOKS: null,
                PRIORITY_SPEAKER: null
            }).catch(function (reason) {
                console.log("ERROR3:" + reason);
                channel.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                process.exit(1);
            }).then(() => {
                console.log("rpg 5");
            });
        if (channel.permissionOverwrites.get('467548950157852673') == undefined ||
            channel.permissionOverwrites.get('467548950157852673').deny != 0 || channel.permissionOverwrites.get('467548950157852673').allow == 0 ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MUTE_MEMBERS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.DEAFEN_MEMBERS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MOVE_MEMBERS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MANAGE_WEBHOOKS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.PRIORITY_SPEAKER ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MANAGE_CHANNELS ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.MANAGE_ROLES ||
            channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.CREATE_INSTANT_INVITE ||
            !(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.USE_VAD) ||
            !(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.VIEW_CHANNEL) ||
            !(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.CONNECT) ||
            !(channel.permissionOverwrites.get('467548950157852673').allow & Permissions.FLAGS.SPEAK)
        )
            await channel.updateOverwrite('467548950157852673', {
                USE_VAD: true,
                VIEW_CHANNEL: true,
                CONNECT: true,
                SPEAK: true,
                CREATE_INSTANT_INVITE: null,
                MANAGE_CHANNELS: null,
                MUTE_MEMBERS: null,
                DEAFEN_MEMBERS: null,
                MOVE_MEMBERS: null,
                MANAGE_ROLES: null,
                MANAGE_WEBHOOKS: null,
                PRIORITY_SPEAKER: null
            }).catch(function (reason) {
                console.log("ERROR3:" + reason);
                channel.delete().catch(async function (reason) {
                    console.log("ERROR1:" + reason);
                    if (reason.code != 10008 && reason.code != 10003) {
                        console.log("Emoji message get error.");
                        console.log(reason);
                        process.exit(1);
                    }
                });
                process.exit(1);
            }).then(() => {
                console.log("rpg 6");
            });
        if (blocksyncmainrights.includes(channel.id))
            blocksyncmainrights = removealt(blocksyncmainrights, blocksyncmainrights.indexOf(channel.id));

    }
    var deletedchcountuser = [];
    client.on('channelDelete', (channel) => {
        //console.log(channel);
        if (channelsvar.includes(channel.id) || rpgvar.includes(channel.id) || coopvar.includes(channel.id) || Object.values(vartextchannelid).includes(channel.id)) {
            client.guilds.get('286198213612929024').fetchAuditLogs({
                type: 'CHANNEL_DELETE',
                limit: 1
            }).then(audit => {
                var logEntry = audit.entries.first(); //executor
                //console.log(logEntry);
                if (logEntry.targetType == "CHANNEL") {
                    if (logEntry.target.id == channel.id) {
                        if (logEntry.executor.bot == false) {
                            //var name = "";
                            if (channelsvar.includes(channel.id)) {
                                if (deletedchcountuser[logEntry.executor.id] == undefined) deletedchcountuser[logEntry.executor.id] = 0;
                                if (++deletedchcountuser[logEntry.executor.id] == 2) {

                                    client.channels.get('389291844628119553').send("Пользователь <@" + logEntry.executor.id + "> удалил канал 🎲:" + (channelsvar.indexOf(channel.id) + 1) + " в обычных комнатах, это было второе удаление, поэтому бот заблокировал пользователя на 4 дня. (" + logEntry.target_id + ")").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    client.guilds.get('286198213612929024').members.get(logEntry.executor.id).ban({
                                        reason: 'Пользователь заблокирован ботом на 4 дня за удаление двух комнат.'
                                    });
                                } else {
                                    client.channels.get('389291844628119553').send("Пользователь <@" + logEntry.executor.id + "> удалил канал 🎲:" + (channelsvar.indexOf(channel.id) + 1) + " в обычных комнатах (" + logEntry.target_id + ")").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    logEntry.executor.send("Не удаляйте голосовые комнаты, это запрещено правилами, в случае повторного удаления, бот автоматически забанит вас на 4 дня.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                }
                                delete watchingmessagesmessageid[channel.id];
                                delete watchingmessagesroomid[channel.id];
                                delete watchingmessagesserverid[channel.id];
                                delete watchingmessagesuserid[channel.id];
                                delete ignoresweeptakehost[channel.id];
                                connection.query('DELETE FROM waitingforhosttotake WHERE chid=?', [channel.id]);
                            } else if (rpgvar.includes(channel.id)) {
                                if (deletedchcountuser[logEntry.executor.id] == undefined) deletedchcountuser[logEntry.executor.id] = 0;
                                if (++deletedchcountuser[logEntry.executor.id] == 2) {
                                    client.channels.get('389291844628119553').send("Пользователь <@" + logEntry.executor.id + "> удалил канал R🐲:" + (rpgvar.indexOf(channel.id) + 1) + ", это было второе удаление, поэтому бот заблокировал пользователя на 4 дня. (" + logEntry.target_id + ")").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    client.guilds.get('286198213612929024').members.get(logEntry.executor.id).ban({
                                        reason: 'Пользователь заблокирован ботом на 4 дня за удаление двух комнат.'
                                    });
                                } else {
                                    client.channels.get('389291844628119553').send("Пользователь <@" + logEntry.executor.id + "> удалил канал R🐲:" + (rpgvar.indexOf(channel.id) + 1) + " (" + logEntry.target_id + ")").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    logEntry.executor.send("Не удаляйте голосовые комнаты, это запрещено правилами, в случае повторного удаления, бот автоматически забанит вас на 4 дня.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                }
                                delete watchingmessagesmessageid[channel.id];
                                delete watchingmessagesroomid[channel.id];
                                delete watchingmessagesserverid[channel.id];
                                delete watchingmessagesuserid[channel.id];
                                delete ignoresweeptakehost[channel.id];
                                connection.query('DELETE FROM waitingforhosttotake WHERE chid=?', [channel.id]);
                            } else if (coopvar.includes(channel.id)) {
                                if (deletedchcountuser[logEntry.executor.id] == undefined) deletedchcountuser[logEntry.executor.id] = 0;
                                if (++deletedchcountuser[logEntry.executor.id] == 2) {
                                    client.channels.get('389291844628119553').send("Пользователь <@" + logEntry.executor.id + "> удалил канал O🎮:" + (coopvar.indexOf(channel.id) + 1) + ", это было второе удаление, поэтому бот заблокировал пользователя на 4 дня. (" + logEntry.target_id + ")").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    client.guilds.get('286198213612929024').members.get(logEntry.executor.id).ban({
                                        reason: 'Пользователь заблокирован ботом на 4 дня за удаление двух комнат.'
                                    });
                                } else {
                                    client.channels.get('389291844628119553').send("Пользователь <@" + logEntry.executor.id + "> удалил канал O🎮:" + (coopvar.indexOf(channel.id) + 1) + " (" + logEntry.target_id + ")").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    logEntry.executor.send("Не удаляйте голосовые комнаты, это запрещено правилами, в случае повторного удаления, бот автоматически забанит вас на 4 дня.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                }
                                delete watchingmessagesmessageid[channel.id];
                                delete watchingmessagesroomid[channel.id];
                                delete watchingmessagesserverid[channel.id];
                                delete watchingmessagesuserid[channel.id];
                                delete ignoresweeptakehost[channel.id];
                                connection.query('DELETE FROM waitingforhosttotake WHERE chid=?', [channel.id]);
                            } else {
                                if (deletedchcountuser[logEntry.executor.id] == undefined) deletedchcountuser[logEntry.executor.id] = 0;
                                if (++deletedchcountuser[logEntry.executor.id] == 2) {
                                    client.channels.get('389291844628119553').send("Пользователь <@" + logEntry.executor.id + "> удалил текстовый канал комнаты <#" + Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(channel.id)] + ">, это было второе удаление, поэтому бот заблокировал пользователя на 4 дня. (" + logEntry.target_id + ")").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    client.guilds.get('286198213612929024').members.get(logEntry.executor.id).ban({
                                        reason: 'Пользователь заблокирован ботом на 4 дня за удаление двух комнат.'
                                    });
                                } else {
                                    client.channels.get('389291844628119553').send("Пользователь <@" + logEntry.executor.id + "> удалил текстовый канал комнаты <#" + Object.keys(vartextchannelid)[Object.values(vartextchannelid).indexOf(channel.id)] + "> (" + logEntry.target_id + ")").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    logEntry.executor.send("Не удаляйте текстовые комнаты, это запрещено правилами, в случае повторного удаления, бот автоматически забанит вас на 4 дня.").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                }
                            }

                        }
                    }
                }
            }).catch(function (reason) {
                console.log("ERRORDETECTDEL:" + reason);
            });
            checkchannels();
        }
    });
    async function cleanoldmessages(channel) {
        await channel.messages.fetch().then(async messaxxxccges => {
            if (messaxxxccges.array().length > 0) {
                let lastid = messaxxxccges.last().id;

                for (let [value, x] of messaxxxccges) {
                    if (!x.deleted) {
                        if (x.author.id == client.user.id) {

                            if (x.embeds == undefined || x.embeds == null || x.embeds[0] == undefined || x.embeds[0] == null || x.embeds[0].title == undefined || x.embeds[0].title == null || x.embeds[0].title != "Случайный список пользователей в голосовой комнате")
                                //if ((x.embeds != undefined && x.embeds != null && x.embeds[0] != undefined && x.embeds[0] != null && x.embeds[0].title != undefined && x.embeds[0].title != null && x.embeds[0].title =="Новый хост комнаты.") || (x.content != undefined && (x.content.match(/покинул комнату/i) || x.content.match(/чёрный список\:/i))))
                                await x.delete().catch(async function (reason) {
                                    console.log("ERROR1:" + reason);
                                    if (reason.code != 10008 && reason.code != 10003) {
                                        console.log("Emoji message get error.");
                                        console.log(reason);
                                        process.exit(1);
                                    }
                                });
                        }
                    }
                }

                while (true) {
                    console.log("BEFORE:" + lastid);
                    const messages = await channel.messages.fetch({
                        limit: 100,
                        before: lastid
                    });
                    if (messages.array().length > 0) {
                        lastid = messages.last().id;
                        for (let [value, x] of messages) {
                            if (!x.deleted) {
                                if (x.author.id == client.user.id) {
                                    //if ((x.embeds != undefined && x.embeds != null && x.embeds[0] != undefined && x.embeds[0] != null && x.embeds[0].title != undefined && x.embeds[0].title != null && x.embeds[0].title =="Новый хост комнаты.") || (x.content != undefined && (x.content.match(/покинул комнату/i) || x.content.match(/чёрный список\:/i))))
                                    if (x.embeds == undefined || x.embeds == null || x.embeds[0] == undefined || x.embeds[0] == null || x.embeds[0].title == undefined || x.embeds[0].title == null || x.embeds[0].title != "Случайный список пользователей в голосовой комнате")
                                        await x.delete().catch(async function (reason) {
                                            console.log("ERROR1:" + reason);
                                            if (reason.code != 10008 && reason.code != 10003) {
                                                console.log("Emoji message get error.");
                                                console.log(reason);
                                                process.exit(1);
                                            }
                                        });
                                }
                            }
                        }
                        console.log("looping");
                        continue;
                    } else {
                        console.log("break");
                        break;
                    }
                }
            }
        });
    }
    async function checkoutnewhostbynamechange() {
        let arrayofchannels = channelsvar.slice(0);
        arrayofchannels = arrayofchannels.concat(coopvar);
        arrayofchannels = arrayofchannels.concat(rpgvar);
        //let chignorelist = [];
        console.log("checkoutnewhostbynamechange");
        await client.guilds.get('286198213612929024').fetchAuditLogs({
            type: 'CHANNEL_UPDATE',
            limit: 100
        }).then(async audit => {
            console.log("FETCHEDAUDIT");
            for (let chid of arrayofchannels) {
                let newChannel = client.guilds.get('286198213612929024').channels.get(chid);

                if (newChannel != undefined) {
                    //  console.log("CHECKFORNEWCHANGES: " + newChannel.name);
                    await setupfromauditlog(audit, newChannel);

                }
            }
        });
    }

    let insetupafnct = [];
    async function setupfromauditlog(audit, newChannel) {

        // var logEntry = audit.entries.first(); //executor
        for (const [key, logEntry] of audit.entries)
            if (logEntry.targetType == "CHANNEL" && ((Date.now()) - logEntry.createdTimestamp < 60000)) {
                if (logEntry.target != undefined && logEntry.target != null && logEntry.target.id == newChannel.id) {
                    if (logEntry.executor.bot == false && client.channels.get(newChannel.id).members.has(logEntry.executor.id)) {
                        while (insetupafnct.includes(newChannel.id)) await wait(350);
                        insetupafnct.push(newChannel.id);
                        //console.log(logEntry.executor.id);
                        let ourchannel = newChannel;
                        let userid = logEntry.executor.id;
                        let containsuser = false;
                        let realhuman = false;

                        for (const [key, member] of ourchannel.members) {
                            if (userid > 0 && member.id == userid) containsuser = true;
                            if (!botarray.includes(member.id)) {
                                realhuman = true;
                            }
                            if (realhuman && containsuser) break;

                        }
                        let rewritecheck = false;
                        if (ourchannel.members.size == 1) {
                            //if (Object.keys(ourchannel.members)[0] == userid) rewritecheck = true;
                            if (containsuser) rewritecheck = true;
                        }
                        let [results, fields] = await connection.query('SELECT userid FROM rememberedgamenames WHERE roomid=?', [ourchannel.id]);
                        var hostid = "";
                        if (results.length == 0) rewritecheck = true;
                        else {
                            if (rewritecheck != true) {
                                let ifexistsowner = false;
                                for (let i = 0; i < results.length; i++) {
                                    if (results[i]["userid"] != userid && ourchannel.members.has(results[i]["userid"])) {
                                        ifexistsowner = true;
                                        hostid = results[i]["userid"];
                                        break;
                                    }
                                }
                                if (!ifexistsowner) rewritecheck = true;
                            }
                        }
                        if (rewritecheck) {
                            var tempnamevar = newChannel.name;
                            if (newChannel.name.substring(0, 5).includes("😈"))
                                tempnamevar = tempnamevar.replace(/😈/, '');
                            if (newChannel.name.substring(0, 5).includes("🎀"))
                                tempnamevar = tempnamevar.replace(/🎀/, '');
                            if (newChannel.name.substring(0, 5).includes("⏳"))
                                tempnamevar = tempnamevar.replace(/⏳/, '');
                            if (newChannel.name.substring(0, 5).includes("💤"))
                                tempnamevar = tempnamevar.replace(/💤/, '');
                            if (newChannel.name.substring(0, 5).includes("🐲"))
                                tempnamevar = tempnamevar.replace(/🐲/, '');
                            if (newChannel.name.substring(0, 5).includes("🎮"))
                                tempnamevar = tempnamevar.replace(/🎮/, '');
                            if (newChannel.name.substring(0, 5).includes("🎲"))
                                tempnamevar = tempnamevar.replace(/🎲/, '');
                            if (rpgvar.includes(newChannel.id)) {
                                tempnamevar = tempnamevar.replace("R:" + (rpgvar.indexOf(newChannel.id) + 1), '');
                            } else if (coopvar.includes(newChannel.id)) {
                                tempnamevar = tempnamevar.replace("O:" + (coopvar.indexOf(newChannel.id) + 1), '');
                            } else if (channelsvar.includes(newChannel.id)) {
                                tempnamevar = tempnamevar.replace(":" + (channelsvar.indexOf(newChannel.id) + 1), '');
                            }
                            tempnamevar = tempnamevar.trim();
                            let roomtt = 0;
                            let member = client.guilds.get('286198213612929024').members.get(userid);
                            if (rpgvar.includes(newChannel.id)) {
                                if (member.roles.has("381084562719113237")) {
                                    connection.query('UPDATE roleplay_masters SET isnotified=0,lastplay=? WHERE did=? AND status=1', [new Date().getTime(), userid]);
                                }
                                roomtt = 1;
                            } else if (coopvar.includes(newChannel.id)) roomtt = 3;

                            if (watchingmessagesuserid[ourchannel.id] != userid || !client.channels.get(vartextchannelid[ourchannel.id]).messages.has(watchingmessagesmessageid[ourchannel.id])) { //POSSIBLY DOUBLE MESSAGE PROBLEM, ALREADY ON EMOJI CHECK WORK
                                if (watchingmessagesuserid[ourchannel.id] != userid) console.log("CREATE NEW HOST 3");
                                if (!client.channels.get(vartextchannelid[ourchannel.id]).messages.has(watchingmessagesmessageid[ourchannel.id])) console.log("CREATE NEW HOST 4");

                                trimexpruser(logEntry.executor.id, roomtt);
                                if (activegamesroomsid.includes(newChannel.id))
                                    activegamesroomsid = removealt(activegamesroomsid, activegamesroomsid.indexOf(newChannel.id));
                                if (waitgamesroomsid.includes(newChannel.id))
                                    waitgamesroomsid = removealt(waitgamesroomsid, waitgamesroomsid.indexOf(newChannel.id));
                                if (rageroomsid.includes(newChannel.id))
                                    rageroomsid = removealt(rageroomsid, rageroomsid.indexOf(newChannel.id));
                                //logEntry.executor.send('```fix\nВы стали хостом.\n Текущее состояние игры - \⏳ (Набор игроков).\n Чтобы изменить статус на \🎲 (Идёт игра) или "перерыв" (\💤), кликни по соответствующему эмодзи внизу этого сообщения.\n Используйте 🔒, чтобы установить лимит равный количеству игроков в голосовой комнате. Снятие эмодзи уберёт лимит комнаты.\n Используйте 😈 в объявлении, чтобы обозначить использование мата в голосовой комнате, возможно установить только до выставления статуса "Идёт игра".\n```').then(async (msg) => {
                                await cleanoldmessages(client.channels.get(vartextchannelid[ourchannel.id]));
                                let msg = await client.channels.get(vartextchannelid[ourchannel.id]).send({
                                    reply: member.id,
                                    embed: {
                                        color: 7823103,
                                        /*author: {
                                            name: member.displayName.substring(0, 100),
                                            icon_url: member.user.displayAvatarURL
                                        },*/
                                        title: "Новый хост комнаты.",
                                        description: "Текущее состояние игры - \\⏳ (Набор игроков).\n Чтобы изменить статус на \\🎲 (Идёт игра) или \"перерыв\" (\\💤), кликни по соответствующему эмодзи внизу этого сообщения.\n Используйте 🔒, чтобы установить лимит равный количеству игроков в голосовой комнате. Снятие эмодзи уберёт лимит комнаты.\n Используйте \\😈 в объявлении, чтобы обозначить использование мата и контента нарушающего рамки приличия в голосовой и текстовой комнате.",
                                        timestamp: new Date(),
                                        footer: {
                                            text: member.id
                                        }
                                    }
                                }).catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                                console.log("3HOST MESSAGE:" + ourchannel.name + " ID:" + msg.id);

                                let enableverb = false;
                                enableverb = true;

                                watchingmessagesroomid[ourchannel.id] = ourchannel.id;
                                watchingmessagesserverid[ourchannel.id] = msg.channel.id;
                                watchingmessagesuserid[ourchannel.id] = logEntry.executor.id;
                                watchingmessagesmessageid[ourchannel.id] = msg.id;
                                try {
                                    await msg.react("516658670524956692");
                                    await msg.react("🎲");
                                    await msg.react("💤");
                                    await msg.react("🔒");
                                } catch (err) {
                                    if (err.code != 10008) {
                                        console.log("emojissenderror");
                                        process.exit(1);
                                    } else {
                                        console.log("emojissenderroropen");
                                        console.log(err);
                                    } //else{return;}
                                }
                                await newChannel.updateOverwrite(logEntry.executor.id, {
                                    MANAGE_CHANNELS: true,
                                    MANAGE_WEBHOOKS: false,
                                    CREATE_INSTANT_INVITE: true,
                                    MANAGE_ROLES: true,
                                    CONNECT: true,
                                    VIEW_CHANNEL: true,
                                    SPEAK: true,
                                    USE_VAD: true,
                                    MOVE_MEMBERS: true,
                                    DEAFEN_MEMBERS: false,
                                    MUTE_MEMBERS: false,
                                    PRIORITY_SPEAKER: true
                                });
                                let mychannel = newChannel;
                                if (channelsvar.includes(mychannel.id)) {

                                    if (mychannel.permissionOverwrites.get('500580990805213194') != undefined) //НИ
                                        if (!(mychannel.permissionOverwrites.get('500580990805213194').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                            await mychannel.updateOverwrite('500580990805213194', {
                                                MANAGE_CHANNELS: false
                                            });
                                            console.log("initclosedelperm:" + mychannel.name);
                                        }
                                } else if (coopvar.includes(mychannel.id)) {
                                    // var mychannel = newChannel;
                                    if (!(mychannel.permissionOverwrites.get('363054008564449281').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                        await mychannel.updateOverwrite('363054008564449281', {
                                            MANAGE_CHANNELS: false
                                        });
                                        //console.log("closeperm:" + c);
                                    }
                                } else if (rpgvar.includes(mychannel.id)) {
                                    // var mychannel = newChannel;
                                    if (!(mychannel.permissionOverwrites.get('381076993384382464').deny & Permissions.FLAGS.MANAGE_CHANNELS)) {
                                        await mychannel.updateOverwrite('381076993384382464', {
                                            MANAGE_CHANNELS: false
                                        });
                                        //console.log("closeperm:" + c);
                                    }
                                }
                                if (client.channels.get(vartextchannelid[ourchannel.id]) == undefined) {
                                    console.log("UNDEFINED:" + ourchannel.id + ":" + vartextchannelid[ourchannel.id]);
                                    process.exit(1);
                                }
                                await client.channels.get(vartextchannelid[ourchannel.id]).updateOverwrite(logEntry.executor.id, {
                                    CREATE_INSTANT_INVITE: true,
                                    MANAGE_CHANNELS: true,
                                    MANAGE_WEBHOOKS: false,
                                    MANAGE_ROLES: true,
                                    VIEW_CHANNEL: true,
                                    SEND_MESSAGES: true,
                                    SEND_TTS_MESSAGES: true,
                                    MANAGE_MESSAGES: true,
                                    EMBED_LINKS: true,
                                    ATTACH_FILES: true,
                                    READ_MESSAGE_HISTORY: true,
                                    MENTION_EVERYONE: true,
                                    USE_EXTERNAL_EMOJIS: true,
                                    ADD_REACTIONS: true
                                });





                                console.log("insertupdate:" + ourchannel.name);
                                await connection.query('INSERT INTO rememberedgamenames SET timestampexp=?,userid=?,roomid=?,gamename=?,messageid=?,messageserverid=?,roomtype=?', [new Date().getTime() + 60000, logEntry.executor.id, ourchannel.id, tempnamevar, msg.id, msg.channel.id, roomtt]);
                                let [results5, fields] = await connection.query('SELECT * FROM serverusers WHERE did=?', [member.id]);
                                if (results5.length != 0) {
                                    if (results5[0].blockedroomusers != null) {
                                        let arrayofdata = JSON.parse(results5[0].blockedroomusers);
                                        for (let item of arrayofdata) {
                                            if (client.guilds.get('286198213612929024').members.has(item)) {
                                                let tempSelection = client.guilds.get('286198213612929024').members.get(item);
                                                if (ourchannel.permissionOverwrites.get(tempSelection.id) == undefined || ourchannel.permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT ||
                                                    (!(ourchannel.permissionOverwrites.get(tempSelection.id).allow & Permissions.FLAGS.CONNECT) && !(ourchannel.permissionOverwrites.get(tempSelection.id).deny & Permissions.FLAGS.CONNECT))) {
                                                    await ourchannel.updateOverwrite(item, {
                                                        CONNECT: false
                                                    });
                                                    await client.channels.get(vartextchannelid[newChannel.id]).send("Чёрный список: Выставлен запрет на присоединение для пользователя <@" + item + ">.").catch((err) => {
                                                        if (err.code == 50007) console.log("Can't send M!");
                                                        else {
                                                            console.log(err);
                                                            process.exit(1);
                                                        }
                                                    });
                                                }
                                                if (ourchannel.members.has(item)) {
                                                    await tempSelection.voice.setChannel("456447660531122187");
                                                }

                                            } else if (enableverb) await client.channels.get(vartextchannelid[newChannel.id]).send("Чёрный список: Пользователь <@" + item + "> покинул сервер, пропускаем.").catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                        }
                                    }

                                }

                                await checkforemoji(ourchannel.id);
                                if (ourchannel.members.size == 0 //|| !ourchannel.members.has(logEntry.executor.id) || watchingmessagesuserid[ourchannel.id] == undefined
                                ) {
                                    console.log("startexeces");
                                    if (firstimeroomsetup.includes(ourchannel.id))
                                        firstimeroomsetup = removealt(firstimeroomsetup, firstimeroomsetup.indexOf(ourchannel.id));
                                }
                                //});
                            } else {
                                console.log("updategamename:" + ourchannel.name);
                                await connection.query('UPDATE rememberedgamenames SET gamename=? WHERE userid=? AND roomid=?', [tempnamevar, logEntry.executor.id, ourchannel.id]);
                            }
                            if (insetupafnct.includes(newChannel.id)) {
                                insetupafnct = removealt(insetupafnct, insetupafnct.indexOf(newChannel.id));
                            }
                        } else {
                            logEntry.executor.send('```fix\nВы изменили название комнаты, но хост уже определен, управление статусом комнаты есть только у хоста.\n```\nТекущий хост: <@' + hostid + '>').catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        }
                        break;
                    }
                }
            }
    }
    client.on('channelUpdate', async (oldChannel, newChannel) => {
        //console.log(oldChannel.name);
        if (channelsvar.includes(newChannel.id) || rpgvar.includes(newChannel.id) || coopvar.includes(newChannel.id)) {
            if (oldChannel.name != newChannel.name) {
                await client.guilds.get('286198213612929024').fetchAuditLogs({
                    type: 'CHANNEL_UPDATE',
                    limit: 6
                }).then(async audit => {
                    await setupfromauditlog(audit, newChannel);
                });
            }
        }
        //checkchannels();
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
    
    (async () => {
        await singlefire();
        let [result, fields] = await connection.query('SELECT * FROM rememberedgamenames WHERE roomid!=""');
        //console.log(result[0].roomid);
        //process.exit(1);
        var length = Object.keys(result).length;
        for (let i = 0; i < length; i++) {
            watchingmessagesroomid[result[i].roomid] = result[i].roomid;
            watchingmessagesserverid[result[i].roomid] = result[i].messageserverid;
            watchingmessagesuserid[result[i].roomid] = result[i].userid;
            watchingmessagesmessageid[result[i].roomid] = result[i].messageid;
            if (result[i].rage == 1)
                rageroomsid.push(result[i].roomid);
        };
        [result, fields] = await connection.query('SELECT * FROM roomslist WHERE groupid=1 ORDER BY id');
        var length = Object.keys(result).length;
        for (let i = 0; i < length; i++) {
            channelsvar.push(result[i].channelid);
            vartextchannelid[result[i].channelid] = result[i].textchannelid;
        };
        [result, fields] = await connection.query('SELECT * FROM roomslist WHERE groupid=2 ORDER BY id');
        var length = Object.keys(result).length;
        for (let i = 0; i < length; i++) {
            rpgvar.push(result[i].channelid);
            vartextchannelid[result[i].channelid] = result[i].textchannelid;
        };
        [result, fields] = await connection.query('SELECT * FROM roomslist WHERE groupid=3 ORDER BY id');
        var length = Object.keys(result).length;
        for (let i = 0; i < length; i++) {
            coopvar.push(result[i].channelid);
            vartextchannelid[result[i].channelid] = result[i].textchannelid;
        };
        client.login('заменить');
    })();
} catch (err) {

    console.log("new error:" + err);
    process.exit(1);
}