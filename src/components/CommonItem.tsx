import { Box } from '@chakra-ui/layout';
import styled from 'styled-components';

export const CategoryTitle = styled.h2`
  color: #fcfaf2;
  font-weight: bold;
`;

export const ItemTitleForPledge = styled.label<{ marginTop?: number }>`
  width: 200px;
  color: #818181;
  margin-top: ${({ marginTop }) => marginTop ?? 0}px;
  font-weight: bold;
  display: inline-block;
`;

export const ItemTitleForInfographics = styled.label<{ marginTop?: number }>`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #818181;
`;

export const CurrentValue = styled.p<{
  width?: string;
  marginTop?: number;
}>`
  width: ${({ width }) => width ?? '200px'};
  color: #818181;
  margin-top: ${({ marginTop }) => marginTop ?? 0}px;
  font-weight: bold;
  display: inline-block;
`;

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
      border="1px"
      borderColor="gray.200"
      p={4}
      style={{
        ...boxStyle('#5BAD92'),
      }}
    />
  );
}

export function HeaderBox2(props: any) {
  return (
    <Box
      {...props}
      border="1px"
      borderColor="gray.200"
      p={4}
      style={{
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
