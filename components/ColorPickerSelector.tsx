import ColorPicker from '@/types/ColorPicker'
import Image from 'next/image'

export default function ColorPickerSelector({
  options,
  selected,
  setSelected,
}: {
  options: ColorPicker[]
  selected: string
  setSelected: (selecte: string) => void
}) {
  return (
    <div className='space-y-3'>
      <div className='text-sm font-medium text-gray-600'>Choose Color</div>
      <div className='text-gray-900 font-semibold'>{selected}</div>

      <div className='flex items-center gap-3'>
        {options.map((option) => (
          <button
            key={option.color}
            onClick={() => setSelected(option.color)}
            className={`rounded-md border p-1 transition 
              ${
                selected === option.color
                  ? 'border-gray-800'
                  : 'border-transparent'
              }`}
          >
            <Image
              src={option.imageUrl}
              alt={option.color}
              width={50}
              height={50}
              className='rounded-md'
            />
          </button>
        ))}
      </div>
    </div>
  )
}
