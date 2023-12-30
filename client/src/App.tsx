import React, { useContext, useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { Context } from ".";
import { observer } from "mobx-react-lite";

function App() {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store]);

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>
        {store.isAuth
          ? `User authorized ${store.user.email}`
          : `Need to authorize`}
      </h1>
      <button onClick={() => store.logout()} type="button">
        Logout
      </button>
    </div>
  );
}

export default observer(App);
