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
      <a class="p-gnav__contact-link" href="mailto:s.hkmd@gmail.com" target="_blank">E-mail : s.hkmd@gmail.com</a>
    </nav>
    <!-- /Global Navigation -->
    <div class="c-cursor" id="js-cursor"></div>
    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jInvertScroll/0.8.3/js/jquery.jInvertScroll.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/object-fit-images/3.2.4/ofi.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@barba/core@2.9.6/dist/barba.umd.min.js" crossOrigin></script>
    <script type="module">
      import * as THREE from 'https://unpkg.com/three/build/three.module.js';
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      camera.position.z = 5;
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
      };

      // animate();
    </script>
    <style>
      body { margin: 0; }

canvas { 
	display: block; 
	position: fixed;
	z-index: -1;
	left: 0; 
	top: 0;
}
    </style>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/main.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/barba_custom.js"></script>
    <!-- /Scripts -->
    <?php wp_footer(); ?>
	</body>
</html>