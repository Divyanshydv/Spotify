
let currentsong = new Audio();
let songs;
function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs() {
  let a = await fetch("http://127.0.0.1:3000/songs/")
  let responce = await a.text();
  let div = document.createElement("div")
  div.innerHTML = responce;
  let as = div.getElementsByTagName("a")
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1])
    }
  }
  return songs

}
const playMusic = (track, pause = false) =>{

  currentsong.src = "/songs/"+track
if(!pause){
  currentsong.play()
  play.src ="pause.svg"
  
}


  
  
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

}



async function main() {

  //  Get the list off all song
   songs = await getsongs()

playMusic(songs[8] ,true)


  // show all the song in playlist
  let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]

  for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>  ${song.replaceAll("%20", " ")}</div>
                                <div>Harray</div>
                            </div>
                            <div class="playnow">
                                <span>play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div> </li>`
  }

  // Attach an event listener to each song
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
      
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

    })
  })
  // Attach event listener to play next and previous
  play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play()
      play.src = "pause.svg"
    }
    else {
      currentsong.pause()
      play.src = "play.svg"
    }
  })
  // listen for time update event
  currentsong.addEventListener("timeupdate", () => {
    console.log(currentsong.currentTime, currentsong.duration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
    document.querySelector(".circle").style.left = (currentsong.currentTime/currentsong.duration) * 100 + "%";
})

// add a Eventlistner to seek bar
  document.querySelector(".seekbar").addEventListener("click" ,e =>{
    let persent = (e.offsetX / e.target.getBoundingClientRect().width) * 100 ;
  document.querySelector(".circle").style.left = persent + "%"; 
  currentsong.currentTime = ((currentsong.duration)*persent)/100
  })
  // add a Eventlistner to hamburger
  document.querySelector('.hamburger').addEventListener("click",()=>{
    document.querySelector(".left").style.left = "0"
  })
    // add a Eventlistner to closebutto
  document.querySelector('.close').addEventListener("click",()=>{
    document.querySelector(".left").style.left = "-120%"
  })
  // Add an event listner for previous
  previous.addEventListener("click", () => {
        currentSong.pause()
        console.log("Previous clicked")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("Next clicked")

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })
    // ADD an event to volumed
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
      console.log("setting volume to",e.target.value,"/ 100");
      currentsong.volume = parseInt(e.target.value)/100
    })
}
//  Array.from(document.getElementsByClassName("card")).forEach(e=>{
    // console.log(e);
    
    //   e.addEventListener("click", async item =>{
    //     console.log(item.target, item.dataset);
        
    //      songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)

       
    //   })
    // })
main()  
  