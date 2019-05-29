var fs = require('fs');
var path = require('path');

const ScriptOneEmojiGuildStore = require('./ScriptOneEmojiGuildStore.js');
const Util = require('./Util.js');

class ScriptEmojiGuildStore {
    constructor(guildid) {
        this.guildid = guildid;
        this.ishack = false;
        this.EmojisArray = [];
    }
    async init(client) {
        this.client = client;
        this.guild = client.guilds.get(this.guildid);
        await this.checkpropersave();
        let files = fs.readdirSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active");
        for (let i in files) {
            let ignorelist = [];
            if (path.extname(files[i]) === ".tmp" || path.extname(files[i]) === ".json") {
                console.log(files[i]);
                if (ignorelist.includes(path.basename(files[i], path.extname(files[i]))) || !fs.existsSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + path.basename(files[i]))) continue;
                if (!fs.existsSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + path.basename(files[i], path.extname(files[i])) + ".png")) {
                    if (path.extname(files[i]) === ".tmp" && !fs.existsSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + path.basename(files[i], path.extname(files[i])) + ".tmp")) {
                        fs.unlinkSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/active/" + path.basename(files[i], path.extname(files[i])) + ".tmp");
                    }
                    continue;
                }
                ignorelist.push(path.basename(files[i], path.extname(files[i])));
                this.EmojisArray.push(new ScriptOneEmojiGuildStore(this.guildid, path.basename(files[i], path.extname(files[i])), this.Settings.ChannelID));
            }
        }
        let availableid = 0;
        for (let emoji of this.EmojisArray) {
            await emoji.init(this.client);
            if (!Util.isEmpty(emoji.Settings.UniqueID) && emoji.Settings.UniqueID > availableid)
                availableid = emoji.Settings.UniqueID;
        }
        this.EmojisArray = this.EmojisArray.sort((a, b) => {
            if (a.Settings.Position < b.Settings.Position)
                return -1;
            if (a.Settings.Position > b.Settings.Position)
                return 1;
            return 0;
        });
        //Сделать: Пересортировка позиций в .json, если есть пропуски.
        await this.СheckPositionsOfMessages();
        for (let emoji of this.EmojisArray) {

            availableid = (await emoji.preprocessing(availableid));
            await emoji.checkupdate();
        }

    }

    async СheckPositionsOfMessages() {
        await Util.CleanUpTextChannel(this.client.channels.get(this.Settings.ChannelID), (Message) => {
            return this.EmojisArray.findIndex(EmojiContainer => EmojiContainer.Settings.MessageID == Message.id) === -1 ? false : true;
        });

        let LastID = null;
        let FirstEncounter = undefined;
        let NeedToWipe = false;
        while (true) {
            const Messages = await this.client.channels.get(this.Settings.ChannelID).messages.fetch({
                limit: 100,
                ...(LastID !== null && {
                    before: LastID
                })
            });
            if (Messages.size > 0) {
                LastID = Messages.last().id;
                for (let Message of Messages.values()) {
                    let Element = this.EmojisArray.find(EmojiContainer => EmojiContainer.Settings.MessageID == Message.id);
                    if (Element !== undefined) {
                        if (FirstEncounter === undefined) FirstEncounter = Element.Settings.Position;
                        else if (--FirstEncounter != Element.Settings.Position) {
                            NeedToWipe = true;
                            break;
                        }
                    }
                }
                if (NeedToWipe) break;
            } else {
                break;
            }
        }
        console.log("Need to Wipe:", NeedToWipe);
        //process.exit();
        if (NeedToWipe === true) {
            await Util.CleanUpTextChannel(this.client.channels.get(this.Settings.ChannelID), () => {
                return false;
            });
        }

    }
    async checkpropersave() {
        if (fs.existsSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/settings.tmp")) {
            if (Util.isJSON(fs.readFileSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/settings.tmp", 'utf8'))) {
                fs.renameSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/settings.tmp", "/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/settings.json");
            } else fs.unlinkSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/settings.tmp");
        }
        this.Settings = JSON.parse(fs.readFileSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/settings.json", 'utf8'));
    }
    async save() {
        fs.writeFileSync("/home/xonrdbotv3/emojibot/data/emojis/" + this.guildid + "/settings.tmp", JSON.stringify(this.Settings, null, 4), {
            encoding: 'utf8',
            flag: 'w'
        });
        await this.checkpropersave();
    }
};
module.exports = ScriptEmojiGuildStore;