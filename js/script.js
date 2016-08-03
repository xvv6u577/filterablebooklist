var FooSon = React.createClass({
  render:function(){
    return (
      <div>
        <div>text:{this.props.text} checkbox:{this.props.checkbox.toString()}</div>
        <ul>{this.props.books}</ul>
      </div>
    );
  }
});
var ImageComponent = React.createClass({
  render:function(){
    return (
      <div className="logo">
        <img src="https://img3.doubanio.com/f/shire/8308f83ca66946299fc80efb1f10ea21f99ec2a5/pics/nav/lg_main_a11_1.png"/>
      </div>
    );
  }
});
var FooMother = React.createClass({
  getInitialState:function(){
    return {text:"",checkbox:false,books:[]}
  },
  handleFun:function(){
    if(this.refs.te.value.trim()){
      $.ajax({
        url:"https://api.douban.com/v2/book/search?q="+this.refs.te.value.trim(),
        dataType:"jsonp"
      }).done((data)=>{
        let _books = data.books.filter(
            (book)=>{
            if(!this.refs.ch.checked || (this.refs.ch.checked && book.rating.average >= 8.0)){
                return true;
            }
          }).map(
            (book) => {
              return(
                <li key={book.id}>
                  <img src={book.image}/>
                  <p>{book.title}</p>
                  <p>{book.author}</p>
                  <p>{book.rating.average}</p>
                  <hr/>
                </li>
              );
          });
        this.setState({text:this.refs.te.value,checkbox:this.refs.ch.checked,books:_books});
      }).fail(()=>{
        console.log("ajax error!");
      });
    } else {
      this.setState({text:this.refs.te.value,checkbox:this.refs.ch.checked,books:[]});
    }
  },
  render:function(){
    return (
      <div>
        <ImageComponent/>
        <input type="text" placeholder="Some text ..." defaultValue={this.state.text} ref="te" onChange={_.debounce(this.handleFun,500)} />
        <p>
        <input type="checkbox" defaultValue={this.state.checkbox} ref="ch" onClick={_.debounce(this.handleFun,500)}/>
        <label>８分以上</label>
        </p>
        <hr/>
        <FooSon text={this.state.text} checkbox={this.state.checkbox} books={this.state.books} />
      </div>
    );
  }
});
ReactDOM.render(
  <FooMother />,
  document.getElementById('container')
);
