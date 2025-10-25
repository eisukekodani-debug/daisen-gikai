# 大山町みらい議会

大山町の議会情報を住民の皆様にわかりやすくお届けするWebプラットフォームです。

## 概要

このプロジェクトは、地方自治体（大山町）の議会情報を、住民の方々がより身近に感じられるように、AIを活用してわかりやすく提供することを目的としています。

## 主な機能

### 1. 議案の可視化
- 最新の議案を見やすいカード形式で表示
- 議案の状態（審議中、準備中、可決など）を一目で確認
- 予算や日程などの重要情報をわかりやすく表示

### 2. 詳細な議案情報
- 各議案の詳細ページで、背景、目的、内容、スケジュールを確認
- 住民への影響を明確に説明
- よくある質問（FAQ）を掲載

### 3. AIチャットボット統合
- Difyチャットボットを統合
- 議案について自由に質問可能
- 自然な対話形式で情報を取得

### 4. レスポンシブデザイン
- スマートフォン、タブレット、デスクトップに最適化
- どのデバイスからでも快適に利用可能

## 技術スタック

- **HTML5**: セマンティックなマークアップ
- **CSS3**: モダンなスタイリング、Flexbox、Grid Layout
- **JavaScript (ES6+)**: インタラクティブな機能
- **Font Awesome**: アイコン
- **Google Fonts**: Noto Sans JP
- **Dify**: AIチャットボット

## ファイル構成

```
daisen-gikai/
├── index.html          # トップページ
├── bill.html           # 議案詳細ページ
├── style.css           # スタイルシート
├── script.js           # JavaScript
└── README.md           # このファイル
```

## セットアップ

### 必要な環境
- モダンなWebブラウザ（Chrome, Firefox, Safari, Edge）
- Webサーバー（開発時はローカルサーバーでOK）

### ローカルでの実行方法

1. リポジトリをクローン
```bash
git clone https://github.com/your-username/daisen-gikai.git
cd daisen-gikai
```

2. ローカルサーバーを起動
```bash
# Pythonの場合
python -m http.server 8000

# Node.jsのhttp-serverの場合
npx http-server
```

3. ブラウザで開く
```
http://localhost:8000
```

## カスタマイズ

### 議案データの追加・編集

`script.js`の`billsData`オブジェクトに議案データを追加・編集できます：

```javascript
const billsData = {
    '2': {
        number: '議案第2号',
        title: '学校給食センター改修事業',
        status: '審議中',
        // ... その他のフィールド
    }
};
```

### スタイルのカスタマイズ

`style.css`の`:root`セクションでカラーパレットを変更できます：

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    /* ... */
}
```

### Difyチャットボットの設定

`index.html`と`bill.html`のDifyスクリプトタグの`data-chatbot-id`を変更してください：

```html
<script src="https://udify.app/embed.js"
        data-chatbot-id="your-chatbot-id"
        data-theme="light"
        data-position="bottom-right">
</script>
```

## 今後の開発予定

- [ ] バックエンドAPIの統合
- [ ] ユーザー認証機能
- [ ] コメント・フィードバック機能
- [ ] 議案の検索・フィルタリング機能
- [ ] 議員情報ページ
- [ ] 会議録の閲覧機能
- [ ] 多言語対応
- [ ] アクセシビリティの向上

## ライセンス

このプロジェクトは、大山町の住民の皆様のために開発されています。

## お問い合わせ

ご質問やご要望がありましたら、以下までご連絡ください：

- Email: info@daisen-gikai.jp
- 電話: 0859-XX-XXXX

---

大山町みらい議会 - あなたのまちの議会を、もっと身近に。
