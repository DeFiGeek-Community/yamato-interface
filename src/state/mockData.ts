import { LogEventType } from './yamato-entirety/reducer';

export const rateOfEthJpy = 300000 + Math.random() * 1000;

const mockState = {
  totalCollateral: 2.5 + Math.random() * 10,
  totalDebt: 1200000 + Math.random() * 100000,
  redemptionReserve: Math.random() * 100000000,
  sweepReserve: Math.random() * 10000000,
  sweepableCandiate: Math.random() * 1000,
  rateOfEthJpy,
  MCR: 110,
  RRR: 80,
  SRR: 20,
  GRR: 1,
};
export const mockYamatoEntirety = {
  yamatoParams: {
    lending: {
      totalCollateral: mockState.totalCollateral, // totalColl in Yamato.sol
      totalDebt: mockState.totalDebt, // totalDebt in Yamato.sol
      tcr:
        mockState.totalDebt > 0
          ? ((mockState.totalCollateral * mockState.rateOfEthJpy) /
              mockState.totalDebt) *
            100
          : 0,
      tvl: mockState.totalCollateral * mockState.rateOfEthJpy,
    },
    pledges: {
      redeemableCandidate: 100,
      sweepableCandidate: 50,
      isRedeemablePledge: true,
    },
    pool: {
      redemptionReserve: mockState.redemptionReserve, // redemptionReserve in Pool.sol
      sweepReserve: mockState.sweepReserve, // sweepReserve in Pool.sol
      sweepableCandiate: mockState.sweepableCandiate, // FIXME: ISSUE #27
    },
    parameter: {
      MCR: 110,
      RRR: 80,
      SRR: 20,
      GRR: 1,
    },
  },
  rateOfEthJpy: mockState.rateOfEthJpy,
};

export const mockTokenTotalSupply = {
  cjpy: { totalSupply: 1000 },
  ymt: { totalSupply: 100 },
  veYmt: { totalSupply: 10, boostRate: 1.5, farmingScore: 100 },
};

export const mockWalletBalance = { eth: 10, cjpy: 1000 };

export const mockPledge = (account: string) => ({
  [account]: {
    collateral: 3.5,
    debt: 800000,
  },
});

export const mockLogs = () => [
  {
    id: `1`,
    blockNumber: 1,
    logIndex: 1,
    address: mockAddress(),
    category: 'governance_withdrawal' as LogEventType,
    value: '10',
  },
  {
    id: `2`,
    blockNumber: 2,
    logIndex: 2,
    address: mockAddress(),
    category: 'yamato_redemption' as LogEventType,
    value: '5',
  },
  {
    id: Math.floor(Math.random() * 100).toString(),
    blockNumber: Math.floor(Math.random() * 100),
    logIndex: Math.floor(Math.random() * 10),
    address: mockAddress(),
    category: 'borrowing' as LogEventType,
    value: `${Math.floor(Math.random() * 1000)}`,
  },
  {
    id: Math.floor(Math.random() * 100).toString(),
    blockNumber: Math.floor(Math.random() * 100),
    logIndex: Math.floor(Math.random() * 10),
    address: mockAddress(),
    category: 'repay' as LogEventType,
    value: `${Math.floor(Math.random() * 100)}`,
  },
  {
    id: Math.floor(Math.random() * 100).toString(),
    blockNumber: Math.floor(Math.random() * 100),
    logIndex: Math.floor(Math.random() * 10),
    address: mockAddress(),
    category: 'withdrawal' as LogEventType,
    value: `${Math.floor(Math.random() * 10)}`,
  },
  {
    id: Math.floor(Math.random() * 100).toString(),
    blockNumber: Math.floor(Math.random() * 100),
    logIndex: Math.floor(Math.random() * 10),
    address: mockAddress(),
    category: 'deposit' as LogEventType,
    value: `${Math.floor(Math.random() * 10)}`,
  },
];

function mockAddress() {
  const S = 'abcdef0123456789';
  const N = 40;
  return [...Array(N)]
    .map(() => S[Math.floor(Math.random() * S.length)])
    .join('');
}
