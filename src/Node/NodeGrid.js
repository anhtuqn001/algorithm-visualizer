import React from 'react';

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
        this.state = { 
        isAnimationEnd: false,
    }
    }

    componentDidMount() {
        const { row, col } = this.props;
        this.setState({ row, col });
    }

    handleMouseOver(e) {
        let { isAnimationEnd } = this.state;
        const { row, col } = this.props;
        var { isMouseDown, makeWallOrWeight } = this.props;
        if(isMouseDown) {
         makeWallOrWeight(row, col, isAnimationEnd);
        }
        this.setState({ isAnimationEnd: false, isMouseOn: true});
        
    }

    handleAnimationEnd() {
        this.setState({ isAnimationEnd : true })
    }

    handleMouseLeave(e) {
        let { isMouseDown , removeOldStartEndNode, isMouseOn } = this.props;
        let { isAnimationEnd } = this.state;
        if( isMouseDown ) {
            removeOldStartEndNode(e.target.id, isAnimationEnd);
        }
    }

    render() {
        var {isStart, isDestination, row, col, isVisited} = this.props; 
        return (
            <div onAnimationEnd={this.handleAnimationEnd} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} id={`${row}-${col}`} className={`node ${isDestination ? 'node-destination' : ''} ${isVisited ? 'node-isVisited' : ''} ${isStart ? 'node-start' : ''} ${col === 0 ? 'node-left': ''}`}>
            </div>
        );
    }
}

export default Node;