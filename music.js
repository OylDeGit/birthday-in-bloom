'use strict';
// Set data-file on #birthday-music when the supplied audio asset is available.
(() => {
  const audio = document.querySelector('#birthday-music');
  const toggles = [...document.querySelectorAll('[data-music-toggle]')];
  if (!audio?.dataset.file) return;
  const assets = new URL('./assets/', document.currentScript.src);
  audio.src = new URL(audio.dataset.file, assets).href;
  audio.volume = 0.18;
  audio.loop = true;
  let manuallyPaused = false;
  let failed = false;
  let playRequest;
  const sync = () => toggles.forEach(button => {
    button.hidden = false;
    button.disabled = failed;
    const playing = !audio.paused && !audio.ended;
    button.textContent = playing ? 'Ⅱ' : '♫';
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', failed ? '音乐暂时无法播放' : playing ? '暂停背景音乐 TIAMO' : '播放背景音乐 TIAMO');
    button.title = failed ? '音乐暂时无法播放' : playing ? '暂停 TIAMO' : '播放 TIAMO';
  });
  const play = () => {
    if (failed || manuallyPaused || playRequest) return;
    playRequest = audio.play();
    playRequest.catch(error => {
      // Autoplay denial is expected on some phones; a tap retries playback.
      if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') failed = true;
    }).finally(() => { playRequest = undefined; sync(); });
  };
  toggles.forEach(button => button.addEventListener('click', () => {
    if (!audio.paused || playRequest) {
      manuallyPaused = true;
      audio.pause();
    } else {
      manuallyPaused = false;
      play();
    }
    sync();
  }));
  ['play','pause','ended'].forEach(event => audio.addEventListener(event,sync));
  audio.addEventListener('error', () => { failed = true; sync(); });
  document.addEventListener('pointerdown', event => {
    if (!manuallyPaused && audio.paused && !event.target.closest('[data-music-toggle]')) play();
  }, {capture:true});
  document.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && !event.target.closest('[data-music-toggle]')) play();
  });
  sync();
  play();
})();
