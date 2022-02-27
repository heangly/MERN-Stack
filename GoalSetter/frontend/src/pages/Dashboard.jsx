import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import GoalForm from '../components/GoalForm'
import { getGoals, reset } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, message, goals } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    !user && navigate('/login')
    dispatch(getGoals())
    return () => dispatch(reset())
  }, [user, navigate, dispatch])

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user?.name} !</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        <div className='goals'>
          {!goals.length ? (
            <h3>You have not set any goals yet!</h3>
          ) : (
            goals.map((goal) => <GoalItem key={goal._id} goal={goal} />)
          )}
        </div>
      </section>
    </>
  )
}

export default Dashboard
