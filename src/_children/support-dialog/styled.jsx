import React from 'react'
import styled, { css } from 'styled-components'

import { devices } from '../../_dependencies/devices'
import Icon from '../icon'

export const Colors = {
  BLACK: '#444444',
  CARMINE: '#8f071f',
  LIGHT_PINK: '#fff6f0;',
}

export const CloseIcon = styled(Icon)`
  position: absolute;
  top: 30px;
  right: 30px;
`
CloseIcon.defaultProps = {
  type: 'close',
}

export const DialogContent = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100vw - 48px);
  max-width: 820px;
  height: 530px;
  border-radius: 4px;
  background-color: #fefefe;
  position: relative;
`

export const ContentWrapper = styled.div`
  padding: 40px;
  border-radius: 4px;
  background-color: ${Colors.LIGHT_PINK};
`

export const Text = props => {
  const {
    type = 'body',
    inline = false,
    color = Colors.BLACK,
    fontWeight,
    paragraph = false,
    children,
    ...restProps
  } = props
  const T = styled[paragraph ? 'p' : inline ? 'span' : 'div']`
    ${() =>
      type === 'title' &&
      css`
        font-family: Open Sans;
        font-size: 26px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.15;
        letter-spacing: normal;
        text-align: left;
        color: ${color};
        font-weight: ${fontWeight};
      `}
    ${() =>
      type === 'subtitle' &&
      css`
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 2.14;
        letter-spacing: normal;
        text-align: left;
        color: ${color};
        font-weight: ${fontWeight};
      `}
    ${() =>
      type === 'body' &&
      css`
        font-family: Open Sans;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 2;
        letter-spacing: normal;
        color: ${color};
        font-weight: ${fontWeight};
      `}
  `
  return <T {...restProps}>{children}</T>
}

export const Title = styled.div`
  font-family: Open Sans;
  font-size: 26px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.15;
  letter-spacing: normal;
  text-align: left;
  color: ${Colors.CARMINE};
`

export const Subtitle = styled.div`
  font-family: Open Sans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.14;
  letter-spacing: normal;
  text-align: left;
  color: ${Colors.CARMINE};
`

export const Paragraph = styled.div`
  font-family: Open Sans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 2;
  letter-spacing: normal;
  text-align: left;
  color: ${Colors.BLACK};
`

export const CloseButton = styled(props => (
  <button type="button" {...props}>
    <Icon type="close" />
  </button>
))`
  position: absolute;
  top: 30px;
  right: 30px;
  border: none;
  background: none;
`

export const LongMail = styled.span`
  @media (${devices.mobile}) {
    font-size: 12px;
  }
`
