import { atom } from 'recoil'

export const dispatchToEventListState = atom({
  key: 'dispatchToEventListState',
  default: {
    dispatching: false,
  },
})
