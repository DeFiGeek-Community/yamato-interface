import { request, gql } from 'graphql-request';
import { DEFAULT_CHAINID, SUBGRAPH_YAMATO_URLS } from '../../constants/api';
import {
  Event,
  Pledge,
  WorldState,
} from '../../infrastructures/subgraph/yamato/schema';
import { PledgeState } from '../../state/pledge/reducer';
import {
  initialState,
  YamatoEntiretyState,
} from '../../state/yamato-entirety/reducer';
import { formatEther } from '../web3';

interface YamatoCurentState {
  worldStates: [WorldState];
  events: [Event];
  myPledge: Pledge | null;
  sweepablePledges: [Pledge];
}

/**
 * Cache to reduce the numbers of communications;
 */
let cache: {
  yamatoEntiretyState: YamatoEntiretyState;
  pledge: PledgeState['list'];
} = {
  yamatoEntiretyState: deepCopy(initialState),
  pledge: {},
};
export function getCache() {
  return cache;
}
export function resetCache() {
  cache = {
    yamatoEntiretyState: deepCopy(initialState),
    pledge: {},
  };
}

const currentStateQuery = gql`
  query yamatoCurrentState($account: ID!) {
    worldStates(first: 1) {
      id
      totalColl
      totalDebt
      MCR
      RRR
      SRR
      GRR
      redemptionReserve
      sweepReserve
      totalSupplyCjpy
      lastPrice
      priceChange
    }
    events(first: 20, orderBy: date, orderDirection: desc) {
      id
      date
      category
      ethAmount
      address
      fee
      cjpyAmount
      ymtAmount
      lockUntil
      price
      isCoreRedemption
      gasCompensationAmount
    }
    myPledge: pledge(id: $account) {
      id
      ethAmount
      borrowedCjpyAmount
    }
    sweepablePledges: pledges(where: { ethAmount: 0 }) {
      id
      ethAmount
      borrowedCjpyAmount
    }
  }
`;

export async function fetchSubgraph(
  chainId: number | undefined,
  account: string | null | undefined,
  active: boolean
) {
  // Construct param
  const activeChainId = active
    ? chainId ?? DEFAULT_CHAINID // connected wallet
    : DEFAULT_CHAINID; // Not connecting wallet
  const endpoint = SUBGRAPH_YAMATO_URLS[activeChainId];
  const variables = {
    account: account ? account.toLowerCase() : '',
  };

  // Query
  const data = await request<YamatoCurentState>(
    endpoint,
    currentStateQuery,
    variables
  );

  // Create response
  let res: YamatoEntiretyState = deepCopy(initialState);
  if (data.worldStates.length > 0) {
    res = { ...res, ...transformWorldStates(data.worldStates[0]) };
  }
  if (data.events.length > 0) {
    res = { ...res, events: transformEvents(data.events) };
  }
  if (data.sweepablePledges.length > 0) {
    res.pledges.sweepableCandidate = transformSweepablePledges(
      data.sweepablePledges
    );
  }

  // Save cache
  cache.yamatoEntiretyState = res;
  cache.pledge = data.myPledge ? transformMyPledge(data.myPledge) : {};

  return res;
}

function transformWorldStates(worldState: WorldState) {
  const newState: YamatoEntiretyState = deepCopy(initialState);

  newState.rateOfEthJpy = Number(formatEther(worldState.lastPrice ?? 0));
  // newState.prevRateOfEthJpy = worldState.priceChange ?? 0;

  // lending
  newState.lending.totalCollateral = Number(
    formatEther(worldState.totalColl ?? 0)
  );
  newState.lending.totalDebt = Number(formatEther(worldState.totalDebt ?? 0));
  newState.lending.tcr =
    newState.lending.totalDebt > 0
      ? ((newState.lending.totalCollateral * newState.rateOfEthJpy) /
          newState.lending.totalDebt) *
        100
      : 0;
  newState.lending.tvl =
    newState.lending.totalCollateral * newState.rateOfEthJpy;

  // pool
  newState.pool.redemptionReserve = Number(
    formatEther(worldState.redemptionReserve ?? 0)
  );
  newState.pool.sweepReserve = Number(
    formatEther(worldState.sweepReserve ?? 0)
  );

  // token
  newState.token.cjpy.totalSupply = Number(
    formatEther(worldState.totalSupplyCjpy ?? 0)
  );

  return newState;
}

function transformMyPledge(pledge: Pledge) {
  return {
    [pledge.id]: {
      collateral: Number(formatEther(pledge.ethAmount ?? 0)),
      debt: Number(formatEther(pledge.borrowedCjpyAmount ?? 0)),
    },
  };
}

function transformEvents(events: Event[]) {
  const newState: YamatoEntiretyState['events'] = [];

  for (const event of events) {
    switch (event.category) {
      case 'Deposit':
        newState.push({
          id: event.id,
          date: event.date,
          address: event.address,
          category: 'deposit',
          value: formatEther(event.ethAmount),
        });
        break;
      case 'Withdraw':
        newState.push({
          id: event.id,
          date: event.date,
          address: event.address,
          category: 'withdrawal',
          value: formatEther(event.ethAmount),
        });
        break;
      case 'Borrow':
        newState.push({
          id: event.id,
          date: event.date,
          address: event.address,
          category: 'borrowing',
          value: formatEther(event.cjpyAmount),
        });
        break;
      case 'Repay':
        newState.push({
          id: event.id,
          date: event.date,
          address: event.address,
          category: 'repay',
          value: formatEther(event.cjpyAmount),
        });
        break;
      case 'Redeem':
        newState.push({
          id: event.id,
          date: event.date,
          address: event.address,
          category: !event.isCoreRedemption
            ? 'self_redemption'
            : 'core_redemption',
          value: formatEther(event.gasCompensationAmount),
        });
        break;
      case 'Sweep':
        newState.push({
          id: event.id,
          date: event.date,
          address: event.address,
          category: 'sweep',
          value: formatEther(event.gasCompensationAmount),
        });
        break;
    }
  }

  return newState;
}

function transformSweepablePledges(sweepablePledges: Pledge[]) {
  return sweepablePledges.reduce(
    (prev, curr) => prev + Number(formatEther(curr.borrowedCjpyAmount ?? 0)),
    0
  );
}

function deepCopy(state: YamatoEntiretyState): YamatoEntiretyState {
  return {
    ...state,
    lending: { ...state.lending },
    pledges: { ...state.pledges },
    pool: { ...state.pool },
    token: {
      cjpy: { ...state.token.cjpy },
      ymt: { ...state.token.ymt },
      veYmt: { ...state.token.veYmt },
    },
  };
}
