/**
 * Author: Sho Hakamada <sho.hkmd@gmail.com>
 * Description: JavaScript for Works List Page
 */

/*
  Import Modules
---------------------------------------------------*/
import * as THREE from 'three';

import VS_Code from './shaders/shader.vert';
import FS_Code from './shaders/shader.frag';

/*
  Run Three.js
---------------------------------------------------*/
const renderWorksItem = () => {
  const canvasEl = document.querySelector('#webgl-canvas');
  const canvasSize = {
    w: window.innerWidth,
    h: window.innerHeight,
  };

  const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, alpha: true });
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
      vertexShader: VS_Code,
      fragmentShader: FS_Code,
    });
    const mesh = new THREE.Mesh(geo, mat);

    return mesh;
  };

  // スクロール追従
  let targetScrollY = 0; // スクロール位置
  let currentScrollY = 0; // 線形補間を適用した現在のスクロール位置
  let scrollOffset = 0; // 上記2つの差分

  // 開始と終了をなめらかに補間する関数
  const lerp = (start, end, multiplier) => {
    return (1 - multiplier) * start + multiplier * end;
  };

  const updateScroll = () => {
    // スクロール位置を取得
    targetScrollY = document.documentElement.scrollTop;
    // リープ関数でスクロール位置をなめらかに追従
    currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);

    scrollOffset = targetScrollY - currentScrollY;
  };

  // 慣性スクロール
  const scrollArea = document.querySelector('.scrollable');
  document.body.style.height = `${scrollArea.getBoundingClientRect().height}px`;

  const imagePlaneArray = [];

  // 毎フレーム呼び出す
  const loop = () => {
    updateScroll();
    scrollArea.style.transform = `translate3d(0, ${-currentScrollY}px, 0)`;
    for (const plane of imagePlaneArray) {
      plane.update(scrollOffset);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  };

  // リサイズ処理
  let timeoutId = 0;
  const resize = () => {
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
    const imageArray = [...document.querySelectorAll('img')];
    for (const img of imageArray) {
      const mesh = createMesh(img);
      scene.add(mesh);

      const imagePlane = new ImagePlane(mesh, img);
      imagePlane.setParams();

      imagePlaneArray.push(imagePlane);
    }
    loop();

    // リサイズ（負荷軽減のためリサイズが完了してから発火する）
    window.addEventListener('resize', () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(resize, 200);
    });
  };

  main();
};

/*
  Flow Text
---------------------------------------------------*/
/**
 * スクロールに応じてtransformを可変
 */
const worksDetailFlowText = () => {
  window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop;
  
    // デザインの画像のとこのデカめな文字
    const flow_text = document.querySelector('#js-works-flow-text');
    if (flow_text) {
      flow_text.setAttribute('style', `transform: translateX(${0 - scrolled * 0.005}%); transition: transform .3s ease-out;`);
    }
  });
};

/**
 * 文字を変更
 */
const transformWorksTitle = () => {
  const works_items = document.querySelectorAll('[data-title]');
  const flow_text = document.querySelectorAll('.p-works-list__flow-text-item');
  const flow_text_parent = document.querySelector('#js-works-flow-text');
  const changed_class = 'is-changed';

  const changeText = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 一時的にクラスを付与
        flow_text_parent.classList.add(changed_class);
        setTimeout(() => flow_text_parent.classList.remove(changed_class), 150);

        // テキストを置換
        for (const text of flow_text) {
          setTimeout(() => text.textContent = `${entry.target.dataset.title} ${entry.target.dataset.title}`, 150);
        }
      }
    });
  };

  const options = {
    root: null,
    rootMargin: '-50% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver(changeText, options);
  works_items.forEach(item => observer.observe(item));
};

/*
  Initialize
---------------------------------------------------*/
/**
 * 初期化
 */
export const initWorksList = () => {
  // Render WebGL
  renderWorksItem();
  worksDetailFlowText();
  transformWorksTitle();
};