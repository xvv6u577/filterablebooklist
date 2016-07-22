// tutorial2.js
var CommentList = React.createClass({
  render: function() {
  	var commentNodes = this.props.data.map(function(comment){
  		return <Comment key={comment.id} author={comment.auther}>
  					{comment.text}
  				</Comment>  	
  	});
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});
var Comment = React.createClass({
	render:function(){
		return (
			<div className="comment">
				<h2 className="commentAuther" >{this.props.auther}</h2>
				{this.props.children}
				{/*<span dangerouslySetInnerHTML={{_html: marked(this.props.children.toString(),{sanitize:true})}} />*/}
			</div>
		);	
	}
});
var CommentBox = React.createClass({	
	getInitialState: function() {
		return {data:[]};
	},	
/*	forJsonpMethod:function(json){
		//this.setState({data:json});
		console.log(json);
	},
*/
	componentDidMount:function(){		
		$.ajax({
			url:this.props.url+"?q=life",
			dataType:"jsonp",
//			jsonpCallback: "forJsonpMethod",
			success:function(data){
				this.setState({data:data.books});
				console.log(data.books);
			}.bind(this),
			error:function(xhr,sta,e){
				console.log(xhr.toString()+" "+sta+" "+e.toString());
			}
//
		});
	},
	render: function(){
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<hr/>
				<CommentList data={this.state.data} />	
				<CommentForm />
			</div>
		);	
	}
});
/*
var data = [
  {id:1,author: "kai xun", text: "Nice work!"},
  {id:2,author: "ley wang", text: "Great job!"}
];
*/
ReactDOM.render(
	<CommentBox  url="https://api.douban.com/v2/book/search" />,
	document.getElementById('container')
);
