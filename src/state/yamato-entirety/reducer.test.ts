import { Store, createStore } from '@reduxjs/toolkit';
import {
  fetchEvents,
  fetchRateOfEthJpy,
  fetchTokenState,
  fetchYamatoState,
  reset,
} from './actions';
import reducer, {
  initialState,
  LogEvent,
  YamatoEntiretyState,
} from './reducer';

describe('yamato-entirety reducer', () => {
  let store: Store<YamatoEntiretyState>;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it('has correct initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  describe('fetchYamatoState', () => {
    it('fetch Yamato State', () => {
      const newState = {
        lending: { totalCollateral: 10, totalDebt: 5, tvl: 11, tcr: 110 },
        pledges: {
          redeemableCandidate: 100,
          sweepableCandidate: 50,
          isRedeemablePledge: true,
        },
        pool: {
          redemptionReserve: 2,
          sweepReserve: 1,
        },
        parameter: {
          MCR: 110,
          RRR: 80,
          SRR: 20,
          GRR: 1,
        },
        firstLoadCompleted: true,
      };

      store.dispatch(fetchYamatoState(newState));
      expect(store.getState()).toEqual({
        ...initialState,
        ...newState,
        pool: {
          ...newState.pool,
          ...{
            prevRedemptionReserve: newState.pool.redemptionReserve,
            prevSweepReserve: newState.pool.sweepReserve,
          },
        },
      });
    });

    it('shoud be that prev reserves set only first', () => {
      const firstState = {
        ...initialState,
        pool: {
          redemptionReserve: 2,
          sweepReserve: 1,
        },
      };

      // initial
      expect(store.getState().pool.prevRedemptionReserve).toBe(0);
      expect(store.getState().pool.prevSweepReserve).toBe(0);

      // first time
      store.dispatch(fetchYamatoState(firstState));
      expect(store.getState().pool.prevRedemptionReserve).toBe(
        firstState.pool.redemptionReserve
      );
      expect(store.getState().pool.prevSweepReserve).toBe(
        firstState.pool.sweepReserve
      );

      // second time
      const secondState = {
        ...firstState,
        pool: {
          redemptionReserve: 3,
          sweepReserve: 2,
        },
      };
      store.dispatch(fetchYamatoState(secondState));
      expect(store.getState().pool.prevRedemptionReserve).toBe(
        firstState.pool.redemptionReserve
      );
      expect(store.getState().pool.prevSweepReserve).toBe(
        firstState.pool.sweepReserve
      );
    });
  });

  describe('fetchTokenState', () => {
    it('fetch Token State', () => {
      const newState = {
        token: {
          cjpy: { totalSupply: 1000 },
          ymt: { totalSupply: 100 },
          veYmt: { totalSupply: 10, boostRate: 1.5, farmingScore: 100 },
        },
      };

      store.dispatch(fetchTokenState(newState.token));

      (newState.token.veYmt as any).farmingScore =
        initialState.lending.totalDebt * newState.token.veYmt.boostRate;
      expect(store.getState()).toEqual({ ...initialState, ...newState });
    });
  });

  describe('fetchRateOfEthJpy', () => {
    it('fetch Rate Of EthJpy', () => {
      expect(store.getState().rateOfEthJpy).toBe(0);

      store.dispatch(fetchRateOfEthJpy({ rateOfEthJpy: 10 }));
      expect(store.getState().rateOfEthJpy).toBe(10);
    });

    it('shoud be that prevRateOfEthJpy sets only first', () => {
      // initial
      expect(store.getState()).toEqual({
        ...initialState,
        rateOfEthJpy: 0,
        prevRateOfEthJpy: 0,
      });

      // first time
      store.dispatch(fetchRateOfEthJpy({ rateOfEthJpy: 10 }));
      expect(store.getState()).toEqual({
        ...initialState,
        rateOfEthJpy: 10,
        prevRateOfEthJpy: 10,
      });

      // second time
      store.dispatch(fetchRateOfEthJpy({ rateOfEthJpy: 11 }));
      expect(store.getState()).toEqual({
        ...initialState,
        rateOfEthJpy: 11,
        prevRateOfEthJpy: 10,
      });
    });
  });

  describe('fetchEvents', () => {
    it('fetch Events', () => {
      const events = [{ blockNumber: 1 }, { blockNumber: 2 }] as LogEvent[];
      store.dispatch(fetchEvents({ events }));
      expect(store.getState()).toEqual({
        ...initialState,
        events: events.reverse(),
      });
    });
  });

  describe('reset', () => {
    it('reset', () => {
      const newState = {
        lending: { totalCollateral: 10, totalDebt: 5, tvl: 11, tcr: 110 },
        pledges: {
          redeemableCandidate: 100,
          sweepableCandidate: 50,
          isRedeemablePledge: true,
        },
        pool: {
          redemptionReserve: 2,
          sweepReserve: 1,
        },
        parameter: {
          MCR: 110,
          RRR: 80,
          SRR: 20,
          GRR: 1,
        },
      };
      store.dispatch(fetchYamatoState(newState));
      expect(store.getState().firstLoadCompleted).toBe(true);

      store.dispatch(reset());
      expect(store.getState().firstLoadCompleted).toBe(false);
    });
  });
});
