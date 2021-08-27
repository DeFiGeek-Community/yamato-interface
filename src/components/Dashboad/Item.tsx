import { HStack } from '@chakra-ui/react';
import { CurrentValue, ItemTitle } from '../CommonItem';

interface Props {
  title: string;
  stat: any;
}

export default function DashboadItem(props: Props) {
  return (
    <HStack align="start">
      <ItemTitle>{props.title}</ItemTitle>
      <CurrentValue width={400}>{props.stat}</CurrentValue>
    </HStack>
  );
}
