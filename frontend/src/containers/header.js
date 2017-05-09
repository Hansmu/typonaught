import React, { Component } from 'react';

import { getUsername } from '../../utils/ui-utils';

export default class Header extends Component {

  render() {
    return (
        <div>
            <div style={{textAlign: 'center', marginTop: '20px'}}>
                {getUsername() &&
                    <h3>
                        <span style={{color: 'white'}}>{getUsername()}</span> welcome to
                    </h3>
                }
                <a href="#" onClick={() => this.props.router.push('/')}>
                    <img src="../../style/animations/typonaught.png"/>
                </a>
            </div>
          { this.props.children }
        </div>
    );
  }
}
