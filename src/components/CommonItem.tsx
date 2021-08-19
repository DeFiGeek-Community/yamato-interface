import styled from 'styled-components';

export const CategoryTitle = styled.h2`
  color: #818181;
  font-weight: bold;
`;

export const ItemTitle = styled.label`
  width: 200px;
  color: #818181;
  margin-top: 32px;
  font-weight: bold;
`;

export const CurrentValue = styled.p<{ width?: number }>`
  width: ${({ width }) => width ?? 200}px;
  color: #818181;
  margin-top: 32px;
  font-weight: bold;
`;
