import { ClaimEventList } from "./sections/ClaimEventList";
import { Content } from "./sections/Content";
import { Header } from "./sections/Header";
import * as Tooltop from "@radix-ui/react-tooltip";
import * as Toast from "@radix-ui/react-toast";

function App() {
  return (
    <Toast.Provider>
      <Tooltop.Provider>
        <div className="flex flex-col items-center">
          <Header />
          <div className="w-full top-16 fixed">
            <Toast.Viewport />
          </div>
          <Content />
          <ClaimEventList />
        </div>
      </Tooltop.Provider>
    </Toast.Provider>
  );
}

export default App;
