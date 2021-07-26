/*-------------------------------------------

	* Transition

-------------------------------------------*/
const mask = document.querySelector('.c-transition-mask');
const loadClass = document.querySelector('html');

//実行処理
barba.init({
	transitions: [{
		async leave() {
			mask.classList.add('js-active');
			loadClass.classList.add('js-page-leave');
			loadClass.classList.remove('js-page-enter');

			await new Promise((resolve) => {
				return setTimeout(resolve, 1000);
			});
		},
		beforeEnter :function(data) {
			const scrollElem = document.scrollingElement || document.documentElement
			scrollElem.scrollTop = 0;

			loadClass.classList.remove('js-nav-open');

			//Head内のタグ書き換え
			replaceHeadTags(data.next);
		},
		afterEnter() {
			mask.classList.remove('js-active');
			
			loadClass.classList.add('js-page-enter');

			// 外部ファイルの実行(任意の場所に追加)
			var script = document.createElement('script');
			script.src = '/wp-content/themes/ShoHakamada/assets/js/main.js';
			document.body.appendChild(script);
		},
		async after() {
			setTimeout(() => {
				loadClass.classList.remove('js-page-leave');
			}, 1000);
		}
	}]
});

function replaceHeadTags(target) {
	var $newPageHead = $('<head />').html($.parseHTML(target.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0], document, true));
	var headTags = [
		"meta[name='keywords']",
		"meta[name='description']",
		"meta[property^='og']",
		"meta[property^='fb']",
		"meta[name^='twitter']",
		"meta[name='robots']",
		"meta[itemprop]",
		"link[itemprop]",
		"link[rel='prev']",
		"link[rel='next']",
		"link[rel='canonical']",
	].join(',');
	$('head').find(headTags).remove();
	$newPageHead.find(headTags).appendTo('head');
}
