# DKrish Token Project

## Overview
The **DKrish Token Project** is a decentralized token system built on the DFINITY Internet Computer platform. This project uses **Motoko** for the backend (smart contract logic) and **React** for the frontend (user interface). The token, named **DKRISH**, has a total supply of 1,000,000,000 and includes basic functionalities such as balance checking, token claiming (faucet), and token transfers.

## Project Structure

The project consists of two main directories:

- **token/** — Contains the backend logic written in Motoko.
- **token_assets/** — Contains the React frontend for interacting with the token.

### Backend (Motoko)

**File:** `token/main.mo`

#### Features:
- **Total Supply:** Initializes the token supply to 1,000,000,000 DKRISH.
- **Balance Checking:** Users can query their token balance.
- **Symbol Retrieval:** Fetches the token symbol.
- **Token Faucet:** New users can claim 10,000 DKRISH tokens.
- **Token Transfer:** Allows users to transfer tokens to others.

### Frontend (React)

**Directory:** `token_assets/src`

#### Components:
- **App.jsx:** Combines all components (Header, Faucet, Balance, Transfer).
- **Header.jsx:** Displays the project title.
- **Faucet.jsx:** Handles token claiming from the faucet.
- **Balance.jsx:** Allows users to check their token balance.
- **Transfer.jsx:** Facilitates token transfers between accounts.

### Authentication
The project uses **DFINITY's Internet Identity** for authentication. The authentication flow is managed using `@dfinity/auth-client`.

## How to Run the Project

### Prerequisites
Ensure you have the following installed:
- DFINITY SDK (dfx)
- Node.js
- npm or yarn

### Steps

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Start the Internet Computer local network:**
   ```bash
   dfx start --background
   ```

3. **Deploy the backend canister:**
   ```bash
   dfx deploy
   ```

4. **Install dependencies for the frontend:**
   ```bash
   cd token_assets
   npm install
   ```

5. **Start the React app:**
   ```bash
   npm start
   ```

6. **Access the frontend:**
   Open your browser and go to the provided localhost URL.

## Interacting with the Token

### Faucet
- Click the **Gimme gimme** button to claim 10,000 DKRISH tokens.

### Balance
- Enter a Principal ID and click **Check Balance** to view the token balance.

### Transfer
- Input a recipient's Principal ID and the amount to transfer, then click **Transfer**.

## Smart Contract Functions

### balanceOf
```motoko
public query func balanceOf(who: Principal): async Nat
```
- Returns the token balance of the specified Principal.

### getSymbol
```motoko
public query func getSymbol(): async Text
```
- Returns the symbol of the token ("DKRISH").

### payOut
```motoko
public shared(msg) func payOut(): async Text
```
- Allows a user to claim 10,000 DKRISH tokens if they haven't already.

### transfer
```motoko
public shared(msg) func transfer(to: Principal, amount: Nat): async Text
```
- Transfers the specified amount of tokens to the recipient.

### Check your Balance

1. Find out your principal id: o4zg2-f3qwj-dcqen-wtu3c-s2ugs-lt46g-qvp3z-k7htk-ywyba-mtzcr-vae

```
dfx identity get-principal
```

2. Save it somewhere.

e.g. My principal id is: gbdev-tyqsv-hnvqv-7mgz4-4kcfl-wbv6x-6khez-y56gq-uohqs-quomc-uqe


3. Format and store it in a command line variable:
```
OWNER_PUBLIC_KEY="principal \"$( \dfx identity get-principal )\""
```

4. Check that step 3 worked by printing it out:
```
echo $OWNER_PUBLIC_KEY
```

5. Check the owner's balance:
```
dfx canister call token balanceOf "( $OWNER_PUBLIC_KEY )"
```

### Charge the Canister


1. Check canister ID: 2vxsx-fae
```
dfx canister id token
```

2. Save canister ID into a command line variable:
```
CANISTER_PUBLIC_KEY="principal \"$( \dfx canister id token )\""
```

3. Check canister ID has been successfully saved:
```
echo $CANISTER_PUBLIC_KEY
```

4. Transfer half a billion tokens to the canister Principal ID:
```
dfx canister call token transfer "($CANISTER_PUBLIC_KEY, 500_000_000)"
```

### Deploy the Project to the Live IC Network

1. Create and deploy canisters:

```
dfx deploy --network ic
```

2. Check the live canister ID:
```
dfx canister --network ic id token
```

3. Save the live canister ID to a command line variable:
```
LIVE_CANISTER_KEY="principal \"$( \dfx canister --network ic id token )\""
```

4. Check that it worked:
```
echo $LIVE_CANISTER_KEY
```

5. Transfer some tokens to the live canister:
```
dfx canister --network ic call token transfer "($LIVE_CANISTER_KEY, 50_000_000)"
```

6. Get live canister front-end id:
```
dfx canister --network ic id token_assets
```
7. Copy the id from step 6 and add .raw.ic0.app to the end to form a URL.
e.g. zdv65-7qaaa-aaaai-qibdq-cai.raw.ic0.app

#### Note: If you wanna Deploy on the Live Server the part of code should be commented and uncommented [**Transfer.jsx** & **Faucet.jsx**]

## Roadmap

- [ ] Add wallet integration.
- [ ] Implement token burning and minting mechanisms.
- [ ] Enhance error handling and user feedback.
- [ ] Add unit tests for smart contract functions.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.

---

### Contact
For any questions or feedback, please reach out via GitHub or email.

---

Happy coding! 🚀
