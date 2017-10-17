import React, {Component} from 'react';
import {Button, Confirm, Grid, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {fetchSinglePost, handleDeletePost, handlePostVote, openPostModal} from '../actions/index';
import CommentList from './CommentList';
import PostRating from './PostRating';
import PostControls from './PostControls';

class SinglePost extends Component {

    componentDidMount() {
        this.props.fetchSinglePost(this.props.params.id);
    }

    render() {

        const post = this.props.post;

        if (!post) {
            return <Header textAlign='center' text='Loading...' />
        }

        const t = new Date(post.timestamp);
        post.formattedTimestamp = `${t.toDateString()} at ${t.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;

        return (
            <div>

                <Grid padded doubling columns={2}>

                    <Grid.Row>

                        <Grid.Column width={1}>

                            <PostRating rating={post.voteScore} onChange={this.handleVoteChange}/>

                        </Grid.Column>

                        <Grid.Column width={15}>

                            <Grid>

                                <Grid.Row verticalAlign='middle'>

                                    <Grid.Column width={14}>
                                        <Header size='huge'>
                                            {post.title}
                                        </Header>
                                    </Grid.Column>

                                    <Grid.Column width={2} textAlign='right'>
                                        <PostControls post={post} />
                                    </Grid.Column>

                                </Grid.Row>

                            </Grid>


                            <p>
                                <strong>{post.author}</strong>
                                &nbsp;&nbsp;&nbsp;
                                <em>{post.formattedTimestamp}</em>
                            </p>

                        </Grid.Column>

                    </Grid.Row>

                    <Grid.Row>

                        <Grid.Column textAlign='justified' width={16}>

                            <p style={{textAlign: 'justify'}}>
                                {post.body}
                            </p>

                        </Grid.Column>

                    </Grid.Row>

                </Grid>

                <CommentList postId={post.id} />

            </div>
        );
    }

    handleVoteChange = option => {
        this.props.postVote(this.props.post.id, option);
    };

}

const mapStateToProps = ({app}) => ({
    post: app.activePost,
    comments: app.comments
});

const mapDispatchToProps = dispatch => ({
    fetchSinglePost: postId => dispatch(fetchSinglePost(postId)),
    postVote: (postId, option) => dispatch(handlePostVote(postId, option)),
    openPostModal: (postId) => dispatch(openPostModal(postId)),
    deletePost: (postId) => dispatch(handleDeletePost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);