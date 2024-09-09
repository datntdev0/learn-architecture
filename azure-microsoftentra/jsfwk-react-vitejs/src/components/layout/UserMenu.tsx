import { useMsal } from "@azure/msal-react";
import { Dropdown } from "flowbite-react";
import { useAuth } from "../../hooks/useAuth";

export default function UserMenu() {
  const { instance } = useMsal();
  const { profile } = useAuth();

  function handleOnSignOutButtonClick(): void {
    instance.logoutRedirect({ postLogoutRedirectUri: "/" }).catch(e => console.error(e));
  }

  return (
    <Dropdown label="" dismissOnClick={false} renderTrigger={() =>
      <button
        type="button"
        className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
          alt="user photo"
        />
      </button>
    }>
      <Dropdown.Header>
        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
          {profile?.displayName}
        </span>
        <span className="block text-sm text-gray-900 truncate dark:text-white">
          {profile?.email}
        </span>
      </Dropdown.Header>
      <Dropdown.Item>
        My profile
      </Dropdown.Item>
      <Dropdown.Item>
        Account settings
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>
        <i className="fa-solid fa-heart mr-2"></i>
        My likes
      </Dropdown.Item>
      <Dropdown.Item>
        <i className="fa-solid fa-layer-group mr-2"></i>
        Collections
      </Dropdown.Item>
      <Dropdown.Item>
        <i className="fa-solid fa-fire mr-2"></i>
        Pro version
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item className="font-bold" onClick={() => handleOnSignOutButtonClick()}>
        <i className="fa-solid fa-right-from-bracket mr-2"></i>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}