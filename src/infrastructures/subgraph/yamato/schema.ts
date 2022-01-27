export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
  number_gte?: Maybe<Scalars['Int']>;
};

export type Borrow = {
  address?: Maybe<Scalars['Bytes']>;
  cjpyAmount?: Maybe<Scalars['BigInt']>;
  date: Scalars['BigInt'];
  fee?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
};

export type Borrow_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  cjpyAmount?: Maybe<Scalars['BigInt']>;
  cjpyAmount_gt?: Maybe<Scalars['BigInt']>;
  cjpyAmount_gte?: Maybe<Scalars['BigInt']>;
  cjpyAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  cjpyAmount_lt?: Maybe<Scalars['BigInt']>;
  cjpyAmount_lte?: Maybe<Scalars['BigInt']>;
  cjpyAmount_not?: Maybe<Scalars['BigInt']>;
  cjpyAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  fee?: Maybe<Scalars['BigInt']>;
  fee_gt?: Maybe<Scalars['BigInt']>;
  fee_gte?: Maybe<Scalars['BigInt']>;
  fee_in?: Maybe<Array<Scalars['BigInt']>>;
  fee_lt?: Maybe<Scalars['BigInt']>;
  fee_lte?: Maybe<Scalars['BigInt']>;
  fee_not?: Maybe<Scalars['BigInt']>;
  fee_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Borrow_OrderBy {
  Address = 'address',
  CjpyAmount = 'cjpyAmount',
  Date = 'date',
  Fee = 'fee',
  Id = 'id',
}

export enum Category {
  Borrow = 'Borrow',
  Deposit = 'Deposit',
  IncreaseYmtLockTime = 'IncreaseYMTLockTime',
  LockYmt = 'LockYMT',
  Redeem = 'Redeem',
  Repay = 'Repay',
  Sweep = 'Sweep',
  Withdraw = 'Withdraw',
  WithrawYmt = 'WithrawYMT',
}

export type Deposit = {
  address?: Maybe<Scalars['Bytes']>;
  date: Scalars['BigInt'];
  ethAmount?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
};

export type Deposit_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  ethAmount?: Maybe<Scalars['BigInt']>;
  ethAmount_gt?: Maybe<Scalars['BigInt']>;
  ethAmount_gte?: Maybe<Scalars['BigInt']>;
  ethAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  ethAmount_lt?: Maybe<Scalars['BigInt']>;
  ethAmount_lte?: Maybe<Scalars['BigInt']>;
  ethAmount_not?: Maybe<Scalars['BigInt']>;
  ethAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Deposit_OrderBy {
  Address = 'address',
  Date = 'date',
  EthAmount = 'ethAmount',
  Id = 'id',
}

export type Event = Borrow &
  Deposit &
  IncreaseYmtLockTime &
  LockYmt &
  Redeem &
  Repay &
  Sweep &
  Withdraw & {
    __typename?: 'Event';
    address?: Maybe<Scalars['Bytes']>;
    category?: Maybe<Category>;
    cjpyAmount?: Maybe<Scalars['BigInt']>;
    date: Scalars['BigInt'];
    ethAmount?: Maybe<Scalars['BigInt']>;
    fee?: Maybe<Scalars['BigInt']>;
    gasCompensationAmount?: Maybe<Scalars['BigInt']>;
    id: Scalars['ID'];
    isCoreRedemption?: Maybe<Scalars['Boolean']>;
    lockUntil?: Maybe<Scalars['Int']>;
    price?: Maybe<Scalars['BigInt']>;
    redeemedAddressList?: Maybe<Array<Scalars['Bytes']>>;
    sweepedAddressList?: Maybe<Array<Scalars['Bytes']>>;
    ymtAmount?: Maybe<Scalars['BigInt']>;
  };

export type Event_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  category?: Maybe<Category>;
  category_in?: Maybe<Array<Category>>;
  category_not?: Maybe<Category>;
  category_not_in?: Maybe<Array<Category>>;
  cjpyAmount?: Maybe<Scalars['BigInt']>;
  cjpyAmount_gt?: Maybe<Scalars['BigInt']>;
  cjpyAmount_gte?: Maybe<Scalars['BigInt']>;
  cjpyAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  cjpyAmount_lt?: Maybe<Scalars['BigInt']>;
  cjpyAmount_lte?: Maybe<Scalars['BigInt']>;
  cjpyAmount_not?: Maybe<Scalars['BigInt']>;
  cjpyAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  ethAmount?: Maybe<Scalars['BigInt']>;
  ethAmount_gt?: Maybe<Scalars['BigInt']>;
  ethAmount_gte?: Maybe<Scalars['BigInt']>;
  ethAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  ethAmount_lt?: Maybe<Scalars['BigInt']>;
  ethAmount_lte?: Maybe<Scalars['BigInt']>;
  ethAmount_not?: Maybe<Scalars['BigInt']>;
  ethAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  fee?: Maybe<Scalars['BigInt']>;
  fee_gt?: Maybe<Scalars['BigInt']>;
  fee_gte?: Maybe<Scalars['BigInt']>;
  fee_in?: Maybe<Array<Scalars['BigInt']>>;
  fee_lt?: Maybe<Scalars['BigInt']>;
  fee_lte?: Maybe<Scalars['BigInt']>;
  fee_not?: Maybe<Scalars['BigInt']>;
  fee_not_in?: Maybe<Array<Scalars['BigInt']>>;
  gasCompensationAmount?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_gt?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_gte?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  gasCompensationAmount_lt?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_lte?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_not?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  isCoreRedemption?: Maybe<Scalars['Boolean']>;
  isCoreRedemption_in?: Maybe<Array<Scalars['Boolean']>>;
  isCoreRedemption_not?: Maybe<Scalars['Boolean']>;
  isCoreRedemption_not_in?: Maybe<Array<Scalars['Boolean']>>;
  lockUntil?: Maybe<Scalars['Int']>;
  lockUntil_gt?: Maybe<Scalars['Int']>;
  lockUntil_gte?: Maybe<Scalars['Int']>;
  lockUntil_in?: Maybe<Array<Scalars['Int']>>;
  lockUntil_lt?: Maybe<Scalars['Int']>;
  lockUntil_lte?: Maybe<Scalars['Int']>;
  lockUntil_not?: Maybe<Scalars['Int']>;
  lockUntil_not_in?: Maybe<Array<Scalars['Int']>>;
  price?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
  redeemedAddressList?: Maybe<Array<Scalars['Bytes']>>;
  redeemedAddressList_contains?: Maybe<Array<Scalars['Bytes']>>;
  redeemedAddressList_not?: Maybe<Array<Scalars['Bytes']>>;
  redeemedAddressList_not_contains?: Maybe<Array<Scalars['Bytes']>>;
  sweepedAddressList?: Maybe<Array<Scalars['Bytes']>>;
  sweepedAddressList_contains?: Maybe<Array<Scalars['Bytes']>>;
  sweepedAddressList_not?: Maybe<Array<Scalars['Bytes']>>;
  sweepedAddressList_not_contains?: Maybe<Array<Scalars['Bytes']>>;
  ymtAmount?: Maybe<Scalars['BigInt']>;
  ymtAmount_gt?: Maybe<Scalars['BigInt']>;
  ymtAmount_gte?: Maybe<Scalars['BigInt']>;
  ymtAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  ymtAmount_lt?: Maybe<Scalars['BigInt']>;
  ymtAmount_lte?: Maybe<Scalars['BigInt']>;
  ymtAmount_not?: Maybe<Scalars['BigInt']>;
  ymtAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Event_OrderBy {
  Address = 'address',
  Category = 'category',
  CjpyAmount = 'cjpyAmount',
  Date = 'date',
  EthAmount = 'ethAmount',
  Fee = 'fee',
  GasCompensationAmount = 'gasCompensationAmount',
  Id = 'id',
  IsCoreRedemption = 'isCoreRedemption',
  LockUntil = 'lockUntil',
  Price = 'price',
  RedeemedAddressList = 'redeemedAddressList',
  SweepedAddressList = 'sweepedAddressList',
  YmtAmount = 'ymtAmount',
}

export type IncreaseYmtLockTime = {
  address?: Maybe<Scalars['Bytes']>;
  date: Scalars['BigInt'];
  id: Scalars['ID'];
  lockUntil?: Maybe<Scalars['Int']>;
};

export type IncreaseYmtLockTime_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lockUntil?: Maybe<Scalars['Int']>;
  lockUntil_gt?: Maybe<Scalars['Int']>;
  lockUntil_gte?: Maybe<Scalars['Int']>;
  lockUntil_in?: Maybe<Array<Scalars['Int']>>;
  lockUntil_lt?: Maybe<Scalars['Int']>;
  lockUntil_lte?: Maybe<Scalars['Int']>;
  lockUntil_not?: Maybe<Scalars['Int']>;
  lockUntil_not_in?: Maybe<Array<Scalars['Int']>>;
};

export enum IncreaseYmtLockTime_OrderBy {
  Address = 'address',
  Date = 'date',
  Id = 'id',
  LockUntil = 'lockUntil',
}

export type LockYmt = {
  address?: Maybe<Scalars['Bytes']>;
  date: Scalars['BigInt'];
  id: Scalars['ID'];
  lockUntil?: Maybe<Scalars['Int']>;
  ymtAmount?: Maybe<Scalars['BigInt']>;
};

export type LockYmt_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lockUntil?: Maybe<Scalars['Int']>;
  lockUntil_gt?: Maybe<Scalars['Int']>;
  lockUntil_gte?: Maybe<Scalars['Int']>;
  lockUntil_in?: Maybe<Array<Scalars['Int']>>;
  lockUntil_lt?: Maybe<Scalars['Int']>;
  lockUntil_lte?: Maybe<Scalars['Int']>;
  lockUntil_not?: Maybe<Scalars['Int']>;
  lockUntil_not_in?: Maybe<Array<Scalars['Int']>>;
  ymtAmount?: Maybe<Scalars['BigInt']>;
  ymtAmount_gt?: Maybe<Scalars['BigInt']>;
  ymtAmount_gte?: Maybe<Scalars['BigInt']>;
  ymtAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  ymtAmount_lt?: Maybe<Scalars['BigInt']>;
  ymtAmount_lte?: Maybe<Scalars['BigInt']>;
  ymtAmount_not?: Maybe<Scalars['BigInt']>;
  ymtAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum LockYmt_OrderBy {
  Address = 'address',
  Date = 'date',
  Id = 'id',
  LockUntil = 'lockUntil',
  YmtAmount = 'ymtAmount',
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Pledge = {
  __typename?: 'Pledge';
  borrowedCjpyAmount: Scalars['BigInt'];
  ethAmount?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
};

export type Pledge_Filter = {
  borrowedCjpyAmount?: Maybe<Scalars['BigInt']>;
  borrowedCjpyAmount_gt?: Maybe<Scalars['BigInt']>;
  borrowedCjpyAmount_gte?: Maybe<Scalars['BigInt']>;
  borrowedCjpyAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  borrowedCjpyAmount_lt?: Maybe<Scalars['BigInt']>;
  borrowedCjpyAmount_lte?: Maybe<Scalars['BigInt']>;
  borrowedCjpyAmount_not?: Maybe<Scalars['BigInt']>;
  borrowedCjpyAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  ethAmount?: Maybe<Scalars['BigInt']>;
  ethAmount_gt?: Maybe<Scalars['BigInt']>;
  ethAmount_gte?: Maybe<Scalars['BigInt']>;
  ethAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  ethAmount_lt?: Maybe<Scalars['BigInt']>;
  ethAmount_lte?: Maybe<Scalars['BigInt']>;
  ethAmount_not?: Maybe<Scalars['BigInt']>;
  ethAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Pledge_OrderBy {
  BorrowedCjpyAmount = 'borrowedCjpyAmount',
  EthAmount = 'ethAmount',
  Id = 'id',
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  borrow?: Maybe<Borrow>;
  borrows: Array<Borrow>;
  deposit?: Maybe<Deposit>;
  deposits: Array<Deposit>;
  event?: Maybe<Event>;
  events: Array<Event>;
  increaseYMTLockTime?: Maybe<IncreaseYmtLockTime>;
  increaseYMTLockTimes: Array<IncreaseYmtLockTime>;
  lockYMT?: Maybe<LockYmt>;
  lockYMTs: Array<LockYmt>;
  pledge?: Maybe<Pledge>;
  pledges: Array<Pledge>;
  redeem?: Maybe<Redeem>;
  redeems: Array<Redeem>;
  repay?: Maybe<Repay>;
  repays: Array<Repay>;
  sweep?: Maybe<Sweep>;
  sweeps: Array<Sweep>;
  withdraw?: Maybe<Withdraw>;
  withdraws: Array<Withdraw>;
  withrawYMT?: Maybe<WithrawYmt>;
  withrawYMTs: Array<WithrawYmt>;
  worldState?: Maybe<WorldState>;
  worldStates: Array<WorldState>;
};

export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type QueryBorrowArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBorrowsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Borrow_Filter>;
};

export type QueryDepositArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryDepositsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Deposit_Filter>;
};

export type QueryEventArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryEventsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Event_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Event_Filter>;
};

export type QueryIncreaseYmtLockTimeArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryIncreaseYmtLockTimesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncreaseYmtLockTime_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<IncreaseYmtLockTime_Filter>;
};

export type QueryLockYmtArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLockYmTsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LockYmt_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<LockYmt_Filter>;
};

export type QueryPledgeArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPledgesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pledge_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Pledge_Filter>;
};

export type QueryRedeemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRedeemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Redeem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Redeem_Filter>;
};

export type QueryRepayArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryRepaysArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Repay_Filter>;
};

export type QuerySweepArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySweepsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Sweep_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Sweep_Filter>;
};

export type QueryWithdrawArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWithdrawsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Withdraw_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Withdraw_Filter>;
};

export type QueryWithrawYmtArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWithrawYmTsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<WithrawYmt_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<WithrawYmt_Filter>;
};

export type QueryWorldStateArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryWorldStatesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<WorldState_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<WorldState_Filter>;
};

export type Redeem = {
  address?: Maybe<Scalars['Bytes']>;
  cjpyAmount?: Maybe<Scalars['BigInt']>;
  date: Scalars['BigInt'];
  ethAmount?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
  isCoreRedemption?: Maybe<Scalars['Boolean']>;
  price?: Maybe<Scalars['BigInt']>;
};

export type Redeem_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  cjpyAmount?: Maybe<Scalars['BigInt']>;
  cjpyAmount_gt?: Maybe<Scalars['BigInt']>;
  cjpyAmount_gte?: Maybe<Scalars['BigInt']>;
  cjpyAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  cjpyAmount_lt?: Maybe<Scalars['BigInt']>;
  cjpyAmount_lte?: Maybe<Scalars['BigInt']>;
  cjpyAmount_not?: Maybe<Scalars['BigInt']>;
  cjpyAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  ethAmount?: Maybe<Scalars['BigInt']>;
  ethAmount_gt?: Maybe<Scalars['BigInt']>;
  ethAmount_gte?: Maybe<Scalars['BigInt']>;
  ethAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  ethAmount_lt?: Maybe<Scalars['BigInt']>;
  ethAmount_lte?: Maybe<Scalars['BigInt']>;
  ethAmount_not?: Maybe<Scalars['BigInt']>;
  ethAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  gasCompensationAmount?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_gt?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_gte?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  gasCompensationAmount_lt?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_lte?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_not?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  isCoreRedemption?: Maybe<Scalars['Boolean']>;
  isCoreRedemption_in?: Maybe<Array<Scalars['Boolean']>>;
  isCoreRedemption_not?: Maybe<Scalars['Boolean']>;
  isCoreRedemption_not_in?: Maybe<Array<Scalars['Boolean']>>;
  price?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Redeem_OrderBy {
  Address = 'address',
  CjpyAmount = 'cjpyAmount',
  Date = 'date',
  EthAmount = 'ethAmount',
  GasCompensationAmount = 'gasCompensationAmount',
  Id = 'id',
  IsCoreRedemption = 'isCoreRedemption',
  Price = 'price',
}

export type Repay = {
  address?: Maybe<Scalars['Bytes']>;
  cjpyAmount?: Maybe<Scalars['BigInt']>;
  date: Scalars['BigInt'];
  id: Scalars['ID'];
};

export type Repay_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  cjpyAmount?: Maybe<Scalars['BigInt']>;
  cjpyAmount_gt?: Maybe<Scalars['BigInt']>;
  cjpyAmount_gte?: Maybe<Scalars['BigInt']>;
  cjpyAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  cjpyAmount_lt?: Maybe<Scalars['BigInt']>;
  cjpyAmount_lte?: Maybe<Scalars['BigInt']>;
  cjpyAmount_not?: Maybe<Scalars['BigInt']>;
  cjpyAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Repay_OrderBy {
  Address = 'address',
  CjpyAmount = 'cjpyAmount',
  Date = 'date',
  Id = 'id',
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  borrow?: Maybe<Borrow>;
  borrows: Array<Borrow>;
  deposit?: Maybe<Deposit>;
  deposits: Array<Deposit>;
  event?: Maybe<Event>;
  events: Array<Event>;
  increaseYMTLockTime?: Maybe<IncreaseYmtLockTime>;
  increaseYMTLockTimes: Array<IncreaseYmtLockTime>;
  lockYMT?: Maybe<LockYmt>;
  lockYMTs: Array<LockYmt>;
  pledge?: Maybe<Pledge>;
  pledges: Array<Pledge>;
  redeem?: Maybe<Redeem>;
  redeems: Array<Redeem>;
  repay?: Maybe<Repay>;
  repays: Array<Repay>;
  sweep?: Maybe<Sweep>;
  sweeps: Array<Sweep>;
  withdraw?: Maybe<Withdraw>;
  withdraws: Array<Withdraw>;
  withrawYMT?: Maybe<WithrawYmt>;
  withrawYMTs: Array<WithrawYmt>;
  worldState?: Maybe<WorldState>;
  worldStates: Array<WorldState>;
};

export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type SubscriptionBorrowArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBorrowsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Borrow_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Borrow_Filter>;
};

export type SubscriptionDepositArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionDepositsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Deposit_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Deposit_Filter>;
};

export type SubscriptionEventArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionEventsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Event_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Event_Filter>;
};

export type SubscriptionIncreaseYmtLockTimeArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionIncreaseYmtLockTimesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<IncreaseYmtLockTime_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<IncreaseYmtLockTime_Filter>;
};

export type SubscriptionLockYmtArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLockYmTsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LockYmt_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<LockYmt_Filter>;
};

export type SubscriptionPledgeArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPledgesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Pledge_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Pledge_Filter>;
};

export type SubscriptionRedeemArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRedeemsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Redeem_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Redeem_Filter>;
};

export type SubscriptionRepayArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionRepaysArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Repay_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Repay_Filter>;
};

export type SubscriptionSweepArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSweepsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Sweep_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Sweep_Filter>;
};

export type SubscriptionWithdrawArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWithdrawsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Withdraw_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<Withdraw_Filter>;
};

export type SubscriptionWithrawYmtArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWithrawYmTsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<WithrawYmt_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<WithrawYmt_Filter>;
};

export type SubscriptionWorldStateArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionWorldStatesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<WorldState_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: Maybe<WorldState_Filter>;
};

export type Sweep = {
  address?: Maybe<Scalars['Bytes']>;
  cjpyAmount?: Maybe<Scalars['BigInt']>;
  date: Scalars['BigInt'];
  gasCompensationAmount?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
  sweepedAddressList?: Maybe<Array<Scalars['Bytes']>>;
};

export type Sweep_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  cjpyAmount?: Maybe<Scalars['BigInt']>;
  cjpyAmount_gt?: Maybe<Scalars['BigInt']>;
  cjpyAmount_gte?: Maybe<Scalars['BigInt']>;
  cjpyAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  cjpyAmount_lt?: Maybe<Scalars['BigInt']>;
  cjpyAmount_lte?: Maybe<Scalars['BigInt']>;
  cjpyAmount_not?: Maybe<Scalars['BigInt']>;
  cjpyAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  gasCompensationAmount?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_gt?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_gte?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  gasCompensationAmount_lt?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_lte?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_not?: Maybe<Scalars['BigInt']>;
  gasCompensationAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  sweepedAddressList?: Maybe<Array<Scalars['Bytes']>>;
  sweepedAddressList_contains?: Maybe<Array<Scalars['Bytes']>>;
  sweepedAddressList_not?: Maybe<Array<Scalars['Bytes']>>;
  sweepedAddressList_not_contains?: Maybe<Array<Scalars['Bytes']>>;
};

export enum Sweep_OrderBy {
  Address = 'address',
  CjpyAmount = 'cjpyAmount',
  Date = 'date',
  GasCompensationAmount = 'gasCompensationAmount',
  Id = 'id',
  SweepedAddressList = 'sweepedAddressList',
}

export type Withdraw = {
  address?: Maybe<Scalars['Bytes']>;
  date: Scalars['BigInt'];
  ethAmount?: Maybe<Scalars['BigInt']>;
  id: Scalars['ID'];
};

export type Withdraw_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  ethAmount?: Maybe<Scalars['BigInt']>;
  ethAmount_gt?: Maybe<Scalars['BigInt']>;
  ethAmount_gte?: Maybe<Scalars['BigInt']>;
  ethAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  ethAmount_lt?: Maybe<Scalars['BigInt']>;
  ethAmount_lte?: Maybe<Scalars['BigInt']>;
  ethAmount_not?: Maybe<Scalars['BigInt']>;
  ethAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Withdraw_OrderBy {
  Address = 'address',
  Date = 'date',
  EthAmount = 'ethAmount',
  Id = 'id',
}

export type WithrawYmt = {
  address?: Maybe<Scalars['Bytes']>;
  date: Scalars['BigInt'];
  id: Scalars['ID'];
  ymtAmount?: Maybe<Scalars['BigInt']>;
};

export type WithrawYmt_Filter = {
  address?: Maybe<Scalars['Bytes']>;
  address_contains?: Maybe<Scalars['Bytes']>;
  address_in?: Maybe<Array<Scalars['Bytes']>>;
  address_not?: Maybe<Scalars['Bytes']>;
  address_not_contains?: Maybe<Scalars['Bytes']>;
  address_not_in?: Maybe<Array<Scalars['Bytes']>>;
  date?: Maybe<Scalars['BigInt']>;
  date_gt?: Maybe<Scalars['BigInt']>;
  date_gte?: Maybe<Scalars['BigInt']>;
  date_in?: Maybe<Array<Scalars['BigInt']>>;
  date_lt?: Maybe<Scalars['BigInt']>;
  date_lte?: Maybe<Scalars['BigInt']>;
  date_not?: Maybe<Scalars['BigInt']>;
  date_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  ymtAmount?: Maybe<Scalars['BigInt']>;
  ymtAmount_gt?: Maybe<Scalars['BigInt']>;
  ymtAmount_gte?: Maybe<Scalars['BigInt']>;
  ymtAmount_in?: Maybe<Array<Scalars['BigInt']>>;
  ymtAmount_lt?: Maybe<Scalars['BigInt']>;
  ymtAmount_lte?: Maybe<Scalars['BigInt']>;
  ymtAmount_not?: Maybe<Scalars['BigInt']>;
  ymtAmount_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum WithrawYmt_OrderBy {
  Address = 'address',
  Date = 'date',
  Id = 'id',
  YmtAmount = 'ymtAmount',
}

export type WorldState = {
  __typename?: 'WorldState';
  GRR: Scalars['BigInt'];
  MCR: Scalars['BigInt'];
  RRR: Scalars['BigInt'];
  SRR: Scalars['BigInt'];
  id: Scalars['ID'];
  lastPrice: Scalars['BigInt'];
  priceChange?: Maybe<Scalars['BigDecimal']>;
  redemptionReserve?: Maybe<Scalars['BigInt']>;
  sweepReserve?: Maybe<Scalars['BigInt']>;
  totalColl: Scalars['BigInt'];
  totalDebt: Scalars['BigInt'];
  totalSupplyCjpy?: Maybe<Scalars['BigInt']>;
};

export type WorldState_Filter = {
  GRR?: Maybe<Scalars['BigInt']>;
  GRR_gt?: Maybe<Scalars['BigInt']>;
  GRR_gte?: Maybe<Scalars['BigInt']>;
  GRR_in?: Maybe<Array<Scalars['BigInt']>>;
  GRR_lt?: Maybe<Scalars['BigInt']>;
  GRR_lte?: Maybe<Scalars['BigInt']>;
  GRR_not?: Maybe<Scalars['BigInt']>;
  GRR_not_in?: Maybe<Array<Scalars['BigInt']>>;
  MCR?: Maybe<Scalars['BigInt']>;
  MCR_gt?: Maybe<Scalars['BigInt']>;
  MCR_gte?: Maybe<Scalars['BigInt']>;
  MCR_in?: Maybe<Array<Scalars['BigInt']>>;
  MCR_lt?: Maybe<Scalars['BigInt']>;
  MCR_lte?: Maybe<Scalars['BigInt']>;
  MCR_not?: Maybe<Scalars['BigInt']>;
  MCR_not_in?: Maybe<Array<Scalars['BigInt']>>;
  RRR?: Maybe<Scalars['BigInt']>;
  RRR_gt?: Maybe<Scalars['BigInt']>;
  RRR_gte?: Maybe<Scalars['BigInt']>;
  RRR_in?: Maybe<Array<Scalars['BigInt']>>;
  RRR_lt?: Maybe<Scalars['BigInt']>;
  RRR_lte?: Maybe<Scalars['BigInt']>;
  RRR_not?: Maybe<Scalars['BigInt']>;
  RRR_not_in?: Maybe<Array<Scalars['BigInt']>>;
  SRR?: Maybe<Scalars['BigInt']>;
  SRR_gt?: Maybe<Scalars['BigInt']>;
  SRR_gte?: Maybe<Scalars['BigInt']>;
  SRR_in?: Maybe<Array<Scalars['BigInt']>>;
  SRR_lt?: Maybe<Scalars['BigInt']>;
  SRR_lte?: Maybe<Scalars['BigInt']>;
  SRR_not?: Maybe<Scalars['BigInt']>;
  SRR_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  lastPrice?: Maybe<Scalars['BigInt']>;
  lastPrice_gt?: Maybe<Scalars['BigInt']>;
  lastPrice_gte?: Maybe<Scalars['BigInt']>;
  lastPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  lastPrice_lt?: Maybe<Scalars['BigInt']>;
  lastPrice_lte?: Maybe<Scalars['BigInt']>;
  lastPrice_not?: Maybe<Scalars['BigInt']>;
  lastPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  priceChange?: Maybe<Scalars['BigDecimal']>;
  priceChange_gt?: Maybe<Scalars['BigDecimal']>;
  priceChange_gte?: Maybe<Scalars['BigDecimal']>;
  priceChange_in?: Maybe<Array<Scalars['BigDecimal']>>;
  priceChange_lt?: Maybe<Scalars['BigDecimal']>;
  priceChange_lte?: Maybe<Scalars['BigDecimal']>;
  priceChange_not?: Maybe<Scalars['BigDecimal']>;
  priceChange_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  redemptionReserve?: Maybe<Scalars['BigInt']>;
  redemptionReserve_gt?: Maybe<Scalars['BigInt']>;
  redemptionReserve_gte?: Maybe<Scalars['BigInt']>;
  redemptionReserve_in?: Maybe<Array<Scalars['BigInt']>>;
  redemptionReserve_lt?: Maybe<Scalars['BigInt']>;
  redemptionReserve_lte?: Maybe<Scalars['BigInt']>;
  redemptionReserve_not?: Maybe<Scalars['BigInt']>;
  redemptionReserve_not_in?: Maybe<Array<Scalars['BigInt']>>;
  sweepReserve?: Maybe<Scalars['BigInt']>;
  sweepReserve_gt?: Maybe<Scalars['BigInt']>;
  sweepReserve_gte?: Maybe<Scalars['BigInt']>;
  sweepReserve_in?: Maybe<Array<Scalars['BigInt']>>;
  sweepReserve_lt?: Maybe<Scalars['BigInt']>;
  sweepReserve_lte?: Maybe<Scalars['BigInt']>;
  sweepReserve_not?: Maybe<Scalars['BigInt']>;
  sweepReserve_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalColl?: Maybe<Scalars['BigInt']>;
  totalColl_gt?: Maybe<Scalars['BigInt']>;
  totalColl_gte?: Maybe<Scalars['BigInt']>;
  totalColl_in?: Maybe<Array<Scalars['BigInt']>>;
  totalColl_lt?: Maybe<Scalars['BigInt']>;
  totalColl_lte?: Maybe<Scalars['BigInt']>;
  totalColl_not?: Maybe<Scalars['BigInt']>;
  totalColl_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalDebt?: Maybe<Scalars['BigInt']>;
  totalDebt_gt?: Maybe<Scalars['BigInt']>;
  totalDebt_gte?: Maybe<Scalars['BigInt']>;
  totalDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  totalDebt_lt?: Maybe<Scalars['BigInt']>;
  totalDebt_lte?: Maybe<Scalars['BigInt']>;
  totalDebt_not?: Maybe<Scalars['BigInt']>;
  totalDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalSupplyCjpy?: Maybe<Scalars['BigInt']>;
  totalSupplyCjpy_gt?: Maybe<Scalars['BigInt']>;
  totalSupplyCjpy_gte?: Maybe<Scalars['BigInt']>;
  totalSupplyCjpy_in?: Maybe<Array<Scalars['BigInt']>>;
  totalSupplyCjpy_lt?: Maybe<Scalars['BigInt']>;
  totalSupplyCjpy_lte?: Maybe<Scalars['BigInt']>;
  totalSupplyCjpy_not?: Maybe<Scalars['BigInt']>;
  totalSupplyCjpy_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum WorldState_OrderBy {
  Grr = 'GRR',
  Mcr = 'MCR',
  Rrr = 'RRR',
  Srr = 'SRR',
  Id = 'id',
  LastPrice = 'lastPrice',
  PriceChange = 'priceChange',
  RedemptionReserve = 'redemptionReserve',
  SweepReserve = 'sweepReserve',
  TotalColl = 'totalColl',
  TotalDebt = 'totalDebt',
  TotalSupplyCjpy = 'totalSupplyCjpy',
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type YamatoCurrentStateQueryVariables = Exact<{
  account: Scalars['ID'];
}>;

export type YamatoCurrentStateQuery = {
  __typename?: 'Query';
  worldStates: Array<{
    __typename?: 'WorldState';
    id: string;
    totalColl: any;
    totalDebt: any;
    MCR: any;
    RRR: any;
    SRR: any;
    GRR: any;
    redemptionReserve?: any | null | undefined;
    sweepReserve?: any | null | undefined;
    totalSupplyCjpy?: any | null | undefined;
    lastPrice: any;
    priceChange?: any | null | undefined;
  }>;
  events: Array<{
    __typename?: 'Event';
    id: string;
    date: any;
    category?: Category | null | undefined;
    ethAmount?: any | null | undefined;
    address?: any | null | undefined;
    fee?: any | null | undefined;
    cjpyAmount?: any | null | undefined;
    ymtAmount?: any | null | undefined;
    lockUntil?: number | null | undefined;
    price?: any | null | undefined;
    isCoreRedemption?: boolean | null | undefined;
    gasCompensationAmount?: any | null | undefined;
  }>;
  myPledge?:
    | {
        __typename?: 'Pledge';
        id: string;
        ethAmount?: any | null | undefined;
        borrowedCjpyAmount: any;
      }
    | null
    | undefined;
  sweepablePledges: Array<{
    __typename?: 'Pledge';
    id: string;
    ethAmount?: any | null | undefined;
    borrowedCjpyAmount: any;
  }>;
};
