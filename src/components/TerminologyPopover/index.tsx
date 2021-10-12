import {
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
  popoverBorderColor,
  ItemTitleForPledge,
} from '../CommonItem';

export default function TerminologyPopover({
  title,
  width,
  children,
}: {
  title?: string;
  width?: string;
  children: React.ReactNode;
}) {
  return (
    <Popover isLazy closeOnEsc placement={'bottom-start'}>
      <PopoverTrigger>
        <ButtonInHeaderBox1>?</ButtonInHeaderBox1>
      </PopoverTrigger>
      <PopoverContent width={width ?? '360px'}>
        <PopoverArrow bgColor={popoverBorderColor} />
        <PopoverCloseButton textColor={popoverBorderColor} />
        <PopoverHeader
          borderColor={popoverBorderColor}
          borderWidth={'0.4em 0.4em 0.2em 0.4em'}
        >
          <ItemTitleForPledge>{title ?? '用語解説'}</ItemTitleForPledge>
        </PopoverHeader>
        <PopoverBody
          borderColor={popoverBorderColor}
          borderWidth={'0.2em 0.4em 0.4em 0.4em'}
        >
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
