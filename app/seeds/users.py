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
    susan = User(
        username='susanware', email='susan@gmail.com', password='password', first_name='Susan', last_name='Ware',
    )
    mike = User(
        username='mikeware', email='mike@gmail.com', password='password', first_name='Mike', last_name='Ware'
    )
    brent = User(
        username='brentware', email='brent@gmail.com', password='password', first_name='Brent', last_name='Ware'
    )

    db.session.add_all([demo, james, kyle, jessica, john, jane, susan, mike, brent])
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

    stk = Restaurant(
        name="STK - Los Angeles", neighborhood="Westwood", cuisines="Steak, Steakhouse, American", cost=4, operation_hours="Brunch Sat, Sun 9:00 am-2:45 pm Dinner Mon-Thu, Sun 3:00 pm-11:00 pm Fri, Sat 3:00 pm-12:00 am Happy Hour Mon-Fri 3:00 pm-6:30 pm", dining_style="Casual Elegant", dress_code="Smart Casual",
        parking_details="VALET: After 5pm $20 for the first 2 hours with validation and $10/hr after that with a $55 MAX.", payment_options="AMEX, Discover, MasterCard, Visa", cross_street="Le Conte Avenue", phone="(310) 659-3535", executive_chef="Executive Chef Dennis Cruz", description="""STK Steakhouse is “not your daddy's 
        steakhouse,” offering a high-energy dining experience that artfully combines the superior quality of a traditional steakhouse with a Vibe Dining atmosphere unlike any other. Delectable cuisine, upscale cocktails and an elevated Happy Hour, along with an in-house DJ and chic décor, all come together to offer a memorable 
        fine dining experience that keeps guests enjoying their evening from drinks to dinner to late night. STK's menu features reimagined classic American cuisine for lunch, brunch and dinner with unique local flair infused into each location's menu. The brand's beef program focuses on the highest quality, delicious and craveable 
        steaks while emphasizing transparency and traceable sourcing practices.""", website="https://stksteakhouse.com/venues/los-angeles/", preview_img="https://stksteakhouse.com/wp-content/uploads/2018/10/STK-Main-Carpet_Blue-Horn-wall-1.jpg"
    )

    merois = Restaurant(
        name="Merois", neighborhood="West Hollywood", cuisines="French / Japanese, Californian, Southeast Asian", cost=3, operation_hours="Lunch Daily 11:30 am-2:30 pm Dinner Mon-Thu, Sun 5:30 pm-9:30 pm Fri, Sat 5:30 pm-10:30 pm", dining_style="Casual Dining", dress_code="Business Casual", parking_details="None",
        payment_options="AMEX, Discover, MasterCard, Visa", cross_street="La Ciennega", phone="(310) 928-9000", executive_chef="Matt Dahlkemper", description="""Chef Wolfgang Puck's newest restaurant, Merois, is located on the rooftop of Pendry West Hollywood. Take fine dining to new heights with stunning views of Los Angeles from high 
        above Sunset Boulevard. Merois will celebrate the open-air allure of the City of Angels with a menu that spotlights Chef Wolfgang Puck's eye for the sophisticated subtleties of Japanese, Southeast Asian and French/California cuisine.""", website="https://wolfgangpuck.com/dining/merois-west-hollywood/",
        preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/3/42062542.jpg"
    )

    gracias_madre = Restaurant(
        name="Gracias Madre - West Hollywood", neighborhood="West Hollywood", cuisines="Mexican, Vegan, Organic", cost=3, operation_hours="Brunch Sat, Sun 11:00 am-3:00 pm Lunch Mon-Fri 11:00 am-3:00 pm Dinner Mon-Wed, Sun 3:00 pm-10:00 pm Thu-Sat 3:00 pm-11:00 pm Happy Hour Mon-Fri 3:00 pm-5:00 pm", dining_style="Casual Elegant",
        dress_code="Casual Dress", parking_details="Street metered parking are available for lunch, brunch and dinner. City of West Hollywood has taken away valet in lieu of extra sidewalk seating.", payment_options="AMEX, Discover, MasterCard, Visa", cross_street="In between Almont Drive or Lapeer Avenue", phone="(323) 978-2170",
        description="""Our mission is to celebrate and serve the presence of the mother which resides above us, within our hearts, within the earth, and in all those who nurture us. We serve cuisine inspired by the kitchens of Mexico sourced from locally grown organic ingredients. Welcome to a seat at love's table.

        The idea of Gracias Madre was first conceived while visiting the families of our employees in Mexico. We wanted to do both; offer organic Mexican food to the communities we serve as well as honor the mothers who work tirelessly in the kitchens of Mexico and often live without their husbands and children while they work side 
        by side with us in California. Inspired by some of the recipes of these families and the love of their mothers, Gracias Madre serves organic, farm fresh, locally sourced food, full of flavor and love paired along side with our agave-based cocktail program spearheaded by Beverage Director Maxwell Reis.""", website="http://www.graciasmadre.com/",
        preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/3/32346127.jpg"
    )

    cecconis = Restaurant(
        name="Cecconi's", neighborhood="West Hollywood", cuisines="Italian", cost=2, operation_hours="Mon-Thu 11:30 am-11:00 pm Fri 11:30 am-11:30 pm Sat 11:00 am-11:30 pm Sun 11:00 am-10:00 pm", dining_style="Casual Dining", dress_code="Smart Casual", parking_details="Complimentary Valet from 8:00am - 4:00pm. After 4:00 pm it is $12 for Valet.",
        payment_options="AMEX, MasterCard, Visa", cross_street="Robertson", phone="(310) 432-2000", executive_chef="Chef Andrea Cavaliere", description="""Cecconi's is a modern day classic Italian restaurant open for brunch, and dinner, seven days a week. Brunch is served on Saturday and Sunday.

        Cecconi's serves hand-made pasta, seafood and dishes from Italy using the finest ingredients. In addition to the flagship restaurant in Mayfair, London, Cecconi's has outposts in Los Angeles, Miami, Istanbul, Berlin, Barcelona and Brooklyn.

        As a courtesy to other guests, we do not accept any animals.
        Except for any ADA approved animal that is individually trained to do or perform tasks for the benefit of an individual with a disability.""", website="http://www.cecconiswesthollywood.com/", preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/1/26095032.jpg"
    )

    craigs = Restaurant(
        name="Craig's", neighborhood="West Hollywood", cuisines="Californian, Vegan", cost=4, operation_hours="Mon-Sat 5:00 pm-11:00 pm Sat, Sun 11:00 am-2:00 pm Sun 5:00 pm-10:00 pm", dining_style="Casual Elegant", dress_code="Business Casual", parking_details="Valet", payment_options="AMEX, Diners Club, Discover, MasterCard, Visa", cross_street="Melrose Avenue and La Peer. Parking is limited, we recommend to valet",
        phone="(310) 276-1900", executive_chef="Chef Kursten Kizer", description="""Reservations accepted two weeks in advance.
        Serving American fare from upscale comfort food to vegan specialities in the heart of the West Hollywood Design district.
        Craig's offers covered and heating patio seating, indoor and bar seating. Reservations are recommended, but walk-ins accepted and our bar features are full dinner menu.""", website="https://craigs.la/", preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/3/31239186.jpg"
    )


    db.session.add_all([katsuya, spago, lawrys, little_door, granville, catch, bacari, mortons, yardbird, seventy_one_above, stk, merois, gracias_madre, cecconis, craigs])
    db.session.commit()


def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()


# *********************************** Reservations *************************************** #

def seed_reservations():
    rsvp1 = Reservation(
        user_id=2, restaurant_id=1, reservation_time=datetime.datetime(2022,12,10,17,30),
        party_size=2
    )

    rsvp2 = Reservation(
        user_id=2, restaurant_id=2, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    rsvp3 = Reservation(
        user_id=3, restaurant_id=3, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=4
    )

    rsvp4 = Reservation(
        user_id=3, restaurant_id=4, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    rsvp5 = Reservation(
        user_id=4, restaurant_id=5, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    rsvp6 = Reservation(
        user_id=5, restaurant_id=6, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    rsvp7 = Reservation(
        user_id=6, restaurant_id=7, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    rsvp8 = Reservation(
        user_id=2, restaurant_id=8, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    rsvp9 = Reservation(
        user_id=3, restaurant_id=9, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    rsvp10 = Reservation(
        user_id=4, restaurant_id=2, reservation_time=datetime.datetime(2022,12,24,18,00),
        party_size=3
    )

    rsvp11 = Reservation(
        user_id=1, restaurant_id=11, reservation_time=datetime.datetime(2022,12,5,18,00),
        party_size=4
    )

    rsvp12 = Reservation(
        user_id=1, restaurant_id=12, reservation_time=datetime.datetime(2022,12,1,19,00),
        party_size=2
    )

    rsvp13 = Reservation(
        user_id=1, restaurant_id=13, reservation_time=datetime.datetime(2023,1,5,18,30),
        party_size=2
    )

    rsvp14 = Reservation(
        user_id=1, restaurant_id=14, reservation_time=datetime.datetime(2023,2,5,18,30),
        party_size=2
    )

    rsvp15 = Reservation(
        user_id=1, restaurant_id=15, reservation_time=datetime.datetime(2023,3,3,17,00),
        party_size=3
    )

    db.session.add_all([rsvp1, rsvp2, rsvp3, rsvp4, rsvp5, rsvp6, rsvp7, rsvp8, rsvp9, rsvp10, rsvp11, rsvp12, rsvp13, rsvp14, rsvp15])
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
        user_id=2, restaurant_id=1, review="""Amazing fresh food with a cool vibe great music with a DJ. Service is top notch nothing goes unnoticed. Highly recommend for a delicious meal.""",
        rating=5
    )

    review1_2 = Review(
        user_id=3, restaurant_id=1, review="A little loud. Otherwise it was a great experience.",
        rating=4
    )

    review1_3 = Review(
        user_id=4, restaurant_id=1, review="Food and service were amazing! Perfect meal before going to the theatre.",
        rating=5
    )

    review1_4 = Review(
        user_id=5, restaurant_id=1, review="Food was fantastic. And service was very good. However, our table was so dark we could not even read the menus.",
        rating=4
    )

    review2_1 = Review(
        user_id=4, restaurant_id=2, review="""Was fortunate enough to get a seat by the fireplace in the courtyard as requested as usual. The hosts, the wait staff, everyone is exceptional every time. And I eat there frequently. I have yet to have a less than perfect meal there and I've been going since 1994 at the old location. Miss seeing Mr Puck as much as used to be around but understandably, he's a busy gentleman. Shout out to Maria, love to walk in and see your smile.""", rating=5
    )

    review2_2 = Review(
        user_id=5, restaurant_id=2, review="""Excellent service and food. Only thing I would change is the temperature in the restaurant. It felt a bit chilly like a window was open. Otherwise, staff, service, food, drinks, was stellar!""", 
        rating=4
    )

    review2_3 = Review(
        user_id=2, restaurant_id=2, review="An always dependable LA institution. Yes, it is pricey, but perfect for special occasions. It was my first time back since before the pandemic (!!) and the food and service were as excellent as I remember.",
        rating=5
    )

    review2_4 = Review(
        user_id=3, restaurant_id=2, review="Delightful dinner. Love the outdoor dining space. Wonderful service and food",
        rating=5
    )

    review3_1 = Review(
        user_id=2, restaurant_id=3, review="""From beginning to end, a great experience! When was the last time you went to a nice restaurant and the the manager walked you to your table and pulled the table out for you to sit in the booth? And, when was the last time your waiter offered you an ice cold fork for your salad? The prime rib and all the sides were delicious! To top off the wonderful meal, warm chocolate cake and ice cream! Outstanding service! (Mike was our waiter) Loved this evening!""", rating=5
    )

    review3_2 = Review(
        user_id=3, restaurant_id=3, review="""Lawry's is a perfect example of fine dining at a great price. We have been members for the last five years, and we enjoy the locations in Beverly Hills and in Las Vegas. This is a restaurant that is consistently excellent. Thank you, guys!""", 
        rating=5
    )

    review3_3 = Review(
        user_id=4, restaurant_id=3, review="Wonderful Tradition for our family. Always consistent in every way!",
        rating=5
    )

    review3_4 = Review(
        user_id=5, restaurant_id=3, review="""Excellent as always. Have been dining here for over 40 years and it's still as great and consistent as it was back then.""", 
        rating=5
    )

    review3_5 = Review(
        user_id=6, restaurant_id=3, review="""Service was a little slow however, the service staff was pleasant and attentive. Food was phenomenal and the raspberry cake was delicious.""", 
        rating=4
    )

    review3_6 = Review(
        user_id=7, restaurant_id=3, review="""Had a great time and the food / service was outstanding. Was a bit disappointed that the 2 BDays I had noted on invite and mentioned to server were not recognized.""", 
        rating=4
    )

    review3_7 = Review(
        user_id=8, restaurant_id=3, review="Beautiful ambiance, amazing service and delicious food!", 
        rating=5
    )

    review3_8 = Review(
        user_id=9, restaurant_id=3, review="Fantastic service and exceptional food, always a treat to dine at Lawry's Beverly Hills!!!",
        rating=5
    )

    review4_1 = Review(
        user_id=4, restaurant_id=4, review="""We have been going to Little Door for quite some time. It had been a number of years since out last visit. Still a great 'go to' place for a celebration or a romantic night out. The restaurant is sparkly and the food was excellent. I had lamb, and my partner had sea bass. both quite good.""",
        rating=5
    )

    review4_2 = Review(
        user_id=5, restaurant_id=4, review="""Always the most beautiful patio in LA along with great food and wine. Master chef Nicolas Mechoin and his well trained staff never disappoint.""", 
        rating=5
    )

    review5_1 = Review(
        user_id=2, restaurant_id=5, review="""I have gone to different locations of Granville for years. They have always had vegan options. Sadly after the pandemic they removed some of the best vegan options. Please bring back the farro risotto, beet salad (without cheese), artichoke hummus and pita. I'm so tired of ordering this impossible burger. I can get one of those anywhere. WeHo should definately have more vegan options.""", 
        rating=4
    )

    review5_2 = Review(
        user_id=3, restaurant_id=5, review="""We were there on Friday at 7pm. We had the salmon, pork chops and steak! All we're great ! We love the scratch kitchen was able to accommodate some dietary restrictions. The service was great but the kitchen did take a while to get the food out.""", 
        rating=4
    )

    review6_1 = Review(
        user_id=4, restaurant_id=6, review="""Every dish was so tasty. Thanks, chef! Our server was amazing. A great place to celebrate our fun adventure exploring excellent restaurants in Los Angeles. Happy anniversary to us! We were shocked to be asked five times in three minutes whether we were done with our oysters. We clearly weren't finished so that was an unnecessary stress See you again!""", 
        rating=4
    )

    review6_2 = Review(
        user_id=5, restaurant_id=6, review="""The food was absolutely AMAZING and the overall vibe/decor was really cool, but it was very loud and crowded. If you want incredible food but don't mind the loud noise level and waiting an hour to be sat (with reservations), then definitely check this place out.""", 
        rating=4
    )

    review7_1 = Review(
        user_id=2, restaurant_id=7, review="""Great food great ambience. Service was a bit behind but they were pretty busy for a Tuesday night so we understood. Server was nice and sweet overall. Will go back!""", 
        rating=5
    )

    review7_2 = Review(
        user_id=3, restaurant_id=7, review="""It was a first time fun experience. We were seated in the main room which was very noisy so were moved to an area just below the elevated patio. It was much quieter and the heater was very pleasant. Daniela B. was helpful and funny. Didn't know about Happy Hour but benefited from it which made the evening all the more enjoyable.""", 
        rating=5
    )

    review8_1 = Review(
        user_id=4, restaurant_id=8, review="""Food was fantastic, but the service was not on point. From the staff to get seated(seemed a little chaotic) to the servers(it was like the JV team came in for the Thanksgiving holiday), just not the A++ level experience we have had in the past.""", 
        rating=3
    )

    review8_2 = Review(
        user_id=5, restaurant_id=8, review="""Dinner at Morton's is always a treat, and the Steak & Seafood special can't be beat for dining value. I particularly enjoy this LA location because it reminds me of the dearly departed Original location in Chicago. The food was especially outstanding this time!""", 
        rating=5
    )

    review9_1 = Review(
        user_id=2, restaurant_id=9, review="""Went on Thanksgiving and the food was great. In fact, it was so good we might have gone back the next day to try their fried chicken and ribs, but, the noise level was so high it was overwhelming. Too loud, great food, it's a dilemma.""", 
        rating=4
    )

    review9_2 = Review(
        user_id=3, restaurant_id=9, review="""Best fried chicken around. Always satisfies our cravings.""", 
        rating=5
    )

    review10_1 = Review(
        user_id=4, restaurant_id=10, review="""The restaurant was beautiful I love the view. The service was also really good and the customer service by open table is the best. I had to make a change and they responded promptly. My only suggestion is to have better signs in the parking garage because it's sort of confusing to know where to park or what elevator to take from the garage.""", 
        rating=5
    )

    review10_2 = Review(
        user_id=5, restaurant_id=10, review="""Perfect Thanksgiving Dinner. The view was obviously spectacular. Service was efficient and friendly. Food was delicious. Also valet... Quick and efficient.""", 
        rating=5
    )

    review11_1 = Review(
        user_id=2, restaurant_id=11, review="Kat was absolutely the most wonderful server we have ever had. Her awesome attitude and amazing customer service was one beautiful experience. As foodies she is the BEST!", 
        rating=4
    )

    review11_2 = Review(
        user_id=6, restaurant_id=11, review="Had a reservation and was told we'd have to wait 15 minutes, it ended up being a 50 minute wait to get seated for a party or two.", 
        rating=3
    )

    review12_1 = Review(
        user_id=7, restaurant_id=12, review="I love it here. My husband and I come every time we are in LA. We usually have lunch at the bar, then dinner in the bar or dining room. It's pricey, but the quality is always there. Great staff (we adore the bar team in particular). The tuna and salmon sashimi are the best I have ever had, and it eat a ton of sushi! Thank you, Merois! We love you!",
        rating=5
    )

    review12_2 = Review(
        user_id=8, restaurant_id=12, review="The food was excellent. I loved the Lobster, the purple cheese cake and the red thai curry. I especially loved the view, my family and I enjoyed my birthday dinner here and we could see all the way from Downtown LA to Bevery Hills. I had an amazing night.",
        rating=5
    )

    review13_1 = Review(
        user_id=9, restaurant_id=13, review="The ambience and food was divine! Celebrated my birthday here and had an amazing evening. I am definitely coming back. Thank you.",
        rating=5
    )

    review13_2 = Review(
        user_id=2, restaurant_id=13, review="I have been to the restaurant for lunch and dinner and love the ambiance during the dinner time. The noise level a little to high at certain times. Overall , very enjoyable.",
        rating=5
    )

    review14_1 = Review(
        user_id=3, restaurant_id=14, review="This place was exceptional. The food, the service, the ambience. It was a Vibe! The pizza is to die for! I will always have dinner here when visiting LA. Nico our waiter was everything. So knowledgeable, friendly and accommodating. Thank you!",
        rating=5
    )

    review14_2 = Review(
        user_id=4, restaurant_id=14, review="Egg Benedict are the best. Perfectly cooked, the sauce is delicious. The ambiance is great. Inside is noisy, but very nice. Service was ok, the other times that I have been there was better, but no so bad.",
        rating=4
    )

    review15_1 = Review(
        user_id=3, restaurant_id=15, review="Craig's is an institution, the food and service are unparalleled and the energy is gosh darn effervescent. Highly recommend the kale salad, pigs in the blanket, Jerry Weintraub pasta, and the butterscotch pudding for dessert. Try to take a ride share, cause the cocktails are good too.",
        rating=4
    )

    review15_2 = Review(
        user_id=5, restaurant_id=15, review="A MUST GO anytime I'm in LA. I've been going since Craig opened. Our server this visit was truly fabulous! I hope he's there next time I'm there!",
        rating=5
    )

    db.session.add_all([review1_1, review1_2, review1_3, review1_4, review2_1, review2_2, review2_3, review2_4, review3_1, review3_2, review3_3, review3_4, review3_5, review3_6, review3_7, review3_8, 
    review4_1, review4_2, review5_1, review5_2, review6_1, review6_2, review7_1, review7_2, review8_1, review8_2, review9_1, review9_2, review10_1, review10_2, review11_1, review11_2, review12_1, review12_2, 
    review13_1, review13_2, review14_1, review14_2, review15_1, review15_2])

    db.session.commit()

    

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()
