/*
 * Description:
 * Author:LinJ
 * Date:2021-11-07 11:24:52
 * LastEditors:LinJ
 * LastEditTime:2021-11-07 13:24:58
 */
// 获取各元素
// 总容器
const player = document.querySelector('.player');
// video标签
const video = player.querySelector('.viewer');
// 进度条
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
// 控制端
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const volumeRange = player.querySelector('[name=volume]')
const playrateRange = player.querySelector('[name=playbackRate]')
// 播放状态标志位
let isPlaying = false;

function videoPlayStatusToggle(e) {
  video[isPlaying ? 'pause' : 'play']();
  isPlaying = !isPlaying;
}
function volumeChangeHandle(e) {
  video[this.name] = this.value;
}
function playrateChangeHandle(e) {
  video[this.name] = this.value;
}
function skipHandle(e) {
  video.currentTime += parseFloat(this.dataset.skip)
}
function currentTimeChange(e) {
  const curtime = (e.offsetX/progress.offsetWidth) * video.duration
  video.currentTime = curtime;
}
// 播放按钮切换状态
function buttonUpdate(e) {
  toggle.innerHTML = !isPlaying ? '►' : '❚ ❚'
}
// 进度条更新
function processUpdate(e) {
  progressBar.style.flexBasis = `${video.currentTime * 100 / video.duration}%`
}
// bind event
// 视频画面
video.addEventListener('click', videoPlayStatusToggle);
// 播放状态变更事件
video.addEventListener('play', buttonUpdate);
video.addEventListener('pause', buttonUpdate);
// 播放时间变更
video.addEventListener('timeupdate', processUpdate);

// 播放按钮
toggle.addEventListener('click', videoPlayStatusToggle);
// 播放速度 playbackRate 1.0为基准 不能为0.0
playrateRange.addEventListener('input', playrateChangeHandle)
// 音量 volume 0.0-1.0
volumeRange.addEventListener('input', volumeChangeHandle)
// 快进快退 currentTime
skipButtons.forEach(button=>{button.addEventListener('click', skipHandle)})
// 进度条
// 点击的时候变更
progress.addEventListener('click', currentTimeChange)
// 鼠标拖动
let isMousemove = false;
progress.addEventListener('mousedown', (e) => {isMousemove = true; video.pause();})
progress.addEventListener('mousemove', (e) => {isMousemove && currentTimeChange(e)})
progress.addEventListener('mouseup', (e) => {isMousemove = false; video.play();})


