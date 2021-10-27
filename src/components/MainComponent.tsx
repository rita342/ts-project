import { useState } from 'react'
import { Card, Col, Container, Form, Row,Navbar,Nav,Button } from 'react-bootstrap'

import { Welcome } from '../typings'

const baseEndpoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q="

 function MainComponent() {


    const [query, setQuery] = useState('')
    const [song, setSong] = useState<Welcome[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()

        const response = await fetch(baseEndpoint + query)

        if (response.ok) {

            const  { data } = await response.json()
            setSong(data)

        }

    }

    return <Container>
    <Row>
        <Navbar bg="light" variant="light" style={{width:'100%',marginTop:'0px'}}>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form onSubmit={handleSubmit}>
                    <Form.Control type="search" value={query} onChange={handleChange} />
                </Form>
  </Navbar>
    <Col xs={6} md={10} className="mx-auto my-3 ">
                <Row>
                    { song.map(songs => (
                            <Col xs={10} md={4}>
                              <Card style={{ width: '18rem' }}>
                              <Card.Img variant="top" src={songs.album.cover_medium} />
                           <Card.Body>
                              <Card.Title>{songs.title}</Card.Title>
                            <Card.Text>
    
                          </Card.Text>
                          <Button variant="primary">Go To Detail</Button>
                         </Card.Body>
                           </Card>
                                
                             
                            </Col>
                        ))
                    }
                </Row>
            </Col>
        </Row>
    </Container>
}
export default MainComponent