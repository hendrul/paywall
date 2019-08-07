import styled, { ThemeProvider } from "styled-components";
import { BaseModalBackground } from "styled-react-modal";

import { devices } from "./_dependencies/devices";

const FadingModalBackground = styled(BaseModalBackground)`
  opacity: ${props => props.opacity};
  transition: opacity ease 200ms;
`;

const Content = styled.div`
  width: 1120px;
  @media (${devices.mobile}) {
    width: 100%;
  }
`;
export { Content, ThemeProvider, FadingModalBackground };
