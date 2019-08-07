import React from "react";
import * as S from "./styled";
import { Panel } from "../_children/panel/styled";
import Button from "../_children/button";
import { devices } from "../_dependencies/devices";

const HOME = "https://elcomercio-gestion-sandbox.cdn.arcpublishing.com/";
const NAME_REDIRECT = "paywall_last_url";

const Item = ({ label, children }) => {
  return (
    <S.Item>
      {label} <strong>{children}</strong>
    </S.Item>
  );
};

const WizardConfirmation = props => {
  const {
    memo: {
      profile: { firstName, lastName, secondLastName, email },
      plan: { name: plan },
      payment: { total: paidTotal }
    }
  } = props;

  const handleClick = () => {
    const { sessionStorage, location } = window;
    // eslint-disable-next-line no-prototype-builtins
    location.href = sessionStorage.hasOwnProperty(NAME_REDIRECT)
      ? sessionStorage.getItem(NAME_REDIRECT)
      : HOME;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Panel maxWidth="1060px" direction="row">
        {/* <S.Picture>
          <source srcSet={assets("confirmation")} />
          <source
            media={`(${devices.mobile})`}
            srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
          <S.Image src={assets("confirmation")} alt="Bar" />
        </S.Picture> */}

        <S.Content>
          <S.Title>Â¡Bienvenido(a) {firstName}!</S.Title>
          <S.Subtitle>
            Disfruta de acceso ilimitado y contenido exclusivo en economÃ­a,
            negocios y finanzas.
          </S.Subtitle>
          <S.CardSummary>
            <S.DetailTitle>DETALLE DE COMPRA</S.DetailTitle>
            <Item label="PAQUETE: ">{plan.toUpperCase()}</Item>
            <Item label="NOMBRE: ">
              {firstName} {lastName} {secondLastName}
            </Item>
            <Item label="PRECIO: ">
              S/ {paidTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </Item>
            <S.Small>
              LA SUSCRIPCIÃN SE RENOVARÃ AUTOMÃTICAMENTE DE ACUERDO A TU PLAN.
            </S.Small>
          </S.CardSummary>
          <S.Span>
            Enviaremos la boleta de compra de la suscripciÃ³n al correo:
            <strong> {email}</strong>
          </S.Span>
          <S.WrapButton>
            <Button onClick={handleClick}>SIGUE NAVEGANDO</Button>
          </S.WrapButton>
        </S.Content>
      </Panel>
    </div>
  );
};

export default WizardConfirmation;
