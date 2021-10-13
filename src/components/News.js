import React, { Component } from 'react'
import Newsitem from './Newsitem'
import  { Spinner } from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize:5,
        category:'general',
      }
      static propTypes= {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
      }
       capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    
    
   
    constructor(Props){
        super(Props);
        this.state = {
            articles:[],
            loading: false,
            page:1,
            totalResults:0
            }
            document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

        async updateNews(){
            this.props.setProgress(10);
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=02d422029dff4283b3e48eb538f31b3e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json()
            // console.log(parsedData);
            this.setState({articles: parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false})
            this.props.setProgress(100);

        }
        async componentDidMount(){
            this.updateNews(); 
        // console.log("it is a lifecycle")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=02d422029dff4283b3e48eb538f31b3e&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // // console.log(parsedData);
        // this.setState({articles: parsedData.articles,
        // totalResults:parsedData.totalResults,
        // loading:false})
     }
    
    handlePrevClick=async()=>{
    // console.log("previous")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=02d422029dff4283b3e48eb538f31b3e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    //  let data = await fetch(url);
    //  let parseData = await data.json()
    //  console.log(parseData);
    //  this.setState({
    //      page: this.state.page-1,
    //      articles: parseData.articles,
    //      loading:false
    //  }) 
    this.setState({page:this.state.page-1});
    this.updateNews();


    }
    handleNextClick= async()=>{
    //  console.log("next");
    //  if (!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=02d422029dff4283b3e48eb538f31b3e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //  this.setState({loading:true});
    //  let data = await fetch(url);
    //  let parseData = await data.json()
    //  this.setState({
    //      page: this.state.page+1,
    //      articles: parseData.articles,
    //      loading:false
     
    //  }) 
   
    // }
    this.setState({page:this.state.page+1});
    this.updateNews();
    }
    fetchMoreData = async () => {
       this.setState({page:this.state.page+1})
       const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=02d422029dff4283b3e48eb538f31b3e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //    this.setState({loading:true});
       let data = await fetch(url);
       let parsedData = await data.json()
       // console.log(parsedData);
       this.setState({
       articles:this.state.articles.concat (parsedData.articles),
       totalResults:parsedData.totalResults
       
       })
      
      };


    render() {
        return (
                <>
                <h1 className="text-center" style={{margin: '30px 0px', marginTop:'90px'}}>NewsMonkey - Top  {this.capitalizeFirstLetter(this.props.category)} Headlines  </h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
           

            <div className="container">
                
                <div className="row">
                {this.state.articles.map((element)=>{
                    return  <div className="col-md-4"key={element.url}> 
                    <Newsitem  title ={element.title ? element.title:""} description = {element.description ? element.description:""} imageUrl = {element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}source={element.source.name}/>
                
                 </div>
                })}
                </div>
                </div>
                </InfiniteScroll>
              
               
            </>
            
        )
    }
 }        
           
export default News
