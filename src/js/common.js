/**
 * Author: Sho Hakamada <sho.hkmd@gmail.com>
 * Description: JavaScript for Common
 */

/*
  Import Modules
---------------------------------------------------*/
import barba from '@barba/core';
import { splitString } from './modules/split_string.module';

import { initFrontPage } from './front-page';
import { initAboutPage } from './about';
import { initWorksList } from './page-works-list';
import { initWorksDetail } from './page-works-detail';

/*
  諸々設定まわり
---------------------------------------------------*/
/**
 * 外部リンクに属性を付与
 */
const optimizeLinkElement = () => {
  const ex_links = document.querySelectorAll('a[target="_blank"]');
  ex_links.forEach(function(ex_link) {
    ex_link.setAttribute('rel', 'nofollow noreferrer');
  });
};

/**
 * ビューポート制御
 */
const initViewport = () => {
  const ua = navigator.userAgent;
  const head = document.querySelector('head');
  const view_port_meta = document.createElement('meta');
  view_port_meta.setAttribute('name', 'viewport');
  if ((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
    // スマホの場合
    view_port_meta.setAttribute('content', 'width=device-width, initial-scale=1');
  } else {
    // それ以外の場合
    view_port_meta.setAttribute('content', 'width=1080, initial-scale=1.0');
  }
  head.prepend(view_port_meta);
};

/**
 * ページリロード時にHTMLタグにクラスを付与
 */
window.addEventListener('load', () => {
  html.classList.remove('js-page-leave');
});

/*
  Cursor
---------------------------------------------------*/
/**
 * カスタムカーソルを適用
 */
const customCursor = () => {
  const stalker = document.getElementById('js-cursor');
  let hover_flag = false;
  
  // 追従処理
  document.addEventListener('mousemove', function(e) {
    if (!hover_flag) {
      stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    }
  });
  
  // リンクへの吸着
  const link = document.querySelectorAll('a, .l-header__nav-icon');
  for (let i = 0; i < link.length; i++) {
    link[i].addEventListener('mouseover', function (e) {
      // hover_flag = true;
      stalker.classList.add('js-cursor-active');
  
      // マウスストーカーの位置をリンクの中心に固定
      // let rect = e.target.getBoundingClientRect();
      // let posX = rect.left + (rect.width / 2);
      // let posY = rect.top + (rect.height / 2);
      // stalker.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';
    });
  
    // マウスホバー解除時
    link[i].addEventListener('mouseout', function (e) {
      hover_flag = false;
      stalker.classList.remove('js-cursor-active');
    });
  }
};

/*
  Global Navigation
---------------------------------------------------*/
/**
 * グローバルナビ展開処理
 */
const globalNavigation = () => {
  const navigation_icon = document.querySelector('#js-nav-icon');
  const html = document.querySelector('html');
  navigation_icon.addEventListener('click', () => {
    html.classList.toggle('js-nav-open');
  });
};

/*
  Initialize
---------------------------------------------------*/
/**
 * 初期化
 */
const init = () => {
  optimizeLinkElement();
  initViewport();
  customCursor();
  globalNavigation();

  const split_texts = document.querySelectorAll('.js-split-text');
  for (const text of split_texts) {
    splitString(text, 'c-split-str', 'c-split-str--blank');
  }
};

init();

/*
  Barba.js
---------------------------------------------------*/
/**
 * Variables
 */
const mask = document.querySelector('.c-transition-mask');
const html = document.documentElement;

/**
 * Rewrite Head Tag
 * 
 * @param {*} target 
 */
const replaceHeadTags = target => {
  const head = document.head;
  const new_page_raw_head = target.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0];
  const new_page_head = document.createElement('head');
  new_page_head.innerHTML = new_page_raw_head;

  const remove_head_tags = [
    'meta[name="keywords"]',
    'meta[name="description"]',
    'meta[property^="og"]',
    'meta[name^="twitter"]',
    'meta[itemprop]',
    'link[itemprop]','link[rel="prev"]',
    'link[rel="next"]',
    'link[rel="canonical"]'
  ].join(',');
  const head_tags = head.querySelectorAll(remove_head_tags);
  for (let i = 0; i < head_tags.length; i++ ) {
    head.removeChild(head_tags[i]);
  }
  const new_head_tags = new_page_head.querySelectorAll(remove_head_tags);

  for (let i = 0; i < new_head_tags.length; i++ ) {
    head.appendChild(new_head_tags[i]);
  }
}

/**
 * Run Barba.js
 */
barba.init({
  transitions: [{
    async leave() {
      // ページ遷移エフェクト
      mask.classList.add('js-active');
      html.classList.add('js-page-leave');
      html.classList.remove('js-page-enter');

      await new Promise(resolve => {
        return setTimeout(resolve, 1000);
      });
    },
    beforeEnter(data) {
      // スクロール可能なHTML要素のscrollTopを0にする
      const scroll_element = document.scrollingElement || document.documentElement;
      scroll_element.scrollTop = 0;

      // グローバルナビを収束
      html.classList.remove('js-nav-open');

      //Head内のタグ書き換え
      replaceHeadTags(data.next);
    },
    afterEnter() {
      // ページ遷移エフェクト
      mask.classList.remove('js-active');
      html.classList.add('js-page-enter');
    },
    async after() {
      // 初期化
      init();

      // HTMLタグからクラスを削除
      setTimeout(() => {
        html.classList.remove('js-page-leave');
      }, 700);
    }
  }],
  views: [
    {
      namespace: 'front-page',
      beforeEnter() {
        console.log('Front Page');
        initFrontPage();
      }
    }, {
      namespace: 'about',
      beforeEnter() {
        console.log('About Page');
        initAboutPage();
      }
    }, {
      namespace: 'works-list',
      beforeEnter() {
        console.log('Works List');
        initWorksList();
      },
      afterLeave() {
        document.body.removeAttribute('style');
      }
    },  {
      namespace: 'works-detail',
      beforeEnter() {
        console.log('Works Detail');
        initWorksDetail();
      }
    }
  ],
});