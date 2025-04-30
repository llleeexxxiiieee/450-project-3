(async () => {
    // const account1 = '0xC42d437b15d1484B7115d76218c298A1fAAD8cb4'
    
    const contractAddress = '0x3FDC8bfda82FCbd92B64C01A29FC22CE95058B8f'
    console.log('start exec')
    
    const artifactsPath = `Project3/artifacts/PhaseI.json` // Change this for different path
    const metadata = JSON.parse(await remix.call('fileManager', 'getFile', artifactsPath))
    const accounts = await web3.eth.getAccounts()

    let contract = new web3.eth.Contract(metadata.abi, contractAddress)
    
    contract.methods.view_policy().call(function (err, result) {
        if (err){
            console.log("An error occured", err)
            return
        } else {
            console.log("The result of first query is: ", result)
            console.log('first qurey finished')
        }
    })

    console.log('exec finished')
    
})()
