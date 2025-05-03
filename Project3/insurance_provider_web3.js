(async () => {
    // const account1 = '0xC42d437b15d1484B7115d76218c298A1fAAD8cb4'
    
    // const contractAddress = '0x3c725134d74D5c45B4E4ABd2e5e2a109b5541288' //change this to new address whenever contract is deployed
    console.log('start exec')
    
    // const artifactsPath = `Project3/artifacts/PhaseI.json` // Change this for different path
    // const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
    // const accounts = await web3.eth.getAccounts()

    // let contract = new web3.eth.Contract(metadata.abi, contractAddress)
    
    
    const weather_data = await remix.call('fileManager', 'getFile', 'Project3/weather.txt');
    console.log(weather_data);

    const policies;

    contract.methods.view_all_policies().call(function (err, result) {
        if (err){
            console.log("An error occured", err)
            return
        } else {
            console.log("The result of first query is: ", result)
            policies = result;
            console.log('first qurey finished')
        }
    })

    const index = 1;
    const pay_list = [];

    while (index > 0) {
        const date = policies.substr(polices.indexOf("Flight Date:") + 12, 10);
        const city = policies.substring(polices.indexOf("Departure city:") + 15, polices.indexOf("Destination"));
        const search = date + " " + city;
        console.log(search);
        if(weather_data.includes(search)) {
            const weather = weather_data.substr(weather_data.indexOf(search) - search.length, 4);
            if ((weather == "Hail") || (weather == "Floo")) {
                pay_list.push(policies.substr(16, 8));
            }
        }
        index = policies.indexOf("\nPass");
        policies = policies.substring(index);
    }
    console.log(pay_list.toString());
    
})()