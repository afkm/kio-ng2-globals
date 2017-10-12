import { SimpleChanges } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
import { GlobalsMapping } from '../../interfaces/GlobalsConfig';
import { KioPublicationModel } from 'kio-ng2-data';
export declare class AbstractGlobalsComponent<T extends GlobalsMapping> {
    protected globalsService: GlobalsService;
    globalsKey: keyof T;
    publicationModel: KioPublicationModel;
    constructor(globalsService: GlobalsService);
    ngOnChanges(changes: SimpleChanges): void;
    protected applyModel(publicationModel: KioPublicationModel): void;
    private _key;
    protected updateKey(key: keyof T): void;
}
