import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import {MENU_URL} from "./utils/constants";

const RestaurantMenu=()=>{
    const[resInfo, setResInfo] = useState({}); 
    const {resId} =useParams();
    
    useEffect(()=>{
        fetchMenu();
    }, []);

    const fetchMenu=async()=>{
        const data = await fetch(MENU_URL + 
        resId +  "&catalog_qa=undefined&submitAction=ENTER");
        const json = await data.json();
        setResInfo(json.data);
    }

    if(resInfo===null) return <Shimmer/>
    const info = resInfo?.cards?.[2]?.card?.card?.info || {};
    const {name, costForTwoMessage, cuisines} = info;
    const deliveryTime = info?.sla?.deliveryTime;
    const RegularCard = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ;
   // console.log(resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards, 'items');.
    const items = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
    console.log(RegularCard, 'items');
    //resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2].card?.card?.itemCards?.[3]?.card?.info?.name;
    return(
        <div className="restaurant-menu">
            <h1>{name}</h1>
            <h2>{costForTwoMessage}</h2>
            <h2>Our Menu</h2>   
            <h3>{cuisines ? cuisines.join(", ") : ""}</h3>
            <h4> Delivery Time: {deliveryTime}mins</h4>
            <ul>
                    
                    {RegularCard && RegularCard.length > 0 && RegularCard?.map((item)=>{
                        if(item?.card?.card?.title){
                            return <li key={item?.card?.card?.itemCards?.[0]?.card?.info?.id}> {item?.card?.card?.title} </li>
                        }
                        return null;
                    })} 

            </ul>


        {/* <ul>
                {RegularCard && RegularCard.length > 0 && RegularCard.map((category, index) => {
                    if (category?.card?.card?.title) {
                        return (
                            <li key={index}>
                                {category.card.card.title}
                                <ol>
                                    {items.map((food, idx) => {

                                        let data = [];

                                        if(idx === 0 || idx === 1){
                                            data = food?.card?.card?.carousel?.title;
                                        } else {
                                            data = food?.card?.card?.itemCards?.card?.info?.name;
                                        }
                                        
                                            return <li key={idx}>{data}</li>
                                        
                                     })}
                                </ol>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul> */}


        </div>
    )
}

export default RestaurantMenu;

