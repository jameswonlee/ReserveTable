from app.models import db, User, Restaurant, Reservation, Review, environment, SCHEMA
import datetime


# *********************************** Users **************************************** #

def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name="Demo", last_name="User"
        )
    james = User(
        username='jameslee', email='james@gmail.com', password='password', first_name="James", last_name="Lee"
        )
    kyle = User(
        username='kyleware', email='kmware@mac.com', password='password', first_name="Kyle", last_name="Ware"
        )
    jessica = User(
        username='jessicalee', email='jessica@gmail.com', password='password', first_name='Jessica', last_name='Lee'
    )
    john = User(
        username='johnlee', email='john@gmail.com', password='password', first_name='John', last_name='Lee' 
    )
    jane = User(
        username='janelee', email='jane@gmail.com', password='password', first_name='Jane', last_name='Lee'
    )

    db.session.add_all([demo, james, kyle, jessica, john, jane])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()



# *********************************** Restaurants ************************************** #

def seed_restaurants():
    katsuya = Restaurant(
        name="Katsuya - Hollywood", neighborhood="Hollywood", cuisines="Japanese Sushi", cost=3,
        operation_hours="Mon-Thu 5:00 pm-10:00 pm Fri, Sat 5:00 pm-11:00 pm Sun 4:30 pm-10:00 pm", dining_style="Casual Elegant",
        dress_code="Smart Casual", parking_details="For your convenience we offer valet in front of the venue as well as limited street parking on Hollywood Blvd and Vine St.",
        payment_options="AMEX, Discover, MasterCard, Visa", cross_street="Hollywood Blvd and Vine St", phone="(323) 871-8777", executive_chef="Katsuya Uechi",
        description="""Designated the Los Angeles Times Readers' Choice 'Best Sushi Restaurant' in Southern California, and one of OpenTable's 50 Hottest Restaurants in the U.S.,” 
        Katsuya holds true to be held as a superb Los Angeles Japanese cuisine experience. Featuring the dynamic pairing of Master Sushi Chef Katsuya Uechi and design impresario 
        Philippe Starck, Katsuya is truly a feast for the senses. With specialty cocktails, unique rolls and spectacular sushi and sashimi platters, Chef Uechi skillfully translates 
        Japanese flavors to the American palate.""", website="http://www.katsuyarestaurant.com/", preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/3/47613890.jpg"
    )

    spago = Restaurant(
        name="Spago - Beverly Hills", neighborhood="Beverly Hills", cuisines="Contemporary American, Californian, Grill",
        cost=4, operation_hours="Dinner Tue-Thu, Sun 5:00 pm-9:45 pm Fri, Sat 5:00 pm-10:00 pm", dining_style="Fine Dining", dress_code="Business Casual",
        parking_details="Valet parking is available for $15.", payment_options="AMEX, Diners Club, Discover, JCB, MasterCard, Visa",
        cross_street="Wilshire and Canon", phone="(310) 385-0880", executive_chef="Ari Rosenson/ Wolfgang Puck", description="""Spago Beverly Hills, Wolfgang Pucks legendary, flagship restaurant, 
        continues to set the standard for cuisine, service and style, and is consistently recognized as the ultimate in fine dining. Spago presents a completely new menu and design. The master chef 
        has re-invented the entire menu with his signature farm to table philosophy. Puck, along with Partner and Executive Chef Ari Rosenson, creates imaginative seasonal menus showcasing the best 
        of California's produce and products. Spago's new design from Waldo Fernandez complements the food with its clean and simple aesthetic, incorporating natural elements to add an organic feel. 
        Spago is the recipient of the AAA Four Diamond Award and received two stars in The Michelin Guide-Los Angeles edition in 2009 and 2010.""", website="http://www.wolfgangpuck.com/dining/spago/",
        preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/1/24982293.jpg"
    )

    lawrys = Restaurant(
        name="Lawry's The Prime Rib - Beverly Hills", neighborhood="Beverly Hills", cuisines="Prime Rib, American", cost=3,
        operation_hours="Brunch Sun 11:30 am-2:00 pm Dinner Mon-Fri 5:00 pm-9:00 pm Sat, Sun 4:00 pm-9:00 pm", dining_style="Casual Elegant", dress_code="Business Casual",
        parking_details="Valet", payment_options="AMEX, Carte Blanche, Diners Club, Discover, JCB, MasterCard, Visa", cross_street="Wilshire Blvd", 
        phone="(310) 652-2827", description="""As a family-run establishment for over 80 years, we're committed to keeping our community safe. 
        We always practice strong hygiene protocols and rigorously adhere to all CDC food safety standards.
        We're excited to share our classic dining experience with you! Our dining rooms are open for both inside and outside dining. At this time our Silver Carts 
        are not able to serve prime rib tableside, however, they are positioned throughout our dining rooms and are still carving our signature prime rib to order. 
        Thank you for understanding and we look forward to serving you soon.""", website="https://www.lawrysonline.com/lawrys-the-prime-rib-beverly-hills/",
        preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/3/26491041.jpg"
    )

    little_door = Restaurant(
        name="The Little Door", neighborhood="West Hollywood", cuisines="Contemporary French, Californian, Mediterranean", cost=3, operation_hours="Sun 5:00 pm-9:00 pm Dinner Mon-Thu 6:00 pm-10:00 pm Fri, Sat 5:00 pm-11:00 pm",
        dining_style="Casual Elegant", dress_code="Smart Casual", parking_details="Evening: $10.00 per car", payment_options="AMEX, Discover, MasterCard, Visa", cross_street="1 block west of Crescent Heights at La Jolla",
        phone="(323) 951-1210", executive_chef="Jonathan Portela", description="""Two simple wooden doors open up to quite a buzz in an otherwise romantic courtyard, where a colorful crowd hangs at the bar 
        and lingers at coveted patio tables. Inside, seats spread throughout the candlelit house-turned-restaurant with intimate furniture. Organic seasonal ingredients, creatively prepared and impeccably presented, 
        characterize our unique menu. If you do not see a reservation time for the time you would like please also check on Tock at exploretock.com/thelittledoor""", website="http://www.thelittledoor.com/",
        preview_img="https://cdn.vox-cdn.com/thumbor/1pSP-J9W3Hr2wB4ptI6BsefuTc0=/49x0:849x600/1820x1213/filters:focal(49x0:849x600):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/49232047/09_2014_LITTLE_DOOR_SM-40.0.0.0.jpg"
    )

    granville = Restaurant(
        name="Granville - West Hollywood", neighborhood="West Hollywood", cuisines="American, Organic, Farm-to-table", cost=2,
        operation_hours="Mon-Thu, Sun 11:30 am-8:30 pm Fri, Sat 11:30 am-9:30 pm", dining_style="Casual Dining", dress_code="Casual Dress", parking_details="Valet and street parking available.",
        payment_options="AMEX, Discover, MasterCard, Visa", cross_street="Between San Vicente and Robertson", phone="(424) 522-5161", description="""GRANVILLE is a premium-casual neighborhood restaurant 
        and bar specializing in wholesome hand-crafted recipes and libations. With warm hospitality, good vibes, globally-inspired food and music - GRANVILLE is a culture, not a concept. GRANVILLE supports 
        local, organic and certified humane practices whenever possible and makes it's food from scratch daily offering lunch, dinner, happy hour, weekend brunch, and full bar in a casual yet tasteful environment. 
        Great spot for any occasion. Come as you are!""", website="http://www.granville.net/", preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/3/47746437.jpg"
    )

    catch = Restaurant(
        name="Catch LA", neighborhood="West Hollywood", cuisines="Seafood, Unspecified", cost=2, operation_hours="Mon-Wed 6:00 pm-1:00 pm Thu 4:30 pm-9:00 pm Fri-Sun 5:30 pm-11:00 pm Sat, Sun 11:00 am-2:30 pm",
        dining_style="Casual Elegant", dress_code="Smart Casual", parking_details="Valet Parking available in front of the venue on Melrose avenue and is $15.00", payment_options="AMEX, Discover, MasterCard, Visa",
        cross_street="San Vicente Blvd", phone="(323) 347-6060", description="""Perched above the dynamic streets of the West Hollywood design district on the corner of Melrose & San Vicente, Catch LA has something for everyone in 
        seamless transitions from daytime to dining, nightlife, and events. With its signature open kitchen and breathtaking views of downtown Los Angeles & the Hollywood Hills, the 340 seat retractable rooftop haven invites the outside 
        in as it marries simple, yet elegant, seafood, sushi, & steak with a unique, open-air dining room, excellent service, and a lively atmosphere. Reservations are seated based on availability at arrival and are allocated 90 minutes to 
        dine once seated. Full party be present to be seated & we allow a 15 minute grace period. Dress code is smart casual. Refusal of service for inappropriate dress is at discretion of mgmt. Outside cake/beverage not permitted.""",
        website="https://www.catchrestaurants.com/location/catch-la/", preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/3/47344215.jpg"
    )

    bacari = Restaurant(
        name="Bacari W. 3rd", neighborhood="West Hollywood", cuisines="Italian, Tapas / Small Plates, Mediterranean", cost=3, operation_hours="Brunch Sat, Sun 10:00 am-3:00 pm Dinner Mon 5:00 pm-10:00 pm Tue-Thu 5:00 pm-11:00 pm Fri, Sat 4:00 pm-12:00 am Sun 4:00 pm-10:00 pm",
        dining_style="Casual Dining", dress_code="Casual Dress", parking_details="We have valet parking every day after 6pm, or feel free to find available street parking.", payment_options="AMEX, Discover, MasterCard, Visa",
        cross_street="located on 3rd street between Fairfax and Crescent Heights", phone="(213) 933-2327", executive_chef="Lior Hillel", description="""Bacari W. 3rd is a Venetian-inspired small plates restaurant featuring Mediterranean-influenced dishes by Chef Lior Hillel. 
        We are the 4th restaurant of the Kronfli Brothers, a family-owned, growing group of restaurants in the Los Angeles area. Offering a rotating curation of small-production wines and eclectic beers from around the world, we are also known for our one-of-a-kind 90-minute 
        open bar special. Our team provides warm hospitality in our comfortable, dining room marked by our beautiful garden, rustic mediterranean decor, and spacious indoor-outdoor bar. We look forward to seeing you soon!""", website="http://bacariw3rd.com/",
        preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/1/25818765.jpg"
    )

    mortons = Restaurant(
        name="Morton's The Steakhouse - Los Angeles", neighborhood="Downtown", cuisines="Steakhouse, American, Seafood", cost=4, operation_hours="Mon-Thu, Sun 4:00 pm-9:00 pm Fri, Sat 5:00 pm-10:00 pm", dining_style="Fine Dining",
        dress_code="Business Casual", parking_details="None", payment_options="AMEX, Diners Club, Discover, MasterCard, Visa", cross_street="7th", phone="(213) 553-4566", description="""What began in Chicago in 1978 is now one of the most award-winning steakhouses around. 
        For over 30 years, Morton's The Steakhouse has been on a mission to provide "The Best Steak… Anywhere." Focusing on quality, consistency and genuine hospitality, Morton's seeks to provide not only memorable cuisine, but a memorable experience. With fresh, succulent 
        seafood and famed USDA prime-aged steak, it's no surprise that Morton's has thrilled diners all over the world. For a glimpse of a higher standard of steakhouse, come see the legendary Morton's experience for yourself.""", website="http://www.mortons.com/losangeles/",
        preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/2/41717094.jpg"
    )

    yardbird = Restaurant(
        name="Yardbird Table & Bar - Los Angeles", neighborhood="Beverly Hills", cuisines="Contemporary Southern, Contemporary American, Southern", cost=3, operation_hours="""Brunch Sat, Sun 10:00 am-3:00 pm Lunch Mon-Fri 11:00 am-3:00 pm Happy Hour Mon-Fri 3:00 pm-5:00 pm 
        Dinner Mon-Thu, Sun 4:00 pm-9:00 pm Fri, Sat 4:00 pm-10:00 pm""", dining_style="Casual Elegant", dress_code="Business Casual", parking_details="""Parking 45 minutes free with validation for valet only, can be accessed from 3rd Street. Enter the parking structure from 3rd St, 
        driving west on 3rd, just before San Vicente Blvd. Self-parking can be accessed from the entrances on San Vicente Blvd & La Cienega Blvd as well.""", payment_options="AMEX, Discover, MasterCard, Visa", cross_street="Beverly Blvd & 3rd", phone="(323) 250-8034",
        executive_chef="Patrick Rebholz", description="""With accolades from James Beard and Bon Appétit as well as being touted as one of the '100 Best Brunch Restaurants,' Yardbird pays tribute to the craveable American classics that bring people together. Guests can indulge in brunch, 
        lunch, dinner and a curated beverage program highlighting a dynamic collection of wines and spirits. A Miami import, the award-winning concept is the creation of seasoned restaurateur John Kunkel, Founder and CEO of 50 Eggs Hospitality Group.""", website="https://www.runchickenrun.com/los-angeles/",
        preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/3/47226789.jpg"
    )

    seventy_one_above = Restaurant(
        name="71Above", neighborhood="Downtown", cuisines="Contemporary American", cost=4, operation_hours="Dinner Mon-Thu, Sun 5:00 pm-9:15 pm Fri, Sat 5:00 pm-10:00 pm", dining_style="Fine Dining", dress_code="Business Casual",
        parking_details="Self parking is available in the building parking structure at 633 West Hope Place. The cost of Parking is $10 with validation for the first 3 hours, with prevailing rates thereafter.", payment_options="AMEX, Discover, JCB, MasterCard, Visa",
        cross_street="5th & Flower", phone="(213) 712-2683", executive_chef="Javier Lopez", description="""71Above is a Prix-Fixe menu restaurant for dinner only. We kindly ask all dining room guests to participate in the coursed menu. Please be aware, any seating requests are noted, 
        but not guaranteed. WINDOW TABLES ARE NOT GUARANTEED. All reservations require a credit card to hold the reservation but will not be charged unless there is a late cancellation or no show for the reservation. 
        \n Offering elevated modern American cuisine by Chef Javier Lopez, 71Above boasts breathtaking ocean views from Malibu to Laguna Hills, along with spectacular views of Los Angeles and the surrounding mountain ranges. The Restaurant and Skylounge have a Smart Casual dress code. Jackets are not required however, 
        no hats, athletic wear, shorts or flip-flops are allowed. Reservations are held for 15 minutes.
        \n Valet is available at 633 W. 5th Street or Self parking is available under the building at 633 W. Hope Place. $15 for 3 hours.""", website="http://71above.com/", preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/3/27168071.jpg"
    )


    db.session.add_all([katsuya, spago, lawrys, little_door, granville, catch, bacari, mortons, yardbird, seventy_one_above])
    db.session.commit()


def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()


# *********************************** Reservations *************************************** #

def seed_reservations():
    user = Reservation(
        user_id=2, restaurant_id=1, reservation_time=datetime.datetime(2022,12,10,17,30),
        party_size=2
    )

    user2 = Reservation(
        user_id=2, restaurant_id=2, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    user3 = Reservation(
        user_id=3, restaurant_id=3, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=4
    )

    user4 = Reservation(
        user_id=3, restaurant_id=4, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    user5 = Reservation(
        user_id=4, restaurant_id=5, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    user6 = Reservation(
        user_id=5, restaurant_id=6, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    user7 = Reservation(
        user_id=6, restaurant_id=7, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    user8 = Reservation(
        user_id=2, restaurant_id=8, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    user9 = Reservation(
        user_id=3, restaurant_id=9, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    user10 = Reservation(
        user_id=4, restaurant_id=2, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )


    db.session.add_all([user, user2, user3, user4, user5, user6, user7, user8, user9, user10])
    db.session.commit()


def undo_reservations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()




# *************************************** Reviews ******************************************** #

def seed_reviews():
    review1_1 = Review(
        user_id=2, restaurant_id=1, review="""Amazing fresh food with a cool vibe great music with a DJ. 
        Service is top notch nothing goes unnoticed. Highly recommend for a delicious meal.""",
        rating=5
    )

    review1_2 = Review(
        user_id=3, restaurant_id=1, review="A little loud. Otherwise it was a great experience.",
        rating=3
    )

    review2_1 = Review(
        user_id=4, restaurant_id=2, review="""Was fortunate enough to get a seat by the fireplace in the 
        courtyard as requested as usual. The hosts, the wait staff, everyone is exceptional every time. 
        And I eat there frequently. I have yet to have a less than perfect meal there and I've been going 
        since 1994 at the old location. Miss seeing Mr Puck as much as used to be around but understandably, 
        he's a busy gentleman. Shout out to Maria, love to walk in and see your smile.""", rating=5
    )

    review2_2 = Review(
        user_id=5, restaurant_id=2, review="""Excellent service and food. Only thing I would change is the
        temperature in the restaurant. It felt a bit chilly like a window was open. Otherwise, staff, service, 
        food, drinks, was stellar!""", rating=4
    )

    review3_1 = Review(
        user_id=2, restaurant_id=3, review="""From beginning to end, a great experience! When was the last time 
        you went to a nice restaurant and the the manager walked you to your table and pulled the table out for 
        you to sit in the booth? And, when was the last time your waiter offered you an ice cold fork for your 
        salad? The prime rib and all the sides were delicious! To top off the wonderful meal, warm chocolate cake 
        and ice cream! Outstanding service! (Mike was our waiter) Loved this evening!""", rating=5
    )

    review3_2 = Review(
        user_id=3, restaurant_id=3, review="""Lawry's is a perfect example of fine dining at a great price. We have 
        been members for the last five years, and we enjoy the locations in Beverly Hills and in Las Vegas. This is 
        a restaurant that is consistently excellent. Thank you, guys!""", rating=5
    )

    review4_1 = Review(
        user_id=4, restaurant_id=4, review="""We have been going to Little Door for quite some time. It had been a 
        number of years since out last visit. Still a great 'go to' place for a celebration or a romantic night out. 
        The restaurant is sparkly and the food was excellent. I had lamb, and my partner had sea bass. both quite good.""",
        rating=5
    )

    review4_2 = Review(
        user_id=5, restaurant_id=4, review="""Always the most beautiful patio in LA along with great food and wine. Master 
        chef Nicolas Mechoin and his well trained staff never disappoint.""", rating=5
    )

    review5_1 = Review(
        user_id=2, restaurant_id=5, review="""I have gone to different locations of Granville for years. They have always 
        had vegan options. Sadly after the pandemic they removed some of the best vegan options. Please bring back the farro 
        risotto, beet salad (without cheese), artichoke hummus and pita. I'm so tired of ordering this impossible burger. 
        I can get one of those anywhere. WeHo should definately have more vegan options.""", rating=4
    )

    review5_2 = Review(
        user_id=3, restaurant_id=5, review="""We were there on Friday at 7pm. We had the salmon, pork chops and steak! All we're 
        great ! We love the scratch kitchen was able to accommodate some dietary restrictions. The service was great but the 
        kitchen did take a while to get the food out.""", rating=4
    )

    review6_1 = Review(
        user_id=4, restaurant_id=6, review="""Every dish was so tasty. Thanks, chef! Our server was amazing. A great place to 
        celebrate our fun adventure exploring excellent restaurants in Los Angeles. Happy anniversary to us! We were shocked to 
        be asked five times in three minutes whether we were done with our oysters. We clearly weren't finished so that was an 
        unnecessary stress See you again!""", rating=4
    )

    review6_2 = Review(
        user_id=5, restaurant_id=6, review="""The food was absolutely AMAZING and the overall vibe/decor was really cool, but it was 
        very loud and crowded. If you want incredible food but don't mind the loud noise level and waiting an hour to be sat (with reservations), 
        then definitely check this place out.""", rating=4
    )

    review7_1 = Review(
        user_id=2, restaurant_id=7, review="""Great food great ambience. Service was a bit behind but they were pretty busy for 
        a Tuesday night so we understood. Server was nice and sweet overall. Will go back!""", rating=5
    )

    review7_2 = Review(
        user_id=3, restaurant_id=7, review="""It was a first time fun experience. We were seated in the main room which was very noisy so were 
        moved to an area just below the elevated patio. It was much quieter and the heater was very pleasant. Daniela B. was helpful and funny. 
        Didn't know about Happy Hour but benefited from it which made the evening all the more enjoyable.""", rating=5
    )

    review8_1 = Review(
        user_id=4, restaurant_id=8, review="""Food was fantastic, but the service was not on point. From the staff to get seated(seemed a little chaotic) 
        to the servers(it was like the JV team came in for the Thanksgiving holiday), just not the A++ level experience we have had in the past.""", 
        rating=3
    )

    review8_2 = Review(
        user_id=5, restaurant_id=8, review="""Dinner at Morton's is always a treat, and the Steak & Seafood special can't be beat for dining value. I 
        particularly enjoy this LA location because it reminds me of the dearly departed Original location in Chicago. The food was especially outstanding 
        this time!""", rating=5
    )

    review9_1 = Review(
        user_id=2, restaurant_id=9, review="""Went on Thanksgiving and the food was great. In fact, it was so good we might have gone back the next day to 
        try their fried chicken and ribs, but, the noise level was so high it was overwhelming. Too loud, great food, it's a dilemma.""", rating=4
    )

    review9_2 = Review(
        user_id=3, restaurant_id=9, review="""Best fried chicken around. Always satisfies our cravings.""", rating=5
    )

    review10_1 = Review(
        user_id=4, restaurant_id=10, review="""The restaurant was beautiful I love the view. The service was also really good and the customer service by 
        open table is the best. I had to make a change and they responded promptly. My only suggestion is to have better signs in the parking garage because 
        it's sort of confusing to know where to park or what elevator to take from the garage.""", rating=5
    )

    review10_2 = Review(
        user_id=5, restaurant_id=10, review="""Perfect Thanksgiving Dinner. The view was obviously spectacular. Service was efficient and friendly. Food was
        delicious. Also valet... Quick and efficient.""", rating=5
    )

    db.session.add_all([review1_1, review1_2, review2_1, review2_2, review3_1, review3_2, review4_1, review4_2, review5_1, review5_2, review6_1, review6_2, review7_1, review7_2, review8_1, review8_2, review9_1, review9_2, review10_1, review10_2])
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()
