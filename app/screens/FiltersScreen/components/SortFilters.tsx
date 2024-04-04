import { SelectList } from "react-native-dropdown-select-list";
import react, { useState } from "react";

export default function SortFilters() {
  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
  ];

  return (
    <SelectList
      setSelected={(val: any) => setSelected(val)}
      data={data}
      save="value"
    />
  );
}
