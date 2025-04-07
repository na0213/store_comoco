
window.addEventListener('load', () => {
    const images = document.querySelectorAll('.background-images img');
    images.forEach((img, index) => {
    setTimeout(() => {
        img.style.opacity = '0.07';
        img.style.transform = 'translateY(0)';
    }, index * 200);
    });
    
    // 製品スクロールの横スクロールを滑らかにする
    initSmoothScroll();
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const images = document.querySelectorAll('.background-images img');
    
    // それぞれの画像に少しずつ異なる動きを与える
    images.forEach((img, index) => {
    const speed = 0.05 + (index * 0.02);
    const rotation = (scrollY * 0.02) * (index % 2 === 0 ? 1 : -1);
    img.style.transform = `translateY(${scrollY * speed}px) rotate(${rotation}deg)`;
    });
    
    // スクロール位置に応じて新しい画像を追加
    if (scrollY > viewportHeight && !window.additionalImagesAdded) {
    window.additionalImagesAdded = true;
    addMoreFloatingImages();
    }
});

// ヘッダースクロール効果とモバイルメニュー
function initHeader() {
    const header = document.querySelector('.site-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    // スクロール時のヘッダー変化
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // モバイルメニュートグル
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });
    }
    
    // ナビゲーションリンクのクリック処理（スムーススクロール）
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // モバイルメニューを閉じる
        if (mainNav.classList.contains('active')) {
          mobileMenuToggle.classList.remove('active');
          mainNav.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
        
        // リンク先が#で始まる内部リンクの場合のみスムーススクロール
        const href = this.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            // ヘッダーの高さを考慮してスクロール位置を調整
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
  
  // ページ読み込み完了時にヘッダー機能を初期化
  window.addEventListener('load', () => {
    // 他の初期化コード...
    
    // ヘッダーの初期化
    initHeader();
  });

// 横スクロールを滑らかにする関数
function initSmoothScroll() {
    const scrollContainer = document.querySelector('.product-scroll');
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    scrollContainer.style.cursor = 'grabbing';
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2; // スクロール速度の調整
    scrollContainer.scrollLeft = scrollLeft - walk;
    });
    
    // 初期状態でカーソルをgrabに
    scrollContainer.style.cursor = 'grab';
}

// 追加の浮遊する画像を生成する関数
function addMoreFloatingImages() {
    const container = document.querySelector('.background-images');
    const imgTypes = ['donut', 'cookie', 'muffin', 'biscuit'];
    const sizes = [80, 90, 100, 110];
    
    for (let i = 0; i < 4; i++) {
    const img = document.createElement('img');
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    img.src = `/api/placeholder/${size}/${size}`;
    img.alt = imgTypes[i % imgTypes.length];
    img.classList.add(imgTypes[i % imgTypes.length]);
    img.style.opacity = '0';
    img.style.top = `${Math.random() * 80 + 10}%`;
    img.style.left = `${Math.random() * 80 + 10}%`;
    img.style.width = `${size}px`;
    img.style.transform = 'translateY(50px)';
    
    container.appendChild(img);
    
    setTimeout(() => {
        img.style.opacity = '0.07';
        img.style.transform = 'translateY(0)';
    }, i * 300);
    }
}

// 製品カードのホバーエフェクト
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(-5px)';
    });
});

// スライダーの初期化と自動再生
function initSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!slider || slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // スライド切り替え間隔（5秒）
    
    // スライドを表示する関数
    function showSlide(index) {
      if (index < 0) {
        currentSlide = slides.length - 1;
      } else if (index >= slides.length) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }
      
      // スライダーを移動
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // インジケーターの更新
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentSlide);
      });
    }
    
    // 次のスライドへ
    function nextSlide() {
      showSlide(currentSlide + 1);
    }
    
    // 自動再生を開始
    function startSlideshow() {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
      slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // インジケーターのクリックイベント
    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => {
        showSlide(i);
        restartSlideshow();
      });
    });
    
    // スライダーにマウスオーバー時に一時停止、離れたら再開
    slider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
      startSlideshow();
    });
    
    // タッチ操作対応（スワイプ）
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(slideInterval);
    }, {passive: true});
    
    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startSlideshow();
    }, {passive: true});
    
    function handleSwipe() {
      // 右から左へのスワイプ（次へ）
      if (touchEndX < touchStartX - 50) {
        nextSlide();
      }
      // 左から右へのスワイプ（前へ）
      if (touchEndX > touchStartX + 50) {
        showSlide(currentSlide - 1);
      }
    }
    
    // 自動再生を再開（クリックやタッチ後）
    function restartSlideshow() {
      clearInterval(slideInterval);
      startSlideshow();
    }
    
    // 初期表示と自動再生開始
    showSlide(0);
    startSlideshow();
  }
  
  // ページ読み込み完了時にスライダーを初期化
  window.addEventListener('load', () => {
    // 他の初期化コード...
    
    // スライダーの初期化
    initSlider();
  });