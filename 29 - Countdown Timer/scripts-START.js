/*
 * Description:
 * Author:LinJ
 * Date:2021-11-18 13:35:09
 * LastEditors:LinJ
 * LastEditTime:2021-11-18 14:47:00
 */
const timer_controls = document.querySelector('.timer__controls');
const timer_buttons = timer_controls.querySelectorAll('.timer__button');
const customForm = timer_controls.querySelector('#custom');

const time_left = document.querySelector('.display__time-left');
const time_end = document.querySelector('.display__end-time');

let intervalHandle = null;

function setTimer (seconds) {
  const now = Date.now(); // ms
  const then = now + seconds * 1000; // ms

  // init display
  leftTimeDisplay(seconds);
  endTimeDisplay(then);
  // 设置倒计时
  if (intervalHandle) clearInterval(intervalHandle);
  intervalHandle = setInterval(()=>{
    const second_left = Math.round((then - Date.now()) / 1000);
    if(second_left < 0) {
      clearInterval(intervalHandle);
      return;
    };

    leftTimeDisplay(second_left);
  }, 1000);
}
// 剩余事件显示 time：剩余时间，参数单位: ms，显示格式 00:00
function leftTimeDisplay(time) {
  const minutes = Math.floor(time / 60);
  const remainSeconds = time % 60;

  const html = `${minutes} : ${remainSeconds < 10?'0' :''}${remainSeconds}`;

  time_left.textContent = html;
}
// 终止时间显示 time：终止时间，参数单位: ms，显示格式 hour:mins
function endTimeDisplay(time) {
  const end = new Date(time);
  const hour = end.getHours();
  const minutes = end.getMinutes()

  time_end.textContent = `终止于 ${hour} : ${minutes < 10?'0' :''}${minutes}`;
}
// bind events
timer_buttons.forEach((button) => button.addEventListener('click', function (){
  const seconds = parseInt(this.dataset.time);
  setTimer(seconds);
}));

customForm.addEventListener('submit', function(e){
  e.preventDefault();
  const mins = this.minutes.value;
  
  setTimer(mins * 60);
  // 重置
  this.reset();
})

