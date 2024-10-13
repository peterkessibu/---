export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500">
      {children}
    </div>
  )
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="w-full mt-2 bg-white border border-gray-300 rounded-md">{children}</div>
}

export function SelectItem({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
    >
      {children}
    </div>
  )
}
