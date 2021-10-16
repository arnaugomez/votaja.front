import { Formik, FormikHelpers } from "formik";
import React from "react";
import { Option } from "../../../common/view/view-models/Option";
import { Poll } from "../../domain/models/Poll";
import * as yup from "yup";
import Button from "../../../common/view/atoms/Button";
import SpinIcon from "../../../../public/assets/icons/spin.svg";
import Input from "../../../common/view/atoms/Input";
import CheckboxSelect from "../../../common/view/molecules/CheckboxSelect";
import { answerToOption } from "../presenters/answerToOption";
import RadioSelect from "../../../common/view/molecules/RadioSelect";

interface FormValues {
  name: string;
  answers: Option<number>[];
}

const initialValues: FormValues = {
  name: "",
  answers: [],
};

interface Props {
  poll: Poll;
  onVote: (newPoll: Poll) => Promise<void>;
  onShowResults: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required("No t'oblidis del nom."),
  answers: yup.array().required().min(1, "Escull una opció."),
});

export default function VoteForm({ poll, onVote, onShowResults }: Props) {
  function handleSubmit(
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) {
    const pollObj = poll.toObject();
    pollObj.votes.push({
      answers: values.answers.map((a) => a.value),
      name: values.name,
    });
    onVote(new Poll(pollObj)).then(() => helpers.setSubmitting(false));
  }
  console.log(poll.isMultipleChoice);
  const Select = poll.isMultipleChoice ? CheckboxSelect : RadioSelect;

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
        handleSubmit
      }) {
        return (
          <form onSubmit={handleSubmit}>
            <Input
              label="Nom"
              placeholder="Escriu el teu nom"
              value={values.name}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name && touched.name && errors.name}
            />
            <div className="h-6" />

            <Select<number>
              label={
                poll.isMultipleChoice
                  ? "Tria una o més opcions"
                  : "Tria una opció"
              }
              options={poll.answers.map(answerToOption)}
              values={values.answers}
              onChange={(o) => setFieldValue("answers", o)}
              error={
                errors.answers && touched.answers && (errors.answers as string)
              }
            />
            <div className="pt-8 flex justify-between">
              <Button variant="subtle" color="boring" onClick={onShowResults}>
                Resultats
              </Button>
              <Button
                className="w-36 flex justify-center items-center"
                isSubmit
              >
                {isSubmitting ? (
                  <div className="animate-spin">
                    <SpinIcon />
                  </div>
                ) : (
                  "Vota"
                )}
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
