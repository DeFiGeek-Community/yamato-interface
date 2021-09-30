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
import React from 'react';
import {
  ButtonInHeaderBox1,
  headerBox1Color,
  ItemTitleForPledge,
} from '../CommonItem';

export default function TerminologyPopover({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Popover matchWidth={true}>
      <PopoverTrigger>
        <ButtonInHeaderBox1>?</ButtonInHeaderBox1>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow bgColor={headerBox1Color} />
        <PopoverCloseButton textColor={headerBox1Color} />
        <PopoverHeader
          borderColor={headerBox1Color}
          borderWidth={'0.4em 0.4em 0.2em 0.4em'}
          borderRadius={'10px 10px 0 0'}
        >
          <ItemTitleForPledge>{title ?? '用語解説'}</ItemTitleForPledge>
        </PopoverHeader>
        <PopoverBody
          borderColor={headerBox1Color}
          borderWidth={'0.2em 0.4em 0.4em 0.4em'}
          borderRadius={'0 0 10px 10px'}
        >
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
