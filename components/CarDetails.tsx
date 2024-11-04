import { CarDetailsProps } from '@/types'
import Image from 'next/image'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { generateCarImageUrl } from '@/utils'


const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {

  return (
    <>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition  
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <Button
                type='button'
                className='absolute top-2 right-2 z-10 w-fit p-2 bg-white rounded-full'
                onClick={closeModal}
              >
                <Image
                  src='/close.svg'
                  alt='close'
                  width={20}
                  height={20}
                  className='object-contain'
                />
              </Button>

              {/* imagenes */}
              <div className='flex-1 flex flex-col gap-3'>
                  <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
                    <Image src={`${generateCarImageUrl(car)}`} alt='car model' fill priority className='object-contain' />
                  </div>
                  <div className='flex gap-3'>
                    <div className='flex-1 relative w-full h-24  rounded-lg'>
                      <Image src={`${generateCarImageUrl(car, '29')}`} alt='car model' fill priority className='object-contain' />
                    </div>
                    <div className='flex-1 relative w-full h-24  rounded-lg'>
                      <Image src={`${generateCarImageUrl(car, '33')}`} alt='car model' fill priority className='object-contain' />
                    </div>
                    <div className='flex-1 relative w-full h-24  rounded-lg'>
                      <Image  src={`${generateCarImageUrl(car, '13')}`} alt='car model' fill priority className='object-contain' />
                    </div>
                  </div>
                </div>
              
              {/* car */}
              <DialogTitle as="h3" className="font-semibold text-xl capitalize">
                {car.make} {car.model}
              </DialogTitle>

              {/* car details */}
              <div className='mt-3 flex flex-wrap gap-4'>
                    {Object.entries(car).map(([key, value]) => (
                      <div className='flex justify-between gap-5 w-full text-right' key={key} >
                        <h4 className='text-black-100 capitalize'>
                          {key.split("_").join(" ")}
                        </h4>
                        <p className='text-black-100 font-semibold'>
                          {value}
                        </p>
                      </div>
                    ))}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default CarDetails