import React from "react";
import Wizard from "react-step-wizard";
import { createBrowserHistory } from "history";

import WizardUserProfile from "./wizard-user-profile";
import Nav from "./wizard-nav";
import WizardPlan from "./wizard-plan";
import * as S from "./styled";
import WizardConfirmation from "./wizard-confirmation";
import WizardPayment from "./wizard-payment";

const _stepsNames = ["PLANES", "DATOS", "PAGO", "CONFIRMACIÓN"];

const Right = () => {
  return <div />;
};

const history = createBrowserHistory({
  basename: ""
  // getUserConfirmation: (message, callback) => callback(window.confirm(message))
});

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      memo: {},
      data: {
        summary: {
          feature: ["Cool stuff", "Awesome feature"]
        },
        plans: [
          {
            sku: "02072019",
            name: "Plan Mensual",
            priceCode: "aaaa",
            pricingStrategyId: "",
            campaignCode: "A",
            description: {
              period: { name: "Mensual", single: "Mes", plural: "Meses" }
            },
            amount: 29,
            billingFrequency: "Month"
          },
          {
            sku: "02072019",
            name: "Plan Anual",
            priceCode: "bbbb",
            pricingStrategyId: "",
            campaignCode: "B",
            description: {
              period: { name: "Anual", single: "Año", plural: "Años" }
            },
            amount: 350,
            billingFrequency: "Year"
          }
        ],
        loading: false
      }
    };

    this.unlistenHistory = history.listen(location => {
      if (location.pathname.match(/\/paywall\//)) {
        const { currentStep, memo } = location.state;
        this.setState({
          currentStep,
          memo
        });
      }
    });

    // this.fetch = this.fetch.bind(this);
    // this.fetch();
  }

  // eslint-disable-next-line react/sort-comp
  fetch() {
    this.fetchContent({
      data: {
        source: "paywall-campaing",
        query: { campaing: "paywall-gestion-sandbox" }
      }
    });
  }

  componentDidMount() {
    const memo = Object.assign({}, this.state.memo, {
      identity: {
        firstName: "Raul",
        lastName: "Contreras",
        secondLastName: "Gonzalez",
        email: "hendrul@gmail.com",
        documentNumber: "12345678",
        documentType: "CEX",
        phone: "555555555"
      }
    });
    document.querySelector("html").classList.add("ios");
    history.push(`/paywall/plan`, { currentStep: 1, memo });
  }

  componentWillUnmount() {
    this.unlistenHistory();
  }

  onBeforeNextStepHandler = (nextStepPath, response, { nextStep }) => {
    const memo = Object.assign({}, this.state.memo, response);
    history.push(`/paywall/${nextStepPath}`.replace("//", "/"), { memo });
    nextStep();
  };

  setLoading = loading => {
    this.setState({
      loading
    });
  };

  render() {
    const { memo, data, loading } = this.state;
    const { summary = {}, plans } = data;

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <S.Content>
          {/* <Loading fullscreen spinning={loading} /> */}
          <Wizard
            transitions={{
              enterRight: "enterRight",
              enterLeft: "enterLeft",
              exitRight: "exitRight",
              exitLeft: "exitLeft"
            }}
            isLazyMount
            nav={<Nav stepsNames={_stepsNames} right={<Right />} />}
          >
            <WizardPlan
              memo={memo}
              plans={plans}
              summary={summary}
              onBeforeNextStep={this.onBeforeNextStepHandler}
              // assets={fullAssets}
            />
            <WizardUserProfile
              memo={memo}
              summary={summary}
              onBeforeNextStep={this.onBeforeNextStepHandler}
              setLoading={this.setLoading}
            />
            <WizardPayment
              memo={memo}
              summary={summary}
              onBeforeNextStep={this.onBeforeNextStepHandler}
              setLoading={this.setLoading}
            />
            <WizardConfirmation
              memo={memo}
              // assets={fullAssets}
              onBeforeNextStep={this.onBeforeNextStepHandler}
            />
          </Wizard>
        </S.Content>
      </div>
    );
  }
}

// Content.static = true

export default Content;
