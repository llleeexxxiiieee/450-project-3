(async () => {
    // const account1 = '0xC42d437b15d1484B7115d76218c298A1fAAD8cb4'
    
    const contractAddress = '0x3c725134d74D5c45B4E4ABd2e5e2a109b5541288' //change this to new address whenever contract is deployed
    console.log('start exec')
    
    const artifactsPath = `Project3/artifacts/PhaseI.json` // Change this for different path
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

    contract.methods.purchase_policy("Alexandra Rauer", "450000", "2023-04-16", "Boston", "Denver").call(function (err, result) {
        if (err){
            console.log("An error occured", err)
            return
        } else {
            console.log("The result of second query is: ", result)
            console.log('second qurey finished')
        }
    })

    contract.methods.purchase_policy("Theodore Hoover", "488000", "2023-04-15", "Denver", "Des Moines").call(function (err, result) {
        if (err){
            console.log("An error occured", err)
            return
        } else {
            console.log("The result of second query is: ", result)
            console.log('second qurey finished')
        }
    })

     contract.methods.purchase_policy("Karola Rauer", "196871", "2023-04-18", "Tampa", "Minneapolis").call(function (err, result) {
        if (err){
            console.log("An error occured", err)
            return
        } else {
            console.log("The result of second query is: ", result)
            console.log('second qurey finished')
        }
    })

     contract.methods.purchase_policy("Thomas Rauer", "196871", "2023-04-18", "Miami", "Berlin").call(function (err, result) {
        if (err){
            console.log("An error occured", err)
            return
        } else {
            console.log("The result of second query is: ", result)
            console.log('second qurey finished')
        }
    })

    console.log('exec finished')
    
})()