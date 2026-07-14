import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { type RootState } from "../../../app/store";
import { changeSelectedCoin } from "../slices/marketSlice";
import { Select } from "antd";

export const CoinSelector = () =>{
    const dispatch = useDispatch();

    const coins = useSelector((state: RootState) => state.market.coinsList)
    // const currentCoin = useSelector((state: RootState) => state.market.selectedCoinId)

    const handleChange = (selectedOption: { value: string; label: React.ReactNode }) => {
        dispatch(changeSelectedCoin(selectedOption.value));
    };

    const SelectorStyle: React.CSSProperties = {
            color: '#fff',
            backgroundColor: '#000000',
            width: 200,
            margin: '10px',
            border:'1px solid black'
    
    };

    return (
        // <div>
        //     {coins.map((coin) => {
        //         let isActive = coin.id === currentCoin ? "green" : "red"
        //         return (
        //             <button  
        //             key={coin.id}
        //              onClick={() => dispatch(changeSelectedCoin(coin.id))}
        //              style = {{
        //                 backgroundColor:isActive
        //              }}>
        //                 {coin.name}
        //             </button>
        //         )
        //     })}
        // </div>

        

        <div>
        <Select 
            style={SelectorStyle}
            labelInValue
              
                options={coins.map(coin => ({
                label : coin.name,
                value: coin.id,
            }))}
            onChange={handleChange}
            placeholder = 'Bitcoin (BTC)'
        
        />
        </div>
    )
}