import styled from 'styled-components';

export const CategoryTitle = styled.h2`
  color: #818181;
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

export const CurrentValue = styled.p<{ width?: number; marginTop?: number }>`
  width: ${({ width }) => width ?? 200}px;
  color: #818181;
  margin-top: ${({ marginTop }) => marginTop ?? 0}px;
  font-weight: bold;
  display: inline-block;
`;
