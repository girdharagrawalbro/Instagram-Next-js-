import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="img-container">
          <img src="instagram/svg/screenshot1.png" alt="alt" />
        </div>
        <div className="form-container" id="login-container">
          <img src="/svg/logo.png" alt="logo" />
            <form action="#login" method="post">
              <input type="text" name="username" placeholder="Username or email" required />
              <input type="password" name="password" placeholder="Password" required />
                <button type="submit" name="login">Log In</button>
            </form>
            <h4 id="login">

            </h4>
            <div className="link">
              <p>Don't have an account? <a id="show-signup">Sign up</a></p>
            </div>
        </div>

        <div className="form-container" id="signup-container">
          <img src="instagram/svg/logo.png" alt="logo" />
          <form action="#signup" method="post">
            <input type="email" name="email" placeholder="Email" required />
            <input type="text" name="fullname" placeholder="Full Name" required />
            <input type="text" name="username" placeholder="Username" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit" name="signup">Sign Up</button>
          </form>
          <h4 id="signup">

          </h4>
          <div className="link">
            <p>Have an account? <a id="show-login">Log in</a></p>
          </div>
        </div>
      </div>
    </>
  );
}
