// ========================================
// DOM読み込み時の初期化
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initFooter();
    initSmoothScroll();
    initMobileMenu();
});

// ========================================
// 共通ヘッダーの挿入
// ========================================
function initHeader() {
    const headerElement = document.getElementById('header');
    if (!headerElement) return;

    const headerHTML = `
        <div class="container">
            <div class="header-content">
                <a href="index.html" class="logo">
                    <div class="logo-icon">
                        <i class="fas fa-landmark"></i>
                    </div>
                    <div class="logo-text">大山町みらい議会</div>
                </a>
                <nav>
                    <ul class="nav-menu" id="navMenu">
                        <li><a href="index.html">ホーム</a></li>
                        <li><a href="#latest-bills">議案一覧</a></li>
                        <li><a href="#how-to-use">使い方</a></li>
                        <li><a href="#" onclick="openDifyChat(); return false;">
                            <i class="fas fa-comments"></i> AIに質問
                        </a></li>
                    </ul>
                    <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="メニュー">
                        <i class="fas fa-bars"></i>
                    </button>
                </nav>
            </div>
        </div>
    `;

    headerElement.innerHTML = headerHTML;
}

// ========================================
// 共通フッターの挿入
// ========================================
function initFooter() {
    const footerElement = document.getElementById('footer');
    if (!footerElement) return;

    const currentYear = new Date().getFullYear();

    const footerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>大山町みらい議会について</h3>
                    <p>町民の皆様に議会の情報をわかりやすくお届けするプラットフォームです。AIを活用して、議案の内容を身近に感じていただけるよう努めています。</p>
                </div>
                <div class="footer-section">
                    <h3>リンク</h3>
                    <ul>
                        <li><a href="index.html">ホーム</a></li>
                        <li><a href="#latest-bills">議案一覧</a></li>
                        <li><a href="#how-to-use">使い方</a></li>
                        <li><a href="#" onclick="openDifyChat(); return false;">AIに質問する</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>お問い合わせ</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> 鳥取県西伯郡大山町</li>
                        <li><i class="fas fa-phone"></i> 0859-XX-XXXX</li>
                        <li><i class="fas fa-envelope"></i> info@daisen-gikai.jp</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${currentYear} 大山町みらい議会. All rights reserved.</p>
            </div>
        </div>
    `;

    footerElement.innerHTML = footerHTML;
}

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
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ========================================
// モバイルメニューのトグル
// ========================================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // アイコンの切り替え
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // メニュー外をクリックした時にメニューを閉じる
        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) || mobileMenuToggle.contains(event.target);

            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// ========================================
// Difyチャットボットを開く
// ========================================
function openDifyChat(message = '') {
    // Difyチャットボットのウィジェットを開く
    // 埋め込みスクリプトが提供するAPIを使用
    if (window.difyChatbot) {
        window.difyChatbot.open();
        if (message) {
            // メッセージがある場合は自動入力（Dify APIによる）
            setTimeout(() => {
                window.difyChatbot.sendMessage(message);
            }, 500);
        }
    } else {
        // フォールバック: Difyが読み込まれていない場合
        console.warn('Difyチャットボットが読み込まれていません。');
        // カスタムチャットボットウィンドウの表示など、代替処理をここに実装
    }
}

// ========================================
// 議案詳細ページ用の関数
// ========================================
function loadBillDetail() {
    // URLパラメータから議案IDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const billId = urlParams.get('id');

    if (!billId) {
        console.error('議案IDが指定されていません。');
        return;
    }

    // 議案データ（実際のアプリケーションではAPIから取得）
    const billsData = {
        '2': {
            number: '議案第2号',
            title: '学校給食センター改修事業',
            status: '審議中',
            statusClass: 'status-active',
            date: '2025年10月15日',
            budget: '3億2,000万円',
            summary: '老朽化した給食センターの全面改修を行い、衛生基準の向上と効率的な運営を目指します。',
            background: '現在の学校給食センターは昭和62年に建設され、施設・設備の老朽化が進んでいます。また、平成21年に改正された学校給食衛生管理基準への完全な対応も必要となっています。',
            purpose: '児童生徒に安全で美味しい給食を安定的に提供するため、最新の衛生基準に適合した施設への全面改修を行います。',
            details: [
                '調理場の全面改修（ドライシステム導入）',
                '調理機器の更新（最新の省エネ機器導入）',
                '衛生管理設備の強化',
                '配送車両の更新（2台）',
                '改修期間中の給食提供体制の確保'
            ],
            impact: '改修期間中（約6ヶ月）は、近隣市町村の給食センターと連携し、給食提供を継続します。保護者の皆様へは事前に詳細をお知らせします。',
            schedule: '2025年11月～2026年4月（予定）',
            questions: [
                {
                    q: '改修期間中の給食はどうなりますか？',
                    a: '近隣の給食センターと連携し、通常通り給食を提供します。メニューに一部変更がある可能性がありますが、栄養バランスは維持します。'
                },
                {
                    q: '改修後はどのような給食になりますか？',
                    a: '最新の調理機器により、より美味しく安全な給食を提供できるようになります。また、アレルギー対応食の充実も図ります。'
                }
            ]
        },
        '3': {
            number: '議案第3号',
            title: '子育て支援センター新設事業',
            status: '準備中',
            statusClass: 'status-pending',
            date: '2025年10月20日',
            budget: '1億8,500万円',
            summary: '子育て世帯を支援するための新しいセンターを設立します。',
            background: '核家族化の進行や地域コミュニティの希薄化により、子育てに不安を感じる保護者が増加しています。',
            purpose: '子育て世帯が安心して子育てできる環境を整備し、地域全体で子育てを支援する体制を構築します。',
            details: [
                '相談窓口の設置（保育士、保健師による相談対応）',
                '一時預かり施設（定員10名）',
                '親子交流スペース（プレイルーム）',
                '育児講座・イベントスペース',
                '授乳室・おむつ交換スペース'
            ],
            impact: '子育て世帯の孤立防止、育児不安の軽減、地域の子育て力向上が期待されます。',
            schedule: '2026年4月開設予定',
            questions: [
                {
                    q: 'どのような人が利用できますか？',
                    a: '大山町在住の未就学児とその保護者が利用できます。登録制で、利用は無料です。'
                },
                {
                    q: '一時預かりの料金は？',
                    a: '1時間500円を予定しています。詳細は開設前にお知らせします。'
                }
            ]
        },
        '4': {
            number: '議案第4号',
            title: '地域防災計画改定',
            status: '可決',
            statusClass: 'status-completed',
            date: '2025年10月10日',
            budget: '5,200万円',
            summary: '近年の災害状況を踏まえ、地域防災計画を全面的に見直します。',
            background: '近年、全国各地で大規模な自然災害が頻発しており、本町でも防災体制の強化が急務となっています。',
            purpose: 'あらゆる災害に対応できる強靭な防災体制を構築し、町民の生命と財産を守ります。',
            details: [
                '避難所の増設（5箇所追加）',
                '防災備蓄の強化（3日分→7日分）',
                '情報伝達システムの整備（防災アプリ導入）',
                '自主防災組織の育成支援',
                '福祉避難所の指定拡大'
            ],
            impact: '災害時の避難体制が大幅に改善され、より安全な避難生活が可能になります。',
            schedule: '2025年12月～2026年3月（順次実施）',
            questions: [
                {
                    q: '防災アプリはいつから使えますか？',
                    a: '2025年12月からダウンロード可能になる予定です。使い方の説明会も開催します。'
                },
                {
                    q: '避難所はどこに増設されますか？',
                    a: '各地区の公民館や集会所を中心に5箇所を予定しています。詳細は広報でお知らせします。'
                }
            ]
        }
    };

    const bill = billsData[billId];

    if (bill) {
        displayBillDetail(bill);
    } else {
        document.querySelector('.bill-detail-content').innerHTML = `
            <div class="detail-section">
                <p>指定された議案が見つかりませんでした。</p>
                <a href="index.html" class="btn btn-primary">トップページに戻る</a>
            </div>
        `;
    }
}

function displayBillDetail(bill) {
    // ヘッダー部分
    const headerElement = document.querySelector('.bill-detail-header .container');
    if (headerElement) {
        headerElement.innerHTML = `
            <div class="bill-detail-number">${bill.number}</div>
            <h1 class="bill-detail-title">${bill.title}</h1>
            <div class="bill-detail-meta">
                <span class="bill-status ${bill.statusClass}">${bill.status}</span>
                <span><i class="far fa-calendar"></i> ${bill.date}</span>
                <span><i class="fas fa-yen-sign"></i> ${bill.budget}</span>
            </div>
        `;
    }

    // コンテンツ部分
    const contentElement = document.querySelector('.bill-detail-content');
    if (contentElement) {
        let detailsHTML = '<ul>';
        bill.details.forEach(detail => {
            detailsHTML += `<li>${detail}</li>`;
        });
        detailsHTML += '</ul>';

        let questionsHTML = '';
        if (bill.questions && bill.questions.length > 0) {
            questionsHTML = '<div class="detail-section"><h2>よくある質問</h2>';
            bill.questions.forEach(qa => {
                questionsHTML += `
                    <div class="info-box">
                        <strong>Q: ${qa.q}</strong>
                        <p>A: ${qa.a}</p>
                    </div>
                `;
            });
            questionsHTML += '</div>';
        }

        contentElement.innerHTML = `
            <div class="detail-section">
                <h2>概要</h2>
                <p>${bill.summary}</p>
            </div>

            <div class="detail-section">
                <h2>背景</h2>
                <p>${bill.background}</p>
            </div>

            <div class="detail-section">
                <h2>目的</h2>
                <p>${bill.purpose}</p>
            </div>

            <div class="detail-section">
                <h2>事業内容</h2>
                ${detailsHTML}
            </div>

            <div class="detail-section">
                <h2>住民への影響</h2>
                <p>${bill.impact}</p>
            </div>

            <div class="detail-section">
                <h2>実施スケジュール</h2>
                <p>${bill.schedule}</p>
            </div>

            ${questionsHTML}

            <div class="detail-section">
                <h2>この議案について質問する</h2>
                <p>AIチャットボットで、この議案について詳しく質問することができます。</p>
                <button class="btn btn-primary" onclick="openDifyChat('${bill.number}について教えてください')">
                    <i class="fas fa-robot"></i> AIに質問する
                </button>
            </div>
        `;
    }
}

// 議案詳細ページの場合、データを読み込む
if (window.location.pathname.includes('bill.html')) {
    document.addEventListener('DOMContentLoaded', loadBillDetail);
}
