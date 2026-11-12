'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const goTo = (element) => element.scrollIntoView({behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start'});
const assetBase = new URL('./assets/', document.currentScript.src);
const wishes = [
  {title:'愿你，常常开心。',label:'开心',photo:1,text:'不一定要发生多大的好事。\n一顿喜欢的饭，一场好天气，\n或者只是突然想笑的某一刻。\n愿这些小小的快乐，常常来找你。'},
  {title:'愿你，自在生长。',label:'自在',photo:4,text:'新的一岁，不用着急成为谁。\n可以慢慢来，可以改主意，\n也可以把时间花在喜欢的事情上。\n按你的心意生活，就很好。'},
  {title:'愿你，安心被爱。',label:'被爱',photo:2,text:'你不必一直懂事，一直勇敢。\n累了可以靠过来，委屈也可以说。\n在我这里，你的开心和不开心，\n都值得被认真对待。'},
  {title:'愿心愿，慢慢开花。',label:'心愿',photo:3,text:'把愿望留给烛光，\n把接下来的日子，交给我们慢慢过。\n愿你有新的期待，也有出发的勇气。\n你想做的事，我愿意陪着你。'}
];
const visited = new Set();
const dialog = document.querySelector('#flower-dialog');
let lastFlower;
if (dialog) {
  document.querySelectorAll('[data-flower]').forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.flower);
      const wish = wishes[index];
      document.querySelector('#note-title').textContent = wish.title;
      document.querySelector('#note-text').textContent = wish.text;
      document.querySelector('#note-number').textContent = `FLOWER 0${index+1} / ${wish.label}`;
      const image = document.querySelector('#note-image');
      image.src = new URL(`floral-art-${wish.photo}-640.webp`, assetBase).href;
      image.alt = `${wish.label}纸笺上的${wish.photo === 4 ? '奶白花篮水彩插画' : '浅粉花束水彩插画'}`;
      lastFlower = button;
      dialog.showModal();
      document.body.classList.add('scroll-locked');
      visited.add(index);
      button.classList.add('read');
      button.setAttribute('aria-label', `重看${wish.label}的祝福（已读）`);
      button.querySelector('b').textContent = '✓';
      document.querySelectorAll('.progress-flowers span')[index].classList.add('read');
      document.querySelector('#progress').textContent = visited.size === 4 ? '四份祝福，都送到你心里了。' : `已经收下 ${visited.size} / 4 份祝福`;
    });
  });
  const closeNote = () => dialog.close();
  document.querySelector('.close-note').addEventListener('click',closeNote);
  document.querySelector('.close-note-bottom').addEventListener('click',closeNote);
  dialog.addEventListener('click',event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeNote();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('scroll-locked');
    lastFlower?.focus({preventScroll:true});
  });
}
document.querySelectorAll('a[href="#birthday"]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  const section = document.querySelector('#birthday');
  goTo(section);
  const heading = document.querySelector('#birthday-title');
  heading.setAttribute('tabindex','-1');
  heading.focus({preventScroll:true});
}));
document.querySelector('[data-restart]')?.addEventListener('click', () => {
    visited.clear();
    document.querySelectorAll('[data-flower]').forEach((button,i) => {
      button.classList.remove('read');
      button.setAttribute('aria-label',`打开${wishes[i].label}的祝福`);
      button.querySelector('b').textContent = '＋';
    });
    document.querySelectorAll('.progress-flowers span').forEach(span=>span.classList.remove('read'));
    document.querySelector('#progress').textContent = '四朵花，四份只给你的祝福';
    document.querySelector('[data-flower]').focus({preventScroll:true});
  goTo(document.querySelector('#top'));
});
