import React, {Component} from 'react';
import PostRating from './PostRating';
import {Item, Segment, Grid, Icon, Label} from 'semantic-ui-react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {fetchPostComments, handlePostVote} from '../actions/index';
import PostControls from './PostControls';

class Post extends Component {

    componentDidMount() {
        this.props.fetchPostComments(this.props.post.id);
    }

    render() {

        const {post} = this.props;

        const t = new Date(post.timestamp);
        post.formattedTimestamp = `${t.toDateString()} at ${t.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;

        const numberOfComments = this.props.numberPostComments[post.id] || 0;

        return (
            <Segment stacked className="postSegment">

                <Grid stackable stretched columns={2} verticalAlign='top'>
                    <Grid.Row>
                        <Grid.Column className='left' width={1}>
                            <PostRating rating={post.voteScore} onChange={this.handleVoteChange}/>
                        </Grid.Column>
                        <Grid.Column className='right' width={15}>
                            <Item.Group>
                                <Item>
                                    <Item.Content>
                                        <Item.Header>
                                            <Link to={`/${post.category}/${post.id}`}>
                                                {post.title}
                                            </Link>
                                        </Item.Header>
                                        <Item.Meta>
                                            <strong>{post.author}</strong>
                                            <em>{post.formattedTimestamp}</em>
                                            <Label>
                                                <Icon name='comments'/> &nbsp;{numberOfComments}
                                            </Label>
                                        </Item.Meta>
                                        <Item.Meta>
                                            <PostControls small post={post} />
                                        </Item.Meta>
                                        <Item.Description>{post.body}</Item.Description>
                                    </Item.Content>
                                </Item>
                            </Item.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Segment>
        );
    }

    handleVoteChange = option => {
        this.props.postVote(this.props.post.id, option);
    }

}


const mapStateToProps = ({app}) => ({
    numberPostComments: app.numberPostComments
});

const mapDispatchToProps = dispatch => ({
    postVote: (postId, option) => dispatch(handlePostVote(postId, option)),
    fetchPostComments: postId => dispatch(fetchPostComments(postId))
});


export default connect(mapStateToProps, mapDispatchToProps)(Post);