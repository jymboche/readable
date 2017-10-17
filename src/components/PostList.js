import React, {Component} from 'react';
import {Grid, Dropdown, Menu, Icon, Header} from 'semantic-ui-react';
import Post from './Post';
import {connect} from 'react-redux';
import {postsFetchAll} from '../actions/index';
import _ from 'lodash';

class PostList extends Component {

    state = {
        selectedFilter: "voteScore",
        sortOrder: 'descending',
        selectedCategory: 'All Posts'
    };

    filterOptions = [
        {key: "voteScore", value: "voteScore", text: "Vote Score", selected: false},
        {key: "timestamp", value: "timestamp", text: "Timestamp", selected: false}
    ];

    constructor(props) {
        super(props);
        this.state.selectedCategory = this.getCategory(props);
    }

    componentWillReceiveProps(props) {
        this.setState({selectedCategory: this.getCategory(props)});
    }

    getCategory(props) {
        return props.params.category? props.params.category : "All Posts";
    }

    componentDidMount() {
        const cat = this.state.selectedCategory === "All Posts"? null : this.state.selectedCategory;
        this.props.fetchPosts(cat);
    }

    render() {

        // SORT THE POSTS BY COLUMN AND ORDER
        const column = this.state.selectedFilter;
        const order = this.state.sortOrder;
        const posts = this.props.posts.sort( (a,b) => {
            if (a[column] < b[column]) {
                return order === 'descending'? 1 : -1;
            }

            if (a[column] > b[column]) {
                return order === 'descending'? -1 : 1;
            }

            return 0;
        });

        const selectedCategory =_.startCase(_.toLower(this.state.selectedCategory));

        return (

            <Grid padded textAlign='left'>

                <Grid.Row>

                    <Grid.Column floated='left' width={4} verticalAlign='middle'>
                        <Header size='large'>{selectedCategory}</Header>
                    </Grid.Column>

                    <Grid.Column floated='right' width={4} textAlign='right'>

                        <Menu compact>

                            <Dropdown
                                item
                                options={this.filterOptions}
                                value={this.state.selectedFilter}
                                simple={true}
                                onChange={this.handleSortColumnChange}
                                closeOnChange={true}
                            />

                            <Menu.Item onClick={this.handleOrderChange}>
                                <Icon name={`sort alphabet ${this.state.sortOrder}`} />
                            </Menu.Item>

                        </Menu>

                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>

                    <Grid.Column width={16}>

                        { posts.map( (post) => (
                            <Post post={post} key={post.id} />
                        ))}

                    </Grid.Column>

                </Grid.Row>

            </Grid>
        );
    }


    handleSortColumnChange = (e, selection) => {
        this.setState({
            selectedFilter: selection.value
        });
    };

    handleOrderChange = () => {
        this.setState({
            sortOrder: this.state.sortOrder === "descending"? "ascending" : "descending"
        });
    }



}

function mapStateToProps(state) {
    return {
        activeCategory: state.app.activeCategory,
        categories: state.app.categories,
        posts: state.app.posts
    };

}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: (category) => (dispatch(postsFetchAll(category)))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostList);