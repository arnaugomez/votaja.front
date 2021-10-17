import { Formik } from "formik";
import React, { useMemo } from "react";
import * as yup from "yup";
import SpinIcon from "../../../../public/assets/icons/spin.svg";
import Button from "../../../common/view/atoms/Button";
import Checkbox from "../../../common/view/atoms/Checkbox";
import Input from "../../../common/view/atoms/Input";
import CheckboxSelect from "../../../common/view/molecules/CheckboxSelect";
import RadioSelect from "../../../common/view/molecules/RadioSelect";
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
  voteId: string;
  onVote: (newPoll: Poll) => Promise<void>;
  onShowResults: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required("No t'oblidis del nom."),
  answers: yup.array().required().min(1, "Escull una opció."),
});

export default function VoteForm({
  poll,
  onVote,
  onShowResults,
  voteId,
}: Props) {
  const pollOptions = useMemo(() => poll.answers.map(answerToOption), [poll])
  const currentVote = useMemo(
    () => poll.votes.find((v) => v.id === voteId),
    [poll, voteId]
  );
  const initialValues: FormValues = useMemo(
    () => ({
      name: currentVote ? currentVote.name : "",
      answers: currentVote ? currentVote.answers.map((a) => pollOptions.find(o => o.value === a)): [],
    }),
    [currentVote]
  );

  function handleSubmit(
    values: FormValues,
  ) {
    const pollObj = poll.toObject();
    const newVote: Vote = {
      id: voteId,
      answers: values.answers.map((a) => a.value),
      name: values.name,
    };

    if (currentVote) {
      pollObj.votes = pollObj.votes.map((v) => (v.id === voteId ? newVote : v));
    } else {
      pollObj.votes.push(newVote);
    }

    onVote(new Poll(pollObj));
  }

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
        handleSubmit,
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
            <div className="h-1" />
            <Checkbox
              label="Anònim"
              value={values.name === "Anònim"}
              onChange={() => setFieldValue("name", 'Anònim')}
            />
            <div className="h-6" />

            <Select<number>
              label={
                poll.isMultipleChoice
                  ? "Tria una o més opcions"
                  : "Tria una opció"
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
