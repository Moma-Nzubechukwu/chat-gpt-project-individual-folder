const data = require("./data/phones.json")


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

console.log(data.filter((item)=>{
return checkIfTextMatchescomponet(item, "sung", "Company Name");

}).length)
// console.log(checkIfTextMatchescomponet(data[129], "sung", "Company Name"))
// console.log(data[129])