import React, { useState } from "react";
import MaxWidth from "../../../common/view/atoms/MaxWidth";
import * as yup from "yup";
import Input from "../../../common/view/atoms/Input";
import { Formik, FormikValues } from "formik";
import Button from "../../../common/view/atoms/Button";
import { Option } from "../../../common/view/view-models/Option";
import AnswersCreator from "../molecules/AnswersCreator";
import Checkbox from "../../../common/view/atoms/Checkbox";
import H3 from "../../../common/view/atoms/H3";

interface FormValues {
  title: string;
  description: string;
  answers: Option<number>[];
  isMultiple: boolean;
  email: string;
}

const initialValues: FormValues = {
  title: "",
  description: null,
  answers: [
    {
      label: "",
      value: 1,
    },
  ],
  isMultiple: false,
  email: "",
};

export default function CreatePoll() {
  const [showExtraOptions, setShowExtraOptions] = useState(false);
  function handleSubmit(values: FormikValues) {
    console.log(values);
  }
  return (
    <section className="pb-10">
      <MaxWidth>
        <Formik<FormValues>
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {function ({
            values,
            errors,
            handleBlur,
            handleChange,
            touched,
            setFieldValue,
            handleSubmit,
          }) {
            return (
              <form onSubmit={handleSubmit}>
                <Input
                  fullWidth
                  label="Títol de l'enquesta"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  error={errors.title && touched.title && errors.title}
                />

                {values.description === null ? (
                  <Button
                    className="mb-4"
                    fullWidth
                    color="boring"
                    variant="subtle"
                    onClick={() => setFieldValue("description", "")}
                  >
                    Afegeix descripció
                  </Button>
                ) : (
                  <Input
                    label="Descripció"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={
                      errors.description &&
                      touched.description &&
                      errors.description
                    }
                  />
                )}
                <div className="p-4" />

                <AnswersCreator
                  values={values.answers}
                  onChange={(a) => setFieldValue("answers", a)}
                  label="Opcions"
                  error={
                    errors.answers &&
                    touched.answers &&
                    (errors.answers as string)
                  }
                />

                {showExtraOptions && (
                  <div className="p-2 pb-0 bg-gray-100 rounded-lg mt-4">
                    <H3 className="pb-3 text-center">Opcions extra</H3>
                    <Checkbox
                      label="Permet resposta múltiple"
                      value={values.isMultiple}
                      name="isMultiple"
                      onChange={handleChange}
                    />
                    <Input
                      fullWidth
                      label="T'enviem l'enllaç de l'enquesta per correu?"
                      placeholder="exemple@votaja.com"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={errors.email && touched.email && errors.email}
                    />
                  </div>
                )}

                <div className="pt-8 flex justify-between">
                  {!showExtraOptions ? (
                    <Button
                      variant="subtle"
                      color="boring"
                      onClick={() => setShowExtraOptions(true)}
                    >
                      Opcions extra
                    </Button>
                  ): <div/>}
                  <Button isSubmit>Crear enquesta</Button>
                </div>
              </form>
            );
          }}
        </Formik>
      </MaxWidth>
    </section>
  );
}
