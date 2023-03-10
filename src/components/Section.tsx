import React from 'react'
import Container from '@/components/Container'

type Props = {
    classes?: string;
    children: JSX.Element;
}

function Section({classes, children}: Props) {
  return (
    <section className={`py-12 ${classes}`}>
        <Container>
            {children}
        </Container>
    </section>
  )
}

export default Section