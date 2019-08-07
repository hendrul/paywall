import styled, { css } from 'styled-components'

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  width: 100%;
`

const Footer = styled.div`
  box-sizing: border-box;
  background-color: #444;
  flex: 1;
  color: #fff;
  padding: 30px 25px;
`

const Content = styled.div`
  padding: 30px;
`

export const Expand = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  line-height: 20px;
  margin-bottom: 20px;
  ${({ color }) => `color: ${color || '#000'};`}
  font-size: ${({ size }) => `${size || 13}px`};
  ${({ discount }) =>
    discount &&
    css`
      color: #a98e7c;
      font-weight: 700;
    `}
`

const WrapTitle = styled.div`
  font-weight: 700;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

const NamePlan = styled.span`
  font-size: 30px;
  font-family: var(--font-secondary);
  margin-bottom: 30px;
`

const SummaryTitle = styled.span`
  font-size: 12px;
  font-weight: 300;
`

export const Description = styled.div`
  max-width: 150px;
  display: flex;
  flex: 1;
  text-align: right;
  margin-left: auto;
  line-height: 1.67;
`
export const Amount = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const Frequency = styled.div`
  font-size: 14px;
  font-weight: 300;
  line-height: 1.29;
`

export { Content, Footer, Summary, WrapTitle, NamePlan, SummaryTitle }
