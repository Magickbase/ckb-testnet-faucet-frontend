import { ClaimEventList } from "./sections/ClaimEventList";
import { Content } from "./sections/Content";
import { Header } from "./sections/Header";
import * as Tooltop from "@radix-ui/react-tooltip";

function App() {
  return (
    <Tooltop.Provider>
      <div className="flex flex-col items-center">
        <Header />
        <Content />
        <ClaimEventList />
      </div>
    </Tooltop.Provider>
  );
}

export default App;
