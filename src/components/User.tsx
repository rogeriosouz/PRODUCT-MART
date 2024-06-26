import { useAuth } from '@/context/authContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import {
  Gear,
  ShoppingCart,
  SignOut,
  User as UserIcon,
} from '@phosphor-icons/react'

export function User() {
  const { user, logout } = useAuth()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="h-12 w-12 overflow-hidden">
          <AvatarImage
            src="https://github.com/rogeriosouz.png"
            alt="@rogerio"
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={'/user'}>
            <DropdownMenuItem className="cursor-pointer">
              Profile
              <DropdownMenuShortcut>
                <UserIcon className="h-5 w-5" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={'/user/settings'}>
            <DropdownMenuItem className="cursor-pointer">
              Settings
              <DropdownMenuShortcut>
                <Gear className="h-5 w-5" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={'/user/requests'}>
            <DropdownMenuItem className="cursor-pointer">
              Orders
              <DropdownMenuShortcut>
                <ShoppingCart className="h-5 w-5" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          Log out
          <DropdownMenuShortcut>
            <SignOut className="h-5 w-5" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
