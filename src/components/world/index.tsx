import { YAMATO_MAIN_ADDRESSES } from "@/constants/addresses";
import { useAppData } from "@/contexts/AppDataContext";
import { LogEvent, LogEventType, useWorldLogEvents } from "@/hooks/world";
import {
  ExplorerDataType,
  formatWithComma,
  getExplorerLink,
  truncateEthAddress,
} from "@/utils";
import { Box, Text, List, Heading, Link, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LuExternalLink } from "react-icons/lu";

function getDescriptor(event: LogEvent, t: any) {
  switch (event.category) {
    case LogEventType.DEPOSIT:
      return `${formatWithComma(event.value)}ETH${t("world.logViewer.alert1")}`;
    case LogEventType.WITHDRAW:
      return `${formatWithComma(event.value)}ETH${t("world.logViewer.alert2")}`;
    case LogEventType.BORROW:
      return `${formatWithComma(event.value)}CJPY${t(
        "world.logViewer.alert3"
      )}`;
    case LogEventType.REPAY:
      return `${formatWithComma(event.value)}CJPY${t(
        "world.logViewer.alert4"
      )}`;
    case LogEventType.SELF_REDEMPTION:
      return `${t("world.logViewer.alert5")}`;
    case LogEventType.CORE_REDEMPTION:
      return `${t("world.logViewer.alert5")}`;
    case LogEventType.SWEEP:
      return `${t("world.logViewer.alert5")}`;
    default:
      return `${event.value}${t("world.logViewer.alert6")}`;
  }
}

function getColor(category: LogEventType) {
  switch (category) {
    case LogEventType.DEPOSIT:
      return `red`;
    case LogEventType.WITHDRAW:
      return `red`;
    case LogEventType.BORROW:
      return `green`;
    case LogEventType.REPAY:
      return `green`;
    case LogEventType.SELF_REDEMPTION:
      return `blue`;
    case LogEventType.CORE_REDEMPTION:
      return `blue`;
    case LogEventType.SWEEP:
      return `blue`;
    default:
      return `black`;
  }
}

const YamatoWorldLogEvents = () => {
  const events = useWorldLogEvents();
  const { chainId } = useAppData();
  const { t } = useTranslation();

  function renderLogEvents(events: LogEvent[]) {
    return (
      <List.Root>
        {events.map((event, index) => {
          const color = getColor(event.category as LogEventType);
          const descriptor = getDescriptor(event, t);

          return (
            <List.Item key={index}>
              <Link
                href={getExplorerLink(
                  chainId,
                  event.txnhash,
                  ExplorerDataType.TRANSACTION
                )}
                target="_blank"
              >
                <Text>
                  <span style={{ color, fontWeight: "bold" }}>
                    {t("constants.LOG_EVENT_NAME." + event.category)}
                  </span>
                  <span>
                    : {truncateEthAddress(event.address)}
                    {t("world.logViewer.alert7")}
                  </span>
                  <span>{descriptor}</span>
                </Text>
              </Link>
            </List.Item>
          );
        })}
      </List.Root>
    );
  }

  return (
    <Box p={2} m={2} bg="brand.white" borderRadius="md" shadow="lg">
      <Heading fontWeight="bold" bg="brand.green" mb={2}>
        <HStack>
          <Text fontSize="lg" fontWeight="bold" color="white">
            Real Time TX
          </Text>
          <Link
            href={getExplorerLink(
              chainId,
              YAMATO_MAIN_ADDRESSES[chainId],
              ExplorerDataType.ADDRESS
            )}
            target="_blank"
          >
            <LuExternalLink color="white" />
          </Link>
        </HStack>
      </Heading>
      {renderLogEvents(events)}
    </Box>
  );
};

export default YamatoWorldLogEvents;
