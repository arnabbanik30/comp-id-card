import { Avatar, AvatarImage } from '../avatar';
import { Button } from '../button';
import { DropdownMenu, DropdownMenuTrigger } from '../dropdown-menu';
import { authStore } from '#/stores/auth';

export function AvatarMenu() {
  const user = authStore.state.user;
  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <Avatar className="hover:ring-2 hover:ring-offset-2 hover:ring-default">
            <AvatarImage
              src={user.avatar.thumb_url}
              alt={user.name}
            />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
