import { Button } from '../button';
import { signIn } from '#/lib/auth/auth';

export function LoginButton() {
  const handleSignIn = () => {
    signIn();
  };
  return (
    <Button
      variant="outline"
      onClick={handleSignIn}
    >
      Login With WCA
    </Button>
  );
}
