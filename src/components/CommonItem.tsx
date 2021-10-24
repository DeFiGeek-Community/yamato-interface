import { Box } from '@chakra-ui/layout';
import {
  Button,
  ButtonProps,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import styled from 'styled-components';

export const Text = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.6rem;
  color: ${({ theme }) => theme.text1};
`;

export const CategoryTitle = styled.h2`
  color: ${({ theme }) => theme.text2};
  font-style: normal;
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 2.1rem;
`;

export const headerBox1Color = '#5bad92';

export const ButtonInHeaderBox1 = styled.button`
  color: ${headerBox1Color};
  background-color: ${({ theme }) => theme.text2};
  font-style: normal;
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 2.1rem;
  border-radius: 30%;
  padding: 0 0.3em 0 0.3em;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25);
`;

export const popoverBorderColor = '#A0CFC0';

/**
 * ItemTitle
 */
export const ItemTitleForPledge = styled.label<{
  width?: string;
  marginTop?: number;
}>`
  width: ${({ width }) => width ?? '100px'};
  color: ${({ theme }) => theme.text1};
  margin-top: ${({ marginTop }) => marginTop ?? 0}px;
  display: inline-block;
  font-style: normal;
  font-weight: bold;
  font-size: 1.4rem;
  line-height: 1.6rem;
`;

export const ItemTitleForInfographics = styled.label<{
  marginTop?: number;
}>`
  font-style: normal;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.4rem;
  color: ${({ theme }) => theme.text1};
`;

export const ItemTitleValue = styled.p<{
  width?: string;
  marginTop?: number;
}>`
  width: ${({ width }) => width ?? '100%'};
  color: ${({ theme }) => theme.text1};
  margin-top: ${({ marginTop }) => marginTop ?? 0}px;
  display: inline-block;
  font-style: normal;
  font-weight: bold;
  font-size: 1.4rem;
  line-height: 1.6rem;
`;

/**
 * Box
 */
const boxStyle = (color: string) => ({
  backgroundColor: `${color}`,
  border: `1px solid ${color}`,
  boxSizing: 'border-box',
  boxShadow: '3px 3px 0px rgba(0, 0, 0, 0.25)',
});

export function HeaderBox1(props: any) {
  return (
    <Box
      {...props}
      p={2}
      style={{
        height: '30px',
        paddingLeft: '10px',
        ...boxStyle('#5BAD92'),
      }}
    />
  );
}

export function HeaderBox2(props: any) {
  return (
    <Box
      {...props}
      p={2}
      style={{
        height: '30px',
        paddingLeft: '10px',
        ...boxStyle('#F9AEA5'),
      }}
    />
  );
}

export function ConentBox(props: any) {
  return (
    <Box
      {...props}
      p={4}
      style={{
        ...boxStyle('#FCFAF2'),
      }}
    />
  );
}

/**
 * Form
 */
export function CustomFormLabel(props: {
  text: string;
  htmlFor?: string;
  children?: string;
}) {
  return (
    <FormLabel
      {...props}
      style={{
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '1.2rem',
        lineHeight: '1.4rem',
        color: '#818181',
      }}
    >
      {props.text}
    </FormLabel>
  );
}

export function CustomInput(
  props: {
    children?: string;
  } & InputProps
) {
  return (
    <Input
      {...props}
      borderRadius="unset"
      style={{
        fontSize: '1.4rem',
        textAlign: 'right',
        background: '#FCFAF2',
        border: '1px solid #F9AEA5',
        boxSizing: 'border-box',
        boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
        maxWidth: '140px',
      }}
    />
  );
}

export function CustomButton(
  props: {
    isLoading?: boolean;
    children: string;
  } & ButtonProps
) {
  return (
    <Button
      {...props}
      border="unset"
      borderRadius="unset"
      style={{
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '1.4rem',
        lineHeight: '1.6rem',
        color: '#FCFAF2',
        background: '#F9AEA5',
        boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.25)',
        maxWidth: '180px',
        minWidth: '120px',
        height: '2.6rem',
      }}
    >
      {props.children}
    </Button>
  );
}
