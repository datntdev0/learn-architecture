import { useMsal } from "@azure/msal-react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const SignInButton: React.FC = () => {
  const { instance } = useMsal()

  const handleLogin = (loginType: string) => {
    if (loginType === "popup") {
      instance.loginPopup().catch(e => console.error(e));
    }
    else if (loginType === "redirect") {
      instance.loginRedirect().catch(e => console.error(e));
    }
  }

  return (
    <DropdownButton variant="secondary" className="ml-auto" drop="start" title="Sign In">
      <Dropdown.Item as="button" onClick={() => handleLogin("popup")}>Sign in using Popup</Dropdown.Item>
      <Dropdown.Item as="button" onClick={() => handleLogin("redirect")}>Sign in using Redirect</Dropdown.Item>
    </DropdownButton>
  )
}

export default SignInButton;