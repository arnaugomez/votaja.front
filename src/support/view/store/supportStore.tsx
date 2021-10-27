import { ISupportStore } from "../../domain/interfaces/ISupportStore";
import { useCallback } from "react";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useModalStore } from "src/ui/uiModule";
const SuggestionModal = dynamic(() => import("../components/SuggestionModal"));

export function useSupportStoreDep(): ISupportStore {
  const { t } = useTranslation("common");
  const { setModal } = useModalStore();

  const openSuggestionModal = useCallback(() => {
    setModal({
      title: t("supportModal.title"),
      content: <SuggestionModal />,
    });
  }, [setModal]);

  return { openSuggestionModal };
}
