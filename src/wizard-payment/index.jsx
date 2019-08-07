/* eslint-disable no-shadow */
import React from "react";
import styled from "styled-components";

import Panel from "../_children/panel";
import Summary from "../summary";
import * as S from "./styled";
import FormPay from "./_children/form-pay";

const PanelPayment = styled(Panel)``;

const MESSAGE = {
  PAYMENT_FAIL: "Ha ocurrido un problema durante el pago"
};

function WizardPayment(props) {
  const { onBeforeNextStep } = props;

  const onSubmitHandler = (values, { setSubmitting }) => {
    onBeforeNextStep(
      "/confirm",
      {
        payment: {
          total: 29
        },
        cardInfo: values
      },
      props
    );
  };

  return (
    <S.WizardPayment>
      <PanelPayment type="content" valing="jc-center">
        <FormPay
          initialValues={{
            agreed: true,
            cardMethod: "visa",
            cardNumber: "4000 0000 0000 0000",
            cvv: "123",
            expiryDate: "12/2020"
          }}
          onSubmit={onSubmitHandler}
        />
      </PanelPayment>
    </S.WizardPayment>
  );
}

export default WizardPayment;
