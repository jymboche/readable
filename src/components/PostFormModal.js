import React, {Component} from 'react';
import {Modal, Button, Icon, Form, TextArea} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {postsAdd} from '../actions';
import {closePostModal, handleUpdatePost, openPostModal} from '../actions/index';

class PostFormModal extends Component {

    state = {
        id: null,
        title: '',
        author: '',
        category: null,
        body: ''
    };

    componentWillReceiveProps(props) {
        if (props.post) {
            this.setState({...props.post});
        } else {
            this.setState({id: null, title: '', author: '', category: null, body: ''});
        }
    }

    closeModal = () => this.props.closePostModal();

    render() {

        const categories = this.props.categories.map(category => ({
            key: category.path,
            value: category.path,
            text: category.name
        }));

        return (
            <div>
                <Modal
                    open={this.props.postModalOpen}
                    onClose={this.closeModal}
                >
                    <Modal.Header>Create Post</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form>
                                <Form.Field>
                                    <Form.Input placeholder='Title' value={this.state.title} onChange={this.handleTitleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        placeholder='Username'
                                        value={this.state.author}
                                        onChange={this.handleAuthorChange}
                                        disabled={!!this.state.id} />
                                </Form.Field>
                                <Form.Select
                                    selection
                                    options={categories}
                                    placeholder='Select Category'
                                    disabled={!!this.state.id}
                                    value={this.state.category}
                                    onChange={this.handleCategoryChange}/>
                                <Form.Field>
                                    <TextArea placeholder='Content...' value={this.state.body} onChange={this.handleBodyChange} />
                                </Form.Field>
                                <Form.Field>
                                    <Button primary onClick={this.submitForm} >Submit</Button>
                                </Form.Field>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }

    handleTitleChange = (e, {value}) => {
        this.setState({
            title: value
        })
    };

    handleAuthorChange = (e, {value}) => {
        this.setState({
            author: value
        });
    };

    handleCategoryChange = (e, {value}) => {
        this.setState({
            category: value
        });
    };

    handleBodyChange = (e, {value}) => {
        this.setState({
            body: value
        });
    };

    submitForm = () => {

        // only submit necessary fields
        let {id, title, author, body, category} = this.state;
        let post = {id, title, author, body, category};

        if (!post.id) {
            post.id = Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);

            post.timestamp = Math.floor(Date.now() / 1000);

            this.props.addPost(post);
        } else {
            this.props.updatePost(post);
        }

    }

}

const mapStateToProps = ({app}) => ({
    postModalOpen: app.postModalOpen,
    categories: app.categories,
    post: app.editingPost
});

const mapDispatchToProps = (dispatch) => ({
    addPost: (post) => dispatch(postsAdd(post)),
    updatePost: (post) => dispatch(handleUpdatePost(post)),
    openPostModal: (editing) => dispatch(openPostModal(editing)),
    closePostModal: () => dispatch(closePostModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostFormModal);