import { BrowserRouter } from "react-router-dom";
import { CampeonatoRouter } from "./routes/CampeonatoRouter";
import { Provider } from "react-redux";
import { store } from "./store"

export const CampeonatoApp = () => {
  return (
    <>
        <Provider store={store}>
            <BrowserRouter>
                <CampeonatoRouter/>
            </BrowserRouter>
        </Provider>
    </>
  )
}
