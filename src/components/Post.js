import React, {Component} from 'react';
import PostRating from './PostRating';
import {Item, Segment, Grid} from 'semantic-ui-react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {handlePostVote} from '../actions/index';

class Post extends Component {

    render() {

        const {post} = this.props;

        const t = new Date(post.timestamp);
        post.formattedTimestamp = `${t.toDateString()} at ${t.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;

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
                                            <Link to={`/posts/${post.id}`}>
                                                {post.title}
                                            </Link>
                                        </Item.Header>
                                        <Item.Meta>
                                            <strong>{post.author}</strong>
                                            <em>{post.formattedTimestamp}</em>
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



const mapDispatchToProps = dispatch => ({
    postVote: (postId, option) => dispatch(handlePostVote(postId, option))
});


export default connect(null, mapDispatchToProps)(Post);