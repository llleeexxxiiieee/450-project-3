// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract PhaseI {

    uint256 value;

    address payable public insurance_provider;

    // constructor (uint256 _p) {
    //     value = _p;
    // }
    struct policy_properties {
        string name;
        address passenger_address;
        string flight_number;
        string flight_date;
        string start_destination;
        string end_destination;
        string policy_status;
    }

    policy_properties public policy;

    constructor(address payable _insurance_provider) {
        insurance_provider = _insurance_provider;
        
    }

    function view_policy() public pure returns (string memory) {
        return "Premium: 0.01 Ether \nIndemnity: 0.02 Ether \nCoverage issues: hail and floods";
    }

    function purchase_policy() public payable {
        // require(address(this).balance >= 0.01 ether, "Insufficient balance in contract");
        insurance_provider.transfer(0.01 ether);
        policy = policy_properties("", address(this), "", "", "" ,"","");
    }

    receive() external payable {}
}