(async () => {
    // const account1 = '0xC42d437b15d1484B7115d76218c298A1fAAD8cb4'
    
    const contractAddress = '0xE5f2A565Ee0Aa9836B4c80a07C8b32aAd7978e22' //change this to new address whenever contract is deployed
    console.log('start exec')
    
    const artifactsPath = `Project3/artifacts/PhaseI.json` // Change this for different path
    const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
    const accounts = await web3.eth.getAccounts()

    let contract = new web3.eth.Contract(metadata.abi, contractAddress)
    
    
    const weather_data = await remix.call('fileManager', 'getFile', 'Project3/weather.txt');
    console.log(weather_data);

    let policies;

    contract.methods.view_all_policies().call({ from: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2' }, function (err, result) {
        if (err){
            console.log("An error occured", err)
            return
        } else {
            console.log("The result of first query is: ", result)
            policies = result;
            console.log("in here");
            console.log('first qurey finished')
        }
    })

    console.log("after query");
    let index = 1;
    let claim_list = [];

    contract.methods.verify().call({ from: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2' }, function (err, result) {
        if (err){
            console.log("An error occured", err)
            return
        } else {
            while (index > 0) {
                let date = policies.substr(policies.indexOf("Flight date:") + 13, 10);
                let city = policies.substring(policies.indexOf("Departure city:") + 16, policies.indexOf("Destination"));
                let search = date + " " + city;
                console.log(search);
                if(weather_data.includes(search)) {
                    let weather = weather_data.substr(weather_data.indexOf(search) + search.length, 4);
                    if ((weather == "Hail") || (weather == "Floo")) {
                        claim_list.push(policies.substring(24, policies.indexOf("Flight") - 1));
                    }
                }
                index = policies.indexOf("\nPolicy: ");
                policies = policies.substring(index + 1);
            }
            console.log(claim_list);
            console.log(result);
        }
    })

    // contract.methods.pay_indemnity(claim_list).call(function (err, result) {
    //     if (err){
    //         console.log("An error occured", err)
    //         return
    //     } else {
    //         console.log(result);
    //     }
    // })

    // const indemnityResult = await contract.methods.pay_indemnity(claim_list).send({ from: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2' });
    // console.log("Indemnity payment result:", indemnityResult);

    await contract.methods.pay_indemnity(claim_list).send({
        from: '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
        value: web3.utils.toWei((claim_list.length * 0.02).toString(), 'ether'),
        gas: 3000000
    });
    
})()