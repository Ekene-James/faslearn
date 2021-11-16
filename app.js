const form = document.getElementById("form");
const ul = document.getElementById("ul");
let numberArray =[];

form.addEventListener('submit', (e) => {
e.preventDefault();
// numberArray=[];
// ul.appendChild(document.createTextNode('- '))

const phone = form.elements['phone']
const position1 = form.elements['position1']
const position2 = form.elements['position2']

let phoneVal = phone.value
let positionVal1 = position1.value
let positionVal2 = position2.value
if(!phoneVal || !positionVal1 || !positionVal2){
    alert('nigga some fields are still empty,fill those biko')
    return
}
const formattedVal =phoneVal.split('-').join('')



function insertNumber(num) {
        if(Number(positionVal2) > formattedVal.length-1) return formattedVal;
        const phoneNum = formattedVal.substring(0,Number(positionVal1)) + num + formattedVal.substring(Number(positionVal2)+1);
        if(phoneNum == formattedVal) return
        const formattedPhoneNumber = `+1 ${phoneNum.substring(0,3)}-${phoneNum.substring(3,6)}-${phoneNum.substring(6)}`
        return numberArray.push(formattedPhoneNumber)
 
}
for (let i = 0; i < 100; i++) {  
  if(i < 10) {
    
    insertNumber(`0${i}`)

  }else{
      insertNumber(i)

  }  
}
numberArray.forEach(number => {
const li = document.createElement("li");
const num = document.createTextNode(number)
li.appendChild(num);
ul.appendChild(li)
})

})