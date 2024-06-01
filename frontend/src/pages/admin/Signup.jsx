import "bootstrap/dist/css/bootstrap.min.css";
import "boxicons/css/boxicons.min.css";
import { useState } from "react";
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const[state, setState] = useState("Uttar Pradesh");
  const[district, setDistrict] = useState("Raebareli");
  //const [error, setError] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    //setError("");

    try {
      // const response = await axios.post("http://localhost:5000/api/v1/user/signup", {
      //   email,
      //   password,
      //   role,
      //   district,
      //   state
      // });
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
      const response = await axios.post("https://grow-backend-pi.vercel.app/user/signup",config, {
        email,
        password,
        role,
        district,
        state
      });

      // Handle successful signup
      console.log("Signup successful:", response.data);
      // Store the token in localStorage or cookies
      localStorage.setItem('token', response.data.token);

      // Redirect or update UI based on the response
      if (role === 'consumer') {
        window.location.href = '/login';
      } else if (role === 'producer') {
        window.location.href = '/login';
      }
    } catch (err) {
      //setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="row vh-100 g-0">
      {/* Left side */}
      <div className="col-lg-6 position-realtive d-none d-lg-block">
        <div className="bg-holder2" ></div>
      </div>
      {/* /Left side */}

      {/* Right side */}
      <div className="col-lg-6">
        <div className="row align-items-center justify-content-center h-100 g-0 px-4 ps-sm-0">
          <div className="login-cont">
          <div className="col col-sm-6 col-lg-7 col-xl-6">
            <div className="text-center mb-5">
              <h3 className="fw-bold">Sign Up</h3>
              <p className="text-secondary">Create your account</p>
            </div>

            {/* form */}
            <form onSubmit={handleSignup}>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-envelope"></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-lg fs-6"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">
          <i className="bx bx-map-pin"></i>
        </span>
        <input
          type="text"
          className="form-control form-control-lg fs-6"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
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
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 mb-3"
              >
                Signup
              </button>
            </form>
            {/* form */}

            <div className="text-center">
              <small>
                Already have an account?
                <a href="/login" className="fw-bold">
                  Login
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

export default Signup;






// import "bootstrap/dist/css/bootstrap.min.css";
// import "boxicons/css/boxicons.min.css";
// import { useState } from "react";
// import axios from 'axios';


// function Signup() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState("");

//   const handleSignup = async (event) => {
//     event.preventDefault();
//     setError("");

//     try {
//       const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
//         email,
//         password,
//         role,
//       });

//       // Handle successful signup
//       console.log("Signup successful:", response.data);
//       // Store the token in localStorage or cookies
//       localStorage.setItem('token', response.data.token);

//       // Redirect or update UI based on the response
//       if (role === 'consumer') {
//         window.location.href = '/consumer-dashboard';
//       } else if (role === 'producer') {
//         window.location.href = '/producer-dashboard';
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };





//   return (
//     <div className="row vh-100 g-0">
//       {/* Left side */}
//       <div className="col-lg-6 position-realtive d-none d-lg-block">
//         <div className="bg-holder2" ></div>
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
//               <h3 className="fw-bold">Sign Up</h3>
//               <p className="text-secondary">Create your account</p>
//             </div>
//             {/* Social Login */}
//             <button
//               className="btn btn-lg btn-outline-secondary btn-outline-custom w-100 mb-3"
//             >
//               <i className="bx bxl-google text-danger me-1 fs-6"></i>
//               Signup With Google
//             </button>
//             <button
//               className="btn btn-lg btn-outline-secondary btn-outline-custom w-100"
//             >
//               <i className="bx bxl-facebook text-primary me-1 fs-6"></i>
//               Signup With Facebook
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
//                   <i className="bx bx-user"></i>
//                 </span>
//                 {/* <label for="">Email</label> */}
//                 <input
//                   type="text"
//                   className="form-control form-control-lg fs-6"
//                   placeholder="Username"
//                   name="name"
//                 />
//               </div>
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
//                   type="password"
//                   className="form-control form-control-lg fs-6"
//                   placeholder="Password"
//                   name="password"
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
//               <button
//                 type="submit"
//                 className="btn btn-primary btn-lg w-100 mb-3"
//               >
//                 Signup
//               </button>
//             </form>
//             {/* form */}

//             <div className="text-center">
//               <small>
//                 Already have an account?
//                 <a href="/login" className="fw-bold">
//                   Login
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

// export default Signup;
