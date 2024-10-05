'use client'

import {abi} from "@/contract_data/Fein.json";
import {ethers} from "ethers";
import { address } from '@/contract_data/Fein-address.json';
import { useEffect, useState } from "react";

export const CreateSong = () => {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [owner, setOwner] = useState(null);



    const [_tokenSupply, setTokenSupply] = useState<number>(0);
    const [_tokenId, setTokenId] = useState(0);
    const [_percentageShare, setPercentageShare] = useState<number>(0);
    

    useEffect(() => {
    const init = async() => {
        if(window.ethereum && window.ethereum.isMetaMask) {
            try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(address, abi, signer);
            setContract(contractInstance);
            // const tx = await contract.createSong('Song Name', 'Song URL');
            // await tx.wait();
            // console.log('Song created successfully');
            } catch (error) {
            console.error('Error creating song:', error);
            alert('Failed to create song. Please try again.');
            }
        }
    }
    init();
    },[]);


    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const createSong = async () => {
        if (contract) {
            try {
                const tx = await contract.mintNFT(ethers.BigNumber.from(_tokenId), ethers.BigNumber.from(_tokenSupply), ethers.BigNumber.from(_percentageShare));
                await tx.wait();
          } catch (error) {
            console.error('Error:', error);
            alert('Failed.');
          }
        }
      };
      
    const _geturi = async () => {
        if (contract) {
            try {
                const tx = await contract.geturi(ethers.BigNumber.from(1));
                console.log(tx);
          } catch (error) {
            console.error('Error:', error);
            alert('Failed.');
          }
        }
      };

      const _buystake = async () => {
        if (contract) {
            try {


                const totalSupply = await contract.tokenData(ethers.BigNumber.from(0));
                const tokenSupply = totalSupply.tokenSupply;
                const totalfractionalamount = totalSupply.totalFractionalAmount;
                const float_tokenSupply = parseFloat(tokenSupply.toString());
                const float_totalf = parseFloat(totalfractionalamount.toString());

                const amount = float_totalf/float_tokenSupply;
                const tx = await contract.buyStake(ethers.BigNumber.from(0),{value: (amount.toString())});
                await tx.wait();

                console.log(tokenSupply);
                // console.log(totalSupply);
            } catch (error) {
                console.error('Error:', error);
                alert('Failed.');
                
            }
            
        }
      }

      const _getremainingToken = async () => {
        if (contract) {
            try {
                const tx = await contract.tokenData(ethers.BigNumber.from(0));

                console.log(tx.tokenSupply.toString());
          } catch (error) {
            console.error('Error:', error);
            alert('Failed.');
          }
        }
      }





    
    return (
        <div>
        <button onClick={createSong}>Create Song</button>
        <div>
        <input
          type="text"
          value={_tokenId}
          onChange={(e) => setTokenId(Number(e.target.value))}
          placeholder="tokenId"
        />
        <p>tokenID: {_tokenId.toString()}</p>
        </div>
        <div>
        <input
          type="text"
          value={_tokenSupply}
          onChange={(e) => setTokenSupply(Number(e.target.value))}
          placeholder="tokenId"
        />
        <p>tokenSupply: {_tokenSupply.toString()}</p>
        </div>
        <div>
        <input
          type="text"
          value={_percentageShare}
          onChange={(e) => setPercentageShare(Number(e.target.value))}
          placeholder="tokenId"
        />
        <p>PercentageShare: {_percentageShare.toString()}</p>
        </div>
        <button onClick={_geturi}>Get URI</button>

        <button onClick={_buystake}>Buy Stake</button>
        <button onClick={_getremainingToken}>Get Remaining Token</button>
        </div>
    );

}

