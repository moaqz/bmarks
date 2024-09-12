import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "~/hooks/useAuth";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center h-15 justify-between">
      <Link to="/" className="font-extrabold">
        bmarks
      </Link>

      {user ? (
        <Popover>
          <PopoverButton className="bg-blue-9 size-8 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-8 rounded-full">
            A
          </PopoverButton>

          <PopoverPanel
            anchor="bottom"
            className="flex flex-col bg-gray-2 border rounded-md border-gray-4 mt-2 divide-y divide-gray-4"
          >
            <div className="px-3 py-1">
              <span className="text-sm text-gray-11">{user.email}</span>
            </div>

            <div className="flex flex-col items-center gap-y-1 p-1">
              <NavLink
                to="/account"
                className="w-full rounded-md inline-flex items-center justify-center text-sm text-gray-11 font-medium transition-colors py-2 px-6 hover:text-gray-12 hover:bg-gray-4 outline-none focus:bg-gray-4 focus:text-gray-12"
              >
                Settings
              </NavLink>

              <CloseButton
                onClick={logout}
                className="w-full py-2 px-6 rounded-md inline-flex items-center justify-center text-sm text-gray-11 font-medium hover:text-gray-12 bg-transparent hover:bg-gray-4 outline-none focus:bg-gray-4 focus:text-gray-12 transition-colors"
              >
                Sign out
              </CloseButton>
            </div>
          </PopoverPanel>
        </Popover>
      ) : (
        <NavLink to="/login" className="button">
          Login
        </NavLink>
      )}
    </header>
  );
}
