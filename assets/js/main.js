(() => {
/**
 *  Author: Sho Hakamada <s.hkmd@gmail.com>
 *
 * Common
 */

/*-------------------------------------------
  * Common
-------------------------------------------*/
/**
 * imgタグ読み込み最適化
 */
const images = document.querySelectorAll('img');
images.forEach(function(image) {
  image.setAttribute('loading', 'lazy');
  image.setAttribute('decoding', 'async');
});

/**
 * 外部リンク処理
 */
const ex_links = document.querySelectorAll('a[target="_blank"]');
ex_links.forEach(function(ex_link) {
  ex_link.setAttribute('rel', 'nofollow noreferrer');
});

/**
 * スムーススクロール (jQuery使用)
 */
$('a[href^="#"]').click(function() {
  const offset = $(this).data('ac-offset') || 0;
  const speed = 500;
  const href = $(this).attr('href');
  const target = $(href == '#' || href == '' ? 'html' : href);
  const position = target.offset().top - offset;
  $('body, html').animate({
    scrollTop: position
  }, speed, 'swing');
  return false;
});

/**
 * ビューポート制御
 */
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

/*-------------------------------------------
  * Cursor
-------------------------------------------*/
const stalker = document.getElementById('js-cursor');
let hovFlag = false;

// 追従処理
document.addEventListener('mousemove', function(e) {
  if (!hovFlag) {
    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
  }
});

// リンクへの吸着
const linkElem = document.querySelectorAll('a, .l-header__nav-icon');
for (let i = 0; i < linkElem.length; i++) {
  linkElem[i].addEventListener('mouseover', function (e) {
    // hovFlag = true;
    stalker.classList.add('js-cursor-active');

    // マウスストーカーの位置をリンクの中心に固定
    // let rect = e.target.getBoundingClientRect();
    // let posX = rect.left + (rect.width / 2);
    // let posY = rect.top + (rect.height / 2);
    // stalker.style.transform = 'translate(' + posX + 'px, ' + posY + 'px)';
  });

  //マウスホバー解除時
  linkElem[i].addEventListener('mouseout', function (e) {
    hovFlag = false;
    stalker.classList.remove('js-cursor-active');
  });
}

/*-------------------------------------------
  * Sprit Text
-------------------------------------------*/
/**
 * 文字列を分割して配分化
 */
const textbox = document.getElementsByClassName('js-split-text');
for(i = 0; i < textbox.length; i++) {
  const text = textbox[i].textContent;
  textbox[i].innerHTML = null;
  text.split('').forEach(function(c) {
    textbox[i].innerHTML += '<span class="c-split-str">' + c + '</span>';
  });
}

/*-------------------------------------------
  * Global Navigation
-------------------------------------------*/
// Nav展開処理
const navIcon = document.querySelector('#js-nav-icon');
const html = document.querySelector('html');
navIcon.addEventListener('click', () => {
  html.classList.toggle('js-nav-open');
});

/*-------------------------------------------
  * Front Page Mask
-------------------------------------------*/
const homeEnter = document.querySelector('html');
homeEnter.classList.add('js-home-loading');
setTimeout(() => {
  homeEnter.classList.remove('js-home-enter');
  homeEnter.classList.remove('js-home-loading');
}, 2000);

/*-------------------------------------------
  * KV
-------------------------------------------*/
const kvImage = $('#js-top-kv');
const kvSlide = $('.p-top-kv__slide-inner');
$(document).on("mousemove",function(e) {  
  var ax = ($(window).innerWidth()/2- e.pageX)/20;
  var ay = ($(window).innerHeight()/2- e.pageY)/10;
  kvImage.attr('style', 'transform:translate(' + ax + 'px,' + ay + 'px);transition: transform .2s ease-out;');
  kvSlide.attr('style', 'transform:translate(' + ax * 0.05 + '%,' + (-ay) * 0.1 + '%);transition: transform 1s ease-out;');
});

/*-------------------------------------------

  * Works List

-------------------------------------------*/
// // 横スクロール
// const windowWidth = $(window).width();
// const windowSm = 768;

// if (windowWidth >= windowSm) {
//   $.jInvertScroll(['.js-horizontal-scroll'], {
//     height: 10000,
//     onScroll: function(percent) {
//       // console.log(percent);
//     }
//   });
// }

// // 要素吸着
// const works_list_item = document.querySelectorAll('.p-works-list__works-item');
// if (works_list_item) {
//   works_list_item.forEach(works_item => {
//     works_item.onmousemove = function(e) {
//       let mouseX, mouseY, offsetX = 0, offsetY = 0;
//       let worksElm = this;
//       const itemArray = Array.from(works_list_item);
//       const index = itemArray.findIndex(item => item === worksElm);
    
//       while(worksElm) {
//         offsetX += worksElm.offsetLeft;
//         offsetY += worksElm.offsetTop;
//         worksElm = worksElm.offsetParent;
//       }
    
//       if(e) {
//         mouseX = e.pageX - offsetX * 2.25;
//         mouseY = e.pageY - offsetY - (index * 1200 + (index * (index * 0.7) * 100)) * 1.1;
//       } else {
//         mouseX = e.pageX + document.body.scrollLeft - offsetX;
//         mouseY = e.pageY + document.body.scrollTop  - offsetY;
//       }

//       console.log(e.pageY - offsetY - (index * 1200 + index * 100));
//       // console.log(e.pageY - offsetY - (index * 1200) + (index * 100));
    
//       this.setAttribute('style', 'transform:translate(' + (mouseX * 0.1) + 'px,' + (mouseY * 0.1) + 'px);');
//     };
    
//     works_item.onmouseleave = function() {
//       this.setAttribute('style', '');
//     };
//   });
// }

/*-------------------------------------------

  * Works

-------------------------------------------*/
$(window).bind('scroll', () => {
  const scrolled = $(window).scrollTop();
  const weight1 = 0.2;
  const weight2 = 0.2;
  
  // パララックスエフェクト
  $('.p-works-kv__wrap').css('transform', 'translateY(' + (0 - scrolled * weight1 * 0.3) + '%)');
  $('.p-works-cover-img__main').css('transform', 'translateY(calc(-20vh + ' + (scrolled * weight2 / 2) + 'px))');

  // デザインの画像のとこのデカめな文字
  $('.p-works-design-detail__head-inner').attr('style', 'transform:translateX(' + (0 - scrolled * 0.005) + '%);transition: transform .3s ease-out;');
});

// Nextのとこ
const next_works_image = document.querySelector('.p-works-next__thumb');
if (next_works_image) {
  next_works_image.onmousemove = function (e) {
    var mouseX, mouseY, offsetX = 0, offsetY = 0;
    var element = this;

    while (element) {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
      element = element.offsetParent;
    }

    if (e) {
      mouseX = e.pageX - offsetX * 2.25;
      mouseY = e.pageY - offsetY * 1.05;
    } else {
      mouseX = e.pageX + document.body.scrollLeft - offsetX;
      mouseY = e.pageY + document.body.scrollTop  - offsetY;
    }

    next_works_image.setAttribute('style', 'transform:translate(' + (mouseX * 0.1) + 'px,' + (mouseY * 0.1) + 'px);');
  };

  next_works_image.onmouseleave = function() {
    next_works_image.setAttribute('style', '');
  };
}


})();