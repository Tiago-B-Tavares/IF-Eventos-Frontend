import { signOut, useSession } from 'next-auth/react';

function LogoutButton() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
   
  };

  return (
    <button onClick={handleLogout}>Sair</button>
  );
}

export default LogoutButton;
