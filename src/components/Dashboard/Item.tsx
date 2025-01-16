import { HStack, Skeleton } from '@chakra-ui/react';
import styled from 'styled-components';
import { ItemTitleValue, ItemTitleForPledge } from '../CommonItem';

const StyledItemTitleForPledge = styled(ItemTitleForPledge)`
  width: 180px;
  min-width: 180px;
  white-space: nowrap;
`;

const StyledItemTitleValue = styled(ItemTitleValue)`
  white-space: nowrap;
`;

interface Props {
  title: string;
  stat: any;
  firstLoadCompleted: boolean;
  children?: any;
}

export default function DashboardItem(props: Props) {
  return (
    <HStack align="center" width="100%" spacing={4} justify="flex-start">
      <StyledItemTitleForPledge>{props.title}</StyledItemTitleForPledge>
      {props.firstLoadCompleted ? (
        <HStack spacing={1}>
          <StyledItemTitleValue>{props.stat}</StyledItemTitleValue>
          {props.children}
        </HStack>
      ) : (
        <Skeleton width="8rem" height="1.6rem" />
      )}
    </HStack>
  );
}
