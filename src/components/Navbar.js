import React, {Component} from 'react';
import {Menu, Icon, Dropdown} from 'semantic-ui-react';
import PostFormModal from './PostFormModal';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {categoriesFetchAll, changeCategory, openPostModal} from '../actions/index';
import Button from 'semantic-ui-react/dist/es/elements/Button/Button';

class Navbar extends Component {

    state = {
        selectedCategory: "All Posts"
    };

    componentWillReceiveProps(props) {
        let active = "All Posts";
        if (props.location) {
            const pathParts = props.location.pathname.split("/");
            active = (pathParts.length > 2 && pathParts[2] === "posts")? pathParts[1] : "All Posts";
        }

        this.setState({selectedCategory: active});
    }

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {

        if (!this.props.categories) {
            return <h3>loading</h3>;
        }

        // INJECT OUR no-category 'All Posts' link
        let categories = [...this.props.categories];
        categories.unshift({
            name: "All Posts",
            path: "All Posts",
        });

        // map to semantic-ui properties
        categories = categories.map(c => ({
            key: c.path,
            value: c.path,
            text: c.name,
            as: Link,
            to: (c.path === "All Posts")? "/" : `/${c.path}/posts`,
            onClick: this.handleCategoryChange,
            disabled: this.state.selectedCategory === c.path,
            selected: false
        }));

        return (
            <Menu attached="top" size='large'>
                <Menu.Item header>
                    <Link to="/" onClick={this.navigateToRoot}>
                        <Icon name='comments outline' />
                        Readable
                    </Link>
                </Menu.Item>
                    <Dropdown
                        item
                        openOnFocus={true}
                        text="Categories"
                        options={categories}
                         />
                <Menu.Item position='right'>
                    <Button animated='vertical' size='mini' basic color='blue' onClick={this.props.openPostModal}>
                        <Button.Content visible>
                            &nbsp;&nbsp;&nbsp;
                            <Icon name='add' />
                            &nbsp;&nbsp;&nbsp;
                        </Button.Content>
                        <Button.Content hidden>
                            New Post
                        </Button.Content>
                    </Button>
                    <PostFormModal />
                </Menu.Item>
            </Menu>
        )
    }

    handleCategoryChange = (event, selection) => {
        let cat = (selection.value === "All Posts")? null : selection.value;

        if (selection.value !== this.state.selectedCategory) {
            this.props.changeCategory(cat);
        }

        this.setState({selectedCategory: selection.value});
    };

    navigateToRoot = () => {
        this.props.changeCategory(null);
        this.setState({selectedCategory: "All Posts"});
    }

}

const mapStateToProps = ({app}) => ({
    categories: app.categories
});

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(categoriesFetchAll()),
    changeCategory: (category) => dispatch(changeCategory(category)),
    openPostModal: () => dispatch(openPostModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);