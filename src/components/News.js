import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

    static defaultProps = {
      country:'in',
      pageSize:6,
      category:'general'
    }

    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }

    capitalizeFirstLetter = (input)=> {
      // Check if input is defined and is a string
      if (typeof input !== 'undefined' && typeof input === 'string') {
          // Attempt to access the first character
          return input.charAt(0).toUpperCase() + input.slice(1);
      } else {
          // Handle cases where input is not as expected
          return ''; // Or handle it based on your application's logic
      }
  }

    constructor(props){
        super(props);

        this.state = {
            articles: [],
            loading: false,
            page:1,
            totalResults : 0
        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }

    async updateNews(){

      this.props.setProgress(10);

      fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`)
      .then(this.props.setProgress(30))
      .then(this.setState({loading:true}))
      .then(response => response.json())
      .then(this.props.setProgress(50))  
      .then(data => {
          // Handle your data here
          this.setState({
            articles : data.articles,
            totalResults : data.totalResults,
            loading:false,
          })
      })

      setTimeout(() => {
        this.props.setProgress(100);
      }, 500);
      

    }

    async componentDidMount(){

      this.updateNews();

    }

    fetchMoreData = async ()=>{
      this.setState({
        page:this.state.page+1
      })
      fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`)
      .then(this.setState({loading:true}))
      .then(response => response.json())  
      .then(data => {
          // Handle your data here
          this.setState({
            articles : this.state.articles.concat(data.articles),
            totalResults : data.totalResults,
            loading:false,
          })
      })
    }

    // handleNextClick = async ()=>{

    //   this.setState({
    //     page : this.state.page+1
    //   })

    //   this.updateNews();
    
    // }

    // handlePreviousClick = async ()=>{

    //   this.setState({
    //     page : this.state.page+1
    //   })

    //   this.updateNews();
    // }

  render() {

    return (
      <>
        <h1 className='text-center' style={{margin:'35px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Spinner/>} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}>
        
        <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
                    return  <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title!==null?element.title:""} description={element.description!==null?element.description:""} author={element.author?element.author:"anonymous"} source={element.source.name?element.source.name:"anonymous"} date={element.publishedAt} imageUrl={element.urlToImage?element.urlToImage : "https://cdn.benzinga.com/files/images/story/2024/07/08/Market.png?width=1200&height=800&fit=crop"} newsUrl={element.url} />
                    </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        

        {/* <div className="container d-flex justify-content-between">
        <button type="button" className="btn btn-dark" onClick={this.handlePreviousClick} disabled={this.state.page<=1}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)}>Next &rarr;</button>
        </div> */}

      </>
    )
  }
}

export default News
