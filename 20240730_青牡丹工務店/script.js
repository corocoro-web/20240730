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



//====================== スムーズスクロール機能 ======================//

$('a[href*="#"]').click(function (event) {
    event.preventDefault(); // リンクのデフォルト動作を無効にする

    // クリックされたリンクのhref属性からハッシュ部分のみを取得
    var href = $(this).attr('href');
    var hash = href.split('#')[1]; // `#`以降の部分を取得
    var elmHash = '#' + hash; // `#`を追加してセレクタとして使える形にする

    // 現在のページのパスとリンクのパスが一致するかを確認
    if (href.startsWith(location.pathname) || href.startsWith("#")) {
        var pos;

        // 対象の要素が存在する場合にのみ処理を行う
        if ($(elmHash).length) {
            // レスポンシブ対応のため、ウィンドウの幅に応じてスクロール位置を調整
            if ($(window).width() <= 768) {
                pos = $(elmHash).offset().top - 102;
            } else {
                pos = $(elmHash).offset().top - 102;
            }

            // アニメーションでスクロールを実行
            $('body,html').animate({ scrollTop: pos }, 700);
        }
    } else {
        // 別のページへのリンクの場合、通常のリンク動作を実行
        window.location.href = href;
    }
});

//============== 別ページから飛んできた時のスムーズスクロール処理 ==============//

$(function () {
    var hash = location.hash; // URLのハッシュ（#以降の部分）を取得
    if (hash) {
        var target = $(hash); // ハッシュを使用して対象要素を取得
        if (target.length) {
            $(window).on('load', function () {
                history.replaceState('', '', './'); // ハッシュを取り除いて再読み込み時にスムーズスクロールを防ぐ

                var position = target.offset().top - $('#header').innerHeight();

                // アニメーションでスクロールを実行（600msで目的の位置に移動）
                $('body,html').animate({ scrollTop: position }, 300, 'swing');
            });
        }
    }
});

//==============フォーム　thanksページに遷移================//

// $(document).ready(function () {

//     $('#form').submit(function (event) {
//         var formData = $('#form').serialize();
//         $.ajax({
//             url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd3AcngBLN-yuXmdbGd0UyaqMT-cR_p8-yrs-eRguDggacFYg/formResponse",
//             data: formData,
//             type: "POST",
//             dataType: "xml",
//             statusCode: {
//                 0: function () {
//                     $(".end-message").slideDown();
//                     $(".submit-btn").fadeOut();
//                     //window.location.href = "thanks.html";
//                 },
//                 200: function () {
//                     $(".false-message").slideDown();
//                 }
//             }
//         });
//         event.preventDefault();
//     });

// });
// $("#js-submit01").click(function (event) {
//     event.preventDefault(); // フォームのデフォルト送信動作をキャンセル

//     // Googleフォームにデータを送信
//     $.ajax({
//         url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd3AcngBLN-yuXmdbGd0UyaqMT-cR_p8-yrs-eRguDggacFYg/formResponse",
//         data: $("#form").serialize(), // フォームデータをシリアライズ
//         type: "POST",
//         dataType: "xml",
//         statusCode: {
//             0: function () {
//                 // 送信成功時のリダイレクト
//                 window.location.href = "/contact/thanks"; // カスタムサンクスページのURL
//             },
//             200: function () {
//                 // 送信成功時のリダイレクト
//                 window.location.href = "/contact/thanks"; // カスタムサンクスページのURL
//             }
//         },
//         success: function () {
//             // 送信完了後にフォームをリセット
//             $('#form')[0].reset();
//         }
//     });
// });

// $("#js-submit01").click(function (event) {
//     // Googleフォームにデータを送信
//     $('#form').submit();  // フォームを通常の方法で送信
// });


$("#js-submit01").click(function (event) {
    event.preventDefault(); // フォームのデフォルト送信動作をキャンセル

    // チェックボックスが選択されているか確認
    if (!$("#confirmation").is(":checked")) {
        alert("チェックボックスを確認してください。");
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
                window.location.href = "/contact/thanks"; // カスタムサンクスページのURL
            },
            200: function () {
                // 送信成功時のリダイレクト
                window.location.href = "/contact/thanks"; // カスタムサンクスページのURL
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







//==============input type="radio"のタブキーで各ラジオへのフォーカス================//

$(document).ready(function () {
    // 全てのラジオボタンを取得
    const radioGroups = $('input[type="radio"]');

    radioGroups.each(function (index) {
        $(this).on('keydown', function (event) {
            if (event.key === "Tab" && !event.shiftKey) {
                // デフォルトのタブ操作を無効化
                event.preventDefault();

                // 次のラジオボタンにフォーカスを移動
                if (index < radioGroups.length - 1) {
                    radioGroups.eq(index + 1).focus();
                } else {
                    // 最後のラジオボタンの場合は次のフォーカス可能な要素に移動
                    $(this).closest('form').find('input, textarea, select').eq(index + 1).focus();
                }
            }

            if (event.key === "Tab" && event.shiftKey) {
                // デフォルトのシフト+タブ操作を無効化
                event.preventDefault();

                // 前のラジオボタンにフォーカスを移動
                if (index > 0) {
                    radioGroups.eq(index - 1).focus();
                } else {
                    // 最初のラジオボタンの場合は前のフォーカス可能な要素に移動
                    $(this).closest('form').find('input, textarea, select').eq(index - 1).focus();
                }
            }
        });
    });
});

// ===================== fadeUpアニメーション =====================
// ふわっ
function fadeUpAnime() {
    $('.fadeUpTrigger').each(function () {
        var elemPos = $(this).offset().top - 50; // 要素より50px上の位置
        var scroll = $(window).scrollTop(); // 現在のスクロール位置
        var windowHeight = $(window).height(); // ウィンドウの高さ

        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('fadeUp'); // fadeUpクラスを追加
        } else {
            $(this).removeClass('fadeUp'); // fadeUpクラスを削除
        }
    });
}

// ===================== flipLeftアニメーション =====================
// パタッ
function flipLeftAnime() {
    $('.flipLeftTrigger').each(function () {
        var elemPos = $(this).offset().top - 50; // 要素より50px上の位置
        var scroll = $(window).scrollTop(); // 現在のスクロール位置
        var windowHeight = $(window).height(); // ウィンドウの高さ

        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('flipLeft'); // flipLeftクラスを追加
        } else {
            $(this).removeClass('flipLeft'); // flipLeftクラスを削除
        }
    });
}

// ===================== blurTriggerアニメーション =====================
// じわっ
function blurAnime() {
    $('.blurTrigger').each(function () {
        var elemPos = $(this).offset().top - 50; // 要素より50px上の位置
        var scroll = $(window).scrollTop(); // 現在のスクロール位置
        var windowHeight = $(window).height(); // ウィンドウの高さ

        if (scroll >= elemPos - windowHeight) {
            $(this).addClass('blur'); // blurクラスを追加
        } else {
            $(this).removeClass('blur'); // blurクラスを削除
        }
    });
}

// ===================== スクロール時にアニメーションを呼ぶ =====================
$(window).on('scroll', function () {
    fadeUpAnime(); // fadeUpアニメーションを呼び出し
    flipLeftAnime(); // flipLeftアニメーションを呼び出し
    blurAnime(); // blurアニメーションを呼び出し
});

// ===================== ページ読み込み時にアニメーションを呼ぶ =====================
$(window).on('load', function () {
    fadeUpAnime(); // fadeUpアニメーションを呼び出し
    flipLeftAnime(); // flipLeftアニメーションを呼び出し
    blurAnime(); // blurアニメーションを呼び出し
});
