import { type FC } from "react";

import { ApplicationProvider } from "./ApplicationProvider";
import App from "./App";
import "./styles.css";

const Application: FC = () => {
  return (
    <ApplicationProvider>
      <main className="main">
        <App />
      </main>
    </ApplicationProvider>
  );
};

export default Application;
