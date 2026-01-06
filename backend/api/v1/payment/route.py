from typing import Annotated

from fastapi import APIRouter, Depends, Request, status
from polar_sdk import (
    AddressInputTypedDict,
    CheckoutCreateTypedDict,
    CountryAlpha2Input,
    CustomerState,
)

from controllers import OrderController, UserController
from core.config import config
from core.dependencies import AuthenticationRequired, PolarDep
from core.factory import factory

router = APIRouter(dependencies=[Depends(AuthenticationRequired)])

OrderDep = Annotated[OrderController, Depends(factory.get_oder_controller)]


@router.post("/checkout/pro")
async def create_checkout(
    request: Request,
    polar: PolarDep,
    order_controller: OrderDep,
    user_controller: UserController = Depends(factory.get_user_controller),
):
    user_id = request.state.user.id

    user = await user_controller.get_by_id(user_id)

    checkout_request: CheckoutCreateTypedDict = {
        "customer_name": user.username,
        "customer_billing_address": AddressInputTypedDict(country=CountryAlpha2Input.PK),
        "products": [config.POLAR_PRODUCT_ID],
        "customer_id": str(user.polar_customer_id),
        "success_url": "http://localhost:3000/payment/success",
    }
    checkout = polar.client.checkouts.create(request=checkout_request)

    await order_controller.create(
        user_id=user_id,
        product_id=config.POLAR_PRODUCT_ID,
        polar_order_id=checkout.id,
    )

    return {"url": checkout.url}


@router.post("/success", status_code=status.HTTP_204_NO_CONTENT)
async def payment_successful(
    request: Request,
    polar: PolarDep,
    order_controller: OrderDep,
    user_controller: UserController = Depends(factory.get_user_controller),
):
    user = await user_controller.get_by_id(request.state.user.id)
    customer_status: CustomerState = polar.client.customers.get_state(
        id=str(user.polar_customer_id)
    )

    has_active_subscription = len(customer_status.active_subscriptions) > 0

    if has_active_subscription > 0:
        await order_controller.update(user_id=str(user.id), attributes={"status": "success"})


@router.post("/failure")
async def payment_failed(
    request: Request,
    polar: PolarDep,
    order_controller: OrderDep,
    user_controller: UserController = Depends(factory.get_user_controller),
):
    user = await user_controller.get_by_id(request.state.user.id)
    customer_status: CustomerState = polar.client.customers.get_state(
        id=str(user.polar_customer_id)
    )

    has_active_subscription = len(customer_status.active_subscriptions) > 0

    if has_active_subscription == 0:
        await order_controller.update(user_id=str(user.id), attributes={"status": "error"})
