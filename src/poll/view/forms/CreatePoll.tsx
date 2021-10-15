import { deleteField } from "@firebase/firestore";
import { Formik, FormikHelpers, FormikValues } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import CogIcon from "../../../../public/assets/icons/cog.svg";
// TODO: Change spin icon
import SpinIcon from "../../../../public/assets/icons/spin.svg";
import Button from "../../../common/view/atoms/Button";
import Checkbox from "../../../common/view/atoms/Checkbox";
import H3 from "../../../common/view/atoms/H3";
import Input from "../../../common/view/atoms/Input";
import MaxWidth from "../../../common/view/atoms/MaxWidth";
import { Option } from "../../../common/view/view-models/Option";
import { Poll } from "../../domain/models/Poll";
import AnswersCreator from "../molecules/AnswersCreator";

export interface FormValues {
  title: string;
  description: string;
  answers: Option<number>[];
  // Extra options
  isMultipleChoice: boolean;
  email: string;
  votesMax: string;
}

const initialValues: FormValues = {
  title: "",
  description: "",
  answers: [
    {
      label: "",
      value: 1,
    },
  ],
  isMultipleChoice: false,
  email: "",
  votesMax: "",
};

const schema = yup.object().shape({
  title: yup.string().required("Necessito un títol."),
  description: yup.string().notRequired(),
  answers: yup
    .array()
    .required()
    .min(2, "Necessito com a mínim 2 opcions.")
    .max(50, "Has superat el màxim de 50 opcions.")
    .test(
      "two-options-not-blank",
      "Et falten opcions per completar… com a mínim 2.",
      (answers) => {
        const completedAnswers = answers.reduce((prev, a) => {
          if (a.label?.length > 0) {
            return prev + 1;
          }
          return prev;
        }, 0);
        return completedAnswers > 1;
      }
    ),
  isMultipleChoice: yup.bool().required(),
  email: yup.string().notRequired(),
  votesMax: yup.string().notRequired(),
});

interface Props {
  onCreate: (poll: Poll) => Promise<void>;
}

export default function CreatePoll({ onCreate }: Props) {
  const [showExtraOptions, setShowExtraOptions] = useState(false);

  function handleSubmit(
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) {
    const votesMaxInt = parseInt(values.votesMax);
    const poll = new Poll({
      ...values,
      votesMax: votesMaxInt ? votesMaxInt : null,
      answers: values.answers.map((a) => ({ id: a.value, title: a.label })),
      votes: [],
    });
    onCreate(poll).then(() => {
      helpers.setSubmitting(false);
    });
  }

  return (
    <section className="pb-10">
      <MaxWidth>
        <Formik<FormValues>
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          {function ({
            values,
            errors,
            handleBlur,
            handleChange,
            touched,
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) {
            return (
              <form onSubmit={handleSubmit}>
                <Input
                  fullWidth
                  label="Pregunta de l'enquesta"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  error={errors.title && touched.title && errors.title}
                />

                <div className="p-4" />

                <AnswersCreator
                  values={values.answers}
                  onChange={(a) => setFieldValue("answers", a)}
                  label="Respostes de l'enquesta"
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
                      value={values.isMultipleChoice}
                      name="isMultiple"
                      onChange={handleChange}
                    />
                    <Input
                      label="Afegeix una descripció"
                      name="description"
                      placeholder="Descripció de l'enquesta"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      error={
                        errors.description &&
                        touched.description &&
                        errors.description
                      }
                    />
                    <Input
                      type="number"
                      fullWidth
                      label="Quanta gent respondrà a l'enquesta?"
                      placeholder="Escriu un número"
                      name="votesMax"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.votesMax}
                      error={
                        errors.votesMax && touched.votesMax && errors.votesMax
                      }
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
                      className="w-20 flex justify-center items-center"
                      variant="subtle"
                      color="boring"
                      onClick={() => setShowExtraOptions(true)}
                    >
                      <CogIcon />
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button
                    className="w-36 flex justify-center items-center"
                    isSubmit
                  >
                    {isSubmitting ? (
                      <div className="animate-spin">
                        <SpinIcon />
                      </div>
                    ) : (
                      "Crea enquesta"
                    )}
                  </Button>
                </div>
              </form>
            );
          }}
        </Formik>
      </MaxWidth>
    </section>
  );
}
