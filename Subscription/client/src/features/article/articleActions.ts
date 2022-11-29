import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export enum Article {
  Name = 'article',
  GetArticles = 'article/getArticles'
}

export const getArticles = createAsyncThunk(
  Article.Name,
  async (token: string, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.get('/api/articles', config)
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ?? error.message ?? error.toString()
        return thunkAPI.rejectWithValue(message)
      }
      return thunkAPI.rejectWithValue(error)
    }
  }
)
