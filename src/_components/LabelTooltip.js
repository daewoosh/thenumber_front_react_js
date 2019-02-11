import React from 'react';
import ReactTooltip from 'react-tooltip'

const svgSource = (fill) => {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill={fill} xmlns="http://www.w3.org/2000/svg">
            <path d="M6.33325 11H7.66659V9.66667H6.33325V11ZM6.99992 0.333336C3.31992 0.333336 0.333252 3.32 0.333252 7C0.333252 10.68 3.31992 13.6667 6.99992 13.6667C10.6799 13.6667 13.6666 10.68 13.6666 7C13.6666 3.32 10.6799 0.333336 6.99992 0.333336ZM6.99992 12.3333C4.05992 12.3333 1.66659 9.94 1.66659 7C1.66659 4.06 4.05992 1.66667 6.99992 1.66667C9.93992 1.66667 12.3333 4.06 12.3333 7C12.3333 9.94 9.93992 12.3333 6.99992 12.3333ZM6.99992 3C5.52659 3 4.33325 4.19334 4.33325 5.66667H5.66659C5.66659 4.93334 6.26659 4.33334 6.99992 4.33334C7.73325 4.33334 8.33325 4.93334 8.33325 5.66667C8.33325 7 6.33325 6.83334 6.33325 9H7.66659C7.66659 7.5 9.66659 7.33334 9.66659 5.66667C9.66659 4.19334 8.47325 3 6.99992 3Z" />
        </svg>
    );
}

class LabelTooltip extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const defaultText = '';
        return (
            <div className='tooltip-label'>
                <span>{this.props.title}</span>
                <div data-tip={this.props.tooltipText || defaultText} >
                    {svgSource('black')}
                </div>
                <ReactTooltip effect="solid"/>
            </div>
        );
    }
}

export default LabelTooltip;