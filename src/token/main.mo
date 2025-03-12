import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor Token {

    var owner : Principal = Principal.fromText("o4zg2-f3qwj-dcqen-wtu3c-s2ugs-lt46g-qvp3z-k7htk-ywyba-mtzcr-vae");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "DKRISH";

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    balances.put(owner, totalSupply);

    public query func balanceOf(who: Principal): async Nat {
        
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol(): async Text{
        return symbol;
    }


}