import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { Label, CurrentValue } from './common';

export default function Collateral() {
  function validateCollateral(value: string) {
    let error;
    if (!value) {
      error = 'collateral is required';
    } else if (value.toLowerCase() !== 'naruto') {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }
  function validateWithdrawal(value: string) {
    let error;
    if (!value) {
      error = 'withdrawal is required';
    } else if (value.toLowerCase() !== 'naruto') {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  return (
    <HStack spacing="24px">
      <Label>担保数</Label>
      <CurrentValue>●●●●●</CurrentValue>

      <Formik
        initialValues={{ collateral: '' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Stack spacing={4} direction="row" align="flex-end">
              <Field name="collateral" validate={validateCollateral}>
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={
                      form.errors.collateral && form.touched.collateral
                    }
                  >
                    <FormLabel htmlFor="collateral">預入量入力</FormLabel>
                    <Input {...field} id="collateral" placeholder="0" />
                    <FormErrorMessage>
                      {form.errors.collateral}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                預入実行
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{ withdrawal: '' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Stack spacing={4} direction="row" align="flex-end">
              <Field name="withdrawal" validate={validateWithdrawal}>
                {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    isInvalid={
                      form.errors.withdrawal && form.touched.withdrawal
                    }
                  >
                    <FormLabel htmlFor="withdrawal">引出量入力</FormLabel>
                    <Input {...field} id="withdrawal" placeholder="0" />
                    <FormErrorMessage>
                      {form.errors.withdrawal}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                引出実行
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </HStack>
  );
}
