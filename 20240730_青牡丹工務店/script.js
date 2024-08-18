//================ハンバーガーメニュー&ナビゲーション(SP)================//
$(".header__openbtn").click(function () { //ボタンがクリックされたら
    $(this).toggleClass('active'); //ボタン自身に activeクラスを付与し
    $(".header-nav-sp").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$(".header-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".header__openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $(".header-nav-sp").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
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

// $(function () {
//     // ホバーイベントを設定
//     $('.header-nav__accordion-ttl').hover(
//         function () {
//             // ホバーされたときの処理
//             const $details = $(this).closest('details');
//             const $content = $details.find('.header-nav__accordion-box');

//             $details.attr('open', 'open'); // details要素を開く
//             $content.stop(true, true).slideDown(300); // コンテンツをスライドダウンして表示
//         },
//         function () {
//             // ホバーが外れたときの処理
//             const $details = $(this).closest('details');
//             const $content = $details.find('.header-nav__accordion-box');

//             setTimeout(function () {
//                 // 他のホバー対象がない場合に閉じる
//                 if (!$details.is(':hover') && !$content.is(':hover')) {
//                     $content.stop(true, true).slideUp(300, function () {
//                         $details.removeAttr('open'); // details要素を閉じる
//                     });
//                 }
//             }, 100); // 少し遅延を加えることでホバー切り替えをスムーズに
//         }
//     );
// });

// $(function () {
//     // マウスオーバーした時の動作
//     $(".header-nav__accordion-ttl").hover(
//         function () {
//             // 下にスライドして表示
//             $(".header-nav__accordion-box:not(:animated)", this).slideDown();
//             // アイコンを '-' に変更
//             $(this).find(".header-nav__accordion-icon").text("-");
//         },
//         function () {
//             // 上にスライドして非表示になる
//             $(".header-nav__accordion-box", this).slideUp();
//             // アイコンを '+' に戻す
//             $(this).find(".header-nav__accordion-icon").text("+");
//         }
//     );
// });

$(function () {
    // マウスオーバーした時の動作
    $(".header-nav__accordion-ttl").hover(
        function () {
            // クラスを切り替える
            $(this).addClass('active');
            // 下にスライドして表示
            $(".header-nav__accordion-box:not(:animated)", this).slideDown();
        },
        function () {
            // クラスを切り替える
            $(this).removeClass('active');
            // 上にスライドして非表示になる
            $(".header-nav__accordion-box", this).slideUp();
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



//==============別ページから飛んできたときに該当箇所にスムーズスクロール================//

$(function () {
    var hash = location.hash;
    if (hash) {
        var target = $('[data-id="' + hash + '"]');//offset()を使うためjQueryオブジェクト化
        if (!target.length) return;/* targetがなかったときはそれ以降の処理をしない */
        // 移動先を数値で取得
        $(window).on('load', function () {
            history.replaceState('', '', './');/* 再読み込みしたときにスムーススクロールしないようにhashを取り除く */

            //loadの中に書くことで、画像を読み込んだ後に実行されるようになる
            //loadの中に書かないと画像が読み込まれる前にoffset().topしてしまうため、正しい位置にならない
            var position = target.offset().top;
            //headerの高さ
            //var headerHeight = $('#header').innerHeight();


            //position = position - headerHeight;

            // スムーススクロール
            $('body,html').animate({ scrollTop: position }, 300, 'swing');

        });
    }
});


//==============フォーム　お問い合せ完了メッセージ================//

// $(document).ready(function () {

//     $('#form').submit(function (event) {
//       var formData = $('#form').serialize();
//       $.ajax({
//         url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd3AcngBLN-yuXmdbGd0UyaqMT-cR_p8-yrs-eRguDggacFYg/formResponse",
//         data: formData,
//         type: "POST",
//         dataType: "xml",
//         statusCode: {
//           0: function () {
//             $(".end-message").slideDown();
//             $(".submit-btn").fadeOut();
//             //window.location.href = "thanks.html";
//           },
//           200: function () {
//             $(".false-message").slideDown();
//           }
//         }
//       });
//       event.preventDefault();
//     });

//   });


//==============フォーム　サンクスページへの遷移================//

