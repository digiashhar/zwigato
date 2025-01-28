
const RestaurantCard = (props) => {
    const {resData} =props;
    return (
      <div className="res-card" style={{ background: "#f0f0f0" }}>
        <img
          className="res-logo"
          alt="res-logo"
          src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"+resData?.info?.cloudinaryImageId}
          />
        <h3> {resData?.info?.name} </h3>
        <h3> Food </h3>
        <h4> {resData?.info?.cuisines.join(', ')}</h4>
        <h4> Rating - {resData?.info?.avgRating}</h4>
        <h4> {resData?.info?.sla.deliveryTime} mins</h4> 
      </div>
    );
  };

  export default RestaurantCard;