        </div>
        <!-- /Contents -->
        <!-- Footer -->
        <footer class="l-footer"></footer>
        <!-- /Footer -->
        <!-- Global Navigation -->
        <nav class="p-gnav">
          <div class="p-gnav__nav-lg-group">
            <a class="p-gnav__nav-lg-item js-split-text <?php if(is_page('about')): ?>p-gnav__nav-lg-item--current<?php endif;?>" href="/about/">About</a>
            <a class="p-gnav__nav-lg-item js-split-text <?php if(is_home()): ?>p-gnav__nav-lg-item--current<?php endif;?>" href="/works/">Works</a>
          </div>
          <div class="p-gnav__nav-sm-group">
            <a class="p-gnav__nav-sm-item" href="https://www.facebook.com/shohkmd/" target="_blank">Facebook</a>
            <a class="p-gnav__nav-sm-item" href="https://www.instagram.com/________ll.____/" target="_blank">Instagram</a>
            <a class="p-gnav__nav-sm-item" href="https://www.youtube.com/channel/UCqFg24S8m5NcWOEw6mm2L8g" target="_blank">YouTube</a>
          </div>
          <a class="p-gnav__contact-link" href="mailto:sho.hkmd@gmail.com" target="_blank">E-mail : sho.hkmd@gmail.com</a>
        </nav>
        <!-- /Global Navigation -->
      </div>
    </div>

    <div class="c-cursor" id="js-cursor"></div>

    <!-- Scripts -->
    <script src="<?php echo get_template_directory_uri(); ?>/dist/js/common.js"></script>
    <!-- /Scripts -->

    <?php wp_footer(); ?>
  </body>
</html>