// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract PhaseI {

    uint256 value;

    address payable public insurance_provider;

    // constructor (uint256 _p) {
    //     value = _p;
    // }
    struct Policy{
        string name;
        address payable passenger_address;
        string flight_number;
        string flight_date;
        string departure_city;
        string destination_city;
        string policy_status;
    }
    string[] public name_array;
    mapping(string => Policy) public policies;

    constructor(address payable _insurance_provider) {
        insurance_provider = _insurance_provider;
        
    }

    function view_policy() public pure returns (string memory) {
        return "Premium: 0.01 Ether \nIndemnity: 0.02 Ether \nCoverage issues: hail and floods";
    }

    function purchase_policy(string calldata name, address payable p_address, string calldata number, string calldata date, string calldata departure, string calldata destination) public payable {
        // require(address(this).balance >= 0.01 ether, "Insufficient balance in contract");
        insurance_provider.transfer(0.01 ether);
        policies[name] = Policy(name, p_address, number, date, departure, destination, "Purchased");
        name_array.push(name);
    }

    function view_purchased_policy(string memory name) public view returns (string memory) {
        return string.concat("Passenger Name: ", policies[name].name, "\nFlight Number: ", policies[name].flight_number, "Flight date: ", policies[name].flight_date, "Departure city: ", policies[name].departure_city, "Destination city: ", policies[name].destination_city, "\nPolicy Status: ", policies[name].policy_status);
    }

    function view_all_policies() public view returns (string memory) {
        string memory result = "";
        for(uint i = 0; i < name_array.length; i++){
            string memory name = name_array[i];
            result = string.concat(result, "Policy: Passenger Name: ", policies[name].name, " Flight Number: ", policies[name].flight_number, " Flight date: ", policies[name].flight_date, " Departure city: ", policies[name].departure_city, " Destination city: ", policies[name].destination_city, " Status: ", policies[name].policy_status, "\n");
        }
        return result;
    }

    function verify() public pure returns (string memory) {
        return "Verified!";
    }

    function pay_indemnity(string[] memory claim_list) public returns (string memory) {
        for(uint i = 0; i < claim_list.length; i++){
            policies[claim_list[i]].passenger_address.transfer(0.02 ether);
            policies[claim_list[i]].policy_status = "Claimed";
        }
        return "Payments successful!";
    }

    function view_balance(string memory passenger) public view returns (uint256) {
        return policies[passenger].passenger_address.balance;
    }

    receive() external payable {}
}