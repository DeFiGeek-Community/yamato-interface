import {
  Box,
  Container,
  Flex,
  Text,
  Input,
  Button,
  Card,
  Heading,
  HStack,
} from "@chakra-ui/react";

const MyPledge = () => {
  return (
    <Box p={4} m={4} bg="brand.white" borderRadius="md" shadow="lg">
      <Heading fontWeight="bold" mb={4}>
        My Pledge
      </Heading>

      {/* Collateral Section */}
      <Card.Root
        mb={4}
        bg="brand.whitelight"
        variant="outline"
        borderRadius="md"
        shadow="md"
      >
        <Card.Header bg="brand.green">
          <Text fontSize="lg" fontWeight="bold" color="white" mb="2">
            担保
          </Text>
        </Card.Header>
        <Card.Body>
          <HStack mb={4}>
            <Card.Root bg="brand.white" flex="1" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>現在の担保量</Text>
              </Card.Header>
              <Card.Body>
                <Text fontWeight="bold">0 ETH</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" flex="1" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>評価額</Text>
              </Card.Header>
              <Card.Body>
                <Text fontWeight="bold">¥0</Text>
              </Card.Body>
            </Card.Root>
          </HStack>
          <HStack>
            <Card.Root flex="1" bg="brand.white" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>預入量入力</Text>
              </Card.Header>
              <Card.Body>
                <Input
                  placeholder="Enter amount"
                  mb="2"
                  bg="brand.whitelight"
                  borderColor="brand.green"
                />
                <Button bg="brand.greendark" color="white">
                  預入実行
                </Button>
              </Card.Body>
            </Card.Root>
            <Card.Root flex="1" bg="brand.white" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>引出量入力</Text>
              </Card.Header>
              <Card.Body>
                <Input
                  placeholder="Enter amount"
                  mb="2"
                  bg="brand.whitelight"
                  borderColor="brand.green"
                />
                <Button bg="brand.greendark" color="white">
                  引出実行
                </Button>
              </Card.Body>
            </Card.Root>
          </HStack>
        </Card.Body>
      </Card.Root>

      {/* Debt Section */}
      <Card.Root mb={4} bg="brand.whitelight" borderRadius="md" shadow="md">
        <Card.Header bg="brand.pink">
          <Text fontSize="lg" fontWeight="bold" color="white" mb="2">
            負債
          </Text>
        </Card.Header>
        <Card.Body>
          <HStack mb={4}>
            <Card.Root bg="brand.white" flex="1" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>最大借入可能量</Text>
              </Card.Header>
              <Card.Body>
                <Text fontWeight="bold">0 ETH</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" flex="1" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>借入量</Text>
              </Card.Header>
              <Card.Body>
                <Text fontWeight="bold">¥0</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" flex="1" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>担保率</Text>
              </Card.Header>
              <Card.Body>
                <Text fontWeight="bold">¥0</Text>
              </Card.Body>
            </Card.Root>
          </HStack>
          <HStack>
            <Card.Root flex="1" bg="brand.white" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>借入量入力</Text>
              </Card.Header>
              <Card.Body>
                <Input
                  placeholder="Enter amount"
                  mb="2"
                  bg="brand.whitelight"
                  borderColor="brand.pink"
                />
                <Button bg="brand.pinkdark" color="white">
                  借入実行
                </Button>
              </Card.Body>
            </Card.Root>
            <Card.Root flex="1" bg="brand.white" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>返済量入力</Text>
              </Card.Header>
              <Card.Body>
                <Input
                  placeholder="Enter amount"
                  mb="2"
                  bg="brand.whitelight"
                  borderColor="brand.pink"
                />
                <Button bg="brand.pinkdark" color="white">
                  返済実行
                </Button>
              </Card.Body>
            </Card.Root>
          </HStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default MyPledge;
