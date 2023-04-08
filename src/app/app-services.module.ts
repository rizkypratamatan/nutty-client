import {ConfigurationService} from "./configurations/configuration.service";
import {EncryptionService} from "./services/global/encryption.service";
import {DataService} from "./services/global/data.service";
import {RestService} from "./services/global/rest.service";
import {UserLogService} from "./services/user/user-log.service";
import {UserService} from "./pages/contacts/userlist/user.service";

export const AppServices = [
    ConfigurationService,
    DataService,
    EncryptionService,
    RestService,
    UserLogService,
    UserService
];
