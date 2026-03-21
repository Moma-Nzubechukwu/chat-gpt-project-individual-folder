const express = require("express")
const data = require("./data/phones.json")
const apiKeys = require('./data/api-keys.json')
const app = express()
const port = 8080;
const host = "0.0.0.0"
//console.log(data)
//data.forEach((item)=>{
//	console.log(item["Company Name"])
//})

const checkIfTextMatchescomponet = (item, text, componet)=>{
    const textLen = text.length 
 
    let startIndex = 0
	for (let i = 0; i <= item[componet].length; i++){

        if (i >= textLen){
        startIndex = startIndex +1

    }



		if (text.toLowerCase() === item[componet].slice(startIndex, i+1).toLowerCase()){

			return item
		}
	}
}
// console.log(data.filter(checkIfTextMatchescomponet("apple", "Company Name")))
app.get("/api/phones/:devKey", (req, res)=>{
	console.log(req.params)
	console.log(req.query)
	const {devKey} = req.params
	let isInApiList = false
	let newData = data;
	if (devKey){
		apiKeys.forEach((api)=>{
			if (api === devKey){
				isInApiList = true
			}
		})
		
		if (isInApiList){	
			const  phoneName = req.query["Company Name"]
			const modelName = req.query["Model Name"]
			const mobileWeight = req.query["Mobile Weight"]
			const ramSize = req.query["RAM"]
			const frontCamera = req.query["Front Camera"]
			const backCamera = req.query["Back Camera"]
			const processor = req.query["Processor"]
			const battryCapacity = req.query["Battery Capacity"]
			const screenSize = req.query["Screen Size"]
			const launchedPrize = req.query["Launched Price"]
//			let newData = data;
			if (phoneName){
				console.log(phoneName)
					if (phoneName.slice(0, 5) === "like(" && phoneName.slice(-1 === ")")){
					const reaPhoneName = phoneName.slice(5, -1)

					newData = newData.filter((item)=>{
						// console.log(item, reaPhoneName, "Company Name")
						return checkIfTextMatchescomponet(item, reaPhoneName, "Company Name")
					})
					console.log(reaPhoneName, newData)

				}
				else{

					newData = newData.filter(item => phoneName === item["Company Name"])
				}
				


			}
			if (modelName){
				if (modelName.slice(0, 5) === "like(" && modelName.slice(-1 === ")")){
					const realModelName = modelName.slice(5, -1)

					newData = newData.filter((item)=>{
						// console.log(item, realModelName, "Model Name")
						return checkIfTextMatchescomponet(item, realModelName, "Model Name")
					})

				}
				else{
					newData = newData.filter(item => modelName === item["Model Name"])

				}
			}
			if (mobileWeight){
				if (mobileWeight.slice(0, 5) === "like(" && mobileWeight.slice(-1 === ")")){
					const realMobileWeightName = mobileWeight.slice(5, -1)
					newData = newData.filter((item)=>{
						return checkIfTextMatchescomponet(item, realMobileWeightName, "Mobile Weight")
					})

				}else{

					newData = newData.filter(item => mobileWeight === item["Mobile Weight"])
				}
			}
			if (ramSize){
				if (ramSize.slice(0, 5) === "like(" && ramSize.slice(-1 === ")")){
					const realRamSizeName = ramSize.slice(5, -1)
					newData = newData.filter((item)=>{
						return checkIfTextMatchescomponet(item, realRamSizeName, "RAM")
					})

				}else{

					newData = newData.filter(item => ramSize === item["RAM"])
				}

			}
			if (frontCamera){
				if (frontCamera.slice(0, 5) === "like(" && frontCamera.slice(-1 === ")")){
					const realFrontCameraName = frontCamera.slice(5, -1)
					newData = newData.filter((item)=>{
						return checkIfTextMatchescomponet(item, realFrontCameraName, "Front Camera")
					})

				}else{

					newData = newData.filter(item => frontCamera === item["Front Camera"])
				}
			}
			if (backCamera){
				if (backCamera.slice(0, 5) === "like(" && backCamera.slice(-1 === ")")){
					const realBackCameraName = backCamera.slice(5, -1)
					newData = newData.filter((item)=>{
						checkIfTextMatchescomponet(item, realBackCameraName, "Company Name")
					})

				}else{

					newData = newData.filter(item => backCamera === item["Back Camera"])
				}
			}
			if (processor){
				if (processor.slice(0, 5) === "like(" && processor.slice(-1 === ")")){
					const realProcessorName = processor.slice(5, -1)
					newData = newData.filter((item)=>{
						return checkIfTextMatchescomponet(item, realProcessorName, "Processor")
					})

				}else{

					newData = newData.filter(item => processor === item["Processor"])
				}

			}
			if (battryCapacity){
				if (battryCapacity.slice(0, 5) === "like(" && battryCapacity.slice(-1 === ")")){
					const realBattryCapacityName = battryCapacity.slice(5, -1)
					newData = newData.filter((item)=>{
						return checkIfTextMatchescomponet(item, realBattryCapacityName, "Battery Capacity")
					})

				}else{

					newData = newData.filter(item => battryCapacity === item["Battery Capacity"])
				}
			}
			if (screenSize){
				if (screenSize.slice(0, 5) === "like(" && screenSize.slice(-1 === ")")){
					const realScreeSizeName = screenSize.slice(5, -1)
					newData = newData.filter((item)=>{
						return checkIfTextMatchescomponet(item, realScreeSizeName, "Company Name")
					})

				}else{
					newData = newData.filter(item => screenSize === item["Screen Size"])

				}
			}
			if (launchedPrize){
				if (launchedPrize.slice(0, 5) === "like(" && launchedPrize.slice(-1 === ")")){
					const realLaunchedPrze = launchedPrize.slice(5, -1)
					newData = newData.filter((item)=>{
						 return checkIfTextMatchescomponet(item, realLaunchedPrze, "Launched Price")
					})

				}
				newData = newData.filter(item => launchedPrize === item["Launched Price"])
			}

		}else{
			newData = ({
				"status":"sucess",
				"message":"not authorized"

			})
		}
	}
	res.send(newData)

})
app.get("/api/get-api", (req, res)=>{
	res.sendFile(path.join(__dirname, 'index.html'));
})
app.listen(port, host, ()=>{
	console.log(`server listening on port ${port} at http://127.0.0.1:${port}`)
	console.log(`api started on http://127.0.0.1:${port}/api/phones/`)
})
