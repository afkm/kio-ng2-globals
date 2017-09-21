import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BackendService } from 'kio-ng2-ctn';
import { KioPublicationModel } from 'kio-ng2-data';
import { GlobalsConfig, GlobalsMapping } from '../interfaces/GlobalsConfig';
export declare class GlobalsService {
    protected config: GlobalsConfig<GlobalsMapping>;
    protected backendService: BackendService;
    constructor(config: GlobalsConfig<GlobalsMapping>, backendService: BackendService);
    resolveGlobalsCuidWithKey(key: string): Observable<string>;
    private _resolveDelay;
    resolveGlobalsWithKey(key: string): Observable<KioPublicationModel>;
    private _globalsData;
}
