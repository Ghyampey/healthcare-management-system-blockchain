// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Cruds {
    string[] doctors;
    string[] patients;

    struct AccessRequest {
        string doctorCid; // Identifier of the doctor requesting access
        bool approved; // Whether the patient has approved this request
    }

    // Maps hashed patient CIDs to their access requests
    mapping(bytes32 => AccessRequest[]) private accessRequests;

    // Maps an Ethereum address to the latest IPFS hash of the doctor's or patient's data
    mapping(address => string) public latestHashes;

    // === Doctors ===

    function addDoctor(string memory doc_cid) public {
        for (uint i = 0; i < doctors.length; i++) {
            if (keccak256(bytes(doctors[i])) == keccak256(bytes(doc_cid))) return;
        }
        doctors.push(doc_cid);
    }

    function getDoctor() public view returns (string[] memory) {
        return doctors;
    }

    // === Patients ===

    function addPatient(string memory patient_cid) public {
        for (uint i = 0; i < patients.length; i++) {
            if (keccak256(bytes(patients[i])) == keccak256(bytes(patient_cid))) return;
        }
        patients.push(patient_cid);
    }

    function getPatient() public view returns (string[] memory) {
        return patients;
    }

    // === Access Control ===

    // Doctor requests access to a patient's data
    function requestAccess(string memory patientCid, string memory doctorCid) public {
        bytes32 key = keccak256(bytes(patientCid));
        AccessRequest memory newRequest = AccessRequest(doctorCid, false);
        accessRequests[key].push(newRequest);
    }

    // Patient grants or denies access to a doctor
    function respondToAccessRequest(string memory patientCid, string memory doctorCid, bool approve) public {
        bytes32 key = keccak256(bytes(patientCid));
        AccessRequest[] storage requests = accessRequests[key];
        for (uint i = 0; i < requests.length; i++) {
            if (keccak256(bytes(requests[i].doctorCid)) == keccak256(bytes(doctorCid))) {
                requests[i].approved = approve;
                break;
            }
        }
    }

    // View access requests for a given patient (hashed key)
    function getAccessRequests(string memory patientCid) public view returns (AccessRequest[] memory) {
        bytes32 key = keccak256(bytes(patientCid));
        return accessRequests[key];
    }

    // === Hash Updates ===

    function updateLatestDoctorHash(address doctorAddress, string memory newHash) public {
        latestHashes[doctorAddress] = newHash;
    }

    function getLatestDoctorHash(address doctorAddress) public view returns (string memory) {
        return latestHashes[doctorAddress];
    }

    function updateLatestPatientHash(address patientAddress, string memory newHash) public {
        latestHashes[patientAddress] = newHash;
    }

    function getLatestPatientHash(address patientAddress) public view returns (string memory) {
        return latestHashes[patientAddress];
    }
}
