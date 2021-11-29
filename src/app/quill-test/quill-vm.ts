export class QuillTypesVM {
   ops?: Op [];
  } 

export class Op {
    insert: any;
    attributes: Attributes
}

export class Insert {
    image?: string;
}

export class Attributes {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    indent: number;
    align: string;
}