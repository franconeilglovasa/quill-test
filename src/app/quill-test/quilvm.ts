export class QuillVM implements IQuillVM {
    ops?: Op[] | undefined;

    constructor(data?: IQuillVM) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["ops"])) {
                this.ops = [] as any;
                for (let item of _data["ops"])
                    this.ops!.push(Op.fromJS(item));
            }
        }
    }

    static fromJS(data: any): QuillVM {
        data = typeof data === 'object' ? data : {};
        let result = new QuillVM();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.ops)) {
            data["ops"] = [];
            for (let item of this.ops)
                data["ops"].push(item.toJSON());
        }
        return data; 
    }

    clone(): QuillVM {
        const json = this.toJSON();
        let result = new QuillVM();
        result.init(json);
        return result;
    }
}

export interface IQuillVM {
    ops?: Op[] | undefined;
}

export class Op implements IOp {
    insert?: any | undefined;
    attributes?: Attributes | undefined;

    constructor(data?: IOp) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.insert = _data["insert"];
            this.attributes = _data["attributes"] ? Attributes.fromJS(_data["attributes"]) : <any>undefined;
        }
    }

    static fromJS(data: any): Op {
        data = typeof data === 'object' ? data : {};
        let result = new Op();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["insert"] = this.insert;
        data["attributes"] = this.attributes ? this.attributes.toJSON() : <any>undefined;
        return data; 
    }

    clone(): Op {
        const json = this.toJSON();
        let result = new Op();
        result.init(json);
        return result;
    }
}

export interface IOp {
    insert?: any | undefined;
    attributes?: Attributes | undefined;
}

export class Attributes implements IAttributes {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    indent?: number;
    align?: string | undefined;

    constructor(data?: IAttributes) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.bold = _data["bold"];
            this.italic = _data["italic"];
            this.underline = _data["underline"];
            this.indent = _data["indent"];
            this.align = _data["align"];
        }
    }

    static fromJS(data: any): Attributes {
        data = typeof data === 'object' ? data : {};
        let result = new Attributes();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["bold"] = this.bold;
        data["italic"] = this.italic;
        data["underline"] = this.underline;
        data["indent"] = this.indent;
        data["align"] = this.align;
        return data; 
    }

    clone(): Attributes {
        const json = this.toJSON();
        let result = new Attributes();
        result.init(json);
        return result;
    }
}

export interface IAttributes {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    indent?: number;
    align?: string | undefined;
}