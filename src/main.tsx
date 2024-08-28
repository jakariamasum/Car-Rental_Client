import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { persistor, store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    <Toaster richColors position="top-right" />
  </StrictMode>
);
