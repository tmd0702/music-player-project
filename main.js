let audioElement = document.querySelector("#audio");
let nextBtn = document.querySelector(".forward");
let prevBtn = document.querySelector(".backward");
let playBtn = document.querySelector(".play");
let shuffleBtn = document.querySelector(".shuffle");
let replayBtn = document.querySelector(".replay");
let imageElement = document.querySelector(".disc");
let isPlaying = false;
let isReturn = false;
let isRandom = false;
let currIndex = 0;
const discAnimate = imageElement.animate([{ transform: "rotate(360deg)" }], {
  duration: 10000, // 10 seconds
  iterations: Infinity
});
let app = {
    songs: [
        {
          name: "Yesterday Once More",
          singer: "The Carpenters",
          path: "./assets/songs/YesterdayOnceMore.mp3",
          image: "data:image/jpeg;base64,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"
        },
        {
          name: "Lemon Tree",
          singer: "Fool's Garden",
          path: "./assets/songs/LemonTree.mp3",
          image:
            "https://upload.wikimedia.org/wikipedia/vi/9/92/Lemon_Tree_%28Fool%27s_Garden_song%29_coverart.jpg"
        },
        {
          name: "More Than I Can Say",
          singer: "Leo Sayer",
          path:
            "./assets/songs/MoreThanICanSay.mp3",
          image: "https://avatar-nct.nixcdn.com/singer/avatar/2014/13/7E4149A9_1701.jpg"
        },
        {
          name: "Ảo Mộng Tình Yêu",
          singer: "Hà Nhi",
          path: "./assets/songs/AoMongTinhYeu.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/song/2018/03/19/6/3/0/c/1521467758856_640.jpg"
        },
        {
          name: "My Love",
          singer: "Westlife",
          path: "./assets/songs/MyLove.mp3",
          image:
            "https://avatar-ex-swe.nixcdn.com/playlist/2019/01/15/b/c/6/b/1547551522561_500.jpg"
        },
        {
          name: "Close To You",
          singer: "The Carpenters",
          path: "./assets/songs/CloseToYou.mp3",
          image:
            "data:image/jpeg;base64,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"
        }
      ],
      renderSongs: function() {
        let html = '';
        for (let song of this.songs) {
            html += `<div class="musics">
            <img class="music-image" src="${song.image}" alt="">
            <!-- <div class="music-image"></d> -->
            <div class="music-text">
                <p class="song-name">${song.name}</p>
                <p class="song-auth">${song.singer}</p>
            </div>
            <div class="music-option">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
        </div>`
        }
        document.querySelector('.music-list').innerHTML = html;
      },
      renderCurrentIndex: function() {
        let name = this.songs[currIndex].name;
        let musics = document.getElementsByClassName("musics");
        let renderElement;
        for (let music of musics) {
          if (music.querySelector(".song-name").innerText == name) {
            renderElement = music;
            break;
          }
        }
        imageElement.style.backgroundImage = `url('${this.songs[currIndex].image}')`;
        document.querySelector(".music-name").innerHTML = name;
        app.removeActiveElement();
        app.addActiveElement(renderElement);
        app.scrollToActiveSong();
        app.playSong(app.songs[currIndex].path);
      },
      handleShuffleBtn: function() {
       
          shuffleBtn.onclick = function() {
            if (!isRandom) {
              isRandom = 1;
              shuffleBtn.classList.add("active");
            }
            else {
              isRandom = 0;
              shuffleBtn.classList.remove("active");
            }
          }
      },
      handleReplayBtn: function() {
          replayBtn.onclick = function() {
            if (!isReturn) {
              isReturn = 1;
              replayBtn.classList.add("active");
            }
            else {
              isReturn = 0;
              replayBtn.classList.remove("active");
            }
          }
      },
      handleNextBtn: function() {
        nextBtn.onclick = function() {
          let tmp = currIndex;
          if (!isRandom) ++currIndex;
          else {
            do {
              currIndex = Math.floor(Math.random() * app.songs.length);
            } while (currIndex == tmp);
          }
          if (currIndex == app.songs.length) currIndex = 0;
          app.renderCurrentIndex();
        }
      },
      handlePrevBtn: function() {
        prevBtn.onclick = function() {
          let tmp = currIndex;
          if (!isRandom) --currIndex;
          else {
            do {
              currIndex = Math.floor(Math.random() * app.songs.length);
            } while (currIndex == tmp);
          }
          if (currIndex < 0) currIndex = app.songs.length - 1;
          app.renderCurrentIndex();
        }
      },
      getSongIndex: function(name) {
        for (let i = 0; i < app.songs.length; ++i ){
            if (name == app.songs[i].name) {
              currIndex = i;
              return i;
            }
        }
        return 0;
      },
      addActiveElement: function(musicElement) {
        musicElement.classList.add("active");
      },
      removeActiveElement: function() {
        let musics = document.querySelector(".music-list");
        let activeElement = musics.querySelector(".active");
        if (activeElement) activeElement.classList.remove("active");
      },
      playSong: function(src) {
        
        audioElement.src = src;
        app.handleOnPlay();
        audio.play();
      },
      handleEvent: function() {
        this.handleOnChange();
        this.renderCurrentIndex();
        this.handleReplayBtn();
        this.handleShuffleBtn();
        this.handleOnEnded();
        this.handleNextBtn();
        this.handlePrevBtn();
        function getCurrentSong() {
          let musicName = document.querySelector(".music-name");
          let musicElement = document.getElementsByClassName("musics");
          for (let music of musicElement) {
            let activeElement = document.querySelector(".active");
            if (activeElement == music) {
              music.onmousedown = function() {
                 music.style.opacity = 0.5;
              } 
            
              music.onmouseup = function() {
                music.style.opacity = 1;
              }
            }
              music.onclick = () => {
                  app.removeActiveElement();
                  music.classList.add("active");
                  app.scrollToActiveSong();
                  musicName.innerHTML = music.querySelector(".song-name").innerText;
                  let songIndex = app.getSongIndex(musicName.innerHTML);
                  imageElement.style.backgroundImage = `url('${app.songs[songIndex].image}')`;
                  app.playSong(app.songs[songIndex].path);
              }
          }
        }
        
        
        let discElement = document.querySelector(".disc");
        let width = discElement.offsetWidth;
        let height = discElement.offsetHeight;
        let opacity = 1;
        let runner = document.querySelector("#runner");
        document.onscroll = function() {
            
            let newWidth = width - document.documentElement.scrollTop;
            let newHeight = height - document.documentElement.scrollTop;
            discElement.style.width = newWidth > 0 ? newWidth + 'px': 0;
            discElement.style.height = newHeight > 0 ? newHeight + 'px': 0;
            discElement.style.opacity = opacity - (newWidth / width) > 1 ? 1 : newWidth/width;
            discElement.style.backgroundSize = newWidth > 0 ? newWidth + 'px': 0;
        }
        getCurrentSong();
          playBtn.onclick = () => {
              if (isPlaying == false) {
                audioElement.play();
                app.handleOnPlay();
              }
              else {
                audioElement.pause();
                app.handleOnPause();
              }
          }
          
          audioElement.ontimeupdate = function() {
            if (audio.duration) {
              runner.value = Math.floor(audioElement.currentTime / audioElement.duration * 100);
            }
          }
        
          
      },
      handleOnEnded: function() {
        audioElement.onended = function() {
          if (!isReturn) nextBtn.click();
          else {
            audioElement.currentTime=0;
            audioElement.play();
          }
        }
      },
      handleOnChange: function() {
          runnerElement = document.querySelector("#runner");
          runnerElement.onchange = function(e) {
            audioElement.currentTime = e.target.value/100 * audioElement.duration;

          }
      },
      scrollToActiveSong: function () {
        setTimeout(() => {
          document.querySelector(".musics.active").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
          });
        }, 400);
      },
      handleOnPlay: function() {
        audioElement.onplay = function() {
          // document.querySelector(".disc").style.animationName = "rotate";
          discAnimate.play();
          isPlaying = true;
          playBtn.querySelector('i').classList.remove("fa-play");
          playBtn.querySelector('i').classList.add("fa-pause");
        }
      },
      handleOnPause: function() {
        audioElement.onpause = function() {
          // document.querySelector(".disc").style.animationName = "none";
          discAnimate.pause();
          isPlaying = false;
          playBtn.querySelector('i').classList.remove("fa-pause");
          playBtn.querySelector('i').classList.add("fa-play");
        }
      },
      start: function() {
        this.renderSongs();
        this.handleEvent();
      }
}
app.start();