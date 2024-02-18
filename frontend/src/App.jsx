import { IconButton } from '@material-tailwind/react'
import Header from './components/Header/Header'
function App() {

  return (
    <div>
      <Header />
      <section className='bg-[#F8F9FA] pb-10 px-10'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex items-center justify-between py-6'>
            <h2 className='text-gray-700 text-lg'>Start a new document</h2>

            <IconButton color='gray' variant='text' size='md'>
              <img src="/more_vert.png" alt="" />
            </IconButton>
          </div>

          <div>
            <div className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700'>
              <img src="https://links.papareact.com/pju" alt="fill" />
            </div>
            <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>Blank</p>
          </div>
        </div>
      </section>

      <section className='bg-white px-10 md:px-0'>
        <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
          <div className='flex items-center justify-between pb-5'>
            <h2 className='font-medium flex-grow'>My Documents</h2>
            <p className='mr-12'>Date Created</p>
            <IconButton color='gray' variant='text' size='lg'>
              <i class="fa-solid fa-folder"></i>
            </IconButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
