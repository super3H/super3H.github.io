!function(e){function n(e,n){var i=document.createElement("script");return i.src=e,i.async=!1,i.charset="utf-8",n?s.appendChild(i):r.appendChild(i),i}function i(e,n){var i=document.createElement("link");return i.rel="stylesheet",i.type="text/css",i.href=e,n?s.appendChild(i):r.appendChild(i),i}function t(e){if(!m){for(var t,a=0,o=e.length;o>a;a++)t=e[a],c.test(t)&&n(t,!1),d.test(t)&&i(t,!1);s.appendChild(r),m=!0}}function a(e){t(window.cloudTieConfig["pc"===e?"pcFiles":"mobileFiles"])}function o(){var e=navigator.userAgent.toLowerCase(),n="ipad"==e.match(/ipad/i),i="iphone os"==e.match(/iphone os/i),t="midp"==e.match(/midp/i),a="rv:1.2.3.4"==e.match(/rv:1.2.3.4/i),o="ucweb"==e.match(/ucweb/i),c="android"==e.match(/android/i),d="windows ce"==e.match(/windows ce/i),r="windows mobile"==e.match(/windows mobile/i);return n||i||t||a||o||c||d||r}var c=/\.js(\?.*)?$/,d=/\.css(\?.*)?$/,r=document.createDocumentFragment(),m=!1,s=document.head||document.getElementsByTagName("head")[0];window.yunManualLoad||window.yunModuleEnv||a(o()?"mobile":"pc"),e.Tie=e.Tie||{},e.Tie.loader=a}(window);