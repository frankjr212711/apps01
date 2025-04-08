import { useEffect, useState } from "react";
import Button from './../../Button'
import PagesNav from "../components/PagesNav";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuthProvider";
import Message from './../../Message';

function Login() {
  const navigate = useNavigate();
  const { login, logout, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      return login(email, password);
    }
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true })
  }, [isAuthenticated, navigate]);


  

  return (
    <div className={styles.login}>
      <PagesNav />
      <section>
        <h1>Login</h1>

        <form
          action=""
          className={styles["login-form"]}
          onSubmit={handleSubmit}
        >
          <div className={styles["form-container"]}>
            <h1>Login to use app</h1>
            <div className={styles.row}>
              {/* <h6 className={styles.errorMessage}>Incorrect email</h6> */}
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.row}>
              {/* <h6 className={styles.errorMessage}>Incorrect password</h6> */}
              <label htmlFor="email">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.row}>
              <Button type={"teal"}>Login</Button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
