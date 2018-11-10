import React, { Component } from 'react'

class ZCard extends Component {
    render() {
        return(
            <div style={{padding: 20}}>
                <text style={{fontSize: 20, color: 'white', fontWeight: '200'}}>{this.props.title}</text>
            </div>
        );
    }
}

export default ZCard