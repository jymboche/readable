import React,{Component} from 'react';
import {Button, Grid, Header, Icon} from 'semantic-ui-react';
import CommentFormModal from './CommentFormModal';
import Comment from './Comment';
import Divider from 'semantic-ui-react/dist/es/elements/Divider/Divider';
import {connect} from 'react-redux';
import {fetchComments, openCommentModal} from '../actions/index';

class CommentList extends Component {


    componentDidMount() {
        this.props.fetchComments(this.props.postId);
    }

    handleShowCommentModal = () => this.props.openCommentModal();

    render() {

        if (!this.props.comments) {
            return <Header textAlign={'center'} text='Loading...' />;
        }

        // SORT BY HIGHEST VOTED FIRST
        const comments = this.props.comments.sort( (a,b) => {
            if (a.voteScore < b.voteScore) {
                return  1;
            }

            if (a.voteScore > b.voteScore) {
                return -1;
            }

            return 0;
        });


        return (
            <Grid padded>
                <Grid.Row verticalAlign='middle'>

                    <Grid.Column width={3} floated='left'>
                        <Header color='blue'>
                            <Icon name='comments'/>
                            <Header.Content>Comments ({comments.length})</Header.Content>
                        </Header>
                    </Grid.Column>

                    <Grid.Column width={5} floated='right' textAlign='right'>
                        <Button animated='vertical' primary onClick={this.handleShowCommentModal}>
                            <Button.Content visible>
                                Add Comment
                            </Button.Content>
                            <Button.Content hidden>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Icon name='add' />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Button.Content>
                        </Button>
                        <CommentFormModal postId={this.props.postId} />
                    </Grid.Column>

                </Grid.Row>

                <Divider />

                <Grid.Row>

                    <Grid.Column width={16}>
                        {comments.map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))}
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    fetchComments: postId => dispatch(fetchComments(postId)),
    openCommentModal: () => dispatch(openCommentModal())
});

const mapStateToProps = ({app}) => ({
    comments: app.comments,
    commentModalOpen: app.commentModalOpen
});


export default connect(mapStateToProps, mapDispatchToProps)(CommentList);