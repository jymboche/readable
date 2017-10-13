import React, {Component} from 'react';
import PostRating from './PostRating';
import {Segment, Grid, Item, Confirm} from 'semantic-ui-react';
import {handleCommentVote, handleDeleteComment, openCommentModal} from '../actions/index';
import {connect} from 'react-redux';
import Button from 'semantic-ui-react/dist/es/elements/Button/Button';
import CommentFormModal from './CommentFormModal';

class Comment extends Component {

    state = {
        deleteConfirmOpen: false
    };

    showDeleteConfirm = () => this.setState({deleteConfirmOpen: true});

    handleDeleteCancel = () => this.setState({deleteConfirmOpen: false});

    handleDeleteConfirm = () => {
        this.props.deleteComment(this.props.comment.id, this.props.comment.parentId);
        this.setState({deleteConfirmOpen: false});
    };

    render() {

        const comment = this.props.comment;

        return (
            <Segment className="commentSegment">

                <Grid stackable stretched columns={2} verticalAlign='top'>

                    <Grid.Row>

                        <Grid.Column className='left' width={1}>
                            <PostRating rating={comment.voteScore} onChange={this.handleVoteChange} />
                        </Grid.Column>

                        <Grid.Column className='right' width={15}>

                            <Grid>

                                <Grid.Row>

                                    <Grid.Column width={14}>

                                        <Item.Group>

                                            <Item>

                                                <Item.Content>

                                                    <Item.Meta>
                                                        <strong>{comment.author}</strong>
                                                        <em>04/29/1988 at 07:36 pm</em>
                                                    </Item.Meta>

                                                    <Item.Description>{comment.body}</Item.Description>

                                                </Item.Content>

                                            </Item>

                                        </Item.Group>

                                    </Grid.Column>

                                    <Grid.Column width={2}>

                                        <Button.Group size='tiny' basic>
                                            <Button onClick={this.editComment}>edit</Button>
                                            <Button negative onClick={this.showDeleteConfirm}>delete</Button>
                                            <Confirm
                                                open={this.state.deleteConfirmOpen}
                                                onCancel={this.handleDeleteCancel}
                                                onConfirm={this.handleDeleteConfirm} />
                                        </Button.Group>
                                        <CommentFormModal postId={comment.parentId} />

                                    </Grid.Column>

                                </Grid.Row>

                            </Grid>



                        </Grid.Column>

                    </Grid.Row>

                </Grid>

            </Segment>
        );
    }

    handleVoteChange = option => {
        this.props.voteOnComment(this.props.comment.id, option);
    };

    editComment = () => {
        this.props.openCommentModal(this.props.comment.id);
    }

}



const mapDispatchToProps = dispatch => ({
    voteOnComment: (commentId, option) => dispatch(handleCommentVote(commentId, option)),
    deleteComment: (commentId, postId) => dispatch(handleDeleteComment(commentId, postId)),
    openCommentModal: (commentId) => dispatch(openCommentModal(commentId))
});


export default connect(null, mapDispatchToProps)(Comment);