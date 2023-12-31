import React, { useContext, useEffect, useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import UserService from "./service/UserService";
import { IUser } from "./types/IUser";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store]);

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

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
      <div>
        <button onClick={getUsers} type="button"></button>
      </div>
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
      ;
    </div>
  );
}

export default observer(App);
