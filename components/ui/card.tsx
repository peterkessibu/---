export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">{children}</div>
  )
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="pb-4 border-b">{children}</div>
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="py-4">{children}</div>
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="pt-4 border-t">{children}</div>
}
