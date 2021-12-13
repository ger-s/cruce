import { Container } from "semantic-ui-react"

const Error404 = () => {
  return (
    <Container textAlign='center'>
      <h1 style={{marginTop: '50%', fontSize: '80px'}}>
        404
      </h1>
      <h3 style={{marginBottom: '100%'}}>Not found.</h3>
    </Container>
  )
}

export default Error404;