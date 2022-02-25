import { Text, Button } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';

function Profile() {
  const navigate =  useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async() => {
    logout(() => {
      navigate('/');
    });
  }

  return (
    <div>
      <Text fontSize="22">Profile</Text>
      <code>{JSON.stringify(user)}</code>
      <br /><br />
      <Button colorScheme="blue" variant="solid" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Profile