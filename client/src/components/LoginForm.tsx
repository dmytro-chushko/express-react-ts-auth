import { FC, useContext, useState } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";

export const LoginForm: FC = observer(() => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  const handleLogin = () => store.login(email, password);
  const handleRegistration = () => store.registration(email, password);

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button onClick={handleLogin} type="button">
        Login
      </button>
      <button onClick={handleRegistration} type="button">
        Registration
      </button>
    </div>
  );
});
