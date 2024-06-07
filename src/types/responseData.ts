export class ResponseData<D> {
    status: boolean
    data: D | D[] | {}
    message: string

    constructor(status: boolean, data: D | D[], message: string) {
        this.status = status;
        this.data = data;
        this.message = message;

        return this;
    }
}