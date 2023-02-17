import { Component } from 'react';
import { Spin } from 'antd';

export class PopupLoadingIndicator extends Component {
    render() {
        return (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <div className="fade-in" style={{ backgroundColor: '#000000aa', borderRadius: '5px', padding: '30px', border: '1px solid white' }}>
                    <Spin tip="Loading..." size="large" />
                </div>
            </div>
        );
    }
}
