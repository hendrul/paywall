import React, { useState } from "react";

import CardPrice from "./_children/card-price";
import Summary from "./_children/summary";
import * as S from "./styled";
import { devices } from "../_dependencies/devices";
import Icon from "../_children/icon";

function WizardPlan(props) {
  const {
    id,
    assets,
    summary,
    plans,
    onBeforeNextStep = (res, goNextStep) => goNextStep()
  } = props;

  const [loadingPlan, setLoadingPlan] = useState();
  const [activePlan, setActivePlan] = useState();

  function subscribePlanHandler(e, plan) {
    // Sales.then(sales => {
    //   setLoadingPlan(plan)
    //   return sales
    //     .addItemToCart([
    //       { sku: plan.sku, priceCode: plan.priceCode, quantity: 1 },
    //     ])
    //     .then(res => {
    //       setLoadingPlan(false)
    //       onBeforeNextStep('profile', { plan }, props)
    //     })
    //     .catch(e => {
    //       setLoadingPlan(false)
    //     })
    // })
    onBeforeNextStep("/profile", { plan }, props);
  }

  return (
    <S.WizardPlan>
      <S.Wrap>
        <Summary {...summary} />
        <S.WrapPlan>
          <S.PlanTitle>Selecciona el período de pago:</S.PlanTitle>
          <S.Plans>
            {plans.map((plan, idx) => {
              const { priceCode } = plan;

              return (
                <CardPrice
                  active={
                    activePlan === priceCode || (!activePlan && idx === 0)
                  }
                  key={priceCode}
                  plan={plan}
                  onMouseOver={() => setActivePlan(priceCode)}
                  onFocus={() => setActivePlan(priceCode)}
                  onClick={subscribePlanHandler}
                  loading={loadingPlan && loadingPlan.priceCode === priceCode}
                />
              );
            })}
          </S.Plans>
        </S.WrapPlan>
      </S.Wrap>
      <S.Subscribed as="a">
        <div>
          <S.Picture>
            {/* <source srcSet={assets("lector")} /> */}
            <source
              media={`(${devices.mobile})`}
              srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
            {/* <S.Img src={assets("lector")} alt="lector" /> */}
          </S.Picture>
        </div>
        <S.SubscribedContent>
          <S.SubscribedText>
            <span>SÍ ERES SUSCRIPTOR DEL DIARIO IMPRESO?</span>
            <S.Small>ACCEDE A UN DESCUENTO PARA TU PLAN DIGITAL.</S.Small>
          </S.SubscribedText>
          <div>
            <Icon type="arrowRight" />
          </div>
        </S.SubscribedContent>
        <S.Shadow />
      </S.Subscribed>
    </S.WizardPlan>
  );
}

export default WizardPlan;
