import { Button, Form } from 'semantic-ui-react'
import Link from 'next/link'
import { Container } from 'semantic-ui-react'

const Register = () => {
  return (
    <Container>
    
    <Container
      textAlign='center'
      style={{marginTop: "20%"}}
      
      >
    <Form>
    <Form.Field>
      <label><h3>Nombre</h3></label>
      <input placeholder='Nombre' style={{width: "75%"}} />
    </Form.Field>
    <Form.Field>
      <label><h3>Apellido</h3></label>
      <input placeholder='Apellido' style={{width: "75%"}} />
    </Form.Field>
    <Form.Field>
      <label><h3>DNI</h3></label>
      <input placeholder='DNI' style={{width: "75%"}} />
    </Form.Field>
    <Form.Field>
      <label><h3>Email</h3></label>
      <input placeholder='Email' style={{width: "75%"}} />
    </Form.Field>
    <Form.Field>
      <label><h3>Teléfono</h3></label>
      <input placeholder='Teléfono' style={{width: "75%"}} />
    </Form.Field>
    <Form.Field>
      <label><h3>Contraseña</h3></label>
      <input placeholder='Contraseña'  style={{width: "75%"}}/>
    </Form.Field>
    <Button type='submit'>Enviar</Button>
  </Form>
  <p>¿Ya tenés cuenta? <Link href="/login">logueate</Link>.</p>
  </Container>
  </Container>
  )
}

export default Register;