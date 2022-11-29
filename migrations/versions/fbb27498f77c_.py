"""empty message

Revision ID: fbb27498f77c
Revises: 
Create Date: 2022-11-29 10:48:04.371544

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fbb27498f77c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('restaurants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('neighborhood', sa.String(length=255), nullable=False),
    sa.Column('cuisines', sa.String(length=255), nullable=False),
    sa.Column('cost', sa.Integer(), nullable=False),
    sa.Column('operation_hours', sa.String(length=255), nullable=False),
    sa.Column('dining_style', sa.String(length=255), nullable=False),
    sa.Column('dress_code', sa.String(length=255), nullable=False),
    sa.Column('parking_details', sa.String(length=2000), nullable=False),
    sa.Column('payment_options', sa.String(length=2000), nullable=False),
    sa.Column('cross_street', sa.String(length=255), nullable=False),
    sa.Column('phone', sa.String(length=255), nullable=False),
    sa.Column('executive_chef', sa.String(length=255), nullable=True),
    sa.Column('description', sa.String(length=2000), nullable=False),
    sa.Column('website', sa.String(length=2000), nullable=False),
    sa.Column('preview_img', sa.String(length=2000), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('favorites',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('restaurant_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'restaurant_id')
    )
    op.create_table('reservations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('restaurant_id', sa.Integer(), nullable=False),
    sa.Column('reservation_time', sa.DateTime(), nullable=False),
    sa.Column('party_size', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('restaurant_id', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(length=2000), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('reservations')
    op.drop_table('favorites')
    op.drop_table('users')
    op.drop_table('restaurants')
    # ### end Alembic commands ###