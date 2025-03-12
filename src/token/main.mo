import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";

actor Token {

    let owner : Principal = Principal.fromText("o4zg2-f3qwj-dcqen-wtu3c-s2ugs-lt46g-qvp3z-k7htk-ywyba-mtzcr-vae");
    let totalSupply : Nat = 1000000000;
    let symbol : Text = "DKRISH";

    private stable var balanceEntries: [(Principal, Nat)] = [];
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    if (balances.size() < 1){
            balances.put(owner, totalSupply);
        };

    public query func balanceOf(who: Principal): async Nat {
        
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol(): async Text{
        return symbol;
    };

    public shared(msg) func payOut(): async Text{
        // Debug.print(debug_show(msg.caller));
        if (balances.get(msg.caller) == null){
            let amount = 10000;
            let result = await transfer(msg.caller, amount);
            return result;
        } else {
            return "Already Claimed";
        }
    };

    public shared(msg) func transfer(to: Principal, amount: Nat): async Text{

        let fromBalance = await balanceOf(msg.caller);
        if(fromBalance > amount){
            let newFromBalance: Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);

            return "Success";
        } else {
            return "Insufficient funds";
        }
    };

    system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if (balances.size() < 1){
            balances.put(owner, totalSupply);
        };
    };

}