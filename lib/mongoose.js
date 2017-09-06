var mongoose = require('mongoose'),
    config = require('config');

//mongoose.connect(process.env.MONGO_URL, config.get('mongoose.options'));
mongoose.connect(process.env.MONGO_URL, {
    "server": {
        "socketOptions": {
            "keepAlive": 1
        }
    }
});

module.exports = mongoose;
