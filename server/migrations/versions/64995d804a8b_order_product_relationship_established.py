"""order product relationship established

Revision ID: 64995d804a8b
Revises: 4ada0aa0443d
Create Date: 2025-02-26 19:16:45.405595

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '64995d804a8b'
down_revision = '4ada0aa0443d'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('order_item', schema=None) as batch_op:
        batch_op.add_column(sa.Column('variant_sku', sa.String(length=36), nullable=True))
        batch_op.create_foreign_key('fk_order_item_variant_sku', 'product_variant', ['variant_sku'], ['sku'])
        batch_op.drop_column('product_id')

def downgrade():
    with op.batch_alter_table('order_item', schema=None) as batch_op:
        batch_op.add_column(sa.Column('product_id', sa.VARCHAR(length=36), nullable=False))
        batch_op.create_foreign_key('fk_order_item_product_id', 'product', ['product_id'], ['product_id'])
        batch_op.drop_column('variant_sku')
