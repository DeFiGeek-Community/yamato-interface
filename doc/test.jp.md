# テストについて

本稿では本レポジトリに含まれるテストコードに関連する事柄について述べる。

## テストで使用するアカウントについて

E2E テストでは以下のアドレスを使用している。

> 0x8D440ea7d740d59c221a78708323604268666f6e

ETH の不足が懸念されるので、余裕のある時に蛇口を捻ったり送金していただけると助かる。

なお現在以下のテストネットを使用している:

- Rinkeby

## テストのための DOM 要素の識別

E2E テスト等、いくつかのテストでは DOM 要素を識別する必要がある。
本レポジトリではこれを、当該要素の `data-testid` 属性に一意の値を割り振ることによって可能にする。

この属性の値の決定規則は以下の通り。

あくまでテスト側の要請から値を決定する。 DOM 要素の階層などは考慮しない。

値の構造は以下の通り。

```
<category>-<type>-<name>
```

- `category`: その要素が表示したり操作するデータの種類
  - 例: collateral, borrowing
- `type`: その要素が担うのが data か、 act(action) か
  - 大体 input や p 要素などが data, button は act
- `name`: その要素が担うものの名前
  - data であるものは名詞、 action であるものは動詞が望ましい
  -

複数単語を使用する場合、全てキャメルケースにて記述する。

本規則に基づいた名前の例:

- collateral-data-depositAmount
- collateral-act-deposit
- collateral-data-withdrawalAmount
- collateral-act-withdraw
- collateral-data-currentAmount
- borrowing-data-borrowAmount
- borrowing-act-borrow
- borrowing-data-repayAmount
- borrowing-act-repay
- borrowing-data-currentAmount
