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
    // ローディング画面を1.5秒（1500ms）待機してからフェードアウト
    $("#splash_logo").delay(500).fadeOut('slow');
    $("#splash").delay(1000).fadeOut('slow'); // 画像のフェードアウト後に全体をフェードアウト
});


//======================モーダル================//
$(function () {
    $('#openModal').on('click', function () {
        $('#modalArea').toggleClass('is-show');
    });
    $('#closeModal').on('click', function () {
        $('#modalArea').toggleClass('is-show');
    });
    $('#modalBg').on('click', function () {
        $('#modalArea').toggleClass('is-show');
    });
});