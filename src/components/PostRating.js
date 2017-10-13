import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

class PostRating extends Component {

    render() {

        const size = 'mini';

        return (
            <div className='postRating'>
                <Button basic compact attached='top' icon='caret up' size={size} onClick={this.handleUpvote}/>
                <span className="score">
                    {this.props.rating? this.props.rating : 0}
                </span>
                <Button basic compact attached='bottom' icon='caret down' size={size} onClick={this.handleDownvote} />
            </div>
        )

    }

    handleDownvote = () => {
        this.props.onChange("downVote");
    };

    handleUpvote = () => {
        this.props.onChange("upVote");
    };

}


export default PostRating;