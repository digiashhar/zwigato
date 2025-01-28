import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
    const [listOfRestr, setListOfRestr] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredRestr, setFilteredRestr] = useState([]);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData=async()=>{
        const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const data = await response.json();
        const fetchedData = data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setListOfRestr(fetchedData);
        setFilteredRestr(fetchedData);
    }
    
    if(listOfRestr.length===0){
        return <Shimmer/>
    }

    return (
      <div className="body">
        <div className="filter"> 
            <div className="search">
                <input type='text' placeholder="Search for restaurants"
                value={searchText}
                onChange={(e)=>{
                    setSearchText(e.target.value);
                }}/>
                <button className="search-btn"
                onClick={()=>{
                    const filteredRest = listOfRestr.filter((x)=>
                        x.info.name.toLowerCase().includes(searchText.toLowerCase()));
                    setFilteredRestr(filteredRest);
                    
                }}>
                    Search
                </button>

            </div>
            <button className="filter-btn"
                onClick={()=>{
                    const filteredList = listOfRestr.filter((x)=> x.info.avgRating>4);
                    setFilteredRestr(filteredList);   
                }}> Top Rated Restaurants  
            </button> 
            <button className="filter-remove-btn"
            onClick={()=>{
                setFilteredRestr(listOfRestr);
                setSearchText('');
            }}>
                Remove Filter

            </button>
        </div>
        <div className="res-container">
  
          {
            
            filteredRestr.map((abc)=>(
              <Link  key={abc.info.id} to={"restaurants/"}> <RestaurantCard resData={abc}/> </Link>  
            ))
          }
          {/* <RestaurantCard
          resData={resObj}
          /> */} 
        </div>
      </div>
    );
  };

  export default Body;