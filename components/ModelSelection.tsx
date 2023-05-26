import React from "react";
import useSWR from "swr";
import Select, { SingleValue } from "react-select";

const fetchModels = () => fetch("/api/selectEngines").then((res) => res.json());
function ModelSelection() {
  const { data: models, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });
  console.log(models);

  return (
    <div>
      <strong className="mt-3 text-slate-300 text-xs">
        Select your model:
      </strong>
      <Select
        className="bg-slate-600 my-2 text-black"
        isSearchable
        options={models?.modelOptions}
        defaultValue={model}
        placeholder={model}
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-black border-black",
        }}
        onChange={(e: SingleValue<HTMLOptionElement>) => setModel(e?.value)}
      />
    </div>
  );
}

export default ModelSelection;
