import {
  Box,
  Text,
  Input,
  Button,
  Card,
  Heading,
  HStack,
} from "@chakra-ui/react";

const MyPledge = () => {
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
          <HStack mb={2}>
            <Card.Root bg="brand.white" flex="1" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">現在の担保量</Text>
                </Card.Title>
                <Text>0 ETH</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" flex="1" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">評価額</Text>
                </Card.Title>
                <Text>¥0</Text>
              </Card.Body>
            </Card.Root>
          </HStack>
          <HStack>
            <Card.Root flex="1" bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">預入量入力</Text>
                </Card.Title>
                <Input
                  placeholder="Enter amount"
                  mb="2"
                  bg="brand.whitelight"
                  borderColor="brand.green"
                />
                <Button bg="brand.greendark" color="white" fontWeight="bold">
                  預入実行
                </Button>
              </Card.Body>
            </Card.Root>
            <Card.Root flex="1" bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">引出量入力</Text>
                </Card.Title>
                <Input
                  placeholder="Enter amount"
                  mb="2"
                  bg="brand.whitelight"
                  borderColor="brand.green"
                />
                <Button bg="brand.greendark" color="white" fontWeight="bold">
                  引出実行
                </Button>
              </Card.Body>
            </Card.Root>
          </HStack>
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
          <HStack mb={2}>
            <Card.Root bg="brand.white" flex="1" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">最大借入可能量</Text>
                </Card.Title>{" "}
                <Text>0 ETH</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" flex="1" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">借入量</Text>
                </Card.Title>{" "}
                <Text>¥0</Text>
              </Card.Body>
            </Card.Root>
            <Card.Root bg="brand.white" flex="1" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">担保率</Text>
                </Card.Title>{" "}
                <Text>¥0</Text>
              </Card.Body>
            </Card.Root>
          </HStack>
          <HStack>
            <Card.Root flex="1" bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">借入量入力</Text>
                </Card.Title>{" "}
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
            <Card.Root flex="1" bg="brand.white" borderRadius="md" shadow="md">
              <Card.Body>
                <Card.Title>
                  <Text fontWeight="bold">返済量入力</Text>
                </Card.Title>{" "}
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
          </HStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default MyPledge;
