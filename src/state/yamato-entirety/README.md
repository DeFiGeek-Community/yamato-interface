
# yamato-entirety

`yamato-entirety` is a store for the parameters of the Yamato Protocol.
The parameters defined as a interface `YamatoEntiretyState` in `reducer.ts`.

## interface: YamatoEntiretyState

The parameters means as follows:

- `lending`: object; the parameters about CJPY lending.
    - `totalCollateral`: number; the ETH amount of collateral that the plege is holding.
    - `totalDebt`: number; the CJPY amount of debt that the users plege is holding.
    - `tvl`: number; 
    - `tcr`: number; Total Collateralization Ratio of the users plege, derived from `(totalCollateral * rateOfEthJpy / totalDebt)`
- `pool`: object; the parameters about
    - redemptionReserve: number; the CJPY amount
    - prevRedemptionReserve: number; the CJPY amount
    - sweepReserve: number; the CJPY amount
    - prevSweepReserve: number; the CJPY amount
    - sweepableCandiate: number; the ETH amount
- `token`: object; the parameters
    - `cjpy`: object;
        - `totalSupply`: number ; the total amount of CJPY that the Yamato protocol is supplying.
    - `ymt`: object;
        - `totalSupply`: number ; the total amount of YMT that the Yamato protocol is supplying.
    - `veYmt`: object;
        - `totalSupply`: number ; the total amount of veYMT that the Yamato protocol is supplying.
        - `boostRate`: number;
        - `farmingScore`: number;
- `rateOfEthJpy`: number; the market price of ETH/JPY
- `prevRateOfEthJpy`: number; the previous market price of ETH/JPY
- `events`: Array<LogEvent>; the Ethereum events the users wallet has been recieved.
