const fs = require('fs');
const Discord = require('discord.js');
process.setMaxListeners(Infinity);
const client = new Discord.Client({
    fetchAllMembers: true
});
client.on('error', (error) => {
    console.log("Error d.js!");
    process.exit();
});
let isready = false;
client.on('ready', async () => {
    if (isready) return;
    else isready = true;
    await client.guilds.get('286198213612929024').members.fetch().then(async (memmmbaaas) => {
        var count = 0;
        var withoutplatform = 0;
        var userlist = "";
        var alreadysended = JSON.parse(fs.readFileSync('nolicorpiraterole.json', 'utf8'));
        for (const [key, element] of memmmbaaas) {
            if (!element.roles.has('500580990805213194') && !element.roles.has('381076993384382464') && !element.roles.has('363054008564449281')) {
                withoutplatform++;
                if (!alreadysended.includes(element.id)) {
                    await element.send('Здравствуйте!\nМы заметили, что у вас нет ни одной роли раздела, без хотя бы одной роли раздела невозможно использовать наш сервер `НИНРИ #Настольные игры #Настольные ролевые игры #Игры #Tabletop Simulator` ( https://discord.gg/dr2GBTc ).\n\nКрупнейший русскоязычный сервер по игре Tabletop Simulator, настольным играм, настольным ролевым играм.\nЗдесь вы обязательно найдёте себе компанию для партий.\n\nРоли разделов прописываются через канал <#478312979843252234>, можно обозначить несколько разделов, список разделов:\n\n**Настольные игры** - `!ни` или `!ni`\n\n**Настольные ролевые игры: GoW, D&D, GURPS, самопалы..** - `!нри` или `!nri`\n\n**Не настольные игры** - `!нни` или `!nni`\n\nЕсли появятся вопросы, с ними помогут **руководитель** (<@466293410848964609>), **администратор** (<@261906668349161472>) и **модераторы** (<@232121763222388736>, <@203136743161987072>, <@218071605115355136>).').then(() => {
                        alreadysended.push(element.id);
                        userlist = userlist + "\n<@" + element.id + ">";
                        console.log(element.displayName);
                        fs.writeFileSync("nolicorpiraterole.json", JSON.stringify(alreadysended), {
                            encoding: 'utf8',
                            flag: 'w'
                        });
                        count++;
                    }).catch(function (reason) {
                        console.log("ERROR1:" + reason);
                    });

                }
            }

        }
        console.log("INACTIVE COUNT:" + count);
        console.log("[COUNT] NOTIFY NO ROLE L OR P: " + alreadysended.length);
        const embed = {
            "title": "Рассылка",
            "description": "Рассылает сообщения каждый вечер в 20:30 MSK.",
            "color": 7823103,
            "fields": [{
                    "name": "Разослано новых сообщений",
                    "value": "Без раздела: " + count
                },
                {
                    "name": "Общая статистика",
                    "value": "Пользователей без раздела: " + withoutplatform + "\nПользователи, которым было успешно отправлено сообщение:" + (alreadysended.length + count)
                }
            ]
        };
        if (count > 0) {
            await client.guilds.get('286198213612929024').channels.get('310754848851230720').send({
                embed
            }).then(async () => {
                await client.guilds.get('286198213612929024').channels.get('310754848851230720').send(userlist, {
                    "split": true
                }).then(() => {
                    process.exit();
                });
            });
        }

        process.exit();

    });
});
client.login('заменить');