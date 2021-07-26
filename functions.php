<?php
/**
 * headにmetaタグを出力
 */
add_action('wp_head','create_meta');

function create_meta() {
  if( is_front_page() || is_home() || is_singular() ){
    global $post;
    $meta_title = '';
    $meta_desc = '';
    $ogp_url = '';
    $ogp_img = '';
    $insert = '';

    if ( is_front_page() || is_home() ) {
      //トップページ
      $meta_title = get_bloginfo('name');
      $meta_desc = get_bloginfo('description');
      $ogp_url = home_url();
    } elseif( is_singular() ) {
      //投稿ページ＆固定ページ
      setup_postdata($post);
      $meta_title = $post->post_title . ' | ' . get_bloginfo('name');
      $meta_desc = mb_substr(get_the_excerpt(), 0, 100);
      $ogp_url = get_permalink();
      wp_reset_postdata();
    }

    //og:type
    $ogp_type = ( is_front_page() || is_home() ) ? 'website' : 'article';

    //og:image
    if ( is_singular() && has_post_thumbnail() ) {
      $ps_thumb = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full');
      $ogp_img = $ps_thumb[0];
    } else {
      $ogp_img = get_template_directory_uri() . '/assets/img/ogimage.jpg';
    }

    //出力するOGPタグ
    $insert .= '<title>'.esc_attr($meta_title).'</title>' . "\n";
    $insert .= '<meta name="description" content="'.esc_attr($meta_desc).'" />' . "\n";
    $insert .= '<meta property="og:title" content="'.esc_attr($meta_title).'" />' . "\n";
    $insert .= '<meta property="og:description" content="'.esc_attr($meta_desc).'" />' . "\n";
    $insert .= '<meta property="og:type" content="'.$ogp_type.'" />' . "\n";
    $insert .= '<meta property="og:url" content="'.esc_url($ogp_url).'" />' . "\n";
    $insert .= '<meta property="og:image" content="'.esc_url($ogp_img).'" />' . "\n";
    $insert .= '<meta property="og:image:secure_url" content="'.esc_url($ogp_img).'" />' . "\n";
    $insert .= '<meta property="og:site_name" content="'.esc_attr(get_bloginfo('name')).'" />' . "\n";
    $insert .= '<meta name="twitter:card" content="summary_large_image" />' . "\n";
    $insert .= '<meta name="twitter:site" content="" />' . "\n";
    $insert .= '<meta name="twitter:title" content="'.esc_attr($meta_title).'" />' . "\n";
    $insert .= '<meta property="twitter:description" content="'.esc_attr($meta_desc).'" />' . "\n";
    $insert .= '<meta property="twitter:image" content="'.esc_url($ogp_img).'" />' . "\n";
    $insert .= '<meta property="og:locale" content="ja_JP" />' . "\n";

    echo $insert;
  }
}

/**
 * 外部ファイル読み込み
 */
// CSS
function load_css() {
  wp_enqueue_style('style', get_template_directory_uri() . '/style.css?t=' . date('Y-m-d H:i:s'));
}
add_action('wp_enqueue_scripts', 'load_css');

/**
 * search-〇〇.phpを使用するための記述
 */
add_filter('template_include','custom_search_template');
function custom_search_template($template){
  if ( is_search() ){
    $post_types = get_query_var('post_type');
    foreach ( (array) $post_types as $post_type )
      $templates[] = "search-{$post_type}.php";
    $templates[] = 'search.php';
    $template = get_query_template('search',$templates);
  }
  return $template;
}

/**
 * 検索結果に投稿ページのみ表示
 */
function SearchFilter($query) {
  if ($query->is_search) {
    $query->set('post_type', array('post', 'page'));
  }
  return $query;
}
add_filter('pre_get_posts','SearchFilter');

/**
 * ユーザーが検索したワードをハイライト
 */
function wps_highlight_results($text) {
  if (is_search()) {
    $sr = get_query_var('s');
    $keys = explode(" ",$sr);
    $text = preg_replace('/('.implode('|', $keys) .')/iu', '<span class="search-highlight">'.$sr.'</span>', $text);
  }
  return $text;
  }
add_filter('the_title', 'wps_highlight_results');
add_filter('the_content', 'wps_highlight_results');

/**
 * RSS
 */
add_theme_support('automatic-feed-links');

/**
 * アイキャッチ画像の設定項目を表示
 */
add_theme_support('post-thumbnails');

/**
 * エディタスタイル
 */
add_theme_support('editor-style');
add_editor_style('editor-style.css');
function custom_editor_settings( $initArray ){
  $initArray['body_class'] = 'editor-area';
  return $initArray;
}
add_filter( 'tiny_mce_before_init', 'custom_editor_settings' );

/**
 * ビジュアルエディタを非表示にする
 */
function disable_visual_editor_in_page() {
	global $typenow;
	if( $typenow == 'page' ){
		add_filter('user_can_richedit', 'disable_visual_editor_filter');
	}
}
function disable_visual_editor_filter(){
	return false;
}
add_action('load-post.php', 'disable_visual_editor_in_page');
add_action('load-post-new.php', 'disable_visual_editor_in_page');


/**
 * ページネーション
 */
add_shortcode('pagination', 'pagination_short_code');
function pagination_short_code() {
  global $wp_query;
  $big = 999999999;
  $pages = paginate_links(array(
    'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
    'format' => '?paged=%#%',
    'current' => max(1, get_query_var('paged')),
    'total' => $wp_query->max_num_pages,
    'end_size' => 1,
    'mid_size' => 3,
    'prev_text' => '',
    'next_text' => '',
    'type' => 'array'
  ));

  if (is_array($pages)) {
    echo '<ul class="c-pagination">';
    foreach ($pages as $page) {
      echo '<li class="c-pagination__item">' . "$page" . '</li>';
    }
    echo '</ul>';
  }
}

/**
 * 更新日の追加
 */
function get_mtime($format) {
  $mtime = get_the_modified_time('Ymd');
  $ptime = get_the_time('Ymd');
  if ($ptime > $mtime) {
    return get_the_time($format);
  } elseif ($ptime === $mtime) {
    return null;
  } else {
    return get_the_modified_time($format);
  }
}

/**
 * ショートコードを外す
 */
function stinger_noshotcode( $content ) {
  if ( ! preg_match( '/\[.+?\]/', $content, $matches ) ) {
    return $content;
  }
  $content = str_replace( $matches[0], '', $content );
  return $content;
}

/**
 * 自動生成のpタグを削除
 */
add_filter('the_content', 'wpautop_filter', 9);
function wpautop_filter($content) {
  global $post;
  $remove_filter = false;

  $arr_types = array('page'); //ここを変更
  $post_type = get_post_type( $post->ID );
  if (in_array($post_type, $arr_types)) $remove_filter = true;

  if ( $remove_filter ) {
    remove_filter('the_content', 'wpautop');
    remove_filter('the_excerpt', 'wpautop');
  }

  return $content;
}

/**
 * ショートコード生成
 */
function my_php_Include($params = array()) {
  extract(shortcode_atts(array('file' => 'default'), $params));
  ob_start();
  include(STYLESHEETPATH . "/$file.php");
  return ob_get_clean();
}
add_shortcode('myphp', 'my_php_Include');

/**
 * 自動生成CSSを削除
 */
add_action('wp_enqueue_scripts', function() {
  wp_deregister_style('wp-block-library');
});
?>