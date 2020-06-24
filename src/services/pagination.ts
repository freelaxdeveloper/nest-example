import { Response, Request } from 'express';

type FilterQueryType = {
    query: string,
    params: Array<any>,
}

class Pagination {
    public request: Request;

    public table: string;
    public page: number;
    public per_page: number;
    public offset: number;
    public path: string;
    public total: number = 0;
    public last_page: number = 0;

    public data: object = [];
    public filterResolver: Array<any> = [];

    constructor(request: Request, table:string, per_page: number = 15) {
        this.request = request;

        this.table = table;
        this.page = this.currentPage();
        this.per_page = per_page;
        this.offset = (this.page - 1) * this.per_page;
        this.path = this.getPath();

    }

    setFilterResolver(filters: Array<any>): Pagination {
        this.filterResolver = filters;

        return this;
    }

    public response(response: Response) {
        return response.status(200).json({
            message: 'Success',
            total: this.total,
            per_page: this.per_page,
            last_page: this.last_page,
            current_page: this.page,
            first_page_url: this.getFirstPageUrl(),
            last_page_url: this.getLastPageUrl(),
            next_page_url: this.getNextPageUrl(),
            prev_page_url: this.getPrevPageUrl(),
            path: this.path,
            data: this.data,
        });
    }

    getFilterQuery(): FilterQueryType {
        let newParams: (string | import("qs").ParsedQs | string[] | import("qs").ParsedQs[] | undefined)[] = [];
        let where = "WHERE `" + this.table + "`.`id` IS NOT NULL";

        this.filterResolver.forEach(key => {
            if (typeof key === 'string') {
                if (typeof this.request.query[key] !== 'undefined') {
                    let value = this.request.query[key];

                    if (value === 'null') {
                        where += " AND `" + this.table + "`.`" + key + "` IS NULL";
                    } else {
                        where += " AND `" + this.table + "`.`" + key + "` = ?";
                        newParams.push(value);
                    }

                }
            } else if (typeof key === 'object') {
                if (typeof this.request.query[key.key] !== 'undefined') {
                    where += " AND (`" + this.table + "`." +  key.columns.join(' like ? OR `' + this.table + '`.') + ' like ?' + ") ";
                    key.columns.forEach(() => {
                        let value = this.request.query[key.key] as string;
                        newParams.push(`%${value.trim()}%`);
                    })
                }
            }
        })

        return {
            query: where,
            params: newParams,
        }
    }

    async setDataAndTotal(repository, query: string, params: any | undefined = []) {
        const queryCount = query.replace(/SELECT(.+)FROM/g, 'SELECT COUNT(*) as total FROM');
        const total = await repository.query(queryCount, params);

        this.total = Number(total[0].total);
        this.setLastPage();

        const data = await repository.query(
            query + " LIMIT ?,?",
            [
                ...params,
                this.offset,
                this.per_page,
            ]
        );

        this.data = data;
    }

    getFirstPageUrl(): string {
        return `${this.path}?page=1`;
    }

    getLastPageUrl(): string {
        return `${this.path}?page=${this.last_page}`;
    }

    getPrevPageUrl(): string {
        return `${this.path}?page=` + ((this.page - 1) > 1 ? this.page - 1 : 1);
    }

    getNextPageUrl(): string {
        return `${this.path}?page=` + ((this.page + 1) < this.last_page ? this.page + 1 : this.last_page)
    }

    public getPath(): string {
        return this.request.protocol + '://' + this.request.get('host') + this.request.originalUrl.split('?').shift();
    }

    public setLastPage(): number {
        this.last_page = Math.ceil(this.total / this.per_page);

        return this.last_page;
    }

    public currentPage(): number {
        let page = this.request.query['page'] as unknown as number;

        if (typeof page === 'undefined' || +page < 1) {
            page = 1;
        }

        return +page;
    }
}

export default Pagination
