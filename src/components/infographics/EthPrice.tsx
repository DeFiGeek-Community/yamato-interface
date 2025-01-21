import { Box, Text } from "@chakra-ui/react";
import ArrowZero from "@/assets/svg/sources/eth-change-arrow/eth-change-arrow-zero.svg";
import ArrowDown from "@/svgs/eth-change-arrow-with-props/EthChangeArrowDown.js";
import ArrowUp from "@/svgs/eth-change-arrow-with-props/EthChangeArrowUp.js";
import { getBrightnessPerEth } from "./functions";
import { formatWithComma } from "@/utils";
import Image from "next/image";

interface Props {
  ethPrice: number;
  ethPriceRank: number;
}

function renderArrow(ethPriceRank: number) {
  const brightness = getBrightnessPerEth(ethPriceRank);
  const style = { margin: "auto" };
  const svgProps = { width: 55, height: 22, viewBox: "0 0 55 55" };
  if (ethPriceRank > 0) {
    return (
      <ArrowUp
        color={`hsl(360, 100%, ${brightness}%)`}
        style={style}
        {...svgProps}
      />
    );
  } else if (ethPriceRank < 0) {
    return (
      <ArrowDown
        color={`hsl(236, 100%, ${brightness}%)`}
        style={style}
        {...svgProps}
      />
    );
  } else {
    return (
      <Image
        src={ArrowZero}
        style={{ ...style, height: "22px", paddingBottom: "2px" }}
        alt="Arrow"
      />
    );
  }
}

export default function EthPrice(props: Props) {
  const { ethPrice, ethPriceRank } = props;
  return (
    <Box border="2px solid #5bad92">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        p={1}
      >
        <Text fontSize="sm">ETH ¥{formatWithComma(ethPrice)}</Text>
      </Box>
      <div>{renderArrow(ethPriceRank)}</div>
    </Box>
  );
}
