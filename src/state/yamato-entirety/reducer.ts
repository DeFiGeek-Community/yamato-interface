import { createReducer } from '@reduxjs/toolkit';
import {
  fetchEvents,
  fetchRateOfEthJpy,
  fetchTokenState,
  fetchYamatoState,
  reset,
} from './actions';

export type LogEventType =
  | 'deposit'
  | 'withdrawal'
  | 'borrowing'
  | 'repay'
  | 'governance_lock'
  | 'governance_extension'
  | 'governance_withdrawal'
  | 'self_redemption'
  | 'core_redemption'
  | 'sweep';
export type LogEvent = {
  id: string;
  date?: number;
  blockNumber?: number;
  logIndex?: number;
  address: string;
  category: LogEventType;
  value: any;
};

/**
 * State over all in Yamato Contract
 */
export interface YamatoEntiretyState {
  lending: {
    // the parameters about CJPY lending.
    totalCollateral: number; // the ETH amount of collateral that the plege is holding.
    totalDebt: number; // the CJPY amount of debt that the users plege is holding.
    tvl: number; // ETH
    tcr: number; // Total Collateralization Ratio of the users plege, derived from `(totalCollateral * rateOfEthJpy / totalDebt)`
  };
  pool: {
    redemptionReserve: number; // CJPY
    prevRedemptionReserve: number; // CJPY
    sweepReserve: number; // CJPY
    prevSweepReserve: number; // CJPY
  };
  pledges: {
    redeemableCandidate: number; // CJPY
    sweepableCandidate: number; // CJPY
    isRedeemablePledge: boolean;
  };
  token: {
    cjpy: {
      totalSupply: number; // the total amount of CJPY that the Yamato protocol is supplying.
    };
    ymt: {
      totalSupply: number; // the total amount of YMT that the Yamato protocol is supplying.
    };
    veYmt: {
      totalSupply: number; // the total amount of veYMT that the Yamato protocol is supplying.
      boostRate: number;
      farmingScore: number;
    };
  };
  rateOfEthJpy: number; // the market price of ETH/JPY
  prevRateOfEthJpy: number; // the previous market price of ETH/JPY
  parameter: {
    MCR: number; // MinimumCollateralizationRatio
    RRR: number; // RedemptionReserveRate
    SRR: number; // SweepReserveRate
    GRR: number; // GasReserveRate
  };
  events: Array<LogEvent>; // the Ethereum events the users wallet has been recieved.
  firstLoadCompleted: boolean;
}

export const initialState: YamatoEntiretyState = {
  lending: { totalCollateral: 0, totalDebt: 0, tvl: 0, tcr: 0 },
  pool: {
    redemptionReserve: 0,
    prevRedemptionReserve: 0,
    sweepReserve: 0,
    prevSweepReserve: 0,
  },
  pledges: {
    redeemableCandidate: 0,
    sweepableCandidate: 0,
    isRedeemablePledge: false,
  },
  token: {
    cjpy: { totalSupply: 0 },
    ymt: { totalSupply: 0 },
    veYmt: { totalSupply: 0, boostRate: 0, farmingScore: 0 },
  },
  rateOfEthJpy: 0,
  prevRateOfEthJpy: 0,
  parameter: {
    MCR: 110,
    RRR: 80,
    SRR: 20,
    GRR: 1,
  },
  events: [],
  firstLoadCompleted: false,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(
      fetchYamatoState,
      (state, { payload: { lending, pool, parameter, pledges } }) => {
        state.lending = lending;
        state.pledges = {
          ...pledges,
          isRedeemablePledge: pledges.redeemableCandidate > 0,
        };
        state.pool = {
          ...state.pool,
          ...pool,
        };
        state.parameter = parameter;
        if (!state.firstLoadCompleted) {
          state.pool.prevRedemptionReserve = pool.redemptionReserve; // Update only once
          state.pool.prevSweepReserve = pool.sweepReserve; // Update only once
          state.firstLoadCompleted = true;
        }
      }
    )
    .addCase(fetchTokenState, (state, { payload: { cjpy, ymt, veYmt } }) => {
      const farmingScore = state.lending.totalDebt * veYmt.boostRate; // FIXME: 担保率ブースト
      const newState = { ...veYmt, farmingScore };
      state.token = { cjpy, ymt, veYmt: newState };
    })
    .addCase(fetchRateOfEthJpy, (state, { payload: { rateOfEthJpy } }) => {
      if (state.prevRateOfEthJpy === 0) {
        state.prevRateOfEthJpy = rateOfEthJpy; // Update only once
      }
      state.rateOfEthJpy = rateOfEthJpy;
    })
    .addCase(fetchEvents, (state, { payload: { events } }) => {
      const additionals = events.filter((newEvent) => {
        return !state.events.some((event) => event.id === newEvent.id);
      });
      const newState = state.events.concat(additionals).sort((a, b) => {
        // from subgraph
        if (a.date && b.date) {
          if (a.date > b.date) {
            return -1;
          } else if (a.date < b.date) {
            return 1;
          }
          return 0;
        }

        // from ethers
        if (a.blockNumber && b.blockNumber) {
          if (a.blockNumber > b.blockNumber) {
            return -1;
          } else if (a.blockNumber < b.blockNumber) {
            return 1;
          }
          // block number is the same
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          if (a.logIndex! > b.logIndex!) {
            return -1;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          } else if (a.logIndex! < b.logIndex!) {
            return 1;
          }
          return 0;
        }
        return 0;
      });
      state.events = newState;
    })
    .addCase(reset, () => initialState)
);
