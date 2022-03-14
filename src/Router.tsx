import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./routes/Charts";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins/>}/>
        <Route path="/:coinId/*" element={<Coin/>}>
          <Route path="price" element={<Price/>}/>
          <Route path="chart" element={<Chart />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;