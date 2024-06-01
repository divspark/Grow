import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import { useState } from "react";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [district, setDistrict] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      // const response = await axios.post("http://localhost:5000/api/v1/user/login", {
      //   email,
      //   password,
      //   role,
      //   district
      // });
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
      const response = await axios.post("https://grow-backend-pi.vercel.app/user/login",config, {
        email,
        password,
        role,
        district
      });

      // Handle successful login
      console.log("Login successful:", response.data);
      // Store the token in localStorage or cookies
      localStorage.setItem('token', response.data.token);

      // Redirect or update UI based on the response
      if (role === 'consumer') {
        window.location.href = '/';
      } else if (role === 'producer') {
        window.location.href = '/producer';
      }
      else if (role === 'admin') {
        window.location.href = '/admin/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="row vh-100 g-0">
      {/* Left side */}
      <div className="col-lg-6 position-relative d-none d-lg-block">
        <div className="bg-holder"></div>
      </div>
      {/* /Left side */}

      {/* Right side */}
      <div className="col-lg-6">
        <div className="row align-items-center justify-content-center h-100 g-0 px-6 ps-sm-0">
          <div className="login-cont">
          <div className="col col-sm-6 col-lg-7 col-xl-6 py-30 m-3">
            {/* logo */}
            <a href="a" className="d-flex justify-content-center mb-4">
              {/* <img src="images/logo.png" alt="" width="60" /> */}
            </a>
            {/* /logo */}

            <div className="text-center mb-5">
              <h3 className="fw-bold">Log In</h3>
              <p className="text-secondary">Get access to your account</p>
            </div>
            {/* Social Login */}
            {/* <button className="btn btn-lg btn-outline-secondary btn-outline-custom w-100 mb-3">
              <i className="bx bxl-google text-danger me-1 fs-6"></i>
              Login With Google
            </button> */}
            {/* <button className="btn btn-lg btn-outline-secondary btn-outline-custom w-100">
              <i className="bx bxl-facebook text-primary me-1 fs-6"></i>
              Login With Facebook
            </button> */}
            {/* /Social Login */}

            {/* Divider */}
            {/* <div className="position-relative">
              <hr className="text-secondary divider" />
              <div className="divider-content-center">or</div>
            </div> */}
            {/* /Divider */}

            {/* form */}
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control form-control-lg fs-6"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-lock-alt"></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-lg fs-6"
                  placeholder="User Role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-lock-alt"></i>
                </span>
                <input
                  type="password"
                  className="form-control form-control-lg fs-6"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input-group mb-3">
  <span className="input-group-text">
    <i className="bx bx-map"></i>
  </span>
  <input
    type="text"
    className="form-control form-control-lg fs-6"
    placeholder="District"
    name="district"
    value={district}
    onChange={(e) => setDistrict(e.target.value)}
  />
</div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 mb-3"
              >
                Login
              </button>
            </form>
            {/* form */}

            <div className="text-center">
              <small>
                Don't have an account?
                <a href="/signup" className="fw-bold">
                  Sign-up
                </a>
              </small>
            </div>
          </div>
          </div>
        </div>
      </div>
      {/* /Right side */}
    </div>
  );
}

export default Login;


// import "bootstrap/dist/css/bootstrap.min.css";
// import "boxicons/css/boxicons.min.css";


// function Login() {
//   return (
//     <div className="row vh-100 g-0">
//       {/* Left side */}
//       <div className="col-lg-6 position-relative d-none d-lg-block">
//         <div className="bg-holder" ></div>
//       </div>
//       {/* /Left side */}

//       {/* Right side */}
//       <div className="col-lg-6">
//         <div className="row align-items-center justify-content-center h-100 g-0 px-4 ps-sm-0">
//           <div className="col col-sm-6 col-lg-7 col-xl-6">
//             {/* logo */}
//             <a href="a" className="d-flex justify-content-center mb-4">
//               {/* <img src="images/logo.png" alt="" width="60" /> */}
//             </a>
//             {/* /logo */}

//             <div className="text-center mb-5">
//               <h3 className="fw-bold">Log In</h3>
//               <p className="text-secondary">Get access to your account</p>
//             </div>
//             {/* Social Login */}
//             <button className="btn btn-lg btn-outline-secondary btn-outline-custom w-100 mb-3">
//               <i className="bx bxl-google text-danger me-1 fs-6"></i>
//               Login With Google
//             </button>
//             <button className="btn btn-lg btn-outline-secondary btn-outline-custom w-100">
//               <i className="bx bxl-facebook text-primary me-1 fs-6"></i>
//               Login With Facebook
//             </button>
//             {/* /Social Login */}

//             {/* Divider */}
//             <div className="position-relative">
//               <hr className="text-secondary divider" />
//               <div className="divider-content-center">or</div>
//             </div>
//             {/* /Divider */}

//             {/* form */}
//             <form method="post">
//               <div className="input-group mb-3">
//                 <span className="input-group-text">
//                   <i className="bx bx-envelope"></i>
//                 </span>
//                 {/* <label for="">Email</label> */}
//                 <input
//                   type="text"
//                   className="form-control form-control-lg fs-6"
//                   placeholder="Email"
//                   name="email"
//                 />
//               </div>

//               <div className="input-group mb-3">
//                 <span className="input-group-text">
//                   <i className="bx bx-lock-alt"></i>
//                 </span>
//                 <input
//                   type="text"
//                   className="form-control form-control-lg fs-6"
//                   placeholder="User Role"
//                   name="role"
//                 />
//               </div>

//               <div className="input-group mb-3">
//                 <span className="input-group-text">
//                   <i className="bx bx-lock-alt"></i>
//                 </span>
//                 <input
//                   type="password"
//                   className="form-control form-control-lg fs-6"
//                   placeholder="Password"
//                   name="password"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-primary btn-lg w-100 mb-3"
//               >
//                 <a className="Login">Login</a>
//               </button>
//             </form>
//             {/* form */}

//             <div className="text-center">
//               <small>
//                 Dont have an account?
//                 <a href="/signup" className="fw-bold">
//                   Sign-up
//                 </a>
//               </small>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* /Right side */}
//     </div>
//   );
// }

// export default Login;
