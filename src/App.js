import { AppRouter } from "./router/AppRouter";
import Store from "./store/Store";




function App() {
  return (
    <>
      <Store>
        <AppRouter/>
      </Store>
    
    </>
  );
}

export default App;
