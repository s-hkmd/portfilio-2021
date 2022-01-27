/**
 * Author: Sho Hakamada <sho.hkmd@gmail.com>
 * Description: JavaScript for Front Page
 */

/*
  Loading Mask
---------------------------------------------------*/
/**
 * HTMLタグのクラスを操作
 */
const frontPageMask = () => {
  const html = document.querySelector('html');
  html.classList.add('js-home-loading');
  setTimeout(() => {
    html.classList.remove('js-home-enter');
    html.classList.remove('js-home-loading');
  }, 2000);
};

/*
  KV Section
---------------------------------------------------*/
/**
 * マウスの移動に応じて要素にtransformプロパティを適用
 */
const animateKvImage = () => {
  const kv_image = document.querySelector('#js-top-kv');
  const kv_slide = document.querySelector('#js-slide-inner');
  document.addEventListener('mousemove', event => {
    const ax = (window.innerWidth / 2 - event.pageX) / 20;
    const ay = (window.innerHeight / 2 - event.pageY) / 10;
    kv_image.setAttribute('style', `transform:translate(${ax}px, ${ay}px); transition: transform .2s ease-out;`);
    kv_slide.setAttribute('style', `transform:translate(${ax * 0.05}%, ${-ay * 0.1}%);transition: transform 1s ease-out;`);
  });
};

/*
  Initialize
---------------------------------------------------*/
/**
 * 初期化
 */
export const initFrontPage = () => {
  frontPageMask();
  animateKvImage();
};