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

const YamatoFunctions = () => {
  return (
    <Box p={4} m={4} bg="brand.white" borderRadius="md" shadow="lg">
      <Heading fontWeight="bold" mb={4}>
        Functions
      </Heading>

      {/* Redemption Section */}
      <Card.Root mb={4} bg="brand.whitelight" borderRadius="md" shadow="md">
        <Card.Header bg="brand.green">
          <Text fontSize="lg" fontWeight="bold" color="white" mb="2">
            償還
          </Text>
        </Card.Header>
        <Card.Body>
          <HStack mb={4}>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>償還候補総量</Text>
              </Card.Header>
              <Card.Body>
                <Text>0 CJPY (0 ETH)</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>プール総量</Text>
              </Card.Header>
              <Card.Body>
                <Text>827,733.5089 CJPY</Text>
                <Text> (1.572880122 ETH)</Text>
              </Card.Body>
            </Card.Root>
          </HStack>
          <HStack>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Header>
                <Text fontWeight={"bold"}>ユーザー償還</Text>
              </Card.Header>
              <Card.Body>
                <Input
                  placeholder="Enter amount"
                  mb="2"
                  bg="brand.whitelight"
                  borderColor="brand.blue"
                />
                <Button bg="brand.greendark" color="white">
                  償還実行
                </Button>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Header>
                <Text fontWeight={"bold"}>Yamato償還</Text>
              </Card.Header>
              <Card.Body>
                <Text>実行リワード予測</Text>
                <Text>0 ETH</Text>
                <Button bg="brand.greendark" color="white">
                  償還実行
                </Button>
              </Card.Body>
            </Card.Root>
          </HStack>
        </Card.Body>
      </Card.Root>
      <Card.Root mb={4} bg="brand.whitelight" borderRadius="md" shadow="md">
        <Card.Header bg="brand.pink">
          <Text fontSize="lg" fontWeight="bold" color="white" mb="2">
            Yamato代位弁済
          </Text>
        </Card.Header>
        <Card.Body>
          <HStack mb={4}>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>弁済候補総量</Text>
              </Card.Header>
              <Card.Body>
                <Text>0 CJPY</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Header>
                <Text>プール総量</Text>
              </Card.Header>
              <Card.Body>
                <Text>365,694.0789 CJPY</Text>
              </Card.Body>
            </Card.Root>
          </HStack>
          <Card.Root bg="brand.white" borderRadius="md" shadow="md">
            <Card.Header>
              <Text fontWeight={"bold"}>Yamato償還</Text>
            </Card.Header>
            <Card.Body>
              <Text>実行リワード予測</Text>
              <Text>0 CJPY</Text>
              <Button bg="brand.pinkdark" color="white">
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
