/**
 * Author: Sho Hakamada <sho.hkmd@gmail.com>
 * Description: JavaScript for Works Detail Page
 */

/*
  エフェクトまわり
---------------------------------------------------*/
/**
 * パララックスエフェクト
 */
const parallax = () => {
  /**
   * 変数・定数
   */
  const weight1 = 0.2;
  const weight2 = 0.2;
  const works_kv = document.querySelector('#js-works-kv');
  const cover_image = document.querySelector('#js-works-cover-image');
  const flow_text = document.querySelector('#js-flow-text');

  /**
   * イベントリスナー
   */
  window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop;

    // パララックスエフェクト
    if (works_kv) works_kv.style.transform = `translateY(${0 - scrolled * weight1 * 0.3}%)`;
    if (cover_image) cover_image.style.transform = `translateY(calc(-20vh + ${scrolled * weight2 / 2}px))`;

    // デザインの画像のとこのデカめな文字
    if (flow_text) flow_text.setAttribute('style', `transform:translateX(${0 - scrolled * 0.005}%);transition: transform .3s ease-out;`);
  });
};

/**
 * マウスホバーエフェクト
 */
const nextWorksMouseHover = () => {
  // Nextのとこ
  const next_works_image = document.querySelector('#js-next-thumbnail');
  if (next_works_image) {
    next_works_image.onmousemove = function(event) {
      let mouseX, mouseY, offsetX = 0, offsetY = 0;
      let element = this;

      while (element) {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
        element = element.offsetParent;
      }

      if (event) {
        mouseX = event.clientX - offsetX * 2.25;
        mouseY = event.clientY - offsetY * 1.05;
      } else {
        mouseX = event.clientX + document.body.scrollLeft - offsetX;
        mouseY = event.clientY + document.body.scrollTop  - offsetY;
      }

      next_works_image.setAttribute('style', `transform:translate(${mouseX * 0.1}px, ${mouseY * 0.1}px);`);
    };

    next_works_image.onmouseleave = function() {
      next_works_image.removeAttribute('style');
    };
  };
};

/*
  Initialize
---------------------------------------------------*/
/**
 * 初期化
 */
export const initWorksDetail = () => {
  parallax();
  nextWorksMouseHover();
};