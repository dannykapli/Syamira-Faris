const opening = document.getElementById('opening');
const main = document.getElementById('mainContent');
const openBtn = document.getElementById('openBtn');

const weddingAudio = document.getElementById('weddingAudio');
const musicToggle = document.getElementById('musicToggle');

function updateMusicButton(isPlaying){
  musicToggle.classList.toggle('playing', isPlaying);
  musicToggle.querySelector('span').textContent = isPlaying ? 'Music On' : 'Music Off';
}

openBtn.addEventListener('click', () => {
  weddingAudio.volume = 1.0;
  weddingAudio.play().then(() => updateMusicButton(true)).catch(() => updateMusicButton(false));

  opening.style.opacity = '0';
  opening.style.transition = 'opacity .7s ease';
  main.classList.add('opened');
  main.setAttribute('aria-hidden','false');
  document.body.classList.remove('no-scroll');
  setTimeout(() => opening.remove(), 750);
});
document.body.classList.add('no-scroll');

const weddingDate = new Date('2026-09-19T11:00:00+08:00').getTime();

function updateCountdown(){
  const now = Date.now();
  const distance = weddingDate - now;
  const ids = ['days','hours','minutes','seconds'];
  if(distance <= 0){
    ids.forEach(id => document.getElementById(id).textContent = '00');
    return;
  }
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const mins = Math.floor((distance % 3600000) / 60000);
  const secs = Math.floor((distance % 60000) / 1000);
  document.getElementById('days').textContent = String(days).padStart(2,'0');
  document.getElementById('hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('minutes').textContent = String(mins).padStart(2,'0');
  document.getElementById('seconds').textContent = String(secs).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

document.getElementById('calendarBtn').addEventListener('click', () => {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Syamira and Faris//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    'UID:syamira-faris-20260919@example.com',
    'DTSTAMP:20260809T000000Z',
    'DTSTART:20260919T030000Z',
    'DTEND:20260919T080000Z',
    'SUMMARY:Syamira & Faris — Wedding',
    'LOCATION:1-B 1st Floor, Block 4, Worldwide Business Centre, Jalan Karate 13/47, Seksyen 13, 40100 Shah Alam, Selangor',
    'DESCRIPTION:Wedding celebration of Syamira & Faris. 11:00 AM – 4:00 PM.',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([ics], {type:'text/calendar;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Syamira-Faris-Wedding-19-September-2026.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lightboxImg.src = item.dataset.full;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
  });
});
function closeLightbox(){
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImg.src = '';
}
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });


musicToggle.addEventListener('click', async () => {
  if (weddingAudio.paused) {
    try {
      await weddingAudio.play();
      updateMusicButton(true);
    } catch(e) {
      updateMusicButton(false);
    }
  } else {
    weddingAudio.pause();
    updateMusicButton(false);
  }
});
