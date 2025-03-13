import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome to Book My Show Clone</h1>
      <div className="mt-4">
        <Button type="primary" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button className="ml-2" onClick={() => navigate('/register')}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
