# 救急搬送困難事案データ (総務省消防庁)

このリポジトリは、新型コロナウイルス感染症パンデミック中の日本における「救急搬送困難事案」に関するCSV形式のオープンデータを提供します。データは、総務省消防庁（FDMA）が公表している情報を元にしています。

オリジナルのExcelデータは自動的にダウンロードされ、ユーザーが使いやすい複数のCSV形式に変換されます。

## ライブデモ

- **[都道府県別時系列ダッシュボード](https://code4fukui.github.io/fdma_go_jp/)**: 全都道府県の週次傾向を比較・可視化する折れ線グラフ。
- **[都道府県別地図ダッシュボード](https://code4fukui.github.io/fdma_go_jp/pref.html)**: 最新週次データを都道府県ごとに色分けした日本地図。
- **[新型コロナウイルス相関グラフ](https://code4fukui.github.io/fdma_go_jp/withcovid19.html)**: 救急搬送困難事案数と、入院治療を要する者の数などの全国の新型コロナウイルス統計を比較するグラフ。

## データファイル

データは以下の3つの粒度レベルで処理され、次の静的URLから取得可能です。

- **全国合計**: [`emergencytransport_difficult_all.csv`](https://code4fukui.github.io/fdma_go_jp/emergencytransport_difficult_all.csv)
- **都道府県別**: [`emergencytransport_difficult_pref.csv`](https://code4fukui.github.io/fdma_go_jp/emergencytransport_difficult_pref.csv)
- **消防本部別**: [`emergencytransport_difficult.csv`](https://code4fukui.github.io/fdma_go_jp/emergencytransport_difficult.csv)

**定義**: 「救急搬送困難事案」とは、救急隊が医療機関への受入照会を4回以上行い、かつ現場滞在時間が30分以上となった事案を指し、各消防本部から総務省消防庁へ報告されたものです。

## 自動化ワークフロー

Denoスクリプトを使用してデータを最新状態に保ちます。ローカルで更新プロセスを実行するには:

1.  **ソースデータのダウンロード**  
    総務省消防庁のウェブサイトから最新の`coronavirus_data.xlsx`ファイルを取得します。
    ```bash
    deno run --allow-net download.js
    ```

2.  **処理とCSVへの変換**  
    ダウンロードしたExcelファイルを読み込み、データをクリーニングし、3つのCSVファイルを生成します。
    ```bash
    deno run --allow-read --allow-write make.js
    ```

3.  **リポジトリの更新 (メンテナー向け)**  
    更新されたデータファイルをGitHubリポジトリにコミット・プッシュします。
    ```bash
    ./gitpush.sh
    ```

## データソースとクレジット

- **主なデータソース**: [総務省消防庁 (FDMA)](https://www.fdma.go.jp/disaster/coronavirus/post-1.html)
- **新型コロナウイルスデータ**: [厚生労働省 (MHLW) オープンデータ](https://www.mhlw.go.jp/stf/covid-19/open-data.html)
- このプロジェクトは [Code for FUKUI](https://code4fukui.github.io/) がメンテナンスしています。

## ライセンス

MIT License
