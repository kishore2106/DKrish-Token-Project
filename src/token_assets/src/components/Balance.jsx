import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {

  const [inputValue, setInputValue] = useState("");
  const [balanceResult, setBalanceResult] = useState("");
  const [currency, setCurrency] = useState("");
  const [hidden, setHidden] = useState(true);
  
  async function handleClick() {
    // console.log(inputValue);
    const balance = await token.balanceOf(Principal.fromText(inputValue));
    setBalanceResult(balance.toLocaleString());
    const currencySymbol = await token.getSymbol();
    setCurrency(currencySymbol);
    setHidden(false);
    
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value = {inputValue}
          onChange = {(e) => setInputValue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={hidden}>This account has a balance of {balanceResult} {currency}.</p>
    </div>
  );
}

export default Balance;
