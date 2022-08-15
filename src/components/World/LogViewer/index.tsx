import { Skeleton } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styled from 'styled-components';
import { useYamatoStateForWorld } from '../../../state/yamato-entirety/hooks';
import { LogEvent, LogEventType } from '../../../state/yamato-entirety/reducer';
import { formatPrice } from '../../../utils/prices';
import { shortenAddress } from '../../../utils/web3';
import { Text } from '../../CommonItem';

function getDescriptor(event: LogEvent, t: any) {
  switch (event.category as LogEventType) {
    case 'deposit':
      return `${formatPrice(event.value, 'eth').value}ETH${t(
        'world.logViewer.alert1'
      )}`;
    case 'withdrawal':
      return `${formatPrice(event.value, 'eth').value}ETH${t(
        'world.logViewer.alert2'
      )}`;
    case 'borrowing':
      return `${formatPrice(event.value, 'jpy').value}CJPY${t(
        'world.logViewer.alert3'
      )}`;
    case 'repay':
      return `${formatPrice(event.value, 'jpy').value}CJPY${t(
        'world.logViewer.alert4'
      )}`;
    case 'self_redemption':
      return `${t('world.logViewer.alert5')}`;
    case 'core_redemption':
      return `${t('world.logViewer.alert5')}`;
    case 'sweep':
      return `${t('world.logViewer.alert5')}`;
    default:
      return `${event.value}${t('world.logViewer.alert6')}`;
  }
}

function getColor(category: LogEventType) {
  switch (category) {
    case 'deposit':
      return `red`;
    case 'withdrawal':
      return `red`;
    case 'borrowing':
      return `green`;
    case 'repay':
      return `green`;
    case 'self_redemption':
      return `blue`;
    case 'core_redemption':
      return `blue`;
    case 'sweep':
      return `blue`;
    default:
      return `black`;
  }
}

const Animation = styled.div`
  // enter from
  &.fade-enter {
    opacity: 0;
  }

  // enter to
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 1s;
  }

  // exit from
  &.fade-exit {
    opacity: 1;
  }

  // exit to
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 1s;
  }
`;

export default function LogViewer() {
  const { account } = useWeb3React();
  const { events, firstLoadCompleted } = useYamatoStateForWorld();
  const { t } = useTranslation();
  function renderLogEvents(events: LogEvent[]) {
    return events.map((event) => {
      const color = getColor(event.category as LogEventType);
      const descriptor = getDescriptor(event, t);
      return (
        <CSSTransition key={event.id} timeout={500} classNames="fade">
          <Animation>
            <Text
              key={event.id}
              style={{
                display: 'block',
              }}
            >
              <span style={{ color, fontWeight: 'bold' }}>
                {t('constants.LOG_EVENT_NAME.' + event.category)}
              </span>
              <span>
                : {shortenAddress(event.address)}
                {t('world.logViewer.alert7')}
              </span>
              <span>{descriptor}</span>
            </Text>
          </Animation>
        </CSSTransition>
      );
    });
  }

  return (
    <div
      style={{ height: !!account ? '30rem' : '34.5rem', overflowY: 'scroll' }}
    >
      {firstLoadCompleted ? (
        events.length > 0 ? (
          <TransitionGroup>{renderLogEvents(events)}</TransitionGroup>
        ) : (
          <Text>${t('world.logViewer.alert8')}</Text>
        )
      ) : (
        <>
          <Skeleton height="1.6rem" style={{ marginBottom: '0.3rem' }} />
          <Skeleton height="1.6rem" style={{ marginBottom: '0.3rem' }} />
          <Skeleton height="1.6rem" style={{ marginBottom: '0.3rem' }} />
          <Skeleton height="1.6rem" style={{ marginBottom: '0.3rem' }} />
          <Skeleton height="1.6rem" style={{ marginBottom: '0.3rem' }} />
          <Skeleton height="1.6rem" style={{ marginBottom: '0.3rem' }} />
          <Skeleton height="1.6rem" style={{ marginBottom: '0.3rem' }} />
          <Skeleton height="1.6rem" style={{ marginBottom: '0.3rem' }} />
          <Skeleton height="1.6rem" style={{ marginBottom: '0.3rem' }} />
          <Skeleton height="1.6rem" style={{ marginBottom: '0.3rem' }} />
        </>
      )}
    </div>
  );
}
