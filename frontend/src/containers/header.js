import React, { Component } from 'react';

export default class Header extends Component {

  render() {
    return (
        <div>
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <a href="#" onClick={() => this.props.router.push('/')}>
                    <img src="../../style/animations/typonaught.png"/>
                </a>
            </div>
          { this.props.children }
        </div>
    );
  }
}
