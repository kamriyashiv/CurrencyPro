// Currency Converter- Variables
const Currency1 = document.getElementById("Currency1");
const Currency2 = document.getElementById("Currency2");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");

// -- display data variable--//
const rate1 = document.getElementById("rate1");
const rate2 = document.getElementById("rate2");
const Cname1 = document.getElementById("Cname1");
const Cname2 = document.getElementById("Cname2");
const cDateT = document.getElementById("cDate");
const dataHistory = document.getElementById("dataHistory");

//--history--btn---//
let HistoryBtn = document.getElementById("History");
let Hbox = document.getElementById("Hbox");
let clear = document.getElementById("clear");

// -- all currency--//
const CurrencyData=[
    "USD","AED","ARS","AUD","BGN","BRL","BSD","CAD","CHF","CLP","CNY","COP","CZK","DKK","DOP","EGP","EUR","FJD","GBP","GTQ","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","KZT","MVR","MXN","MYR","NOK","NZD","PAB","PEN","PHP","PKR","PLN","PYG","RON","RUB","SAR","SEK","SGD","THB","TRY","TWD","UAH","UYU","ZAR"
];

// -- Default Selected currency--//
CurrencyData.forEach((val)=>{
    if(val==="USD"){
        Currency1.innerHTML+=`<option value="${val}" selected>${val}</option>`;        
    }else if(val==="INR"){
        Currency2.innerHTML+=`<option value="${val}" selected>${val}</option>`;
    }
    Currency1.innerHTML+=`<option value="${val}">${val}</option>`;
    Currency2.innerHTML+=`<option value="${val}">${val}</option>`;
});




//-- getting-data-from-localstorage

let lC = localStorage.getItem('currencyData'); // null
let CdataArr = lC ? JSON.parse(lC) : [];

//-calculate currency - and Converting currency
function calculate(){
    let cVal1 = Currency1.value;
    let cVal2 = Currency2.value;

    // validation--
    if(input1.value<0){
        alert("");
    }else{
        const api = `https://api.exchangerate-api.com/v4/latest/${cVal1}`;
    fetch(api).then((response)=>{
        return response.json();
    }).then((data)=>{       
        let cDate = data.date;
        let rates = data.rates[cVal2];
        let rateResult = input1.value* rates;

        // displaying Values..
        cDateT.innerText=`${cDate}`;
        rate1.innerText=`${input1.value}`;
        Cname1.innerText=`${Currency1.value}`;
        rate2.innerText=`${rateResult}`;  
        input2.value=`${rateResult}` ; 
        Cname2.innerText=`${Currency2.value}`;
        
        const HObj = {
            date: cDate,
            Amount: rateResult,
            Currency1:cVal1,
            Currency2: cVal2,
            amountVal : input1.value
        }
        CdataArr.push(HObj);  
        localStorage.setItem("currencyData",JSON.stringify(CdataArr));   

        //---display--data--on History-//

        CdataArr.map((val, index)=>{
        dataHistory.innerHTML+=`
        <tr class="trRow">
            <td>${val.Currency1} ${val.amountVal}</td>
            <td>${val.Currency2}</td>
            <td>${val.Amount}</td>
            <td>${val.date}</td>      
            <td onclick="del(${index},this)"><i class="fa-solid fa-trash"></i></d>                                              
        </tr>
        `;
        
    });
    }).catch((error)=>{
        alert("Data Not Found");
    });   
    }
    
}

// -- Change Events --//
Currency1.addEventListener("change",calculate);
Currency2.addEventListener("change",calculate);
input1.addEventListener("change",calculate);
calculate();

// Hide and Show Model 

HistoryBtn.addEventListener("click",()=>{
    Hbox.classList.toggle("show");
   
});



// Delete Row and Data From Local storage
function del(ind,th){
    th.parentElement.remove(ind);
    CdataArr.splice(th.parentElement.remove(ind),1);

    let deleted = CdataArr.filter((val,index)=>{
        return index!=ind;

    });
    localStorage.setItem('currencyData', JSON.stringify(deleted))    
}


// Clear History 
clear.addEventListener("click",()=>{
   let trRow = document.querySelectorAll('.trRow');
   for(let i = 0;  i<trRow.length; i++){
    trRow[i].remove();
    localStorage.clear();
   
   }
   console.log(Hbox);
   Hbox.classList.remove("show");
   
});






