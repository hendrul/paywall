import React from "react";
import { Formik, Form, Field } from "formik";

import * as S from "./styled";
import InputFormik from "../../../_children/input";
import Button from "../../../_children/button";
import Error from "../../../_children/error";
import { FormSchema, Masks } from "./schema";

const { capitalize, combine, replace, trim, trimStart, dedup } = Masks.Pipes;
const personNamePipe = combine(
  replace(/(^|\s)[-]/, "$1"),
  dedup(" "),
  trimStart(),
  capitalize()
);

const FormStyled = S.Form(Form);

const UserProfile = ({ title = "", profile, error, onSubmit, onReset }) => {
  return (
    <Formik
      initialValues={Object.assign({}, { documentType: "DNI" }, profile)}
      validate={values => new FormSchema(values)}
      onSubmit={(values, actions) => {
        onSubmit(
          {
            ...values,
            phone: values.phone.replace(/\D/g, ""),
            // TODO: Crear un servicio desde el que se pueda obtener billing address
            billingAddress: {
              country: "PE"
            }
          },
          actions
        );
      }}
      onReset={onReset}
      render={({ setFieldValue, isSubmitting, values: { documentType } }) => {
        return (
          <FormStyled>
            <S.WrapTitle>
              <S.Title>{title}</S.Title>
            </S.WrapTitle>
            <S.Wrap>
              <S.WrapField>
                <Field
                  name="firstName"
                  label="Nombres"
                  pipe={personNamePipe}
                  mask={Masks.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="lastName"
                  label="Apellido Paterno"
                  pipe={personNamePipe}
                  mask={Masks.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="secondLastName"
                  label="Apellido Materno"
                  pipe={personNamePipe}
                  mask={Masks.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="documentNumber"
                  label="Tipo de documento"
                  mask={Masks[documentType.toUpperCase()]}
                  type="text"
                  prefix={
                    <Field
                      name="documentType"
                      key="select"
                      component={({
                        field: { onChange, ...restField },
                        ...restProps
                      }) => (
                        <S.Select
                          onChange={(...args) => {
                            setFieldValue("documentNumber", "");
                            onChange(...args);
                          }}
                          {...restField}
                          {...restProps}
                        >
                          <option value="DNI">DNI</option>
                          <option value="CEX">CEX</option>
                          <option value="CDI">CDI</option>
                        </S.Select>
                      )}
                    />
                  }
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="phone"
                  pipe={trim()}
                  mask={Masks.PHONE}
                  label="Número de Celular"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="email"
                  label="Correo Electrónico"
                  component={InputFormik}
                />
              </S.WrapField>
            </S.Wrap>
            {error && <Error mb="20px" message={error} />}
            <Button disabled={isSubmitting} maxWidth="300px" type="submit">
              CONTINUAR
            </Button>
          </FormStyled>
        );
      }}
    />
  );
};

export default UserProfile;
