import { Ref, ref } from "vue";

type UseAccordion = (isOpen: boolean) => {
  isContentOpen: Ref<boolean>;
  toggle: () => void;
};

export const useAccordion: UseAccordion = (_isOpen) => {
  /* 開閉状態 */
  const isContentOpen = ref(_isOpen);

  return {
    isContentOpen,
    toggle: () => (isContentOpen.value = !isContentOpen.value),
  };
};
