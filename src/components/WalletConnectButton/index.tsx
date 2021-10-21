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
  color: ${({ theme }) => theme.text1};
  padding: 0;
  margin-right: 1rem;
`;

export const WalletText = styled(Text)`
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.text3};
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

  if (account) {
    return (
      <>
        {chainId && chainId !== 1 && (
          <WalletText
            style={{
              color: 'orange',
              marginRight: '1rem',
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
              <FlexText style={{ fontSize: '1.8rem', lineHeight: '2.1rem' }}>
                <Row>
                  <span>{pending?.length} Pending...</span>
                  <div style={{ marginTop: '0.2rem', marginLeft: '0.2rem' }}>
                    <Loader stroke="#5BAD92" />
                  </div>
                </Row>
              </FlexText>
            ) : (
              <FlexText
                style={{ fontSize: '1.8rem', lineHeight: '2.1rem' }}
                data-testid="wallet-data-connectedAs"
              >
                Connected As
                <br />
                {ENSName || shortenAddress(account)}
              </FlexText>
            )}
            <CJPYLogo width="35px" />
            <FlexText
              style={{
                fontSize: '3rem',
                lineHeight: '3.5rem',
              }}
            >
              CJPY {formatPrice(cjpy, 'jpy').value}
            </FlexText>
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
            fontSize: '2rem',
            lineHeight: '2.3rem',
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
