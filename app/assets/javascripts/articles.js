$(function() {
  //マウスをコメントの上に持ってきた時、または離れた時に色が変わる
  //コメントが親である「contents」を指定。mouseoverした時に第一引数（何を）第二引数（どうするか）
  $(".contents").on("mouseover", ".article", function() {
    //this=.articleのcssを変化
    $(this).css({"background-color": "#F1940B", "font-weight": "bold"});
    //もう一つイベントメソッド追加
  }).on("mouseout", ".article", function() {
    $(this).css({"background-color": "#FFFFFF", "font-weight": "normal"});
  })

  //タイピングする度に文字数が出る
  $(".article_form").on('keyup', function() {
    //.char_numの文字を変換→文字の長さを数値化し、文字列とくっつける
    $(".char_num").text($(this).val().length + '文字');
  });

  //form全体のデータを送るため、formの大親のidを指定。
  $("#new_article").on("submit", function(e){
    //本来submitを押すと画面遷移してしまうので、それを中断する
    e.preventDefault();

    //コメント欄に入力された文字をtextという変数に代入
    var text = $(".article_form").val();
    //入力した文字をajaxへ送る為にjson形式に変換
    $.ajax({
      url: "/articles",
      type: "POST",
      data: { text: text },
      dataType: 'json',
      //もし成功したら
    }).done(function(data) {
      //作られたHTMLを変数htmlへ代入
      var html = buildHTML(data.text);
      //代入したものを.contentsの先頭へ追加
      $(".contents").prepend(html);
      //その時に入力フォームの中は空にする
      $(".article_form").val("");
      //もし失敗したら
    }).fail(function(jqXHR, textStatus, errorThrown) {
      alert("error : " + errorThrown)
    })
  })

  //追加された文字はhtmlに追加される
  function buildHTML(data) {
    var html = 
    `<div class="article"> ${data} </div>`
    return html;
  }

    //クリックした時に一番下までスクロールするボタン
  $(".scroll_arrow").on("click", function() {
    //.contentsをアニメーションで
    $(".contents").animate({scrollTop: $(".contents")[0].scrollHeight}, 500, "swing");
  })

});