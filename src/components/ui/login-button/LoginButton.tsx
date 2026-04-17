import { signIn } from '#/lib/auth'
import { Button } from '../button'

export function LoginButton() {
  const handleSignIn = () => {
    signIn()
  }
  return (
    <Button variant="outline" onClick={handleSignIn}>
      Login With WCA
    </Button>
  )
}
