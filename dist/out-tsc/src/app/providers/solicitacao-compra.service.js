import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { SolicitacaoCompra } from '../models/solicitacao-compra';
var SolicitacaoCompraService = /** @class */ (function () {
    function SolicitacaoCompraService(http) {
        this.http = http;
    }
    SolicitacaoCompraService.prototype.GetSolicitaoCompra = function () {
        //return this.http.get('//jvd60103358.jv01.local:8092/rest/solicitacaocompra/');
        this.retorno = this.http.get('//jvd60103358.jv01.local:8092/rest/solicitacaocompra/');
        for (var _i = 0, _a = this.retorno; _i < _a.length; _i++) {
            var item = _a[_i];
            this.sol = new SolicitacaoCompra();
            this.sol.SolicNum = item.C1NUM;
            this.sol.SolicStatus = item.C1APROV;
            this.sol.SolicUser = item.C1USER;
            this.sol.SolicDate = item.C1EMISSAO;
            this.solics.push(this.sol);
        }
        return of(this.solics);
    };
    SolicitacaoCompraService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], SolicitacaoCompraService);
    return SolicitacaoCompraService;
}());
export { SolicitacaoCompraService };
//# sourceMappingURL=solicitacao-compra.service.js.map