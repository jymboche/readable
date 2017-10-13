import React, {Component} from 'react';
import {Modal, Button, Form, TextArea} from 'semantic-ui-react';
import {closeCommentModal, handleAddComment, handleUpdateComment} from '../actions/index';
import {connect} from 'react-redux';

class CommentFormModal extends Component {

    state = {
        id: null,
        author: '',
        body: ''
    };

    componentWillReceiveProps(props) {
        if (props.activeComment) {
            this.setState({...props.activeComment});
        } else {
            this.setState({id: null, author: '', body: ''});
        }
    }

    render() {

        return (
            <div>
                <Modal
                    open={this.props.commentModalOpen}
                    onClose={this.props.hideCommentModal}
                >
                    <Modal.Header>New Comment</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form>
                                <Form.Field>
                                    <Form.Input placeholder='Username' value={this.state.author} onChange={this.handleUsernameChange} disabled={this.state.id}/>
                                </Form.Field>
                                <Form.Field>
                                    <TextArea placeholder='Content' value={this.state.body} onChange={this.handleTextAreaChange} />
                                </Form.Field>
                                <Button primary onClick={this.handleSubmit}>Submit</Button>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }

    handleUsernameChange = (e, {value}) => this.setState({author: value});

    handleTextAreaChange = (e, {value}) => this.setState({body: value});

    handleSubmit = () => {

        const comment = this.state;
        comment.parentId = this.props.postId;

        if (!comment.id) {
            comment.id = Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);

            comment.timestamp = Math.floor(Date.now() / 1000)
            this.props.addComment(comment);
        } else {
            this.props.updateComment(comment);
        }

    }

}

const mapStateToProps = ({app}) => ({
    activeComment: app.activeComment,
    commentModalOpen: app.commentModalOpen
});

const mapDispatchToProps = dispatch => ({
    addComment: (comment) => dispatch(handleAddComment(comment)),
    hideCommentModal: () => dispatch(closeCommentModal()),
    updateComment: (comment) => dispatch(handleUpdateComment(comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormModal);