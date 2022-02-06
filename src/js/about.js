/**
 * Author: Sho Hakamada <sho.hkmd@gmail.com>
 * Description: JavaScript for About Page
 */

/*
  Import Modules
---------------------------------------------------*/
import { splitString } from './modules/split_string.module';
import simpleParallax from 'simple-parallax-js';
import { DoubleSide } from 'three';

/*
  KV Section
---------------------------------------------------*/
/**
 * 文字を分割
 */
const splitKvStr = () => {
  const split_texts = document.querySelectorAll('.js-about-kv-str');
  for (const text of split_texts) {
    splitString(text, 'p-about-kv__split-str', 'p-about-kv__split-str--blank');
  }
};

/*
  Message Section
---------------------------------------------------*/
/**
 * リード文を分割
 */
const messageLeadEffect = () => {
  /**
   * 変数・定数
   */
  const message_section = document.querySelector('#js-message-section');
  const message_lead = document.querySelectorAll('.js-message-heading-line');

  /**
   * 文字を分割
   */
  for (const lead of message_lead) {
    splitString(lead, 'p-about-message__split-str', 'p-about-message__split-str--blank');
  }

  /**
   * クラス付与関数
   * 
   * @param {Object} entries
   */
  const addVisibleClass = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        message_section.classList.add('is-visible');
      } else {
        message_section.classList.remove('is-visible');
      }
    });
  };

  /**
   * Intersection Observerでスクロールを監視
   */
  const options = {
    root: null,
    rootMargin: '-40% 0px',
    threshold: 0,
  };
  const observer = new IntersectionObserver(addVisibleClass, options);
  observer.observe(message_section);
};

/**
 * Parallax
 */
const parallaxImage = () => {
  const message_image = document.querySelector('#js-message-image');
  const option = {
    scale: 1.15,
    transition: 'cubic-bezier(0, .3, .5, 1)',
  };
  new simpleParallax(message_image, option);
};

/*
  Flow Message Section
---------------------------------------------------*/
/**
 * スクロールに応じてtransform
 */
const aboutFlowMessage = () => {
  /**
   * 変数・定数
   */
  const scrolled = document.documentElement.scrollTop;
  const flow_message_01 = document.querySelector('#js-flow-message-1');
  const flow_message_02 = document.querySelector('#js-flow-message-2');

  /**
   * イベントリスナー
   */
  window.addEventListener('scroll', () => {
    if (flow_message_01) flow_message_01.setAttribute('style', `transform:translateX(${0 - scrolled * 0.005}%);transition: transform .3s ease-out;`);
  });
};

/*
  Works Section
---------------------------------------------------*/
/**
 * マウスホバーエフェクト
 */
const worksMouseHover = () => {
  // Nextのとこ
  const works_image = document.querySelector('#js-works-thumbnail');
  if (works_image) {
    works_image.onmousemove = function(event) {
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

      works_image.setAttribute('style', `transform:translate(${mouseX * 0.1}px, ${mouseY * 0.1}px);`);
    };

    works_image.onmouseleave = function() {
      works_image.removeAttribute('style');
    };
  };
};

/*
  Initialize
---------------------------------------------------*/
/**
 * 初期化
 */
export const initAboutPage = () => {
  splitKvStr();
  messageLeadEffect();
  parallaxImage();
  aboutFlowMessage();
  worksMouseHover();
};