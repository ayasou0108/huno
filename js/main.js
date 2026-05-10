"use strict";

/* =============================================
    モバイルナビ
============================================= */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("mobileNav");
  const overlay = document.getElementById("mobileOverlay");
  const navLinks = document.querySelectorAll(".mobile__nav-link");

  //  メニューの開閉を切り替える
  const toggleMenu = () => {
    const isOpen = nav.classList.toggle("is-active");
    hamburger.classList.toggle("is-active");
    overlay.classList.toggle("is-active");

    // アクセシビリティ対応（スクリーンリーダー用）
    hamburger.setAttribute("aria-expanded", isOpen);
  };

  // メニューを閉じる
  const closeMenu = () => {
    nav.classList.remove("is-active");
    hamburger.classList.remove("is-active");
    overlay.classList.remove("is-active");
    hamburger.setAttribute("aria-expanded", "false");
  };

  // ボタンクリックで開閉
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  // 黒い背景をクリックで閉じる
  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // メニュー内のリンクをクリックしたら閉じる
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
});

/* ===============================
  MV 背景スライドショー
================================ */
document.addEventListener("DOMContentLoaded", () => {
  const imgs = document.querySelectorAll(".mv__bg");
  if (imgs.length < 2) {
    if (imgs.length === 1) imgs[0].classList.add("active");
    return;
  }

  let currentIndex = 0;

  const updateSlide = () => {
    // 1. 前回の画像を特定
    const prevIndex = currentIndex;

    // 2. インデックスを更新（2枚なら 0→1→0...）
    currentIndex = (currentIndex + 1) % imgs.length;

    // 3. 次の画像を最前面（z-index: 20）にしてフェードイン開始
    // すでに active がついている場合でも、一旦外して付け直すことでアニメーションをリセット
    imgs[currentIndex].classList.remove("active");
    void imgs[currentIndex].offsetWidth; // 強制再レンダリング（重要：アニメーションを0%からやり直すため）
    imgs[currentIndex].classList.add("active");

    // 4. 前の画像は「最前面」より少し下のレイヤー（z-index: 10）で維持
    // これにより、新しい画像が重なるまで後ろで拡大し続けてくれます
    imgs[prevIndex].style.zIndex = "10";
    imgs[currentIndex].style.zIndex = "20";

    // 5. 新しい画像が完全に重なったら、前の画像の後処理をする
    setTimeout(() => {
      // 次の画像が重なりきったので、前の画像からクラスを外して z-index を戻す
      imgs[prevIndex].classList.remove("active");
      imgs[prevIndex].style.zIndex = "";
    }, 1500); // CSSの transition (1.5s) と合わせる
  };

  // 初回起動
  imgs[0].classList.add("active");

  // 切り替え間隔
  setInterval(updateSlide, 4000);
});

const char = document.querySelector(".column__char");

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    char.classList.add("show");
  }
});

observer.observe(char);
