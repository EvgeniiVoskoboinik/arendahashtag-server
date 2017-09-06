const mongoose = require('lib/mongoose'),
    Schema = mongoose.Schema;

const schema = new Schema({
    sid:{
        type: String,
        required: true
    },
    vkId: {
        type: String,
        required: true,
    }
});

schema.statics.getSession = function(sid, callback) {

    const session = this;

    session
        .findOne({sid: sid})
        .exec((err, session) => {
            if (err) return callback(err);
            return callback (null, session);
        });
};

schema.statics.getAllSessions = function(limit, callback) {

    const session = this;

    session
        .find({})
        .limit(limit)
        .exec((err, sessions) => {
            if (err) return callback(err);
            return callback (null, sessions);
        });
};

schema.statics.saveSession = function(_sid, vkId, callback) {
    const Session = this;
    const session = new Session({
        sid: sid,
        vkId: vkId
    });

    session.save(function(err) {
        if (err)
            return callback(err);
        return callback(null, session);
    });
};

exports.Session = mongoose.model('Session', schema);