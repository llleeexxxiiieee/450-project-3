(async () => {
    // const account1 = '0xC42d437b15d1484B7115d76218c298A1fAAD8cb4'
    
    const contractAddress = '0x673f478661A1C3785945F6724a5E065a6aa9D27b' //change this to new address whenever contract is deployed
    console.log('start exec')
    
    const artifactsPath = 'Project3/artifacts/PhaseIandII.json' // Change this for different path
    const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
    const accounts = await web3.eth.getAccounts()

    let contract = new web3.eth.Contract(metadata.abi, contractAddress)
    
    // contract.methods.view_policy().call(function (err, result) {
    //     if (err){
    //         console.log("An error occured", err)
    //         return
    //     } else {
    //         console.log("The result of first query is: ", result)
    //         console.log('first qurey finished')
    //     }
    // })

    // const prompt = require('prompt-sync')();
    // let name = prompt("Please enter your name:");
    // let flight_number = prompt("Please enter your flight number:");
    // let flight_date = prompt("Please enter your flight date:");
    // let departure_city = prompt("Please enter your departure city:");
    // let destination_city = prompt("Please enter your destination city:");

    await contract.methods.purchase_policy("Alexandra Rauer", "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", "450000", "2023-04-16", "Boston", "Denver").send({
        from: '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',      
        value: web3.utils.toWei('0.01', 'ether'),
        gas: 3000000
    });

    await contract.methods.purchase_policy("Theodore Hoover", "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB", "488000", "2023-04-15", "Denver", "Des Moines").send({
        from: '0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB',     
        value: web3.utils.toWei('0.01', 'ether'), 
        gas: 3000000
    });

    await contract.methods.purchase_policy("Karola Rauer", "0x617F2E2fD72FD9D5503197092aC168c91465E7f2", "196871", "2023-04-18", "Tampa", "Minneapolis").send({
        from: '0x617F2E2fD72FD9D5503197092aC168c91465E7f2',      
        value: web3.utils.toWei('0.01', 'ether'), 
        gas: 3000000
    });

    await contract.methods.purchase_policy("Thomas Rauer", "0x17F6AD8Ef982297579C203069C1DbfFE4348c372", "196871", "2023-04-18", "Miami", "Berlin").send({
        from: '0x17F6AD8Ef982297579C203069C1DbfFE4348c372',   
        value: web3.utils.toWei('0.01', 'ether'), 
        gas: 3000000
    });


    console.log('exec finished')
    
})()