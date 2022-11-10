import { Gallery } from './image-list.js';

// 通常のJavaScriptとは別スレッドで動作する →グローバル変数のやりときは不可能。DOMへのアクセス不可能
// サービスワーカーの登録
// プライベートモードでは利用できないメソッドがあるためプライベートモードでの利用は非推奨　https://developer.mozilla.org/ja/docs/Web/API/Navigator/serviceWorker
// 古いサービスワーカとの競合についてはService worker側で自動で整合処理をしてくれる
// →非同期処理なのでXMLHttpRequestやlocalStorageは利用できない
// サービスワーカが動作しないスコープ外のページからのリクエストはハンドリングできない。()

// ハードウェア情報についても取得可能
//  サービスワーカの登録条件
// 不具合等でワーカーの登録に失敗した時は何もしない
// →そのため

// localStorageに保存した

//　サービスワーカはグローバうs

// 変数などは保持できない　→

// リクエストはGETのみキャッシュできる。POST
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/My-SwTest/',
      });
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const imgSection = document.querySelector('section');

const getImageBlob = async (url) => {
  const imageResponse = await fetch(url);
  if (!imageResponse.ok) {
    throw new Error(
      `Image didn't load successfully; error code: ${
        imageResponse.statusText || imageResponse.status
      }`
    );
  }
  return imageResponse.blob();
};

const createGalleryFigure = async (galleryImage) => {
  try {
    const imageBlob = await getImageBlob(galleryImage.url);
    const myImage = document.createElement('img');
    const myCaption = document.createElement('caption');
    const myFigure = document.createElement('figure');
    myCaption.textContent = `${galleryImage.name}: Taken by ${galleryImage.credit}`;
    myImage.src = window.URL.createObjectURL(imageBlob);
    myImage.setAttribute('alt', galleryImage.alt);
    myFigure.append(myImage, myCaption);
    imgSection.append(myFigure);
  } catch (error) {
    console.error(error);
  }
};

registerServiceWorker();
Gallery.images.map(createGalleryFigure);
