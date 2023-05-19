# My-SwTest
## サンプル

PWA対応について
PWAとは
webアプリをios端末などでネイティブアプリと同じようなUI/UXで利用できるサイトのこと

Service workerとは Jsは基本シングルスレッドだが別スレッドで実行するJavaScriptファイル。 PWA実現に必要な機能を実現できる。

キャッシュについて https://developer.mozilla.org/ja/docs/Web/API/Cache サービスワーカーの機能としてリクエスト/レスポンス情報をCacheインターフェースに保持する仕組みがある。

## ライフサイクル 
1.サービスワーカーの登録(メインスレッド)   
2. installイベント(サービスワーカーごとに1回)。addEventListener でコールバックできる。この時点でCacheが作成される  

アクティブベーション サービスワーカーが利用可能な状態。 アクティブベーションされた後は基本以下の状態を繰り返す。 terminated:なにもしてない場合は常にこの状態 idle：リクエストイベント、ServiceWorkerGlobalScope.message イベントなどうけとった場合、サービスワーカーがなんらかの処理中の状態
pwa時にキャッシュがのこってしまう対応について 基本的にサーバーコードに変更がある場合、24時間ごとに自動更新してくれる。(ServiceWorkerRegistration.update()の仕様) ただ、運用上24時間経過せずアプリを利用するケースがあるため意図せず古いキャッシュを参照し、 意図しない動作をしてしまう可能性がある。

## Workboxについて
servie workerを気軽に利用できるようにしたモジュールセットのこと。 Vue CLIなどでは基本これを利用することで自前でService Workerを利用しなくて済む。 https://developer.chrome.com/docs/workbox/framework-integrations/

Workboxのモードについて
Workboxには二つのモードがある。

generateSW 基本的なモード。 ほとんどの要件はこちらのモードで対応可能。

injectManifest マニュアルモード。Workboxが非対応の機能を実装する必要が場合に利用する。 キャッシュを高度に操作、リクエストの監視などの実装する際に必要。 既存のサービスワーカーを利用する場合も https://developer.chrome.com/docs/workbox/the-ways-of-workbox/

更新について
https://developer.chrome.com/docs/workbox/handling-service-worker-updates/
