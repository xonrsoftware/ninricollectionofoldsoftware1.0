try {
    const Discord = require('discord.js');
    var fs = require('fs');
    var util = require('util');
    var log_file = fs.createWriteStream(__dirname + '/rolesmanagerbot.log', {
        flags: 'w'
    });
    const client = new Discord.Client({
        fetchAllMembers: true
    });
    let isready = false;
    client.on('ready', async () => {
        if (isready) return;
        else isready = true;
        await client.user.setStatus('invisible');
        setInterval(function () {
            client.user.setStatus('invisible');
        }, 600000);
        await client.guilds.get('286198213612929024').members.fetch().then(async (memmmbaaas) => {
            await Promise.all(memmmbaaas.map(element => {
                if (element.roles.array().length > 1 && !element.user.bot) {
                    if (!element.roles.has('404810535347945483')) {
                        return element.roles.add('404810535347945483');
                    }
                }
            }));
        });
    });
    client.on('debug', message => {
        log_file.write(util.format(message) + '\n');
    });
    client.on('error', (error) => {
        console.log("Error d.js!");
        process.exit(1);
    });
    client.on('message', async msg => {
        if (msg.channel.id == "478312979843252234") {
            if (msg.author.bot == false) {
                if (!msg.content.match(/^!(.*)/)) {
                    await msg.author.send('```asciidoc\nНеправильно указана команда. ::  \n```\nКоманда боту должна начинаться с **!**.\nПодробный список команд находится в <#485413029551276032>.').catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                } else if (msg.content.match(/^!tournament/i) || msg.content.match(/^!турнир/i)) {
                    var timestamp = Math.floor(Date.now() / 1000);
                   // if (timestamp < 1533762000) {
                        if (!msg.member.roles.has('359329601102544906')) {
                            msg.member.addRole('359329601102544906').then((role) => {
                                msg.member.send("```fix\nВам была выдана роль участия в турнире.\nЕсли вы решите не участвовать в турнире, то пропишите команду получения роли ещё раз, это уберёт её.\n```");
                                msg.member.addRole('359329601102544906');
                                msg.member.addRole('404810535347945483');
                                return role;
                            });
                        } else {
                            if (msg.member.roles.has('359329601102544906')) {
                                msg.member.removeRole('359329601102544906').then((role) => {
                                    msg.member.send("```fix\nУ вас больше нет роли участия в турнире.\n```");
                                    return role;
                                });
                            }
                        }
                    //} else msg.member.send("```fix\nЗакрыта регистрация на турнир, обратитесь к администрации.\n```");
                } else if (msg.content.match(/^!следопыт/i) || msg.content.match(/^!pathfinder/i)) {
                    if (!msg.member.roles.has('336631550861115394')) {
                        await msg.member.roles.add(['404810535347945483', '336631550861115394']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль по настольной ролевой игре Pathfinder.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('336631550861115394');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли по настольной ролевой игре Pathfinder.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!лавкрафт/i) || msg.content.match(/^!lovecraft/i)) {
                    if (!msg.member.roles.has('336629380996399115')) {
                        await msg.member.roles.add(['404810535347945483', '336629380996399115']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль по настольным играм Лавкрафта.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('336629380996399115');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли по настольным играм Лавкрафта.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!ттспират/i) || msg.content.match(/^!ttspirate/i)) {
                    if (!msg.member.roles.has('479701746013437954')) {
                        await msg.member.roles.add(['404810535347945483', '479701746013437954']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль пирата Tabletop Simulator.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('479701746013437954');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли пирата Tabletop Simulator.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!otherplatform/i) || msg.content.match(/^!другаяплатформа/i) || msg.content.match(/^!otp/i)) {
                    if (!msg.member.roles.has('468289785312837632')) {
                        await msg.member.roles.add(['404810535347945483', '468289785312837632']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль по другим платформам.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('468289785312837632');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли по другим платформам.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!tabletopia/i) || msg.content.match(/^!тейблтопия/i) || msg.content.match(/^!ttp/i)) {
                    if (!msg.member.roles.has('468286292430422016')) {
                        await msg.member.roles.add(['404810535347945483', '468286292430422016']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль по платформе Tabletopia.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('468286292430422016');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли по платформе Tabletopia.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!vassal/i) || msg.content.match(/^!вассал/i) || msg.content.match(/^!vs/i)) {
                    if (!msg.member.roles.has('468285710470742046')) {
                        await msg.member.roles.add(['404810535347945483', '468285710470742046']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль по платформе Vassal.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('468285710470742046');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли по платформе Vassal.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!бсг/i) || msg.content.match(/^!bsg/i)) {
                    if (!msg.member.roles.has('336631789525139457')) {
                        await msg.member.roles.add(['404810535347945483', '336631789525139457']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль по настольной игре BattleStar Galactica.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('336631789525139457');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли по настольной игре BattleStar Galactica.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!евро/i) || msg.content.match(/^!euro/i)) {
                    if (!msg.member.roles.has('466596648013922315')) {
                        await msg.member.roles.add(['404810535347945483', '466596648013922315']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль по настольным евро играм.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('466596648013922315');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли по настольным евро играм.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!зомбицид/i) || msg.content.match(/^!zombicide/i)) {
                    if (!msg.member.roles.has('336629680692264961')) {
                        await msg.member.roles.add(['404810535347945483', '336629680692264961']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль по настольный игре Зомбицид.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('336629680692264961');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли по настольный игре Зомбицид.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!патигейм/i) || msg.content.match(/^!partygame/i)) {
                    if (!msg.member.roles.has('357560162447261699')) {
                        await msg.member.roles.add(['404810535347945483', '357560162447261699']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль по настольным компанейским играм.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('357560162447261699');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли по настольным компанейским играм.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!свояигра/i) || msg.content.match(/^!sigame/i)) {
                    if (!msg.member.roles.has('511658760389918740')) {
                        await msg.member.roles.add(['404810535347945483', '511658760389918740']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль по компьютерной версии Своей игры.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('511658760389918740');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли по компьютерной версии Своей игры.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!strategy/i) || msg.content.match(/^!стратегия/i)) {
                    if (!msg.member.roles.has('387352872091910165')) {
                        await msg.member.roles.add(['404810535347945483', '387352872091910165']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль по настольным стратегическим играм.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('387352872091910165');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли по настольным стратегическим играм.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!workshop/i) || msg.content.match(/^!мододел/i)) {
                    if (!msg.member.roles.has('430272887870586891')) {
                        await msg.member.roles.add(['404810535347945483', '430272887870586891']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль мододела.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('430272887870586891');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли мододела.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!p/i) || msg.content.match(/^!п/i) || msg.content.match(/^!l/i) || msg.content.match(/^!л/i) || msg.content.match(/^!tabletopsimulator/i) || msg.content.match(/^!тейблтопсимулятор/i) || msg.content.match(/^!tts/i)) {
                    if (!msg.member.roles.has('288997533546708992')) {
                        await msg.member.roles.add(['404810535347945483', '288997533546708992']);
                        await msg.member.send("```fix\nВам была выдана тематическая роль по платформе Tabletop Simulator.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('288997533546708992');
                        await msg.member.send("```fix\nУ вас больше нет тематической роли по платформе Tabletop Simulator.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!rp$/i) || msg.content.match(/^!roleplay$/i) || msg.content.match(/^!рп$/i) || msg.content.match(/^!ролевка$/i) || msg.content.match(/^!нри$/i) || msg.content.match(/^!nri$/i) || msg.content.match(/^!ролёвка$/i)) {
                    if (!msg.member.roles.has('381076993384382464')) {
                        await msg.member.roles.add(['404810535347945483', '381076993384382464']);
                        await msg.member.send("```fix\nВам была выдана роль раздела по настольным ролевым играм.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('381076993384382464');
                        await msg.member.send("```fix\nУ вас больше нет роли раздела по настольным ролевым играм.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                }
                /* else if (msg.content.match(/^!dj/i)) {
                                    if (!msg.member.roles.has('404810535347945483')) {
                                                msg.member.addRole('404810535347945483').then((role) => {
                                                    msg.member.send("```fix\nВам была выдана роль dj, эта роль нужна для управления некоторыми музыкальными ботами.\n```");
                                                    return role;
                                                });
                                    } else {
                                                    msg.member.removeRole('404810535347945483').then((role) => {
                                                        msg.member.send("```fix\nУ вас больше нет роли dj.\n```");
                                                        return role;
                                                    });
                                    }
                                }*/
                else if (msg.content.match(/^!нни$/i) || msg.content.match(/^!nni$/i) || msg.content.match(/^!coop$/i) || msg.content.match(/^!кооп$/i) || msg.content.match(/^!othergames$/i) || msg.content.match(/^!og$/i) || msg.content.match(/^!ди$/i) || msg.content.match(/^!другиеигры$/i)) {
                    if (!msg.member.roles.has('363054008564449281')) {
                        await msg.member.roles.add(['404810535347945483', '363054008564449281']);
                        await msg.member.send("```fix\nВам была выдана роль раздела по не настольным играм.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('363054008564449281');
                        await msg.member.send("```fix\nУ вас больше нет роли раздела по не настольным играм.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                } else if (msg.content.match(/^!ни$/i) || msg.content.match(/^!ni$/i)) {
                    if (!msg.member.roles.has('500580990805213194')) {
                        await msg.member.roles.add(['404810535347945483', '500580990805213194']);
                        await msg.member.send("```fix\nВам была выдана роль раздела по настольным играм.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    } else {
                        await msg.member.roles.remove('500580990805213194');
                        await msg.member.send("```fix\nУ вас больше нет роли раздела по настольным играм.\n```").catch(() => console.log("Can't send DM to <@" + msg.author.id + "> user!"));
                    }
                }
                /*else{
                			
                		if(message.match(/^!rebootxonrbot/) && bot.servers["286198213612929024"].members[userID] != undefined && (bot.servers["286198213612929024"].members[userID].roles.includes("286201408238387201") || bot.servers["286198213612929024"].members[userID].roles.includes("294447183921414145") || bot.servers["286198213612929024"].members[userID].roles.includes("389081897646424064"))){
                	sendMessages(userID,['```asciidoc\nПерезагрузка. ::  \n```'],0);
                					bot.deleteMessage({channelID: channelID,
                		messageID: event.d["id"]},function(callback) {
                		//console.log(callback);
                	});
                	setTimeout(() => process.exit(1), 500);
                		
                				}
                        }*/
                if (msg.channel.id == "478312979843252234") {
                    if (msgcontent = (msg.content.match(/^!хочутурнир\s*(.*)/i) || msg.content.match(/^!wish\s*(.*)/i))) {
                        msgcontent = msgcontent[1].trim();
                        await client.channels.get("391699345075994635").send("<@" + msg.author.id + ">: " + msgcontent.substring(0, 1500)).catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                        await msg.author.send('Ваше предложение турнирнирной игры ' + msgcontent.substring(0, 1500) + ' было успешно отправлено.').catch((err) => {
                            if (err.code == 50007) console.log("Can't send M!");
                            else {
                                console.log(err);
                                process.exit(1);
                            }
                        });
                    }
                }
                await client.channels.get("478307990781427720").send("<@" + msg.author.id + ">:" + msg.content.substring(0, 1900)).catch((err) => {
                    if (err.code == 50007) console.log("Can't send M!");
                    else {
                        console.log(err);
                        process.exit(1);
                    }
                });
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
    client.login('заменить');
} catch (err) {

    console.log("new error:" + err);
    process.exit(1);

}