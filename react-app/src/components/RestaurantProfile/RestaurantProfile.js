




function RestaurantProfile() {





    const reviews = restaurant.reviews
    const reviewCount = restaurant.reviews.length

    const averageRating = () => {
        let sum = 0;
        for (let i = 0; i < reviews.length; i++) {
            let review = reviews[i];
            sum += review.rating
        }
        return sum / reviewCount
    }

    const restaurantRating = averageRating();




    return (
        <div>

        </div>
    )
}