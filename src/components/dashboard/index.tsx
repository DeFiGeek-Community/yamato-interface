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

const YamatoStatistics = () => {
  return (
    <Box bg="brand.white" borderRadius="lg" p={4} m={4} shadow="lg">
      {/* Header */}
      <Flex alignItems="center" mb={4}>
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
          base: "1fr", // モバイル画面: 1列
          sm: "1fr 1fr", // 小画面: 2列
          lg: "1fr 1fr 1fr", // 大画面: 3列
        }}
        gap={4}
      >
        {/* TVL */}
        <GridItem bg="brand.whitelight" p={4} borderRadius="md" shadow="md">
          <Text fontWeight="bold" fontSize="lg">
            TVL
          </Text>
          <Text>¥531,659,729.12</Text>
        </GridItem>

        {/* ETH価格 */}
        <GridItem bg="brand.whitelight" p={4} borderRadius="md" shadow="md">
          <Text fontWeight="bold" fontSize="lg">
            ETH価格
          </Text>
          <Text>¥523,802.9176</Text>
        </GridItem>

        {/* TCR */}
        <GridItem bg="brand.whitelight" p={4} borderRadius="md" shadow="md">
          <Text fontWeight="bold" fontSize="lg">
            TCR
          </Text>
          <Text>285.95%</Text>
        </GridItem>

        {/* CJPY総発行量 */}
        <GridItem bg="brand.whitelight" p={4} borderRadius="md" shadow="md">
          <Text fontWeight="bold" fontSize="lg">
            CJPY総発行量
          </Text>
          <Text>185,924,891.5616 CJPY</Text>
        </GridItem>

        {/* 市場間価格差異 */}
        <GridItem bg="brand.whitelight" p={4} borderRadius="md" shadow="md">
          <Text fontWeight="bold" fontSize="lg">
            市場間価格差異
          </Text>
          <Link href="https://example.com" fontWeight="semibold">
            Curve: ¥0.9002 (-9.98%)
            <LuExternalLink />
          </Link>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default YamatoStatistics;
