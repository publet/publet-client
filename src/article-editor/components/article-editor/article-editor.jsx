// Dependencies
var React = require('react')
var Reflux = require('reflux')
var Immutable = require('immutable')
var hashLocation = require('react-router').HashLocation

// Actions
import { CommonActions } from '../../../common/common-actions'

// Stores
var ArticleEditorStore = require('../article-editor/article-editor-store.js')

// Components
var Navbar = require('../../../common/components/navbar/navbar.js')
var ArticleOptions = require('../../../article-editor/components/article/article-options.js')
var Article = require('../../../article-editor/components/article/article.js')

// Component
var ArticleEditor = React.createClass({
  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      article:null,
      theme: null,
      pub: null,
      group: null,
      loaded: false
    }
  },

  componentWillMount: function() {
    CommonActions.load(hashLocation.getCurrentPath());
    hashLocation.addChangeListener(function(){CommonActions.load(hashLocation.getCurrentPath())})
  },
  componentDidMount: function () {
    this.listenTo(ArticleEditorStore, this.updateData)
  },
  componentWillUnmount: function() {
    hashLocation.removeChangeListener()
  },

  updateData: function(changeObj) {
    if (changeObj.type === 'ERROR') {

      this.setState({
        error: changeObj.status
      });
    } else {

      this.setState({
        article: changeObj.get('article'),
        theme: changeObj.get('theme'),
        pub: changeObj.get('publication'),
        group: changeObj.get('group'),
        loaded: true,
        error: null
      })
    }
  },

  _renderContent: function() {
    var content;
    if (this.state.error) {
      switch (this.state.error) {
        case 401:
          content = (<div className="section grid-container"><h1 className="error-message">You don't have permission to see this page</h1></div>)
          break;
        default :
          content = (<div className="section grid-container"><h1 className="error-message">Sorry, something went wrong (Error:{this.state.error})</h1></div>)
      }
    } else {
      content = (<Article
        order={this.state.article? this.state.article.get('orderHuman'):null}
        article={this.state.article}
        articleID={this.props.articleID}
        cursor={Immutable.List()}
        editor={this.props.editor}
        nav={this.state.pub ? this.state.pub.get('nav') : null}
        theme={this.state.theme}
        />)

    }
    return content;
  },

  render: function() {
    // Create url for going back to article management
    var backSlug = this.state.group ? 'groups/' + this.state.group.get('slug') + '/publications/' : null
    backSlug = this.state.pub ? backSlug + this.state.pub.get('slug') + '/' : null
    return (
      <div className="grid-frame vertical">
        <Navbar enabled={this.props.editor} loaded={this.state.loaded} />
        <ArticleOptions
          themeID={this.state.theme ? this.state.theme.get('id') : null}
          enabled={this.props.editor}
          liveUrl={this.state.article? this.state.pub.get('liveUrl') : null}
          pdfUrl={this.state.article?this.state.article.get('pdfUrl'):null}
          articleList={this.state.pub? this.state.pub.get('articles'):null}
          backUrl={window.config.baseUrl + backSlug}
          />
        {this._renderContent()}
      </div>
    )
  }
})

module.exports = ArticleEditor
