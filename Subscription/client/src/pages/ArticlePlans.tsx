import { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AppDispatch, RootState } from '../app/store'
import { checkoutPayment } from '../features/checkout/checkoutActions'
import { resetCheckout } from '../features/checkout/checkoutSlice'
import { getPlanPrice } from '../features/subscriptionPlan/subscriptionPlanActions'

const ArticlePlans = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { isLoading, prices } = useSelector(
    (state: RootState) => state.subscriptionPlan
  )
  const { result } = useSelector((state: RootState) => state.checkout)

  useEffect(() => {
    dispatch(getPlanPrice(user.token))
  }, [dispatch, user.token])

  useEffect(() => {
    if (result.url) {
      window.location.href = result.url
    }
  }, [result.url])

  const backgroundColors: any = {
    Basic: 'rgb(104, 219, 104)',
    Standard: 'rgb(185, 42, 23, 0.835)',
    Premium: 'pink'
  }

  const checkoutHandler = (priceId: string) => {
    dispatch(checkoutPayment({ priceId, token: user.token }))
  }

  return (
    <CardContainer>
      {!isLoading &&
        prices.map((price) => (
          <Card
            key={price.nickname}
            style={{
              marginRight: '2rem',
              borderRadius: '.5rem'
            }}
          >
            <CardHeader
              style={{ backgroundColor: backgroundColors[price.nickname] }}
            >
              <PriceCircle>
                <PriceText>{price.unit_amount / 100}</PriceText>
              </PriceCircle>
            </CardHeader>
            <Card.Body className='text-center'>
              <Card.Title style={{ fontSize: '2rem', textAlign: 'center' }}>
                {price.nickname}
              </Card.Title>
              <Button
                className='my-3'
                variant='primary'
                onClick={() => checkoutHandler(price.id)}
              >
                Buy Now
              </Button>
            </Card.Body>
          </Card>
        ))}
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  height: 25rem;
  width: 18rem;
`

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`

const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`

export default ArticlePlans
