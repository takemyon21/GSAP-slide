/////////////////////////////////////
// GSAPで実装する重なるスライドショー //
/////////////////////////////////////

// スライドの要素を取得
const elSlideShowPanel = jQuery(".overlapping-slider__card");

// アニメーションの設定(スライド切り替わる速度)
const durationTime = 0.5;
const tl = gsap.timeline({
  // 無限に繰り返す。回数制限必要なら変更する
  repeat: -1,
});

// アニメーション間の待機時間
const delayTime = 4;

/////////////////////////
// スライドの設定値設定 //
/////////////////////////
// スライドの移動幅[x, y]
const slideTransform = [240, 64];
// スライドのサイズ[width, height]
const basicSlide = [960, 600];
// スライドサイズの変更幅[width, height]
const slideSize = [-160, -100];
// スライドの透過度設定(0と1は必須、その他は要件に応じて)
const slideOpacity = [0, 1, 0.6, 0.4, 0.2];
// border-radiusの変更幅(px不要)
const slideBorderRadius = [12, 8, 6, 4];
// borderの太さ(px不要)
const slideBorder = [12, 8, 6, 4];

// スライドの総数(変更しない)
const slideCount = elSlideShowPanel.length;

// スライドのアニメーション関数
function animateSlide(i) {
  // スライドのインデックス
  // 4枚のスライドで、ループするインデックスをつける
  // i=0の時・・・0、1、2、3
  // i=1の時・・・1、2、3、0
  // i=2の時・・・2、3、0、1
  // i=3の時・・・3、0、1、2
  // としたいので、次、その次、さらに次のインデックスは、
  // iにそれぞれ1,2,3の値を加えて、スライドの総数で割った余りで出す。
  // i=0の時・・・0、1、2、3
  // i=1の時・・・1、2、3、0((1+3)%4)
  // i=2の時・・・2、3、0((2+2)%4)、1((2+3)%4)
  // i=3の時・・・3、0((3+1)%4)、1((3+2)%4)、2((3+3)%4)
  const indexes = {};
  for (let j = 1; j <= slideCount; j++) {
    const key = `nextIndex${j}`;
    indexes[key] = (i + j) % slideCount;
  }

  //////////////////////////
  // スライドのサイズ計算式 //
  //////////////////////////

  // スライド1枚目が消失する位置とスライド幅
  const slide1Transform = `translate(${slideTransform[0] * -1}px, ${0 + slideTransform[1] * 4.5}px)`;
  const slide1Width = `${basicSlide[0] + slideSize[0] * -1}px`;
  const slide1Height = `${basicSlide[1] + slideSize[1] * -1}px`;
  // スライド2枚目が表示される位置とスライド幅
  const slide2Transform = `translate(${slideTransform[0] * 0}px, ${0 + slideTransform[1] * 3.5}px)`;
  const slide2Width = `${basicSlide[0] + slideSize[0] * 0}px`;
  const slide2Height = `${basicSlide[1] + slideSize[1] * 0}px`;
  // スライド3枚目が表示される位置とスライド幅
  const slide3Transform = `translate(${slideTransform[0] * 1}px, ${0 + slideTransform[1] * 2.5}px)`;
  const slide3Width = `${basicSlide[0] + slideSize[0] * 1}px`;
  const slide3Height = `${basicSlide[1] + slideSize[1] * 1}px`;
  // スライド4枚目が表示される位置とスライド幅
  const slide4Transform = `translate(${slideTransform[0] * 2}px, ${0 + slideTransform[1] * 1.5}px)`;
  const slide4Width = `${basicSlide[0] + slideSize[0] * 2}px`;
  const slide4Height = `${basicSlide[1] + slideSize[1] * 2}px`;
  // スライド4枚目が表示される位置とスライド幅
  const slide5Transform = `translate(${slideTransform[0] * 3}px, ${0 + slideTransform[1] * 0.5}px)`;
  const slide5Width = `${basicSlide[0] + slideSize[0] * 3}px`;
  const slide5Height = `${basicSlide[1] + slideSize[1] * 3}px`;
  // スライド1枚目が最背面に移動した場所とスライド幅
  const slide5TransformEx = `translate(${slideTransform[0] * 3.5}px, ${0 + slideTransform[1] * 0}px)`;
  const slide5WidthEx = `${basicSlide[0] + slideSize[0] * 3.25}px`;
  const slide5HeightEx = `${basicSlide[1] + slideSize[1] * 3.25}px`;

  ////////////////////////
  // アニメーションの設定 //
  ////////////////////////

  tl.to(elSlideShowPanel[i], {
    delay: delayTime, // アニメーション間で待機時間を作る
  })
    .to(
      elSlideShowPanel[i],
      {
        transform: slide1Transform,
        width: slide1Width,
        height: slide1Height,
        opacity: slideOpacity[0],
        duration: 0.5,
      },
      "<"
    )
    .to(
      elSlideShowPanel[indexes.nextIndex1],
      {
        transform: slide2Transform,
        width: slide2Width,
        height: slide2Height,
        borderRadius: slideBorderRadius[0],
        border: `${slideBorder[0]}px solid #333`,
        opacity: slideOpacity[1],
      },
      "<"
    )
    .to(
      elSlideShowPanel[indexes.nextIndex1],
      {
        zIndex: `${slideCount}`,
        duration: 0, // zIndexの変更を瞬時に反映
      },
      "<"
    )
    .to(
      elSlideShowPanel[indexes.nextIndex2],
      {
        transform: slide3Transform,
        width: slide3Width,
        height: slide3Height,
        opacity: slideOpacity[2],
        borderRadius: slideBorderRadius[1],
        border: `${slideBorder[1]}px solid #333`,
      },
      "<"
    )
    .to(
      elSlideShowPanel[indexes.nextIndex2],
      {
        zIndex: `${slideCount - 1}`,
        duration: 0, // zIndexの変更を瞬時に反映
      },
      "<"
    )
    .to(
      elSlideShowPanel[indexes.nextIndex3],
      {
        transform: slide4Transform,
        width: slide4Width,
        height: slide4Height,
        opacity: slideOpacity[3],
        borderRadius: slideBorderRadius[2],
        border: `${slideBorder[2]}px solid #333`,
      },
      "<"
    )
    .to(
      elSlideShowPanel[indexes.nextIndex3],
      {
        zIndex: `${slideCount - 2}`,
        duration: 0, // zIndexの変更を瞬時に反映
      },
      "<"
    )

    .to(elSlideShowPanel[i], {
      zIndex: `${slideCount - 3}`,
      duration: 0, // zIndexの変更を瞬時に反映
    })
    .to(
      elSlideShowPanel[i],
      {
        transform: slide5TransformEx,
        width: slide5WidthEx,
        height: slide5HeightEx,
        duration: 0,
        borderRadius: slideBorderRadius[3],
        border: `${slideBorder[3]}px solid #333`,
      },
      "<"
    )
    .to(
      elSlideShowPanel[i],
      {
        transform: slide5Transform,
        width: slide5Width,
        height: slide5Height,
        opacity: slideOpacity[4],
        duration: 0.5,
      },
      "<"
    );
}

//////////////////////
// アニメーション実行 //
//////////////////////
for (let i = 0; i < slideCount; i++) {
  animateSlide(i);
}
