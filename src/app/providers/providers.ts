import { PurchaseRequestService } from './purchase-request.service';
import { PurchaseOrderService } from './purchase-order.service';
import { ProtheusAuthService } from './protheus-auth.service';
import { LoadingControllerService } from './loading-controller.service';
import { PurchaseIndicatorsService } from './purchase-indicators.service';
import { ProtheusUserService } from './protheus-user.service';

export const PROVIDERS = [
    PurchaseRequestService,
    PurchaseOrderService,
    ProtheusAuthService,
    LoadingControllerService,
    PurchaseIndicatorsService,
    ProtheusUserService
];