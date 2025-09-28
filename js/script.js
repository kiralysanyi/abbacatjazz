AOS.init({
    duration: 1000
});

//init bg player
const bg_player = document.createElement("audio");
bg_player.style.display = "none";
bg_player.loop = true;
document.body.appendChild(bg_player);
bg_player.src = "assets/bg_music.mp3"
bg_player.volume = 0.5;

let isMusicPlaying, userStartedMusic = false;
const bg_music_btn = document.getElementById("bg_music_btn")
function stopMusic() {
    bg_music_btn.innerHTML = "Háttérzene indítása";
    console.log("stop");
    bg_player.pause();
}

function startMusic() {
    bg_music_btn.innerHTML = "Háttérzene leállítása";
    console.log("start");

    bg_player.volume = 0;
    bg_player.play();

    const step = 0.05;
    const duration = 4000; //ms
    let interval = duration / (0.5 / step);

    const fade = setInterval(() => {
        if (bg_player.volume < 0.5) {
            bg_player.volume = Math.min(bg_player.volume + step, 0.5);
            console.log(bg_player.volume)
        } else {
            clearInterval(fade)
        }
    }, interval);

}

function toggleMusic() {
    if (isMusicPlaying) {
        userStartedMusic = false;
        isMusicPlaying = false;
        stopMusic();
    } else {
        isMusicPlaying = true;
        userStartedMusic = true;
        startMusic();
    }
}

bg_music_btn.addEventListener("click", () => {
    toggleMusic();
})


// youtube embedded player

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        stopMusic()
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        // ha a felhasználó elindította a zenét és nem állította meg kézzel akkor vissza indítjuk a lejátszás után
        if (userStartedMusic) {
            startMusic();
        }
    }
}

let player1, player2, player3;

function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('player1', {
        videoId: '850A1Qjj8ds', // ide a videó ID
        events: {
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            modestbranding: 1,
            rel: 0
        }
    });

    player2 = new YT.Player('player2', {
        videoId: 'GT3SQx0QFKM', // ide a videó ID
        events: {
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            modestbranding: 1,
            rel: 0
        }
    });

    player3 = new YT.Player('player3', {
        videoId: 'G1kUryfUf-g', // ide a videó ID
        events: {
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            modestbranding: 1,
            rel: 0
        }
    });
}