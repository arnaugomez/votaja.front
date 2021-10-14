import React from "react";
import Button from "../../../common/view/atoms/Button";
import Input from "../../../common/view/atoms/Input";
import { Option } from "../../../common/view/view-models/Option";
import AddIcon from "../../../../public/assets/icons/add.svg";
import BinIcon from "../../../../public/assets/icons/bin.svg";

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
  const maxValue = values.reduce<number>(
    (previousValue, currentValue) =>
      Math.max(previousValue, currentValue.value),
    0
  );

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
    <label className="block pb-4">
      {label && <p className="text-small pb-3 font-medium">{label}</p>}

      <ul>
        {values.map(({ label, value }) => (
          <li key={value} className="flex gap-3">
            <Input
              fullWidth
              onChange={(e) => changeText({ value, label: e.target.value })}
              value={label}
            />
            <div className="pb-4 flex-none flex items-center">
              <button
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

      <Button fullWidth variant="subtle" color="success" onClick={addValue}>
        <AddIcon />
      </Button>

      {error && <p className="text-xs pt-1 text-red">{label}</p>}
    </label>
  );
}
