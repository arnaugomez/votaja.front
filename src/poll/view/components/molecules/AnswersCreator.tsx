import React, { useEffect, useRef } from "react";
import Button from "../../../../common/view/components/atoms/Button";
import Input from "../../../../common/view/components/atoms/Input";
import { Option } from "../../../../common/view/view-models/Option";
import AddIcon from "@icons/add";
import BinIcon from "@icons/bin";

type Answers = Option<number>[];

interface Props {
  label?: string;
  values?: Answers;
  onChange: (a: Answers) => void;
  error?: string;
}

export default function AnswersCreator({
  label,
  error,
  values,
  onChange,
}: Props) {
  const valuesAmountRef = useRef(1);
  const ulRef = useRef<HTMLUListElement>(null);
  const maxValue = values.reduce<number>(
    (previousValue, currentValue) =>
      Math.max(previousValue, currentValue.value),
    0
  );

  useEffect(() => {
    if (values.length > valuesAmountRef.current) {
      (
        ulRef.current.querySelector("li:last-child input") as HTMLInputElement
      )?.focus();
    }
    valuesAmountRef.current = values.length;
  }, [values]);

  const disableDelete = values.length < 3;

  function addValue() {
    onChange([...values, { label: "", value: maxValue + 1 }]);
  }

  function removeValue(value: number) {
    onChange(values.filter((v) => v.value !== value));
  }

  function changeText(o: Option<number>) {
    onChange(values.map((v) => (v.value === o.value ? o : v)));
  }

  return (
    <article className="block pb-4">
      {label && <p className="text-sm pb-2 font-medium">{label}</p>}

      <ul ref={ulRef}>
        {values.map(({ label, value }) => (
          <li key={value} className="flex space-x-3">
            <Input
              fullWidth
              onChange={(e) => changeText({ value, label: e.target.value })}
              value={label}
            />
            <div className="pb-2 flex-none flex items-center">
              <button
                aria-label="Delete answer"
                type="button"
                className={
                  "h-6 w-8 fix-svg " +
                  (disableDelete
                    ? "text-gray-200 "
                    : "text-red-400 hover:text-red-600")
                }
                onClick={!disableDelete ? () => removeValue(value) : null}
              >
                <BinIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Button
        ariaLabel="Add answer"
        fullWidth
        variant="subtle"
        color="success"
        onClick={addValue}
      >
        <AddIcon />
      </Button>

      {error && <p className="text-xs pt-2 text-red-700">{error}</p>}
    </article>
  );
}
