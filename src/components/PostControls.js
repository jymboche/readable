import React, {Component} from 'react';
import {Button, Confirm} from 'semantic-ui-react';
import PostFormModal from './PostFormModal';
import {handleDeletePost, openPostModal} from '../actions/index';
import {connect} from 'react-redux';

class PostControls extends Component {

    state = {
        deleteConfirmOpen: false
    };

    showDeleteConfirm = () => this.setState({deleteConfirmOpen: true});

    handleDeleteCancel = () => this.setState({deleteConfirmOpen: false});

    handleDeleteConfirm = () => {
        this.props.deletePost(this.props.post.id);
        this.setState({deleteConfirmOpen: false});
    };

    render() {

        let isSmall = this.props.small? this.props.small : false;

        return (
            <div>
                { !isSmall && (
                    <Button.Group size='tiny'>
                        <Button onClick={this.editPost}>edit</Button>
                        <Button.Or />
                        <Button negative onClick={this.showDeleteConfirm}>delete</Button>
                    </Button.Group>
                )}
                { isSmall && (
                    <div>
                        <a onClick={this.editPost}>edit</a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a onClick={this.showDeleteConfirm}>delete</a>
                    </div>
                )}

                <Confirm
                    open={this.state.deleteConfirmOpen}
                    onCancel={this.handleDeleteCancel}
                    onConfirm={this.handleDeleteConfirm} />
                <PostFormModal />
            </div>

        );

    }


    editPost = () => {
        this.props.openPostModal(this.props.post.id);
    }
}

const mapDispatchToProps = dispatch => ({
    openPostModal: (postId) => dispatch(openPostModal(postId)),
    deletePost: (postId) => dispatch(handleDeletePost(postId))
});

export default connect(null, mapDispatchToProps)(PostControls);