import './App.css';
import DrawerCon from "./components/DrawerCon";

function App() {
  return (
    <div className="drawer">
      <DrawerCon/>
      <div className="drawer-top"></div>
      <div className="drawer-front">
        <div className="label">Darshan's Files</div>
      </div>
    </div>
  );
}

export default App;
