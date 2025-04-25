const locations = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Khác"];

export function PaymentLocationPicker({ selected, onChange }: {
  selected: string;
  onChange: (location: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-medium">Chọn địa điểm</div>
      <select
        className="border border-gray-300 rounded-lg px-3 py-2"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option disabled value="">-- Chọn địa điểm --</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
    </div>
  );
}
