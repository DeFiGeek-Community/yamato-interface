import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { Button as RebassButton } from 'rebass/styled-components';
import styled from 'styled-components';
import CJPYLogo from '../../components/svgs/CjpyLogo';
import { CHAIN_INFO } from '../../constants/chains';
import { NetworkContextName } from '../../constants/misc';
import useENSName from '../../hooks/ens/useENSName';
import { useWalletModalToggle } from '../../state/application/hooks';
import {
  isTransactionRecent,
  useAllTransactions,
} from '../../state/transactions/hooks';
import { TransactionDetails } from '../../state/transactions/reducer';
import { useWalletState } from '../../state/wallet/hooks';
import { formatPrice } from '../../utils/prices';
import { shortenAddress } from '../../utils/web3';
import { Text } from '../CommonItem';
import Loader from '../Loader';
import Row from './Row';
import WalletModal from './WalletModal';

const WalletButton = styled(RebassButton)`
  color: ${({ theme }) => theme.text0};
  background-color: ${({ theme }) => theme.text3};
  padding: 0.6rem 2.5rem;
  margin-right: 1rem;
  border-radius: 26px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const WalletText = styled(Text)`
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.text2};
`;

const FlexText = styled(WalletText)`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  width: fit-content;

  font-style: normal;
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.text3};
`;

const CurrencyToggleButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0rem 1rem;
  border-radius: 26px;
  border: 1px solid ${({ theme }) => theme.text3};
  background-color: transparent;
  transition: box-shadow 0.3s, background-color 0.3s;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    // background-color: #f0f0f0;
  }
`;

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

function Web3StatusInner() {
  const { account, chainId, error } = useWeb3React();

  const { ENSName } = useENSName(account ?? undefined);
  const { cjpy } = useWalletState();

  const toggleWalletModal = useWalletModalToggle();
  const allTransactions = useAllTransactions();
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);
  const pending = sortedRecentTransactions
    .filter((tx) => !tx.receipt)
    .map((tx) => tx.hash);
  const hasPendingTransactions = !!pending.length;
  // 通貨を切り替える関数を定義
  const handleCurrencyToggle = () => {
    // 通貨を切り替えるロジックをここに実装
    console.log('Currency toggled');
  };
  if (account) {
    return (
      <>
        <CurrencyToggleButton onClick={handleCurrencyToggle}>
          <CJPYLogo width="35px" />
          <FlexText
            style={{
              fontSize: '2rem',
              lineHeight: '2.2rem',
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '0.5rem',
            }}
          >
            <span
              style={{
                fontSize: '1rem',
                color: '#888888',
                lineHeight: '1rem',
              }}
            >
              Balance
            </span>
            <span>
              <span
                style={{
                  fontSize: '1.6rem', // フォントサイズを少し小さく
                }}
              >
                {formatPrice(cjpy, 'jpy').value}
              </span>{' '}
              CJPY
            </span>
          </FlexText>
        </CurrencyToggleButton>
        {chainId && chainId !== 1 && (
          <WalletText
            style={{
              color: 'orange',
              marginLeft: '1rem',
              marginRight: '0.5rem',
            }}
          >
            {CHAIN_INFO[chainId].label}
          </WalletText>
        )}
        <WalletButton id="web3-status-connected" onClick={toggleWalletModal}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {hasPendingTransactions ? (
              <WalletText style={{ fontSize: '1.4rem', lineHeight: '1.8rem' }}>
                <Row>
                  <span>{pending?.length} Pending...</span>
                  <div style={{ marginTop: '0.2rem', marginLeft: '0.2rem' }}>
                    <Loader stroke="#5BAD92" />
                  </div>
                </Row>
              </WalletText>
            ) : (
              <WalletText
                style={{ fontSize: '1.5rem', lineHeight: '1.8rem' }}
                data-testid="wallet-data-connectedAs"
              >
                Connected As
                <br />
                {ENSName || shortenAddress(account)}
              </WalletText>
            )}
          </span>
        </WalletButton>
      </>
    );
  } else if (error) {
    return (
      <WalletButton onClick={toggleWalletModal}>
        <FlexText>
          {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}
        </FlexText>
      </WalletButton>
    );
  } else {
    return (
      <WalletButton
        id="connect-wallet"
        onClick={toggleWalletModal}
        // faded={!account}
      >
        <WalletText
          data-testid="wallet-data-connectWallet"
          style={{
            fontSize: '1.6rem',
            lineHeight: '3.3rem',
          }}
        >
          Connect Wallet
        </WalletText>
      </WalletButton>
    );
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React();
  const contextNetwork = useWeb3React(NetworkContextName);

  const { ENSName } = useENSName(account ?? undefined);

  const allTransactions = useAllTransactions();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);

  const pending = sortedRecentTransactions
    .filter((tx) => !tx.receipt)
    .map((tx) => tx.hash);
  const confirmed = sortedRecentTransactions
    .filter((tx) => tx.receipt)
    .map((tx) => tx.hash);

  return (
    <>
      <Web3StatusInner />
      {(contextNetwork.active || active) && (
        <WalletModal
          ENSName={ENSName ?? undefined}
          pendingTransactions={pending}
          confirmedTransactions={confirmed}
        />
      )}
    </>
  );
}
