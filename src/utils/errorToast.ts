import { createStandaloneToast } from '@chakra-ui/react';
import { ErrorToastConfig } from '../constants/yamato';

export function errorToast(error: any) {
  const toast = createStandaloneToast();
  const description =
    error instanceof Error ? error.message : JSON.stringify(error);
  const config = {
    ...ErrorToastConfig,
    description,
  };
  if (description === 'Transaction rejected.') {
    // Shorten Metamask errors
    config.duration = 3000;
  }
  toast(config);
}
