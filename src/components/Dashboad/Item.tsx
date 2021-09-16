import { HStack } from '@chakra-ui/react';
import { CurrentValue, ItemTitleForPledge } from '../CommonItem';

interface Props {
  title: string;
  stat: any;
}

export default function DashboadItem(props: Props) {
  return (
    <HStack align="start">
      <ItemTitleForPledge width="200px">{props.title}</ItemTitleForPledge>
      <CurrentValue width="200px">{props.stat}</CurrentValue>
    </HStack>
  );
}
