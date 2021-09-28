/**
 * メイン処理用JavaScript
 * Author: Sho Hakamada <sho.hkmd@gmail.com>
 */

/*-------------------------------------------
  * Common
-------------------------------------------*/
/**
 * imgタグ読み込み最適化
 */
const optimizeImageDisplay = () => {
  const images = document.querySelectorAll('img');
  images.forEach(function(image) {
    image.setAttribute('loading', 'lazy');
    image.setAttribute('decoding', 'async');
  });
};

/**
 * 外部リンク処理
 */
const optimizeLinkElement = () => {
  const ex_links = document.querySelectorAll('a[target="_blank"]');
  ex_links.forEach(function(ex_link) {
    ex_link.setAttribute('rel', 'nofollow noreferrer');
  });
}

/**
 * スムーススクロール (jQuery使用)
 */
const smoothScroll = () => {
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
};

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

/*-------------------------------------------
  * Split String
-------------------------------------------*/
/**
 * 文字列を分割して配分化
 */
const splitString = () => {
  const textbox = document.getElementsByClassName('js-split-text');
  for(let i = 0; i < textbox.length; i++) {
    const text = textbox[i].textContent;
    textbox[i].innerHTML = null;
    text.split('').forEach(function(c) {
      textbox[i].innerHTML += '<span class="c-split-str">' + c + '</span>';
    });
  }
}

/*-------------------------------------------
  * Global Navigation
-------------------------------------------*/
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

/*-------------------------------------------
  * Front Page Mask
-------------------------------------------*/
const frontPageMask = () => {
  const html = document.querySelector('html');
  html.classList.add('js-home-loading');
  setTimeout(() => {
    html.classList.remove('js-home-enter');
    html.classList.remove('js-home-loading');
  }, 2000);
};

/*-------------------------------------------
  * KV
-------------------------------------------*/
const animateKvImage = () => {
  const kv_image = $('#js-top-kv');
  const kv_slide = $('.p-top-kv__slide-inner');
  document.addEventListener('mousemove', event => {
    var ax = (window.innerWidth / 2 - event.pageX) / 20;
    var ay = (window.innerHeight / 2 - event.pageY) / 10;
    kv_image.attr('style', 'transform:translate(' + ax + 'px,' + ay + 'px);transition: transform .2s ease-out;');
    kv_slide.attr('style', 'transform:translate(' + ax * 0.05 + '%,' + (-ay) * 0.1 + '%);transition: transform 1s ease-out;');
  });
};

/*-------------------------------------------
  * Works List
-------------------------------------------*/

const foo = canvas_element => {
  const canvasSize = {
    w: window.innerWidth,
    h: window.innerHeight,
  };

  const renderer = new THREE.WebGLRenderer({ canvas: canvas_element });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasSize.w, canvasSize.h);

  // ウィンドウとwebGLの座標を一致させるため、描画がウィンドウぴったりになるようカメラを調整
  const fov = 60; // 視野角
  const fovRad = (fov / 2) * (Math.PI / 180);
  const dist = canvasSize.h / 2 / Math.tan(fovRad);
  const camera = new THREE.PerspectiveCamera(
    fov,
    canvasSize.w / canvasSize.h,
    0.1,
    1000
  );
  camera.position.z = dist;

  const scene = new THREE.Scene();

  const loader = new THREE.TextureLoader();

  // 画像をテクスチャにしたplaneを扱うクラス
  class ImagePlane {
    constructor(mesh, img) {
      this.refImage = img;
      this.mesh = mesh;
    }

    setParams() {
      // 参照するimg要素から大きさ、位置を取得してセット
      const rect = this.refImage.getBoundingClientRect();

      this.mesh.scale.x = rect.width;
      this.mesh.scale.y = rect.height;

      const x = rect.left - canvasSize.w / 2 + rect.width / 2;
      const y = -rect.top + canvasSize.h / 2 - rect.height / 2;
      this.mesh.position.set(x, y, this.mesh.position.z);
    }

    update(offset) {
      this.setParams();

      this.mesh.material.uniforms.uTime.value = offset;
    }
  }

  // Planeメッシュを作る関数
  const createMesh = (img) => {
    const texture = loader.load(img.src);

    const uniforms = {
      uTexture: { value: texture },
      uImageAspect: { value: img.naturalWidth / img.naturalHeight },
      uPlaneAspect: { value: img.clientWidth / img.clientHeight },
      uTime: { value: 0 },
    };
    const geo = new THREE.PlaneBufferGeometry(1, 1, 100, 100); // 後から画像のサイズにscaleするので1にしておく
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: document.getElementById('v-shader').textContent,
      fragmentShader: document.getElementById('f-shader').textContent,
    });

    const mesh = new THREE.Mesh(geo, mat);

    return mesh;
  };

  // スクロール追従
  let prevScrollY = 0; // 前フレームのスクロール位置
  let currentScrollValue = 0; // 現在のスクロール量

  // 開始と終了をなめらかに補間する関数
  const lerp = (start, end, multiplier) => {
    return (1 - multiplier) * start + multiplier * end;
  };

  const updateScroll = () => {
    // 現在のスクロール位置を取得
    const scrollTop = document.documentElement.scrollTop;
    // リープ関数で前フレームとの線形補完を計算
    currentScrollValue = lerp(currentScrollValue, scrollTop - prevScrollY, 0.1);

    // 値を保持
    prevScrollY = scrollTop;
  };

  const imagePlaneArray = [];

  // 毎フレーム呼び出す
  const loop = () => {
    updateScroll();
    for (const plane of imagePlaneArray) {
      plane.update(currentScrollValue);
    }
    renderer.render(scene, camera);

    requestAnimationFrame(loop);
  };

  // リサイズ処理
  let timeoutId = 0;

  const resize = () => {
    console.log('re');
    // three.jsのリサイズ
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvasSize.w = width;
    canvasSize.h = height;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // カメラの距離を計算し直す
    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = canvasSize.h / 2 / Math.tan(fovRad);
    camera.position.z = dist;
  };

  const main = () => {
    window.addEventListener('load', () => {
      const imageArray = [...document.querySelectorAll('img')];
      for (const img of imageArray) {
        const mesh = createMesh(img);
        scene.add(mesh);

        const imagePlane = new ImagePlane(mesh, img);
        imagePlane.setParams();

        imagePlaneArray.push(imagePlane);
      }
      loop();
    });

    // リサイズ（負荷軽減のためリサイズが完了してから発火する）
    window.addEventListener('resize', () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(resize, 200);
    });
  };

  main();
}

const canvas_element = document.querySelector('#webgl-canvas');
if (canvas_element) {
  foo(canvas_element)
}

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

/**
 * 初期化
 */
export const init = () => {
  console.log('initialized!');
  optimizeImageDisplay();
  optimizeLinkElement();
  smoothScroll();
  customCursor();
  splitString();
  globalNavigation();
  frontPageMask();
  animateKvImage();
};

init();