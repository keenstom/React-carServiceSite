"""Initial migration

Revision ID: 944b765dec09
Revises: 
Create Date: 2024-05-12 13:01:29.631767

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '944b765dec09'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('service_type', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(length=100), nullable=True))
        batch_op.alter_column('service',
               existing_type=sa.VARCHAR(length=100),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('service_type', schema=None) as batch_op:
        batch_op.alter_column('service',
               existing_type=sa.VARCHAR(length=100),
               nullable=True)
        batch_op.drop_column('image')

    # ### end Alembic commands ###
