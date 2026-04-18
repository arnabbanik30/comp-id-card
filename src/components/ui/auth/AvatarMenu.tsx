import { LogOutIcon, UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { authStore } from '#/stores/auth';
import { signOut } from '#/lib/auth/auth';

export function AvatarMenu() {
  const user = authStore.state.user;
  if (!user) {
    return null;
  }

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0].toUpperCase())
      .join('')
      .slice(0, 2);

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
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
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="left">
          {user.name} <br /> {`<${user.email}>`}
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            window.open(user.url, '_blank');
          }}
        >
          <UserIcon />
          WCA Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onSelect={() => {
            signOut();
          }}
        >
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
