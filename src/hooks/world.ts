import { Address, formatUnits, parseAbi } from "viem";
import { usePublicClient } from "wagmi";
import { YAMATO_MAIN_ADDRESSES } from "@/constants/addresses";
import { useAppData } from "@/contexts/AppDataContext";
import { useEffect, useState } from "react";
import { getBlock } from "viem/actions";

export enum LogEventType {
  DEPOSIT = "Deposited",
  WITHDRAW = "Withdrawn",
  BORROW = "Borrowed",
  REPAY = "Repaid",
  REDEMPTION = "RedeemedMeta",
  SELF_REDEMPTION = "self_redemption",
  CORE_REDEMPTION = "core_redemption",
  SWEEP = "Swept",
}

export type LogEvent = {
  txnhash: string;
  address: Address;
  category: LogEventType;
  value: string;
};

export const useWorldLogEvents = () => {
  const { chainId } = useAppData();
  const [logs, setLogs] = useState<LogEvent[]>([]);
  const publicClient = usePublicClient();

  const fetchLogs = async () => {
    let parsedLogs: LogEvent[] = [];
    if (publicClient) {
      const block = await getBlock(publicClient);
      const rawLogs = await publicClient.getLogs({
        address: YAMATO_MAIN_ADDRESSES[chainId],
        events: parseAbi([
          "event Deposited(address indexed sender, uint256 ethAmount)",
          "event Withdrawn(address indexed sender, uint256 ethAmount)",
          "event Borrowed(address indexed sender, uint256 currencyAmount,uint256 fee)",
          "event Repaid(address indexed sender, uint256 currencyAmount)",
          "event RedeemedMeta(address indexed sender, uint256 price, bool isCoreRedemption, uint256 gasCompensationAmount)",
          "event Swept(address indexed sender, uint256 currencyAmount)",
        ]),
        fromBlock: block.number - BigInt(100000),
      });

      rawLogs.forEach((log) => {
        switch (log.eventName) {
          case LogEventType.DEPOSIT:
          case LogEventType.WITHDRAW:
            parsedLogs.unshift({
              txnhash: log.transactionHash,
              address: log.args.sender as Address,
              category: log.eventName as LogEventType,
              value: formatUnits(log.args.ethAmount as bigint, 18),
            });
            break;
          case LogEventType.BORROW:
          case LogEventType.REPAY:
            parsedLogs.unshift({
              txnhash: log.transactionHash,
              address: log.args.sender as Address,
              category: log.eventName as LogEventType,
              value: formatUnits(log.args.currencyAmount as bigint, 18),
            });
            break;
          case LogEventType.REDEMPTION:
            if (log.args.isCoreRedemption) {
              parsedLogs.unshift({
                txnhash: log.transactionHash,
                address: log.args.sender as Address,
                category: LogEventType.CORE_REDEMPTION,
                value: "0",
              });
            } else {
              parsedLogs.unshift({
                txnhash: log.transactionHash,
                address: log.args.sender as Address,
                category: LogEventType.SELF_REDEMPTION,
                value: "0",
              });
            }
            break;
          case LogEventType.SWEEP:
            parsedLogs.unshift({
              txnhash: log.transactionHash,
              address: log.args.sender as Address,
              category: LogEventType.SWEEP,
              value: "0",
            });
        }
      });
      setLogs(parsedLogs);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      fetchLogs();
    }, 60000);

    return () => clearInterval(id);
  }, [chainId, publicClient]);

  return logs;
};
