import { AuthCard } from '../components/AuthCard'
import { LoginForm } from '../components/LoginForm'

export const LoginPageView = () => {
  return (
    <AuthCard
      title='Welcome back'
      decsription='login'
      actionLabel='New user? Sign Up'
      actionUrl='/sign-up'
    >
      <LoginForm />
    </AuthCard>
  )
}
