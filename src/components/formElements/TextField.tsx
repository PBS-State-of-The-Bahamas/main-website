import React, {useEffect} from 'react'

type Props = {
    label: string;
    placeholder?: string;
    onChange: any;
    onBlur?: any;
    value: string | number;
    errorMessage?: string;
    formType?: string;
    optional?: boolean;
    for: string;
}

const TextField = (props: Props) => {1
  return (
    <div className='mb-2'>
        <label htmlFor={props.label} className='capitalize'>{props.label} {props.optional && <span> (Optional)</span>}</label> <br />
        <input type={props.formType || 'text'} 
          name={props.for}
          id={props.for} 
          className='border-[1.5px] shadow-inner border-gray-2 rounded py-2 px-3 w-full text-gray-5 tracking-wider mt-1'
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
          onBlur={props.onBlur}
        />
        <div className={`${!props.errorMessage && 'hidden'} text-heading-6 text-feedback-warning bg-[#ECCCCC] py-1 px-2 mt-[2px]`}>{props.errorMessage}</div>
    
    </div>
  )
}

export default TextField