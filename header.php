<!DOCTYPE html>
<html lang="ja" class="js-home-enter js-page-leave">
	<head>
		<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.svg" type="image/svg+xml">
    <!-- Web Font -->
    <script>
    (function(d) {
      var config = {
        kitId: 'jcw0gsc',
        scriptTimeout: 3000,
        async: true
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);
  </script>
  <?php wp_head(); ?>
	</head>
  <body>
    <div class="c-transition-mask"></div>
    <div data-barba="wrapper">
      <?php
        if (is_front_page()) {
          $namespace = 'front-page';
        } elseif (is_home()) {
          $namespace = 'works-list';
        } elseif (is_single()) {
          $namespace = 'works-detail';
        }
      ?>
      <div
        id="<?php echo esc_attr($post->post_name); ?>"
        data-barba="container"
        data-barba-namespace="<?php echo $namespace; ?>"
        <?php body_class(); ?>
      >
        <!-- Header -->
        <header class="l-header">
          <a class="l-header__logo" href="/">S.Hakamada</a>
          <div class="l-header__nav-icon" id="js-nav-icon"></div>
        </header>
        <!-- /Header -->
        <!-- Contents -->
        <div class="l-contents">