'use client'

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { SearchManufacturerProps } from '@/types'
import React, { useState } from 'react'
import { manufacturers } from '@/constants'
import Image from 'next/image'
import clsx from 'clsx'

const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
  const [query, setQuery] = useState('')

  const filteredManufacturers = 
    query === '' ?
    manufacturers : manufacturers.filter((item) => (
      item.toLowerCase()
      .replace(/\s+/g, '')
      .includes(query.toLowerCase()
      .replace(/\s+/g, '')
    )))

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer} onClose={() => setQuery('')}>
        <div className="relative w-full">
        <ComboboxButton className="group absolute top-[14px]">
            <Image
                src='/car-logo.svg'
                width={20}
                height={20}
                className='ml-4'
                alt='car logo'
              />
          </ComboboxButton>
          <ComboboxInput
            className={'search-manufacturer__input'}
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='McLaren...'
          />
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--input-width)] rounded-xl border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible ',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
          )}
        >
          {filteredManufacturers.map((item) => (
            <ComboboxOption
              key={item}
              value={item}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-primary-blue"
            >
              <div className="text-sm/6 group-data-[focus]:text-white text-black/75 ">{item}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer