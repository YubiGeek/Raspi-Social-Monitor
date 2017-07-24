var player = require('play-sound')(opts = {});
var googleTTS = require('google-tts-api');
var schedule = require('node-schedule');

var twitter = require('./providers/twitter');
var facebook = require('./providers/facebook');
var instagram = require('./providers/instagram');

var counterTwitter = 0;
var counterInstagram = 0;
var counterFacebook = 0;

var speak = function (text) {
    googleTTS(text, 'fr', 1)
        .then(function (url) {
            player.play(url, function (err, stdout, stderr) {
                //
            });
        })
        .catch(function (err) {
            console.error(err.stack);
        });
};

var getCounterTwitter = function (spoke) {
    twitter.get(function (error, result) {
        if(!error && result) {
            if(spoke) {
                if(result > counterTwitter) {
                    var text = 'Vous avez gagné un nouvel abonné sur Twitter! ' + result + ' au total.';
                    console.log(text);
                    speak(text);
                } else if(result < counterTwitter ) {
                    var text = 'Vous avez perdu un abonné sur Twitter! ' + result + ' au total.';
                    console.log(text);
                    speak(text);
                }
            }
            counterTwitter = result;
        } else {
            console.error('Twitter:', error);
        }
    });
};

var getCounterFacebook = function (spoke) {
    facebook.get(function (error, result) {
        if(!error && result) {
            if(spoke) {
                if(result > counterFacebook) {
                    var text = 'Vous avez gagné un nouvel abonné sur Facebook! ' + result + ' au total.';
                    console.log(text);
                    speak(text);
                } else if(result < counterFacebook ) {
                    var text = 'Vous avez perdu un abonné sur Facebook! ' + result + ' au total.';
                    console.log(text);
                    speak(text);
                }
            }
            counterFacebook = result;
        } else {
            console.error('Facebook:', error);
        }
    });
};

var getCounterInstagram = function (spoke) {
    instagram.get(function (error, result) {
        if(!error && result) {
            if(spoke) {
                if(result > counterInstagram) {
                    var text = 'Vous avez gagné un nouvel abonné sur Instagram! ' + result + ' au total.';
                    console.log(text);
                    speak(text);
                } else if(result < counterInstagram ) {
                    var text = 'Vous avez perdu un abonné sur Instagram! ' + result + ' au total.';
                    console.log(text);
                    speak(text);
                }
            }
            counterInstagram = result;
        } else {
            console.error('Instagram:', error);
        }
    });
};

schedule.scheduleJob('* * * * *', function(){
    getCounterTwitter(true);
    getCounterFacebook(true);
    getCounterInstagram(true);
});

getCounterTwitter(false);
getCounterFacebook(false);
getCounterInstagram(false);