'use client'

import {abi} from "@/contract_data/Fein.json";
import {ethers} from "ethers";
import { address } from '@/contract_data/Fein-address.json';
import { useEffect, useState } from "react";

export const CreateSong = () => {
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [owner, setOwner] = useState(null);



    const [_tokenSupply, setTokenSupply] = useState<bigint>(BigInt(0));
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
                const tx = await contract.geturi(ethers.BigNumber.from(0));
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
                const tokenSupply = totalSupply.countoftotalsupply;
                const totalfractionalamount = totalSupply.totalFractionalAmount;
                const float_tokenSupply = parseFloat(tokenSupply.toString());
                const float_totalf = parseFloat(totalfractionalamount.toString());

                const amount = float_totalf/float_tokenSupply;
                const tx = await contract.buyStake(ethers.BigNumber.from(0),{value: (amount.toString())});
                await tx.wait();

                console.log(parseInt(tokenSupply));
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

      const _releaseSong = async () => {
        if (contract) {
            try {
                const tx = await contract.releaseSong(ethers.BigNumber.from(0));
                await tx.wait(); 
          } catch (error) {
            console.error('Error:', error);
            alert('Failed.');
          }
        }
      }

      const _destributeartistToken = async () => {
        if (contract) {
            try {
                const tx = await contract.artistTokenSales(ethers.BigNumber.from(0));
                await tx.wait(); 
          } catch (error) {
            console.error('Error:', error);
            alert('Failed.');
          }
        }
      }

      const _getparticipents = async () => {
        if (contract) {
            try {
              const tx = await contract.participants(ethers.BigNumber.from(0), ethers.BigNumber.from(0));

              console.log(tx.tokenSupply.toString());
          } catch (error) {
            console.error('Error:', error);
            alert('Failed.');
          }
        }
      }
      
      const _addRevenueGen = async () => {
        if (contract) {
            try {

              const amount = "4000000000000000000";
              const tx = await contract.addRevenueGen(ethers.BigNumber.from(0),{value: (ethers.BigNumber.from(amount))} );

              console.log(tx.tokenSupply.toString());
          } catch (error) {
            console.error('Error:', error);
            alert('Failed.');
          }
        }
      }


      //_distributeRevenue
      const _distributeRevenue = async () => {
        if (contract) {
            try {
              const tx = await contract.distributeRevenue(ethers.BigNumber.from(0));
              await tx.wait();
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
          onChange={(e) => setTokenSupply(BigInt(e.target.value))}
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
        <div className="flex">
        <button onClick={_geturi}>Get URI</button>

        <button onClick={_buystake}>Buy Stake</button>
        <button onClick={_getremainingToken}>Get Remaining Token</button>
        <button onClick={_releaseSong}>Release Song</button>
        <button onClick={_destributeartistToken}>Distribute Artist Token</button>
        <button onClick={_getparticipents}>Get Participents</button>
        <button onClick={_addRevenueGen}>Add Revenue Gen</button>
        <button onClick={_distributeRevenue}>Distribute Revenue</button>
        </div>
        </div>
    );

}

