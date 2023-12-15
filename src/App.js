import { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }
  return Math.round(total)
}

const formater = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formater.format(val))
  }
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{ deposit: '', contribution: '', years: '', rate: '' }}
          onSubmit={handleSubmit}
          validationSchema={yup.object({
            deposit: yup
              .number()
              .required('Requerido')
              .typeError('Debe ser un numero, tipo de dato ingresado no valido'),
            contribution: yup
              .number()
              .required('Requerido')
              .typeError('Debe ser un numero, tipo de dato ingresado no valido'),
            years: yup
              .number()
              .required('Requerido')
              .typeError('Debe ser un numero, tipo de dato ingresado no valido'),
            rate: yup
              .number()
              .required('Requerido')
              .typeError('Debe ser un numero, tipo de dato ingresado no valido')
              .min(0, 'El valor minimo es 0')
              .max(1, 'El valor maximo es 1')
          })}>
          <Form>
            <Input name='deposit' label='Deposito inicial' />
            <Input name='contribution' label='Contribucion al año' />
            <Input name='years' label='Cantidad de años' />
            <Input name='rate' label='Tasa de interes' />
            <Button type='submit'>Enviar</Button>
          </Form>
        </Formik>
        {balance !== ''
          ? <Balance>Balance final: {balance}</Balance>
          : null}
      </Section>
    </Container>
  )
}

export default App;
