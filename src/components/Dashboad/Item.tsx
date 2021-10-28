import { HStack, Skeleton } from '@chakra-ui/react';
import { ItemTitleValue, ItemTitleForPledge } from '../CommonItem';

interface Props {
  title: string;
  stat: any;
  firstLoadCompleted: boolean;
}

export default function DashboadItem(props: Props) {
  return (
    <HStack align="start">
      <ItemTitleForPledge width="15rem">{props.title}</ItemTitleForPledge>
      {props.firstLoadCompleted ? (
        <ItemTitleValue width="20rem">{props.stat}</ItemTitleValue>
      ) : (
        <Skeleton width="20rem" height="1.6rem" />
      )}
    </HStack>
  );
}
