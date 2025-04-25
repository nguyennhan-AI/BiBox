import React from "react";

const value = ["10 Gbs -- $15", "30 Gbs -- $35", "50 Gbs -- $60"];
const MemoryPicker = ({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="w-full">
      <select className="border rounded-full h-8 border-[#d7c1a5] w-full" value={selected} onChange={(e)=>{onChange(e.target.value)}}>
        <option value=""disabled>Choose a price that you feel suitable</option>
        {value.map((val)=>(
            <option key={val} value={val} className="border-[#d7c1a5]">{val}</option>
        ))}
      </select>
    </div>
  );
};

export default MemoryPicker;
