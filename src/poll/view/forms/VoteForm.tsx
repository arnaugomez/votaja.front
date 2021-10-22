import { Formik, FormikHelpers } from "formik";
import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";
import * as yup from "yup";
import Button from "../../../common/view/components/atoms/Button";
import Checkbox from "../../../common/view/components/atoms/Checkbox";
import Input from "../../../common/view/components/atoms/Input";
import CheckboxSelect from "../../../common/view/components/molecules/CheckboxSelect";
import RadioSelect from "../../../common/view/components/molecules/RadioSelect";
import { Option } from "../../../common/view/view-models/Option";
import { Poll } from "../../domain/models/Poll";
import { Vote } from "../../domain/models/Vote";
import { answerToOption } from "../presenters/answerToOption";

interface FormValues {
  name: string;
  answers: Option<number>[];
}

interface Props {
  poll: Poll;
  vote: Vote;
  onVote: (newVote: Vote) => Promise<void>;
  onShowResults: () => void;
}

export default function VoteForm({ poll, onVote, onShowResults, vote }: Props) {
  const pollOptions = useMemo(() => poll.answers.map(answerToOption), [poll]);

  function handleSubmit(
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) {
    onVote({
      id: vote?.id,
      answers: values.answers.map((a) => a.value),
      name: values.name,
    }).catch(() => helpers.setSubmitting(false));
  }

  const Select = poll.isMultipleChoice ? CheckboxSelect : RadioSelect;

  const { t } = useTranslation("votePoll");

  const initialValues: FormValues = useMemo(
    () => ({
      name: vote?.name ?? "",
      answers: vote
        ? vote.answers.map((a) => pollOptions.find((o) => o.value === a))
        : [],
    }),
    [vote]
  );

  const schema = yup.object().shape({
    name: yup.string().required(t("form.nameError")),
    answers: yup.array().required().min(1, t("form.answersError")),
  });

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {function ({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        isSubmitting,
        setFieldValue,
        handleSubmit,
      }) {
        return (
          <form onSubmit={handleSubmit}>
            <Input
              label={t("form.nameLabel")}
              placeholder={t("form.namePlaceholder")}
              value={values.name}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name && touched.name && errors.name}
            />
            <div className="h-1" />
            <Checkbox
              label={t("form.anonymous")}
              value={values.name === t("form.anonymous")}
              onChange={() => setFieldValue("name", t("form.anonymous"))}
            />
            <div className="h-6" />

            <Select<number>
              label={
                poll.isMultipleChoice
                  ? t("form.selectManyLabel")
                  : t("form.selectOneLabel")
              }
              options={pollOptions}
              values={values.answers}
              onChange={(o) => setFieldValue("answers", o)}
              error={
                errors.answers && touched.answers && (errors.answers as string)
              }
            />
            <div className="pt-8 flex justify-between">
              <Button variant="subtle" color="boring" onClick={onShowResults}>
                {t("results.results")}
              </Button>
              <Button
                className="w-36 flex justify-center items-center"
                isSubmit
                isLoading={isSubmitting}
              >
                {t("vote")}
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
