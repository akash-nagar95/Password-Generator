// plaan , kya kya create krna he , sabse pehle slider ko age piche karne se ... cjanges hote e text change ho tha hai ...
// handle slidor respossibility is to  
// paswword llength  he , slidor start at 10...
    const inputSlider=document.querySelector("[data-lengthSlider]");
    const lengthDisplay=document.querySelector("[data-lengthNumber]");
    const passwordDisplay=document.querySelector("[data-passwordDisplay]");
    let copyBtn = document.querySelector(".copyBtn");
    const copyMsg=document.querySelector("[data-copyMsg]");
    const uppercaseCheck=document.querySelector("#uppercase");
    const lowercaseCheck=document.querySelector("#lowercase");
    const numbersCheck=document.querySelector("#numbers");
    const indicator=document.querySelector("[data-indicator]");
    const symbolsCheck=document.querySelector("#symbols");
    const generateBtn=document.querySelector(".generateButton");
    const allCheckBox=document.querySelectorAll("input[type=checkbox]");

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
//set strength color to grey
setIndicator("#ccc");
//function to create.....
// copy handle slidor generate pwd setindicator getrandominteger randomup random lcase randomm symbol
//calculate strength 
 function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
 }
 function setIndicator(color)
 {
    indicator.style.backgroundColor=color;
    //shadow
 }
function getRndInteger(min,max)
{
 return Math.floor( Math.random()*(max-min))+min;
}
function generateRandomNumber()
{
    return getRndInteger(0,9);
}
function generateLowerCase()
{
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase()
{
    return String.fromCharCode(getRndInteger(65,91));
}
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function generateSymbol()
{
    const randNum=getRndInteger(0,symbol.length);
    return symbol.charAt(randNum);
    
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}
// https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
async function copyContent()
{
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e)
    {
        copyMsg.innerText="failed";
    }
    copyMsg.classList.add("active");
    setTimeout(()=> {

        copyMsg.classList.remove("active");


},2000);
}
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
        {
            checkCount++;
        }
    });
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>
{
    checkbox.addEventListener('change',handleCheckBoxChange);
})
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});
copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value)
        copyContent();
});
function shufflePassword(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
generateBtn.addEventListener('click',()=>{
//none of the checkbox is selectred
if(checkCount<=0) return;
if(passwordLength<checkCount)
{
    passwordLength=checkCount;
    handleSlider();
}
//journey to new password
password="";
let arrayOfCheckedFunction = [];

    if (uppercase.checked) arrayOfCheckedFunction.push(generateUpperCase);
    if (lowercase.checked) arrayOfCheckedFunction.push(generateLowerCase);
    if (numbers.checked) arrayOfCheckedFunction.push(generateRandomNumber);
    if (symbols.checked) arrayOfCheckedFunction.push(generateSymbol);

    // Compulsory Addition
    for (let i = 0; i < arrayOfCheckedFunction.length; i++) {
        password += arrayOfCheckedFunction[i]();
    }

    // console.log("Password: " + password);

    // Additional addition
    for (let i = 0; i < passwordLength - arrayOfCheckedFunction.length; i++) {
        let randIndex = getRndInteger(0, arrayOfCheckedFunction.length);
        password += arrayOfCheckedFunction[randIndex]();
    }
    //shuffle the password
    password=shufflePassword(Array.from(password));
    //show in ut
    passwordDisplay.value=password;
    //calculating  strength
    calcStrength();

});