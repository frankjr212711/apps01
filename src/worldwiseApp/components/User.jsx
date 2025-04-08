import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuthProvider";
import styles from "./User.module.css";

const FAKE_USER = {
  name: "Jones",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function User() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} className={styles.avatar} />
      <h4>{user.name}</h4>
      <span className={styles.logoutBtn} onClick={handleClick}>
        Logout
      </span>
    </div>
  );
}

export default User;
