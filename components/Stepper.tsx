import React from 'react'

type StepperProps = {
  state: 0 | 1 | 2
}

const Stepper: React.FC<StepperProps> = ({ state }) => {
  const steps = [
    { label: 'Shopping cart' },
    { label: 'Checkout details' },
    { label: 'Order complete' },
  ]

  const title = state === 0 ? 'Cart' : state === 1 ? 'Check Out' : 'Complete!'

  return (
    <div className='flex flex-col w-full gap-12'>
      <h1 className='text-6xl text-center font-bold'>{title}</h1>
      <div className='flex items-center justify-center gap-10 w-full'>
        {steps.map((step, index) => {
          const isCompleted = index < state
          const isActive = index === state
          return (
            <div key={index} className='flex flex-col items-center relative'>
              {/* Step circle */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                ${
                  isCompleted
                    ? 'bg-green-500 border-green-500 text-white'
                    : isActive
                    ? 'bg-gray-900 border-gray-900 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <svg
                    className='w-4 h-4 text-white'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-sm ${
                  isCompleted || isActive ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>

              {/* Line connector */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 w-[120px] h-[2px] -translate-y-1/2 translate-x-4
                  ${
                    isCompleted
                      ? 'bg-green-400'
                      : isActive
                      ? 'bg-gray-300'
                      : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Stepper
