import { ISupportStore } from "../../domain/interfaces/ISupportStore";
import { useModalStore } from "src/ui/view/store/modalStore";
import { useCallback } from "react";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
const SuggestionModal = dynamic(() => import("../components/SuggestionModal"));

export function useSupportStore(): ISupportStore {
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
