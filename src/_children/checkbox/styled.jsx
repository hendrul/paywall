import styled, { css } from "styled-components";

export const Label = styled.label`
  display: flex;
  align-items: center;
`;

export const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 8px;
  border: 2px solid gray;
  ${({ checked }) =>
    checked &&
    css`
      background-color: #0179af;
      border: solid 2px ${checked ? "#0179af" : "gray"};
    `}

  ${({ hasError }) =>
    hasError &&
    css`
      border: solid 2px #db0000;
    `}}
  border-radius: 2px;
  transition: all 150ms;
  ${({ shadowed }) =>
    shadowed &&
    css`
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
    `}
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
`;

export const Svg = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;
