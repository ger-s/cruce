import { Button, Checkbox, Form } from 'semantic-ui-react'
import Link from 'next/link'
import { Container } from 'semantic-ui-react'

const Login = () => {
  return (
    <Container>
    
    <Container
      textAlign='center'
      style={{marginTop: "20%"}}
      
      >
    <Form>
    <Form.Field>
      <label><h3>Email</h3></label>
      <input placeholder='Email' style={{width: "75%"}} />
    </Form.Field>
    <Form.Field>
      <label><h3>Contraseña</h3></label>
      <input placeholder='Contraseña'  style={{width: "75%"}}/>
    </Form.Field>
    <Form.Field>
    <p><Link href="#">Olvidé mi contraseña</Link>.</p>
    </Form.Field>
    <Button type='submit'>Enviar</Button>
  </Form>
  <p>¿No tenés cuenta? <Link href="/register">registrate</Link>.</p>
  </Container>
  </Container>
  )
}

export default Login;