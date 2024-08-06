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
        infinite: true // スライダーを無限ループにする
    });

    // 逆方向にスライドさせるためのカスタム処理
    setInterval(function () {
        $('#slider').slick('slickPrev');
    }, 8000);
});

//======================ローディング================//
$(window).on('load', function () {
    // ローディング画面を1.5秒（1500ms）待機してからフェードアウト
    $("#splash_logo").delay(500).fadeOut('slow');
    $("#splash").delay(1000).fadeOut('slow'); // 画像のフェードアウト後に全体をフェードアウト
});






//======================モーダル（Micromodal）================//

MicroModal.init({
    openClass: 'is-open',
    disableScroll: true,
});



//======================アコーディオン================//

$(document).ready(function () {
    $('.header-nav__accordion-ttl').each(function () {
        const $summary = $(this);
        const $details = $summary.parent();
        const $content = $summary.next('.header-nav__accordion-box');

        // 初期状態を閉じた状態にする
        $details.removeAttr('open');
        $summary.removeClass('open');

        function openAccordion() {
            $details.attr('open', 'open');
            $content.css('maxHeight', '0').animate({ maxHeight: $content.prop('scrollHeight') + 'px', opacity: '1' }, 300);
            $summary.addClass('open');
        }

        function closeAccordion() {
            $content.animate({ maxHeight: '0', opacity: '0' }, 300, function () {
                $details.removeAttr('open');
                $summary.removeClass('open');
                $content.css('maxHeight', '');
            });
        }

        $summary.hover(
            function () {
                openAccordion();
            },
            function () {
                // ホバー解除で何もしない
            }
        );

        $details.on('mouseleave', function () {
            closeAccordion();
        });

        $summary.on('click', function (e) {
            e.preventDefault();
            if ($details.attr('open')) {
                closeAccordion();
            } else {
                openAccordion();
            }
        });
    });
});
