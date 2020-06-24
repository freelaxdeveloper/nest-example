import { Response, Request } from 'express';

export default class PUTService {
    public id: number;
    public table: string;
    public request: Request;

    public whiteListKeys: any[] = [];
    public values: any[] = [];
    public keys: any[] = [];

    public primaryKey: string = 'id';

    constructor(request: Request, table: string, id: number) {
        this.id = id;
        this.table = table;
        this.request = request;
    }

    setWhiteListKeys(keys: any[]) {
        this.whiteListKeys = keys;

        this.setKeysAndValues();

        return this;
    }

    setKeysAndValues(): PUTService {
        this.keys = Object.keys(this.request.body).filter(key => {
            let isExists = this.whiteListKeys.includes(key);

            if (isExists) {
                this.values.push(this.request.body[key]);
            }

            return isExists;
        });

        return this;
    }

    getQuery() {
        return "UPDATE `" + this.table + "` " +
            "SET " + this.keys.join(' = ?, ') + " = ? " +
            "WHERE `" + this.primaryKey + "` = ? " +
            "LIMIT 1";
    }

    async save(repository) {
        if(this.id)
            this.values.push(this.id);

        const data = await repository.query(this.getQuery(), this.values);

        return data;
    }

}
