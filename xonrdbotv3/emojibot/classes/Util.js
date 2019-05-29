function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
async function CleanUpTextChannel(channel,compare){
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

module.exports = {
    sleep: sleep,
    isEmpty: isEmpty,
    isBlank: isBlank,
    isJSON: isJSON,
    CleanUpTextChannel: CleanUpTextChannel
};
