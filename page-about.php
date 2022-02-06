<?php get_header(); ?>

<div class="p-about-kv">
  <div class="p-about-kv__wrap">
    <div class="p-about-kv__line -line1 js-about-kv-str">Anything one</div>
    <div class="p-about-kv__line -line2 js-about-kv-str">man can imagine,</div>
    <div class="p-about-kv__line -line3 js-about-kv-str">other men can</div>
    <div class="p-about-kv__line -line4 js-about-kv-str">make real.</div>
    <div class="p-about-kv__line -line5">Jules Verne</div>
  </div>
</div>

<div class="p-about-message" id="js-message-section">
  <div class="p-about-message__main-left">
    <div class="p-about-message__heading">
      <div class="p-about-message__heading-line1 js-message-heading-line">人が想像できることは、</div>
      <div class="p-about-message__heading-line2 js-message-heading-line">人が必ず実現できる。</div>
    </div>
    <div class="p-about-message__message">
      <p class="p-about-message__message-line">これは『月世界旅行』や『海底二万マイル』などの有名な小説を生み出したフランスのSF小説家、ジュール・ヴェルヌが残した名言です。</p>
      <p class="p-about-message__message-line">
        「掌に収まる大きさのパソコンが欲しい」<br>
        「距離の離れた人ともコミュニケーションを取りたい」<br>
        過去の人々が想像した世界は今の当たり前になっています。
      </p>
      <p class="p-about-message__message-line">どのような時代でも私たち人間は便利でより良い世界を求めて、想像と創造を繰り返します。</p>
      <p class="p-about-message__message-line">今、私たちが生活しているこの世界は、過去の人々が想像していた世界なのだと思います。</p>
      <p class="p-about-message__message-line">今を想像していた過去の人々と同じように、私も未来を想像し、より良い世界を創っていきたい。</p>
    </div>
  </div>
  <div class="p-about-message__main-right">
    <div class="p-about-message__image-wrap">
      <img
        id="js-message-image"
        src="<?php echo get_template_directory_uri(); ?>/src/img/img_about_message.jpg"
        alt="What do you imagine?"
        height="874"
        width="517"
        loading="lazy"
        decoding="async"
      >
    </div>
  </div>
</div>

<div class="p-about-flow-message">
  <div class="p-about-flow-message__item" id="js-flow-message-1">
    <span class="p-about-flow-message__text">What do you imagine? *</span>
    <span class="p-about-flow-message__text">What do you imagine? *</span>
  </div>
  <div class="p-about-flow-message__item" id="js-flow-message-2">
    <span class="p-about-flow-message__text">What do you imagine? *</span>
    <span class="p-about-flow-message__text">What do you imagine? *</span>
  </div>
</div>

<div class="p-about-bio">
  <div class="p-about-bio__head">
    <div class="p-about-bio__name">
      <img
        id="js-message-image"
        src="<?php echo get_template_directory_uri(); ?>/src/img/img_about_bio_name.svg"
        alt="S.Hakamada"
        height="157"
        width="1094"
        loading="lazy"
        decoding="async"
      ></div>
    <span class="p-about-bio__title">Web/UI Designer</span>
  </div>
  <div class="p-about-bio__detail">
    <span class="p-about-bio__overview">
      袴田 翔 (ハカマダ ショウ)<br>
      フリーランスWeb/UIデザイナー<br>
      千葉工業大学工学部デザイン科学科卒業<br>
    </span>
    <p class="p-about-bio__profile">1995年、東京都に爆誕。大学では主に単位の効率的な取り方を学ぶ。得意種目は「平手打ち」である。座右の銘は「万物の根源とは、万物の根源である」である。女優・グラビアタレントの馬場ふみかの大ファンであり、当人のコミュニティ型ファンクラブに所属。会員ナンバーは"474"。休日は主にDTMを嗜む。平和主義者。</p>
  </div>
  <div class="p-about-bio__image">
    <img
      src="<?php echo get_template_directory_uri(); ?>/src/img/img_about_bio.jpg"
      id="js-bio-image"
      alt="Hi! I'm Sho Hakamada :)"
      height="574"
      width="420"
      loading="lazy"
      decoding="async"
    >
  </div>
</div>

<div class="p-about-works">
  <?php
    $the_query = new WP_Query( array(
      'orderby' =>  'date',
      'order' =>  'ASC',
      'posts_per_page' => '1',
    ));
    if ($the_query->have_posts()): while ($the_query->have_posts()): $the_query->the_post();
  ?>
    <a class="p-about-works__thumb" id="js-works-thumbnail" href="<?php the_permalink(); ?>">
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
  <div class="p-about-works__circle">
    <div class="p-about-works__circle-img"></div>
  </div>
  <span class="p-about-works__text">View Works</span>
</div>

<?php get_footer(); ?>