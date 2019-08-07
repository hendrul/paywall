import React, { useState } from "react";

import UserProfile from "./_children/user-profile";
import Summary from "../summary";
import * as S from "./styled";
import Beforeunload from "before-unload";
import Loading from "../_children/loading";

const ERROR = {
  E300012: "No se ha encontrado ningún carrito para el usuario.",
  UNKNOWN: code =>
    `ups, vamos a verificar que paso, error desconocido, Ex${code}`
};

function WizardUserProfile(props) {
  const {
    memo,
    summary,
    onBeforeNextStep = (res, goNextStep) => goNextStep(),
    setLoading
  } = props;

  const {
    plan: { amount, description, billingFrequency },
    identity
  } = memo;

  const [error, setError] = useState();

  function onSubmitHandler(values, { setSubmitting }) {
    const { email, phone, billingAddress } = values;
    setError(false);
    // Sales.then(sales =>
    //   sales
    //     .createOrder(email, phone, billingAddress)
    //     .then(res => {
    //       // TODO: validar respuesta y mostrar errores de API
    //       setLoading(false);
    //       setSubmitting(false);
    //       // Mezclamos valores del formulario con los valores de la respuesta
    //       const mergeResValues = Object.assign({}, memo, {
    //         order: res,
    //         profile: values
    //       });
    //       onBeforeNextStep(mergeResValues, props);
    //     })
    //     .catch(e => {
    //       switch (e.code) {
    //         case "300012":
    //           setError(ERROR.E300012);
    //           break;
    //         default:
    //           setError(ERROR.UNKNOWN(e.code));
    //           break;
    //       }
    //       setLoading(false);
    //       setSubmitting(false);
    //     })
    // );
    onBeforeNextStep(
      "/payment",
      {
        order: { orderNumber: "aeiou" },
        profile: values
      },
      props
    );
  }

  function onResetHandler(values, formikBag) {
    // TODO: Limpiar errores una vez se vuelva a reenviar el formuario
    //       hay que llamar a formikBag.handleReset()
    setError();
  }

  return (
    <S.WizardUserProfile>
      <S.PanelUserProfile type="content" valing="jc-center">
        {identity && (
          <UserProfile
            profile={identity}
            onSubmit={onSubmitHandler}
            title="Ingrese sus datos"
            error={error}
          />
        )}
      </S.PanelUserProfile>
      <Summary
        amount={amount}
        billingFrequency={billingFrequency}
        description={description}
        summary={summary}
      />
    </S.WizardUserProfile>
  );
}

export default WizardUserProfile;
