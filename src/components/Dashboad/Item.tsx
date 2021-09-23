import { HStack } from '@chakra-ui/react';
import { ItemTitleValue, ItemTitleForPledge } from '../CommonItem';

interface Props {
  title: string;
  stat: any;
}

export default function DashboadItem(props: Props) {
  return (
    <HStack align="start">
      <ItemTitleForPledge width="150px">{props.title}</ItemTitleForPledge>
      <ItemTitleValue width="200px">{props.stat}</ItemTitleValue>
    </HStack>
  );
}
