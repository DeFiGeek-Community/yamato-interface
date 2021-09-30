import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
} from '@chakra-ui/react';
import { ButtonInHeaderBox1, ItemTitleForPledge } from '../CommonItem';

export default function TerminologyPopover({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <ButtonInHeaderBox1>?</ButtonInHeaderBox1>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <ItemTitleForPledge>{title ?? '用語解説'}</ItemTitleForPledge>
        </PopoverHeader>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}