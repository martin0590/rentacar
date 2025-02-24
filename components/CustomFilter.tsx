'use client'

import { CustomFilterProps } from '@/types'
import { updateSearchParams } from '@/utils'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import clsx from 'clsx'

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const router = useRouter()
  const [selected, setSelected] = useState(options[0])

  const handleUpdateParams = (e: { title: string, value: string}) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase())

    router.push(newPathName, {scroll: false})
  }


  return (
    <div className='w-fit'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e)
          handleUpdateParams(e)
        }}
      >
        <div className="relative w-fit z-10">
          <ListboxButton className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="chevron up down"
            />
          </ListboxButton>

          <ListboxOptions
            anchor="bottom"
            transition
            // className={"custom-filter__options"}
            className={clsx(
              'w-[var(--button-width)] rounded-xl border border-white/5 text-black/75 text-sm/6 bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
            )}

          >
            {options.map((option) => (
              <ListboxOption
                key={option.title}
                value={option}
                // className={"relative cursor-default select-none py-2 px-4"}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:text-white data-[focus]:bg-primary-blue-100"
              >
                <span className='block truncate'>{option.title}</span>
              </ListboxOption>
            ))}


          </ListboxOptions>
        </div>
      </Listbox>

    </div>
  )
}

export default CustomFilter