/**
 * Barba.js 処理用JavaScript
 * Author: Sho Hakamada <sho.hkmd@gmail.com>
 */

import { init } from './main.js';

/*-------------------------------------------
  * Functions
-------------------------------------------*/
/**
 * headタグ内を書き換え
 * 
 * @param {*} target 
 */
const replaceHeadTags = target => {
  const new_page_head = $('<head />').html($.parseHTML(target.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0], document, true));
  const head_tags = [
    'title',
    'meta[name="keywords"]',
    'meta[name="description"]',
    'meta[property^="og"]',
    'meta[property^="fb"]',
    'meta[name^="twitter"]',
    'meta[name="robots"]',
    'meta[itemprop]',
    'link[itemprop]',
    'link[rel="prev"]',
    'link[rel="next"]',
    'link[rel="canonical"]',
  ].join(',');
  $('head').find(head_tags).remove();
  new_page_head.find(head_tags).appendTo('head');
};


/**
 * Scriptタグを再読み込み
 */
const reloadScriptTags = () => {
  const script_tags = document.querySelectorAll('[data-reload]');
  script_tags.forEach(script => {
    script.remove()
    const new_script = document.createElement('script');
    script.src ? new_script.src = script.src : '';
    script.textContent ? new_script.textContent = script.textContent : '';
    script.type ? new_script.type = script.type : '';
    script.id ? new_script.id = script.id : '';
    new_script.setAttribute('data-reload', true);
    document.body.appendChild(new_script);
  });
};

/*-------------------------------------------
  * Run Barba.js
-------------------------------------------*/
const mask = document.querySelector('.c-transition-mask');
const load_class = document.querySelector('html');

/**
 * 実行処理
 */
barba.init({
  transitions: [{
    async leave() {
      mask.classList.add('js-active');
      load_class.classList.add('js-page-leave');
      load_class.classList.remove('js-page-enter');

      await new Promise(resolve => {
        return setTimeout(resolve, 1000);
      });
    },
    beforeEnter :function(data) {
      const scrollElem = document.scrollingElement || document.documentElement
      scrollElem.scrollTop = 0;

      load_class.classList.remove('js-nav-open');

      //Head内のタグ書き換え
      replaceHeadTags(data.next);
    },
    afterEnter() {
      mask.classList.remove('js-active');
      
      load_class.classList.add('js-page-enter');

      // 外部Scriptタグを再読み込み
      reloadScriptTags();
    },
    async after() {
      init();
      setTimeout(() => {
        load_class.classList.remove('js-page-leave');
      }, 1000);
    }
  }]
});