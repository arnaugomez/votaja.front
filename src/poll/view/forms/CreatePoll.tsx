import React from "react";
import MaxWidth from "../../../common/view/atoms/MaxWidth";
import * as yup from "yup";
import Input from "../../../common/view/atoms/Input";
import { Formik, FormikValues } from "formik";
import Button from "../../../common/view/atoms/Button";
import { Option } from "../../../common/view/view-models/Option";
import AnswersCreator from "../molecules/AnswersCreator";

interface FormValues {
  title: string;
  description: string;
  answers: Option<number>[];
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
};

export default function CreatePoll() {
  function handleSubmit(values: FormikValues) {
    console.log(values);
  }
  return (
    <section>
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

                <Button isSubmit>Crear enquesta</Button>
              </form>
            );
          }}
        </Formik>
      </MaxWidth>
    </section>
  );
}
