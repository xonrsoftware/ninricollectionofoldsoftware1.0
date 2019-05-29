try {
    const Discord = require('discord.js');
    const client = new Discord.Client({
        fetchAllMembers: true
    });
    var eyes = require('eyes');
    var https = require('https');
    const Entities = require('html-entities').AllHtmlEntities;

    const entities = new Entities();
    var fs = require('fs');
    var sha256 = require('js-sha256').sha256;
    var crypto = require('crypto');
    var rp = require('request-promise');
    var xml2js = require('xml2js');
    const cheerio = require('cheerio');
    const parserrelax = require('really-relaxed-json').createParser();
    const tough = require('tough-cookie');
    const jsdom = require("jsdom");
    const {
        JSDOM
    } = jsdom;
    var parser = new xml2js.Parser();
    var settings = JSON.parse(fs.readFileSync('data/platimarket_settings.json', 'utf8'));
    const pagesize = 5;
    var arrayofdata = JSON.parse(fs.readFileSync('data/platimarket_data.json', 'utf8'));
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

    function sleep(millis) {
        return new Promise(resolve => setTimeout(resolve, millis));
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
            try {
                let data = '';
                let products = [];
                await rp('https://plati.io/api/search.ashx?query=Tabletop%20Simulator&response=json&pagenum=1&pagesize=' + pagesize)
                    .then(async function (body) {
                        let result = JSON.parse(body, 'utf8');
                        for (let item of result["items"]) {
                            if (item["partner_commiss"] > 0 //|| item["id"] == 2554533
                            ) {
                                products.push({
                                    "name": new String(item["name"]).trim(),
                                    "url": new String(item["url"]).replace("www.plati.market", "ninri.plati.market").trim(),
                                    "rub": ((item["price_rur"] > 0) ? parseFloat(new String(item["price_rur"]).trim()) : '-/-'),
                                    "uah": ((item["price_uah"] > 0) ? parseFloat(new String(item["price_uah"]).trim()) : '-/-'),
                                    "usd": ((item["price_usd"] > 0) ? parseFloat(new String(item["price_usd"]).trim()) : '-/-'),
                                    "eur": ((item["price_eur"] > 0) ? parseFloat(new String(item["price_eur"]).trim()) : '-/-')
                                });
                            }
                        }
                        if (result["Totalpages"] > 1) {
                            let i;
                            for (i = 2; i <= result["Totalpages"]; i++) {
                                await rp('https://plati.io/api/search.ashx?query=Tabletop%20Simulator&response=json&pagenum=' + i + '&pagesize=' + pagesize)
                                    .then(async function (body) {
                                        let result = JSON.parse(body, 'utf8');
                                        for (let item of result["items"]) {
                                            if (item["partner_commiss"] > 0 //|| item["id"] == 2554533
                                            ) {
                                                products.push({
                                                    "name": new String(item["name"]).trim(),
                                                    "url": new String(item["url"]).replace("www.plati.market", "ninri.plati.market").trim(),
                                                    "rub": ((item["price_rur"] > 0) ? parseFloat(new String(item["price_rur"]).trim()) : '-/-'),
                                                    "uah": ((item["price_uah"] > 0) ? parseFloat(new String(item["price_uah"]).trim()) : '-/-'),
                                                    "usd": ((item["price_usd"] > 0) ? parseFloat(new String(item["price_usd"]).trim()) : '-/-'),
                                                    "eur": ((item["price_eur"] > 0) ? parseFloat(new String(item["price_eur"]).trim()) : '-/-')
                                                });
                                            }
                                        }
                                    })
                                    .catch(function (err) {
                                        // Crawling failed...
                                        console.log(err);
                                        process.exit(1);
                                    });
                            }
                        }
                        products.sort(function compare(a, b) {
                            if (a.rub < b.rub)
                                return -1;
                            if (a.rub > b.rub)
                                return 1;
                            return 0;
                        });
                        let currenttimestamp = Math.floor(Date.now() / 1000);
                       /* let objecttoken = await rp({
                            method: 'POST',
                            uri: 'https://api.digiseller.ru/api/apilogin',
                            body: {
                                login: 'заменить',
                                timestamp: currenttimestamp,
                                sign: sha256("заменить" + currenttimestamp)
                            },
                            json: true // Automatically stringifies the body to JSON
                        });
                        if (objecttoken["token"] != undefined && objecttoken["token"] != "") {*/
                            if(true === true){
                            /*
                    await rp('https://api.digiseller.ru/api/salesagentstatistics/' + objecttoken["token"] + '/months/12/WMR')
                        .then(async function (body) {
                            let result = JSON.parse(body, 'utf8');
                            //console.log(result);
                            if (result["retval"] == 0) {
                                for (item of result["statistics"]) {
                                    if (arrayofdata.filter(x => x.period == item["Period"]).length == 0) {
                                        arrayofdata.push({
                                            "period": item["Period"],
                                            "wmr": item["Amount"]
                                        });
                                    } else {
                                        arrayofdata.filter(x => x.period == item["Period"])["wmr"] = item["Amount"];
                                    }
                                    console.log(item);
                                }
                            }
                        })
                        .catch(function (err) {
                            // Crawling failed...
                            console.log(err);
                            process.exit(1);
                        });
                    await rp('https://api.digiseller.ru/api/salesagentstatistics/' + objecttoken["token"] + '/months/12/WMZ')
                        .then(async function (body) {
                            let result = JSON.parse(body, 'utf8');
                            //console.log(result);
                            if (result["retval"] == 0) {
                                for (item of result["statistics"]) {
                                    if (arrayofdata.filter(x => x.period == item["Period"]).length == 0) {
                                        arrayofdata.push({
                                            "period": item["Period"],
                                            "wmz": item["Amount"]
                                        });
                                    } else {
                                        arrayofdata.filter(x => x.period == item["Period"])["wmz"] = item["Amount"];
                                    }
                                    console.log(item);
                                }
                            }
                        })
                        .catch(function (err) {
                            // Crawling failed...
                            console.log(err);
                            process.exit(1);
                        });
                        await rp('https://api.digiseller.ru/api/salesagentstatistics/' + objecttoken["token"] + '/months/12/WMU')
                        .then(async function (body) {
                            let result = JSON.parse(body, 'utf8');
                            //console.log(result);
                            if (result["retval"] == 0) {
                                for (item of result["statistics"]) {
                                    if (arrayofdata.filter(x => x.period == item["Period"]).length == 0) {
                                        arrayofdata.push({
                                            "period": item["Period"],
                                            "wmu": item["Amount"]
                                        });
                                    } else {
                                        arrayofdata.filter(x => x.period == item["Period"])["wmu"] = item["Amount"];
                                    }
                                    console.log(item);
                                }
                            }
                        })
                        .catch(function (err) {
                            // Crawling failed...
                            console.log(err);
                            process.exit(1);
                        });
                        await rp('https://api.digiseller.ru/api/salesagentstatistics/' + objecttoken["token"] + '/months/12/WME')
                        .then(async function (body) {
                            let result = JSON.parse(body, 'utf8');
                            //console.log(result);
                            if (result["retval"] == 0) {
                                for (item of result["statistics"]) {
                                    if (arrayofdata.filter(x => x.period == item["Period"]).length == 0) {
                                        arrayofdata.push({
                                            "period": item["Period"],
                                            "wme": item["Amount"]
                                        });
                                    } else {
                                        arrayofdata.filter(x => x.period == item["Period"])["wme"] = item["Amount"];
                                    }
                                    console.log(item);
                                }
                            }
                        })
                        .catch(function (err) {
                            // Crawling failed...
                            console.log(err);
                            process.exit(1);
                        });
                        fs.writeFileSync("data/platimarket_data.json", JSON.stringify(arrayofdata), {
                            encoding: 'utf8',
                            flag: 'w'
                          });
                    process.exit(1);
*/
                           /* let balance = await rp({
                                method: 'GET',
                                uri: 'https://api.digiseller.ru/api/getbalance/' + objecttoken["token"],
                                json: true // Automatically stringifies the body to JSON
                            });*/


                            //SELL TEMP
                            //balance["Rfree"] = 9.08;
                            //balance["Rlock"] = 0;
                            //SELL TEMP
                            /*let stringb = "➡ https://ninri.plati.market\nДеньги пойдут на онлайн турниры по настольным играм: разработку защищённого программного обеспечения для проведения, призы, организацию.\nНастольная игра, по которой состоится турнир, будет выбираться голосованием.\n**Steam Gift** - подарок Steam с игрой, игра активируется на **ваш** аккаунт.\n\nТекущий баланс:\n";
                            stringb += (balance["Rfree"] + balance["Rlock"]).toFixed(2) + " **RUB**" + " " + (balance["Ufree"] + balance["Ulock"]).toFixed(2) + " **UAH**" + " " + (balance["Zfree"] + balance["Zlock"]).toFixed(2) + " **USD**" + " " + (balance["Efree"] + balance["Elock"]).toFixed(2) + " **EUR**";
                            stringb += "\nФормируется из партнёрских отчислений с покупок.";*/
                            let stringb = "➡ https://ninri.plati.market\n**Не накладывается дополнительная комиссия - вы платите ту же сумму.**";
                            let embed = new Discord.MessageEmbed()
                                .setTitle("Plati.Market")
                                .setDescription(stringb)
                                .setThumbnail("https://cdn.discordapp.com/attachments/467014579575062539/560182249232793630/logo.png")
                                .setFooter("НИНРИ", "https://cdn.discordapp.com/icons/286198213612929024/4e789760ee23c13ed6072e525ff68acf.png")
                                .setTimestamp()
                                .setColor(7823103);
                            let countworked = 1;
                            for (item of products) {
                                if (countworked++ <= 25) {
                                    // embed.addBlankField(true);
                                    embed.addField("\n\u200B\n\u200B" + entities.decode(item["name"].substring(0, 245)).replace(/(&#\d+;)/g, "")
                                        /*.replace(/(&#\d+;)/g, function(match) {
                                                                            match = match.replace(/&#/g,'').split(';');
                                                                            var binFirst = (parseInt('0x' + parseInt(match[0]).toString(16)) - 0xd800).toString(2);
                                                                            var binSecond = (parseInt('0x' + parseInt(match[1]).toString(16)) - 0xdc00).toString(2);
                                                                            binFirst = '0000000000'.substr(binFirst.length) + binFirst;
                                                                            binSecond = '0000000000'.substr(binSecond.length) + binSecond;
                                                                            return '&#x' + (('0x' + (parseInt(binFirst + binSecond, 2).toString(16))) - (-0x10000)).toString(16) + ';';
                                                                        })*/
                                        ,
                                        item["rub"] + " **RUB**" + " " + item["uah"] + " **UAH**" + " " + item["usd"] + " **USD**" + " " + item["eur"] + " **EUR**" + " - [[Купить]](" + item["url"] + ")");
                                }
                                //stringb += "\n\n**" + item["name"] + "**\n" + item["rub"] + " **RUB**" + " " + item["uah"] + " **UAH**" + " " + item["usd"] + " **USD**" + " " + item["eur"] + " **EUR**" + "\n" + item["url"]
                            }

                            let ch = client.channels.get("509370983556186122");
                            //console.log("end");
                            let msgs = await ch.messages.fetch();
                            if (!msgs.has(settings["msgid"])) {
                                let chnew = await ch.send(embed).catch((err) => {
                                    if (err.code == 50007) console.log("Can't send M!");
                                    else {
                                        console.log(err);
                                        process.exit(1);
                                    }
                                });
                                settings["msgid"] = chnew.id;
                                fs.writeFileSync("data/platimarket_settings.json", JSON.stringify(settings), {
                                    encoding: 'utf8',
                                    flag: 'w'
                                });
                            } else {
                                await msgs.get(settings["msgid"]).edit(embed);
                            }
                        }
                        // Process html...
                    })
                    .catch(function (err) {
                        // Crawling failed...
                        console.log(err);
                        process.exit(1);
                    });
            } catch (err) {
                console.log("PLATIERROR:" + err);
            }
            try {
                await updatenewdiscounts();
            } catch (err) {
                console.log("DEALSERROR:" + err);
            }
            try {
                await updateepicstore();
            } catch (err) {
                console.log("EPICERROR:" + err);
            }
            await sleep(1200000);
        }
    });
    async function updatenewdiscounts() {
        let settings = JSON.parse(fs.readFileSync('data/deals_settings.json', 'utf8'));
        let embed = new Discord.MessageEmbed()
            .setTitle("Интересные скидки на игровых площадках")
            .setDescription(`**Приобретите со скидкой от 15% любую Steam игру (если есть возможность её подарить), предмет!** 
        __Действует, даже если присутствует скидка Steam.__ __Возможна покупка игры Steam с использованием вашего купона, предзаказ игры.__
        
        Оплата:
        0% комиссия: Webmoney, Qiwi.
        1% комиссия: Пластиковая карта, через пополнение Qiwi, до 1000 руб - 1%, после - 0%.
    
        Связь:
        Личные сообщения в Discord - <@466293410848964609>.
        
        Информация о скидках получена с [isthereanydeal.com](https://isthereanydeal.com/).`)
            .setTimestamp()
            .setImage("https://cdn.discordapp.com/attachments/467014579575062539/563291577561251851/steamninri15.png")
            .setFooter("НИНРИ", "https://cdn.discordapp.com/attachments/467014579575062539/563157051484667905/Discord_Server_Icon_Templatev6_big.png")
            //.setThumbnail("https://cdn.discordapp.com/attachments/467014579575062539/560179261231726603/Epic_games_store_logo.png")
            .setColor(7823103);
        const html = await rp("https://isthereanydeal.com/?by=dealrating:desc#/filter:steam,battlenet,uplay,origin,gog,epic;/options:strict");
        //console.log();
        const queryobject = JSON.parse(parserrelax.stringToJson(html.match(/\.params\(([\s|\S|.]+)\)\.complete/)[1]));
        let cookiejar = rp.jar();
        cookiejar.setCookie((new tough.Cookie({
            key: "country",
            value: "RU%3A",
            domain: 'isthereanydeal.com',
            httpOnly: true,
            maxAge: 2678400
        })).toString(), 'https://isthereanydeal.com');
        cookiejar.setCookie((new tough.Cookie({
            key: "region",
            value: "ru",
            domain: 'isthereanydeal.com',
            httpOnly: true,
            maxAge: 2678400
        })).toString(), 'https://isthereanydeal.com');
        // ...all requests to https://api.mydomain.com will include the cookie
        let objecttoken = new JSDOM((await rp({
            method: 'POST',
            uri: 'https://isthereanydeal.com/ajax/data/lazy.deals.php',
            jar: cookiejar,
            form: {
                offset: '0',
                limit: 25,
                filter: "steam,battlenet,uplay,origin,gog,epic,-type/7,-package,-dlc",
                options: "strict",
                by: "dealrating:desc",
                seen: 0,
                id: queryobject["id"],
                timestamp: queryobject["timestamp"]
            },
            json: true // Automatically stringifies the body to JSON
        }))["data"]["html"]);
        //console.log(objecttoken.serialize());
        for (let item of objecttoken.window.document.querySelectorAll("div[class='game']")) {
            let name = item.querySelector("div[class~='title'] a").textContent;
            let link = item.querySelector("div[class~='details'] a").href;
            let price = parseFloat(new String(item.querySelector("div[class~='deals'] a").textContent.replace(/[^0-9.,]/g, "").replace(/[,]/g, ".")));

            let priceold = item.querySelector("div[class~='details'] div").textContent;
            embed.addField("\n\u200B\n\u200B" + name.substring(0, 245),
                price + " **RUB** - " + priceold.substring(0, 245) + " - [[Купить]](" + link + ")");
        }
        let ch = client.channels.get("509370983556186122");
        //console.log("end");
        let msgs = await ch.messages.fetch();
        if (!msgs.has(settings["msgid"])) {
            let chnew = await ch.send(embed).catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
            settings["msgid"] = chnew.id;
            fs.writeFileSync("data/deals_settings.json", JSON.stringify(settings), {
                encoding: 'utf8',
                flag: 'w'
            });
        } else {
            await msgs.get(settings["msgid"]).edit(embed);
        }
        //console.log(queryobject.id);
        /*let maxupdatecount = 25;
        let currentcount = 0;
        for (let item of dom.window.document.querySelectorAll("div[class^='StoreRow-card']")) {
    
        }*/
    }

    function getpercentage(partialValue, totalValue) {
        return (100 * partialValue) / totalValue;
    }

    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    function getpercentagelast(partialValue, totalValue) {
        return (totalValue - partialValue) / totalValue * 100;
    }
    async function updateepicstoreitem(embed, itemid) {

        let link = "https://store.epicgames.com/ninri/" + itemid;

        let requestdata = await rp({
            method: 'GET',
            uri: 'https://www.epicgames.com/store/ru/api/content/products/' + itemid,
            json: true
        });
        let requestdata3 = new JSDOM(await rp({
            method: 'GET',
            uri: 'https://www.epicgames.com' + requestdata["_urlPattern"]
        }));
        let paycode = undefined;
        let namespace = undefined;
        let appname = requestdata3.window.document.title;

        let paycodes = [];
        let dlcofferids = [];
        let dlcofferslug = [];
        for (let page of requestdata["pages"]) {
            if (page["data"]["dlc"] != undefined && page["data"]["dlc"]["dlc"] != undefined) {
                for (let dlc of page["data"]["dlc"]["dlc"]) {
                    dlcofferslug.push("/ru" + dlc["slug"]) ///product/darksiders3/dlc
                    dlcofferids.push(dlc["offerId"]);
                }
            }
        }
        //if (isBlank(appname)) appname = requestdata["productName"];
        if (isBlank(appname)) appname = requestdata["_slug"];
        for (let page of requestdata["pages"]) {
            if (page["offer"]["hasOffer"] && !dlcofferids.includes(page["offer"]["id"]) && !dlcofferslug.includes(page["_urlPattern"]) && (page["data"]["hero"]["action"]["href"] === undefined || page["data"]["hero"]["action"]["href"] == "")) {
                //paycode = ;
                let navTitle = "";
                if (page["data"]["markdown"] != undefined) navTitle = page["data"]["markdown"]["title"];
                paycodes.push([page["namespace"], page["offer"]["id"], navTitle]);
                //namespace = page["namespace"];
                // appname = page["data"]["about"]["title"];

                //break;
            }
        }

        let switchname = isBlank(appname);
        //console.log(requestdata["pages"]);
        let oldprice = 0;
        let price = 0;
        if (paycodes.length > 0) {
            for (const [namespace, paycode, navTitle] of paycodes) {
                //console.log(paycode);
                let buildjson = {
                    "method": "post",
                    "headers": {
                        "Content-Type": "application/graphql"
                    },
                    "query": "\n            query catalogQuery(\n                $productNamespace:String!, \n                $offerId:String!, \n                $locale:String, \n                $country:String!, \n                $lineOffers: [LineOfferReq]!,\n                \n    $hasCountryFilter: Boolean,\n    $filterCountry: String,\n    $filterAgeGroup: Int\n) {\n                Catalog {\n                    catalogOffer(namespace: $productNamespace, \n                        id: $offerId, \n                        locale: $locale,\n                        \ncountryAgeFilter: {\n    shouldCheck: $hasCountryFilter,\n    filterCountry: $filterCountry,\n    filterAgeGroup: $filterAgeGroup\n}\n) {\n                        effectiveDate\n                        id\n                        customAttributes {\n                            key\n                            value\n                        }\n                        isCountryAgeBlocked\n                    }\n                }\n                PriceEngine {\n                    price(country: $country, lineOffers: $lineOffers) {\n                        totalPrice {\n                            discountPrice\n                            originalPrice\n                            fmtPrice(locale: $locale) {\n                                originalPrice\n                                discountPrice\n                            }\n                        }\n                    }\n                }\n            }\n        ",
                    "variables": {
                        "productNamespace": new String(namespace.trim()),
                        "offerId": new String(paycode.trim()),
                        "locale": "ru",
                        "country": "RU",
                        "lineOffers": [{
                            "offerId": new String(paycode.trim()),
                            "quantity": 1
                        }],
                        "calculateTax": false
                    }
                };
                let requestdata2 = JSON.parse(await rp({
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    uri: 'https://graphql.epicgames.com/graphql',
                    body: JSON.stringify(buildjson)
                }));
                //console.log(requestdata2)
                let currentelementprice = requestdata2["data"]["PriceEngine"]["price"]["totalPrice"]["discountPrice"] / 100;
                if (currentelementprice < price || price == 0) {
                   // if (switchname && !isBlank(navTitle)) appname = navTitle;
                    oldprice = requestdata2["data"]["PriceEngine"]["price"]["totalPrice"]["originalPrice"] / 100;
                    price = currentelementprice;
                }
            }
            if (price <= 0) return false;
        } else {
            return false;
            //console.log("errorgetprice");
            //process.exit();
        }
        if (!isBlank(appname)) {
            let arrVars = appname.split("-");
            if (arrVars.length >= 1) {
                let lastVar = arrVars.pop();
                let restVar = arrVars.join("-");
                if (lastVar.trim() == restVar.trim()) {
                    appname = restVar.trim();
                }
            }
        } else appname = "";
        let pricestring;
        if (price != oldprice)
            pricestring = "~~" + oldprice.toFixed(2) + "~~ " + price.toFixed(2) + " **RUB** -" + getpercentagelast(price, oldprice).toFixed(0) + "%";
        else pricestring = price.toFixed(2) + " **RUB**";
        embed.addField("\n\u200B\n\u200B" + appname.substring(0, 245),
            pricestring + " - [[Купить]](" + link + ")");
        return true;
    }
    async function preprocessarray(item) {
        let itemid = item.querySelector("a[class^='StoreCard-card']").href.split('/')[4];
        let itemarray = [];
        //console.log(item.querySelector("a[class^='StoreCard-card']").href);
        if (item.querySelector("a[class^='StoreCard-card']").href.startsWith("/store/ru/collection/")) {
            let requestdata = new JSDOM(await rp("https://www.epicgames.com" + item.querySelector("a[class^='StoreCard-card']").href));


            for (let item of requestdata.window.document.querySelectorAll("div[class^='StoreRow-card']")) {
                // console.log(item.innerHTML);
                //process.exit();
                itemarray = itemarray.concat((await preprocessarray(item)));
            }
        } else itemarray.push(itemid);
        return itemarray;
    }
    async function updateepicstore() {
        let settings = JSON.parse(fs.readFileSync('data/epicstore_settings.json', 'utf8'));
        let embed = new Discord.MessageEmbed()
            .setTitle("Epic Games Store")
            .setDescription("Наш тег автора:```NINRI```**Используйте для покупки других игр, платежей внутри игры (например, Fortnite).**\nВ конце этого сообщения показательный скриншот.\n\n**Не накладывается дополнительная комиссия - вы платите ту же сумму.**")
            .setTimestamp()
            .setImage("https://cdn.discordapp.com/attachments/467014579575062539/563174333862903809/EpicStore.png")
            .setFooter("НИНРИ", "https://cdn.discordapp.com/attachments/467014579575062539/563157051484667905/Discord_Server_Icon_Templatev6_big.png")
            .setThumbnail("https://cdn.discordapp.com/attachments/467014579575062539/560179261231726603/Epic_games_store_logo.png")
            .setColor(7823103);

        const dom = new JSDOM(await rp("https://www.epicgames.com/store/ru/"));
        let maxupdatecount = 25;
        let currentcount = 0;
        //console.log(dom.serialize());
        let itemignorelist = [];
        for (let item of dom.window.document.querySelectorAll("div[class^='StoreRow-card']")) {

            let itemarray = (await preprocessarray(item));

            for (let itemid of itemarray) {
                if (itemignorelist.includes(itemid)) continue;
                else itemignorelist.push(itemid);
                //console.log(itemid);
                if ((await updateepicstoreitem(embed, itemid)) == false) continue;
                currentcount++;
                await sleep(1000);
            }
            if (currentcount >= maxupdatecount) break;
        }

        let ch = client.channels.get("509370983556186122");
        //console.log("end");
        let msgs = await ch.messages.fetch();
        if (!msgs.has(settings["msgid"])) {
            let chnew = await ch.send(embed).catch((err) => {
                if (err.code == 50007) console.log("Can't send M!");
                else {
                    console.log(err);
                    process.exit(1);
                }
            });
            settings["msgid"] = chnew.id;
            fs.writeFileSync("data/epicstore_settings.json", JSON.stringify(settings), {
                encoding: 'utf8',
                flag: 'w'
            });
        } else {
            await msgs.get(settings["msgid"]).edit(embed);
        }
    }
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