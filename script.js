const state={
  earnings:0,
  expence:0,
  net:0,
  transaction:[
    {
      id:Math.floor(Math.random()*1000),
      text:"Example",
      amount:0,
      type:"credit",
     }
  ]
}
const transactionFormEl=document.getElementById("transactionForm");
const renderTransactions=()=>{
  const transactionContainerEl=document.querySelector(".transactions");
  const netAmountEle=document.getElementById("netAmount");
  const earningEle=document.getElementById("earning");
  const expenseEle=document.getElementById("expense");

  const transaction=state.transaction;

  let earning=0;
  let expense=0;
  let net=0;
  transactionContainerEl.innerHTML="";
  transaction.forEach((transaction)=>{
    const {id,amount,text,type}=transaction;
    const isCredit=type == "credit"? true:false;
    const sign=isCredit? "+" : "-";

    const transactionEl=`
    <div class="transaction" id="${id}">
    <div class="left">
      <p>${text}</p>
      <p>${sign} ₹ ${amount}</p>
    </div>
    <div class="status ${isCredit? "credit" : "debit"} ">${isCredit? "C" : "D"}</div>
  </div>
    `;
    transactionContainerEl.insertAdjacentHTML('afterbegin',transactionEl);
    earning+= isCredit? amount:0;
    expense+= isCredit? 0:amount;
    net=earning-expense;
  });
  netAmountEle.innerHTML=`₹${net}`;
  earningEle.innerHTML=`₹${earning}`;
  expenseEle.innerHTML=`₹${expense}`;
};

const addTransaction=(event)=>{
  event.preventDefault();
  const isEarn=event.submitter.id == "earnBtn"? true:false;
  const formData=new FormData(transactionFormEl);
  const tData={};

  formData.forEach((value,key)=>{
    tData[key]=value;
  });
  const {text,amount}=tData;
  const transaction={
    id:Math.floor(Math.random()*1000),
    text:text,
    amount: +amount,
    type:isEarn? "credit" : "Debit"
  }
  state.transaction.push(transaction);
  renderTransactions();
  console.log(state);
}
renderTransactions();
transactionFormEl.addEventListener("submit",addTransaction);