import { useState } from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'

interface Iprops {
  text: string
  variant: 'primary' | 'secondary' | 'danger'
}

const ModalComponent: React.FC<Iprops> = ({ text, variant }) => {
  const [showModal, setShowModal] = useState(false)

  const showModalHandler = (): void => {
    setShowModal(true)
  }

  const closeModalHandler = (): void => {
    setShowModal(false)
  }

  return (
    <>
      <Button
        variant={variant}
        onClick={showModalHandler}
        style={{ marginRight: '1rem', padding: '0.75rem, 3rem' }}
      >
        {text}
      </Button>
      <Modal show={showModal} onHide={closeModalHandler}>
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className='mb-3'>
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl type='email' />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl type='password' />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={closeModalHandler}>
            Close
          </Button>
          <Button variant={variant}>{text}</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalComponent
