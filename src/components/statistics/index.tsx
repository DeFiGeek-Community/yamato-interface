import {
  Box,
  Grid,
  GridItem,
  Text,
  Link,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { LuExternalLink } from "react-icons/lu";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { useYamatoStatistics } from "@/hooks/statistics";
import { useAppData } from "@/contexts/AppDataContext";
import { formatUnits } from "viem";

const YamatoStatistics = () => {
  const { data } = useYamatoStatistics();
  const { ethPrice } = useAppData();

  return (
    <Box bg="brand.white" borderRadius="lg" p={2} m={2} shadow="lg">
      {/* Header */}
      <Flex alignItems="center" mb={2}>
        <Heading fontWeight="bold" color="brand.greendark" pr={2}>
          Yamato Statistics
        </Heading>
        <Tooltip content="Key statistics about Yamato">
          <RxQuestionMarkCircled />
        </Tooltip>
      </Flex>

      {/* Statistics Grid */}
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "1fr 1fr",
          lg: "1fr 1fr 1fr 1fr 1fr",
        }}
        gap={2}
      >
        {/* TVL */}
        <GridItem bg="brand.whitelight" p={2} borderRadius="md" shadow="md">
          <Text fontWeight="bold" fontSize="lg">
            TVL
          </Text>
          <Text>¥ {data?.tvl}</Text>
        </GridItem>

        {/* ETH価格 */}
        <GridItem bg="brand.whitelight" p={2} borderRadius="md" shadow="md">
          <Text fontWeight="bold" fontSize="lg">
            ETH価格
          </Text>
          <Text>¥ {formatUnits(ethPrice, 18)}</Text>
        </GridItem>

        {/* TCR */}
        <GridItem bg="brand.whitelight" p={2} borderRadius="md" shadow="md">
          <Text fontWeight="bold" fontSize="lg">
            TCR
          </Text>
          <Text>{data?.tcr} %</Text>
        </GridItem>

        {/* CJPY総発行量 */}
        <GridItem bg="brand.whitelight" p={2} borderRadius="md" shadow="md">
          <Text fontWeight="bold" fontSize="lg">
            CJPY総発行量
          </Text>
          <Text>{data?.cjpyTotalSupply} CJPY</Text>
        </GridItem>

        {/* 市場間価格差異 */}
        <GridItem bg="brand.whitelight" p={2} borderRadius="md" shadow="md">
          <Text fontWeight="bold" fontSize="lg">
            市場間価格差異
          </Text>
          {data?.marketPriceDiff.map((item, index) => (
            <Link href="https://example.com" fontWeight="semibold" key={index}>
              {item.poolname}: ¥ {item.value} ({item.value} %)
              <LuExternalLink />
            </Link>
          ))}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default YamatoStatistics;
