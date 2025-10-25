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
                        <li><a href="index.html">🏠 ホーム</a></li>
                        <li><a href="#latest-bills">🔥 話題</a></li>
                        <li><a href="#how-to-use">❓ 使い方</a></li>
                        <li><a href="#" onclick="openDifyChat(); return false;">
                            <i class="fas fa-robot"></i> AIチャット
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
                    <h3>✨ このサイトについて</h3>
                    <p>中学生のキミにも、小学生の弟妹にも、おじいちゃんおばあちゃんにも！町のことを、みんながわかる言葉で伝えたい。そんな想いで作りました💡</p>
                </div>
                <div class="footer-section">
                    <h3>🔗 メニュー</h3>
                    <ul>
                        <li><a href="index.html">🏠 トップページ</a></li>
                        <li><a href="#latest-bills">🔥 今の話題</a></li>
                        <li><a href="#how-to-use">❓ 使い方</a></li>
                        <li><a href="#" onclick="openDifyChat(); return false;">🤖 AIと話す</a></li>
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
            number: '議案 No.2',
            title: '🍱 給食センターをパワーアップ！',
            status: '💬 話し合い中',
            statusClass: 'status-active',
            date: '2025年10月15日',
            budget: '3億2,000万円',
            summary: 'キミが毎日食べてる給食、実は古い施設で作られてるって知ってた？🤔 最新の設備にして、もっと美味しくて安全な給食を作れるようにするんだ！',
            background: '給食センター、実は1987年（昭和62年）に建てられたんだ。キミのお父さんやお母さんが子どもの頃からあるってことだよ！もう40年近く経ってて、設備も古くなっちゃったし、今の安全基準にも完全には合ってないんだって💦',
            purpose: 'キミたち全員が、毎日安全で美味しい給食を食べられるように、ピカピカの新しい施設にするよ！アレルギーがある人にも、もっと安心な給食を作れるようになるんだ😋',
            details: [
                '🏗️ 調理場を全部新しくする（床が濡れない最新式！）',
                '🔥 調理機器を最新のやつに（もっと美味しく作れる＆エコ）',
                '🧼 衛生管理をパワーアップ（バイ菌を徹底ブロック！）',
                '🚚 配送トラックも新車に（2台）',
                '🍽️ 工事中も給食は出るから安心してね！'
            ],
            impact: '工事は約6ヶ月かかるけど、その間も給食は出るよ！近くの町の給食センターが協力してくれるんだ。メニューがちょっと変わるかもだけど、栄養はバッチリ！保護者には詳しく説明するから、お家の人に教えてあげてね📢',
            schedule: '2025年11月～2026年4月（予定）',
            questions: [
                {
                    q: '工事中、給食ってどうなるの？給食なしの日とかある？😥',
                    a: '大丈夫！工事中も毎日給食は出るよ！近くの給食センターが協力してくれるから、普通に給食を食べられる。メニューがちょっと変わるかもしれないけど、栄養はちゃんと考えてあるから安心してね😊'
                },
                {
                    q: '新しくなったら、給食ってどう変わるの？もっと美味しくなる？🤩',
                    a: 'もちろん！最新の調理機器で作るから、今よりもっと美味しくなるはず✨それに、アレルギーがある人向けのメニューも充実するよ。食べられないものがある友達も、もっと安心して給食を楽しめるようになるんだ！'
                }
            ]
        },
        '3': {
            number: '議案 No.3',
            title: '👶 子育て応援スポット、誕生！',
            status: '📝 準備中',
            statusClass: 'status-pending',
            date: '2025年10月20日',
            budget: '1億8,500万円',
            summary: '弟や妹がいる人に朗報！👨‍👩‍👧‍👦 赤ちゃんや小さい子を育ててるママ・パパが集まれる場所を作るよ。キミのお母さんやお父さんも、きっと喜ぶはず！',
            background: '最近、近所に頼れる人が少なくて、一人で子育てしてるママやパパが増えてるんだ。「この育て方で大丈夫かな？」って不安になったり、ちょっと休みたい時に預けられる場所がなくて困ってる人も多いんだって😢',
            purpose: '赤ちゃんや小さい子がいる家族が、安心して、楽しく子育てできる場所を作るよ！ママ友・パパ友を作ったり、育児の悩みを相談できたりする、温かい場所になるんだ🌟',
            details: [
                '🗣️ なんでも相談できる窓口（保育士さんや看護師さんがいるよ）',
                '👶 ちょっと預かってもらえる（最大10人まで）',
                '🎈 親子で遊べる広いスペース',
                '📚 育児の勉強会やイベント',
                '🍼 授乳室とおむつ替えスペースもバッチリ'
            ],
            impact: 'これができると、子育て中のママ・パパが孤独を感じにくくなるし、同じくらいの年の子がいる友達もできる！町全体で子育てを応援する雰囲気になるよ🎉',
            schedule: '2026年4月オープン予定',
            questions: [
                {
                    q: '誰でも使えるの？中学生でも行っていい？',
                    a: '大山町に住んでる小学校に入る前の子どもと、その保護者が使えるよ。中学生のキミが、赤ちゃんの弟や妹と一緒にパパ・ママと行くのは大歓迎！ボランティアで手伝いたい中学生も募集するかも😊'
                },
                {
                    q: '預けるのにお金かかる？',
                    a: '施設を使うのは無料！でも一時預かり（短い時間預けるやつ）は1時間500円くらいを予定してるよ。詳しい料金は、オープンする前に決まるから待っててね！'
                }
            ]
        },
        '4': {
            number: '議案 No.4',
            title: '🚨 もしもの時に、町を守る！',
            status: '✅ 決定！',
            statusClass: 'status-completed',
            date: '2025年10月10日',
            budget: '5,200万円',
            summary: '地震や台風が来た時、キミは安全に避難できる？🏃‍♂️ 避難所を増やしたり、防災アプリを作ったり... キミと家族を守るための計画が、パワーアップするよ！',
            background: '最近、日本のいろんな場所で大きな地震や台風の被害が出てるよね💦 大山町でも「もし大きな災害が起きたらどうしよう」って考えて、防災の準備をもっと強くする必要があるんだ。',
            purpose: 'どんな災害が来ても、キミも家族もみんなが安全に逃げられて、避難所で安心して過ごせるようにする！町のみんなで協力して、災害に強い町を作るよ💪',
            details: [
                '🏠 避難所を5か所増やす（近くに避難所がない人のために）',
                '🍙 備蓄食料を増やす（3日分→1週間分に！）',
                '📱 防災アプリを作る（スマホでサクッと情報チェック）',
                '👥 地域の防災チームを応援（ご近所同士で助け合おう）',
                '♿ お年寄りや体が不自由な人向けの避難所も増やす'
            ],
            impact: '災害が起きた時、今よりもっと早く、安全に避難できるようになる！避難所での生活も、前より快適になるはず。何より「町がちゃんと準備してくれてる」って安心感が持てるよ✨',
            schedule: '2025年12月～2026年3月（順番にやっていくよ）',
            questions: [
                {
                    q: '防災アプリって何？ゲームアプリとは違うの？',
                    a: 'ゲームじゃないけど、めっちゃ重要なアプリだよ！地震や台風の警報が来たら通知してくれたり、一番近い避難所を教えてくれたり、家族の安否確認もできるんだ📲 2025年12月からダウンロードできるようになるよ。使い方の説明会もあるから、お家の人と一緒に参加してみて！'
                },
                {
                    q: '避難所ってどこに増えるの？うちの近くにもできる？',
                    a: '地区の公民館や集会所を中心に5か所増やす予定だよ。どこに作るかは町の広報でお知らせするから、チェックしてね！キミの家から一番近い避難所がどこか、今度家族で確認してみるのもいいかも🏃‍♀️'
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
