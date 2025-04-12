import { useYamatoFunctions } from "@/hooks/functions";
import { useRedeem } from "@/hooks/redeem";
import { useState } from "react";
import { formatWithComma } from "@/utils";
import {
  Box,
  Text,
  Input,
  Button,
  Card,
  Heading,
  Grid,
} from "@chakra-ui/react";
import { useSweep } from "@/hooks/sweep";

const YamatoFunctions = () => {
  const { functionsData } = useYamatoFunctions();
  const { redeem, isLoading: isRedeemLoading } = useRedeem();
  const { sweep, isLoading: isSweepLoading } = useSweep();
  const [redeemAmount, setRedeemAmount] = useState("");

  const handleRedeem = async (isCoreRedemption: boolean = false) => {
    if (isCoreRedemption) {
      await redeem(functionsData.redemptionReserve, isCoreRedemption);
    } else {
      if (!redeemAmount || parseFloat(redeemAmount) <= 0) return;
      await redeem(redeemAmount, isCoreRedemption);
      setRedeemAmount("");
    }
  };

  const handleSweep = async () => {
    await sweep();
  };

  return (
    <Box p={2} m={2} bg="brand.white" borderRadius="md" shadow="lg">
      <Heading fontWeight="bold" mb={2}>
        Functions
      </Heading>

      {/* Redemption Section */}
      <Card.Root mb={2} bg="brand.whitelight" borderRadius="md" shadow="md">
        <Card.Header bg="brand.green" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" color="white" mb="2">
            償還
          </Text>
        </Card.Header>
        <Card.Body>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "1fr 1fr",
            }}
            gap={2}
          >
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">償還候補総量</Text>
                </Card.Title>
                <Text>
                  {formatWithComma(functionsData.redeemableCandidate)} CJPY
                </Text>
                <Text>
                  {" "}
                  ({formatWithComma(functionsData.redeemableCandidateEth)} ETH)
                </Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">プール総量</Text>
                </Card.Title>
                <Text>
                  {formatWithComma(functionsData.redemptionReserve)} CJPY
                </Text>
                <Text>
                  {" "}
                  ({formatWithComma(functionsData.redemptionReserveEth)} ETH)
                </Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">ユーザー償還</Text>
                </Card.Title>
                <Input
                  placeholder="Enter amount"
                  mb="2"
                  bg="brand.whitelight"
                  borderColor="brand.green"
                  value={redeemAmount}
                  onChange={(e) => setRedeemAmount(e.target.value)}
                  type="number"
                  min="0"
                  step="0.01"
                />
                <Button
                  bg="brand.greendark"
                  color="white"
                  fontWeight="bold"
                  onClick={() => handleRedeem(false)}
                  disabled={
                    isRedeemLoading || !redeemAmount || parseFloat(redeemAmount) <= 0
                  }
                >
                  償還実行
                </Button>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">Yamato償還</Text>
                </Card.Title>
                <Text>実行リワード予測</Text>
                <Text>
                  {formatWithComma(functionsData.redemptionReward)} ETH
                </Text>
                <Button
                  bg="brand.greendark"
                  color="white"
                  fontWeight="bold"
                  onClick={() => handleRedeem(true)}
                  disabled={isRedeemLoading}
                >
                  償還実行
                </Button>
              </Card.Body>
            </Card.Root>
          </Grid>
        </Card.Body>
      </Card.Root>
      <Card.Root bg="brand.whitelight" borderRadius="md" shadow="md">
        <Card.Header bg="brand.pink" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" color="white" mb="2">
            Yamato代位弁済
          </Text>
        </Card.Header>
        <Card.Body>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "1fr 1fr",
            }}
            gap={2}
            mb="2"
          >
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">弁済候補総量</Text>
                </Card.Title>
                <Text>
                  {formatWithComma(functionsData.sweepableCandidate)} CJPY
                </Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">プール総量</Text>
                </Card.Title>
                <Text>{formatWithComma(functionsData.sweepReserve)} CJPY</Text>
              </Card.Body>
            </Card.Root>
          </Grid>
          <Card.Root bg="brand.white" borderRadius="md" shadow="md">
            <Card.Body>
              <Card.Title>
                <Text fontWeight="bold">Yamato代位弁済</Text>
              </Card.Title>
              <Text>
                実行リワード予測: {formatWithComma(functionsData.sweepReward)}{" "}
                CJPY
              </Text>
              <Button 
                bg="brand.pinkdark"
                color="white"
                fontWeight="bold"
                onClick={handleSweep}
                disabled={isSweepLoading}
              >
                弁済実行
              </Button>
            </Card.Body>
          </Card.Root>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default YamatoFunctions;
