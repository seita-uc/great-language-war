function init() {
    // Stageの作成
    var stage = new createjs.Stage("myCanvas");
    // コンテナー(グループの親)を作成
    var container = new createjs.Container();
    container.x = 300;
    container.y = 300;
    stage.addChild(container); // 画面に追加
    // ループ分で10回
    for (var i = 0; i < 10; i++) {
        // 円を作成し
        var ball = new createjs.Shape();
        ball.graphics
            .beginFill("DarkRed")
            .drawCircle(0, 0, 50);
        // 円周上に配置
        ball.x = 200 * Math.sin(i * 360 / 10 * Math.PI / 180);
        ball.y = 200 * Math.cos(i * 360 / 10 * Math.PI / 180);
        // グループに追加
        container.addChild(ball);
    }
    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick() {
        // 親だけを回転
        container.rotation += 1;
        stage.update();
    }
}

window.addEventListener("load", init);

