<?php get_header(); ?>

<!-- Works kv -->
<section class="p-works-kv">
  <div class="p-works-kv__wrap" id="js-works-kv" style="background: url('<?php echo get_the_post_thumbnail_url(); ?>') no-repeat center center / cover;">
    <a class="p-works-kv__scroll-down" href="#detail"></a>
  </div>
</section>
<!-- /.Works kv -->
<!-- Works detail -->
<section class="p-works-detail" id="detail">
  <div class="p-works-detail__main-left">
    <h1 class="p-works-detail__works-ttl"><?php the_field('works_title'); ?></h1>
    <div class="p-works-detail__works-info">
      <span class="p-works-detail__works-cat">
        <?php
          if(in_category('web')) {
            echo 'Web Site';
          } elseif(in_category('logo')) {
            echo 'Logo';
          } elseif(in_category('graphic')) {
            echo 'Graphic Design';
          }
        ?>
      </span>
      <span class="p-works-detail__works-date"><?php the_field('works_date'); ?></span>
    </div>
    <div class="p-works-detail__works-note">
      <span class="p-works-detail__works-note-item">Scope : <?php the_field('works_scope'); ?></span>
      <span class="p-works-detail__works-note-item">Client : <?php the_field('works_client'); ?></span>
      <span class="p-works-detail__works-note-item">URL : <a href="<?php the_field('works_url'); ?>" target="_blank"><?php the_field('works_url'); ?></a></span>
    </div>
  </div>
  <div class="p-works-detail__main-right">
    <p class="p-works-detail__works-dsc"><?php the_field('works_dsc'); ?></p>
  </div>
</section>
<!-- /.Works detail -->
<!-- Cover image -->
<section class="p-works-cover-img">
  <div class="p-works-cover-img__main" id="js-works-cover-image" style="background: url('<?php the_field('works_cover_img'); ?>') no-repeat center center / cover;"></div>
</section>
<!-- /.Cover image -->
<!-- Design detail -->
<section class="p-works-design-detail">
  <div class="p-works-design-detail__head">
    <div class="p-works-design-detail__head-inner" id="js-flow-text">
      <span class="p-works-design-detail__head-text">Design detail * Design detail *</span>
      <span class="p-works-design-detail__head-text">Design detail * Design detail *</span>
    </div>
  </div>
  <div class="p-works-design-detail__main">
    <?php if(get_field('works_img_1')): ?>
      <div class="p-works-design-detail__design-img">
        <img
          src="<?php the_field('works_img_1'); ?>"
          alt="<?php the_field('works_title'); ?> - Design Image 1"
          height="<?php echo get_image_width_and_height(get_field('works_img_1'))['height']; ?>"
          width="<?php echo get_image_width_and_height(get_field('works_img_1'))['width']; ?>"
          loading="lazy"
          decoding="async"
        >
      </div>
    <?php endif; ?>
    <?php if(get_field('works_img_2')): ?>
      <div class="p-works-design-detail__design-img">
        <img
          src="<?php the_field('works_img_2'); ?>"
          alt="<?php the_field('works_title'); ?> - Design Image 2"
          height="<?php echo get_image_width_and_height(get_field('works_img_2'))['height']; ?>"
          width="<?php echo get_image_width_and_height(get_field('works_img_2'))['width']; ?>"
          loading="lazy"
          decoding="async"
        >
      </div>
    <?php endif; ?>
    <?php if(get_field('works_img_3')): ?>
      <div class="p-works-design-detail__design-img">
        <img
          src="<?php the_field('works_img_3'); ?>"
          alt="<?php the_field('works_title'); ?> - Design Image 3"
          height="<?php echo get_image_width_and_height(get_field('works_img_3'))['height']; ?>"
          width="<?php echo get_image_width_and_height(get_field('works_img_3'))['width']; ?>"
          loading="lazy"
          decoding="async"
        >
      </div>
    <?php endif; ?>
    <?php if(get_field('works_img_4')): ?>
      <div class="p-works-design-detail__design-img">
        <img
          src="<?php the_field('works_img_4'); ?>"
          alt="<?php the_field('works_title'); ?> - Design Image 4"
          height="<?php echo get_image_width_and_height(get_field('works_img_4'))['height']; ?>"
          width="<?php echo get_image_width_and_height(get_field('works_img_4'))['width']; ?>"
          loading="lazy"
          decoding="async"
        >
      </div>
    <?php endif; ?>
    <?php if(get_field('works_img_5')): ?>
      <div class="p-works-design-detail__design-img">
        <img
          src="<?php the_field('works_img_5'); ?>"
          alt="<?php the_field('works_title'); ?> - design image 5"
          height="<?php echo get_image_width_and_height(get_field('works_img_5'))['height']; ?>"
          width="<?php echo get_image_width_and_height(get_field('works_img_5'))['width']; ?>"
          loading="lazy"
          decoding="async"
        >
      </div>
    <?php endif; ?>
  </div>
</section>
<!-- /.Design detail -->
<!-- Next project -->
<section class="p-works-next">
  <?php
    $next_post = get_next_post();
    $next_post_title = $next_post->post_title;
    if(!empty($next_post)):
  ?>
    <a class="p-works-next__thumb" id="js-next-thumbnail" href="<?php echo esc_url(get_permalink($next_post->ID)); ?>">
      <img
        src="<?php echo wp_get_attachment_url(get_post_meta($next_post->ID, 'works_img_1', true)); ?>"
        alt="<?php echo $next_post_title; ?>"
        height="512"
        width="820"
        loading="lazy"
        decoding="async"
      >
    </a>
  <?php else: ?>
    <?php
      $the_query = new WP_Query( array(
        'orderby' =>  'date',
        'order' =>  'ASC',
        'posts_per_page' => '1',
      ));
      if ($the_query->have_posts()): while ($the_query->have_posts()): $the_query->the_post();
    ?>
      <a class="p-works-next__thumb" href="<?php the_permalink(); ?>">
        <img
          src="<?php the_field('works_img_1'); ?>"
          alt="<?php the_title(); ?>"
          height="512"
          width="820"
          loading="lazy"
          decoding="async"
        >
      </a>
      <?php endwhile; endif; wp_reset_postdata(); ?>
  <?php endif; ?>
  <div class="p-works-next__circle">
    <div class="p-works-next__circle-img"></div>
  </div>
  <span class="p-works-next__text">Next project</span>
</section>
<!-- /.Next project -->
<?php get_footer(); ?>