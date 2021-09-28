        </div>
        <!-- /Contents -->
        <!-- Footer -->
        <footer class="l-footer">

        </footer>
        <!-- /Footer -->
      </div>
    </div>
    <!-- Global Navigation -->
    <nav class="p-gnav">
      <div class="p-gnav__nav-lg-group">
        <a class="p-gnav__nav-lg-item js-split-text" href="/about/">About</a>
        <a class="p-gnav__nav-lg-item js-split-text" href="/works/">Works</a>
      </div>
      <div class="p-gnav__nav-sm-group">
        <a class="p-gnav__nav-sm-item" href="https://www.facebook.com/shohkmd/" target="_blank">Facebook</a>
        <a class="p-gnav__nav-sm-item" href="https://www.instagram.com/________ll.____/" target="_blank">Instagram</a>
        <a class="p-gnav__nav-sm-item" href="https://www.youtube.com/channel/UCqFg24S8m5NcWOEw6mm2L8g" target="_blank">YouTube</a>
      </div>
      <a class="p-gnav__contact-link" href="mailto:sho.hkmd@gmail.com" target="_blank">E-mail : sho.hkmd@gmail.com</a>
    </nav>
    <!-- /Global Navigation -->
    <div class="c-cursor" id="js-cursor"></div>
    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/object-fit-images/3.2.4/ofi.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@barba/core@2.9.6/dist/barba.umd.min.js" crossOrigin></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <!-- <script type="module" src="<?php echo get_template_directory_uri(); ?>/assets/js/shader/vertex.module.js" data-reload="true"></script> -->
    <!-- <script type="module" src="<?php echo get_template_directory_uri(); ?>/assets/js/shader/fragment.module.js" data-reload="true"></script> -->
    <script id="v-shader" type="x-shader/x-vertex" data-reload="true">
      varying vec2 vUv;
      uniform float uTime;

      float PI = 3.1415926535897932384626433832795;

      void main(){
          vUv = uv;
          vec3 pos = position;

          // 横方向
          float amp = 0.03; // 振幅（の役割） 大きくすると波が大きくなる
          float freq = 0.08 * uTime; // 振動数（の役割） 大きくすると波が細かくなる

          // 縦方向
          float tension = -0.008 * uTime; // 上下の張り具合

          pos.x = pos.x + sin(pos.y * PI  * freq) * amp;
          pos.y = pos.y + (cos(pos.x * PI) * tension);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    </script>
    <script id="f-shader" type="x-shader/x-fragment" data-reload="true">
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uImageAspect;
      uniform float uPlaneAspect;
      uniform float uTime;

      void main(){
        // 画像のアスペクトとプレーンオブジェクトのアスペクトを比較し、短い方に合わせる
        vec2 ratio = vec2(
          min(uPlaneAspect / uImageAspect, 1.0),
          min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
        );

        // 計算結果を用いてテクスチャを中央に配置
        vec2 fixedUv = vec2(
          (vUv.x - 0.5) * ratio.x + 0.5,
          (vUv.y - 0.5) * ratio.y + 0.5
        );

        // RGBシフト
        vec2 offset = vec2(0.0, uTime * 0.005);
        float r = texture2D(uTexture, fixedUv + offset).r;
        float g = texture2D(uTexture, fixedUv + offset * 0.5).g;
        float b = texture2D(uTexture, fixedUv).b;
        vec3 texture = vec3(r, g, b);

        gl_FragColor = vec4(texture, 1.0);
      }
    </script>
    <script type="module" src="<?php echo get_template_directory_uri(); ?>/assets/js/main.js" data-reload="true"></script>
    <script type="module" src="<?php echo get_template_directory_uri(); ?>/assets/js/barba_custom.js"></script>
    <!-- /Scripts -->
    <?php wp_footer(); ?>
	</body>
</html>