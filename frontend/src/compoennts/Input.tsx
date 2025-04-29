type InputProps = {
  label: string
  type: string
  id: string
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="mb-2">
      <label htmlFor={props.id} className="text-sm font-semibold text-gray-800">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2 mt-2 bg-white border rounded-md outline-0"
      />
    </div>
  )
}
