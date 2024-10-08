//================ハンバーガーメニュー&ナビゲーション(SP)================//
$(".header__openbtn").click(function () { //ボタンがクリックされたら
    $(this).toggleClass('active'); //ボタン自身に activeクラスを付与し
    $(".header-nav-sp").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

// $(".header-nav-sp a").click(function () {//ナビゲーションのリンクがクリックされたら
//     $(".header__openbtn").removeClass('active');//ボタンの activeクラスを除去し
//     $(".header-nav-sp").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
// });

$('a[href*="#"]').on('click', function () {//ナビゲーションのリンクがクリックされたら
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
    // ローディングの処理
    var webStorage = function () {
        if (sessionStorage.getItem('access')) {
            $(".loading").addClass('is-active');
            setTimeout(function () {
                enableScrollAnimations(); // アニメーションを有効化
            }, 1000); // ローディングが非表示になった後にアニメーションを有効化
        } else {
            sessionStorage.setItem('access', 'true'); // 初回アクセス時に保存
            $(".loading-animation").addClass('is-active'); // ローディングアニメーションを表示
            setTimeout(function () {
                $(".loading").addClass('is-active');
                $(".loading-animation").removeClass('is-active');
                setTimeout(function () {
                    enableScrollAnimations(); // アニメーションを有効化
                }, 0); // ローディングが非表示になった後にアニメーションを有効化
            }, 2000); // ローディングの表示時間
        }
    }
    webStorage();
});

// アニメーションを有効化する関数
function enableScrollAnimations() {
    $(window).on('scroll', function () {
        fadeUpAnime();
        flipDownAnime();
        zoomInAnime();
    });

    // ページ読み込み時にもアニメーションを呼ぶ
    fadeUpAnime();
    flipDownAnime();
    zoomInAnime();
}

// ===================== fadeUpアニメーション =====================
function fadeUpAnime() {
    $('.fadeUpTrigger').each(function () {
        var elemPos = $(this).offset().top - 10;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();

        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('fadeUp');
        } else {
            $(this).removeClass('fadeUp');
        }
    });
}

// ===================== flipDownアニメーション =====================
function flipDownAnime() {
    $('.flipDownTrigger').each(function () {
        var elemPos = $(this).offset().top - 10;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();

        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('flipDown');
        } else {
            $(this).removeClass('flipDown');
        }
    });
}

// ===================== zoomInアニメーション =====================
function zoomInAnime() {
    $('.zoomInTrigger').each(function () {
        var elemPos = $(this).offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();

        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('zoomIn');
        } else {
            $(this).removeClass('zoomIn');
        }
    });
}




//======================モーダル（Micromodal）================//

MicroModal.init({
    openClass: 'is-open',
    disableScroll: true,
});



//======================ドロワーメニュー================//

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



//====================== スムーズスクロール機能 ======================//


// ページ内のスムーススクロール
jQuery(function () {
    jQuery('a[href*="#"]').click(function (e) {
        var target = jQuery(this.hash === "" ? "html" : this.hash);
        if (target.length) {
            e.preventDefault();

            var headerHeight = jQuery("header").outerHeight();
            var windowWidth = jQuery(window).width();
            var position;

            if (windowWidth <= 1024) {
                // 1024px以下のときはヘッダーを考慮
                position = target.offset().top - headerHeight;
            } else {
                // それ以外のときはヘッダーを考慮しない
                position = target.offset().top;
            }

            jQuery("html, body").animate({ scrollTop: position }, 500, "swing");

            if (!target.is("html")) {
                // URLにハッシュを含める
                history.pushState(null, '', this.hash);
            }
        }
    });
});

// 別ページ遷移後のスムーススクロール
var urlHash = location.hash;
if (urlHash) {
    var target = jQuery(urlHash);
    if (target.length) {
        // ページトップから開始（ブラウザ差異を考慮して併用）
        history.replaceState(null, '', window.location.pathname);
        jQuery("html,body").stop().scrollTop(0);

        jQuery(window).on("load", function () {
            var headerHeight = jQuery(".header").outerHeight();
            var windowWidth = jQuery(window).width();
            var position;

            if (windowWidth <= 1024) {
                // 1024px以下のときはヘッダーを考慮
                position = target.offset().top - headerHeight;//さらに調整するときは- 20など追記
            } else {
                // それ以外のときはヘッダーを考慮しない
                position = target.offset().top;
            }

            jQuery("html, body").animate({ scrollTop: position }, 500, "swing");

            // ハッシュを再設定
            history.replaceState(null, '', window.location.pathname + urlHash);
        });
    }
}




//======================フォームのsubmit制御================//

$(document).ready(function () {

    const $submitBtn = $('#js-submit01')
    $('#form input').on('change', function () {
        let isFormValid = true;

        // 各ラジオボタンとテキストフィールドが空でないか確認
        $('#form input[type="radio"], #form input[type="text"], #form input[type="email"], #form input[type="tel"]').each(function () {
            if ($(this).val() === "") {
                isFormValid = false;
            }
        });

        // チェックボックスがチェックされているか確認
        if (!$('#form input[type="checkbox"]').is(':checked')) {
            isFormValid = false;
        }

        // すべての条件が満たされていれば、送信ボタンを有効化
        $submitBtn.prop('disabled', !isFormValid);
    });

});



//==============フォーム　thanksページに遷移================//


$("#js-submit01").click(function (event) {
    event.preventDefault(); // フォームのデフォルト送信動作をキャンセル

    // チェックボックスが選択されているか確認
    if (!$("#confirmation").is(":checked")) {
        alert("全て入力されているか確認してください。");
        return;
    }

    // Googleフォームにデータを送信
    $.ajax({
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd3AcngBLN-yuXmdbGd0UyaqMT-cR_p8-yrs-eRguDggacFYg/formResponse",
        data: $("#form").serialize(), // フォームデータをシリアライズ
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function () {
                // 送信成功時のリダイレクト
                window.location.href = "https://corocoro-web.com/aobotan/contact/thanks"; // カスタムサンクスページのURL
            },
            200: function () {
                // 送信成功時のリダイレクト
                window.location.href = "https://corocoro-web.com/aobotan/contact/thanks"; // カスタムサンクスページのURL
            }
        }
    });
});


// $("#js-submit01").click(function (event) {
//     event.preventDefault(); // フォームのデフォルト送信動作をキャンセル

//     // チェックボックスが選択されているか確認
//     if (!$("#confirmation").is(":checked")) {
//         alert("チェックボックスを確認してください。");
//         return;
//     }

//     // Googleフォームにデータを送信
//     $.ajax({
//         url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd3AcngBLN-yuXmdbGd0UyaqMT-cR_p8-yrs-eRguDggacFYg/formResponse",
//         data: $("#form").serialize(), // フォームデータをシリアライズ
//         type: "POST",
//         success: function (response) {
//             // 送信成功時のリダイレクト
//             window.location.href = "/contact/thanks"; // カスタムサンクスページのURL
//         },
//         error: function (xhr, status, error) {
//             // 送信エラー時の処理
//             console.log("Error:", error);
//             alert("送信に失敗しました。後でもう一度お試しください。");
//         }
//     });
// });

// $(document).ready(function () {
//     $('#form').submit(function (event) {
//         event.preventDefault(); // フォームのデフォルト送信動作をキャンセル

//         var formData = $('#form').serialize(); // フォームデータをシリアライズ

//         $.ajax({
//             url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd3AcngBLN-yuXmdbGd0UyaqMT-cR_p8-yrs-eRguDggacFYg/formResponse", // 正しいURLを確認
//             data: formData,
//             type: "POST",
//             dataType: "text", // Googleフォームの応答形式に合わせて変更
//             contentType: "application/x-www-form-urlencoded", // コンテンツタイプの指定
//             success: function () {
//                 window.location.href = "/contact/thanks"; // カスタムサンクスページのURL
//             },
//             error: function (xhr, status, error) {
//                 // エラー発生時の処理
//                 console.error("エラー発生:", status, error);
//                 console.error("レスポンス:", xhr.responseText);
//             }
//         }).always(function () {
//             $(".end-message").slideDown();
//             $(".submit-btn").fadeOut();
//         });
//     });
// });







// //==============input type="radio"のタブキーで各ラジオへのフォーカス================//

// $(document).ready(function () {
//     // 全てのラジオボタンを取得
//     const radioGroups = $('input[type="radio"]');

//     radioGroups.each(function (index) {
//         $(this).on('keydown', function (event) {
//             if (event.key === "Tab" && !event.shiftKey) {
//                 // デフォルトのタブ操作を無効化
//                 event.preventDefault();

//                 // 次のラジオボタンにフォーカスを移動
//                 if (index < radioGroups.length - 1) {
//                     radioGroups.eq(index + 1).focus();
//                 } else {
//                     // 最後のラジオボタンの場合は次のフォーカス可能な要素に移動
//                     $(this).closest('form').find('input, textarea, select').eq(index + 1).focus();
//                 }
//             }

//             if (event.key === "Tab" && event.shiftKey) {
//                 // デフォルトのシフト+タブ操作を無効化
//                 event.preventDefault();

//                 // 前のラジオボタンにフォーカスを移動
//                 if (index > 0) {
//                     radioGroups.eq(index - 1).focus();
//                 } else {
//                     // 最初のラジオボタンの場合は前のフォーカス可能な要素に移動
//                     $(this).closest('form').find('input, textarea, select').eq(index - 1).focus();
//                 }
//             }
//         });
//     });
// });



// ===================== news line-height １行と２行以上の設定=====================
$(function () {
    $('.modal__btn dd').each(function () {
        var lineHeightSingle = 1.0;
        var lineHeightMulti = 1.8;
        var lineHeight = parseFloat($(this).css('line-height'));
        var fontSize = parseFloat($(this).css('font-size'));
        var lineCount = Math.round($(this).height() / lineHeight);

        if (lineCount > 1) {
            $(this).css('line-height', lineHeightMulti);
        } else {
            $(this).css('line-height', lineHeightSingle);
        }
    });
});
