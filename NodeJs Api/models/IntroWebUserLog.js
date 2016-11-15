var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var IntroWebUserLogSchema   = new Schema({
    clientId: String,
    duration: String,
    gone_to_play_store : String
});

module.exports = mongoose.model('IntroWebUserLog', IntroWebUserLogSchema);