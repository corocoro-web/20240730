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
        initialSlide: 3, //最初に表示させる要素の番号を指定
        variableWidth: true, //スライドの要素の幅をcssで設定できるようにする
    });

    // 逆方向にスライドさせるためのカスタム処理
    setInterval(function () {
        $('#slider').slick('slickPrev');
    }, 8000);
});

//======================ローディング================//
$(window).on('load', function () {
    // クッキーまたはローカルストレージをチェックして、初回アクセスかどうかを判定
    var isVisited = localStorage.getItem('visited');

    if (!isVisited) {
        // 初回アクセス時のみローディング画面を表示
        $("#splash_logo").delay(500).fadeOut('slow');
        $("#splash").delay(1000).fadeOut('slow', function () {
            // ローディング画面がフェードアウトした後に初回アクセスを記録
            localStorage.setItem('visited', 'true');
        });
    } else {
        // 2回目以降のアクセスではローディング画面を表示せずにすぐに非表示にする
        $("#splash").hide();
    }
});


//======================モーダル================//
$(document).ready(function () {
    // 初回のみアクセスフラグを設定
    var access = $.cookie('access');
    if (!access) {
        $.cookie('access', true);
    }

    // モーダル表示
    $(".modal-open").modaal({
        start_open: false, // 初回も自動で開かない
        overlay_close: true, // モーダル背景クリック時に閉じるか
        before_open: function () { // モーダルが開く前に行う動作
            $('html').css('overflow-y', 'hidden'); /* 縦スクロールバーを出さない */
        },
        after_close: function () { // モーダルが閉じた後に行う動作
            $('html').css('overflow-y', 'scroll'); /* 縦スクロールバーを出す */
        }
    });

    // リンククリック時にモーダルを開く
    $(".modal-open").on('click', function () {
        $("#info").modaal('open');
    });
});

//======================モーダル（Micromodal）================//

MicroModal.init({
    openClass: 'is-open',
    disableScroll: true,
});