import {ApiConfiguration} from './api.configuration';
import {ApplicationConfiguration} from './application.configuration';
import {ResourceConfiguration} from './resource.configuration';
import {EncryptionConfiguration} from './encryption.configuration';


export abstract class GlobalConfiguration {

    public api: ApiConfiguration;

    public application: ApplicationConfiguration;

    public encryption: EncryptionConfiguration;

    public resource: ResourceConfiguration;

}
