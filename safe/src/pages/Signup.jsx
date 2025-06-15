// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import './Signup.css'
// import Web3 from "web3";
// import contract from '../contracts/contract.json';
// import { create } from 'ipfs-http-client'
// import image from '../assets/signup_background.jpeg';
// const Signup = () => {
//     const [type, setType] = useState(false);
//     const [regp, setRegp] = useState({
//         "name": "",
//         "mail": "",
//         "password": "",
//         "number" : 1,
//         "contactNumber": "",
//         "insurance": [{}],
//         "allergies": [{}],
//         "medicalhistory": [{}],
//         "hospitalizationhistory": [{}],
//         "visit": [{}],
//         "selectedDoctors": [{}]
//     });
//     const confirmPasswordElement = document.getElementById("confirmPassword");
//     const [regd, setRegd] = useState({
//         "name": "",
//         "mail": "",
//         "password": "",
//         "hospital" : "",
//         "contactNumber": "",
//         license: "",
//         speciality: "",
//         "accessRequestsSent" : [],
//         "accessRecieved" : []
//     });
//     const validatePasswordConfirmation = () => {
//         return regp.password ===confirmPasswordElement.value;
//       };
    
//     function handle(e) {
//         const newData1 = { ...regp };
//         const newData2 = { ...regd };
//         newData1[e.target.name] = e.target.value;
//         newData2[e.target.name] = e.target.value;
//         setRegp(newData1);
//         setRegd(newData2);
//     }

//     function handleD(e) {
//         const newData = { ...regd };
//         newData[e.target.name] = e.target.value;
//         setRegd(newData);
//     }
    
//     const register = async () => {
//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const currentaddress = accounts[0];
  
//       const web3 = new Web3(window.ethereum);
//       const mycontract = new web3.eth.Contract(
//         contract["abi"],
//         contract["address"]
//       );
  
//         // Validate all fields
//         if (
//           !regp.name ||
//           !regp.mail ||
//           !regp.password ||
//           !confirmPasswordElement
        
//         ){
//           alert("Please fill in all required fields");
//           return;
//         }
    
//         // Validate password confirmation
//         if (!validatePasswordConfirmation()) {
//           alert("Password and Confirm Password do not match");
//           return;
//         }
        
      
       
//         if (!type) {
//                  // patient
//           try {
//             const patientData = await mycontract.methods.getPatient().call();
//             console.log(patientData)
//             for (let patientHash of patientData) {
//                 try {
//                     const data = await (await fetch(`http://localhost:8080/ipfs/${patientHash}`)).json();
//                     if (data.mail === regp.mail) {
//                         alert("Email address is already registered");
//                         return; // Stop the execution if email is already registered
//                     }
//                 } catch (err) {
//                     console.log(err);
//                 }
//             }
//         } catch (err) {
//             console.log(err);
//             alert("Error while checking for duplicate email");
//             return;
//         }

   
//           let client = create();
//           client = create(new URL('http://127.0.0.1:5001'));
//           const { cid } = await client.add(JSON.stringify(regp));
//           const hash = cid['_baseCache'].get('z');
//           console.log(hash);
    
//           await mycontract.methods.addPatient(hash).send({ from: currentaddress }).then(() => {
//             alert("Account created");
//           }).catch((err) => {
//             console.log(err);
//           });
//         } else {


//           try {
//             const doctorData = await mycontract.methods.getDoctor().call();
//             console.log(doctorData)
//             for (let doctorHash of doctorData) {
//                 try {
//                     const data = await (await fetch(`http://localhost:8080/ipfs/${doctorHash}`)).json();
//                     if (data.mail === regp.mail) {
//                         alert("Email address is already registered");
//                         return; // Stop the execution if email is already registered
//                     }
//                 } catch (err) {
//                     console.log(err);
//                 }
//             }
//         } catch (err) {
//             console.log(err);
//             alert("Error while checking for duplicate email");
//             return;
//         }



//           // doctor
//           let client = create();
//           client = create(new URL('http://127.0.0.1:5001'))
//           const { cid } = await client.add(JSON.stringify(regd));
//           const hash = cid['_baseCache'].get('z');
//           console.log(hash);
    
//           await mycontract.methods.addDoctor(hash).send({ from: currentaddress }).then(() => {
//             alert("Account created");
//           }).catch((err) => {
//             console.log(err);
//           });
//         }
//       };

//     return (
//         <section className="bg-gray-50 min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to right, #004e92,#000428)' }}>
//           {/* registration container */}
//           <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center bg-white/20 z-10 backdrop-filter backdrop-blur-lg shadow-lg m-10">
//             {/* form */}
//             <div className="md:w-1/2 px-8 md:px-16">
//               <h2 className="font-bold text-2xl text-gray-200">Register</h2>
//               <p className="text-xs mt-4 text-gray-300">Create a new account</p>
    
//               <form action="" className="flex flex-col gap-4">
//                 <input className="p-2 mt-8 rounded-xl border" type="text" name="name" onChange={(e) => handle(e)} id="name" placeholder="Full Name"  />
//                 <input className="p-2 rounded-xl border" type="email" name="mail" id='email' placeholder="Email" onChange={(e) => handle(e)}  />
               
//                 <input onChange={handle} type="text" placeholder="Contact Number" name="contactNumber" className="p-2 rounded-xl border w-full mb-5" />
                 
               
//                 {/* User Type Dropdown */}
//                 {/* <div className="relative">
//                   <select className="p-2 rounded-xl border w-full text-gray-400" name="type" id="user-type" placeholder="User Type"  onChange={() => { setType(!type) }}>
//                     <option disabled selected>User Type</option>
//                     <option value="doctor">Doctor</option>
//                     <option value="patient">Patient</option>
//                   </select>
//                 </div> */}
//                  <div className="relative">
//                         <div className="input-heading" style={{ margin: "1rem 0", }}>
//                             <h5 className="text-gray-300"> Type</h5>
//                             <select className="p-2 rounded-xl border w-full text-gray-400" id="user-type" name="type" onChange={() => { setType(!type) }} style={{padding:'0.5rem', backgroundColor:'white'}}>
//                                 <option value="patient">Patient</option>
//                                 <option value="doctor">Doctor</option>
//                             </select>
//                         </div>
//                     </div>
    
//                 {type &&
//                              <div className="relative">
//                                     <input onChange={(e) => handleD(e)} type="text" placeholder="Specialization" id="email" name="speciality" className="p-2 rounded-xl border w-full mb-5" />
                                
//                                     <input onChange={handle} type="text" placeholder="Hospital" name="hospital" className="p-2 rounded-xl border w-full mb-5" />                             
//                                     <input onChange={(e) => handleD(e)} type="text" placeholder="License No." id="email" name="license" className="p-2 rounded-xl border w-full"/>
//                             </div>
//                         } 



//          <input className="p-2 rounded-xl border w-full" type="password" name="password" placeholder="Password" onChange={(e) => handle(e)} />          
//           <input className="p-2 rounded-xl border" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
    
//                 <button type='button'   className="bg-[#002D74] rounded-xl text-gray-300 py-2 hover:scale-105 duration-300" onClick={() => { register(type) }}>Signup</button>
//               </form>
    
             
//               <div className="mt-3 text-xs flex justify-between items-center text-[#002D74] ">
//                 <p className='text-gray-300'>Already have an account?</p>
//                 <a href="/login" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300" >Login</a>
//               </div>
//             </div>
    
//             {/* image */}
//             <div className="md:block hidden w-1/2">
//               <img className="rounded-2xl" src={image} alt="Registration" />
//             </div>
//           </div>
//         </section>
//       );
//     }
    
//     export default Signup;
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import './Signup.css';
import Web3 from "web3";
import contract from '../contracts/contract.json'; // Your ABI JSON
import { create } from 'ipfs-http-client';
import image from '../assets/signup_background.jpeg';

const Signup = () => {
  const [type, setType] = useState("patient"); // "patient" or "doctor"
  const confirmPasswordRef = useRef(null);

  const [regp, setRegp] = useState({
    name: "",
    mail: "",
    password: "",
    contactNumber: "",
    insurance: [{}],
    allergies: [{}],
    medicalhistory: [{}],
    hospitalizationhistory: [{}],
    visit: [{}],
    selectedDoctors: [{}],
  });

  const [regd, setRegd] = useState({
    name: "",
    mail: "",
    password: "",
    hospital: "",
    contactNumber: "",
    license: "",
    speciality: "",
    accessRequestsSent: [],
    accessRecieved: [],
  });

  // Handle input changes for patient
  const handlePatientChange = (e) => {
    setRegp(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle input changes for doctor
  const handleDoctorChange = (e) => {
    setRegd(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const register = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const currentAddress = accounts[0];
      const web3 = new Web3(window.ethereum);

      // Your deployed contract address
      const contractAddress = "0x531a9eF2acd9EF7FE2e839D7a9aFd8Fff80B6474";
      const mycontract = new web3.eth.Contract(contract.abi, contractAddress);

      // Validate required fields
      if (type === "patient") {
        if (!regp.name || !regp.mail || !regp.password || !confirmPasswordRef.current?.value) {
          alert("Please fill in all required fields for patient");
          return;
        }
        if (regp.password !== confirmPasswordRef.current.value) {
          alert("Password and Confirm Password do not match");
          return;
        }
      } else {
        if (!regd.name || !regd.mail || !regd.password || !confirmPasswordRef.current?.value) {
          alert("Please fill in all required fields for doctor");
          return;
        }
        if (regd.password !== confirmPasswordRef.current.value) {
          alert("Password and Confirm Password do not match");
          return;
        }
      }

      // Fetch existing hashes from contract
      const hashes = type === "doctor"
        ? await mycontract.methods.getDoctor().call()
        : await mycontract.methods.getPatient().call();

      const emailToCheck = type === "doctor" ? regd.mail : regp.mail;
      let duplicateExists = false;

      // Check for duplicate email in IPFS user data
      for (const hash of hashes) {
        try {
          const res = await fetch(`http://localhost:8080/ipfs/${hash}`);
          if (!res.ok) continue;
          const data = await res.json();
          if (data.mail === emailToCheck) {
            duplicateExists = true;
            break;
          }
        } catch {
          // Ignore fetch errors
        }
      }

      if (duplicateExists) {
        alert("Email is already registered");
        return;
      }

      // Upload user data to IPFS
      const client = create(new URL('http://127.0.0.1:5001'));
      const userData = type === "doctor" ? regd : regp;
      const { cid } = await client.add(JSON.stringify(userData));
      const newHash = cid.toString();
      console.log("Uploaded IPFS hash:", newHash);

      // Add user on blockchain
      if (type === "doctor") {
        await mycontract.methods.addDoctor(newHash).send({ from: currentAddress });
      } else {
        await mycontract.methods.addPatient(newHash).send({ from: currentAddress });
      }

      alert("Account created successfully!");

      // Optionally clear form data here
      if (type === "doctor") {
        setRegd({
          name: "",
          mail: "",
          password: "",
          hospital: "",
          contactNumber: "",
          license: "",
          speciality: "",
          accessRequestsSent: [],
          accessRecieved: [],
        });
      } else {
        setRegp({
          name: "",
          mail: "",
          password: "",
          contactNumber: "",
          insurance: [{}],
          allergies: [{}],
          medicalhistory: [{}],
          hospitalizationhistory: [{}],
          visit: [{}],
          selectedDoctors: [{}],
        });
      }
      if (confirmPasswordRef.current) {
        confirmPasswordRef.current.value = "";
      }

    } catch (error) {
      console.error(error);
      alert("An error occurred during registration");
    }
  };

  return (
    <section
      className="bg-gray-50 min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(to right, #004e92,#000428)' }}
    >
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center bg-white/20 z-10 backdrop-filter backdrop-blur-lg shadow-lg m-10">
        {/* form */}
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-gray-200">Register</h2>
          <p className="text-xs mt-4 text-gray-300">Create a new account</p>

          <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={type === "doctor" ? handleDoctorChange : handlePatientChange}
              value={type === "doctor" ? regd.name : regp.name}
            />

            <input
              className="p-2 rounded-xl border"
              type="email"
              name="mail"
              placeholder="Email"
              onChange={type === "doctor" ? handleDoctorChange : handlePatientChange}
              value={type === "doctor" ? regd.mail : regp.mail}
            />

            <input
              className="p-2 rounded-xl border"
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              onChange={type === "doctor" ? handleDoctorChange : handlePatientChange}
              value={type === "doctor" ? regd.contactNumber : regp.contactNumber}
            />

            <div className="relative">
              <div className="input-heading" style={{ margin: "1rem 0" }}>
                <h5 className="text-gray-300">Type</h5>
                <select
                  className="p-2 rounded-xl border w-full text-gray-400"
                  name="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{ padding: '0.5rem', backgroundColor: 'white' }}
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
            </div>

            {type === "doctor" && (
              <>
                <input
                  className="p-2 rounded-xl border"
                  type="text"
                  name="speciality"
                  placeholder="Specialization"
                  onChange={handleDoctorChange}
                  value={regd.speciality}
                />
                <input
                  className="p-2 rounded-xl border"
                  type="text"
                  name="hospital"
                  placeholder="Hospital"
                  onChange={handleDoctorChange}
                  value={regd.hospital}
                />
                <input
                  className="p-2 rounded-xl border"
                  type="text"
                  name="license"
                  placeholder="License No."
                  onChange={handleDoctorChange}
                  value={regd.license}
                />
              </>
            )}

            <input
              className="p-2 rounded-xl border"
              type="password"
              name="password"
              placeholder="Password"
              onChange={type === "doctor" ? handleDoctorChange : handlePatientChange}
              value={type === "doctor" ? regd.password : regp.password}
            />
            <input
              className="p-2 rounded-xl border"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              ref={confirmPasswordRef}
            />

            <button
              type="button"
              className="bg-[#002D74] rounded-xl text-gray-300 py-2 hover:scale-105 duration-300"
              onClick={register}
            >
              Signup
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74] ">
            <p className='text-gray-300'>Already have an account?</p>
            <Link to="/login" className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
              Login
            </Link>
          </div>
        </div>

        {/* image */}
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={image} alt="Registration" />
        </div>
      </div>
    </section>
  );
};

export default Signup;
