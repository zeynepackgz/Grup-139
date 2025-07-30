"""password added for user

Revision ID: a364c7f7a864
Revises: 
Create Date: 2025-07-30 19:42:12.374824

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a364c7f7a864'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('student', sa.Column('password', sa.String(), nullable=False, server_default='default_password'))


def downgrade() -> None:
    pass
