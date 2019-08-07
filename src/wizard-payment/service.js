function apiPaymentRegister({
  baseUrl,
  orderNumber,
  firstName,
  lastName,
  secondLastName,
  documentType,
  documentNumber,
  email,
  phone,
  cardMethod,
  cardNumber,
  token,
  sku,
  priceCode,
  amount
}) {
  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "Token deb904a03a4e31d420a014534514b8cc8ca4d111",
    "user-token": window.Identity.userIdentity.accessToken
  });
  const response = new Promise(resolve => {
    fetch(`${baseUrl}/api/payment/register-pending/`, {
      method: "POST",
      body: JSON.stringify({
        order: orderNumber,
        total: amount,
        profile: {
          name: firstName,
          lastname: lastName,
          lastname_mother: secondLastName,
          doc_type: documentType,
          doc_number: documentNumber,
          email,
          phone
        },
        card: {
          method: cardMethod.toUpperCase(),
          number: cardNumber,
          token
        },
        product: [
          {
            sku,
            price_code: priceCode,
            amount
          }
        ]
      }),
      headers
    }).then(res => {
      return resolve(res.json());
    });
  });

  return response;
}

export const realizePayment = paymentInfo => {
  const {
    plan: {
      sku,
      priceCode,
      campaignCode,
      amount,
      billingFrequency,
      description
    },
    orderNumber,
    profile: {
      firstName,
      lastName,
      secondLastName,
      documentNumber,
      documentType,
      phone,
      email
    },
    cardInfo: { cvv, cardMethod, expiryDate, cardNumber }
  } = paymentInfo;
  let payUPaymentMethod;
  Sales.getPaymentOptions()
    .then(paymentMethods => {
      payUPaymentMethod = paymentMethods.find(m => m.paymentMethodType === 8);
      const { paymentMethodID } = payUPaymentMethod;
      return Sales.initializePayment(orderNumber, paymentMethodID);
    })
    .then(
      ({
        parameter1: publicKey,
        parameter2: accountId,
        parameter3: payuBaseUrl,
        parameter4: deviceSessionId
      }) => {
        const ownerName = `${firstName} ${lastName} ${secondLastName}`.trim();
        const expiryMonth = expiryDate.split("/")[0];
        const expiryYear = expiryDate.split("/")[1];

        payU.setURL(payuBaseUrl);
        payU.setPublicKey(publicKey);
        payU.setAccountID(accountId);
        payU.setListBoxID("mylistID");
        payU.getPaymentMethods();
        payU.setLanguage("es");
        payU.setCardDetails({
          number: cardNumber,
          name_card: "APPROVED",
          // name_card: ownerName,
          payer_id: documentNumber,
          exp_month: expiryMonth,
          exp_year: expiryYear,
          method: cardMethod.toUpperCase(),
          document: documentNumber,
          cvv
        });
        return new Promise((resolve, reject) => {
          payU.createToken(response => {
            if (response.error) {
              reject(new payU.PayuError(response.error));
            } else {
              resolve(response.token);
            }
          });
        });
      }
    )
    .then(token => {
      return apiPaymentRegister({
        baseUrl: "//devpaywall.comerciosuscripciones.pe", // TODO url en duro, environment no funciona
        orderNumber,
        firstName,
        lastName,
        secondLastName,
        documentType,
        documentNumber,
        email,
        phone,
        cardMethod,
        cardNumber, // TODO: Convertir en formato de mascara
        token,
        campaignCode,
        sku,
        priceCode,
        amount
      }).then(() => token);
    })
    .then(token => {
      const { paymentMethodID, paymentMethodType } = payUPaymentMethod;
      const sandboxToken = `${token}~${deviceSessionId}~${cvv}`;
      return sales
        .finalizePayment(orderNumber, paymentMethodID, sandboxToken)
        .then(({ status, total }) => {
          if (status !== "Paid") throw new Error(MESSAGE.PAYMENT_FAIL);
          return {
            publicKey,
            accountId,
            payuBaseUrl,
            deviceSessionId,
            paymentMethodID,
            paymentMethodType,
            status,
            total
          };
        });
    });
};
