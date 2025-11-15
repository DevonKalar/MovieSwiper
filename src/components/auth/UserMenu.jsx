import { usePopover } from '@hooks/usePopover';
import { UserIcon, SignOutIcon } from "@icons";
import { useUser } from "@providers/UserContext";
import authService from '@services/auth';


const UserMenu = () => {
  const { popovers, togglePopover } = usePopover();
  const { firstName, setIsLoggedIn } = useUser();

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div className="navbar-user relative flex flex-row justify-center items-center gap-4">
    <button className="p-0 bg-transparent popover-button" id="user-menu-button" onClick={() => togglePopover("user-menu")}>
      <UserIcon className="text-accent-500 bg-primary-500 rounded-full p-2" height="44px" width="44px" />
    </button>

    {popovers["user-menu"] && (
    <div className="popover flex flex-col gap-4 absolute right-0 top-full mt-6 w-48 bg-primary-700 p-4 rounded-2xl shadow-lg z-10">
      <p className="text-white">Hello, {firstName}!</p>
      <ul className="flex flex-col gap-2">
      <li className="block w-full text-left text-sm text-gray-700">Profile</li>
      <li className="block w-full text-left text-sm text-gray-700">Settings</li>
      <li className="block w-full text-left text-sm text-gray-700">Account</li>
      </ul>
      <button className="block w-full text-sm text-gray-700" onClick={handleLogout}>
      Sign Out
      <SignOutIcon className="inline-block ml-2" height={16} width={16} />
      </button>
    </div>
    )}

    </div>
  )
}

export default UserMenu;