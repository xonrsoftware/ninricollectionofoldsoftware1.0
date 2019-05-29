try {
    const Discord = require('discord.js');
    const client = new Discord.Client({
        fetchAllMembers: true
    });
    var pendingcreate = 0;
    var firstrun = true;
    let isready = false;
    client.on('ready', async () => {
        if (isready) return;
        else isready = true;
        // wait(2000);
        await client.user.setStatus('invisible');
        setInterval(function () {
            client.user.setStatus('invisible');
        }, 600000);
        setInterval(async function () {
            await checkmasters();
        }, 30000);
    });

    async function checkmasters() {
        await connection.query('SELECT * FROM roleplay_masters WHERE status=1', async function (error, result, fields) {
            if (error) throw error;
            var length = Object.keys(result).length;
            var channelscontainer = [];
            var userscontainer = [];
            for (var i = 0; i < length; i++) {
                userscontainer.push(result[i].did);
                if (client.guilds.get('286198213612929024').members.has(result[i].did)) {
                    await client.guilds.get('286198213612929024').members.fetch(client.users.get(result[i].did)).then(async (member) => {
                        if (member != undefined) {
                            if (!member.roles.has("381084562719113237") && (result[i].lastplay == null || new Date().getTime() - result[i].lastplay < 2160000000)) {
                                await connection.query('UPDATE roleplay_masters SET lastplay=? WHERE did=?', [new Date().getTime() - 2160000000, result[i].did], function (error, result, fields) {
                                    if (error) throw error;
                                });
                                channelscontainer.push(result[i].channelid);
                                console.log("SET LASTPLAY WARN");
                            } else if (new Date().getTime() - result[i].lastplay > 2592000000) {

                                //console.log("FFFfw13313213eqweq31F");
                                //  console.log("FFFF:"+result[i].did);
                                if (client.guilds.get('286198213612929024').channels.has(result[i].channelid)) {
                                    await client.guilds.get('286198213612929024').channels.get(result[i].channelid).delete().catch(async function (reason) {
                                        console.log("ERROR1:" + reason);
                                        if (reason.code != 10008 && reason.code != 10003) {
                                            console.log("Emoji message get error.");
                                            console.log(reason);
                                            process.exit(1);
                                        }
                                    });
                                    await member.send("Внимание!\nВаш текстовый канал в разделе Ролевых игр удалён!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                }
                                if (member.roles.has("381084562719113237")) {
                                    await member.roles.remove('381084562719113237').catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    await member.send("Внимание!\nУ вас была убрана роль Мастера!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                }
                                await client.guilds.get('286198213612929024').channels.get("382552139618189312").messages.fetch({
                                    limit: 100
                                }).then(async messages => {
                                    const botMessages = messages.filter(msg => member.user.id == msg.author.id);
                                    //console.log(botMessages);
                                    if (botMessages.array().length > 0) {
                                        await member.send("Вы не провели не одной игры в течение месяца, ваша анкета в <#382552139618189312> удалена!").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                        await botMessages.forEach(async (entry) => {
                                            await member.send("```" + entry.content + "```").catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                        });
                                        await client.guilds.get('286198213612929024').channels.get("382552139618189312").bulkDelete(botMessages);
                                    }
                                });
                                await connection.query('UPDATE roleplay_masters SET status=0 WHERE did=?', [result[i].did], function (error, result, fields) {
                                    if (error) throw error;
                                });
                            } else if (!member.roles.has("381084562719113237") && !client.guilds.get('286198213612929024').channels.has(result[i].channelid)) {

                                await client.guilds.get('286198213612929024').channels.get("382552139618189312").messages.fetch({
                                    limit: 100
                                }).then(async messages => {
                                    const botMessages = messages.filter(msg => member.user.id == msg.author.id);
                                    if (botMessages.array().length > 0) {
                                        await member.send("У вас отсутствует роль Мастера, ваша анкета в <#382552139618189312> удалена!").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                        await botMessages.forEach(async (entry) => {
                                            await member.send("```" + entry.content + "```").catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                        });
                                        await client.guilds.get('286198213612929024').channels.get("382552139618189312").bulkDelete(botMessages);
                                    }
                                });
                                await member.send("Внимание!\nУ вас отсутствует роль Мастера, а текстовый канал был удалён!").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                                await connection.query('UPDATE roleplay_masters SET status=0 WHERE did=?', [result[i].did], function (error, result, fields) {
                                    if (error) throw error;
                                });
                            } else if (new Date().getTime() - result[i].lastplay > 2160000000 && result[i].isnotified == 0) {
                                if (client.guilds.get('286198213612929024').channels.has(result[i].channelid)) {

                                    await member.send("Внимание!\nВаш текстовый канал <#" + result[i].channelid + "> в разделе Ролевых игр будет удалён через 5 дней, ваша анкета в <#382552139618189312> убрана (если она у вас есть), как и роль Мастера. Для предотвращения, вам необходимо иметь роль мастера и провести хотя бы одну игру в течение 5 дней!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    await connection.query('UPDATE roleplay_masters SET isnotified=1 WHERE did=?', [result[i].did], function (error, result, fields) {
                                        if (error) throw error;
                                    });
                                    channelscontainer.push(result[i].channelid);
                                } else {
                                    /* if(!member.roles.has("381084562719113237")){
                                         await connection.query('UPDATE roleplay_masters SET isnotified=1,status=0 WHERE did=?', [result[i].did], function (error, result, fields) {
                                             if (error) throw error;
                                         });
                                         member.send("Внимание!\nВаш текстовый канал в разделе Ролевых игр удалён!");
                                     }else{*/
                                    await member.send("Внимание!\nВаш текстовый канал в разделе Ролевых игр удалён!\nВаша анкета в <#382552139618189312> будет удалена через 5 дней. (Если она у вас есть)").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    await connection.query('UPDATE roleplay_masters SET isnotified=1 WHERE did=?', [result[i].did], function (error, result, fields) {
                                        if (error) throw error;
                                    });

                                    //}
                                }
                            } else channelscontainer.push(result[i].channelid);

                        } else {
                            var userid = result[i].did;

                            if (client.guilds.get('286198213612929024').channels.has(result[i].channelid)) {
                                await client.guilds.get('286198213612929024').channels.get(result[i].channelid).delete().catch(async function (reason) {
                                    console.log("ERROR2:" + reason);
                                    if (reason.code != 10008 && reason.code != 10003) {
                                        console.log("Emoji message get error.");
                                        console.log(reason);
                                        process.exit(1);
                                    }
                                });
                            }
                            await client.guilds.get('286198213612929024').channels.get("382552139618189312").messages.fetch({
                                limit: 100
                            }).then(async messages => {
                                const botMessages = messages.filter(msg => userid == msg.author.id);
                                if (botMessages.array().length > 0)
                                    await client.guilds.get('286198213612929024').channels.get("382552139618189312").bulkDelete(botMessages);
                            });
                            await connection.query('UPDATE roleplay_masters SET isnotified=1,status=0 WHERE did=?', [result[i].did], function (error, result, fields) {
                                if (error) throw error;
                            });
                            console.log("User leave");
                        }
                    });
                } else {
                    var userid = result[i].did;

                    if (client.guilds.get('286198213612929024').channels.has(result[i].channelid)) {
                        await client.guilds.get('286198213612929024').channels.get(result[i].channelid).delete().catch(async function (reason) {
                            console.log("ERROR3:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                    }
                    await client.guilds.get('286198213612929024').channels.get("382552139618189312").messages.fetch({
                        limit: 100
                    }).then(async messages => {
                        const botMessages = messages.filter(msg => userid == msg.author.id);
                        if (botMessages.array().length > 0)
                            await client.guilds.get('286198213612929024').channels.get("382552139618189312").bulkDelete(botMessages);
                    });
                    await connection.query('UPDATE roleplay_masters SET isnotified=1,status=0 WHERE did=?', [result[i].did], function (error, result, fields) {
                        if (error) throw error;
                    });
                    console.log("User leave");
                }
            }
            await Promise.all(client.guilds.get('286198213612929024').channels.filter(ch => ch.parentID == "502467814548963340" && !channelscontainer.includes(ch.id) && pendingcreate == 0).map(function (ch) {
                return ch.delete();
            })).catch(async function (reason) {
                console.log("ERROR4:" + reason);
                if (reason.code != 10008 && reason.code != 10003) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });
            if (firstrun) {
                firstrun = false;
                console.log("firstrun");
                await client.channels.get("382552139618189312").messages.fetch().then(async (messages) => {
                    console.log("fetch");
                    for (let msg of messages.values()) {
                        if (!userscontainer.includes(msg.author.id)) {
                           await connection.query('SELECT * FROM roleplay_masters WHERE did=? LIMIT 1', [msg.author.id], async function (error, result, fields) {
                                if (error) throw error;
                                if (result == undefined || result[0] == undefined || result[0].did == undefined) {
                                    //var prevpos = Number(client.channels.get('399846088494022656').position) + 1;
                                    pendingcreate++;

                                    await client.guilds.get('286198213612929024').channels.create('мастер ' + msg.author.username, {
                                        type: 'text',
                                        parent: '502467814548963340',
                                        permissionOverwrites: [{
                                                id: msg.author.id,
                                                allow: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'EMBED_LINKS'],
                                            },
                                            {
                                                id: "381084562719113237",
                                                deny: ['VIEW_CHANNEL'],
                                            },
                                            {
                                                id: "381084879623946244",
                                                deny: ['VIEW_CHANNEL'],
                                            },
                                            {
                                                id: "381076993384382464",
                                                deny: ['VIEW_CHANNEL'],
                                            },
                                            {
                                                id: "286198213612929024",
                                                deny: ['VIEW_CHANNEL'],
                                            }
                                        ],
                                    }).then(async (channel) => {
                                        await msg.member.roles.add('381084562719113237');
                                        await msg.author.send("Вам была выдана роль мастер, мы создали текстовый канал <#" + channel.id + "> для вас. Вам выданы все права на этот канал.\nВнимание! Вам необходимо создавать минимум 1 ролевую игру за 30 дней, иначе текстовый канал будет удалён, ваша анкета в <#382552139618189312> убрана (если она у вас есть), как и роль Мастера. Вы получите уведомление за 5 дней о удалении.\n**Текстовый канал не обязательно должен быть скрытным, его можно сделать публичным через настройку прав. Выдать доступ отдельным людям можно через добавление их в права канала.**").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                        await connection.query('INSERT INTO roleplay_masters SET lastplay=?,channelid=?,did=?', [new Date().getTime(), channel.id, msg.author.id], function (error, result, fields) {
                                            if (error) throw error;
                                        });
                                        pendingcreate--;

                                    });
                                } else {
                                    var channelid = null;
                                    var boolneedtode = false;
                                    if (result[0].channelid == null || !client.guilds.get('286198213612929024').channels.has(result[0].channelid)) {
                                        //var prevpos = Number(client.channels.get('399846088494022656').position) + 1;
                                        pendingcreate++;
                                        boolneedtode = true;

                                        await client.guilds.get('286198213612929024').channels.create('мастер ' + msg.author.username, {
                                            type: 'text',
                                            parent: '502467814548963340',
                                            permissionOverwrites: [{
                                                    id: msg.author.id,
                                                    allow: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'EMBED_LINKS'],
                                                },
                                                {
                                                    id: "381084562719113237",
                                                    deny: ['VIEW_CHANNEL'],
                                                },
                                                {
                                                    id: "381084879623946244",
                                                    deny: ['VIEW_CHANNEL'],
                                                },
                                                {
                                                    id: "381076993384382464",
                                                    deny: ['VIEW_CHANNEL'],
                                                },
                                                {
                                                    id: "286198213612929024",
                                                    deny: ['VIEW_CHANNEL'],
                                                }
                                            ],
                                        }).then(async (channel) => {
                                            channelid = channel.id;

                                        });
                                    } else channelid = result[0].channelid;
                                    await msg.member.roles.add('381084562719113237');
                                    await msg.author.send("Вам была выдана роль мастер, мы создали текстовый канал <#" + channelid + "> для вас. Вам выданы все права на этот канал.\nВнимание! Вам необходимо создавать минимум 1 ролевую игру за 30 дней, иначе текстовый канал будет удалён, ваша анкета в <#382552139618189312> убрана (если она у вас есть), как и роль Мастера. Вы получите уведомление за 5 дней о удалении.\n**Текстовый канал не обязательно должен быть скрытным, его можно сделать публичным через настройку прав. Выдать доступ отдельным людям можно через добавление их в права канала.**").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    await connection.query('UPDATE roleplay_masters SET lastplay=?,channelid=?,isnotified=0,status=1 WHERE did=?', [new Date().getTime(), channelid, msg.author.id], function (error, result, fields) {
                                        if (error) throw error;
                                    });
                                    if (boolneedtode) pendingcreate--;
                                }

                            });
                        }
                    }
                }).catch(function (reason) {
                    process.exit(1);
                    console.log("err:" + reason);
                });
            }
        });
    }
    client.on('message', async msg => {
        if (msg.channel.id == "478312979843252234") {
            if (msg.content.match(/^!мастер/)) {
                if (msg.member.roles.has("381084562719113237")) {
                    await connection.query('SELECT * FROM roleplay_masters WHERE did=? LIMIT 1', [msg.author.id], async function (error, result, fields) {
                        if (error) throw error;
                        if (result[0].channelid != null) {
                            await connection.query('UPDATE roleplay_masters SET lastplay=?,isnotified=1 WHERE did=? LIMIT 1', [new Date().getTime() - 2160000000, msg.author.id], function (error, result, fields) {
                                if (error) throw error;
                            });
                            await msg.member.roles.remove('381084562719113237');
                            await msg.author.send("Внимание!\nУ вас была убрана роль Мастера, ваш текстовый канал <#" + result[0].channelid + "> в разделе Ролевых игр будет удалён через 5 дней, ваша анкета в <#382552139618189312> убрана (если она у вас есть), как и роль Мастера.").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        } else {
                            await msg.member.roles.remove('381084562719113237');
                            await msg.author.send("Внимание!\nУ вас была убрана роль Мастера!").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                        }
                    });

                } else {
                    await  connection.query('SELECT * FROM roleplay_masters WHERE did=? LIMIT 1', [msg.author.id], async function (error, result, fields) {
                        if (error) throw error;
                        if (result == undefined || result[0] == undefined || result[0].did == undefined) {
                            //var prevpos = Number(client.channels.get('399846088494022656').position) + 1;
                            pendingcreate++;
                            await client.guilds.get('286198213612929024').channels.create('мастер ' + msg.author.username, {
                                type: 'text',
                                parent: '502467814548963340',
                                permissionOverwrites: [{
                                        id: msg.author.id,
                                        allow: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'EMBED_LINKS'],
                                    },
                                    {
                                        id: "381084562719113237",
                                        deny: ['VIEW_CHANNEL'],
                                    },
                                    {
                                        id: "381084879623946244",
                                        deny: ['VIEW_CHANNEL'],
                                    },
                                    {
                                        id: "381076993384382464",
                                        deny: ['VIEW_CHANNEL'],
                                    },
                                    {
                                        id: "286198213612929024",
                                        deny: ['VIEW_CHANNEL'],
                                    }
                                ],
                            }).then(async (channel) => {
                                await msg.member.roles.add('381084562719113237');
                                await msg.author.send("Вам была выдана роль мастер, мы создали текстовый канал <#" + channel.id + "> для вас. Вам выданы все права на этот канал.\nВнимание! Вам необходимо создавать минимум 1 ролевую игру за 30 дней, иначе текстовый канал будет удалён, ваша анкета в <#382552139618189312> убрана (если она у вас есть), как и роль Мастера. Вы получите уведомление за 5 дней о удалении.\n**Текстовый канал не обязательно должен быть скрытным, его можно сделать публичным через настройку прав. Выдать доступ отдельным людям можно через добавление их в права канала.**").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                                await connection.query('INSERT INTO roleplay_masters SET lastplay=?,channelid=?,did=?', [new Date().getTime(), channel.id, msg.author.id], function (error, result, fields) {
                                    if (error) throw error;
                                });
                                pendingcreate--;

                            });
                        } else {
                            var channelid = null;
                            var boolneedtode = false;
                            if (result[0].channelid == null || !client.guilds.get('286198213612929024').channels.has(result[0].channelid)) {
                                //var prevpos = Number(client.channels.get('399846088494022656').position) + 1;
                                pendingcreate++;
                                boolneedtode = true;
                                await client.guilds.get('286198213612929024').channels.create('мастер ' + msg.author.username, {
                                    type: 'text',
                                    parent: '502467814548963340',
                                    permissionOverwrites: [{
                                            id: msg.author.id,
                                            allow: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'EMBED_LINKS'],
                                        },
                                        {
                                            id: "381084562719113237",
                                            deny: ['VIEW_CHANNEL'],
                                        },
                                        {
                                            id: "381084879623946244",
                                            deny: ['VIEW_CHANNEL'],
                                        },
                                        {
                                            id: "381076993384382464",
                                            deny: ['VIEW_CHANNEL'],
                                        },
                                        {
                                            id: "286198213612929024",
                                            deny: ['VIEW_CHANNEL'],
                                        }
                                    ],
                                }).then(async (channel) => {
                                    channelid = channel.id;

                                });
                            } else channelid = result[0].channelid;
                            await msg.member.roles.add('381084562719113237');
                            await msg.author.send("Вам была выдана роль мастер, мы создали текстовый канал <#" + channelid + "> для вас. Вам выданы все права на этот канал.\nВнимание! Вам необходимо создавать минимум 1 ролевую игру за 30 дней, иначе текстовый канал будет удалён, ваша анкета в <#382552139618189312> убрана (если она у вас есть), как и роль Мастера. Вы получите уведомление за 5 дней о удалении.\n**Текстовый канал не обязательно должен быть скрытным, его можно сделать публичным через настройку прав. Выдать доступ отдельным людям можно через добавление их в права канала.**").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                            await connection.query('UPDATE roleplay_masters SET lastplay=?,channelid=?,isnotified=0,status=1 WHERE did=?', [new Date().getTime(), channelid, msg.author.id], function (error, result, fields) {
                                if (error) throw error;
                            });
                            if (boolneedtode) pendingcreate--;
                        }

                    });
                }
            }

        } else if (msg.channel.id == "382552139618189312") {
            if (!msg.member.roles.has("381084562719113237")) {
                await connection.query('SELECT * FROM roleplay_masters WHERE did=? LIMIT 1', [msg.author.id], async function (error, result, fields) {
                    if (error) throw error;
                    if (result == undefined || result[0] == undefined || result[0].did == undefined) {
                        // var prevpos = Number(client.channels.get('399846088494022656').position) + 1;
                        pendingcreate++;
                        await client.guilds.get('286198213612929024').channels.create('мастер ' + msg.author.username, {
                            type: 'text',
                            parent: '502467814548963340',
                            permissionOverwrites: [{
                                    id: msg.author.id,
                                    allow: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'EMBED_LINKS'],
                                },
                                {
                                    id: "381084562719113237",
                                    deny: ['VIEW_CHANNEL'],
                                },
                                {
                                    id: "381084879623946244",
                                    deny: ['VIEW_CHANNEL'],
                                },
                                {
                                    id: "381076993384382464",
                                    deny: ['VIEW_CHANNEL'],
                                },
                                {
                                    id: "286198213612929024",
                                    deny: ['VIEW_CHANNEL'],
                                }
                            ],
                        }).then(async (channel) => {
                            await msg.member.roles.add('381084562719113237');
                            await msg.author.send("Вам была выдана роль мастер, мы создали текстовый канал <#" + channel.id + "> для вас. Вам выданы все права на этот канал.\nВнимание! Вам необходимо создавать минимум 1 ролевую игру за 30 дней, иначе текстовый канал будет удалён, ваша анкета в <#382552139618189312> убрана (если она у вас есть), как и роль Мастера. Вы получите уведомление за 5 дней о удалении.\n**Текстовый канал не обязательно должен быть скрытным, его можно сделать публичным через настройку прав. Выдать доступ отдельным людям можно через добавление их в права канала.**").catch((err) => {
                                if (err.code == 50007) console.log("Can't send M!");
                                else {
                                    console.log(err);
                                    process.exit(1);
                                }
                            });
                            await connection.query('INSERT INTO roleplay_masters SET lastplay=?,channelid=?,did=?', [new Date().getTime(), channel.id, msg.author.id], function (error, result, fields) {
                                if (error) throw error;
                            });
                            pendingcreate--;

                        });
                    } else {
                        var channelid = null;
                        var boolneedtode = false;
                        if (result[0].channelid == null || !client.guilds.get('286198213612929024').channels.has(result[0].channelid)) {
                            //var prevpos = Number(client.channels.get('399846088494022656').position) + 1;
                            pendingcreate++;
                            boolneedtode = true;
                            await client.guilds.get('286198213612929024').channels.create('мастер ' + msg.author.username, {
                                type: 'text',
                                parent: '502467814548963340',
                                permissionOverwrites: [{
                                        id: msg.author.id,
                                        allow: ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'MANAGE_WEBHOOKS', 'MANAGE_ROLES', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'ADD_REACTIONS', 'EMBED_LINKS'],
                                    },
                                    {
                                        id: "381084562719113237",
                                        deny: ['VIEW_CHANNEL'],
                                    },
                                    {
                                        id: "381084879623946244",
                                        deny: ['VIEW_CHANNEL'],
                                    },
                                    {
                                        id: "381076993384382464",
                                        deny: ['VIEW_CHANNEL'],
                                    },
                                    {
                                        id: "286198213612929024",
                                        deny: ['VIEW_CHANNEL'],
                                    }
                                ],
                            }).then(async (channel) => {
                                channelid = channel.id;
                            });
                        } else channelid = result[0].channelid;
                        await msg.member.roles.add('381084562719113237');
                        await msg.author.send("Вам была выдана роль мастер, мы создали текстовый канал <#" + channelid + "> для вас. Вам выданы все права на этот канал.\nВнимание! Вам необходимо создавать минимум 1 ролевую игру за 30 дней, иначе текстовый канал будет удалён, ваша анкета в <#382552139618189312> убрана (если она у вас есть), как и роль Мастера. Вы получите уведомление за 5 дней о удалении.\n**Текстовый канал не обязательно должен быть скрытным, его можно сделать публичным через настройку прав. Выдать доступ отдельным людям можно через добавление их в права канала.**").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                        await connection.query('UPDATE roleplay_masters SET lastplay=?,channelid=?,isnotified=0,status=1 WHERE did=?', [new Date().getTime(), channelid, msg.author.id], function (error, result, fields) {
                            if (error) throw error;
                        });
                        if (boolneedtode) pendingcreate--;

                    }

                });
            }
        }

    });
    // Initialize the invite cache
    var invites = {};
    process.on('unhandledRejection', function (reason, p) {
        console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
        process.exit(1);
        //Задержка вызывает игнорирование ошибки и комната отмечается как удаленная.
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
        //process.exit(1);
    });
    client.on("disconnected", (error) => {
        console.log("Disconnected!");
        setTimeout(function () {
            process.exit(1);
        }, 3000);
        //process.exit(1);
    });
    client.on('error', (error) => {
        console.log("Error d.js!");
        process.exit(1);
    });
    // A pretty useful method to create a delay without blocking the whole script.
    function wait(mil) {
        return new Promise(done => setTimeout(done, mil));
    }
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'заменить',
        password: 'заменить',
        database: 'заменить',
        charset: 'utf8mb4'
    });
    connection.connect();
    setInterval(function () {
        connection.query('SELECT 1');
    }, 5000);
    client.login('заменить');
} catch (err) {

    console.log("new error:" + err);
    process.exit(1);

}