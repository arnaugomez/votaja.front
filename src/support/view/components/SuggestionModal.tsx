import GithubIcon from "@icons/github";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "src/common/view/components/atoms/Button";
import { withDeps } from "src/common/view/hocs/withDeps";
import { ISupportRepository } from "src/support/domain/interfaces/ISupportRepository";
import { Suggestion } from "src/support/domain/models/Suggestion";
import { supportRepository } from "src/support/supportModule";
import { IModalStore } from "src/ui/domain/interfaces/IModalStore";
import { useModalStore } from "src/ui/uiModule";
import SuggestionForm from "./SendSuggestionForm";

interface Props {
  supportRepository: ISupportRepository;
  useModalStore: () => IModalStore;
}

function SendSuggestionModal({ supportRepository, useModalStore }: Props) {
  const { clearModal } = useModalStore();
  const { t } = useTranslation("common");

  async function sendSuggestion(s: Suggestion) {
    const err = await supportRepository.sendSuggestion(s);
    if (err) {
      // TODO: handle error with toaster
      console.error(err);
    }
    clearModal();
  }

  return (
    <>
      <SuggestionForm onSubmit={sendSuggestion} />
      <p className="pt-6 pb-3 text-sm text-gray-600 text-center">
        {t("supportModal.orRather")}
      </p>
      <Button fullWidth color="primary" variant="subtle">
        <a
          href="https://github.com/arnaugomez/votaja.front/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 "
        >
          <p>{t("supportModal.openIssue")}</p>
          <div className="h-4 w-4">
            <GithubIcon />
          </div>
        </a>
      </Button>
    </>
  );
}

const module = { supportRepository, useModalStore };
export default withDeps(SendSuggestionModal)(module);
