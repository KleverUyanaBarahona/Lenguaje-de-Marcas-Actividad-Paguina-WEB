// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = 'http://66.90.93.122/ost/legend-of-zelda-the-30th-anniversary-concert/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Hyrule Castle",
                "duration": "2:29",
                "file": "khgezljrus//1-01%20Hyrule%20Castle"
            }, {
                "track": 2,
                "name": "Zelda´s Theme",
                "duration": "3:02",
                "file": "yvwjtexefv/1-02%20Zelda%27s%20Theme"
            }, {
                "track": 3,
                "name": "The Wind Waker Medley",
                "duration": "11:23",
                "file": "dulbqjeife/1-03%20The%20Wind%20Waker%20Medley"
            }, {
                "track": 4,
                "name": "Ocarina Medley Suite",
                "duration": "11:48",
                "file": "azmdkuqnvp/1-04%20Ocarina%20Medley%20Suite"
            }, {
                "track": 5,
                "name": "Boss Battle Theme Medley",
                "duration": "6:43",
                "file": "ptjcktmshw/1-05%20Boss%20Battle%20Theme%20Medley"
            }, {
                "track": 6,
                "name": "A Link Between Wodrls & Tri Force HeroesMedley",
                "duration": "7:15",
                "file": "tctozbwfvk/1-06%20A%20Link%20Between%20Worlds%20%26%20Tri%20Force%20Heroes%20Medley"
            }, {
                "track": 7,
                "name": "Skyward Sword Staff Roll",
                "duration": "7:51",
                "file": "lsroulngow/1-07%20%27%27Skyward%20Sword%27%27%20Staff%20Roll"
            }, {
                "track": 8,
                "name": "The Legend pf Zelda 30th AnniversaryMedley",
                "duration": "9:08",
                "file": "xlpwntpvel/2-01%20The%20Legend%20of%20Zelda%2030th%20Anniversary%20Medley"
            }, {
                "track": 9,
                "name": "The Legend fo Zelda Jingle Suite",
                "duration": "4:20",
                "file": "iqwtohdvwd/2-02%20The%20Legend%20of%20Zelda%20Jingle%20Suite"
            }, {
                "track": 10,
                "name": "Gerudo Valley",
                "duration": "3:37",
                "file": "dahqabkdct/2-03%20Gerudo%20Valley"
            }, {
                "track": 11,
                "name": "Ocarina of Time Hyrule Field",
                "duration": "3:55",
                "file": "xalojpzgkm/2-04%20%27%27Ocarina%20of%20Time%27%27%20Hyrule%20Field"
            }, {
                "track": 12,
                "name": "Great Fairy's Fountain Theme ",
                "duration": "3:36",
                "file": "vgxtkzssik/2-05%20Great%20Fairy%27s%20Fountain%20Theme"
            }, {
                "track": 13,
                "name": "Twilight Princess Medley",
                "duration": "11:52",
                "file": "nnqzssbuzf/2-06%20Twilight%20Princess%20Medley"
            }, {
                "track": 14,
                "name": "The Legend of Zelda Maiin Theme",
                "duration": "8:12",
                "file": "wrpzllxdul/2-07%20The%20Legend%20of%20Zelda%20Main%20Theme"
            }],
            buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // boo hoo
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});