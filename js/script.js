var BookListTable = React.createClass({
	getInitialState: function() {
    		return { bookLists:[] };
  	},
	componentDidMount: function() {
		this.loadBookLists();
		{/*setInterval(this.loadBookLists,this.props.pollInterval);*/}
	},
	loadBookLists:function(){	
		$.ajax({
			url:this.props.url+"?q="+this.props.filterText,
			dataType:"jsonp",
			success:function(data){
				this.setState({bookLists:data.books});
				console.log(data.books);
			}.bind(this),
			error:function(xhr,sta,e){
				console.log(xhr.toString()+" "+sta+" "+e.toString());
			}
		});
	},
	render: function() {
		let books = this.state.bookLists.filter((book)=>{
			if(this.props.betterThan8 && book.rating.average <8.0)
				return false;
			return true;    	
		}).map((book) => {
			return(
			<li key={book.id}>
				<img src={book.image}/>
				<p>{book.title}</p>
				<p>{book.author}</p>
				<p>{book.rating.average}</p>
			</li>
			);
		});
	return (
	  <div className="booklisttable">
		{books}
	  </div>
	);
	}
});

var SearchBar = React.createClass({
	handleChange: function() {
		this.props.onUserInput(
		  this.refs.filterTextInput.value,
		  this.refs.betterThan8Input.checked
		);
	},
	render: function() {
		return (
			<form>
			<input
			  type="text"
			  placeholder="Search..."
			  value={this.props.filterText}
			  ref="filterTextInput"
			  onChange={this.handleChange}
			/>
			<p>
			  <input
				type="checkbox"
				checked={this.props.betterThan8}
				ref="betterThan8Input"
				onChange={this.handleChange}
			  />
			  {' '}
			  Only show books more than 8 points.
			</p>
			</form>
		);
	}
});

var FilterableBookListTable = React.createClass({
	getInitialState: function() {
		return {
		  filterText: '',
		  betterThan8: false
		};
	},
	
	handleUserInput: function(filterText, betterThan8) {
		this.setState({
			filterText: filterText,
			betterThan8: betterThan8
		});
	},
	
	render: function() {
		return (
			<div className="booklisttable">
				<img src="http://easyread.ph.126.net/xeO9di9z_9onqo8F1Bplqg==/7916659641848707440.png"/>
				<hr />
				<SearchBar
				  filterText={this.state.filterText}
				  betterThan8={this.state.betterThan8}
				  onUserInput={this.handleUserInput}
				/>
				<BookListTable
				  url={this.props.url}
				  pollInterval={this.props.pollInterval}
				  filterText={this.state.filterText}
				  betterThan8={this.state.betterThan8}
				/>
			</div>
		);
	}
});

ReactDOM.render(
  <FilterableBookListTable url="https://api.douban.com/v2/book/search" pollInterval={2000} />,
  document.getElementById('container')
);
