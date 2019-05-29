try {
    const Discord = require('discord.js');
    const client = new Discord.Client({
        fetchAllMembers: true
    });
    var allowedchannels = [
        "292302492090368000",
        "478312979843252234"
    ];
    var fs = require('fs');
    client.on('error', (error) => {
        console.log("Error d.js!");
        process.exit(1);
    });
    client.on('message', msg => {
        if (msg.content.startsWith("!ксоздатьинвайт") && (msg.member.roles.has('286201408238387201') || msg.member.roles.has('294447183921414145') || msg.member.roles.has('389081897646424064'))) {
            var channel = msg.mentions.channels.first();
            if (channel != undefined) {
                client.guilds.get('286198213612929024').channels.get(channel.id).createInvite({
                    maxAge: 0,
                    unique: true
                }).then((invite) => {
                    msg.channel.send("https://discord.gg/" + invite.code).catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                    if (msg.channel.id != "478312979843252234" && msg.channel.type != "dm" && !msg.deleted)
                        msg.delete().catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                });
            }

        } else if (msg.member != null && msg.member.roles.has('480916170203987990')) {

            if (msg.content.startsWith("!кпсоздать")) {
                var channel = msg.mentions.channels.first();
                if (channel != undefined) {
                    var invitename = msg.content.match(new RegExp("^!кпсоздать(.*)\<\#" + channel.id + "\>$", 'i'));
                    if (invitename[1] != undefined && invitename[1].trim() != "") {
                        var invitename = invitename[1].trim();
                        //console.log(invitename);
                        //console.log(channel);
                        if (allowedchannels.includes(channel.id) || msg.author.id == "466293410848964609") {
                            client.guilds.get('286198213612929024').channels.get(channel.id).createInvite({
                                maxAge: 0,
                                unique: true
                            }).then((invite) => {
                                connection.query('INSERT INTO pinvitelist SET invitecode=?,did=?,namevar=?,channelid=?', [invite.code, msg.author.id, invitename, channel.id], function (error, results3, fields) {
                                    if (error) throw error;
                                    client.guilds.get('286198213612929024').fetchInvites().then(guildInvites => {
                                        invites = guildInvites;
                                        var steamUserEmbed = new Discord.MessageEmbed()
                                        steamUserEmbed.setColor(7823103);
                                        steamUserEmbed.addField("Код приглашения", invite.code, true);
                                        steamUserEmbed.addField("Имя приглашения", invitename, true);
                                        steamUserEmbed.addBlankField(true);
                                        steamUserEmbed.addField("Канал приглашения", "<#" + channel.id + ">", true);
                                        steamUserEmbed.addField("Уведомления", "Включены", true);
                                        steamUserEmbed.addBlankField(true);
                                        steamUserEmbed.addField("Ссылка приглашения", "https://discord.gg/" + invite.code, true);
                                        msg.author.send({
                                            embed: steamUserEmbed
                                        }).catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    });
                                    //invites.push(invite);

                                });


                            });
                        } else msg.author.send("Для выбранного канала запрещено создавать приглашение, список разрешённых каналов: <#292302492090368000>,<#478312979843252234>").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    } else msg.author.send("Вы не указали кодовое название для приглашения!").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                } else msg.author.send("Вы не указали текстовый канал!").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
                if (msg.channel.id != "478312979843252234" && msg.channel.type != "dm" && !msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
            } else if (msg.content.startsWith("!кпсписок")) {

                connection.query('SELECT * FROM pinvitelist WHERE did=?', [msg.author.id], function (error, results5, fields) {
                    if (results5.length > 0) {
                        results5.forEach(async (invitett) => {
                            await connection.query('SELECT did FROM serverusers WHERE invitecode=? AND state=1', [invitett.invitecode], async function (error, results5, fields) {
                                var activeusers = results5.length;
                                await connection.query('SELECT did FROM serverusers WHERE invitecode=? AND state=0', [invitett.invitecode], async function (error, results6, fields) {
                                    var leavedusers = results6.length;
                                    var steamUserEmbed = new Discord.MessageEmbed()
                                    steamUserEmbed.setColor(7823103);
                                    steamUserEmbed.addField("Код приглашения", invitett.invitecode, true);
                                    steamUserEmbed.addField("Имя приглашения", invitett.namevar, true);
                                    steamUserEmbed.addField("Канал приглашения", "<#" + invitett.channelid + ">", true);
                                    steamUserEmbed.addBlankField(true);
                                    if (invitett.is_notification == 1)
                                        steamUserEmbed.addField("Уведомления", "Включены", true);
                                    else
                                        steamUserEmbed.addField("Уведомления", "Выключены", true);
                                    steamUserEmbed.addBlankField(true);
                                    steamUserEmbed.addField("Приглашено активных пользователей", activeusers, true);
                                    steamUserEmbed.addField("Покинули сервер после приглашения", leavedusers, true);
                                    //steamUserEmbed.addBlankField(true);
                                    steamUserEmbed.addField("Ссылка приглашения", "https://discord.gg/" + invitett.invitecode, false);
                                    steamUserEmbed.addField("Всего приглашено пользователей", invitett.joins, true);
                                    steamUserEmbed.addField("Всего переходов (Данные дискорда):", invites.find(i => i.code == invitett.invitecode).uses, true);
                                    await msg.author.send({
                                        embed: steamUserEmbed
                                    }).catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            });
                        });
                    } else msg.author.send("У вас отсутствуют созданные приглашения!").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                });
                if (msg.channel.id != "478312979843252234" && msg.channel.type != "dm" && !msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
            } else if (msg.content.startsWith("!кпуведомления")) {
                var invitename = msg.content.match(new RegExp("^!кпуведомления(.*)$", 'i'));
                if (invitename[1] != undefined && invitename[1].trim() != "") {
                    var invitename = invitename[1].trim();
                    connection.query('SELECT * FROM pinvitelist WHERE did=? AND invitecode=?', [msg.author.id, invitename], function (error, results5, fields) {
                        if (results5.length != 0) {
                            if (results5[0].is_notification == 1)
                                connection.query('UPDATE pinvitelist SET is_notification=0 WHERE did=? AND invitecode=?', [msg.author.id, invitename], async function (error, results3, fields) {
                                    msg.author.send("Уведомления для приглашения " + invitename + " были выключены!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            else
                                connection.query('UPDATE pinvitelist SET is_notification=1 WHERE did=? AND invitecode=?', [msg.author.id, invitename], async function (error, results3, fields) {
                                    msg.author.send("Уведомления для приглашения " + invitename + " были включены!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                        } else msg.author.send("Неверный код приглашения!").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    });
                } else msg.author.send("Укажите код приглашения!").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
                if (msg.channel.id != "478312979843252234" && msg.channel.type != "dm" && !msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
            } else if (msg.content.startsWith("!кпимя")) {
                var replacevar = msg.content.match(new RegExp("\^!кпимя(.*)\$", 'i'));
                if (replacevar[1] != undefined && replacevar[1].trim() != "") {
                    replacevar = replacevar[1].trim().split(/\s+(.+)/);
                    //console.log(replacevar);
                    if (replacevar[0] != undefined && replacevar[0].trim() != "") {
                        var invitename = replacevar[0].trim();
                        // console.log(invitename);
                        if (replacevar[1] != undefined && replacevar[1].trim() != "") {
                            var changename = replacevar[1].trim();
                            connection.query('SELECT * FROM pinvitelist WHERE did=? AND invitecode=?', [msg.author.id, invitename], function (error, results5, fields) {
                                if (results5.length != 0) {
                                    connection.query('UPDATE pinvitelist SET namevar=? WHERE did=? AND invitecode=?', [changename, msg.author.id, invitename], async function (error, results3, fields) {
                                        msg.author.send("Имя для приглашения " + invitename + " было изменено с **" + results5[0].namevar + "** на **" + changename + "**.").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                    });
                                } else msg.author.send("Неверный код приглашения!").catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                            });
                        } else msg.author.send("Укажите имя приглашения!").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    } else msg.author.send("Укажите код приглашения!").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                } else msg.author.send("Неправильный формат, нужный !кпимя код имя").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
                if (msg.channel.id != "478312979843252234" && msg.channel.type != "dm" && !msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
            } else if (msg.content.startsWith("!кпсп")) {
                var invitename = msg.content.match(new RegExp("^!кпсп(.*)$", 'i'));
                if (invitename[1] != undefined && invitename[1].trim() != "") {
                    var invitename = invitename[1].trim();
                    connection.query('SELECT * FROM pinvitelist WHERE did=? AND invitecode=?', [msg.author.id, invitename], function (error, results555, fields) {
                        if (results555.length != 0) {

                            connection.query('SELECT did FROM serverusers WHERE invitecode=? AND state=1 ORDER BY jointime', [results555[0].invitecode], async function (error, results533, fields) {
                                if (error) throw error;
                                var length = Object.keys(results533).length;
                                var activeusers = length;
                                var listofactiveusers = "\nСписок активных пользователей принявших приглашение:\n";
                                if (activeusers > 0) {

                                    var d = 0;
                                    for (var i = 0; i < length; i++) {
                                        var sweetmember = await client.guilds.get('286198213612929024').members.fetch(results533[i].did);
                                        var userstring = "<@" + results533[i].did + ">";
                                        if (sweetmember.roles.has("288997533546708992"))
                                            userstring += " @Tabletop Simulator";
                                        if (sweetmember.roles.has("479701746013437954"))
                                            userstring += " @Пират Tabletop Simulator";
                                        if (sweetmember.roles.has("468286292430422016"))
                                            userstring += " @Tabletopia";
                                        if (sweetmember.roles.has("468285710470742046"))
                                            userstring += " @Vassal";
                                        if (sweetmember.roles.has("468289785312837632"))
                                            userstring += " @Другая платформа";
                                        if (sweetmember.roles.has("381076993384382464"))
                                            userstring += " @Настольные ролевые игры";
                                        if (sweetmember.roles.has("363054008564449281"))
                                            userstring += " @Не настольные игры";
                                        if (sweetmember.roles.has("500580990805213194"))
                                            userstring += " @Настольные игры";

                                        if (d == 0) {
                                            listofactiveusers += userstring;
                                            d++;
                                        } else if (d == 1) {
                                            listofactiveusers += " - " + userstring;
                                            d++;
                                        } else if (d == 2) {
                                            listofactiveusers += " - " + userstring + "\n";
                                            d = 0;
                                        }
                                    }
                                } else listofactiveusers = "\nНет активных пользователей принявших приглашение.\n";
                                await connection.query('SELECT did FROM serverusers WHERE invitecode=? AND state=0 ORDER BY leavetime', [results555[0].invitecode], async function (error, results6221, fields) {
                                    if (error) throw error;
                                    var length = Object.keys(results6221).length;
                                    var leavedusers = length;
                                    var listofleaved = "\nСписок покинувших пользователей после принятия приглашения:\n";
                                    if (leavedusers > 0) {

                                        var d = 0;
                                        for (var i = 0; i < length; i++) {
                                            var userstring = "<@" + results6221[i].did + ">";
                                            if (d == 0) {
                                                listofleaved += userstring;
                                                d++;
                                            } else if (d == 1) {
                                                listofleaved += " - " + userstring;
                                                d++;
                                            } else if (d == 2) {
                                                listofleaved += " - " + userstring + "\n";
                                                d = 0;
                                            }
                                        }
                                    } else listofleaved = "\nНет покинувших после принятия приглашения пользователей.";
                                    var messagebuild = "**" + results555[0].invitecode + "** - " + results555[0].namevar + "\nПриглашено активных пользователей: " + activeusers + " - Покинули сервер после приглашения: " + leavedusers + " - Всего переходов (Данные дискорда): " + invites.find(i => i.code == results555[0].invitecode).uses + "\n";
                                    messagebuild += listofactiveusers;
                                    messagebuild += listofleaved;
                                    await msg.author.send(messagebuild, {
                                        "split": true
                                    }).catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                });
                            })
                        } else msg.author.send("Неверный код приглашения!").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    });
                } else msg.author.send("Укажите код приглашения!").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
                if (msg.channel.id != "478312979843252234" && msg.channel.type != "dm" && !msg.deleted)
                    msg.delete().catch(async function (reason) {
                        console.log("ERROR1:" + reason);
                        if (reason.code != 10008 && reason.code != 10003) {
                            console.log("Emoji message get error.");
                            console.log(reason);
                            process.exit(1);
                        }
                    });
            }
        }
    });
    // Initialize the invite cache
    var invites = {};
    process.on('unhandledRejection', function (reason, p) {
        console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
        // application specific logging here
    });
    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ', err);
        setTimeout(function () {
            process.exit(1);
        }, 1000);
        // process.exit(1);
    });
    client.on("disconnect", (error) => {
        console.log("Disconnected!");
        setTimeout(function () {
            process.exit(1);
        }, 1000);
        //process.exit(1);
    });
    client.on("disconnected", (error) => {
        console.log("Disconnected!");
        process.exit(1);
    });
    // A pretty useful method to create a delay without blocking the whole script.
    function wait(mil) {
        return new Promise(done => setTimeout(done, mil));
    }
    let isready = false;
    client.on('ready', async () => {
        if (isready) return;
        else isready = true;
        // "ready" isn't really ready. We need to wait a spell.
        // wait(2000);
        await client.user.setStatus('invisible');
        setInterval(function () {
            client.user.setStatus('invisible');
        }, 600000);

        client.guilds.get('286198213612929024').members.fetch().then(async (memmmbaaas) => {
            await Promise.all(memmmbaaas.map(element => {
                if (element.roles.array().length > 1 && !element.user.bot) {
                    if (!element.roles.has('404810535347945483')) {
                        return element.roles.add('404810535347945483');
                    }
                }
            }));

            await connection.query('SELECT * FROM serverusers', async function (error, results3, fields) {
                if (error) throw error;
                var length = Object.keys(results3).length;
                results3.forEach(async (element) => {
                    var userid = element.did;
                    var invitecode = element.invitecode;
                    var state = element.state;
                    if (client.guilds.get('286198213612929024').members.has(userid)) {
                        if (state == 0) {

                            if (invitecode != null) {
                                await connection.query('SELECT * FROM pinvitelist WHERE invitecode=?', [invitecode], async function (error, results5, fields) {
                                    if (error) throw error;
                                    if (results5.length != 0) {
                                        await connection.query('SELECT * FROM serverusers WHERE did=?', [results5[0].did], async function (error, results44, fields) {
                                            if (error) throw error;
                                            if (results44.length != 0 && results44[0].state == 1 && results44[0].is_partner == 1 && results5[0].is_notification == 1) {
                                                await client.users.get(results5[0].did).createDM().then(async (dm) => {
                                                    await dm.send("Пользователь <@" + userid + "> перезашёл на сервер за время отключения бота " + invitecode + " (" + results5[0].namevar + "), всего приглашено уникальных пользователей: " + results5[0].joins).catch((err) => {
                                                        if (err.code == 50007) console.log("Can't send M!");
                                                        else {
                                                            console.log(err);
                                                            process.exit(1);
                                                        }
                                                    });
                                                }).catch(function (reason) {
                                                    //checkforemoji(index);
                                                    console.log("ERRORcreateDM1:" + reason);
                                                });
                                            }
                                            if (results44.length != 0) {
                                                if (results44[0].did != "466293410848964609")
                                                    await client.guilds.get('286198213612929024').channels.get('480985627148550176').send("Партнёр <@" + results5[0].did + "> - Пользователь <@" + userid + "> перезашёл на сервер за время отключения бота " + invitecode + " (" + results5[0].namevar + "), всего приглашено уникальных пользователей: " + results5[0].joins).catch((err) => {
                                                        if (err.code == 50007) console.log("Can't send M!");
                                                        else {
                                                            console.log(err);
                                                            process.exit(1);
                                                        }
                                                    });
                                                else
                                                    await client.guilds.get('286198213612929024').channels.get('480985627148550176').send("Руководитель - Пользователь <@" + userid + "> перезашёл на сервер за время отключения бота " + invitecode + " (" + results5[0].namevar + "), всего приглашено уникальных пользователей: " + results5[0].joins).catch((err) => {
                                                        if (err.code == 50007) console.log("Can't send M!");
                                                        else {
                                                            console.log(err);
                                                            process.exit(1);
                                                        }
                                                    });
                                            }
                                        });
                                    }
                                });
                            }
                            await connection.query('UPDATE serverusers SET state=1 WHERE did=?', [userid], async function (error, results11, fields) {});
                        }
                    } else {
                        //console.log(results3[i]);
                        if (state == 1) {
                            // console.log(results3[i]);

                            //   console.log(results3[i]);
                            if (invitecode != null) {
                                await connection.query('SELECT * FROM pinvitelist WHERE invitecode=?', [invitecode], async function (error, results6, fields) {
                                    if (error) throw error;
                                    if (results6.length != 0 && results6[0].is_notification == 1) {
                                        await connection.query('SELECT * FROM serverusers WHERE did=?', [results6[0].did], async function (error, results44, fields) {
                                            if (error) throw error;
                                            if (results44.length != 0 && results44[0].state == 1 && results44[0].is_partner == 1 && results6[0].is_notification == 1) {
                                                await client.users.get(results6[0].did).createDM().then(async (dm) => {
                                                    await dm.send("Пользователь <@" + userid + "> покинул сервер за время отключения бота по приглашению " + invitecode + " (" + results6[0].namevar + "), всего приглашено уникальных пользователей: " + results6[0].joins).catch((err) => {
                                                        if (err.code == 50007) console.log("Can't send M!");
                                                        else {
                                                            console.log(err);
                                                            process.exit(1);
                                                        }
                                                    });
                                                }).catch(function (reason) {
                                                    //checkforemoji(index);
                                                    console.log("ERRORcreateDM1:" + reason);
                                                });
                                            }
                                            if (results44.length != 0) {
                                                if (results44[0].did != "466293410848964609")
                                                    await client.guilds.get('286198213612929024').channels.get('480985627148550176').send("Партнёр <@" + results6[0].did + "> - Пользователь <@" + userid + "> покинул сервер за время отключения бота по приглашению " + invitecode + " (" + results6[0].namevar + "), всего приглашено уникальных пользователей: " + results6[0].joins).catch((err) => {
                                                        if (err.code == 50007) console.log("Can't send M!");
                                                        else {
                                                            console.log(err);
                                                            process.exit(1);
                                                        }
                                                    });
                                                else
                                                    await client.guilds.get('286198213612929024').channels.get('480985627148550176').send("Руководитель - Пользователь <@" + userid + "> покинул сервер за время отключения бота по приглашению " + invitecode + " (" + results6[0].namevar + "), всего приглашено уникальных пользователей: " + results6[0].joins).catch((err) => {
                                                        if (err.code == 50007) console.log("Can't send M!");
                                                        else {
                                                            console.log(err);
                                                            process.exit(1);
                                                        }
                                                    });
                                            }
                                        });
                                    }
                                });
                            }
                            await connection.query('UPDATE serverusers SET state=0,leavetime=? WHERE did=?', [new Date().getTime(), userid], async function (error, results11, fields) {});
                        }
                    }
                });


            });
            memmmbaaas.forEach(async (mmemmmbaa) => {
                await connection.query('SELECT * FROM serverusers WHERE did=?', [mmemmmbaa.id], async function (error, results5, fields) {
                    if (results5.length == 0) {
                        if (mmemmmbaa.roles.has("480916170203987990"))
                            await connection.query('INSERT INTO serverusers SET is_partner=1,did=?,state=1,jointime=?,username=?', [mmemmmbaa.id, new Date().getTime(), mmemmmbaa.user.username], async function (error, results3, fields) {});
                        else
                            await connection.query('INSERT INTO serverusers SET is_partner=0,did=?,state=1,jointime=?,username=?', [mmemmmbaa.id, new Date().getTime(), mmemmmbaa.user.username], async function (error, results3, fields) {});
                    } else {
                        if (mmemmmbaa.roles.has("480916170203987990") && results5[0].is_partner != 1) {
                            await connection.query('UPDATE serverusers SET is_partner=1 WHERE did=?', [mmemmmbaa.id], async function (error, results3, fields) {});
                        } else if (!mmemmmbaa.roles.has("480916170203987990") && results5[0].is_partner == 1) {
                            await client.guilds.get('286198213612929024').channels.get("480978383518302209").messages.fetch({
                                limit: 100
                            }).then(async messages => {
                                // console.log(messages);
                                if (mmemmmbaa.id != "466293410848964609") {
                                    const botMessages = messages.filter(msg => mmemmmbaa.id == msg.author.id);
                                    await mmemmmbaa.send("Вы больше не являетесь партнёром, ваша анкета в <#480978383518302209> удалена!").catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                    await botMessages.forEach(async (entry) => {
                                        await mmemmmbaa.send("```" + entry.content + "```").catch((err) => {
                                            if (err.code == 50007) console.log("Can't send M!");
                                            else {
                                                console.log(err);
                                                process.exit(1);
                                            }
                                        });
                                        await entry.catch(async function (reason) {
                                            console.log("ERROR1:" + reason);
                                            if (reason.code != 10008 && reason.code != 10003) {
                                                console.log("Emoji message get error.");
                                                console.log(reason);
                                                process.exit(1);
                                            }
                                        });
                                    });
                                    // await client.guilds.get('286198213612929024').channels.get("480978383518302209").bulkDelete(botMessages);
                                }
                            });
                            await connection.query('UPDATE serverusers SET is_partner=0 WHERE did=?', [mmemmmbaa.id], async function (error, results3, fields) {});
                        }
                    }
                });
            });
        });


        client.guilds.get('286198213612929024').fetchInvites().then(guildInvites => {
            invites = guildInvites;
        });
    });

    client.on('guildMemberUpdate', async (oldmember, newmember) => {

        if (newmember.roles.has("480916170203987990") && !oldmember.roles.has("480916170203987990")) {
            await connection.query('UPDATE serverusers SET is_partner=1 WHERE did=?', [newmember.id], async function (error, results3, fields) {});
        } else if (!newmember.roles.has("480916170203987990") && oldmember.roles.has("480916170203987990")) {
            await client.guilds.get('286198213612929024').channels.get("480978383518302209").messages.fetch({
                limit: 100
            }).then(async messages => {
                // console.log(messages);
                if (mmemmmbaa.id != "466293410848964609") {
                    const botMessages = messages.filter(msg => newmember.id == msg.author.id);
                    await newmember.send("Вы больше не являетесь партнёром, ваша анкета в <#480978383518302209> удалена!").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                    await botMessages.forEach(async (entry) => {
                        await newmember.send("```" + entry.content + "```").catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                        await entry.delete().catch(async function (reason) {
                            console.log("ERROR1:" + reason);
                            if (reason.code != 10008 && reason.code != 10003) {
                                console.log("Emoji message get error.");
                                console.log(reason);
                                process.exit(1);
                            }
                        });
                    });
                    // await client.guilds.get('286198213612929024').channels.get("480978383518302209").bulkDelete(botMessages);
                }
            });
            await connection.query('UPDATE serverusers SET is_partner=0 WHERE did=?', [newmember.id], async function (error, results3, fields) {});
        }

    })

    client.on('guildMemberRemove', async (member) => {
        await connection.query('SELECT * FROM serverusers WHERE did=?', [member.id], async function (error, results22, fields) {
            if (error) throw error;
            if (results22.length != 0) {
                await connection.query('SELECT * FROM pinvitelist WHERE invitecode=?', [results22[0].invitecode], async function (error, results5, fields) {
                    if (error) throw error;
                    if (results5.length != 0) {
                        await connection.query('SELECT * FROM serverusers WHERE did=?', [results5[0].did], async function (error, results2, fields) {
                            if (error) throw error;
                            if (results2.length != 0 && results2[0].state == 1 && results2[0].is_partner == 1 && results5[0].is_notification == 1) {
                                await client.users.get(results5[0].did).createDM().then(async (dm) => {
                                    await dm.send("Пользователь <@" + member.id + "> покинул сервер по приглашению " + results5[0].invitecode + " (" + results5[0].namevar + "), всего приглашено уникальных пользователей: " + results5[0].joins).catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                }).catch(function (reason) {
                                    //checkforemoji(index);
                                    console.log("ERRORcreateDM1:" + reason);
                                });
                            }
                            if (results2.length != 0) {
                                if (results2[0].did != "466293410848964609")
                                    await client.guilds.get('286198213612929024').channels.get('480985627148550176').send("Партнёр <@" + results5[0].did + "> - Пользователь <@" + member.id + "> покинул сервер по приглашению " + results5[0].invitecode + " (" + results5[0].namevar + "), всего приглашено уникальных пользователей: " + results5[0].joins).catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                                else
                                    await client.guilds.get('286198213612929024').channels.get('480985627148550176').send("Руководитель - Пользователь <@" + member.id + "> покинул сервер по приглашению " + results5[0].invitecode + " (" + results5[0].namevar + "), всего приглашено уникальных пользователей: " + results5[0].joins).catch((err) => {
                                        if (err.code == 50007) console.log("Can't send M!");
                                        else {
                                            console.log(err);
                                            process.exit(1);
                                        }
                                    });
                            }
                        });
                    }
                });
                await connection.query('UPDATE serverusers SET state=0,leavetime=? WHERE did=?', [new Date().getTime(), member.id], async function (error, results3, fields) {});
            } else {
                await connection.query('INSERT INTO serverusers SET did=?,state=0,leavetime=?,username=?', [member.id, new Date().getTime(), member.user.username], async function (error, results3, fields) {});
            }
        });
    });
    /*client.on('channelUpdate', (oldChannel, newChannel) => {
        fs.writeFileSync("oldChanneldd.json", JSON.stringify(oldChannel.array()), {
            encoding: 'utf8',
            flag: 'w'
        });
        fs.writeFileSync("newChanneldd.json", JSON.stringify(newChannel.emojis.array()), {
            encoding: 'utf8',
            flag: 'w'
        });
    });
    client.on('guildUpdate', (oldChannel, newChannel) => {
        fs.writeFileSync("oldChannelddd.json", JSON.stringify(oldChannel.array()), {
            encoding: 'utf8',
            flag: 'w'
        });
        fs.writeFileSync("newChannelddd.json", JSON.stringify(newChannel.emojis.array()), {
            encoding: 'utf8',
            flag: 'w'
        });
    });*/

    client.on('guildMemberAdd', async (member) => {
        // To compare, we need to load the current invite list.
        await client.guilds.get('286198213612929024').fetchInvites().then((guildInvites) => {
            // This is the *existing* invites for the guild.
            // const ei = invites[member.guild.id];
            // Look through the invites, find the one for which the uses went up.
            var oldinvites = invites;
            invites = guildInvites;

            var invite = undefined;
            //try {
            invite = guildInvites.find(i => oldinvites.get(i.code) != undefined && oldinvites.get(i.code).uses < i.uses);
            // } catch (err) {
            if (invite == undefined) {
                // console.log("ERRORLEADTOSEARCHNEW: " + err);
                var arrayofnoneinvites = [];
                guildInvites.forEach((inv) => {
                    if (oldinvites.find(i => i.code == inv.code) == undefined) {
                        console.log("NEW INV: " + inv.code);
                        arrayofnoneinvites.push(inv);
                    }
                });
                arrayofnoneinvites.forEach((kk) => {
                    if (kk.uses == 1) {
                        invite = kk;
                        console.log("Detected new incoming from 1 method: " + kk.code + " user:" + member.id);
                        return;
                    }
                });
                //invites = guildInvites;

            }

            var invitecode = null;
            var inviteuser = null;
            if (invite == undefined) {
                client.guilds.get('286198213612929024').channels.get('480985627148550176').send("Подключение без приглашения: <@" + member.id + "> (Возможно подключение по единоразовой ссылке)").catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
            } else {
                invitecode = invite.code;
                inviteuser = invite.inviter.id;
            }

            (async (member, invitecode, inviteuser) => {
                //console.log(member);
                // This is just to simplify the message being sent below (inviter doesn't have a tag property)
                //  const inviter = client.users.get(invite.inviter.id);
                // Get the log channel (change to your liking)
                // const logChannel = member.guild.channels.find("name", "join-logs");
                // A real basic message with the information we need. 
                //logChannel.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);

                if (invitecode == "SJ4Smt7") { //Турнир
                    //console.log("Catch");
                    await member.roles.add('500580990805213194');
                    await member.roles.add('363054008564449281');
                    await member.roles.add('468286292430422016');
                    await member.roles.add('404810535347945483');
                    await member.roles.add('381076993384382464');
                } else if (invitecode == "Pxkt3Cg") {
                    await member.roles.add('500580990805213194'); //Настольные игры
                    await member.roles.add('404810535347945483'); //DJ
                    client.guilds.get('286198213612929024').channels.get('508970382003535882').send("Переход по основному приглашению раздела настольных игр - <@" + member.id + ">").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                } else if (invitecode == "QrqBWE6") { // Пират
                    //console.log("Catch");
                    await member.roles.add('500580990805213194');
                    await member.roles.add('363054008564449281');
                    await member.roles.add('288997533546708992');
                    await member.roles.add('479701746013437954');
                    await member.roles.add('381076993384382464');
                    await member.roles.add('404810535347945483');
                    client.guilds.get('286198213612929024').channels.get('479700791356293140').send("Переход по пиратскому приглашению на палубу - <@" + member.id + ">").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                } else if (
                    invitecode == "gFWh5D5" //Прочти в архиве с игрой
                    ||
                    invitecode == "rV7MPjR" //https://vk.com/bronyfurry
                    ||
                    invitecode == "FFVTCfM" //https://vk.com/noroleplaying ПИРАТ
                    ||
                    invitecode == "YWvYW7C" //https://vk.com/ruxonr
                    ||
                    invitecode == "wkRS5Wh" ||
                    invitecode == "uZQZZmy" //https://vk.com/ninri и реклама
                ) {
                    await member.roles.add('500580990805213194');
                    await member.roles.add('363054008564449281'); //ННИ
                    await member.roles.add('288997533546708992');
                    await member.roles.add('381076993384382464');
                    await member.roles.add('479701746013437954');
                    await member.roles.add('404810535347945483');
                } else if (invitecode == "HUxQgce") { // Ролевая игра
                    //console.log("Catch");
                    await member.roles.add('381076993384382464');
                    await member.roles.add('404810535347945483');
                    client.guilds.get('286198213612929024').channels.get('479932903544061952').send("Переход по основному приглашению ролевого раздела - <@" + member.id + ">").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                } else if (invitecode == "8MJBqay") { // Кооп
                    //console.log("Catch");
                    await member.roles.add('363054008564449281');
                    await member.roles.add('404810535347945483');
                    client.guilds.get('286198213612929024').channels.get('479934498734080000').send("Переход по основному приглашению раздела не настольных игр - <@" + member.id + ">").catch((err) => {
                        if (err.code == 50007) console.log("Can't send M!");
                        else {
                            console.log(err);
                            process.exit(1);
                        }
                    });
                } else if (invitecode == "TEUhaJr" // Обзоры Steam
                    ||
                    invitecode == "uCq776V" //Мой обзор Steam
                ) {
                    await member.roles.add('500580990805213194');
                    await member.roles.add('381076993384382464');
                    await member.roles.add('363054008564449281');
                    await member.roles.add('288997533546708992');
                    await member.roles.add('404810535347945483');
                } else if (invitecode == "dp3HPTn") { // TTS Роль
                    await member.roles.add('500580990805213194');
                    await member.roles.add('363054008564449281');
                    await member.roles.add('381076993384382464');
                    await member.roles.add('288997533546708992');
                    await member.roles.add('404810535347945483');
                } else if (invitecode == "X2AFY2D") { // Личные моды
                    await member.roles.add('500580990805213194');
                    await member.roles.add('363054008564449281');
                    await member.roles.add('381076993384382464');
                    await member.roles.add('288997533546708992');
                    await member.roles.add('404810535347945483');
                } else if (invitecode == "2w7RhQr" || invitecode == "eK5AAPt" || invitecode == "TaNNhSk" ||
                    invitecode == "HfGzAD9" || invitecode == "qmnbwy2" || invitecode == "vnG4fwD" ||
                    invitecode == "deh5ZqJ" || invitecode == "pvaV2A8" || invitecode == "PK9ta9b" ||
                    invitecode == "KqhtH97" || invitecode == "mYefYAr" || invitecode == "ugkEnaz" ||
                    invitecode == "pZVs4qr" || invitecode == "YBwh5JH" || invitecode == "4snYZaU" ||
                    invitecode == "ExsT3zN" || invitecode == "3csKyG9" || invitecode == "CadgcAU" ||
                    invitecode == "HxzcjD9" || invitecode == "mwYQUQR" || invitecode == "95sxPUe"
                ) { //Ognepoklonnik
                    await member.roles.add('500580990805213194');
                    await member.roles.add('363054008564449281');
                    await member.roles.add('381076993384382464');
                    await member.roles.add('288997533546708992');
                    await member.roles.add('404810535347945483');
                } else {
                    //Все разделы.
                    await member.roles.add('500580990805213194');
                    await member.roles.add('363054008564449281');
                    await member.roles.add('381076993384382464');
                    await member.roles.add('404810535347945483'); //DJ
                }
                if(invitecode == "kFyU6Wj"){ //ТУРНИР - ИНФОРМАЦИЯ - УЧАСТНИК ТУРНИРА
                    await member.roles.add('359329601102544906');
                }
                await connection.query('SELECT * FROM serverusers WHERE did=?', [member.id], async function (error, results2, fields) {
                    if (error) throw error;
                    if (results2.length != 0) {
                        await connection.query('SELECT * FROM pinvitelist WHERE invitecode=?', [results2[0].invitecode], async function (error, results5, fields) {
                            if (error) throw error;
                            if (results5.length != 0) {
                                await connection.query('SELECT * FROM serverusers WHERE did=?', [results5[0].did], async function (error, results44, fields) {
                                    if (error) throw error;
                                    if (results44.length != 0 && results44[0].state == 1 && results44[0].is_partner == 1 && results5[0].is_notification == 1) {
                                        await client.users.get(results5[0].did).createDM().then(async (dm) => {
                                            await dm.send("Пользователь <@" + member.id + "> перезашёл на сервер по приглашению " + invitecode + ", настоящее приглашение " + results5[0].invitecode + " (" + results5[0].namevar + ")").catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                        }).catch(function (reason) {
                                            //checkforemoji(index);
                                            console.log("ERRORcreateDM1:" + reason);
                                        });
                                    }
                                    if (results44.length != 0) {
                                        if (results44[0].did != "466293410848964609")
                                            await client.guilds.get('286198213612929024').channels.get('480985627148550176').send("Партнёр <@" + results5[0].did + "> - Пользователь <@" + member.id + "> перезашёл на сервер по приглашению " + invitecode + ", настоящее приглашение " + results5[0].invitecode + " (" + results5[0].namevar + ")").catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                        else
                                            await client.guilds.get('286198213612929024').channels.get('480985627148550176').send("Руководитель - Пользователь <@" + member.id + "> перезашёл на сервер по приглашению " + invitecode + ", настоящее приглашение " + results5[0].invitecode + " (" + results5[0].namevar + ")").catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                    }
                                });

                            }
                        });
                        await connection.query('UPDATE serverusers SET state=1 WHERE did=?', [member.id], async function (error, results11, fields) {});
                    } else {

                        await connection.query('SELECT * FROM pinvitelist WHERE invitecode=?', [invitecode], async function (error, results, fields) {
                            if (error) throw error;
                            await connection.query('INSERT INTO serverusers SET jointime=?,did=?,state=1,invitecode=?,inviteuser=?,username=?', [new Date().getTime(), member.id, invitecode, inviteuser, member.user.username], async function (error, results3, fields) {

                            });
                            if (results.length != 0) {
                                await connection.query('UPDATE pinvitelist SET joins=joins+1 WHERE invitecode=?', [invitecode], async function (error, results11, fields) {
                                    if (error) throw error;
                                });
                                await connection.query('SELECT * FROM serverusers WHERE did=?', [results[0].did], async function (error, results44, fields) {
                                    if (error) throw error;
                                    if (results44.length != 0 && results44[0].state == 1 && results44[0].is_partner == 1 && results[0].is_notification == 1) {

                                        await client.users.get(results[0].did).createDM().then(async (dm) => {
                                            await dm.send("Уникальное подключение по приглашению " + results[0].invitecode + " (" + results[0].namevar + "), пользователь <@" + member.id + ">, всего приглашено уникальных пользователей: " + (results[0].joins + 1)).catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                        }).catch(function (reason) {
                                            //checkforemoji(index);
                                            console.log("ERRORcreateDM1:" + reason);
                                        });

                                    }
                                    if (results44.length != 0) {
                                        if (results44[0].did != "466293410848964609")
                                            await client.guilds.get('286198213612929024').channels.get('480985627148550176').send("Партнёр <@" + results[0].did + "> - Уникальное подключение по приглашению " + results[0].invitecode + " (" + results[0].namevar + "), пользователь <@" + member.id + ">, всего приглашено уникальных пользователей: " + (results[0].joins + 1)).catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                        else
                                            await client.guilds.get('286198213612929024').channels.get('480985627148550176').send("Руководитель - Уникальное подключение по приглашению " + results[0].invitecode + " (" + results[0].namevar + "), пользователь <@" + member.id + ">, всего приглашено уникальных пользователей: " + (results[0].joins + 1)).catch((err) => {
                                                if (err.code == 50007) console.log("Can't send M!");
                                                else {
                                                    console.log(err);
                                                    process.exit(1);
                                                }
                                            });
                                    }
                                });

                            }
                        });

                    }
                });
            })(member, invitecode, inviteuser);
        });

    });
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