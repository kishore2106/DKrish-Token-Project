import React, { useState } from "react";
import { token, cansterId, createActor } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId } from "../../../declarations/token/index";

function Transfer() {

  const [recipientId, setId] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [hidden, setHidden] = useState(true);

  async function handleClick() {
    setFeedback (true);
    setDisabled(true);
    const recipient = Principal.fromText(recipientId)
    const amount = Number (toAmount)

    // Uncomment the below part lines to when you deploy in the Live Server 
    // const authClient = await AuthClient.create();
    // const identity = authClient.getIdentity();
    // const authenticatedCanister = createActor(canisterId, {
    //   agentOptions: {
    //     identity,
    //   },
    // });
    // const result = await authenticatedCanister.transfer(recipient, amount);

    // Use when locally executed else comment the below line
    const result = await token.transfer(recipient, amount);
    setFeedback(result);
    setHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled} >
            Transfer
          </button>
        </p>
        <p hidden={hidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
