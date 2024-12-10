import { QueryClient, QueryClientProvider } from 'react-query';
import MainRouter from './router/MainRouter';

const App = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <MainRouter />
    </QueryClientProvider>
  );
};

export default App;
