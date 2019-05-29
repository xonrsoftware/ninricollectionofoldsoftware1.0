const md5File = require('md5-file/promise')
var fs = require('fs');
var crypto = require('crypto');
const Discord = require('discord.js');
const sharp = require('sharp');

const Util = require('./Util.js');

class ScriptOneEmojiGuildStore {
    constructor(guildid, filename, channelid) {
        this.guildid = guildid;
        this.filename = filename;
        this.channelid = channelid;
    }
    async init(client) {
        this.client = client;
        this.guild = client.guilds.get(this.guildid);
        if (!this.Settings)
            await this.checkpropersave();
    }
    async preprocessing(nextid) {
        if (Util.isBlank(this.Settings.UniqueID) || this.Settings.UniqueID === -1) {
            this.Settings.UniqueID = nextid++;
            await this.save();
        }
        return nextid;
    }
    async checkupdate() {
        console.log("start update check");
        let newimagehash = await md5File("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + ".png");

        let needimageupdate = false;
        let savefileupdate = false;
        if (newimagehash != this.Settings.ImageHash || !fs.existsSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + "_small.png")) {
            await sharp("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + ".png")
                .resize(32, 32)
                .toFile("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + "_small.png");
            this.Settings.ImageHash = newimagehash;
            needimageupdate = true;
            console.log("needimageupdat1e");
        }
        if (!needimageupdate) {
            if (this.guild.emojis.find(x => x.name == this.Settings.EmojiName) === undefined) needimageupdate = true;
        }
        let emojid;
        if (needimageupdate) {
            console.log("needimageupdate2");
            await Promise.all(this.guild.emojis.filter(x => x.name == this.Settings.EmojiName).map(x => x.delete()));
            emojid = await this.guild.emojis.create("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + ".png", this.Settings.EmojiName);
        } else {
            emojid = this.guild.emojis.find(x => x.name == this.Settings.EmojiName);
        }
        let Message = undefined;
        if (!Util.isBlank(this.Settings.MessageID))
            Message = await this.guild.channels.get(this.channelid).messages.fetch(this.Settings.MessageID).catch(reason => {
                if (reason.code != 10008) {
                    console.log("Emoji message get error.");
                    console.log(reason);
                    process.exit(1);
                }
            });

        //this.Settings.Embed.Description.replace(/Тайм-код/, "Источник");

        let Embed = new Discord.MessageEmbed()
            .setTitle(this.Settings.Embed.Title)
            .setDescription(this.Settings.Embed.Description)
            .setTimestamp(this.Settings.Embed.TimeStamp)
            .setURL(this.Settings.Embed.URL)
            .addField("Предпросмотр", `\n(16x16):\n${emojid}\n\n(32x32):`)
            .setImage("attachment://" + this.filename + "_small.png")
            .attachFiles([{
                attachment: "/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + "_small.png",
                name: this.filename + "_small.png"
            }, {
                attachment: "/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + ".png",
                name: this.filename + ".png"
            }])
            .setThumbnail("attachment://" + this.filename + ".png")
            .setColor(this.Settings.Embed.Color);
        if (Util.isBlank(this.Settings.Embed.TimeStamp)) {
            this.Settings.Embed.TimeStamp = (+new Date());
        }
        //console.log(JSON.stringify(Embed._apiTransform()));
        //process.exit();
        let NewMessageHash = crypto.createHash('md5').update(JSON.stringify(Embed._apiTransform())).digest("hex");
        if ((Message == undefined || needimageupdate || NewMessageHash != this.Settings.MessageHash) && Util.isBlank(this.Settings.DontPublish)) {
            if (Message) {
                await Message.edit(Embed);
            } else {
                this.Settings.MessageID = (await this.guild.channels.get(this.channelid).send(Embed)).id;
            }
            this.Settings.MessageHash = NewMessageHash;
            await this.save();
        }
    }
    async checkpropersave() {
        if (fs.existsSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + ".tmp")) {
            if (Util.isJSON(fs.readFileSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + ".tmp", 'utf8'))) {
                fs.renameSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + ".tmp", "/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + ".json");
            } else fs.unlinkSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + ".tmp");
        }
        this.Settings = JSON.parse(fs.readFileSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + ".json", 'utf8'));
    }
    async save() {
        fs.writeFileSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + this.filename + ".tmp", JSON.stringify(this.Settings, null, 4), {
            encoding: 'utf8',
            flag: 'w'
        });
        await this.checkpropersave();
    }
};
module.exports = ScriptOneEmojiGuildStore;