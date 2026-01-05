import { AuthCard } from '../components/AuthCard'
import { RegisterForm } from '../components/RegisterForm'

export const RegisterPageView = () => {
  return (
    <AuthCard
      title='Create an account'
      decsription='Welcome'
      actionLabel='Already have an account? Log In'
      actionUrl='/login'
    ><RegisterForm /></AuthCard>
  )
}
