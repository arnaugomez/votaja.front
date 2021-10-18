import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import CogIcon from "../../../../public/assets/icons/cog.svg";
import SpinIcon from "../../../../public/assets/icons/spin.svg";
import BadgeTextSelector from "../../../common/view/atoms/BadgeTextSelector";
import Button from "../../../common/view/atoms/Button";
import Checkbox from "../../../common/view/atoms/Checkbox";
import H3 from "../../../common/view/atoms/H3";
import Input from "../../../common/view/atoms/Input";
import MaxWidth from "../../../common/view/atoms/MaxWidth";
import { Option } from "../../../common/view/view-models/Option";
import { Poll } from "../../domain/models/Poll";
import AnswersCreator from "../molecules/AnswersCreator";
import { answerToOption } from "../presenters/answerToOption";
import { useTranslation } from "next-i18next";

export interface FormValues {
  title: string;
  description: string;
  answers: Option<number>[];
  // Extra options
  isMultipleChoice: boolean;
  email: string;
  votesMax: string;
}

interface Props {
  poll: Poll;
  onCreate: (poll: Poll) => Promise<void>;
}

export default function CreatePoll({ poll, onCreate }: Props) {
  const [showExtraOptions, setShowExtraOptions] = useState(false);

  const { t } = useTranslation("createPoll");

  function handleSubmit(
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) {
    const votesMaxInt = parseInt(values.votesMax);
    const newPoll = new Poll({
      ...(poll?.toObject() ?? {}),
      ...values,
      votesMax: votesMaxInt ? votesMaxInt : null,
      answers: values.answers.map((a) => ({ id: a.value, title: a.label })),
      votes: [],
    });
    onCreate(newPoll).then(() => {
      helpers.setSubmitting(false);
    });
  }

  const initialValues: FormValues = !poll
    ? {
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
      }
    : {
        title: poll.title,
        description: poll.description,
        answers: poll.answers.map(answerToOption),
        isMultipleChoice: poll.isMultipleChoice,
        email: poll.email,
        votesMax: poll.votesMax?.toString(),
      };

  const schema = yup.object().shape({
    title: yup.string().required(t("titleError")),
    description: yup.string().notRequired(),
    answers: yup
      .array()
      .required()
      .min(2, t("error2options"))
      .max(50, t("error50options"))
      .test("two-options-not-blank", t("error2options"), (answers) => {
        const completedAnswers = answers.reduce((prev, a) => {
          if (a.label?.length > 0) {
            return prev + 1;
          }
          return prev;
        }, 0);
        return completedAnswers > 1;
      }),
    isMultipleChoice: yup.bool().required(),
    email: yup.string().email(t("emailError")).notRequired(),
    votesMax: yup.number().notRequired().min(2, t('form.votesMaxError')),
  });

  return (
    <section className="pb-16">
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
                  label={t("titleLabel")}
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  error={errors.title && touched.title && errors.title}
                />
                <BadgeTextSelector
                  options={[
                    t("titleSugg1"),
                    t("titleSugg2"),
                    t("titleSugg3"),
                    t("titleSugg4"),
                  ]}
                  value={values.title}
                  onChange={(v) => setFieldValue("title", v)}
                />

                <div className="h-5" />

                <AnswersCreator
                  values={values.answers}
                  onChange={(a) => setFieldValue("answers", a)}
                  label={t("answersLabel")}
                  error={
                    errors.answers &&
                    touched.answers &&
                    (errors.answers as string)
                  }
                />

                {showExtraOptions && (
                  <div className="p-2 pt-4 pb-0 bg-gray-100 rounded-lg mt-4">
                    <H3 className="pb-6 text-center">
                      {t("form.extraOptions")}
                    </H3>
                    <Checkbox
                      label={t("form.multipleChoiceLabel")}
                      value={values.isMultipleChoice}
                      name="isMultipleChoice"
                      onChange={handleChange}
                    />
                    <Input
                      label={t("form.descriptionLabel")}
                      name="description"
                      placeholder={t("form.descriptionPlaceholder")}
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
                      label={t("form.votesMaxLabel")}
                      placeholder={t("form.votesMaxPlaceholder")}
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
                      label={t("form.emailLabel")}
                      placeholder={t("form.emailPlaceholder")}
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
                      t("form.submitButton")
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
