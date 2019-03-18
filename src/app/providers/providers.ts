import { PurchaseRequestService } from './purchase-request.service';
import { PurchaseRequestDetailService} from './purchase-request-detail.service';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderDetailService} from './purchase-order-detail.service';
import { ProtheusAuthService } from './protheus-auth.service';
import { LoadingControllerService } from './loading-controller.service';

export const PROVIDERS = [
    PurchaseRequestService,
    PurchaseRequestDetailService,
    PurchaseOrderService,
    PurchaseOrderDetailService,
    ProtheusAuthService,
    LoadingControllerService
];