import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGoal, reset } from '../features/goals/goalSlice'
import { toast } from 'react-toastify'

const GoalForm = () => {
  const dispatch = useDispatch()
  const { isSuccess, isError, message } = useSelector((state) => state.goals)

  const [text, setText] = useState('')

  useEffect(() => {
    if (isSuccess) {
      toast.success('Goal Added Successfully!')
    }

    if (isError) {
      toast.error('Goal Cannot be Added! ' + message)
    }
  }, [isSuccess, isError, message])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createGoal({ text }))
    setText('')
  }

  const onChange = (e) => {
    setText(e.target.value)
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            id='text'
            name='text'
            value={text}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm
