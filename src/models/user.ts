import type { Model } from 'dva'
import type { AnyAction } from 'redux'

let seed = 0
async function getUserinfo() {
  seed += 1
  let obj
  setTimeout(() => {
    obj = { user: '用户' + seed }
  })
  return obj
}

export interface UserModelState {
  name: string
}

const initialState: UserModelState = {
  name: ''
}

const user: Model = {
  namespace: 'user',
  state: initialState,
  reducers: {
    changeUserinfo(state: UserModelState, { payload }: AnyAction) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *setUserinfo(_, { put, call }) {
      const payload = yield call(getUserinfo)
      yield put({ type: 'changeUserinfo', payload })
    }
  }
}

export default user
