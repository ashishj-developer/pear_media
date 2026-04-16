import { useState } from 'react'

function App() {
  const workflow = [
    {
      name: 'Creative Studio',
      icon: 'Refine and enhance your prompts for better results.',
    },
    {
      name: 'Style Lab',
      icon: 'Generate stunning visuals from your enhanced prompts.',
    }
  ]

  return (
    <div className="bg-[#eaeafa] h-screen w-screen flex flex-col items-center p-4">
      <div className='flex items-center h-15 my-4'>
        <div className='bg-[#7a58e8] flex items-center h-12 mx-2 rounded-xl w-12 justify-center shadow-lg inset-shadow-sm '>
            <h2 className='text-3xl text-white font-bold'>P</h2>
          </div>
          <h1 className="text-2xl font-sans">
          Pear Media
        </h1>
      </div>
      <div className="flex flex-col items-center w-80 h-full">
        <h1 className='text-3xl font-bold'>AI Creative Suite</h1>
        <p className='text-center text-xl mt-2 text-slate-500'>Transform simple ideas into stunning visuals with AI-powered prompt enhancement</p>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default App
