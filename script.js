// ========================================
// DOM読み込み時の初期化
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
});

// ========================================
// スムーススクロール
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // ハッシュのみのリンクまたは要素が存在する場合のみスムーススクロール
            if (href === '#' || href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();

                    // ヘッダーの高さを考慮してスクロール
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ========================================
// スクロールアニメーション
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を監視
    const animatedElements = document.querySelectorAll('.feature-card, .about-card, .chat-container, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// ヘッダーのスクロール効果
// ========================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

// ========================================
// パララックス効果（背景の動き）
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        orb.style.transform = `translateY(${yPos}px)`;
    });
});

// ========================================
// ボタンのクリックアニメーション
// ========================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ========================================
// カスタムカーソルエフェクト（オプション）
// ========================================
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
}

// カスタムカーソルは必要に応じてコメント解除
// initCustomCursor();

// ========================================
// ローディングアニメーション
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // フェードインアニメーション
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// ========================================
// レスポンシブメニュー（モバイル対応）
// ========================================
const mobileBreakpoint = 768;

window.addEventListener('resize', () => {
    if (window.innerWidth > mobileBreakpoint) {
        // デスクトップ表示の処理
    } else {
        // モバイル表示の処理
    }
});

// ========================================
// フォーム送信処理（お問い合わせ）
// ========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // フォームデータの取得
        const formData = new FormData(contactForm);

        // ここで実際の送信処理を実装
        // 例: fetch APIを使ったサーバーへの送信

        // 送信完了メッセージ
        alert('お問い合わせありがとうございます。後ほど担当者よりご連絡いたします。');
        contactForm.reset();
    });
}

// ========================================
// パフォーマンス最適化
// ========================================
// 画像の遅延読み込み
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// アクセシビリティ向上
// ========================================
// キーボードナビゲーション
document.addEventListener('keydown', (e) => {
    // Escキーでモーダルを閉じるなど
    if (e.key === 'Escape') {
        // モーダルやメニューを閉じる処理
    }
});

// フォーカス表示の強化
document.querySelectorAll('a, button, input').forEach(el => {
    el.addEventListener('focus', function() {
        this.classList.add('focused');
    });
    el.addEventListener('blur', function() {
        this.classList.remove('focused');
    });
});

// ========================================
// エラーハンドリング
// ========================================
window.addEventListener('error', (e) => {
    console.error('エラーが発生しました:', e.error);
    // 必要に応じてエラーログをサーバーに送信
});

// ========================================
// デバッグ用
// ========================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🚀 大山町みらい議会 - 開発モード');
    console.log('バージョン: 1.0.0');
}
