import { OnDestroy, SimpleChanges } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
import { GlobalsMapping } from '../../interfaces/GlobalsConfig';
import { KioPublicationModel } from 'kio-ng2-data';
import { LocaleService } from 'kio-ng2-i18n';
export declare class AbstractGlobalsComponent<T extends GlobalsMapping> implements OnDestroy {
    protected globalsService: GlobalsService;
    protected localeService: LocaleService;
    globalsKey: keyof T;
    publicationModel: KioPublicationModel;
    constructor(globalsService: GlobalsService, localeService: LocaleService);
    ngOnChanges(changes: SimpleChanges): void;
    protected applyModel(publicationModel: KioPublicationModel): void;
    private _key;
    protected updateKey(key: keyof T): void;
    private _localeSubscription;
    ngOnDestroy(): void;
}
