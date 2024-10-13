export function Checkbox({ checked, onCheckedChange }: { checked?: boolean, onCheckedChange: (value: boolean) => void }) {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="form-checkbox text-blue-600 rounded-md focus:ring-blue-500"
      />
      <span className="ml-2">Checkbox Label</span>
    </label>
  )
}
