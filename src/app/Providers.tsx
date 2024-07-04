import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/redux/store";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default Providers;