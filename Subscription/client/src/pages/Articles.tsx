import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AppDispatch, RootState } from '../app/store'
import { getArticles } from '../features/article/articleActions'

const Articles = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { results: articles } = useSelector(
    (state: RootState) => state.articles
  )

  useEffect(() => {
    dispatch(getArticles(user.token))
  }, [dispatch, user.token])

  return (
    <Container>
      {articles.length ? (
        <CardsContainer>
          {articles.map((article) => (
            <Card key={article._id}>
              <Image src={article.imageUrl} />
              <Header>{article.title}</Header>
              <Content>{article.content}</Content>
            </Card>
          ))}
        </CardsContainer>
      ) : (
        <div>You dont have a plan</div>
      )}
    </Container>
  )
}

const CardsContainer = styled.div`
  padding: 4rem 0;
  display: flex;
`

const Image = styled.img`
  width: 100%;
  height: 11rem;
  border-radius: 2rem;
`

const Header = styled.h2`
  margin-top: 1rem;
  font-size: 1.5rem;
  margin: 1.5rem 0;
`

const Card = styled.div`
  width: 32%;
  box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 2rem;
  margin-right: 5rem;
`

const Content = styled.p``

export default Articles
