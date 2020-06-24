import PUTService from "./PUTService";

export default class POSTService extends PUTService{
    getQuery() {
        return "INSERT INTO `" + this.table + "` " +
            "(`" + this.keys.join('`,`') + "`) " +
            "VALUES (" + this.values.map(() => '?').join(",") + ")";
    }
}
