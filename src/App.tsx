import { ClaimEventList } from "./sections/ClaimEventList";
import { Content } from "./sections/Content";
import { Header } from "./sections/Header";

function App() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <Content />
      <ClaimEventList />
    </div>
  );
}

export default App;
