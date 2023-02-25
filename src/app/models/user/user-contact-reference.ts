export class UserContactReference {

    public email: string;

    public fax: string;

    public line: string;

    public michat: string;

    public phone: string;

    public telegram: string;

    public wechat: string;

    public whatsapp: string;


    constructor(email: string, fax: string, line: string, michat: string, phone: string, telegram: string, wechat: string, whatsapp: string) {

        this.email = email;
        this.fax = fax;
        this.line = line;
        this.michat = michat;
        this.phone = phone;
        this.telegram = telegram;
        this.wechat = wechat;
        this.whatsapp = whatsapp;

    }

}
