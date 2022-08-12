import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
  Box,
  HStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <Popover isLazy closeOnEsc placement={'bottom-start'}>
      <PopoverTrigger>
        <ButtonInHeaderBox1>?</ButtonInHeaderBox1>
      </PopoverTrigger>
      <PopoverContent width={width ?? '360px'}>
        <PopoverArrow bgColor={popoverBorderColor} />
        <PopoverHeader
          borderColor={popoverBorderColor}
          borderWidth={'0.4em 0.4em 0 0.4em'}
        >
          <ItemTitleForPledge>
            {title ?? t('terminologyPopover.terminology')}
          </ItemTitleForPledge>
          <PopoverCloseButton textColor={popoverBorderColor} />
        </PopoverHeader>
        <HStack
          borderColor={popoverBorderColor}
          borderWidth={'0 0.4em 0 0.4em'}
          padding={'0.2em'}
        >
          <Box
            borderColor={popoverBorderColor}
            borderWidth={'0 0.4em 0.4em 0.4em'}
            width={width ?? '360px'}
          />
        </HStack>
        <PopoverBody
          borderColor={popoverBorderColor}
          borderWidth={'0 0.4em 0.4em 0.4em'}
        >
          {children}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
