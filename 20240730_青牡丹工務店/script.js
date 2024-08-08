//================ハンバーガーメニュー&ナビゲーション(SP)================//
$(".header__openbtn").click(function () { //ボタンがクリックされたら
    $(this).toggleClass('active'); //ボタン自身に activeクラスを付与し
    $(".header-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$(".header-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".header__openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $(".header-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});



//======================スライダー================//

$(function () {
    $('#slider').slick({
        autoplay: true, //自動でスライドさせる
        autoplaySpeed: 0, //次の画像に切り替えるまでの時間 今回の場合は0
        speed: 8000, //画像が切り替わるまでの時間 今回の場合は何秒で1枚分動くか
        cssEase: 'linear', //動きの種類は等速に
        arrows: false, //左右に出る矢印を非表示
        swipe: false, //スワイプ禁止
        pauseOnFocus: false, //フォーカスが合っても止めない
        pauseOnHover: false, //hoverしても止めない
        centerMode: true, //一枚目を中心に表示させる
        initialSlide: 0, //最初に表示させる要素の番号を指定
        variableWidth: true, //スライドの要素の幅をcssで設定できるようにする
        infinite: true, // スライダーを無限ループにする
        rtl: true, //スライダーを左から右に流す（逆向き）
    });
});

//======================ローディング================//

$(function () {
    var webStorage = function () {
        if (sessionStorage.getItem('access')) {
            /*
              2回目以降アクセス時の処理
            */
            $(".loading").addClass('is-active');
        } else {
            /*
              初回アクセス時の処理
            */
            sessionStorage.setItem('access', 'true'); // sessionStorageにデータを保存
            $(".loading-animation").addClass('is-active'); // loadingアニメーションを表示
            setTimeout(function () {
                // ローディングを数秒後に非表示にする
                $(".loading").addClass('is-active');
                $(".loading-animation").removeClass('is-active');
            }, 3000); // ローディングを表示する時間
        }
    }
    webStorage();
});



//======================モーダル（Micromodal）================//

MicroModal.init({
    openClass: 'is-open',
    disableScroll: true,
});



//======================アコーディオン================//

// $(document).ready(function () {
//     $('.header-nav__accordion-ttl').each(function () {
//         const $summary = $(this);
//         const $details = $summary.parent();
//         const $content = $summary.next('.header-nav__accordion-box');

//         // 初期状態を閉じた状態にする
//         $details.removeAttr('open');
//         $summary.removeClass('open');

//         function openAccordion() {
//             $details.attr('open', 'open');
//             $content.css('maxHeight', '0').animate({ maxHeight: $content.prop('scrollHeight') + 'px', opacity: '1' }, 300);
//             $summary.addClass('open');
//         }

//         function closeAccordion() {
//             $content.animate({ maxHeight: '0', opacity: '0' }, 300, function () {
//                 $details.removeAttr('open');
//                 $summary.removeClass('open');
//                 $content.css('maxHeight', '');
//             });
//         }

//         $summary.hover(
//             function () {
//                 openAccordion();
//             },
//             function () {
//                 // ホバー解除で何もしない
//             }
//         );

//         $details.on('mouseleave', function () {
//             closeAccordion();
//         });

//         $summary.on('click', function (e) {
//             e.preventDefault();
//             if ($details.attr('open')) {
//                 closeAccordion();
//             } else {
//                 openAccordion();
//             }
//         });
//     });
// });

$(function () {
    // ホバーイベントを設定
    $('.header-nav__accordion-ttl').hover(
        function () {
            // ホバーされたときの処理
            const $details = $(this).closest('details');
            const $content = $details.find('.header-nav__accordion-box');

            $details.attr('open', 'open'); // details要素を開く
            $content.stop(true, true).slideDown(300); // コンテンツをスライドダウンして表示
        },
        function () {
            // ホバーが外れたときの処理
            const $details = $(this).closest('details');
            const $content = $details.find('.header-nav__accordion-box');

            setTimeout(function () {
                // 他のホバー対象がない場合に閉じる
                if (!$details.is(':hover') && !$content.is(':hover')) {
                    $content.stop(true, true).slideUp(300, function () {
                        $details.removeAttr('open'); // details要素を閉じる
                    });
                }
            }, 100); // 少し遅延を加えることでホバー切り替えをスムーズに
        }
    );
});



//======================スムーススクロール================//


$('a[href*="#"]').click(function () {//全てのページ内リンクに適用させたい場合はa[href*="#"]のみでもOK
    var elmHash = $(this).attr('href'); // クリックされたリンク先のhref属性からIDを取得
    var pos;

    // レスポンシブ対応のため、ウィンドウの幅に応じてスクロール位置を調整
    if ($(window).width() <= 768) {
        // 768px以下の場合、idの上部の距離からHeaderの高さ（64px）を引いた位置にスクロール
        pos = $(elmHash).offset().top - 64;
    } else {
        // 768pxより大きい場合、idの上部の距離からHeaderの高さ（96px）を引いた位置にスクロール
        pos = $(elmHash).offset().top - 96;
    }

    // アニメーションでスクロールを実行
    $('body,html').animate({ scrollTop: pos }, 700);//取得した位置にスクロール。500の数値が大きくなるほどゆっくりスクロール

    return false; // リンクのデフォルト動作を無効化してページ遷移を防止
});