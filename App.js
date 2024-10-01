import { NavigationContainer } from "@react-navigation/native";
import Index from "./src/Components";
import { RecoilRoot } from "recoil";
import EmployeesAtLocation from "./src/Components/LocationInfo";

const App = () => {
  
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Index />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
