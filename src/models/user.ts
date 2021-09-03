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

const user: Model = {
  namespace: 'user',
  state: {
    user: ''
  },
  reducers: {
    changeUserinfo(state: any, { payload }: AnyAction) {
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
