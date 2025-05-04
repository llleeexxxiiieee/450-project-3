(async () => {
    // const account1 = '0xC42d437b15d1484B7115d76218c298A1fAAD8cb4'
    
    const contractAddress = '0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3'
    console.log('start exec')
    
    const artifactsPath = 'EthereumSampleCode/artifacts/Storage.json' // Change this for different path
    const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
    const accounts = await web3.eth.getAccounts()
    
    let contract = new web3.eth.Contract(metadata.abi, contractAddress)
    
    contract.methods.retrieve().call(function (err, result) {
        if (err){
            console.log("An error occured", err)
            return
        } else {
            console.log("The result of first query is: ", result)
            console.log('first qurey finished')
        }
    })
    
    //Asynchronous version
    // contract.methods.store(50).send({from: accounts[0]}, function (err, res) {
    //     if (err) {
    //           console.log("An error occured", err)
    //           return
    //     }
    //     console.log("Hash of the transaction: " + res)
    // })
    
    let result = await contract.methods.store(50).send({from: accounts[3]})
    console.log("Store result is: ", result)
    
    contract.methods.retrieve().call(function (err, result) {
        if (err){
            console.log("An error occured", err)
            return
        } else {
            console.log("The result of second query is: ", result)
            console.log('second query finished')
        }
    })
    
    console.log('exec finished')
    
})()
