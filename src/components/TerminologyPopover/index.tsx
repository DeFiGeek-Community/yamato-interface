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
        <Button>?</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{title ?? '用語解説'}</PopoverHeader>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
