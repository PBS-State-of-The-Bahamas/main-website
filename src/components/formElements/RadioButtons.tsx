import React from 'react'

type Props = {
    label: string;
    options: {key: string, value: string | number}[];
    for: string;
    onChange: any;
    flowDirection?: 'row' | 'column'
}

const RadioButtons = (props: Props) => {
    const direction = {
        row: 'inline first:ml-0 ml-2',
        column: 'block'
    }
  return (
    <div>
        <h5>{props.label}</h5>
        <fieldset>
            {
                props.options.map((option, index) => (
                    <div key={option.key} className={`${direction[props.flowDirection? props.flowDirection : direction['column']]}`}>
                        <input type="radio" name={props.for} id={option.key} value={option.value} onChange={props.onChange} defaultChecked={index == 0 && true}/>
                        <label htmlFor={option.key} className={`uppercase ml-2 text-heading-6`}>{option.key}</label>
                    </div>

                ))
            }
        </fieldset>

    </div>
  )
}

export default RadioButtons