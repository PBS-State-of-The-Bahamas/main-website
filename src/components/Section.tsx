import React from 'react'
import Container from '@/components/Container'

type Props = {
    classes?: string;
    children: JSX.Element | JSX.Element[];
}

function Section({classes, children}: Props) {
  return (
    <section className={`py-12 ${classes && classes}`}>
        <Container>
            {children}
        </Container>
    </section>
  )
}

export default Section