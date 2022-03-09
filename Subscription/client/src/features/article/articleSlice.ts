import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'
import { ReactText } from 'react'
import { toast } from 'react-toastify'
import { Article, getArticles } from './articleActions'

interface SuccessData {
  _id: string
  title: string
  imageUrl: string
  content: string
}

interface InitialState {
  isLoading: boolean
  isError: boolean
  message: string
  results: SuccessData[]
}

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  message: '',
  results: []
}

let toastId: ReactText

const articleSlice = createSlice({
  name: Article.Name,
  initialState,
  reducers: {
    resetArticles: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, () => {
        toast.dismiss(toastId)
        toastId = toast.loading('Loading...')
      })
      .addCase(
        getArticles.fulfilled,
        (state, action: PayloadAction<SuccessData[]>) => {
          updateArticleStates(false, false, '', action.payload, state)
          toast.dismiss(toastId)
          toastId = toast.success('Fetching Articles Successfully')
        }
      )
      .addCase(getArticles.rejected, (state, action) => {
        updateArticleStates(false, true, action.payload as string, [], state)
        toast.dismiss(toastId)
        toastId = toast.error('Cannot fetch articles')
      })
  }
})

const updateArticleStates = (
  isLoading: boolean,
  isError: boolean,
  message: string,
  results: SuccessData[],
  state: WritableDraft<InitialState>
): void => {
  state.isLoading = isLoading
  state.isError = isError
  state.message = message
  state.results = results
}

export const { resetArticles } = articleSlice.actions
export default articleSlice.reducer
