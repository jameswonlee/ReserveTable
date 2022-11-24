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
        Japanese flavors to the American palate.""", website="http://www.katsuyarestaurant.com/", preview_img="https://img.ctykit.com/cdn/ca-dtla/images/tr:w-1800/katsuya2.jpg"
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
        name="Morton's The Steakhouse - Los Angeles", neighborhood="Downtown", cuisines="Steakhouse, American, Seafood", cost=5, operation_hours="Mon-Thu, Sun 4:00 pm-9:00 pm Fri, Sat 5:00 pm-10:00 pm", dining_style="Fine Dining",
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







    db.session.add_all([spago, katsuya, lawrys, little_door, granville, catch, bacari, mortons, yardbird])
    db.session.commit()


def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()


# *********************************** Reservations *************************************** #

def seed_reservations():
    user2 = Reservation(
        user_id=2, restaurant_id=1, reservation_time=datetime.datetime(2022,12,10,17,30),
        party_size=2
    )

    user = Reservation(
        user_id=2, restaurant_id=2, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )


    db.session.add_all([user2, user])
    db.session.commit()


def undo_reservations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()




# *************************************** Reviews ******************************************** #

def seed_reviews():
    review1 = Review(
        user_id=2, restaurant_id=1, review="""Amazing fresh food with a cool vibe great music with a DJ. 
        Service is top notch nothing goes unnoticed. Highly recommend for a delicious meal.""",
        rating=5
    )

    review11 = Review(
        user_id=3, restaurant_id=1, review="A little loud. Otherwise it was a great experience.",
        rating=3
    )

    review2 = Review(
        user_id=2, restaurant_id=2, review="""Was fortunate enough to get a seat by the fireplace in the 
        courtyard as requested as usual. The hosts, the wait staff, everyone is exceptional every time. 
        And I eat there frequently. I have yet to have a less than perfect meal there and I've been going 
        since 1994 at the old location. Miss seeing Mr Puck as much as used to be around but understandably, 
        he's a busy gentleman. Shout out to Maria, love to walk in and see your smile.""", rating=5
    )

    review22 = Review(
        user_id=3, restaurant_id=2, review="""Excellent service and food. Only thing I would change is the
        temperature in the restaurant. It felt a bit chilly like a window was open. Otherwise, staff, service, 
        food, drinks, was stellar!""", rating=4
    )

    db.session.add_all([review1, review11, review2, review22])
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()
