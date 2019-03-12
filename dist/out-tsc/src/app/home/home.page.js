import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SolicitacaoCompraService } from '../providers/solicitacao-compra.service';
import { LoadingController } from '@ionic/angular';
var HomePage = /** @class */ (function () {
    function HomePage(solCompService, loadingController) {
        this.solCompService = solCompService;
        this.loadingController = loadingController;
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.presentLoading();
        this.solCompService.GetSolicitaoCompra().subscribe(function (data) { return _this.sol = data; }, function (err) { _this.loading.dismiss(); alert("erro"); }, function () {
            _this.loading.dismiss();
        });
    };
    HomePage.prototype.presentLoading = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadingController.create({
                                message: 'Carregando Solicitações'
                            })];
                    case 1:
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [SolicitacaoCompraService, LoadingController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map