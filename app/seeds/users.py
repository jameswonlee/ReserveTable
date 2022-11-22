from app.models import db, User, Restaurant, Reservation, Review, environment, SCHEMA
import datetime


# *********************************** Users **************************************** #

def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name="Demo", last_name="User")
    james = User(
        username='jameslee', email='james@gmail.com', password='password', first_name="James", last_name="Lee")
    kyle = User(
        username='kyleware', email='kmware@mac.com', password='password', first_name="Kyle", last_name="Ware")

    db.session.add_all([demo, james, kyle])
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
    spago = Restaurant(
        restaurant_name="Spago", neighborhood="Beverly Hills", cuisines="Contemporary American, Californian, Grill",
        cost=4, operation_hours="Dinner Tue-Thu, Sun 5pm-9:45pm, Fri, Sat 5pm-10pm", dining_style="Fine Dining", dress_code="Business Casual",
        parking_details="Valet parking is available for $15.", payment_options="AMEX, Diners Club, Discover, JCB, MasterCard, Visa",
        cross_street="Wilshire and Canon", phone="(310)385-0880", executive_chef="Ari Rosenson/ Wolfgang Puck", description="Spago Beverly Hills, Wolfgang Pucks legendary, flagship restaurant, continues to set the standard for cuisine, service and style, and is consistently recognized as the ultimate in fine dining. Spago presents a completely new menu and design. The master chef has re-invented the entire menu with his signature farm to table philosophy. Puck, along with Partner and Executive Chef Ari Rosenson, creates imaginative seasonal menus showcasing the best of California’s produce and products. Spago's new design from Waldo Fernandez complements the food with its clean and simple aesthetic, incorporating natural elements to add an organic feel. Spago is the recipient of the AAA Four Diamond Award and received two stars in The Michelin Guide-Los Angeles edition in 2009 and 2010.",
        preview_img="https://resizer.otstatic.com/v2/photos/wide-huge/1/24982293.jpg"
    )

    db.session.add_all([spago])
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
        user_id=2, restaurant_id=1, date=datetime.date(2022,12,10), time=datetime.time(17, 30), party_size=2
    )

    db.session.add_all([user2])
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
        user_id=2, restaurant_id=1, review="Was fortunate enough to get a seat by the fireplace in the courtyard as requested as usual. The hosts, the wait staff, everyone is exceptional every time. And I eat there frequently. I have yet to have a less than perfect meal there and I've been going since 1994 at the old location. Miss seeing Mr Puck as much as used to be around but understandably, he's a busy gentleman. Shout out to Maria, love to walk in and see your smile.",
        rating=5
    )

    db.session.add_all([review1])
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()
