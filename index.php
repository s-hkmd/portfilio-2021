<?php get_header(); ?>
<section class="p-works-list">
  <div class="p-works-list__works-list">
    <div class="p-works-list__works-list-wrap scrollable">
      <div class="p-works-list__works-list-inner">
        <?php if(have_posts()): while(have_posts()): the_post(); ?>
          <a class="p-works-list__works-item" href="<?php the_permalink(); ?>" data-title="<?php echo the_title(); ?>">
            <div class="p-works-list__works-item-image">
              <?php if (has_post_thumbnail()): ?>
                <?php
                  the_post_thumbnail('large', array(
                    'alt' => get_the_title(),
                    'decoding' => 'async',
                  ));
                ?>
              <?php else: ?>
                <img
                  class=""
                  src="<?php echo get_template_directory_uri(); ?>/src/img/img_works_blank.jpg"
                  alt="<?php the_title(); ?>"
                  height="220"
                  width="344"
                  loading="lazy"
                  decoding="async"
                >
              <?php endif; ?>
            </div>
            <span class="p-works-list__works-item-title"><?php echo the_title(); ?></span>
          </a>
        <?php endwhile; endif; ?>
      </div>
      <a class="p-works-list__more-works" href="https://dribbble.com/sho_hakamada" target="_blank">View More 🕺</a>
    </div>
  </div>
  <div class="p-works-list__webgl-canvas">
    <canvas class="p-works-list__webgl-canvas-body" id="webgl-canvas"></canvas>
  </div>
  <div class="p-works-list__flow-text">
    <div class="p-works-list__flow-text-inner" id="js-works-flow-text">
      <span class="p-works-list__flow-text-item">Works Works</span>
      <span class="p-works-list__flow-text-item">Works Works</span>
    </div>
  </div>
</section>

<?php get_footer(); ?>