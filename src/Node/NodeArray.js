import React from 'react';

class NodeArray extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { value, index, numberOfItem } = this.props;
        let nodeArrayClass = 'node-array-big';
        if(numberOfItem > 135) {
            nodeArrayClass = 'node-array-small';
        } else if(numberOfItem > 110) {
            nodeArrayClass = 'node-array-larger-small';
        } 
        else if(numberOfItem > 95) {
            nodeArrayClass = 'node-array-smaller-medium';
        } else if(numberOfItem > 75) {
            nodeArrayClass = 'node-array-medium';
        }
        let heightString = value + 'px';
        return (
            <div id={`${index}`} className={`${nodeArrayClass} node-array`} style={{height: heightString }}></div>
        );
    }
}

export default NodeArray;