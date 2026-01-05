from typing import Annotated

from fastapi import APIRouter, Depends, Request
from polar_sdk import AddressInputTypedDict, CheckoutCreateTypedDict, CountryAlpha2Input

from controllers import OrderController
from core.config import config
from core.dependencies import AuthenticationRequired, PolarDep
from core.factory import factory

router = APIRouter(dependencies=[Depends(AuthenticationRequired)])

OrderDep = Annotated[OrderController, Depends(factory.get_oder_controller)]


@router.post("/checkout/pro")
async def create_checkout(request: Request, polar: PolarDep, order_controller: OrderDep):
    user_id = request.state.user.id

    checkout_request: CheckoutCreateTypedDict = {
        "customer_name": "name",
        "customer_billing_address": AddressInputTypedDict(country=CountryAlpha2Input.PK),
        "products": [config.POLAR_PRODUCT_ID],
        "customer_id": str(user_id),
    }
    checkout = polar.client.checkouts.create(request=checkout_request)

    await order_controller.create(
        user_id=user_id, product_id=config.POLAR_PRODUCT_ID, polar_order_id=checkout.id
    )

    return checkout
