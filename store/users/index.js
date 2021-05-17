import { atom } from 'recoil'

export const userSignUpState = atom({
  key: 'userSignUpState',
  default: {
    username: '',
    password: '',
  },
})

export const userLoggedInState = atom({
  key: '',
  default: {
    isLoggedIn: false,
    username: '',
    userRole: {
      isAdmin: false,
    },
  },
})
