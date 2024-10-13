export function Switch({ checked, onCheckedChange }: { checked: boolean, onCheckedChange: (value: boolean) => void }) {
  return (
    <div
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in ${checked ? "bg-blue-600" : "bg-gray-400"
        }`}
    >
      <input
        type="checkbox"
        checked={checked}
        aria-label="Toggle Switch"
        className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      />
    </div>
  )
}
