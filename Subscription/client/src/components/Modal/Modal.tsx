import { useState } from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { IUserData, loginUser, registerUser } from '../../features/authSlice'

interface Iprops {
  text: string
  variant: 'primary' | 'secondary' | 'danger'
  isSignupFlow: boolean
}

const ModalComponent: React.FC<Iprops> = ({ text, variant, isSignupFlow }) => {
  const [showModal, setShowModal] = useState(false)
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    password: ''
  })

  const dispatch = useDispatch<AppDispatch>()

  const showModalHandler = (): void => {
    setShowModal(true)
  }

  const closeModalHandler = (): void => {
    setShowModal(false)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value }
    })
  }

  const clickHandler = () => {
    if (userData.email.trim() === '' && userData.password.trim() === '') {
      return
    }

    if (isSignupFlow) {
      dispatch(registerUser(userData))
    } else {
      dispatch(loginUser(userData))
    }
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
            <FormControl
              onChange={onChange}
              value={userData.email}
              type='email'
              name='email'
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              onChange={onChange}
              value={userData.password}
              type='password'
              name='password'
            />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={closeModalHandler}>
            Close
          </Button>
          <Button onClick={clickHandler} variant={variant}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalComponent
