import { Button, Container } from 'react-bootstrap'
import ModalComponent from '../Modal/Modal'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { RootState } from '../../app/store'
import { useSelector } from 'react-redux'

const Hero = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.auth)

  const goToArticleHandler = () => {
    navigate('/articles')
  }

  return (
    <HeaderComponent>
      <Container>
        <HeaderContainer>
          <Heading>Feed Your Mind With The Best</Heading>
          <SubHeading>
            Grow, learn, and become more successful by reading some of the top
            article by highly reputation indiiduals
          </SubHeading>
          {!user.email ? (
            <>
              <ModalComponent
                text='Sign Up'
                variant='primary'
                isSignupFlow={true}
              />
              <ModalComponent
                text='Login'
                variant='danger'
                isSignupFlow={false}
              />
            </>
          ) : (
            <Button
              variant='info'
              style={{ width: '100%' }}
              onClick={goToArticleHandler}
            >
              Go to Article
            </Button>
          )}
        </HeaderContainer>
      </Container>
    </HeaderComponent>
  )
}

const HeaderComponent = styled.header`
  padding: 5rem 0;
  height: 65vh;
  background-image: url('https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
`

const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 3rem;
  color: white;
  width: 19rem;
`

const Heading = styled.h1`
  font-size: 2rem;
`

const SubHeading = styled.h3`
  font-size: 1.1rem;
  margin: 1rem 0;
  font-weight: 400;
`

export default Hero
