import { Interface } from 'ethers/lib/utils';
import { Yamato } from '../../infrastructures/abis/types';
import YAMATO_MAIN_ABI from '../../infrastructures/abis/yamato/Yamato.json';
import { LogEvent } from '../../state/yamato-entirety/reducer';
import { formatCjpy, formatEther } from '../web3';

export async function fetchEventLogs(
  blockNumber: number | undefined,
  yamatoMainContract: Yamato | null
): Promise<LogEvent[]> {
  if (!blockNumber || !yamatoMainContract) {
    return [];
  }

  // event filter
  const borrowed = yamatoMainContract.filters.Borrowed();
  const withdrawn = yamatoMainContract.filters.Withdrawn();
  const deposited = yamatoMainContract.filters.Deposited();
  const repaid = yamatoMainContract.filters.Repaid();
  const redeemedMeta = yamatoMainContract.filters.RedeemedMeta();
  const swept = yamatoMainContract.filters.Swept();
  const eventFilter: any = {
    topics: [
      [
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...borrowed.topics!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...withdrawn.topics!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...deposited.topics!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...repaid.topics!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...redeemedMeta.topics!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ...swept.topics!,
      ],
    ],
  };

  // Get logs
  const logs = await yamatoMainContract.queryFilter(
    eventFilter,
    blockNumber - 5000,
    'latest'
  );
  if (logs.length === 0) {
    return [];
  }

  // Create EventLogs
  const iface = new Interface(YAMATO_MAIN_ABI);
  const events: LogEvent[] = [];
  for (const log of logs) {
    const event = iface.parseLog(log);
    switch (event.name) {
      case 'Deposited':
        events.push({
          id: `${log.blockNumber}${log.logIndex}`,
          blockNumber: log.blockNumber,
          logIndex: log.logIndex,
          address: event.args[0],
          category: 'deposit',
          value: formatEther(event.args[1]),
        });
        break;
      case 'Withdrawn':
        events.push({
          id: `${log.blockNumber}${log.logIndex}`,
          blockNumber: log.blockNumber,
          logIndex: log.logIndex,
          address: event.args[0],
          category: 'withdrawal',
          value: formatEther(event.args[1]),
        });
        break;
      case 'Borrowed':
        events.push({
          id: `${log.blockNumber}${log.logIndex}`,
          blockNumber: log.blockNumber,
          logIndex: log.logIndex,
          address: event.args[0],
          category: 'borrowing',
          value: formatCjpy(event.args[1]),
        });
        break;
      case 'Repaid':
        events.push({
          id: `${log.blockNumber}${log.logIndex}`,
          blockNumber: log.blockNumber,
          logIndex: log.logIndex,
          address: event.args[0],
          category: 'repay',
          value: formatCjpy(event.args[1]),
        });
        break;
      case 'RedeemedMeta':
        events.push({
          id: `${log.blockNumber}${log.logIndex}`,
          blockNumber: log.blockNumber,
          logIndex: log.logIndex,
          address: event.args[0],
          category: !event.args[2] ? 'self_redemption' : 'core_redemption',
          value: formatEther(event.args[3]),
        });
        break;
      case 'Swept':
        events.push({
          id: `${log.blockNumber}${log.logIndex}`,
          blockNumber: log.blockNumber,
          logIndex: log.logIndex,
          address: event.args[0],
          category: 'sweep',
          value: formatCjpy(event.args[2]),
        });
        break;
    }
  }
  return events;
}
