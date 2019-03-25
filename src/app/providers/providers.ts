import { PurchaseRequestService } from './purchase-request.service';
import { PurchaseOrderService } from './purchase-order.service';
import { ProtheusAuthService } from './protheus-auth.service';
import { LoadingControllerService } from './loading-controller.service';

export const PROVIDERS = [
    PurchaseRequestService,
    PurchaseOrderService,
    ProtheusAuthService,
    LoadingControllerService
];