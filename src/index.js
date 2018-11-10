import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import ZCard from './components/ZCard'

import userData from './data/user.json'
import orderData from './data/order-book.json'


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            bids: [],
            asks: []
        }
    }

    componentWillMount(){
        orderData.map((res, id) => {
            let $bids = this.state.bids
            let $asks = this.state.asks
            if(res.type =='bid'){
                $bids.sort((a,b)=> b.price - a.price);
                $bids.push({"id": res.id, "type": res.type, "price": res.price, "volume": res.volume})
            } else {
                $asks.sort((a,b)=> a.price - b.price);
                $asks.push({"id": res.id, "type": res.type, "price": res.price, "volume": res.volume})
            }
        })
    }

    render() {
        let $asks = this.state.asks
        return(
            <div style={{display: 'flex', marginTop: 20, backgroundColor:'#151E31', color: 'white', fontFamily: 'new-times-roman' }}>
                <div style={{width: '20%'}}>
                    <ZCard title={userData.name} />
                    <div style={{paddingLeft: 20, borderWidth: 10}}>
                        Wallet Balance
                        <hr size='10%' width="100%"/>
                    </div>
                    {
                        userData.balances.map((res, id) => {
                            return(
                                <div key={id} style={{paddingBottom: 10, paddingLeft: 20}}>
                                    <text style={{paddingRight: 20}}>{res.symbol}</text>
                                    <text>{res.balance}</text>
                                </div>
                            )
                        })
                    }

                    
                <div style={{paddingLeft: 20, paddingTop: 30}}>
                    <div style={{borderWidth: 10}}>
                        Limit Order
                        <hr size='10%' width="100%"/>
                    </div>
                    <select>
                        <option value="bid">Buy (Bid)</option>
                        <option value="ask">Sell (Ask)</option>
                    </select>
                    <form>
                        <label> Price: <input type="text" name="price" /> </label>
                        <label> Volume: <input type="text" name="volume" /> </label>
                        <label> Total: <input type="text" name="total" /> </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                </div>

                <div style={{padding: 20, fontSize: 15}}>
                    <table width='200'>
                        <tr><th style={{textAlign: 'left'}}>Asks</th></tr>
                        <tr>
                            <td>Price</td>
                            <td>Volume</td>
                        </tr>
                        {
                            this.state.asks.map((res, id) => {
                                return(
                                    <tr key={id}>
                                        <td>{res.price}</td>
                                        <td>{res.volume}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr><th style={{textAlign: 'left', paddingTop: 20}}>Bids</th></tr>
                        <tr>
                            <td>Price</td>
                            <td>Volume</td>
                        </tr>
                        {
                            this.state.bids.map((res, id) => {
                                return(
                                    <tr key={id}>
                                        <td>{res.price}</td>
                                        <td>{res.volume}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));