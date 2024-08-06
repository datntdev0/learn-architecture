import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

import PageLayout from './components/PageLayout'
import ProfileContent from './components/ProfileContent'
import { TokenPayload } from './contexts/AuthProvider'
import { useAuth } from './contexts/hooks/useAuth'

function App() {
  const { getAccessTokenPayload, getAccessToken } = useAuth();
  const [tokenPayload, setTokenPayload] = useState<TokenPayload>({} as TokenPayload);

  const handleParseAccessToken = async () => {
    const accessToken = getAccessToken() || "";
    const payload = getAccessTokenPayload(accessToken);
    setTokenPayload(payload || {} as TokenPayload);
  }

  return (
    <PageLayout>
      <AuthenticatedTemplate>
        <Button className="mb-5" onClick={handleParseAccessToken}>Parse Token</Button>
        <ProfileContent profile={tokenPayload} />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5 className="card-title">Please sign-in to see your profile information.</h5>
      </UnauthenticatedTemplate>
    </PageLayout>
  )
}

export default App
