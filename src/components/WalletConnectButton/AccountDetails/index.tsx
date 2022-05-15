import { HStack } from '@chakra-ui/react';
import { useCallback } from 'react';
import { ExternalLink as LinkIcon } from 'react-feather';
import { useDispatch } from 'react-redux';
import { Button } from 'rebass/styled-components';
import styled from 'styled-components';
import CJPYLogo from '../../../assets/images/cjpy_logo.png';
import MetamaskIcon from '../../../assets/images/metamask_logo.png';
import TXJPLogo from '../../../assets/images/txjp_logo.png';
import {
  CJPY_ADDRESSES,
  TXJP_ADDRESSES,
  // YMT_ADDRESSES,
} from '../../../constants/addresses';
import { SUPPORTED_WALLETS } from '../../../constants/web3';
import { YAMATO_SYMBOL } from '../../../constants/yamato';
import { useActiveWeb3React } from '../../../hooks/web3';
import {
  injected,
  // walletconnect,
  // walletlink,
  // fortmatic,
  // portis,
} from '../../../infrastructures/connectors';
import { AppDispatch } from '../../../state';
import { clearAllTransactions } from '../../../state/transactions/actions';
import {
  ExplorerDataType,
  getExplorerLink,
} from '../../../utils/getExplorerLink';
import { shortenAddress } from '../../../utils/web3';
import { CategoryTitle } from '../../CommonItem';
import { ExternalLink } from '../../ExternalLink';
import { RowBetween } from '../Row';
import Copy from './Copy';
import Transaction from './Transaction';

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text1};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`;

const UpperSection = styled.div`
  position: relative;
  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    font-weight: 400;
  }
  h5:last-child {
    margin-bottom: 0px;
  }
  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;

const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.text1};
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.bg0};
`;

const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};
  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`;

const AccountSection = styled.div`
  padding: 0rem 1rem;
  ${({ theme }) =>
    theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`};
`;

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }
  h4 {
    margin: 0;
    font-weight: 500;
  }
`;

const TokenSection = styled.button`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.text1};
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.bg0};
`;

const LowerSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text1};
  }
`;

const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;
  font-weight: 500;
  font-size: 1.4rem;
  a:hover {
    text-decoration: underline;
  }
  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  color: ${({ theme }) => theme.text1};
  margin-left: 1rem;
  font-size: 1.2rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text0};
  }
`;

const ClearButton = styled.div`
  border-radius: 12px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg0};
  padding: 0.3rem;
  font-weight: 600;
  user-select: none;
  &:hover {
    cursor: pointer;
    border: 1px solid;
    border-color: ${({ theme }) => theme.text0};
  }
`;

const WalletName = styled.div`
  width: initial;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text1};
`;

const TransactionListWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
`;

const WalletAction = styled(Button)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 1.4rem;
  padding: 4px 6px;
  color: ${({ theme }) => theme.text1};
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

function renderTransactions(transactions: string[]) {
  return (
    <TransactionListWrapper>
      {transactions.map((hash, i) => {
        return <Transaction key={i} hash={hash} />;
      })}
    </TransactionListWrapper>
  );
}

interface AccountDetailsProps {
  pendingTransactions: string[];
  confirmedTransactions: string[];
  ENSName?: string;
  openOptions: () => void;
}

interface WatchAssetParams {
  type: string;
  options: {
    address: string;
    symbol: string;
    decimals: number;
    image: string;
  };
}

const getToken = (chainId: number, symbol: string): WatchAssetParams => {
  switch (symbol) {
    case YAMATO_SYMBOL.YEN:
      return {
        type: 'ERC20',
        options: {
          address: CJPY_ADDRESSES[chainId],
          symbol: YAMATO_SYMBOL.YEN,
          decimals: 18,
          image: CJPYLogo,
        },
      };
    // case YAMATO_SYMBOL.GOVERNANCE:
    //   return {
    //     type: 'ERC20',
    //     options: {
    //       address: YMT_ADDRESSES[chainId],
    //       symbol: YAMATO_SYMBOL.GOVERNANCE,
    //       decimals: 18,
    //       image: generateTokenImagePath(YMTLogo),
    //     },
    //   };
    case YAMATO_SYMBOL.TXJP:
      return {
        type: 'ERC20',
        options: {
          address: TXJP_ADDRESSES[chainId],
          symbol: YAMATO_SYMBOL.TXJP,
          decimals: 8,
          image: TXJPLogo,
        },
      };
    default:
      return {
        type: 'ERC20',
        options: {
          address: TXJP_ADDRESSES[chainId],
          symbol: YAMATO_SYMBOL.TXJP,
          decimals: 8,
          image: TXJPLogo,
        },
      };
  }
};

const handeAddToken = (e: any, chainId: number, symbol: string) => {
  e.stopPropagation();
  (global.window as any)?.ethereum
    ?.request({
      method: 'wallet_watchAsset',
      params: getToken(chainId, symbol),
    })
    .catch((error: any) => {
      console.error(error);
    });
};

export default function AccountDetails({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions,
}: AccountDetailsProps) {
  const { chainId, account, connector } = useActiveWeb3React();
  const dispatch = useDispatch<AppDispatch>();

  function formatConnectorName() {
    const { ethereum } = window;
    const isMetaMask = !!(ethereum && ethereum.isMetaMask);
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0];
    return <WalletName>Connected with {name}</WalletName>;
  }

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }));
  }, [dispatch, chainId]);

  return (
    <>
      <UpperSection>
        <HeaderRow>
          <CategoryTitle>Account</CategoryTitle>
        </HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                {formatConnectorName()}
                <div>
                  {/* {connector !== injected && connector !== walletlink && (
                    <WalletAction
                      style={{
                        fontSize: '.825rem',
                        fontWeight: 400,
                        marginRight: '8px',
                      }}
                      onClick={() => {
                        (connector as any).close();
                      }}
                    >
                      Disconnect
                    </WalletAction>
                  )} */}
                  <WalletAction
                    onClick={() => {
                      openOptions();
                    }}
                  >
                    Change
                  </WalletAction>
                </div>
              </AccountGroupingRow>
              <AccountGroupingRow id="web3-account-identifier-row">
                <AccountControl>
                  {ENSName ? (
                    <>
                      <div>
                        <p>{ENSName}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p> {account && shortenAddress(account)}</p>
                      </div>
                    </>
                  )}
                </AccountControl>
              </AccountGroupingRow>
              <AccountGroupingRow>
                <AccountControl>
                  <div>
                    {account && (
                      <Copy toCopy={account}>
                        <span style={{ marginLeft: '4px' }}>Copy Address</span>
                      </Copy>
                    )}
                    {chainId && account && (
                      <AddressLink
                        hasENS={!!ENSName}
                        isENS={true}
                        href={getExplorerLink(
                          chainId,
                          ENSName ?? account,
                          ExplorerDataType.ADDRESS
                        )}
                      >
                        <LinkIcon size={16} />
                        <p style={{ marginLeft: '4px' }}>View on Etherscan</p>
                      </AddressLink>
                    )}
                  </div>
                </AccountControl>
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
      {chainId != null ? (
        <>
          <TokenSection
            onClick={(e: any) => handeAddToken(e, chainId, YAMATO_SYMBOL.YEN)}
          >
            <HStack spacing={4} justify={'center'}>
              <img src={CJPYLogo} width={25} height={25}></img>
              <p>add CJPY to your Metamask</p>
              <img src={MetamaskIcon} width={25} height={25}></img>
            </HStack>
          </TokenSection>
          <TokenSection
            onClick={(e: any) => handeAddToken(e, chainId, YAMATO_SYMBOL.TXJP)}
          >
            <HStack spacing={4} justify={'center'}>
              <img src={TXJPLogo} width={25} height={25}></img>
              <p>add TXJP to your Metamask</p>
              <img src={MetamaskIcon} width={25} height={25}></img>
            </HStack>
          </TokenSection>
        </>
      ) : (
        <></>
      )}
      {!!pendingTransactions.length || !!confirmedTransactions.length ? (
        <LowerSection>
          <RowBetween padding="1rem 0">
            <CategoryTitle>Recent Transactions</CategoryTitle>
            <ClearButton onClick={clearAllTransactionsCallback}>
              clear all
            </ClearButton>
          </RowBetween>
          {renderTransactions(pendingTransactions)}
          {renderTransactions(confirmedTransactions)}
        </LowerSection>
      ) : (
        <LowerSection>
          <CategoryTitle>Your transactions will appear here...</CategoryTitle>
        </LowerSection>
      )}
    </>
  );
}
