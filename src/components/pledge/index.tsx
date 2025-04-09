import { usePledge } from "@/hooks/pledge";
import { useDeposit } from "@/hooks/deposit";
import { useWithdraw } from "@/hooks/withdraw";
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

const MyPledge = () => {
  const { pledge } = usePledge();
  const { deposit, isLoading: isDepositLoading } = useDeposit();
  const { withdraw, isLoading: isWithdrawLoading } = useWithdraw();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  
  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;
    await deposit(depositAmount);
    setDepositAmount("");
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    await withdraw(withdrawAmount);
    setWithdrawAmount("");
  };
  
  return (
    <Box p={2} m={2} bg="brand.white" borderRadius="md" shadow="lg">
      <Heading fontWeight="bold" mb={2}>
        My Pledge
      </Heading>

      {/* Collateral Section */}
      <Card.Root mb={2} bg="brand.whitelight" borderRadius="md" shadow="md">
        <Card.Header bg="brand.green" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" color="white" mb="2">
            担保
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
                  <Text fontWeight="bold">現在の担保量</Text>
                </Card.Title>
                <Text>{formatWithComma(pledge.collateral)} ETH</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">評価額</Text>
                </Card.Title>
                <Text>¥ {formatWithComma(pledge.valuation)}</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">預入量入力</Text>
                </Card.Title>
                <Input
                  placeholder="Enter amount"
                  mb="2"
                  bg="brand.whitelight"
                  borderColor="brand.green"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  type="number"
                  min="0"
                />
                <Button 
                  bg="brand.greendark"
                  color="white"
                  fontWeight="bold"
                  onClick={handleDeposit}
                  disabled={isDepositLoading || !depositAmount || parseFloat(depositAmount) <= 0}
                >
                  預入実行
                </Button>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">引出量入力</Text>
                </Card.Title>
                <Input
                  placeholder="Enter amount"
                  mb="2"
                  bg="brand.whitelight"
                  borderColor="brand.green"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  type="number"
                  min="0"
                />
                <Button
                  bg="brand.greendark"
                  color="white"
                  fontWeight="bold"
                  onClick={handleWithdraw}
                  disabled={isWithdrawLoading || !withdrawAmount || parseFloat(withdrawAmount) <= 0}
                >
                  引出実行
                </Button>
              </Card.Body>
            </Card.Root>
          </Grid>
        </Card.Body>
      </Card.Root>

      {/* Debt Section */}
      <Card.Root mb={2} bg="brand.whitelight" borderRadius="md" shadow="md">
        <Card.Header bg="brand.pink" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" color="white" mb="2">
            負債
          </Text>
        </Card.Header>
        <Card.Body>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "1fr 1fr 1fr",
            }}
            gap={2}
            mb={2}
          >
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">最大借入可能量</Text>
                </Card.Title>
                <Text>{formatWithComma(pledge.maxBorrowable)} CJPY</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">借入量</Text>
                </Card.Title>
                <Text>{formatWithComma(pledge.debt)} CJPY</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">担保率</Text>
                </Card.Title>
                <Text>{formatWithComma(pledge.collateralRate)} %</Text>
              </Card.Body>
            </Card.Root>
          </Grid>
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
                  <Text fontWeight="bold">借入量入力</Text>
                </Card.Title>
                <Input
                  placeholder="Enter amount"
                  mb="2"
                  bg="brand.whitelight"
                  borderColor="brand.pink"
                />
                <Button bg="brand.pinkdark" color="white" fontWeight="bold">
                  借入実行
                </Button>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">返済量入力</Text>
                </Card.Title>
                <Input
                  placeholder="Enter amount"
                  mb="2"
                  bg="brand.whitelight"
                  borderColor="brand.pink"
                />
                <Button bg="brand.pinkdark" color="white" fontWeight="bold">
                  返済実行
                </Button>
              </Card.Body>
            </Card.Root>
          </Grid>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default MyPledge;
