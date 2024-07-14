import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "../store/context/authContext";

const Providers = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <Provider store={store}>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </AuthProvider>
        </Provider>
    );
}

export default Providers;