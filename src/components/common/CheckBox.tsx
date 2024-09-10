import React from 'react'
import { Checkbox } from '../ui/checkbox'
import externalIcon from '/external.svg'

interface IProps {
    id: number,
    label: string,
    isChecked: boolean,
    handleOnChange: (id: number) => void,
    isIcon?: boolean,
}

const CheckBox: React.FC<IProps> = ({ id, label, isChecked, handleOnChange, isIcon }) => {
    return (
        <div className='flex justify-between'>
            <div className="flex items-center space-x-2 w-full">
                <Checkbox
                    id={id.toString()}
                    checked={isChecked}
                    onClick={() => handleOnChange(id)}
                    className={`${isChecked ? 'bg-blue-500' : ''}`}
                />
                <label
                    htmlFor={id.toString()}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                </label>
            </div>
            {isIcon && <img src={externalIcon} alt='external_page_link_icon' />}
        </div>
    )
}

export default CheckBox