import SpinIcon from "@icons/spin";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "src/common/view/components/atoms/Button";
import Input from "src/common/view/components/atoms/Input";
import TextArea from "src/common/view/components/atoms/TextArea";
import { Suggestion } from "src/support/domain/models/Suggestion";
import * as yup from "yup";

interface FormValues {
  name?: string;
  email?: string;
  description: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  description: "",
};

interface Props {
  onSubmit(s: Suggestion): Promise<void>;
}

export default function SuggestionForm({ onSubmit }: Props) {
  function handleSubmit(v: FormValues, h: FormikHelpers<FormValues>) {
    onSubmit(v).catch(() => h.setSubmitting(false));
  }

  const { t } = useTranslation("common");

  const schema = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email(t("supportModal.emailError")).notRequired(),
    description: yup.string().required(t("supportModal.descriptionError")),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Input
              fullWidth
              label={t("supportModal.nameLabel")}
              placeholder={t("supportModal.namePlaceholder")}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={errors.name && touched.name && errors.name}
            />
            <Input
              fullWidth
              label={t("supportModal.emailLabel")}
              placeholder={t("supportModal.emailPlaceholder")}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email && errors.email}
            />
            <TextArea
              fullWidth
              label={t("supportModal.descriptionLabel")}
              placeholder={t("supportModal.descriptionPlaceholder")}
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={
                errors.description && touched.description && errors.description
              }
            />
            <div className="pt-4 flex justify-end">
              <Button className="w-36" isSubmit>
                {isSubmitting ? (
                  <div className="animate-spin">
                    <SpinIcon />
                  </div>
                ) : (
                  "Envia"
                )}
              </Button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
