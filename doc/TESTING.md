# Test

This article is for topics related to the test of this repository.

## About the accounts used in the test

The E2E test uses the following addresses:

> 0x8D440ea7d740d59c221a78708323604268666f6e

As we are concerned about the lack of ETH, we would appreciate it if you could turn on the tap or send them when you can spare it.

The following test nets are currently in use:

- Rinkeby

## DOM element identification for test

Several tests require to identify DOM elements. E2E test is an example.
In this repository, the `data-testid` attribute of the DOM element is the identifier.

Following rules must determine the value of the `data-testid` attribute.

First, the value must be determined by the context of the test.
This means that the position of the element in the hierarchy of the tree should not affect the value determination.

The structure of value is as follows:

```
<category>-<type>-<name>
```

- `category`: The category of data that the element displays or manipulates.
  - e.g. : collateral, borrowing
- `type`: The type whether the element is for `data` or `act`(action).
  - In many cases, an `input` or a `p` element has `data` type, and a `button` element has `act` type.
- `name`: The name of the thing to that the element is responsible.
  - A noun is desirable for a `data` type element. A verb is desirable for `act` type element.

The notation of these words is camel case.

Example values:

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
