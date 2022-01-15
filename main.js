var musicList = [{
    src: 'http://cloud.hunger-valley.com/music/玫瑰.mp3',
    title: '玫瑰',
    auther: '贰佰'
  },
  {
    src: 'http://cloud.hunger-valley.com/music/ifyou.mp3',
    title: 'IF YOU',
    auther: 'Big Bang'
  },
  {
    src: 'https://sharefs.ali.kugou.com/202201151732/6ab36398ba061fa0a8c7784640b3677d/KGTX/CLTX001/9c29ccf742c1a8f8a8171dd3305b428b.mp3',
    title: '后来',
    auther: '刘诺英'
  },
  {
    src: 'https://sharefs.ali.kugou.com/202201151736/502646b6f9af518fb17fa26947dd5ec6/G205/M04/06/08/rZQEAF5jZ-2AdHivABX1ZV_4Y0E465.mp3',
    title: '咖啡因乐队',
    auther: '成长的路口'
  }
]

//获取页面元素-info querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
var titleNode = document.querySelector('.musicbox .title')
var authorNode = document.querySelector('.musicbox .auther')
//获取页面元素-control
var backBtn = document.querySelector('.musicbox .back')
var playBtn = document.querySelector('.musicbox .play')
var forwardBtn = document.querySelector('.musicbox .forward')

var progressBarNode = document.querySelector('.musicbox .progress .bar')
var progressNowNode = document.querySelector('.musicbox .progress-now')

var timeNode = document.querySelector('.musicbox .time')
var timerAll = document.querySelector('.musicbox .timeall')

var music = new Audio()
music.autoplay = true
var musicIndex = 0

loadMusic(musicList[musicIndex])

//播放
playBtn.onclick = function() {
  var icon = this.querySelector('.fa')
  if (icon.classList.contains('fa-play')) {
    music.play()
  } else {
    music.pause()
  }
  icon.classList.toggle('fa-play')
  icon.classList.toggle('fa-pause')
}

backBtn.onclick = loadLastMusic
forwardBtn.onclick = loadNextMusic
music.onended = loadNextMusic
music.shouldUpdate = true

music.onplaying = function() {
  timer = setInterval(function() {
    updateProgress()
  }, 1000)
  console.log('play')
}
music.onpause = function() {
  console.log('pause')
  clearInterval(timer)
}

//滚动条点击
progressBarNode.onclick = function(e) {
  var percent = e.offsetX / parseInt(getComputedStyle(this).width)
  music.currentTime = percent * music.duration
  progressNowNode.style.width = percent * 100 + "%"
}

function loadMusic(songObj) {
  music.src = songObj.src
  titleNode.innerText = songObj.title
  authorNode.innerText = songObj.auther
}

function loadNextMusic() {
  musicIndex++
  musicIndex = musicIndex % musicList.length
  loadMusic(musicList[musicIndex])
}

function loadLastMusic() {
  musicIndex--
  musicIndex = (musicIndex + musicList.length) % musicList.length
  loadMusic(musicList[musicIndex])
}

function updateProgress() {
  var percent = (music.currentTime / music.duration) * 100 + '%'
  progressNowNode.style.width = percent

  var minutes = parseInt(music.currentTime / 60)
  var seconds = parseInt(music.currentTime % 60) + ''
  seconds = seconds.length == 2 ? seconds : '0' + seconds
  timeNode.innerText = minutes + ':' + seconds
}

