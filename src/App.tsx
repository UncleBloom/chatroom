import { useState } from "react";
import "./App.scss";
import Login from "./components/login/login";

function App() {
  const [logged, setLogged] = useState<boolean>(false);

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;