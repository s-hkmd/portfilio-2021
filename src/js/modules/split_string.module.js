/**
 * Author: Sho Hakamada <sho.hkmd@gmail.com>
 * Description: 文字を分割して配分化したりとかとか
 */

/**
 * 文字列を分割して配分化
 * 
 * @param {HTMLElement} element - 分割したい要素
 * @param {String} after_class  - 分割後の各テキストに割り当てるCSSクラス
 * @param {String} blank_class  - 置換前の文字が空の場合に付与するクラス名
 */
export const splitString = (element, after_class, blank_class) => {
  const text = element.textContent;
  element.innerHTML = null;
  text.split('').forEach(function(c) {
    if (c === ' ') {
      element.innerHTML += `<span class="${after_class} ${blank_class}">${c}</span>`;
    } else {
      element.innerHTML += `<span class="${after_class}">${c}</span>`;
    }
  });
};