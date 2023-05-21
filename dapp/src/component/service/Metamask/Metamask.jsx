import React from "react";
import {Button} from "@material-tailwind/react";
import {useContext} from "react";
import {MetamaskContext} from "../../../App";


export function ButtonMetamask() {
    const {isMetamaskConnected, setMetamaskConnected} = useContext(MetamaskContext);

    React.useEffect(() => {
        console.log("useEffect deco");
        const handleAccountsChanged = (accounts) => {
            if (accounts.length === 0) {
                console.log('Please connect to MetaMask.');
                setMetamaskConnected({...isMetamaskConnected,isMetamaskConnected: false, address: null,
                })
            }
        };
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);

    async function loginMetamask() {
        console.log("loginMetamask");
        if (window.ethereum.isMetaMask) {
            // Login to Metamask
            return await window.ethereum.request({method: 'eth_requestAccounts'})
                .then(async (accounts) => {
                    setMetamaskConnected({isMetamaskConnected: true, address: accounts[0],})
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
    return (
        <>
            {isMetamaskConnected.isMetamaskConnected
                ?  <Button size="lg" color="white" className="flex items-center gap-3" onClick={loginMetamask}>
                    <img src="/icons/MetaMask_Fox.svg.png" alt="metamask" className="h-6 w-6"/>
                    {isMetamaskConnected.address.slice(0,3)}...{isMetamaskConnected.address.slice(-3)}
                </Button>
                :
                <Button size="lg" color="white" className="flex items-center gap-3" onClick={loginMetamask}>
                    <img src="/icons/MetaMask_Fox.svg.png" alt="metamask" className="h-6 w-6"/>
                    Connect Wallet
                </Button>

            }
        </>
    )
}


