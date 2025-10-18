export default function Quantity({
  quantity,
  setQuantity,
}: {
  quantity: number
  setQuantity: (value: number) => void
}) {
  const increment = () => setQuantity(quantity + 1)
  const decrement = () => setQuantity(Math.max(1, quantity - 1)) // Prevent negatives or zero

  return (
    <div className='flex items-center justify-between w-24 bg-black-100 rounded-lg shadow-sm border border-gray-200 min-w-32'>
      <button
        onClick={decrement}
        className='flex-1 text-gray-500 hover:text-gray-700 py-1 text-xl cursor-pointer'
      >
        −
      </button>
      <span className='flex-1 text-center font-medium text-gray-800 select-none'>
        {quantity}
      </span>
      <button
        onClick={increment}
        className='flex-1 text-gray-500 hover:text-gray-700 py-1 text-xl cursor-pointer'
      >
        +
      </button>
    </div>
  )
}
