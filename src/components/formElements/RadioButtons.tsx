import React from 'react'

type Props = {
    label: string;
    options: {key: string, value: string | number}[];
    for: string;
    onChange: any;
}

const RadioButtons = (props: Props) => {
  return (
    <div>
        <h5>{props.label}</h5>
        <fieldset>
            {
                props.options.map((option, index) => (
                    <div key={option.key}>
                        <input type="radio" name={props.for} id={option.key} value={option.value} onChange={props.onChange} defaultChecked={index == 0 && true}/>
                        <label htmlFor={option.key} className='uppercase ml-2 text-heading-6'>{option.key}</label>
                    </div>

                ))
            }
        </fieldset>

    </div>
  )
}

export default RadioButtons