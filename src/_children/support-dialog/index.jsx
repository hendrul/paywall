import React from 'react'
import Modal2, { BaseModalBackground } from 'styled-react-modal'
import styled from 'styled-components'

import { devices } from '../../_dependencies/devices'
import Modal from '../modal'

import {
  CloseButton,
  DialogContent,
  ContentWrapper,
  Title,
  Subtitle,
  Paragraph,
  LongMail,
} from './styled'

import supportImageUrl from '../../resources/images/img_soporte.png'

const SupportDialog = props => {
  return (
    <Modal {...props}>
      <DialogContent>
        {props.onCloseClick && <CloseButton onClick={props.onCloseClick} />}
        <picture>
          <source
            media={`(${devices.mobile})`}
            srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
          <img src={supportImageUrl} alt="support" />
        </picture>
        <ContentWrapper>
          <Title>Soporte</Title>
          <br />
          <Subtitle>
            Si tienes dudas o consultas, llámanos o envíanos un correo
          </Subtitle>
          <br />
          <Paragraph>
            <b>Central Telefónica:</b>
            <br />
            (+51) 311 5100
          </Paragraph>
          <br />
          <Paragraph>
            <b>Horario de atención:</b>
            <br />
            De lunes a viernes: 7 am - 2 pm <br />
            Sábados, domingos y feriados: de 7am - 1pm
          </Paragraph>
          <br />
          <Paragraph paragraph>
            <b>Correos:</b>
            <br />
            - Servicio al cliente y Ventas: suscriptores@diariogestión.com.pe
            <br />- Pagos pendientes y Facturación: <br />
            <LongMail>cobranzas@suscripcionesintegrales.com.pe</LongMail>
            <br />
          </Paragraph>
        </ContentWrapper>
      </DialogContent>
    </Modal>
  )
}

export default SupportDialog
