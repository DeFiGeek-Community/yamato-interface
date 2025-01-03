import {
  Box,
  Text,
  Input,
  Button,
  Card,
  Heading,
  Grid,
} from "@chakra-ui/react";

const YamatoFunctions = () => {
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
                <Text>0 CJPY</Text>
                <Text> (0 ETH)</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">プール総量</Text>
                </Card.Title>
                <Text>827,733.5089 CJPY</Text>
                <Text> (1.572880122 ETH)</Text>
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
                />
                <Button bg="brand.greendark" color="white" fontWeight="bold">
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
                <Text>0 ETH</Text>
                <Button bg="brand.greendark" color="white" fontWeight="bold">
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
                <Text>0 CJPY</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">プール総量</Text>
                </Card.Title>
                <Text>365,694.0789 CJPY</Text>
              </Card.Body>
            </Card.Root>
          </Grid>
          <Card.Root bg="brand.white" borderRadius="md" shadow="md">
            <Card.Body>
              <Card.Title>
                <Text fontWeight="bold">Yamato代位弁済</Text>
              </Card.Title>
              <Text>実行リワード予測: 0 CJPY</Text>
              <Button bg="brand.pinkdark" color="white" fontWeight="bold">
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
