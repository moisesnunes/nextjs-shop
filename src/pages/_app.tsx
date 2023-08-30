import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Toaster />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
