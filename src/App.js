import { AppRouter } from "./router/AppRouter";
import BoletasProvider from "./store/BoletasProvider";



function App() {
  return (
    <>
      <BoletasProvider>
        <AppRouter/>
      </BoletasProvider>
    
    </>
  );
}

export default App;
