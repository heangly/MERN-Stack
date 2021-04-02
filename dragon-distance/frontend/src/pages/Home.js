import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { AppContext } from '../context/context'
import axios from 'axios'

const Home = ({ history }) => {
  const { loginUser } = React.useContext(AppContext)
  const [alert, setAlert] = useState([])
  const [user, setUser] = useState('')

  const fetchData = async () => {
    const { data } = await axios.get(`/api/alert`)
    setAlert(data)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loginUser'))
    !user && history.push('/')
    setUser(user.name)

    fetchData()
  }, [history, loginUser])

  const handlerDelete = async (id) => {
    try {
      await axios.delete(`/api/alert/${id}`)
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Header />
      <div className='container my-5'>
        <div className='row'>
          {alert &&
            alert.map((a) => (
              <div
                className={`card rounded m-2 ${
                  a.virus === 'yes' ? 'border-danger' : 'border-info'
                }`}
                style={{ width: '18rem' }}
                key={a._id}
              >
                <div className='card-body'>
                  <h5 className='card-title text-center mb-4'>{a.location}</h5>
                  <h6 className='card-subtitle mb-2'>
                    by: {a.user.toUpperCase()}
                  </h6>
                  <p className='card-text'>
                    Have Virus: {a.virus.toUpperCase()}
                  </p>
                  <p className='card-text'>
                    <small>Date: {a.createdAt.substring(0, 10)}</small>
                  </p>
                  {user === a.user && (
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => handlerDelete(a._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home
