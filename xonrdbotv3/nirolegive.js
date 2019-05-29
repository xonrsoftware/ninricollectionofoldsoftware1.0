require('events').EventEmitter.prototype._maxListeners = 100000;
require('events').EventEmitter.defaultMaxListeners = 100000;
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client({
    fetchAllMembers: true
});
Array.prototype.forEachAsync = async function (fn) {
    for (let t of this) {
        await fn(t)
    }
}

Array.prototype.forEachAsyncParallel = async function (fn) {
    await Promise.all(this.map(fn));
}
const wait = require('util').promisify(setTimeout);
client.on('error', (error) => {
    console.log("Error d.js!");
    process.exit();
});
let isready = false;
client.on('ready', async () => {
    if (isready) return;
    else isready = true;
    wait(2000);
    await client.guilds.get('286198213612929024').fetchMembers().then(async (memmmbaaas) => {
        await memmmbaaas.members.array().forEachAsync(async element => {
            if (element.roles.array().length > 1 && !element.user.bot) {
                if (!element.roles.has('404810535347945483')) {
                    //console.log("TRY");
                    await element.addRole('404810535347945483').catch(function (reason) {
                        client.destroy().then(() => {
                            client.login('заменить');
                            console.log("RECONNECTED");
                        });
                    });
                    console.log("GIVE ROLE:" + element.displayName);
                }

            }
            return element;
        });
        process.on('uncaughtException', function (err) {
            console.log('Caught exception: ', err);
            client.destroy().then(() => {
                client.login('заменить');
                console.log("RECONNECTED");
            });
        });
        process.on('unhandledRejection', function (reason, p) {
            console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
            client.destroy().then(() => {
                client.login('заменить');
                console.log("RECONNECTED");
            });
        });
        process.exit();
    });
});
client.login('заменить');