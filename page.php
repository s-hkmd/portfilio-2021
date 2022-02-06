<?php 
  $page = get_page(get_the_ID()); //スラッグ名を取得
  $slug = $page->post_name; //固定ページからスラッグを取得し、変数$slugに代入
  $parent_id = $post->post_parent; // 親ページのIDを取得
  $parent_slug = get_post($parent_id)->post_name; // 親ページのスラッグを取得
?>
<?php get_header(); ?>
<?php the_content(); ?>
<?php get_footer(); ?>