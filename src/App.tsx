import { ClaimEventList } from "./sections/ClaimEventList";
import { Content } from "./sections/Content";
import { Header } from "./sections/Header";
import * as Tooltop from "@radix-ui/react-tooltip";
import * as Toast from "@radix-ui/react-toast";
import { Footer } from "./sections/Footer";

function App() {
  return (
    <Toast.Provider>
      <Tooltop.Provider>
        <div className="flex flex-col items-center">
          <Header />
          <div className="w-full top-16 fixed z-50">
            <Toast.Viewport />
          </div>
          <Content />
          <ClaimEventList />
          <Footer />
        </div>
      </Tooltop.Provider>
    </Toast.Provider>
  );
}

export default App;
