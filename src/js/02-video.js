import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const localStorageCurentTime = localStorage.getItem("videoplayer-current-time");

function curentTime(data) {
        const curentTime = data.seconds;
        localStorage.setItem("videoplayer-current-time", curentTime);
}

player.on('timeupdate', throttle(curentTime, 1000));
player.setCurrentTime(localStorageCurentTime);
